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
