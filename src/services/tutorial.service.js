import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("https://api.migueldias.net/cns014/perguntas");
  }

  get(id) {
    return http.get(`https://api.migueldias.net/cns014/pergunta/${id}`);
  }

  create(data) {
    return http.post("https://api.migueldias.net/cns014/novapergunta", data);
  }

  update(id, data) {
    return http.put(
      `https://api.migueldias.net/cns014/editarpergunta/${id}`,
      data
    );
  }

  delete(id) {
    return http.delete(`https://api.migueldias.net/cns014/delete/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  findByTitle(title) {
    return http.get(`https://api.migueldias.net/cns014/procurar/${title}`);
  }
}

export default new TutorialDataService();
