<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Test Interview</h3>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#projects-structure">Projects structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#api">API</a>
         <ul>
            <li>
               <a href="#method-post">Method Post</a>
               <a href="#method-put">Method Put</a>
               <a href="#method-delete">Method Delete</a>
               <a href="#method-get">Method Get</a>
            </li>
         </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Have nodeJs and npm/yarn be installed (for running in local machine) this link https://nodejs.org/en will get into it
- Have Mysql be installed (for running in local machine) this link https://dev.mysql.com/downloads/file/?id=518834 will get into it.
- Have postman to test the api this link https://www.postman.com/downloads/postman-agent/ will get into it


- Clone the repo
  ```
  git clone https://github.com/PeaceAntoHim/62teknologi-senior-backend-test-frans-sebastian.git
   ```

- Create .env file and add this environment variable through that file
```
   DB_HOST='localhost'
   DB_USER='root'
   DB_PORT=3306
   DB_PASSWORD='example123'
   DB_DATABASE='business_db'
```

- Create database connection of mysql and create this database sql code
```
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
```
  

- Run this command bellow to start to install all dependencies

  ```
  $ npm install
  ```

- Run this command bellow to check all linter code and type error 
   ```
   $ npm run lint
   ```

- Run this command to start server with nodemon
  ```
   npm run dev
  ```

- Run this command to start server without nodemon
  ```
  npm run start
  ```



### Projects Structure
```
 ├───public
    └───src
         ├───controller
         ├───database
         └───models
```

## Api

### Method Post
- This method need parameter body to create data
  ```
    host: localhost
    port: 3000
    pathname: /business
    example: http://localhost:3000/business
  ```
- Example payload to create data and all this key data will required
  ```
   {
    "name": "John",
    "location": "New York",
    "latitude": "40.7128",
    "longitude": -74.006,
    "term": "food",
    "radius": 10,
    "categories": "restaurant",
    "locale": "en",
    "price": "$500",
    "open_now": 1,
    "open_at": 8,
    "attributes": "good",
    "sort_by": "rating"
  }
  ```
### Method Put

- This method need params id and need parameter body to updated the data
  ```
    host: localhost
    port: 3000
    pathname: /business/:id
    example: http://localhost:3000/business/1
  ```

- Example payload but in here all data will optional and we can custom the data want to update
  ```
   {
    "name": "John",
    "location": "New York",
    "latitude": "40.7128",
    "longitude": -74.006,
    "term": "food",
    "radius": 10,
    "categories": "restaurant",
    "locale": "en",
    "price": "$500",
    "open_now": 1,
    "open_at": 8,
    "attributes": "good",
    "sort_by": "rating"
  }
  ```
  ```
  {
      "name": "Johan Hartono", 
      "location": "Jln pluit permai 100 no 90", 
      "categories": "Cars"     
  }
  ```

### Method Delete

- This method just need params id 
  ```
    host: localhost
    port: 3000
    pathname: /business/:id
    example: http://localhost:3000/business/1
  ```

### Method Get

- This method optional to use params like term, location, latitude, longitude, radius, categories, locale, limit, offset, sort_by, price, open_now, open_at, attributes because if not use all those params when request method get into 
this pathname /business/search will query all data in database
  ```
    host: localhost
    port: 3000
    pathname: /business/search
    example: http://localhost:3000/business/search
  ```
- Example params will get data specific

```
http://localhost:3000/business/search?term=food
http://localhost:3000/business/search?location=New York
http://localhost:3000/business/search?latitude=40.7128 
http://localhost:3000/business/search?longitude=-74.006 
http://localhost:3000/business/search?radius=10
http://localhost:3000/business/search?categories=restaurant
http://localhost:3000/business/search?locale=en, 
http://localhost:3000/business/search?sort_by=rating,
http://localhost:3000/business/search?price=$500, 
http://localhost:3000/business/search?open_now= 1, 
http://localhost:3000/business/search?open_at= 8, 
http://localhost:3000/business/search?attributes= Good
```