`use strict`

var Region = require("./region");
var {mock, CountrySample} = require("./sample");
var Response = require("./response");
var {GraphQLError} = require('graphql');
var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

const Country = {
  schema: makeExecutableSchema({
    typeDefs: `
      type Country {
        "Country Id"
        id: Int,
        "Country Name, Non-unique"
        name: String,
        "Region Id"
        regionIds: [Int]
      }

      type Query {
        "Get Countries By Name"
        countriesBy(name: String): [Country]
        "Get Country By Id, return empty array if not found"
        country(id: Int!): Country
        "Get All Countries"
        countries: [Country]
      }

      input CountryInput {
        "Country Name"
        name: String!
        "Foreign Key to Region Ids"
        regionIds: [Int]
      }

      type Mutation {
        "Create Country"
        countryCreate(input: CountryInput): Country
        "Update The Country"
        countryUpdate(id: Int!, input: CountryInput): Country
        "Delete The Country"
        countryDelete(id: Int!): String
      }
    `
  }),
  func: {
    countriesBy: (args) => {
      if(mock) {
        const result = CountrySample.filter((country) => args.name===country.name);
        return result;
      }
    },
    country: (args) => {
      if(mock) {
        const result = CountrySample.filter((country) => args.id===country.id);
        return result.length === 0? {}: result[0];
      }
    },
    countries: () => {
      if(mock) {
        return CountrySample;
      }
    },
    countryCreate: (args) => {
      if(mock) {
        const {input} = args;
        const id = CountrySample[CountrySample.length-1].id + 1;
        CountrySample.push({
          id: id,
          name: input.name,
          regionIds: input.regionIds
        });
        return Country.func.country({id: id});
      }
    },
    countryUpdate: (args) => {
      if(mock) {
        const {id, input} = args;
        const country = Country.func.country({id: id});
        if(Object.keys(country).length === 0 && country.constructor === Object) {
          throw new GraphQLError(Response.NOT_FOUND_UPDATE(id));
        }
        else {
          const resultIndex = CountrySample.findIndex((country) => id === country.id);
          const country = CountrySample[resultIndex];
          country.name = input.name;
          country.regionIds = input.regionIds;
          return Country.func.country({id: id});
        }
      }
    },
    countryDelete: (args) => {
      if(mock) {
        const {id} = args;
        const resultIndex = CountrySample.findIndex((country) => id === country.id);
        if(resultIndex === -1) {
          throw new GraphQLError(Response.NOT_FOUND_DELETE(id));
        }
        else {
          CountrySample.splice(resultIndex, 1);
          return Response.DELETED(id);
        }
      }
    }
  },
  linkSchema: `
    extend type Country {
      regions: [Region]
    }
    `,
  linkFunc: (mergeInfo) => ({
    Country: {
      regions: {
        fragment: `fragment CountryFragment on Fragment { id }`,
        resolve(parent, args, context, info) {
          const regionIds = parent.regionIds;
          return mergeInfo.delegateToSchema(
            {
              schema: Region.schema,
              operation: 'query',
              fieldName: 'regionsByIds',
              args: { ids: regionIds },
              context: context,
              info: info
            }
          );
        },
      },
    }
  })
}

module.exports = Country
