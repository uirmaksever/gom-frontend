import http from "../http-common"

class FacilityUseRequestDataService {
    post(facility_use_request) {
        return http.post("use_requests/", facility_use_request)
    }
}

export default new FacilityUseRequestDataService()
