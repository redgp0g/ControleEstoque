import React, { useState} from "react";
import "./EstoqueTable.css"
import { format } from "date-fns";
import AlertaEstoqueDataService from "../services/AlertaEstoqueService";

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

  const [password, setPassword] = useState("");
  const [updateItemId, setUpdateItemId] = useState(null);


  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUpdateClick = (id) => {
    setUpdateItemId(id);
  };

  const handleCancelUpdate = () => {
    setUpdateItemId(null);
    setPassword("");
  };

  const handleConfirmUpdate = (id) => {
    console.log("Update ID:", id);

    if (password === "123") {
      const updatedData = {
        ...alertaestoques.find((estoque) => estoque.idAlertaEstoque === id),
        entregue: true
        // Adicione outras propriedades a serem atualizadas, se necessário
      };

      console.log("Updated Data:", updatedData); 
      AlertaEstoqueDataService.update(id, updatedData)
        .then((response) => {
          console.log("Atualização realizada com sucesso:", response.data);
          setUpdateItemId(null);
          setPassword("");
          window.location.reload()
        })
        .catch((error) => {
          console.log("Erro ao atualizar:", error);
          console.log(updatedData);
        });
    } else {
      console.log("Senha incorreta. Atualização não realizada.");
    }
  };

  const estoquesNaoEntregues = alertaestoques.filter(
    (estoque) => estoque.entregue === false
  );
  
  return (
    <table className="table bg-secondary">
      <thead>
        <tr>
          <th>Urgência</th>
          <th>Data</th>
          <th>Peça</th>
          <th>Setor</th>
          <th>Quantidade Necessária</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {estoquesNaoEntregues.map((estoque, index) => (
          <tr key={index}>
            <td className={getColorClass(estoque.urgencia)}>{estoque.urgencia}</td >
            <td className={getColorClass(estoque.urgencia)}>{format(new Date(estoque.data), "dd/MM/yyyy HH:mm")}</td >
            <td className={getColorClass(estoque.urgencia)}>{estoque.peca}</td >
            <td className={getColorClass(estoque.urgencia)}>{estoque.setor}</td >
            <td className={getColorClass(estoque.urgencia)}>{estoque.quantidade} caixas</td >
            <td>
              {updateItemId === estoque.idAlertaEstoque ? (
                <>
                  <input
                    type="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleConfirmUpdate(estoque.idAlertaEstoque)}>
                    Confirmar
                  </button>
                  <button onClick={handleCancelUpdate}>Cancelar</button>
                </>
              ) : (
                <button onClick={() => handleUpdateClick(estoque.idAlertaEstoque)}>
                  Atualizar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EstoqueTable;
