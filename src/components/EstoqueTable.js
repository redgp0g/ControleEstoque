import React from "react";
import "./EstoqueTable.css"

const EstoqueTable = ({ alertaestoques }) => {
  const getColorClass = (urgencia) => {
    switch (urgencia) {
      case "Urgente":
        return "urgente";
      case "Pouco Urgente":
        return "pouco-urgente";
      case "Não Urgente":
        return "nao-urgente";
      default:
        return "";
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Urgência</th>
          <th>Data</th>
          <th>Peça</th>
          <th>Setor</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {alertaestoques.map((estoque, index) => (
          <tr key={index}>
            <td className={getColorClass(estoque.urgencia)}>{estoque.urgencia}</td >
            <td className={getColorClass(estoque.urgencia)}>{estoque.data}</td >
            <td className={getColorClass(estoque.urgencia)}>{estoque.peca}</td >
            <td className={getColorClass(estoque.urgencia)}>{estoque.setor}</td >
            <td className={getColorClass(estoque.urgencia)}>{estoque.quantidade}</td >
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EstoqueTable;
