# Walcron's own nodeJS

## 1.0 Usage
1. Execute
```
  gulp
```
2. Once run, there will be two links visible => http://localhost:8080/webpack-dev-server/ and http://localhost:8081/webpack-dev-server/. The latter is for pattern library usage.

## 1.1 Pattern Library
To know more of the available styles usage, point to http://localhost:8081/webpack-dev-server/ after gulp is started.

1. Pattern Library common libraries are pointed to main project. The reason doing this is to eliminate missing ext or libraries in the main project.

## Typescript
If there are custom typescript, allow the changes by placing the d.tx under patternlibrary(or src/typings) folder. Typescript configured under webpack will take all .ts(x) and control it's output.

Remember to add to webpack.config.js to exclude the external javascript to be included into your script, provided the JS cannot be provided.

## Node Server
NodeJS server is moved into /dist/main/ folder. To start, either execute build-dev-progressive or buildprod. Before executing npm start.
All NodeJS server are stored in npm/ folder.

## Enhance Image performance.
Install magickImage and execute the command:
```
export FILE=bg-pattern.gif
magick convert $FILE -strip -sampling-factor 4:2:0 -quality 85 -colorspace sRGB $FILE
```

## Security for inline
Replace into util/csp/index.js for added codes for the inline script
```
export r=`echo -n "#p-h{width:100vw;position:fixed;bottom:0;opacity:1;height:100vh;background:#888888AA}#p-h-i{color:#FFF;padding:20%;text-align:center}.p-c{display:none;opacity:0}" |openssl dgst -sha256 -binary | base64` && echo "sha256-$r"
```

### TODO:
1. Need to redo service worker as cache busting broke it.
2. Noonce to disable inline scripting.
3. Move to server rendering.
