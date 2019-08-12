#!/bin/bash

#Clear all
rm -rf ./.next
rm -rf ./dist

#Start nextjs compilation
npm run build

#Copy project
mkdir ./dist
cp -rf ./.next ./dist
cp -rf ./static ./dist
cp -rf ./seo ./dist
cp -rf ./host ./dist
cp ./hostApp.js ./dist
cp ./package.json ./dist
cp ./server.js ./dist
