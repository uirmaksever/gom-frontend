<template>
    <Map v-bind:organizations="organizations"
        @org-pin-clicked="change_active_organization"
    ></Map>
</template>

<script>
import Map from "@/components/map";
import OrganizationDataService from "@/services/organizationDataService";

export default {
    name: "onlyMap",
    components: {
        Map,
    },
    data () {
        return {
            organizations: [],
            active_organization: null,
        }
    },
    mounted () {
    OrganizationDataService.getAll()
        .then(
            response => {
            this.organizations = response.data;
            this.organizations_loading = false;
            this.get_gofor();
            },
        )
    },
    methods: {
        change_active_organization (org) {
        this.active_organization = org;
        },
        get_gofor () {
        let gofor = this.organizations.filter(org => org.organization_name === "Gençlik Örgütleri Forumu (GoFor)")
        // It returns a list
        this.active_organization = gofor[0]
        console.log(gofor)
        }        
    }
}
</script>
