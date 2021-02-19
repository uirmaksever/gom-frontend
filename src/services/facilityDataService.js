import http from "../http-common"

class FacilityDataService {
    getAll() {
        return http.get("/facilities/")
    }
    get(id) {
        return http.get(`/facilities/${id}`)
    }
}

export default new FacilityDataService()
