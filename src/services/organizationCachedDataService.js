import http from "@/http-common";


class OrganizationCachedDataService {
  getAll() {
    return http.get("/organizations/");
  }
}

export default new OrganizationCachedDataService();