const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "sistemacadastroaluno",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM disciplina";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const disciplina = req.body.disciplina;
    const professor = req.body.professor;

    const sqlInsert = "INSERT INTO disciplina (disciplina, professor) VALUES (?,?)"
    db.query(sqlInsert, [disciplina, professor], (err, result) => {
        if (err) console.log(result);
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM disciplina WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        console.log(err);
    });
});

app.listen(3001, () => {
    console.log("Port 3001.");
});