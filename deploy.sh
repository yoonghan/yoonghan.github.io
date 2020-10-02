#!/bin/sh

# This script is only written for Linux distribution
npm test

if [ $? -eq 0 ]
then
  npm run build
  node site_map_generator.js
  if [ $? -eq 0 ]
  then
    echo "Successfully created file"
    now --prod
  else
    echo "Build failed"
  fi
else
  echo "Check failed script"
fi
