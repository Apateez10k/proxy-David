const express = require('express');
const morgan = require('morgan');
const React = require('react');
const ReactDOM = require('react-dom/server');
const template = require('./template/index.js');
const bundleLoader = require('./bundleLoader.js');

const app = express();
app.use(morgan('dev'));
app.use(express.static('dist'));

const clientPath = '../dist/bundles/';
const serverPath = './services/';
const cssPath = '../dist/bundles/';

const startFetches = () => (
  bundleLoader(clientPath, serverPath, cssPath)
    .then((services) => {
      app.use('/restaurants/:id', (req, res) => {
        services.forEach((service) => {
          const ele = React.createElement(service.Component);
          service.html = ReactDOM.renderToString(ele);
        });
        res.send(template(services));
      });
    })
);

module.exports.startFetches = startFetches;
module.exports.app = app;

