const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors())

const db = mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:"2gether"
})

app.get('/', (re,res)=>{
    return res.json("From backend side");
})

app.listen(8081, ()=>{
    console.log("listening");
})