`use strict`

var express = require('express');
var express_graphql = require('express-graphql');
var {schema, schemaRoot} = require('./schema');

var GraphQLApp = function(expressapp, DOMAIN) {
  expressapp.use(DOMAIN, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  expressapp.use(DOMAIN, express_graphql({
      schema: schema,
      rootValue: schemaRoot,
      graphiql: false
  }));
}

module.exports=GraphQLApp;
