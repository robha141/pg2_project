#!/bin/bash

npm run build
scp -r ./dist/* xoravec@akela.mendelu.cz:/home/xoravec/public_html/pg2_project