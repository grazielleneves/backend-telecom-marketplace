CREATE TYPE USER_TYPE AS ENUM ('client', 'service-provider', 'asset-provider');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  user_type USER_TYPE NOT NULL
);
