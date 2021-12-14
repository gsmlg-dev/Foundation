#!/bin/sh

list=$(ls | grep '\.js' | grep -v index | awk -F'.' '{print $1}');

for n in $list
do
    echo "export { default as $n } from './$n';\n"
done
