<template>
  <v-container fluid>
    <v-col>

      <div class="d-flex flex-row my-5">
        <div class="align-self-center pr-10">
            <template v-if="thematic_field.icon !== null">
              <v-avatar color="primary" size="64">
                <v-icon x-large color="white">mdi-{{ thematic_field.icon }}</v-icon>
              </v-avatar>
            </template>
            <template v-else>
              <v-avatar color="primary" size="64">
                <span class="white--text headline font-weight-bold">{{ get_initials }}</span>
              </v-avatar>
            </template>
        </div>
        <div>
          <h3 class="text--secondary">Tematik Alan</h3>
          <h1 class="text--primary">{{ thematic_field.thematic_field_name }}</h1>
          <h4 class="text--secondary">{{ thematic_field.total_organizations }} Örgüt</h4>
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
      organizations_loading: true,

    }
  },
  computed: {
    get_initials: function() {
      return this.thematic_field.thematic_field_name.split(" ").map(x => x[0].toUpperCase()).join("")
    }
  },
  mounted() {
    OrganizationDataService.getForThematicField([this.$route.params.id])
      .then(response => {
        this.organizations = response.data;
        this.organizations_loading = false;

      })
    ThematicFieldDataService.get(this.$route.params.id)
      .then(response => {
        this.thematic_field = response.data;
      })
  },

}
</script>