var express = require("express");
const app = express();
const port = 3000;

// Conectar a base de datos y dejar la conexión abierta 
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "usersnode",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database");
});

// Modificaciones para que el req.body reciba los datos
const bodyParser = require("body-parser"); //Importa el módulo body-parser de Express para que los datos esten disponibles en req.body
app.use(bodyParser.json()); //Configura el middleware para analizarlo con formato JSON. Esto es útil en datos body de una solicitud POST o PUT en formato JSON.
app.use(bodyParser.urlencoded({ extended: true }));//Configura el middleware para cuando el post es con application/x-www-form-urlencoded

app.post('/createUser', (req, res) => {
  console.log(req.body);
  var nom = req.body.nom;
  var cognoms = req.body.cognoms;

  if (!nom || !cognoms) {
    return res.status(400).send("Required data!");
  }

  var sql = `INSERT INTO users (nom, cognoms) VALUES ('${nom}', '${cognoms}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send("User create!");
  });
});

app.put('/updateUser/:id', (req, res) => {
  var userId = req.params.id;
  var nom = req.body.nom;
  var cognoms = req.body.cognoms;

  if (!nom && !cognoms) {
    return res.status(400).send("Nothing to update, no data!");
  }

  var sql = `UPDATE users SET nom = '${nom}', cognoms = '${cognoms}' WHERE id = ${userId}`;

  con.query(sql, function (err, result) {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).send("Error processing the request!");
    }
    if (result.affectedRows == 0) {
      return res.status(404).send("User not found! 404!");
    }
    console.log("User successfully updated");
    res.send("User successfully updated");
  });
});

app.delete('/deleteUser/:id', (req, res) => {
  var userId = req.params.id;
  
  var sql = `DELETE FROM users WHERE id = ${userId}`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    console.log("User successfully deleted!");
    res.send("User successfully deleted!");
  });
});

app.get('/getUsers', (req, res) => {
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//Puerto por el que se ejecuta el proyecto
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//Cerrar la base de datos al cerrar proyecto
process.on("SIGINT", function () {
  console.log("Closing database connection");
  con.end();
  process.exit();
});
