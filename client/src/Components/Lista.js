import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Modal from './Modal';
import Footer from './Footer';

const Lista = () => {
  const [openModal, setOpenModal] = useState (false);
  const [idAluno, sendIdAluno] = useState ('');
  const [listaAlunos, setListaAlunos] = useState ([]);
  const [alunoDeletado, setAlunoDeletado] = useState (false);

  function loadPage () {
    Axios.get ('http://localhost:3001/lista/api/get').then (response => {
      setListaAlunos (response.data);
      setAlunoDeletado (false);
    });
  }  

  useEffect (() => {loadPage()}, [openModal, alunoDeletado]);

  //Função para deletar aluno
  const deletaAluno = delAluno => {
    Axios.delete (`http://localhost:3001/lista/api/delete/${delAluno}`);
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

      <div className="row">
        <table id="registros">
          <tbody>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Naturalidade</th>
            <th>Disciplina</th>
            <th>Professor</th>
            <th style={{width:'180px'}}>Ações</th>
          </tr>

          {listaAlunos.map (val => {
            return (
              <tr key={val.id}>
                <td>{val.nome}</td>
                <td>{val.email}</td>
                <td>{val.naturalidade}</td>
                <td>{val.disciplina}</td>
                <td>{val.professor}</td>
                <td style={{display: 'flex', columnGap: '5px', justifyContent: 'center', alignItems: 'center'}}>
                  <button 
                    onClick={() => {
                      setOpenModal (true), sendIdAluno (val.id);
                    }}
                  >
                    Atualizar
                  </button>
                  <button
                    style={{backgroundColor: '#FF6633'}}
                    onClick={() => {
                      setAlunoDeletado (true), deletaAluno (val.id);
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      {openModal && <Modal closeModal={setOpenModal} id={idAluno} loadPage={loadPage}/>}
      <Footer />
      </div>
    </div> 
  );
};

export default Lista;
