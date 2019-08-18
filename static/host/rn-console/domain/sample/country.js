module.exports = [
  {
    id: 1,
    name: "Singapore",
    regionIds: [12, 13]
  }
];

/*
// Insert
mutation {
  countryCreate(input: {
    name: "Europe"
    regionIds: [12, 13]
  }){
    id
    name
  }
}

// Update
mutation {
  countryUpdate(id:1, input: {name: "Europe", regionIds: [12, 13]}) {
    id
    name
  }
}

// Query
query {
  countries {
    id
    name
    regionIds
  }
}

query {
  country(1) {
    id
    name
    regionIds
  }
}

query {
  country(id:1) {
    id
    name
    regionIds
    regions{
      id
    }
  }
}
*/
