import http from "../http-common";

const getNamesIds = () => {
  return http.get("/Funcionarios/nomes-e-ids");
};

const FuncionarioService = {
  getNamesIds
};

export default FuncionarioService;