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


## DO NOT DO THIS...all post will not work
1. DEPRECATED, no longer be used and has issues with ZEIT's .env/secret settings. Changes are based on *package.json*.

```
  npm run dev
```

## Deployment into AWS Elasticbeanstalk
1. Check that the start port is 8081.
2. Check that 'npm install' and 'npm start' can be triggered.
3. Go to Configuration->Software to add "Environment Properties" with NODE_ENV=production and PORT=8081
4. Go to Configuraiton->Software to add "Node Command" with "npm start", and not default server.js

## Deployment into Zeit.
Automatically set the domain when used with --prod
```
now secrets add auth-api-call http://localhost:3000
#now secrets add pusher-app-id 883990
#now secrets add pusher-app-key 9307e10b49d4e7f47e56
#now secrets add pusher-secret 41a038429d4556a4fad3
#now secrets rm pusher-app-id && now secrets add pusher-app-id 123
#now secrets add firebase-bucket legocontroller-5c4f6.appspot.com
#now secrets add firebase-database https://legocontroller-5c4f6.firebaseio.com
#now secrets add pusher-nonauth-api-id a1
#now secrets add pusher-nonauth-app-key a2
#now secrets add pusher-nonauth-secret a3

now secrets add pusher-cluster ap1
npm run deploy
```

## Deployment from Windows server to Unix System.
1. After npm build, look for "\\" in folders .next\**\*.json.
2. Replace all folders with "\\" with "/".
3. Deploy into servers, e.g. AWS and so on.
4. Make sure NODE_ENV is case sensitive.

## Deployment note
1. Service worker does not work with naked url. Please redirect to a valid CNAME.

## Enhance Image performance.
Install magickImage and execute the command:
```
export FILE=bg-pattern.gif
magick convert $FILE -strip -sampling-factor 4:2:0 -quality 85 -colorspace sRGB $FILE
```

## Analyzing server build
Execute the following to see package bundling
```
set ANALYZE=true // Windows, can't put into package.json for windows.
export ANALYZE=true // Macintosh
npm run analyze
```

## Testing
1. Test coverage is enabled in jest.config.js with "collectCoverage: true,".
2. To test, execute
```
npm test
# For updated snapshots
#npm run test -- -u
# For specific test based on describe
#npm run test -- -t "External tools mock"
```

## Allowing PWA (offline website)
Defaulted into production.

## Understanding now.json for deployment.
Incase there is a wonder AUTH_API_CALL is needed and there are 2 different build info for
```
"env": {
  // This is for /api, a.k.a server builds.
}
```
vs
```
"build": {
  "env": {
    //This is for front end JS build
    // AUTH_API_CALL is not used for frontend, hence not needed here
  }
}
```

## Feature detects
After some elaborated consideration, we decided to add modernizr test. These are the configuration.
1. Non coded detection changes should be put into .modernizrrc file
2. feature-detects in .modernizrrc file relates to node_modules/modernizr/feature-detects folder.
3. Coded changes should be included in ModernizerTest.

## Google authentication
All Cloudbase google authentication is store in private/ folder.

## Roll up sites (post publishing)
1. Cookiebot checking. (https://www.cookiebot.com/), no cookies for this site.
2. Page (https://developers.google.com/speed/pagespeed/insights/)
3. Robots.txt (https://technicalseo.com/tools/robots-txt/)
4. Metadata/schematics test (https://search.google.com/structured-data/testing-tool/u/0/)
5. Mozilla (https://observatory.mozilla.org/) - did not pass with flying colors, Now.sh issues.

## Performance Testing
Page performance is still very log (below 50%) using Lighthouse testing. Mainly because the goal was to create a parallax page and lowered the test case (load alone takes a percentage bar). This is to be improved in future.

## TODO
1. Figure to load webp images. Had removed modernizer compilation.
2. Optimize font awesome.
