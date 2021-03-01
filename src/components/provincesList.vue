<template>
  <v-row>
    <v-col cols="3">
      <v-select
      v-model="province_select"
      @click="setActiveProvince(province_select)"
      :items="provinces.features"
      item-text="properties.name_1"
      item-value="id"
      attach
      label="Örgütler">
      </v-select>
      <v-select
      v-model="thematic_field_select"
      :items="thematic_fields"
      item-text="thematic_field_name"
      item-value="id"
      label="Tematik Hak Alanları"
      multiple
      chips
      >

      </v-select>
      <v-select
      v-model="facility_select"
      :items="facilities"
      item-text="facility_name"
      item-value="id"
      label="Paylaşılabilecek Ekipmanlar"
      multiple
      chips
      >
      </v-select>

<!--      <v-list two-line max-height="400px"-->
<!--              class="overflow-y-auto"-->
<!--      >-->


<!--        <v-card-->
<!--          v-for="province in provinces.features" :key="province.id"-->
<!--        >-->
<!--          <v-card-title>{{ province.properties.name_1 }}</v-card-title>-->
<!--          <v-btn :to="'provinces/' + province.id">İli Gör</v-btn>-->
<!--          <v-btn icon v-on:click="setActiveProvince(province.id)">-->
<!--            <v-icon>mdi-map-marker</v-icon>-->
<!--          </v-btn>-->
<!--        </v-card>-->
<!--      </v-list>-->

    </v-col>
    <v-col cols="9">
      <OrganizationsList v-bind:organizations="this.organizations"></OrganizationsList>
    </v-col>
  </v-row>

</template>

<script>
import ProvinceDataService from "../services/provinceDataService";
import OrganizationDataService from "../services/organizationDataService";
import ThematicFieldDataService from "../services/thematicFieldDataService";
import FacilityDataService from "../services/facilityDataService";
import OrganizationsList from "@/components/organizationList";

export default {
  name: "ProvincesList",
  components: {
    OrganizationsList,
  },
  data () {
      return {
        provinces: [],
        thematic_fields: [],
        thematic_field_select: null,
        province_select: null,
        filter_params: {},
        organizations: [],
        facilities: [],
        facility_select: []
      }

  },
  mounted() {
    ProvinceDataService.getAll()
      .then(response => {
        this.provinces = response.data;
      })
    ThematicFieldDataService.getAll()
      .then(response => {
        this.thematic_fields = response.data;
      })
    FacilityDataService.getAll()
      .then(response => {
        this.facilities = response.data;
      })
    OrganizationDataService.getAll()
      .then(response => {
        this.organizations = response.data;
      })
  },
  computed: {},
  watch: {
    province_select: function () {
      OrganizationDataService.getForProvince(this.province_select)
        .then(response => {
          this.organizations = response.data;
        })
    },
    thematic_field_select: function () {
      OrganizationDataService.getForThematicField(this.thematic_field_select)
        .then(response => {
          this.organizations = response.data;
        })
    },
    facility_select: function () {
      OrganizationDataService.getForFacility(this.facility_select)
        .then(response => {
          this.organizations = response.data;
        })
    }
  }
}
</script>
