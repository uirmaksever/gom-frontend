<template>
  <v-row>
    <v-col cols="12" md="4">
<!--      <v-card outlined>-->
<!--        <v-card-text>-->
<!--          <v-card-title>{{ organizations.length }} Örgüt</v-card-title>-->
<!--        </v-card-text>-->
<!--      </v-card>-->
      <v-banner single-line>
        <h2>Fitrele</h2>
        <h1 class="overline">{{ organizations.length }} Örgüt</h1>
      </v-banner>
      <v-select
      v-model="province_select"
      :items="provinces.features"
      item-text="properties.name_1"
      item-value="id"
      attach
      label="İller">
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
    <v-col cols="12" md="8">
      <OrganizationsList v-bind:organizations="this.organizations" v-bind:loading="organizations_loading"></OrganizationsList>
    </v-col>
  </v-row>

</template>

<script>
import ProvinceDataService from "../services/provinceDataService";
import OrganizationDataService from "../services/organizationDataService";
import ThematicFieldDataService from "../services/thematicFieldDataService";
import FacilityDataService from "../services/facilityDataService";
import OrganizationsList from "@/components/organizationList";
import qs from "qs";

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
        facility_select: [],
        organizations_loading: true,
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
        this.organizations_loading = false;
      })
  },
  computed: {},
  watch: {
    province_select: function () {
      OrganizationDataService.getForProvince(this.province_select)
        .then(response => {
          this.organizations = response.data;
          this.organizations_loading = false;
        })
      this.$set(this.filter_params, "registered_province", this.province_select)
      // this.filter_params["registered_province"] = this.province_select;
      // this.filter_params.push({"key": "registered_province", "value": this.province_select})
    },
    thematic_field_select: function () {
      OrganizationDataService.getForThematicField(this.thematic_field_select)
        .then(response => {
          this.organizations = response.data;
          this.organizations_loading = false;
        })
      this.$set(this.filter_params, "related_thematic_fields", this.thematic_field_select)
      // this.filter_params["related_thematic_fields"] = this.thematic_field_select;
      // this.filter_params.push({"key": "related_thematic_fields", "value": this.thematic_field_select})

    },
    facility_select: function () {
      OrganizationDataService.getForFacility(this.facility_select)
        .then(response => {
          this.organizations = response.data;
          this.organizations_loading = false;
        })
      this.$set(this.filter_params, "related_facilities", this.facility_select)
      // this.filter_params["related_facilities"] = this.facility_select;
      // this.filter_params.push({"key": "related_facilities", "value": this.facility_select})

    },
    filter_params: {
      handler(newVal, oldVal) {
        newVal
        oldVal
        let params = qs.stringify(this.filter_params)
        params
      },
      deep: true,

    }
  }
}
</script>
