import http from "../http-common";

class GodDataService {
  getAll() {
    return http.get("/gods");
  }

  get(id) {
    return http.get(`/gods/${id}`);
  }

  create(data) {
    return http.post("/gods", data);
  }

  update(id, data) {
    return http.put(`/gods/${id}`, data);
  }

  delete(id) {
    return http.delete(`/gods/${id}`);
  }

  deleteAll() {
    return http.delete(`/gods`);
  }

  findAll() {
    return http.get(`/gods`);
  }

  findByName(name) {
    return http.get(`/gods?name=${name}`);
  }
}

export default new GodDataService();