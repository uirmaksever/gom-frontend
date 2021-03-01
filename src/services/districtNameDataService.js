import http from "../http-common"

// We only get related districts as per province
class DistrictNameDataService {
  getForProvince(gid_1) {
    return http.get(`districts_names/?gid_1=${gid_1}`)
  }
}

export default new DistrictNameDataService();