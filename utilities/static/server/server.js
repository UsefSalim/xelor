require('dotenv').config({ path: './config/.env' });

const express = require('express');

const app = express();
require('./app')(app);
require('./config/db');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app lisning : localhost:${PORT}`);
});
