import React, { useState, useEffect} from "react";
import Axios from "axios";
import './App.css';

function App() {

  const [disciplina, setDisciplina] = useState("");
  const [professor, setProfessor] = useState("");
  const [listaDisciplinas, setListaDisciplinas] = useState([]);

  const [newProfessor, setNewProfessor] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setListaDisciplinas(response.data);
    })
  }, [newProfessor]);

  //Função para cadastrar disciplina
  const cadastraDisciplina = () => {
    Axios.post("http://localhost:3001/api/insert", {disciplina: disciplina, professor: professor,});

    setListaDisciplinas([...listaDisciplinas, {disciplina: disciplina, professor: professor},]);
      
  };

  //Função para deletar disciplina
  const deletaDisciplina = (delDisciplina) => {
    Axios.delete(`http://localhost:3001/api/delete/${delDisciplina}`);
  };

  //Função para atualizar disciplina
  const atualizaProfessor = async(oldId) => {
    console.log(newProfessor);
    await Axios.put("http://localhost:3001/api/update", {id: oldId, professor: newProfessor,});

    setNewProfessor("");

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
        <div key={val.id} className="card">
          <h1 hidden>{val.id}</h1>
          <h1>{val.disciplina}</h1> 
          <p>Professor: {val.professor}</p>
          <input type = "text" id = "updateInput" onChange={(a) => {
            setNewProfessor(a.target.value)
          }} />
          <button onClick={() => {atualizaProfessor(val.id)}}>Atualizar</button>

          <button onClick={() => {deletaDisciplina(val.id)}}>Deletar</button>
        </div>
        )
      })}
      </div>

    </div>
  );
}

export default App;
