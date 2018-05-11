/* eslint import/no-dynamic-require: 0 global-require: 0 */
const util = require('util');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const services = require('./serviceList.json');

const writeFile = util.promisify(fs.writeFile);

const loadBundles = () => {
  const fetches = services.map((service) => {
    const bundlePath = path.join(__dirname, `../dist/bundles/${service.name}.js`);
    return fetch(service.bundleUrl)
      .then(res => res.text())
      .then(text => writeFile(bundlePath, text))
      .then(() => require(bundlePath).default);
  });
  return Promise.all(fetches);
};

module.exports = loadBundles;
