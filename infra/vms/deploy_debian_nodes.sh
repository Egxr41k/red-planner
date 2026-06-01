#!/bin/bash

# Подгружаем пути к образам, если они в отдельном файле
# source ./install_imgs.sh 

BASE_IMG="./debian-12-generic-amd64.qcow2"
LIBVIRT_DIR="/var/lib/libvirt/images"
K8S_SCRIPT="./k8s_setup.sh"

for i in {0..5}; do
    NAME="debian-node$i"
    echo "--- Развертывание $NAME ---"

    # 1. Копируем чистый образ
    sudo cp "$BASE_IMG" "$LIBVIRT_DIR/$NAME.qcow2"

    # 2. УВЕЛИЧИВАЕМ образ до 40 ГБ (cloud-init сам расширит файловую систему внутри)
    sudo qemu-img resize "$LIBVIRT_DIR/$NAME.qcow2" 40G

    # 3. Генерируем meta-data
    cat <<EOF > meta-data
instance-id: $NAME-id
local-hostname: $NAME
EOF

    # 4. Генерируем user-data
    # Используем > чтобы файл всегда был свежим
    cat <<EOF > user-data
#cloud-config
user: user
password: user
chpasswd: { expire: False }
ssh_pwauth: True
sudo: ALL=(ALL) NOPASSWD:ALL

# Копируем скрипт внутрь виртуалки
write_files:
  - path: /usr/local/bin/k8s_setup.sh
    permissions: '0755'
    content: |
$(sed 's/^/      /' "$K8S_SCRIPT")

# Запускаем скрипт при первой загрузке
runcmd:
  - /usr/local/bin/k8s_setup.sh > /var/log/k8s_setup.log 2>&1
EOF

    # 5. Создаем seed.iso
    cloud-localds "${NAME}-seed.iso" user-data meta-data
    sudo mv "${NAME}-seed.iso" "$LIBVIRT_DIR/${NAME}-seed.iso"
    rm meta-data user-data

    # 6. Запускаем виртуалку
    sudo virt-install \
      --name "$NAME" \
      --memory 2048 \
      --vcpus 2 \
      --disk path="$LIBVIRT_DIR/$NAME.qcow2,format=qcow2" \
      --disk path="$LIBVIRT_DIR/${NAME}-seed.iso,device=cdrom" \
      --os-variant debian12 \
      --network network=default \
      --import \
      --noautoconsole

    echo "$NAME запущен, диск 40ГБ, идет настройка k8s..."
done

sudo virsh list --all
