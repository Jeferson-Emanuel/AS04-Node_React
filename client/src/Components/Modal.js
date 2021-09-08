import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Modal from 'react-modal';

function ModalJanela({closeModal, id}) {

  const [idOld, setIDOld] = useState ('');
  const [nome, setNome] = useState ('');
  const [email, setEmail] = useState ('');
  const [naturalidade, setNaturalidade] = useState ('');
  const [disciplina, setDisciplina] = useState ('');

  const [alunoBase, setAlunoBase] = useState ({});
  const [listaDisciplinas, setListaDisciplinas] = useState ([]);

  useEffect (() => {
    Axios.get (`http://localhost:3001/modal/api/get/${id}`).then (response => {
      setAlunoBase (response.data[0]);
      const dados = response.data[0];
      console.log(dados);
      setIDOld (dados.id);
      setNome (dados.nome);
      setEmail (dados.email);
      setNaturalidade (dados.naturalidade);
      setDisciplina (dados.disciplina);
    });
    Axios.get ("http://localhost:3001/modal/api/get").then (response => {
      setListaDisciplinas (response.data);
    });    
  }, []);

  //Função para atualizar aluno
  const atualizaAluno = async idUpdate => {
    await Axios.put ("http://localhost:3001/modal/api/update", {
      id: idUpdate,
      nome: nome,
      email: email,
      naturalidade: naturalidade,
      disciplina: disciplina,
    });
    console.log(disciplina);
  };

  //Função para atualizar aluno
  /* const atualizaAluno = () => {
    Axios.post ('http://localhost:3001/modal/api/insert', {
      nome: nome,
      email: email,
      naturalidade: naturalidade,
      disciplina: disciplina,
    });
    console.log(disciplina);
  }; */

  return (
    <Modal isOpen={closeModal}>

      <div className="modalBackground">

        <button onClick={() => closeModal (false)}>X</button>

        <div key={idOld} className="form">

          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={nome}
            onChange={n => {
              setNome (n.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={e => {
              setEmail (e.target.value);
            }}
          />
          <label>Naturalidade</label>
          <input
            type="text"
            name="Naturalidade"
            value={naturalidade}
            onChange={b => {
              setNaturalidade (b.target.value);
            }}
          />
          <label>Disciplina</label>
          <select
            type="text"
            name="selecao"
            onChange={d => {
              setDisciplina (d.target.value);
            }}
          >
            <option value="0">Selecione disciplina</option>
            {listaDisciplinas.map (val => (
              <option key={val.id} value={val.id}>{val.disciplina}</option>
            ))}
          </select>

          <button onClick={() => atualizaAluno(idOld)}>Atualizar</button>
          {/* <button onClick={atualizaAluno}>Atualizar</button> */}
          <button onClick={() => closeModal (false)}>Cancela</button>

        </div>

      </div>

    </Modal>
  );
}

export default ModalJanela;
