const { Pool } = require('pg');

// use dontenv to hide pg_uri when ready 
const PG_URI = process.env.REACT_APP_PG_URI;

const pool = new Pool({
    connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
      // console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
