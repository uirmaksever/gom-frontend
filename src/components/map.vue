<template>
  <div>
    <l-map
      style="height: 80vh; width: 100%; z-index: 0"
      :zoom="zoom.default_zoom"
      :minZoom="zoom.min_zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
      ref="organizations_map"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <v-marker-cluster :options="cluster_options">
<!--        <l-circle-marker-->
<!--          v-for="organization in organizations"-->
<!--          :key="organization.id"-->
<!--          :lat-lng="[organization.location.coordinates[1], organization.location.coordinates[0]]"-->
<!--          :color=fillColor-->
<!--          :fill-color=borderColor-->
<!--          :fill-opacity=dot.fill_opacity-->
<!--          :radius=dot.radius-->
<!--          :weight=dot.weight-->
<!--          :stroke=true-->
<!--          v-model="active_organization"-->
<!--          v-on:click="focusOrganizationInList(organization.id)"-->
<!--        >-->
<!--          <l-popup>-->
<!--            <a v-bind:href="'organizations/' + organization.id">{{ organization.organization_name }}</a>-->
<!--          </l-popup>-->
<!--        </l-circle-marker>-->
        <l-marker
          v-for="organization in organizations"
          :key="organization.id"
          :lat-lng="[organization.location.coordinates[1], organization.location.coordinates[0]]"
          v-model="active_organization"
          v-on:click="focusOrganizationInList(organization.id)">
          <l-icon :icon-size="icon.icon_size"
                  :icon-anchor="icon.icon_anchor"
                  :popup-anchor="icon.popup_anchor"
                  :icon-url="icon.icon_url"
          ></l-icon>
          <l-popup>
            <a v-bind:href="'organizations/' + organization.id">{{ organization.organization_name }}</a>
          </l-popup>
        </l-marker>
      </v-marker-cluster>
<!--      <l-control position="bottomleft" v-if="active_organization">-->
<!--        <v-card>-->
<!--          <v-card-text>-->
<!--            <a v-bind:href="'organizations/' + active_organization_obj.id">{{ active_organization_obj.organization_name }}</a>-->
<!--            <br/>-->
<!--            {{ active_organization_obj.registered_province }} - -->
<!--            {{ active_organization_obj.registered_district }}-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </l-control>-->
    </l-map>
    <v-banner single-line rounded class="text--secondary text-sm-subtitle-1">Konum bilgisi yaklaşıktır.</v-banner>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup, LIcon} from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
// import {ChoroplethLayer } from 'vue-choropleth'

// import axios from 'axios';
// import ProvinceDataService from "../services/provinceDataService";
// import DistrictDataService from "../services/districtDataService";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    'v-marker-cluster': Vue2LeafletMarkerCluster
    // 'l-choropleth-layer': ChoroplethLayer
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: {
        default_zoom: 6,
        // max_zoom: 6,
        min_zoom: 6,
      },
      center: [38.9637, 35.2433],
      bounds: null,
      districts: [],
      provinces: [],
      provinces_data: [],
      show_districts: false,
      show_provinces: false,
      fillColor: "white",
      borderColor: "#FF5013",
      choropleth_value: {value: "total_organizations", key: "org amount"},
      icon: {
        icon_size: [20,30],
        icon_anchor: [10,25],
        popup_anchor: [0, -20],
        icon_url: "/icons/marker.png"
      },
      dot: {
        radius: 7,
        weight: 2,
        fill_opacity: 1,
      },
      cluster_options: {maxClusterRadius: 20, backgroundColor: 'white'},
    };
  },
  props: {
    organizations: {
      type: Array,
      default () {
        return this.organizations
      },
    },
    active_organization_obj: {
      type: Object,
      default() {
        return this.active_organization_obj;
      }
    }
  },
  mounted () {
    // DistrictDataService.getAll()
    //   .then(response => {
    //     this.districts = response.data;
    //   });
    //
    // ProvinceDataService.getAll()
    //   .then(response => {
    //     this.provinces = response.data;
    //     this.createProvincesData();
    //
    //   });
  },
  async created() {

  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom.default_zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    // showProvince(province_id) {
    //   console.log(province_id);
    //   let selected_province;
    //   selected_province = this.$refs["provinces"].filter(province => province.geojson.id === province_id)[0];
    //   console.log(selected_province);
    //   selected_province.$props.visible = !selected_province.$props.visible;
    //   this.$refs["organizations_map"].fitBounds(selected_province.getBounds());
    // },
    // createProvincesData() {
    //   this.provinces.features.forEach(item => {
    //     let province_data = item.properties;
    //
    //     province_data["id"] = item.id;
    //     this.provinces_data.push(province_data)
    //   })
    // },
    getActiveOrganization(active_organization) {
      let hovered_organization = this.organizations.find(organization => organization.id === active_organization)
      this.active_organization_obj = hovered_organization
    },
    focusOrganizationInList(active_organization) {
      let hovered_organization = this.organizations.find(organization => organization.id === active_organization)
      this.active_organization_obj = hovered_organization
      this.active_organization = active_organization
      this.$emit("org-pin-clicked", this.active_organization_obj)
    }
  },
  computed: {

  },
  watch: {
    active_organization: function () {
      this.focusOrganizationInList(this.active_organization);
    }
  }
}
</script>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.marker-cluster-small {
  background-color: white !important;
}

.marker-cluster-small div {
  /*background-color: #FF5013 !important;*/
  background-color: #FF5013 !important;
  color: white !important;
  font-weight: 700;
}
</style>
