const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use('/restaurants/:id', express.static('dist'));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

