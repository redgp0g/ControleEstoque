import http from "../http-common";

const getAll = () => {
  return http.get("/Estoques");
};

const get = id => {
  return http.get(`/Estoques/${id}`);
};

const create = data => {
  return http.post("/Estoques", data);
};

const update = (id, data) => {
  return http.put(`/Estoques/${id}`, data);
};

const remove = id => {
  return http.delete(`/Estoques/${id}`);
};

const removeAll = () => {
  return http.delete(`/Estoques`);
};

const findByData = data => {
  return http.get(`/Estoques/BuscarPorData/${data}`);
};

const EstoqueService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByData
};

export default EstoqueService;