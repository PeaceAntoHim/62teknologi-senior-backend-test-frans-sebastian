CREATE DATABASE business_db;
USE business_db;

CREATE TABLE businesses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  latitude VARCHAR(255),
  longitude VARCHAR(255),
  term VARCHAR(255),
  radius INT,
  categories VARCHAR(255),
  locale VARCHAR(255),
  price VARCHAR(255),
  open_now BOOLEAN,
  open_at INT,
  attributes VARCHAR(255),
  sort_by VARCHAR(255)
);