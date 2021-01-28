#! /bin/bash

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i "" "s/\"arch\"\:.*\".*\"/\"arch\"\: \"$1\"/" ./package.json
else
  sed -i "s/\"arch\"\:.*\".*\"/\"arch\"\: \"$1\"/" ./package.json
fi