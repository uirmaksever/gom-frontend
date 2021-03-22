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

  </v-container>
</template>

<script>
import ProvinceNameDataService from "@/services/provinceNameDataService";

export default {
  name: "ProvincesList",
  data () {
    return {
      provinces: [],
    }
  },
  mounted() {
    ProvinceNameDataService.getAll()
      .then(response => {
        this.provinces = response.data;
      })
  },
}
</script>