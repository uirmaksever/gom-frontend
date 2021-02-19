import http from "@/http-common";


class DistrictDataService {
    getAll() {
        return http.get("/districts/");
    }

    get(id) {
        return http.get(`/districts/${id}/`);
    }
}

export default new DistrictDataService();
