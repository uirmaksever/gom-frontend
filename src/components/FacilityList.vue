<template>
  <v-container>
    <v-col cols="12">
      <div class="mt-5">
        <h1 class="text-center primary--text">Paylaşılabilecek Kaynaklar</h1>
      </div>
      <v-divider class="my-5"></v-divider>
      <v-card tile>
        <v-list-item :key="facility.id" v-for="facility in facilities" :to="'facilities/' + facility.id">
          <v-list-item-content>
            <v-list-item-title class="wrap">{{ facility.facility_name }}</v-list-item-title>
            <v-list-item-subtitle>{{ facility.total_organizations }} Örgüt</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-card>
    </v-col>

  </v-container>
</template>

<script>
import FacilityDataService from "@/services/facilityDataService";

export default {
  name: "FacilityList",
  data () {
    return {
      facilities: [],
    }
  },
  mounted() {
    FacilityDataService.getAll()
      .then(response => {
        this.facilities = response.data;
      })
  },
  watch: {

  },
}
</script>