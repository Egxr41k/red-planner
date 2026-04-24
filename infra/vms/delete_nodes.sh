#!/bin/bash

LIBVIRT_DIR="/var/lib/libvirt/images"

# Получаем список имен ВСЕХ виртуалок (и запущенных, и выключенных)
# awk убирает пустые строки и заголовки таблицы virsh
VMS=$(sudo virsh list --all --name)

if [ -z "$VMS" ]; then
    echo "--- Активных или созданных виртуалок не обнаружено. ---"
else
    echo "--- Начинаю тотальную зачистку лабы ---"
    for NAME in $VMS; do
        echo "Удаляю $NAME..."

        # 1. Принудительно останавливаем (destroy)
        sudo virsh destroy "$NAME" 2>/dev/null

        # 2. Удаляем описание и ВСЕ связанные диски (--remove-all-storage)
        sudo virsh undefine "$NAME" --remove-all-storage 2>/dev/null

        # 3. Подчищаем seed-образы, если они не удалились автоматически
        # (иногда virsh не считает CD-ROM за storage для удаления)
        sudo rm -f "$LIBVIRT_DIR/${NAME}-seed.iso"
    done
fi

# Сброс настроек сети, чтобы очистить таблицу аренды IP (DHCP)
echo "--- Сброс сетевых арен (DHCP) ---"
sudo virsh net-destroy default 2>/dev/null
sudo virsh net-start default 2>/dev/null

# Итоговая проверка
echo "--- Итог: ---"
sudo virsh list --all
sudo virsh net-dhcp-leases default
