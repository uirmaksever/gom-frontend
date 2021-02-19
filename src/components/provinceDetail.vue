<template>
  <v-row>
    <p>{{ this.province.properties.name_1 }}</p>
  </v-row>
</template>

<script>
import ProvinceDataService from "../services/provinceDataService";
import OrganizationDataService from "../services/organizationDataService";

export default {
  data () {
    return {
      province: null,
      organizations: null,
    }
  },

  mounted () {
    ProvinceDataService.get(this.$route.params.id)
      .then(response => {this.province = response.data})
    OrganizationDataService.getAll()
      .then(response => {this.organizations = response.data})
  },
}
</script>
