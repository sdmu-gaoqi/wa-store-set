#!/bin/sh

prepare() {
    echo "node -v: `node -v`"
    echo "yarn -v: `yarn -v`"
    echo "deploy start"
    echo ""
}

install_build() {
    yarn
    yarn build
}

upload() {
    echo "开始连接sftp~"
    node ./scripts/pub.cjs
}

__main() {
    prepare
    install_build
    upload
}

__main