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

- Have nodeJs and npm/yarn be installed (for running in local machine)
- Have Mysql be installed (for running in local machine) this link https://dev.mysql.com/downloads/file/?id=518834 will get into it.


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

- Run this command to start development server
  ```
   npm run dev
  ```

- Run this command to start the application
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

### Method Get


  
- First '/' for the login in this will go to login page. In here you need email and password to login, here credentials will be used:
  ```
  
  ```



