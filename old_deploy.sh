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

#Zip the file
export DEPLOY_FILE="deploy_$(date +%Y-%m-%d).zip"
cd dist
zip -r $DEPLOY_FILE * .next
cd .. && mkdir finaldist
mv ./dist/$DEPLOY_FILE finaldist/
export DEPLOY_FILE=
