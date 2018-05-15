require('newrelic');
const serverCore = require('./serverCore.js');

const port = process.env.PORT || 3000;
const { app } = serverCore;

serverCore.startFetches()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at: ${port}`);
    });
  });

