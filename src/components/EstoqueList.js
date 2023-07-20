import React, { useState, useEffect } from "react";
import EstoqueDataService from "../services/EstoqueService";

const EstoquesList = () => {
  const [estoques, setEstoques] = useState([]);
  const [estoquescompleto, setEstoquesCompleto] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    retrieveEstoques();
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


  const retrieveEstoques = () => {
    EstoqueDataService.getAll()
      .then(response => {
        setEstoques(response.data);
        setEstoquesCompleto(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByData = () => {
    const filteredEstoques = filterData(estoquescompleto, searchTerm);
    setEstoques(filteredEstoques);
  };

  const resetSearch = () => {
    setSearchTerm("");
    retrieveEstoques();
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
        <h4>Estoques Lançados</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Data</th>
              <th>Codigo Peca</th>
              <th>Quantidade</th>
              <th>Setor</th>
              <th>Funcionario</th>
            </tr>
          </thead>
          <tbody>

            {estoques.map((estoque) => (
              <>
                <tr>
                  <th>{estoque.idEstoque}</th>
                  <td>
                    {estoque.data}
                  </td>
                  <td>
                    {estoque.peca.codigointerno}
                  </td>
                  <td>
                    {estoque.quantidade}
                  </td>
                  <td>
                    {estoque.peca.setor}
                  </td>
                  <td>
                    {estoque.funcionario.nome}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default EstoquesList;