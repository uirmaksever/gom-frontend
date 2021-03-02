<template>
  <div>
    <l-map
      style="height: 80vh; width: 100%; z-index: 0"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
      ref="organizations_map"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <v-marker-cluster :options="{maxClusterRadius: 1, backgroundColor: 'white'}">
        <l-circle-marker
          v-for="organization in organizations"
          :key="organization.id"
          :lat-lng="[organization.location.coordinates[1], organization.location.coordinates[0]]"
          color="primary"
          fill-color="red"
          :fill-opacity=dot.fill_opacity
          :radius=dot.radius
          :weight=dot.weight
          v-model="active_organization"
          v-on:mouseenter="focusOrganizationInList(organization.id)"
        >
        </l-circle-marker>
      </v-marker-cluster>
      <l-control position="bottomleft" v-if="active_organization">
        <v-card>
          <v-card-text>
            <a v-bind:href="'organizations/' + active_organization_obj.id">{{ active_organization_obj.organization_name }}</a>
            <br/>
            {{ active_organization_obj.registered_province }} -
            {{ active_organization_obj.registered_district }}
          </v-card-text>
        </v-card>
      </l-control>
    </l-map>

  </div>
</template>

<script>
import {LMap, LTileLayer, LCircleMarker, LControl} from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
// import {ChoroplethLayer } from 'vue-choropleth'

// import axios from 'axios';
// import ProvinceDataService from "../services/provinceDataService";
// import DistrictDataService from "../services/districtDataService";
export default {
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LControl,
    'v-marker-cluster': Vue2LeafletMarkerCluster
    // 'l-choropleth-layer': ChoroplethLayer
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 6,
      center: [38.9637, 35.2433],
      bounds: null,
      districts: [],
      provinces: [],
      provinces_data: [],
      show_districts: false,
      show_provinces: false,
      fillColor: "#912525",
      borderColor: "#3ea943",
      colorScale:["e7d090","de7062"],
      choropleth_value: {value: "total_organizations", key: "org amount"},
      active_organization: null,
      active_organization_obj: null,
      dot: {
        radius: 3,
        weight: 2,
        fill_opacity: 1,
      },

    };
  },
  props: {
    organizations: {
      type: Array,
      default () {
        return this.organizations
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
      this.zoom = zoom;
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
      console.log(active_organization);
      let hovered_organization = this.organizations.find(organization => organization.id === active_organization)
      this.active_organization_obj = hovered_organization
      this.active_organization = active_organization
      console.log(hovered_organization)
    }
  },
  computed: {
    styleFunction () {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#9426d9",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: Math.random(),
          borderColor: "#ba2727"
        };
      };
    },
  },
  watch: {
    active_organization: function () {
      console.log(this.active_organization);
      this.focusOrganizationInList(this.active_organization);
    }
  }
}
</script>

<style>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.marker-cluster-small {
  background-color: #ff6400 !important;
}

.marker-cluster-small div {
  background-color: #ff0000 !important;
  color: white !important;
  font-weight: 700;
}
</style>
