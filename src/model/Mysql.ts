import mysql from 'mysql';

class Mysql {

   private 
   
// Konfigurasi koneksi database
const connection = mysql.createConnection({
  host: 'your_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

}