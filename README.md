# Walcron's own nodeJS
This is the main website's sourcecode for Walcron Coorperation.

## Installation
Run

```
  npm install
  npm install --only=dev
```

If there are missing webpack installation, manually execute 'npm install next'

## Development for Zeit
1. Changes are based on *now.json*.

```
  npm install -g now-cli
  now dev
```


## Development for Zeit
1. Changes are based on *package.json*.

```
  npm run dev
```

## Deployment into AWS Elasticbeanstalk
1. Check that the start port is 8081.
2. Check that 'npm install' and 'npm start' can be triggered.
3. Go to Configuration->Software to add "Environment Properties" with NODE_ENV=production and PORT=8081
4. Go to Configuraiton->Software to add "Node Command" with "npm start", and not default server.js

## Deployment into Zeit.

```
now
```

## Deployment from Windows server to Unix System.
1. After npm build, look for "\\" in folders .next\**\*.json.
2. Replace all folders with "\\" with "/".
3. Deploy into servers, e.g. AWS and so on.
4. Make sure NODE_ENV is case sensitive.

## Enhance Image performance.
Install magickImage and execute the command:
```
export FILE=bg-pattern.gif
magick convert $FILE -strip -sampling-factor 4:2:0 -quality 85 -colorspace sRGB $FILE
```

## Analyzing server build
Execute the following to see package bundling
```
npm run analyze
```

## Testing
Execute
```
npm test
```

## Roll up sites (post publishing)
1. Cookiebot checking. (https://www.cookiebot.com/), no cookies for this site.
2. Page (https://developers.google.com/speed/pagespeed/insights/)
3. Robots.txt (https://technicalseo.com/tools/robots-txt/)
4. Metadata/schematics test (https://search.google.com/structured-data/testing-tool/u/0/)
5. Mozilla (https://observatory.mozilla.org/) - did not pass with flying colors, Now.sh issues.
