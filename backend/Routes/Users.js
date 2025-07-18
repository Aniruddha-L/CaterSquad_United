import express from 'express'
import { db } from '../Db.js'

const User = express.Router()

    User.post('/register', async (req, res) => {
    const { name, username, email, password, phone } = req.body;

    if (!name || !username || !email || !password || !phone) {
        return res.status(403).json({ msg: "Missing required fields" });
    }

    const dateOfJoin = new Date().toISOString().slice(0, 19).replace('T', ' '); 

    try {
        await db.execute(
            `INSERT INTO USERS (name, username, email, passwd, DateOfJoin, phone)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, username, email, password, dateOfJoin, phone]
        )  
        return res.status(200).json({ msg: "Success" });
    } catch (err) {
        console.error("DB Insert Error:", err);
        return res.status(500).json({ msg: err.message });
    }
});


User.get('/checkUser/:name', async(req, res)=>{
    const id = req.params.name
    try {
        const rows = await db.query("SELECT * FROM users")
        if (rows == 0){
            return res.status(200).json({"msg":"User not found"})
        }
        return res.status(401).json(rows)
    } catch (error) {
        return res.status(402).json("Failed to read database please wait and retry")
    }
})

User.post('/login', async (req, res) => {
    if (!req.body.user || !req.body.passwd) return res.status(403).json({"msg":"Missing fields"})
    const username = req.body.user
    const password = req.body.passwd
    try {
        const [rows] = await db.query(
            `SELECT * FROM users WHERE (username = ? OR email = ?) AND passwd = ?`,
            [username, username, password]
        )

        if (rows.length === 0) {
            return res.status(401).json({ msg: "Invalid credentials", "user":username, "pass":password });
        }

        return res.status(200).json({ msg: "Login successful" });
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
});

User.post('/test', async(req, res)=>{
    try {
        const [rows] = await db.query(`SELECT * FROM USERS`);
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(402).json(err)
    }
})

User.get('/check-username/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length > 0) {
      return res.status(409).json({ msg: 'Username taken' });
    }
    return res.status(200).json({ msg: 'Username available' });
  } catch (err) {
    console.error("DB Query Error:", err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

User.get('/about/:username', async(req, res)=>{
    const username = req.params.username
    try {
        const ans = await db.query("SELECT * FROM users WHERE username = ?", username)
        if (!ans){
            return res.status(401).json({"msg":"User not found"})
        }
        return res.status(200).json(ans)
    } catch (error) {
        
    }
} )
export default User