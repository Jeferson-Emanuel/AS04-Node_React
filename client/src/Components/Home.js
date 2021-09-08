import React from 'react';
import { Link } from 'react-router-dom';

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
    </div>
  );
}

export default Home;