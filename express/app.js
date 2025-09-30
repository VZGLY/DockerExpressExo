const express = require("express")
const mysql = require("mysql")
const app = express()

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    connectionLimit : 10,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

app.get("/", (req, res) => {
    connection.query("SELECT * FROM Student", (err, rows) => {
        if (err) {
            res.json({success: false, err})
        }
        else{
            res.json({success: true, rows})
        }
    })
})

app.get("/post", (req, res) => {
    connection.query("INSERT INTO Student(student_name, student_age) VALUES('random', 99);", (err, rows) => {
        if (err) {
            res.json({success: false, err})
        }
        else{
            res.json({success: true, rows})
        }
    })
})

app.listen(5001, () => console.log("Listening on port 5001"))