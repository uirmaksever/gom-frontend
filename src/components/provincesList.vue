<template>
  <v-container>
    <v-col cols="12">
      <div class="mt-5">
        <h1 class="text-center primary--text">İller</h1>
      </div>
      <v-divider class="my-5"></v-divider>
      <v-card tile>
        <v-list-item :key="province.id" v-for="province in provinces" :to="'provinces/' + province.id">
          <v-list-item-icon>
            <v-icon>mdi-{{ province.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ province.name_1 }}</v-list-item-title>
            <v-list-item-subtitle>{{ province.total_organizations }} Örgüt</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-card>
    </v-col>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import ProvinceDataService from "@/services/provinceDataService";

export default {
  name: "ProvincesList",
  data () {
    return {
      provinces: [],
      loading: true,
    }
  },
  mounted() {
    ProvinceDataService.getAll()
      .then(response => {
        this.provinces = response.data;
        this.loading = false;
      })
  },
}
</script>