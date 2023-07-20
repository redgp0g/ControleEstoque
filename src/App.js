import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import AddEstoque from "./components/AddEstoque";
import Estoque from "./components/Estoque";
import EstoqueList from "./components/EstoqueList";
import EstoqueDashboard from "./components/EstoqueDashboard";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/estoque" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/estoque"} className="nav-link">
              Estoques Lançados
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Lançar
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/estoquedashboard"} className="nav-link">
              Dashboard
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/estoque" element={<EstoqueList/>} />
          <Route path="/add" element={<AddEstoque/>} />
          <Route path="/estoque/:id" element={<Estoque/>} />
          <Route path="/estoquedashboard" element={<EstoqueDashboard/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
