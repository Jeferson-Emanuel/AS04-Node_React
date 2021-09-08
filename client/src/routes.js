import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./Components/Home";
import Aluno from "./Components/Aluno";
import Disciplina from "./Components/Disciplina";
import Lista from "./Components/Lista";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Home }  path="/" exact />
           <Route component = { Aluno }  path="/aluno" />
           <Route component = { Disciplina }  path="/disciplina" />
           <Route component = { Lista } path="/lista" />
       </BrowserRouter>
   )
}

export default Routes;