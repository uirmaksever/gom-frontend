import http from "@/http-common";


class OrganizationCachedDataService {
  getAll() {
    return http.get("/organizations_cached/");
  }
}

export default new OrganizationCachedDataService();