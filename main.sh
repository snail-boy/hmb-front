#!/usr/bin/env bash

set -e
##
bash wordToHtml.sh
node wordtovue.js
cp -Rf nextVue/ ./src/views/agreement/
echo '复制文件到' ./src/views/agreement/ '成功'
