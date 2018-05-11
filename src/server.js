const express = require('express');
const morgan = require('morgan');
const React = require('react');
const ReactDOM = require('react-dom/server');
const template = require('./template/index.js');
const bundleLoader = require('./bundleLoader.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use(express.static('dist'));

bundleLoader()
  .then((services) => {
    app.use('/restaurants/:id', (req, res) => {
      services.forEach((service) => {
        const ele = React.createElement(service.Component);
        service.html = ReactDOM.renderToString(ele);
      });
      res.send(template(services));
    });

    app.listen(port, () => {
      console.log(`server running at: ${port}`);
    });
  });

