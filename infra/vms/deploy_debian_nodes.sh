#!/bin/bash

BASE_IMG="./debian-12-generic-amd64.qcow2"
LIBVIRT_DIR="/var/lib/libvirt/images"
K8S_SCRIPT="./k8s_setup.sh" # Путь к вашему скрипту для нод

for i in {0..5}; do
    NAME="debian-node$i"
    echo "--- Развертывание $NAME ---"

    # 1. Копируем чистый образ
    sudo cp $BASE_IMG $LIBVIRT_DIR/$NAME.qcow2

    # 1. Генерируем meta-data
    echo "instance-id: $NAME-id" > meta-data
    echo "local-hostname: $NAME" >> meta-data

    # 2. Генерируем user-data
    cat <<EOF > user-data
#cloud-config
user: user
password: user
chpasswd: { expire: False }
ssh_pwauth: True

# Копируем скрипт внутрь виртуалки
write_files:
  - path: /usr/local/bin/k8s_setup.sh
    permissions: '0755'
    content: |
$(sed 's/^/      /' $K8S_SCRIPT)

# Запускаем скрипт при первой загрузке
runcmd:
  - /usr/local/bin/k8s_setup.sh > /var/log/k8s_setup.log 2>&1
EOF

    # 3. Создаем seed.iso
    cloud-localds $NAME-seed.iso user-data meta-data
    sudo mv $NAME-seed.iso $LIBVIRT_DIR/$NAME-seed.iso
    rm meta-data user-data

    # 4. Запускаем виртуалку
    sudo virt-install \
      --name $NAME \
      --memory 2048 \
      --vcpus 2 \
      --disk path=$LIBVIRT_DIR/$NAME.qcow2,format=qcow2 \
      --disk path=$LIBVIRT_DIR/$NAME-seed.iso,device=cdrom \
      --os-variant debian12 \
      --network network=default \
      --import \
      --noautoconsole

    echo "$NAME запущен и настраивается!"
done

sudo virsh list --all

echo "--- Текущие IP адреса в сети ---"
sudo virsh net-dhcp-leases default
