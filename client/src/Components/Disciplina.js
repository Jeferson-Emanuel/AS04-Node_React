import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Footer from './Footer';

const Disciplina = () => {

  const [disciplina, setDisciplina] = useState ('');
  const [professor, setProfessor] = useState ('');
  const [listaDisciplinas, setListaDisciplinas] = useState ([]);
  const [newProfessor, setNewProfessor] = useState ('');

  function clearForms(){
    setDisciplina('');
    setProfessor('');
  }

  useEffect (() => {
    Axios.get ('http://localhost:3001/disciplina/api/get').then (response => {
      setListaDisciplinas (response.data);
    });
  }, []);

  //Função para cadastrar disciplina
  const cadastraDisciplina = () => {
    Axios.post ('http://localhost:3001/disciplina/api/insert', {
      disciplina: disciplina,
      professor: professor,
    });

    setListaDisciplinas ([
      ...listaDisciplinas,
      {disciplina: disciplina, professor: professor},
    ]);
    clearForms();
  };

  //Função para deletar disciplina
  const deletaDisciplina = delDisciplina => {
    Axios.delete (
      `http://localhost:3001/disciplina/api/delete/${delDisciplina}`
    );
  };

  //Função para atualizar disciplina
  const atualizaProfessor = async oldId => {
    await Axios.put ('http://localhost:3001/disciplina/api/update', {
      id: oldId,
      professor: newProfessor,
    });
    setNewProfessor ('');
  };

  return (
    <div>
      <header>
        <div id="menu">
          <div><Link to="/" style={{color: 'white'}}>Home</Link></div>
          <div><Link to="/aluno" style={{color: 'white'}}>Aluno</Link></div>
          <div>
            <Link to="/disciplina" style={{color: 'white'}}>Disciplina</Link>
          </div>
          <div><Link to="/lista" style={{color: 'white'}}>Lista</Link></div>
        </div>
      </header>

      <div id="unica">
      <div className="container"></div>

      <div className="form">

        <label>Disciplina</label>
        <input
          type="text"
          name="disciplina"
          value={disciplina}
          onChange={d => {
            setDisciplina (d.target.value);
          }}
        />
        <label>Professor</label>
        <input
          type="text"
          name="professor"
          value={professor}
          onChange={p => {
            setProfessor (p.target.value);
          }}
        />
        <button onClick={cadastraDisciplina}>Cadastrar</button>

        
      </div>
      <div className="form">
      {listaDisciplinas.map (val => {
          return (
            <div key={val.id} className="card">
              <h1>{val.disciplina}</h1>
              <p>Professor: {val.professor}</p>
              <input
                type="text"
                id="updateInput"
                placeholder="Novo professor"
                onChange={a => {
                  setNewProfessor (a.target.value);
                }}
              />
              <button
                onClick={() => {
                  atualizaProfessor (val.id);
                }}
              >
                Atualizar
              </button>

              <button
                hidden
                onClick={() => {
                  deletaDisciplina (val.id);
                }}
              >
                Deletar
              </button>
            </div>
          );
        })}
      </div>
      <Footer />
      </div>
    </div> 

  );
};

export default Disciplina;
