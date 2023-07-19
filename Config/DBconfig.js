import mysql from "mysql2"; // Importing the mysql module

export const sql = mysql.createPool({
  host: "localhost",      // Host name
  user: "root",           // Username 
  password: "0321",       // Password
  database: "quiz",       // Database Name
  port: "3308",           // Port number 
});

export default sql;       // Exporting the created MySQL connection pool as the default export
