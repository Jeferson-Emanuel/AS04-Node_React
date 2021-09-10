import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import image from '../Media/logo.png';

const Home = () =>{
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
      <div className="container">

        <div className="form" style = {{marginTop: `2.6%`}}>
        <div className="form-page" style = {{backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', width:'330px', height:'150px'}}>      
        </div>
        <span>Sistema de Cadastro de Alunos</span> 
        </div>
        <Footer />
      </div>
    </div> 
    </div>
  );
}

export default Home;