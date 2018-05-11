const express = require('express');
const morgan = require('morgan');
const React = require('react');
const ReactDOM = require('react-dom/server');
const template = require('./template/index.js');
const bundleLoader = require('./bundleLoader.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

bundleLoader()
  .then((bundles) => {
    app.use('/restaurants/:id', (req, res) => {
      const body = bundles.map((bundle) => {
        const ele = React.createElement(bundle);
        return ReactDOM.renderToString(ele);
      }).join('');
      res.send(template(body));
    });

    app.listen(port, () => {
      console.log(`server running at: ${port}`);
    });
  });

