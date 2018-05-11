/* eslint import/no-dynamic-require: 0 global-require: 0 */
const util = require('util');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const services = require('./serviceList.json');

const writeFile = util.promisify(fs.writeFile);

const loadBundles = () => {
  const fetches = services.map((service) => {
    const clientPath = path.join(__dirname, `../dist/bundles/${service.name}.js`);
    const serverPath = path.join(__dirname, `./services/${service.name}.js`);

    return fetch(service.clientUrl)
      .then(res => res.text())
      .then(text => writeFile(clientPath, text))
      .then(() => fetch(service.serverUrl))
      .then(res => res.text())
      .then(text => writeFile(serverPath, text))
      .then(() => {
        service.Component = require(serverPath).default;
        return service;
      });
  });
  return Promise.all(fetches);
};

module.exports = loadBundles;
