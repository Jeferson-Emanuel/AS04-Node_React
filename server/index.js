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
    charset: 'utf8mb4',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Retorna todos os dados da tabela aluno com JOIN pra disciplina
app.get("/lista/api/get", (req, res) => {
    const sqlSelect = "SELECT A.id, A.nome, A.email, A.naturalidade, D.disciplina, D.professor FROM sistemacadastroaluno.aluno as A INNER JOIN sistemacadastroaluno.disciplina as D ON A.disciplina_id = D.id;";
    db.query(sqlSelect, (err, result) => {
        console.log(result)
        return res.send(result);        
    });
});

//Retorna todos os dados da tabela disciplina
app.get("/disciplina/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM sistemacadastroaluno.disciplina";
    db.query(sqlSelect, (err, result) => {
        console.log(result)
        return res.send(result);        
    });
});

//Retorna todos os dados da tabela disciplina
app.get("/aluno/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM sistemacadastroaluno.disciplina";
    db.query(sqlSelect, (err, result) => {
        console.log(result)
        return res.send(result);        
    });
});

//Retorna todos os dados da tabela disciplina
app.get("/modal/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM sistemacadastroaluno.disciplina";
    db.query(sqlSelect, (err, result) => {
        console.log(result)
        return res.send(result);        
    });
});

//Retorna um aluno pelo id da tabela aluno
app.get("/modal/api/get/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    const sqlSelect = "SELECT * FROM sistemacadastroaluno.aluno WHERE id = ?";
    db.query(sqlSelect, id, (err, result) => {
        console.log(result)
        return res.send(result);        
    });
});

//Recebe dados do form e grava aluno no BD
app.post("/aluno/api/insert", (req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const naturalidade = req.body.naturalidade;
    const disciplina = req.body.disciplina;

    const sqlInsert = "INSERT INTO aluno (nome, email, naturalidade, disciplina_id) VALUES (?,?,?,?)"
    db.query(sqlInsert, [nome, email, naturalidade, disciplina], (err, result) => {
        if (err) console.log(result);
    });
});

//Recebe dados do form e grava aluno no BD pelo Modal
app.post("/modal/api/insert", (req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const naturalidade = req.body.naturalidade;
    const disciplina = req.body.disciplina;

    const sqlInsert = "INSERT INTO aluno (nome, email, naturalidade, disciplina_id) VALUES (?,?,?,?)"
    db.query(sqlInsert, [nome, email, naturalidade, disciplina], (err, result) => {
        if (err) console.log(result);
    });
});


//Recebe dados do form e grava disciplina no BD
app.post("/disciplina/api/insert", (req, res) => {

    const disciplina = req.body.disciplina;
    const professor = req.body.professor;

    const sqlInsert = "INSERT INTO disciplina (disciplina, professor) VALUES (?,?)"
    db.query(sqlInsert, [disciplina, professor], (err, result) => {
        if (err) console.log(result);
    });
});

//Deleta aluno do BD por id
app.delete("/lista/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM aluno WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        console.log(err);
    });
});

//Deleta disciplina do BD por id
app.delete("/disciplina/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM disciplina WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        console.log(err);
    });
});

//Atualiza aluno na disciplina no BD por id
app.put("/modal/api/update", (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const email = req.body.email;
    const naturalidade = req.body.naturalidade;
    const disciplina = req.body.disciplina;

    console.log(req.body)

    const sqlUpdate = "UPDATE aluno SET aluno.nome = ?, aluno.email = ?, aluno.naturalidade = ?, aluno.disciplina_id = ? WHERE aluno.id = ?";
    db.query(sqlUpdate, [nome, email, naturalidade, disciplina, id], (err, result) => {
        if (err) console.log(err);
    });
});

//Atualiza professor na disciplina no BD por id
app.put("/disciplina/api/update", (req, res) => {
    const id = req.body.id;
    const professor = req.body.professor;

    const sqlUpdate = "UPDATE disciplina SET professor = ? WHERE id = ?"; //disciplin(tabela) professor(coluna)
    db.query(sqlUpdate, [professor, id], (err, result) => {
        if (err) console.log(err);
    });
});

app.listen(3001, () => {
    console.log("Port 3001.");
});