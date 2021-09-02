import React, { useState, useEffect} from "react";
import Axios from "axios";
import './App.css';

function App() {

  const [disciplina, setDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [listaDisciplinas, setListaDisciplinas] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setListaDisciplinas(response.data);
    })
  }, []);

  const cadastraDisciplina = () => {
    Axios.post("http://localhost:3001/api/insert", {disciplina: disciplina, professor: professor,});

    setListaDisciplinas([...listaDisciplinas, {disciplina: disciplina, professor: professor},]);
      
  };

  const deletaDisciplina = (id) => {
    Axios.delete('http://localhost:3001/api/delete/${id}')
  };

  return (
    <div className="App">
      
      <h1>Sistema de Cadastro de Alunos</h1>

      <div className="form">
      <label>Disciplina</label>
      <input type="text" name="disciplina" onChange={(d) => {
        setDisciplina(d.target.value)
      }} />
      <label>Professor</label>
      <input type="text" name="professor" onChange={(p) => {
        setProfessor(p.target.value)
      }}/>
      <button onClick={cadastraDisciplina}>Cadastrar</button>

      {listaDisciplinas.map((val) => {
        return (
        <div className = "card">
          <h1>{val.id}</h1>
          <h1>{val.disciplina}</h1> 
          <p>Professor: {val.professor}</p>
          <input type = "text" id = "updateInput" />
          <button>Atualizar</button>
          <button onClick={() => {deletaDisciplina(val.id)}}>Deletar</button>
        </div>
        );
      })};
      </div>

    </div>
  );
}

export default App;
