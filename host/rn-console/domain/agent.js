`use strict`

var Inventory = require("./inventory");
var {mock, AgentSample} = require("./sample");
var Response = require("./response");
var {GraphQLError} = require('graphql');
var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

const Agent = {
  schema: makeExecutableSchema({
    typeDefs: `
      type Agent {
        id: Int
        agentMOId: String
        agentVersion: String
        agentType: String
        deviceId: String
        systemId: String
        ipAddress: String
        is64bitOS: Boolean
        mgmtPort: String
        connectionStatus: String
        storeId: Int
        maMOId: String
        agentAuthState: String
        deviceType: Int
        modelType: Int
        modelNumber: Int
        MACAddress: String
        networkMask: String
        isMasked: Boolean
        isMCF: Boolean
        osValue: Int
      }

      type Query {
        "Search Agent By Id"
        agent(id: Int!): Agent
        "Search Agent By Store Id"
        agentsByStoreId(storeId: Int!): [Agent]
        "All Agents"
        agents: [Agent]
      }

      type Mutation {
        "Remove disconnected and non Master Agent"
        agentDelete(id: Int!): String
      }
    `
  }),
  func: {
    agent: (args) => {
      if(mock) {
        const {id} = args;
        const result = AgentSample.filter((agent) => id===agent.id);
        if(result.length < 1) {
          throw new GraphQLError(Response.NOT_FOUND(id));
        }
        return result[0];
      }
    },
    agentsByStoreId: (args) => {
      if(mock) {
        const result = AgentSample.filter((agent) => args.storeId===agent.storeId);
        return result;
      }
    },
    agents: () => {
      if(mock) {
        return AgentSample;
      }
    },
    agentDelete:(args) => {
      if(mock) {
        const {id} = args;
        const resultIndex = AgentSample.findIndex((agent) => id===agent.id);
        //Only GA under disconnected can be deleted.
        if(resultIndex === -1) {
          throw new GraphQLError(Response.NOT_FOUND_DELETE(id));
        }
        else {
          const agent = AgentSample[resultIndex];
          if(agent.connectionStatus !== "disconnected" ||  agent.connectionStatus === "Master Agent") {
            throw new GraphQLError(Response.FAIL_DELETE(id, "agent is a Master agent or not disconnected"));
          }
          else {
            AgentSample.splice(resultIndex,1);
            return Response.DELETED(id);
          }
        }
      }
    }
  },
  linkSchema: `
    extend type Agent {
      inventory: Inventory
    }
    `,
  linkFunc: (mergeInfo) => ({
    Agent: {
      inventory: {
        fragment: `fragment AgentFragment on Fragment { id }`,
        resolve(parent, args, context, info) {
          const id = parent.id;
          return mergeInfo.delegateToSchema(
            {
              schema: Inventory.schema,
              operation: 'query',
              fieldName: 'inventoryByAgentId',
              args: { agentId: id },
              context: context,
              info: info
            }
          );
        },
      },
    }
  })
}
module.exports = Agent
