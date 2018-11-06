# Walcron's own nodeJS

# Installation
Run
```
  npm install
  npm install --only=dev
```
If there are missing webpack installation, manually execute 'npm install next'

# Deployment into AWS Elasticbeanstalk
1. Check that the start port is 8081.
2. Check that 'npm install' and 'npm start' can be triggered.

# Deployment from Windows server.
1. After npm build, look for "\\" in folders .next\**\*.json.
2. Replace all folders with "\\" with "/".
3. Deploy into servers, e.g. AWS and so on.

## Enhance Image performance.
Install magickImage and execute the command:
```
export FILE=bg-pattern.gif
magick convert $FILE -strip -sampling-factor 4:2:0 -quality 85 -colorspace sRGB $FILE
```
