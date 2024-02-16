import { Pool } from 'pg'; //conjunto de conexões

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'GRAzi12@',
  port: 5432,
});

export default pool;
