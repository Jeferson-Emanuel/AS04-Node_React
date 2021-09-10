import React, { useState, useEffect} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Aluno = () => {

  function clearForms(){
    setNome('');
    setEmail('');
    setNaturalidade('');
    setDisciplina('');
  }

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
    clearForms();  
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

    <div id="unica">
      <div className="container"></div>
      
      <div className="form">    
      
      <label>Nome</label>
      <input type="text" name="nome" value={nome} onChange={(n) => {setNome(n.target.value)}}/>
      <label>Email</label>
      <input type="text" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
      <label>Naturalidade</label>
      <input type="text" name="Naturalidade" value={naturalidade} onChange={(b) => {setNaturalidade(b.target.value)}}/>
      <label>Disciplina</label>
      <select type="text" name="selecao" value={disciplina} onChange={(d) => {setDisciplina(d.target.value)}}>
          <option value="0">Selecione disciplina</option>
          {listaDisciplinas.map((val) => <option key={val.id} value={val.id}>{val.disciplina}</option>)}
      </select>
            
      <button onClick={cadastraAluno}>Cadastrar</button>

      
      </div>
      <Footer />
    </div> 
      

      </div>
    );
}

export default Aluno;