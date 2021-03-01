import http from "../http-common"

class ProvinceNameDataService {
  getAll() {
    return http.get("provinces_names")
  }
}

export default new ProvinceNameDataService()