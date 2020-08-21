`use strict`

var {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');
var Store = require('./domain/store');
var Agent = require('./domain/agent');
var Region = require('./domain/region');
var Country = require('./domain/country');
var Inventory = require('./domain/inventory');
var PowerMgmt = require('./domain/powermgmt');

const schemaLink = mergeInfo => Object.assign({}, Country.linkFunc(mergeInfo), Region.linkFunc(mergeInfo), Store.linkFunc(mergeInfo), Agent.linkFunc(mergeInfo));
const schemaRoot = Object.assign({}, Store.func, Agent.func, Region.func, Country.func, Inventory.func, PowerMgmt.func);

const schema = mergeSchemas({
  schemas: [
    Store.schema, Agent.schema, Region.schema, Country.schema, Inventory.schema, PowerMgmt.schema,
    Country.linkSchema, Region.linkSchema, Store.linkSchema, Agent.linkSchema
  ],
  resolvers: schemaLink

  //   Agent: {
  //     inventory: {
  //       fragment: `fragment AgentFragment on Fragment { id }`,
  //       resolve(parent, args, context, info) {
  //         const agentId = parent.id;
  //         return mergeInfo.delegateToSchema(
  //           {
  //             schema: Inventory.schema,
  //             operation: 'query',
  //             fieldName: 'inventoryByAgentId',
  //             args: { agentId: agentId },
  //             context: context,
  //             info: info
  //           }
  //         );
  //       },
  //     },
  //   }
  //})
});

module.exports = {
  schema: schema,
  schemaRoot: schemaRoot
}
