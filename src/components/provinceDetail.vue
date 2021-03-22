<template>
  <v-container fluid>
    <v-col>

      <div class="d-flex flex-row my-5">
        <div class="align-self-center pr-10">
            <template>
              <v-avatar color="primary" size="64" style="visibility: hidden">
<!--                <v-icon x-large color="white">mdi-{{ thematic_field.icon }}</v-icon>-->
              </v-avatar>
            </template>
        </div>
        <div>
          <h3 class="text--secondary">İl</h3>
          <h1 class="text--primary">{{ province.properties.name_1 }}</h1>
          <h4 class="text--secondary">{{ province.properties.total_organizations }} Örgüt</h4>
        </div>
      </div>
      <v-divider light></v-divider>
      <OrganizationList v-bind:organizations="this.organizations" v-bind:loading="organizations_loading"></OrganizationList>
    </v-col>
  </v-container>
</template>

<script>
import OrganizationList from "@/components/organizationList";
import OrganizationDataService from "@/services/organizationDataService";
import ProvinceDataService from "../services/provinceDataService";

export default {
  name: "ProvinceDetail",
  components: {
    OrganizationList,
  },
  data () {
    return {
      organizations: [],
      province: null,
      organizations_loading: true,

    }
  },
  computed: {

  },
  mounted() {
    OrganizationDataService.getForProvince([this.$route.params.id])
      .then(response => {
        this.organizations = response.data;
        this.organizations_loading = false;

      })
    ProvinceDataService.get(this.$route.params.id)
      .then(response => {
        this.province = response.data;
      })
  },

}
</script>
