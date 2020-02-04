const { Pool } = require('pg');
require('dotenv').config();

// use dontenv to hide pg_uri when ready
const { PG_URI } = process.env;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
