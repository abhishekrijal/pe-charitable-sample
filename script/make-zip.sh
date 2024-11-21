#!/bin/bash

# Exit if any command fails.
set -e

# Change to the main pligin directory.
cd "$(dirname "$0")"
cd ..

#
# Build a installable plugin zip
ZIP_FILE="build/pe-charitable-sample.zip"
MAIN_FILE="pe-charitable-sample.php"

# Enable nicer messaging for build status.
BLUE_BOLD='\033[1;34m'
GREEN_BOLD='\033[1;32m'
RED_BOLD='\033[1;31m'
YELLOW_BOLD='\033[1;33m'
COLOR_RESET='\033[0m'
error() {
    echo -e "\n${RED_BOLD}$1${COLOR_RESET}\n"
}
status() {
    echo -e "\n${BLUE_BOLD}$1${COLOR_RESET}\n"
}
success() {
    echo -e "\n${GREEN_BOLD}$1${COLOR_RESET}\n"
}
warning() {
    echo -e "\n${YELLOW_BOLD}$1${COLOR_RESET}\n"
}
confirm() {
    echo -e "\n${YELLOW_BOLD}$1${COLOR_RESET}"
}

status "Creating archive... 🎁"

# Make sure the script is invoked plugin directory
if [ -d "$MAIN_FILE" ]; then
    error 'Error: Main plugin file "$(pwd)/pe-charitable-sample.php" not found". Aborted!!!'
    exit 1
fi

# Delete old archive
if [ -f "${ZIP_FILE}" ]; then
    rm "${ZIP_FILE}"
fi

zip -r "${ZIP_FILE}" \
    build/ \
    assets/ \
    src/ \
    pe-charitable-sample.php \
    readme.txt \
    -x **/.DS_Store

# check if the zip file was created
if [ ! -f "${ZIP_FILE}" ]; then
    error "Failed to create zip file. Aborted!!!"
    exit 1
fi

file_size=$(du -h "${ZIP_FILE}" | awk -F' ' '{print $1F}')
success "Done. Generated pushengage charitable sample plugin zip at: $ZIP_FILE (size: $file_size)"