#! /bin/bash

if [ "$1" == "arm64" ]; then
  name="\${productName}-\${version}-m1.\${ext}"
else
  name="\${productName}-\${version}-\${arch}.\${ext}"
fi


if [[ "$OSTYPE" == "darwin"* ]]; then
  # 修改架构
  sed -i "" "s/\"arch\"\:.*\".*\"/\"arch\"\: \"$1\"/" ./package.json
  # 修改包名
  sed -i "" "s/\"artifactName\"\:.*\".*\"/\"artifactName\"\: \"$name\"/" ./package.json
else
  sed -i "s/\"arch\"\:.*\".*\"/\"arch\"\: \"$1\"/" ./package.json
fi