<template>
  <v-row>
    <v-col cols="12" md="4">

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
      <OrganizationsList v-bind:organizations="get_organizations" v-bind:loading="organizations_loading"></OrganizationsList>
    </v-col>
  </v-row>

</template>

<script>
import ProvinceDataService from "../services/provinceDataService";
import OrganizationDataService from "../services/organizationDataService";
import ThematicFieldDataService from "../services/thematicFieldDataService";
import FacilityDataService from "../services/facilityDataService";
import OrganizationsList from "@/components/organizationList";
// import qs from "qs";

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
        filters_flat: [],
        filtered_orgs: [],
        organizations: [],
        facilities: [],
        facility_select: [],
        organizations_loading: true,
        user_changed_filter: false,
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
  computed: {
    get_organizations: function () {
      if (this.user_changed_filter === false) {
        return this.organizations;
      } else {
        return this.filtered_orgs;
      }
    }
  },
  watch: {
    province_select: function () {
      // OrganizationDataService.getForProvince(this.province_select)
      //   .then(response => {
      //     this.organizations = response.data;
      //     this.organizations_loading = false;
      //   })
      this.$set(this.filter_params, "registered_province", [this.province_select])
      this.user_changed_filter = true;
      // this.filter_params["registered_province"] = this.province_select;
      // this.filter_params.push({"key": "registered_province", "value": this.province_select})
    },
    thematic_field_select: function () {
      // OrganizationDataService.getForThematicField(this.thematic_field_select)
      //   .then(response => {
      //     this.organizations = response.data;
      //     this.organizations_loading = false;
      //   })
      this.$set(this.filter_params, "related_thematic_fields", this.thematic_field_select)
      this.user_changed_filter = true;
      // this.filter_params["related_thematic_fields"] = this.thematic_field_select;
      // this.filter_params.push({"key": "related_thematic_fields", "value": this.thematic_field_select})

    },
    facility_select: function () {
      // OrganizationDataService.getForFacility(this.facility_select)
      //   .then(response => {
      //     this.organizations = response.data;
      //     this.organizations_loading = false;
      //   })
      this.$set(this.filter_params, "related_facilities", this.facility_select)
      this.user_changed_filter = true;
      // this.filter_params["related_facilities"] = this.facility_select;
      // this.filter_params.push({"key": "related_facilities", "value": this.facility_select})

    },
    filter_params: {
      handler(newVal, oldVal) {
        newVal
        oldVal
        // let params = qs.stringify(this.filter_params)
        // params
        // Make sure filtered orgs are empty
        this.filters_flat = []
        // Iterate over selected filter types and flatten them
        for (const filter_param in this.filter_params) {
          let filter_objs = this.filter_params[filter_param]
          // Flattening filter items here
          for(const index in filter_objs) {
            let selected_filter = filter_objs[index]
            console.log(filter_param, filter_objs[index])
            this.filters_flat.push([filter_param, selected_filter])
          }
          let filters_flat = this.filters_flat
          // FILTER HERE
          this.filtered_orgs = this.organizations.filter(function (org) {
            // I declared the check variables out of filters_flat loop, the idea was to block
            // the following iteration of an item in filters_flat to override previous one
            // This probably needs a rewrite since it may hurt && between same type of filters
            let province_check = null
            let thematic_fields_check = null
            let facilities_check = null
            // Iterate over filters and check all of them
            for (const index in filters_flat) {
              let selected_filter = filters_flat[index]
              let key_name = selected_filter[0]
              let search_value = selected_filter[1]

              // Following ifs are following the same principle. Check filtered object's id against current
              // org's one to many arrays' ids
              if (key_name === "registered_province") {
                if(search_value === org.registered_province_id) {
                  console.log("CITY FOUND", search_value, org.registered_province_id)
                  province_check = true;
                }
                else {
                  province_check = false;
                }
              }
              if (key_name === "related_thematic_fields") {
                console.log()
                // Iterate over ID of items in array
                if(org.related_thematic_fields.map(x => x["id"]).includes(search_value)) {
                  console.log("THEMA FOUND", search_value, org.related_thematic_fields)
                  thematic_fields_check = true;
                }
                else {
                  thematic_fields_check = false;
                }
              }
              // Check if filter is below mentioned type
              if (key_name === "related_facilities") {
                // If current org in the loop has filtered facility, make check true, or mark false
                if (org.related_facilities.map(x => x["id"]).includes(search_value)) {
                  console.log("FACILITY FOUND", search_value, org.related_facilities)
                  facilities_check = true;
                }
                else {
                  facilities_check = false;
                }
              }

            }
            // Collect all checks in an array
            const filters_check = [province_check, thematic_fields_check, facilities_check]
            // Null elements are empty filter fields. Assume them true
            const filter_check_null_fixed = filters_check.map(x => {
              if (x === null) {
                return true;
              } else {
                return x;
              }
            })
            console.log(filters_check, filters_check.every(Boolean), filter_check_null_fixed, filter_check_null_fixed.every(Boolean))
            // Return true to filter method if all checks are true
            if (filter_check_null_fixed.every(Boolean)) {
              return true;
            }
          })
        }
        console.log("###")
      },
      deep: true,
    }
  }
}
</script>
