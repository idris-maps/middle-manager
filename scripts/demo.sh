#!/bin/bash

npx ts-node src/index -md demo/demo.md -o demo/index.html

npx ts-node src/index -md demo/demo.md -o demo/light.html -t light

npx ts-node src/index -md demo/demo.md -o demo/paper.html -t paper

surge demo --domain middle-manager.surge.sh