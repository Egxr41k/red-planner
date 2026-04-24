#!/bin/bash

# Подгружаем переменные (DEBIAN_IMG, ROCKY_IMG, SUSE_IMG)
source ./install_imgs.sh

LIBVIRT_DIR="/var/lib/libvirt/images"

# --- Универсальная функция развертывания ---
deploy_vm() {
    local OS_TYPE=$1    # debian, rocky, suse
    local IMG_PATH=$2   # путь к образу
    local OS_VARIANT=$3 # для virt-install
    local DEF_USER=$4   # стандартный юзер для этой ОС
    local COUNT=$5      # сколько штук создать

    for i in $(seq 0 $((COUNT))); do
        NAME="${OS_TYPE}-node${i}"
        echo "--- Развертывание $NAME ($OS_TYPE) ---"

        # 1. Подготовка диска
        sudo cp "$IMG_PATH" "$LIBVIRT_DIR/$NAME.qcow2"

        # Если это openSUSE, расширяем диск (для Minimal образов)
        if [[ "$OS_TYPE" == "suse" ]]; then
            sudo qemu-img resize "$LIBVIRT_DIR/$NAME.qcow2" +10G
        fi

        # 2. Генерация конфигурации (cloud-init)

        cat <<EOF > user-data
        #cloud-config
        hostname: $NAME
        user: $OS_TYPE
        password: $OS_TYPE
        chpasswd: { expire: False }
        ssh_pwauth: True
        sudo: ALL=(ALL) NOPASSWD:ALL
        package_update: true
EOF

        cat <<EOF > meta-data
        instance-id: $NAME-id
        local-hostname: $NAME
EOF

        # 3. Создание seed.iso
        cloud-localds "${NAME}-seed.iso" user-data meta-data
        sudo mv "${NAME}-seed.iso" "$LIBVIRT_DIR/${NAME}-seed.iso"
        rm user-data meta-data

        # 4. Запуск виртуалки
        sudo virt-install \
          --name "$NAME" \
          --memory 2048 \
          --vcpus 2 \
          --disk path="$LIBVIRT_DIR/$NAME.qcow2,format=qcow2" \
          --disk path="$LIBVIRT_DIR/${NAME}-seed.iso,device=cdrom" \
          --os-variant "$OS_VARIANT" \
          --network network=default \
          --import \
          --noautoconsole
    done
}

# --- Основной блок запуска ---

# Аргументы: Тип, Образ, Variant, Количество
deploy_vm "debian" "$DEBIAN_IMG" "debian12" 1
deploy_vm "rocky"  "$ROCKY_IMG"  "rocky9"   1
deploy_vm "suse"   "$SUSE_IMG"   "opensuse15.5" 1

# --- Итоги ---
echo "--- Состояние виртуальных машин ---"
sudo virsh list --all

echo "--- Ожидаем получение IP (DHCP) ---"
sleep 5
sudo virsh net-dhcp-leases default
