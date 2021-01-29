#! /bin/bash
set -e 

rm -rf build/*
echo "开始构建Mac客户端安装包..."
yarn dist:$1_mac
echo "Start Upload......"
yarn update:vikalist $1 mac
rm -rf build/*

echo "开始构建Window客户端安装包..."
yarn dist:$1_win
mv ./build/latest.yml ./build/latest-win.yml
yarn update:vikalist $1 win
rm -rf build/*
# mkdir ~/.aws/ && touch ~/.aws/credentials
# $AWS_ACCESS_KEY_ID、$AWS_SECRET_ACCESS_KEY 分别在gitlab代码库的变量里
# printf "[default]\naws_access_key_id = %s\naws_secret_access_key = %s\n" "$AWS_ACCESS_KEY_ID" "$AWS_SECRET_ACCESS_KEY" >> ~/.aws/credentials

echo "完成部署！~"

echo "开始构建M1客户端安装包..."
yarn dist:$1_m1
mv ./build/latest_mac.yml ./build/latest-m1.yml
echo "Start Upload......"
yarn update:vikalist $1 m1
rm -rf build/*
