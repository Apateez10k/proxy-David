const express = require('express');
const morgan = require('morgan');
const serverCore = require('./serverCore.js');

const port = process.env.PORT || 3000;
const { app } = serverCore;

app.use(morgan('dev'));
app.use(express.static('dist'));

serverCore.startFetches()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at: ${port}`);
    });
  });

