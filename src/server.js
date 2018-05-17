require('newrelic');
const serverCore = require('./serverCore.js');

const port = process.env.PORT || 3000;
const { app } = serverCore;

serverCore.startFetches()
  .then(() => {
    app.listen(port, '0.0.0.0', (err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      console.log(`server running at: ${port}`);
    });
  });

