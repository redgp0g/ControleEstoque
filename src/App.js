import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import AddAlertaEstoque from "./components/AddAlertaEstoque";
import AlertaEstoqueList from "./components/AlertaEstoqueList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/estoque" className="navbar-brand">
          Controle de Estoque
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/alertaestoque"} className="nav-link">
              Estoques Lançados
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Lançar
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/alertaestoque" element={<AlertaEstoqueList/>} />
          <Route path="/add" element={<AddAlertaEstoque/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
