/* eslint import/no-dynamic-require: 0, global-require: 0, no-param-reassign: 0 */
const util = require('util');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const services = require('./serviceList.json');

const writeFile = util.promisify(fs.writeFile);

const loadBundles = (clientPath, serverPath, cssPath) => {
  const fetches = services.map((service) => {
    const clientFile = path.join(__dirname, `${clientPath}${service.name}.js`);
    const serverFile = path.join(__dirname, `${serverPath}${service.name}.js`);
    const cssFile = path.join(__dirname, `${cssPath}${service.name}.css`);

    return fetch(service.clientUrl)
      .then(res => res.text())
      .then(text => writeFile(clientFile, text))

      .then(() => fetch(service.cssUrl))
      .then(res => res.text())
      .then(text => writeFile(cssFile, text))

      .then(() => fetch(service.serverUrl))
      .then(res => res.text())
      .then(text => writeFile(serverFile, text))
      .then(() => {
        service.Component = require(serverFile).default;
        return service;
      });
  });
  return Promise.all(fetches);
};

module.exports = loadBundles;
