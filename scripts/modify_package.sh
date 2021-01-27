#! /bin/bash

sed -i "" "s/\"arch\"\:.*\".*\"/\"arch\"\: \"$1\"/" ./package.json