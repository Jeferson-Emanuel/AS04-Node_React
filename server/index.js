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
app.use(bodyParser.urlencoded({
    extended: true
}));

//Retorna todos os dados da tabela disciplina
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM disciplina";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

//Recebe dados do form e grava no BD
app.post("/api/insert", (req, res) => {

    const disciplina = req.body.disciplina;
    const professor = req.body.professor;

    const sqlInsert = "INSERT INTO disciplina (disciplina, professor) VALUES (?,?)"
    db.query(sqlInsert, [disciplina, professor], (err, result) => {
        if (err) console.log(result);
    });
});

//Deleta objeto do BD por id
app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM disciplina WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        console.log(err);
    });
});

//Atualiza objeto no BD por id
app.put("/api/update", (req, res) => {
    const id = req.body.id;
    const professor = req.body.professor;
    console.log(professor)
    const sqlUpdate = "UPDATE disciplina SET professor = ? WHERE id = ?"; //disciplin(tabela) disciplina(coluna)
    db.query(sqlUpdate, [professor, id], (err, result) => {
        if (err) console.log(err);
    });
});

app.listen(3001, () => {
    console.log("Port 3001.");
});