import mysql from "mysql2";

export const sql = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0321",
  database: "quiz",
  port: "3308",
});

export default sql;
