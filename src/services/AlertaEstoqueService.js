import http from "../http-common";

const getAll = () => {
  return http.get("/AlertaEstoques");
};

const create = data => {
  return http.post("/AlertaEstoques", data);
};

const update = (id, data) => {
  return http.put(`/AlertaEstoques/${id}`, data);
};

const remove = id => {
  return http.delete(`/AlertaEstoques/${id}`);
};
const AlertaAlertaEstoqueService = {
  getAll,
  create,
  update,
  remove
};

export default AlertaAlertaEstoqueService;