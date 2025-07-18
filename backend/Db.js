import mysql from "mysql2/promise"
import mongoose from "mongoose";
const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'catersquad',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

mongoose.connect("mongodb+srv://22i203:catersquadunited@todo.q8oyzpm.mongodb.net/?retryWrites=true&w=majority&appName=Todo")
.then(()=>{console.log("Connected to MongoDB")}).catch((err)=>{console.error(err)})

export {db}