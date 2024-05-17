//const mysql = require("mysql2");//must be installed with npm
import mysql from "mysql2";

// Create a pool of database connections
const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'gritacademy',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
//    rowsAsArray: true,

  });
  // Export a function to execute SQL queries
export function 
    query(sql, values){
      return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
          if (err) {
            return reject(err);
          }
          return resolve(results);
        });
      });
    }
  