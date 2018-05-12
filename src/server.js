const express = require('express');
const morgan = require('morgan');
const React = require('react');
const ReactDOM = require('react-dom/server');
const template = require('./template/index.js');
const bundleLoader = require('./bundleLoader.js');
const serverCore = require('./serverCore.js');

const port = process.env.PORT || 3000;
app = serverCore.app;

app.use(morgan('dev'));

app.use(express.static('dist'));

serverCore.startFetches()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at: ${port}`);
    });
  });

