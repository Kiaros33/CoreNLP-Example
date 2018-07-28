const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config').get(process.env.NODE_ENV);

// Express on
const app = express();

// Create through http
const server = http.createServer(app);

// CORS and bodyParser enabled
app.use(cors());
app.use(bodyParser.json());

// Connect controllers
require('./controllers/controllers')(app);

/* -------------------- LISTENING FOR REQUESTS -------------------- */
server.listen(config.PORT, () => {
  global.console.log(`SERVER:${config.PORT}`);
});

module.exports.app = app;
