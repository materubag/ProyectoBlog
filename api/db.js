import mysql from "mysql";
import {HOST,USER,PASSWORD,DATABASE} from "./config.js";

export const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
});

db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as id', db.threadId);
});

