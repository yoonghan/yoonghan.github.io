const graphQL = require('./static/host/rn-console/server');

module.exports = function (expressapp) {

  const rnConsoleDomain = "/rems";
  console.log(`Start ${rnConsoleDomain} for rn-console`);
  graphQL(expressapp, rnConsoleDomain);
  console.log(`Running ${rnConsoleDomain} for rn-console`);
}
