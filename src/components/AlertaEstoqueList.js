import React, { useState, useEffect } from "react";
import AlertaEstoqueDataService from "../services/AlertaEstoqueService";
import EstoqueTable from "./EstoqueTable"; // Importe o novo componente aqui

const AlertaalertaEstoquesList = () => {
  const [alertaestoques, setAlertaalertaEstoques] = useState([]);
  const [alertaestoquescompleto, setAlertaalertaEstoquesCompleto] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    retrieveAlertaalertaEstoques();
  }, []);


  
  const filterData = (data, term) => {
    if (term == "") {
      return data;
    } else {
      return data.filter((estoque) => {
        return (
          estoque.data.toLowerCase().includes(term.toLowerCase()) ||
          estoque.funcionario.nome.toLowerCase().includes(term.toLowerCase())
        );
      });
    }

  };

  const onChangeSearchData = (e) => {
    if (e.target.value == "") {
      resetSearch();
    } else {
      setSearchTerm(e.target.value);
      findByData();
    }
  };


  const retrieveAlertaalertaEstoques = () => {
    AlertaEstoqueDataService.getAll()
      .then(response => {
        setAlertaalertaEstoques(response.data);
        setAlertaalertaEstoquesCompleto(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByData = () => {
    const filteredalertaEstoques = filterData(alertaestoquescompleto, searchTerm);
    setAlertaalertaEstoques(filteredalertaEstoques);
  };

  const resetSearch = () => {
    setSearchTerm("");
    retrieveAlertaalertaEstoques();
  };


  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={onChangeSearchData}
          />
        </div>
      </div>
      <div className="col-md-6">
        <h4>alertaEstoques Lançados</h4>
        <EstoqueTable alertaestoques={alertaestoques} />

      </div>
    </div>
  );
};

export default AlertaalertaEstoquesList;