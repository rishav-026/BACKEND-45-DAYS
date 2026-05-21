const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password_here',  // must match MySQL root password
  database: 'testdb'
});
module.exports = connection;
