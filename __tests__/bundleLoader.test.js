const bundleLoader = require('../src/bundleLoader.js');
const services = require('../src/serviceList.json');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const clientPath = '../src/client/';
const serverPath = '../src/server/';
const cssPath = '../src/css/';

jest.mock('node-fetch');
jest.mock('fs');
services.forEach((service) => {
  jest.mock(path.join(__dirname, `${serverPath}${service.name}.js`), () => ({ default: {} }), { virtual: true });
});

beforeAll(() => bundleLoader(clientPath, serverPath, cssPath));

test('creates client file', () => {
  services.forEach((service) => {
    const clientFile = path.join(__dirname, `${clientPath}${service.name}.js`);
    expect(fs.mockWritten(clientFile)).toBe(fetch.clientText);
  });
});

test('creates server file', () => {
  services.forEach((service) => {
    const clientFile = path.join(__dirname, `${serverPath}${service.name}.js`);
    expect(fs.mockWritten(clientFile)).toBe(fetch.serverText);
  });
});

test('creates css file', () => {
  services.forEach((service) => {
    const clientFile = path.join(__dirname, `${cssPath}${service.name}.css`);
    expect(fs.mockWritten(clientFile)).toBe(fetch.cssText);
  });
});

