`use strict`


var Store = require("./store");
var {mock, RegionSample} = require("./sample");
var Response = require("./response");
var {GraphQLError} = require('graphql');
var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

const Region = {
  schema: makeExecutableSchema({
    typeDefs: `
      type Region {
        id: Int,
        name: String,
        storeIds: [Int]
      }

      type Query {
        "Query Region By Name or Stores"
        regionsBy(name: String, stores: [Int]): [Region]
        "Query Region By Id"
        region(id: Int!): Region
        "Query Regions By Ids"
        regionsByIds(ids: [Int]): [Region]
        "Query Regions"
        regions: [Region]
      }

      input RegionInput {
        "Region Name"
        name: String!
        "Region Ids"
        storeIds: [Int]
      }

      type Mutation {
        "Create Region"
        regionCreate(input: RegionInput): Region
        "Update The Region"
        regionUpdate(id: Int!, input: RegionInput): Region
        "Delete The Region"
        regionDelete(id: Int!): String
      }
    `
  }),
  func: {
    regionsBy: (args) => {
      if(mock) {
        let filteredRegion = RegionSample;
        if(args.name) {
          filteredRegion = filteredRegion.filter((region) => args.name===region.name);
        }
        if(args.stores) {
          filteredRegion = filteredRegion.filter((region) => {
            const result = region.storeIds.find((store) => {
              return args.storeIds.includes(store);
            });
            return (result ? true: false);
          });
        }
        return filteredRegion;
      }
    },
    region: (args) => {
      if(mock) {
        const result = RegionSample.filter((region) => args.id===region.id);
        return result.length === 0? {}: result[0];
      }
    },
    regionsByIds: (args) => {
      if(mock) {
        const result = RegionSample.filter((region) => args.ids.includes(region.id));
        return result;
      }
    },
    regions: () => {
      if(mock) {
        return RegionSample;
      }
    },
    regionCreate: (args) => {
      if(mock) {
        const {input} = args;
        const id = RegionSample[RegionSample.length-1].id + 1;
        RegionSample.push({
          id: id,
          name: input.name,
          regionIds: input.regionIds
        });
        return Region.func.region({id: id});
      }
    },
    regionUpdate: (args) => {
      if(mock) {
        const {id, input} = args;
        const region = Region.func.region({id: id});
        if(Object.keys(region).length === 0 && region.constructor === Object) {
          throw new GraphQLError(Response.NOT_FOUND_UPDATE(id));
        }
        else {
          const resultIndex = RegionSample.findIndex((region) => id === region.id);
          const region = RegionSample[resultIndex];
          region.name = input.name;
          region.regionIds = input.regionIds;
          return Region.func.region({id: id});
        }
      }
    },
    regionDelete: (args) => {
      if(mock) {
        const {id} = args;
        const resultIndex = RegionSample.findIndex((region) => id === region.id);
        if(resultIndex === -1) {
          throw new GraphQLError(Response.NOT_FOUND_DELETE(id));
        }
        else {
          RegionSample.splice(resultIndex, 1);
          return Response.DELETED(id);
        }
      }
    }
  },
  linkSchema: `
    extend type Region {
      stores: [Store]
    }
    `,
  linkFunc: (mergeInfo) => ({
    Region: {
      stores: {
        fragment: `fragment RegionFragment on Fragment { id }`,
        resolve(parent, args, context, info) {
          const storeIds = parent.storeIds;
          return mergeInfo.delegateToSchema(
            {
              schema: Store.schema,
              operation: 'query',
              fieldName: 'storesByIds',
              args: { ids: storeIds },
              context: context,
              info: info
            }
          );
        },
      },
    }
  })
}

module.exports = Region;
