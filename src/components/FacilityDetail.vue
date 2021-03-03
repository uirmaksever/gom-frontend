<template>
  <v-container>
    <v-col>
      <h3 class="text-center text--secondary">Kaynak</h3>
      <h1 class="text-center text--primary">{{ facility.facility_name }}</h1>
      <h4 class="text-center text--secondary">{{ facility.total_organizations }} örgüt bu kaynakla ilgili kullanım isteği almaya hazır</h4>
      <OrganizationList v-bind:organizations="this.organizations" v-bind:loading="organizations_loading"></OrganizationList>
    </v-col>
  </v-container>
</template>

<script>
import OrganizationList from "@/components/organizationList";
import OrganizationDataService from "@/services/organizationDataService";
import FacilityDataService from "../services/facilityDataService";

export default {
  name: "FacilityDetail",
  components: {
    OrganizationList,
  },
  data () {
    return {
      organizations: [],
      facility: null,
      organizations_loading: true,

    }
  },
  mounted() {
    OrganizationDataService.getForFacility([this.$route.params.id])
      .then(response => {
        this.organizations = response.data;
        this.organizations_loading = false;

      })
    FacilityDataService.get(this.$route.params.id)
      .then(response => {
        this.facility = response.data;
      })
  },

}
</script>