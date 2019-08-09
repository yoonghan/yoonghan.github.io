const {GraphQLError} = require('graphql');
const Response = require("./response");
const Country = require('./country');

test('Test Country Query', () => {
  const {countriesBy, country, countries} = Country.func;

  expect(countriesBy({name:"Singapore"}))
  .toEqual([{"id": 1, "name": "Singapore", "regionIds": [12, 13]}]);

  expect(countriesBy({name:"None"}).length).toBe(0);

  expect(country({id:1}))
  .toEqual({"id": 1, "name": "Singapore", "regionIds": [12, 13]});

  expect(country({id:2})).toEqual({});

  expect(countries().length)
  .toBe(1);
});

test('Test countryCreate, countryUpdate, countryDelete', () => {
  const {countryCreate, countryUpdate, countryDelete} = Country.func;

  expect(countryCreate({input:{
    name: "Test",
    regionIds: [12, 14]
  }}))
  .toEqual({"id": 2, "name": "Test", "regionIds": [12, 14]});

  expect(()=>countryUpdate({id:99})).toThrow(GraphQLError);
  expect(countryUpdate({id: 2, input:{
    name: "Change Test",
    regionIds: [12, 14]
  }}))
  .toEqual({"id": 2, "name": "Change Test", "regionIds": [12, 14]});

  expect(()=>countryDelete({id:99})).toThrow(GraphQLError);
  expect(countryDelete({id:2})).toBe(Response.DELETED(2));
});
