<template>
  <v-container>
    <v-col>
      <h3 class="text-center text--secondary">Tematik Alan</h3>
      <h1 class="text-center text--primary">{{ thematic_field.thematic_field_name }}</h1>
      <h4 class="text-center text--secondary">{{ thematic_field.total_organizations }} Örgüt</h4>
      <OrganizationList v-bind:organizations="this.organizations"></OrganizationList>
    </v-col>
  </v-container>
</template>

<script>
import OrganizationList from "@/components/organizationList";
import OrganizationDataService from "@/services/organizationDataService";
import ThematicFieldDataService from "../services/thematicFieldDataService";

export default {
  name: "ThematicFieldDetail",
  components: {
    OrganizationList,
  },
  data () {
    return {
      organizations: [],
      thematic_field: null,
    }
  },
  mounted() {
    OrganizationDataService.getForThematicField([this.$route.params.id])
      .then(response => {
        this.organizations = response.data;
      })
    ThematicFieldDataService.get(this.$route.params.id)
      .then(response => {
        this.thematic_field = response.data;
      })
  },
}
</script>