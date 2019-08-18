`use strict`

var Agent = require("./agent");
var {mock, StoreSample, StoreConnectionLog} = require("./sample");
var Response = require("./response");
var {GraphQLError} = require('graphql');
var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

const FILTER_TYPES = {
  3: "FATAL",
  15: "FATAL_CRITICAL",
  31: "FATAL_CRITICAL_MINOR",
  127: "FATAL_CRITICAL_MINOR_WARNING",
  1023: "FATAL_CRITICAL_MINOR_WARNING_HARMLESS",
  2047: "ALL"
}

const DEFAULT_FILTER_TYPE = 31;

const convertIntToEventFilterFlagType = (intType) => {
  const result = FILTER_TYPES[intType];
  if(!result) {
    return FILTER_TYPES[DEFAULT_FILTER_TYPE];
  }
  return result;
}

const convertEventFilterFlagTypeToInt = (eventFilterFlagsType) => {
  for (var key in FILTER_TYPES) {
    if(FILTER_TYPES[key] === eventFilterFlagsType) {
      return key;
    }
  }
  return DEFAULT_FILTER_TYPE;
}

const remapResult = (stores) => {
  return stores.map((store) => {
    const remapStore = Object.assign({}, store);
    remapStore.eventFilterFlags = convertIntToEventFilterFlagType(store.eventFilterFlags);
    return remapStore;
  });
}

const Store = {
  schema: makeExecutableSchema({
    typeDefs: `

      enum EventFilterFlagsType {
        FATAL
        FATAL_CRITICAL
        FATAL_CRITICAL_MINOR
        FATAL_CRITICAL_MINOR_WARNING
        FATAL_CRITICAL_MINOR_WARNING_HARMLESS
        ALL
      }

      type Store {
        "Store Id"
        id: Int
        "Store IP Address or HostName"
        ipAddress: String
        "Store IP Address or HostName"
        hostName: String
        "Store Connection Port"
        portNumber: Int!
        "Store Event Filter Flags"
        eventFilterFlags: EventFilterFlagsType!
        "Store Connection Status - Async"
        connectionStatus: String
      }

      type Query {
        "Search Store By hostName, ipAddress or portNumber or EventFilterType or ConnectionStatus"
        storesBy(hostName: String, ipAddress: String, portNumber:Int, eventFilterFlags:EventFilterFlagsType, connectionStatus:String): [Store]
        "Store By Id"
        store(id: Int!): Store
        "Stores By Ids"
        storesByIds(ids: [Int]): [Store]
        "All Stores"
        stores: [Store]
        "Store Log"
        storeLogs(id: Int!): String
      }

      input StoreInput {
        "Ip Address in X.X.X.X"
        ipAddress: String
        "Hostname"
        hostName: String
        "Port number"
        portNumber: Int!
        "Event Filter Flag types"
        eventFilterFlags: EventFilterFlagsType!
        "Only if it needs to be Authenticated"
        userName: String
        "Only if it needs to be Authenticated"
        password: String
      }

      input StoreAuthenticationInput {
        id: Int!
        userName: String!
        password: String!
      }

      type Mutation {
        "Authorize store if requested"
        storeAuthorize(input: StoreAuthenticationInput): Store
        "Reconnect store that is undiscovered or unconnected"
        storeReconnect(id: Int!): Store
        "Reconnect store"
        storesReconnect(ids: [Int]!): String
        "Register Store"
        storeRegister(input: StoreInput): Store
        "Unregister store"
        storeUnregister(ids: [Int]!): String
        "Update store"
        storeUpdate(id: Int!, input: StoreInput): Store
      }
    `
  }),
  func: {
    storesBy: (args) => {
      if(mock) {
        let filteredStore = StoreSample;
        if(args.hostName) {
          filteredStore = filteredStore.filter((store) => args.hostName===store.hostName);
        }
        if(args.ipAddress) {
          filteredStore = filteredStore.filter((store) => args.ipAddress===store.ipAddress);
        }
        if(args.portNumber) {
          filteredStore = filteredStore.filter((store) => args.portNumber===store.portNumber);
        }
        if(args.eventFilterFlags) {
          filteredStore = filteredStore.filter((store) => args.eventFilterFlags===convertIntToEventFilterFlagType(store.eventFilterFlags));
        }
        if(args.connectionStatus) {
          filteredStore = filteredStore.filter((store) => args.connectionStatus===store.connectionStatus);
        }
        return remapResult(filteredStore);
      }
    },
    store: (args) => {
      if(mock) {
        const {id} = args;
        const result = StoreSample.filter((store) => id===store.id);
        if(result.length < 1) {
          throw new GraphQLError(Response.NOT_FOUND(id));
        }
        return remapResult(result)[0];
      }
    },
    storesByIds: (args) => {
      if(mock) {
        const result = StoreSample.filter((store) => args.ids.includes(store.id));
        return remapResult(result);
      }
    },
    stores: () => {
      if(mock) {
        return remapResult(StoreSample);
      }
    },
    storeLogs: (id) => {
      if(mock) {
        return StoreConnectionLog;
      }
    },
    storeAuthorize: (args) => {
      if(mock) {
        const {input} = args;
        const {id, userName, password} = input;
        return Store.func.store({id: id});
      }
    },
    storeRegister: (args) => {
      if(mock) {
        const {input} = args;
        const newId = StoreSample[StoreSample.length - 1].id + 1;
        const newStore = {
          "id": newId,
          "ipAddress": input.ipAddress,
          "hostName": input.hostName,
          "portNumber": input.portNumber,
          "eventFilterFlags": convertEventFilterFlagTypeToInt(input.eventFilterFlags),
          "connectionStatus": "unauthenticated"
        }
        StoreSample.push(newStore);
        return Store.func.store({id: newId});
      }
    },
    storeUnregister: (args) => {
      if(mock) {
        const {ids} = args;
        const result = StoreSample.filter((store) => ids.includes(store.id));
        if(result.length === 0) {
          throw new GraphQLError(Response.NOT_FOUND_DELETE(`[${ids}]`));
        }
        else {
          const newIds = result.map((store) => store.id);
          for(let removeIdx = StoreSample.length -1; removeIdx > -1; removeIdx--) {
            if(newIds.includes(StoreSample[removeIdx].id)){
              StoreSample.splice(removeIdx, 1);
            }
          }

          return Response.DELETED(`[${newIds}]`);
        }
      }
    },
    storeReconnect: (args) => {
      if(mock) {
        const {id} = args;
        const resultIndex = StoreSample.findIndex((store) => id === store.id);
        if(resultIndex === -1) {
          throw new GraphQLError(Response.NOT_FOUND_CONNECT(id));
        }
        else {
          return Store.func.store({id: id});
        }
      }
    },
    storesReconnect: (args) => {
      if(mock) {
        const {ids} = args;
        const resultIndex = StoreSample.filter((store) => ids.includes(store.id));
        if(resultIndex.length === 0) {
          throw new GraphQLError(Response.NOT_FOUND_CONNECT(`[${ids}]`));
        }
        else {
          return Response.CONNECTED(`[${resultIndex.map((store)=>store.id)}]`);
        }
      }
    },
    storeUpdate: (args) => {
      if(mock) {
        const {id, input} = args;
        const store = Store.func.store({id: id});
        if(store) {
          const resultIndex = StoreSample.findIndex((store) => id === store.id);
          const store = StoreSample[resultIndex];
          store["ipAddress"]=input.ipAddress;
          store["hostName"]=input.hostName;
          store["portNumber"]=input.portNumber;
          store["eventFilterFlags"]=convertEventFilterFlagTypeToInt(input.eventFilterFlags);
          return Store.func.store({id: id});
        }
      }
    }
  },
  linkSchema: `
    extend type Store {
      agents: [Agent]
    }
    `,
  linkFunc: (mergeInfo) => ({
    Store: {
      agents: {
        fragment: `fragment StoreFragment on Fragment { id }`,
        resolve(parent, args, context, info) {
          const storeId = parent.id;
          return mergeInfo.delegateToSchema(
            {
              schema: Agent.schema,
              operation: 'query',
              fieldName: 'agentsByStoreId',
              args: { storeId: storeId },
              context: context,
              info: info
            }
          );
        },
      },
    }
  })
}
module.exports = Store
