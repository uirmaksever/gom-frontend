import http from "../http-common";

class ProvinceDataService {
    getAll() {
        return http.get("/provinces/");
    }

    get(id) {
        return http.get(`/provinces/${id}/`);
    }
}

export default new ProvinceDataService()


