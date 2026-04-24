#!/bin/bash

# 1. Debian
URL_DEBIAN="https://cloud.debian.org/images/cloud/trixie/latest/debian-13-generic-amd64.qcow2"
DEBIAN_IMG=$(basename "$URL_DEBIAN")

if [ ! -f "$DEBIAN_IMG" ]; then
    echo "--- Скачиваю Debian 13 ---"
    curl -L -o "$DEBIAN_IMG" "$URL_DEBIAN"
else
    echo "--- Debian 13 уже скачан, пропускаю ---"
fi

# 2. Rocky Linux
URL_ROCKY="https://dl.rockylinux.org/pub/rocky/10/images/x86_64/Rocky-10-GenericCloud-Base.latest.x86_64.qcow2"
ROCKY_IMG=$(basename "$URL_ROCKY")

if [ ! -f "$ROCKY_IMG" ]; then
    echo "--- Скачиваю Rocky Linux 10 ---"
    curl -L -o "$ROCKY_IMG" "$URL_ROCKY"
else
    echo "--- Rocky Linux 10 уже скачан, пропускаю ---"
fi

# 3. openSUSE
URL_SUSE="https://download.opensuse.org/distribution/leap/16.0/appliances/Leap-16.0-Minimal-VM.x86_64-kvm-and-xen.qcow2"
SUSE_IMG=$(basename "$URL_SUSE")

if [ ! -f "$SUSE_IMG" ]; then
    echo "--- Скачиваю openSUSE Leap 16 ---"
    curl -L -o "$SUSE_IMG" "$URL_SUSE"
else
    echo "--- openSUSE Leap 16 уже скачан, пропускаю ---"
fi

echo "Все образы готовы к работе."

export DEBIAN_IMG ROCKY_IMG SUSE_IMG
