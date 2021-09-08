import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Modal from './Modal';

const Lista = () => {
  const [openModal, setOpenModal] = useState (false);
  const [idAluno, sendIdAluno] = useState ('');
  const [listaAlunos, setListaAlunos] = useState ([]);

  function loadPage () {
    Axios.get ('http://localhost:3001/lista/api/get').then (response => {
      setListaAlunos (response.data);
    });
  }

  useEffect (() => {loadPage()}, []);

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

      <div className="row">
        <table>
          <tbody>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Naturalidade</th>
            <th>Disciplina</th>
            <th>Professor</th>
            <th />
          </tr>

          {listaAlunos.map (val => {
            return (
              <tr key={val.id}>
                <td>{val.nome}</td>
                <td>{val.email}</td>
                <td>{val.naturalidade}</td>
                <td>{val.disciplina}</td>
                <td>{val.professor}</td>
                <td>
                  <button
                    onClick={() => {
                      setOpenModal (true), sendIdAluno (val.id);
                      console.log(idAluno);
                    }}
                  >
                    Atualizar
                  </button>
                  <button
                    onClick={() => {
                      deletaAluno (val.id);
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
      {openModal && <Modal closeModal={setOpenModal} id={idAluno} />}
    </div>
  );
};

export default Lista;
