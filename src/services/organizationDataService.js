import http from "@/http-common";


class OrganizationDataService {
    getAll() {
        return http.get("/organizations/");
    }
    getForProvince(province_select) {
        console.log(province_select);
        let params = new URLSearchParams();
        params.append("registered_province", province_select)
        // for (let key of Object.keys(province_select)) {
        //     console.log(key)
        //     params.append("registered_province", province_select[key])
        // }
        console.log(params.toString())
        return http.get("/organizations/?", {params:params})
    }
    getForThematicField(thematic_field_select) {
        console.log(thematic_field_select);
        let params = new URLSearchParams();
        for (let key of Object.keys(thematic_field_select)) {

            params.append("related_thematic_fields", thematic_field_select[key])
        }
        console.log(params.toString())
        return http.get("organizations/?", {params: params})
    }
    getForFacility(facility_select) {
        let params = new URLSearchParams()
        for (let key of Object.keys(facility_select)) {
            params.append("related_facilities", facility_select[key])
        }
        console.log(params.toString())
        return http.get("organizations/?", {params: params})
    }
    get(id) {
        return http.get(`/organizations/${id}/`);
    }
}

export default new OrganizationDataService();
