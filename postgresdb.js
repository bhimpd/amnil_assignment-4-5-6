const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'api',
  password: '',
  port: 5432,
  autoCommit: true,

});

module.exports = pool;
