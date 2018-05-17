/* eslint no-param-reassign: 0 */
const path = require('path');
const fastify = require('fastify');
const morgan = require('morgan');
const React = require('react');
const ReactDOM = require('react-dom/server');
const template = require('./template/index.js');
const bundleLoader = require('./bundleLoader.js');
const serveStatic = require('serve-static');

const app = fastify();
app.use('/', serveStatic(path.join(__dirname, '../dist')));
app.use(morgan('dev'));

const clientPath = '../dist/bundles/';
const serverPath = './services/';
const cssPath = '../dist/bundles/';

const startFetches = () => (
  bundleLoader(clientPath, serverPath, cssPath)
    .then((services) => {
      app.get('/restaurants/:id', (req, res) => {
        services.forEach((service) => {
          const ele = React.createElement(service.Component);
          service.html = ReactDOM.renderToString(ele);
        });
        res
          .code(200)
          .header('Content-Type', 'text/html')
          .send(template(services));
      });
    })
);

module.exports.startFetches = startFetches;
module.exports.app = app;

