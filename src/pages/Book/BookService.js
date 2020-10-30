import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9000",
});

export const getAll = () => api.get(`/book`);
export const getByID = (id) => api.get(`/book/${id}`);
export const add = (payload) => api.post(`/book`, payload);
export const update = (id, payload) => api.put(`/book/${id}`, payload);
export const deleteById = (id) => api.delete(`/book/${id}`);

const bookService = {
  getAll,
  getByID,
  add,
  update,
  deleteById,
};

export default bookService;
