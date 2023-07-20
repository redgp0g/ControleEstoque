import http from "../http-common";

const getPecas = () => {
  return http.get("/Pecas");
};

const PecaService = {
    getPecas
};

export default PecaService;