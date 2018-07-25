const express = require('express');
const http = require('http');
const config = require('./config/config').get(process.env.NODE_ENV);

// Express on
const app = express();

// Create through http
const server = http.createServer(app);

// Connect controllers
require('./controllers/controllers')(app);

/* -------------------- LISTENING FOR REQUESTS -------------------- */
server.listen(config.PORT, () => {
  global.console.log(`SERVER:${config.PORT}`);
});

module.exports.app = app;
