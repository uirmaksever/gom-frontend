import http from "@/http-common";

class OrganizationCreateDataService {
  post(organization_post) {
    // let post_data = new FormData()
    // post_data.append("organization", organization_post)
    console.log(organization_post.logo)
    return http.post("organizations/create", organization_post, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    }
  )
  }
}

export default new OrganizationCreateDataService()