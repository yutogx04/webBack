//connection to the frontend
const express = require('express')
const app = express()
const port = 3000

const cors = require('cors');
app.use(cors());
app.use(express.json())
//connection to the database
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Web_Dev_Project'
})
connection.connect()


//routing
app.get('/', (req, res) => {
  connection.query('SELECT first_name,last_name,DATE(date_of_birth) AS date_of_birth,gender,contact,conditon FROM Patient;', function (err, result) {
    if (err) throw err;
    result.forEach((row) => {
      row.date_of_birth = row.date_of_birth.toISOString().split('T')[0];
    });
    res.send(result);
  });
})

app.post('/', (req, res) => {
  console.log(req.body);

  connection.query(
    'INSERT INTO Patient (first_name, last_name, date_of_birth, gender, contact, conditon)  VALUES ("'+
    req.body.first_name +'","'+
    req.body.last_name +'","'+
    req.body.date_of_birth +'","'+
    req.body.gender +'","'+
    req.body.contact +'","'+
    req.body.condition +'");',
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).send('Error inserting data into the database');
      }
      res.status(201).send('Patient added successfully');
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


