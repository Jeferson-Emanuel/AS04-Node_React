import React, { useState, useEffect} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Aluno = () => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [naturalidade, setNaturalidade] = useState('');
  const [disciplina, setDisciplina] = useState('');

  const [listaDisciplinas, setListaDisciplinas] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/aluno/api/get").then((response) => {
      setListaDisciplinas(response.data);
    })
  }, []);

  //Função para cadastrar aluno
  const cadastraAluno = () => {
    Axios.post("http://localhost:3001/aluno/api/insert", {nome: nome, email: email, naturalidade: naturalidade, disciplina: disciplina,});  
  };

    return (
        <div>
        <header>
        <div id="menu">
            <div><Link to="/" style={{color: "white"}}>Home</Link></div> 
            <div><Link to="/aluno" style={{color: "white"}}>Aluno</Link></div>
            <div><Link to="/disciplina" style={{color: "white"}}>Disciplina</Link></div>
            <div><Link to="/lista" style={{color: "white"}}>Lista</Link></div>
        </div>
    </header>

<div className="form">    
      
      <label>Nome</label>
      <input type="text" name="nome" onChange={(n) => {setNome(n.target.value)}}/>
      <label>Email</label>
      <input type="text" name="email" onChange={(e) => {setEmail(e.target.value)}}/>
      <label>Naturalidade</label>
      <input type="text" name="Naturalidade" onChange={(b) => {setNaturalidade(b.target.value)}}/>
      <label>Disciplina</label>
      <select type="text" name="selecao" onChange={(d) => {setDisciplina(d.target.value)}}>
          <option value="0">Selecione disciplina</option>
          {listaDisciplinas.map((val) => <option key={val.id} value={val.id}>{val.disciplina}</option>)}
      </select>
            
      <button onClick={cadastraAluno}>Cadastrar</button>      

      </div>
      </div>
    );
}

export default Aluno;