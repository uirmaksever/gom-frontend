import http from "../http-common"

class ThematicFieldDataService {
    getAll() {
        return http.get("/thematic_fields/");
    }
    get(id) {
        return http.get(`/thematic_fields/${id}/`)
    }
}

export default new ThematicFieldDataService()
