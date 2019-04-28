const config = require('./config');

const express = require('express');
let app = express();

const routes = require('./routes/routes');

//  Connect all our routes to our application
app.use('/', routes);

app.listen(config.port, () => {
  console.log(`Started up at port ${config.port}`);
});

module.exports = { app };