<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <Map v-bind:organizations="this.organizations"></Map>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" md="4">
        <h2 class="display-1 pl-3 px-3">Örgütler</h2>
        <OrganizationsList v-bind:organizations="this.organizations"></OrganizationsList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Map from "@/components/map";
import OrganizationsList from "@/components/organizationList";
import OrganizationDataService from "@/services/organizationDataService"

export default {
  components: {
    Map,
    OrganizationsList,
  },
  data() {
    return {
      organizations: [],

    }
  },
  mounted() {
    OrganizationDataService.getAll()
      .then(
          response => {this.organizations = response.data;},
      )
  }

}
</script>
