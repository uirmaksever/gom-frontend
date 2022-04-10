<template>
  <v-container fluid>
    <v-row>
      <!-- <v-col cols="12" md="4" max-height="90vh" class="overflow-y-auto p-1">

        <v-card elevation="5" rounded-lg class="mb-5">
          <v-banner single-line class="d-flex flex-row">
            <div class="d-flex flex-row">
              <div class="mt-2">
                <h2 class="primary--text">Fitrele</h2>
                <h1 class="overline">{{ get_organizations.length }} Örgüt</h1>
              </div>
              <v-spacer></v-spacer>
              <div class="align-center">
                <v-btn @click="reset_filters"
                       small
                       outlined
                       rounded-lg
                       color="primary">
                  <v-icon>
                     mdi-backup-restore
                  </v-icon>
                  FİLTREYİ SIFIRLA
                </v-btn>
              </div>
            </div>




          </v-banner>

          <v-select
            v-model="province_select"
            :items="provinces.features"
            item-text="properties.name_1"
            item-value="id"
            attach
            clearable
            label="İller"
            class="px-5"
            :loading="filters_loading.provinces"
          ></v-select>

          <v-select
            v-model="thematic_field_select"
            :items="thematic_fields"
            item-text="thematic_field_name"
            item-value="id"
            label="Tematik Hak Alanları"
            multiple
            chips
            clearable
            class="px-5"
            :loading="filters_loading.thematic_fields"
          ></v-select>

          <v-select
            v-model="facility_select"
            :items="facilities"
            item-text="facility_name"
            item-value="id"
            label="Paylaşılabilecek Ekipmanlar"
            multiple
            chips
            clearable
            class="px-5"
            :loading="filters_loading.facilities"
          ></v-select>
        </v-card>
        <v-card rounded-lg elevation="5">
          <v-banner single-line>
            <h2 class="py-2 primary--text">Seçilen Örgüt</h2>
          </v-banner>
          <OrganizationSingleCard :organization="active_organization"></OrganizationSingleCard>
        </v-card>

      </v-col> -->

      <v-col>
            <Map v-bind:organizations="get_organizations"
              @org-pin-clicked="change_active_organization"
            ></Map>
        <!-- <v-sheet elevation="5" rounded-lg class="px-0 pt-0">
          <v-tabs
          v-model="tab">
          <v-tabs-slider color="green"></v-tabs-slider>
          <v-tab :key="org_map">HARİTA</v-tab>

          <v-tab :key="org_list">LİSTE</v-tab>

        </v-tabs>
          <v-divider></v-divider>
          <v-tabs-items v-model="tab" touchless>
          <v-tab-item :key="org_map">

          </v-tab-item>
          <v-tab-item :key="org_list">
            <OrganizationsList v-bind:organizations="get_organizations"
                               v-bind:loading="organizations_loading"
                               v-bind:active_organization_obj="active_organization"
                               @org-item-focused="change_active_organization"
            ></OrganizationsList>

          </v-tab-item>
        </v-tabs-items>
        </v-sheet> -->

      </v-col>

    </v-row>
    <v-overlay :value="organizations_loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-container>

</template>

<script>
import Map from "@/components/map";
// import OrganizationSingleCard from "@/components/OrganizationSingleCard";
// import OrganizationsList from "@/components/organizationList";
import OrganizationDataService from "@/services/organizationDataService";
// import OrganizationCachedDataService from "@/services/organizationCachedDataService";
// Filter
// import ProvinceDataService from "../services/provinceDataService";
// import ThematicFieldDataService from "../services/thematicFieldDataService";
// import FacilityDataService from "../services/facilityDataService";

export default {
  name: "MainPage",
  components: {
    Map,
    // OrganizationsList,
    // OrganizationSingleCard
  },
  data() {
    return {
      organizations: [],
      organizations_loading: true,
      filters_loading: {
        provinces: true,
        thematic_fields: true,
        facilities: true,
      },
      // Filter
      provinces: [],
      thematic_fields: [],
      thematic_field_select: null,
      province_select: null,
      filter_params: {},
      filters_flat: [],
      filtered_orgs: [],
      facilities: [],
      facility_select: [],
      user_changed_filter: false,
      org_map: null,
      org_list: null,
      tab: "org_map",
      active_organization: null,
    }
  },
  mounted() {
    OrganizationDataService.getAll()
      .then(
          response => {
            this.organizations = response.data;
            this.organizations_loading = false;
            this.get_gofor();
            },
      )
    // ProvinceDataService.getAll()
    //   .then(response => {
    //     this.provinces = response.data;
    //     this.filters_loading.provinces = false;
    //   })
    // ThematicFieldDataService.getAll()
    //   .then(response => {
    //     this.thematic_fields = response.data;
    //     this.filters_loading.thematic_fields = false;
    //   })
    // FacilityDataService.getAll()
    //   .then(response => {
    //     this.facilities = response.data;
    //     this.filters_loading.facilities = false;
    //   })
  },
  methods: {
    // change_active_organization (org) {
    //   this.active_organization = org;
    // },
    // reset_filters () {
    //   this.thematic_field_select = null
    //   this.province_select = null
    //   this.facility_select = []
    //   this.filter_params = {};
    // },
    // get_gofor () {
    //   let gofor = this.organizations.filter(org => org.organization_name === "Gençlik Örgütleri Forumu (GoFor)")
    //   // It returns a list
    //   this.active_organization = gofor[0]
    //   console.log(gofor)
    // }
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
    // province_select: function () {
    //   // OrganizationDataService.getForProvince(this.province_select)
    //   //   .then(response => {
    //   //     this.organizations = response.data;
    //   //     this.organizations_loading = false;
    //   //   })
    //   this.$set(this.filter_params, "registered_province", [this.province_select])
    //   this.user_changed_filter = true;
    //   // this.filter_params["registered_province"] = this.province_select;
    //   // this.filter_params.push({"key": "registered_province", "value": this.province_select})
    // },
    // thematic_field_select: function () {

    //   this.$set(this.filter_params, "related_thematic_fields", this.thematic_field_select)
    //   this.user_changed_filter = true;

    // },
    // facility_select: function () {
    //   this.$set(this.filter_params, "related_facilities", this.facility_select)
    //   this.user_changed_filter = true;
    // },
  //   filter_params: {
  //     handler(newVal, oldVal) {
  //       newVal
  //       oldVal
  //       // let params = qs.stringify(this.filter_params)
  //       // params
  //       // Make sure filtered orgs are empty
  //       this.filters_flat = []
  //       // Iterate over selected filter types and flatten them
  //       for (const filter_param in this.filter_params) {
  //         let filter_objs = this.filter_params[filter_param]
  //         // Flattening filter items here
  //         for(const index in filter_objs) {
  //           let selected_filter = filter_objs[index]
  //           console.log(filter_param, filter_objs[index])
  //           this.filters_flat.push([filter_param, selected_filter])
  //         }
  //         let filters_flat = this.filters_flat
  //         // FILTER HERE
  //         this.filtered_orgs = this.organizations.filter(function (org) {
  //           // I declared the check variables out of filters_flat loop, the idea was to block
  //           // the following iteration of an item in filters_flat to override previous one
  //           // This probably needs a rewrite since it may hurt && between same type of filters
  //           let province_check = null
  //           let thematic_fields_check = null
  //           let facilities_check = null
  //           // Iterate over filters and check all of them
  //           for (const index in filters_flat) {
  //             let selected_filter = filters_flat[index]
  //             let key_name = selected_filter[0]
  //             let search_value = selected_filter[1]

  //             // Following ifs are following the same principle. Check filtered object's id against current
  //             // org's one to many arrays' ids
  //             if (key_name === "registered_province") {
  //               if(search_value === org.registered_province_id) {
  //                 console.log("CITY FOUND", search_value, org.registered_province_id)
  //                 province_check = true;
  //               }
  //               else {
  //                 province_check = false;
  //               }
  //             }
  //             if (key_name === "related_thematic_fields") {
  //               console.log()
  //               // Iterate over ID of items in array
  //               if(org.related_thematic_fields.map(x => x["id"]).includes(search_value)) {
  //                 console.log("THEMA FOUND", search_value, org.related_thematic_fields)
  //                 thematic_fields_check = true;
  //               }
  //               else {
  //                 thematic_fields_check = false;
  //               }
  //             }
  //             // Check if filter is below mentioned type
  //             if (key_name === "related_facilities") {
  //               // If current org in the loop has filtered facility, make check true, or mark false
  //               if (org.related_facilities.map(x => x["id"]).includes(search_value)) {
  //                 console.log("FACILITY FOUND", search_value, org.related_facilities)
  //                 facilities_check = true;
  //               }
  //               else {
  //                 facilities_check = false;
  //               }
  //             }

  //           }
  //           // Collect all checks in an array
  //           const filters_check = [province_check, thematic_fields_check, facilities_check]
  //           // Null elements are empty filter fields. Assume them true
  //           const filter_check_null_fixed = filters_check.map(x => {
  //             if (x === null) {
  //               return true;
  //             } else {
  //               return x;
  //             }
  //           })
  //           console.log(filters_check, filters_check.every(Boolean), filter_check_null_fixed, filter_check_null_fixed.every(Boolean))
  //           // Return true to filter method if all checks are true
  //           if (filter_check_null_fixed.every(Boolean)) {
  //             return true;
  //           }
  //         })
  //       }
  //       console.log("###")
  //     },
  //     deep: true,
  //   }
  }
}
</script>
