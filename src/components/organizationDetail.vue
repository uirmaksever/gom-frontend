<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-sheet>
          <v-row>
            <v-col>
              <h6 class="text-subtitle-1">{{ organization.type_of_organization }}</h6>
              <h3 class="text-lg-h3">
                <template
                    v-if="organization.comms_permissions.web_site === true && organization.web_site !== null">
                  <a
                      :href="organization.web_site"
                      target="_blank"
                      v-if="organization.comms_permissions.web_site === true && organization.web_site !== null">
                    {{ organization.organization_name }}</a>
                </template>
                <template v-else>
                  <v-tooltip
                  bottom>
                  <template v-slot:activator="{on, attrs}">
                    <p
                        v-bind="attrs"
                        v-on="on"
                        >
                      {{ organization.organization_name }}
                    </p>
                  </template>
                  <span>Web sitesi bilgisi paylaşılmadı.</span>
                </v-tooltip>
                </template>


              </h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card flat>
              <v-chip
                color="#EEE8AA"
                text-color="8B4513"
                v-if="organization.gofor_membership_status === true">
              <v-icon>mdi-star</v-icon>
              Go-for Üyesi
            </v-chip>
              <div>
              <template
                v-if="organization.comms_permissions.web_site === true && organization.web_site !== null">
                <v-btn icon color="darkblue" class="p-4"
                  :href="organization.web_site">
                  <v-icon large>mdi-web</v-icon>
                </v-btn>
            </template>
              <template v-if="organization.comms_permissions.social_media === true">
              <template
                  v-if="organization.facebook !== null">
                  <v-btn icon color="#3b5998" class="p-4"
                    :href="organization.facebook">
                    <v-icon large>mdi-facebook</v-icon>
                  </v-btn>
              </template>
              <template v-if="organization.instagram !== null">
                <v-btn icon color="#833AB4" class="p-4"
                  :href="organization.instagram">
                  <v-icon
                  large>mdi-instagram</v-icon>
                </v-btn>
              </template>
              <template v-if="organization.twitter !== null">
                <v-btn icon color="#00acee" class="p-4"
                  :href="organization.twitter">
                  <v-icon
                  large>mdi-twitter</v-icon>
                </v-btn>
              </template>
            </template>


            </div>
              <div>
              <template v-if="organization.comms_permissions.registered_province === true">
                <v-icon>mdi-map-marker</v-icon>
                {{ organization.registered_province }}
              </template>
              <template v-if="organization.comms_permissions.registered_district === true">
                - {{ organization.registered_district }}
              </template>

            </div>
              <div>
              <v-icon>mdi-calendar-range</v-icon>
              {{ organization.establishment_date }}
              </div>
              </v-card>

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div>
            <h4>Ekipmanlar</h4>
            <p>Organizasyonun ofisi var mı?
              <span v-if="organization.organization_have_office === true">Evet</span>
              <span v-else>Hayır</span>
            </p>
            <template v-if="organization.comms_permissions.related_facilities === true">
              <v-chip-group column>
                <v-chip v-for="facility in organization.related_facilities"
                        :key="facility.id"
                        @click="selected_facility=facility; use_request_form=!use_request_form"
                >

                  {{ facility.facility_name }}
                </v-chip>
              </v-chip-group>
            </template>
            <template v-else>
              <div>
                <v-alert
                  border="left"
                  color="red"
                  dense
                  outlined
                  text
                  type="warning"
                >
                  Örgüt sahip olduğu kaynakların kullanımı için başka örgütlerin onunla iletişim kurmasına izin vermiyor.
                </v-alert>
              </div>
            </template>
          </div>
              <div>
            <h4>Tematik Alanlar</h4>
            <v-chip-group>
              <v-chip v-for="thematic_field in organization.related_thematic_fields" :key="thematic_field.id">
                {{ thematic_field.thematic_field_name }}
              </v-chip>
            </v-chip-group>
          </div>
            </v-col>

          </v-row>



        </v-sheet>

      </v-col>
      <v-col cols="12" md="4">
        {{ organization.related_province }}
        <l-map
          style="height: 400px; width: 100%; z-index:0"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
          ref="single_organization_map"
          v-if="organization.location"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-circle-marker
            :lat-lng="[organization.location.coordinates[1], organization.location.coordinates[0]]"
            color="red"
            fill-color="red"
            fill-opacity=1
            radius=3
            weight=2
          >
            <l-popup>{{ organization.organization_name }}</l-popup>
          </l-circle-marker>
<!--          <l-geo-json-->
<!--            :geojson="organization.registered_province.geom"-->
<!--            x:visible=true-->
<!--            :options-style="{fillColor: 'red'}"-->
<!--            ref="province_geojson"-->
<!--            @ready="getProvinceBounds()"-->
<!--          />-->
<!--          <l-geo-json-->
<!--            :geojson="organization.registered_district.geom"-->
<!--            :visible=true-->
<!--            :options-style="{fillColor: 'blue'}"-->
<!--            ref="district_geojson"-->

<!--          />-->
    <!--      <l-geo-json-->
    <!--        :geojson="provinces"-->
    <!--        :options-style="styleFunction"-->
    <!--        v-if="show_provinces"-->
    <!--      />-->
        </l-map>
        <v-card class="mt-3" max-width="100%">
            <v-card-title>
              <h4 class="text-h4">İletişim</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <template v-if="organization.comms_permissions.contact_person_name_surname === true">
                  <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <p><strong>İletişim Kişisi</strong>: {{ organization.contact_person_name_surname }}</p>
                  </v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-icon>
                    <v-icon color="red">mdi-account</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    İletişim kişisi bilgisi paylaşılmamış.
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-list-item>
                <template v-if="organization.comms_permissions.organization_email_address === true">
                  <v-list-item-icon>
                    <v-icon>mdi-mail</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ organization.organization_email_address }}

                  </v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-icon>
                    <v-icon color="red">mdi-mail</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    E-posta adresi paylaşılmamış.
                  </v-list-item-content>
                </template>
              </v-list-item>
              <v-list-item>
                <template v-if="organization.comms_permissions.organization_phone === true">
                    <v-list-item-icon>
                      <v-icon>mdi-phone</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      {{ organization.organization_phone }}
                    </v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-icon>
                    <v-icon color="red">mdi-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    Telefon numarası paylaşılmamış.
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list>
            <v-list-item>
              <template v-if="organization.comms_permissions.address === true">
                <v-list-item-icon>
                  <v-icon>
                    mdi-map-marker
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  {{ organization.address }}

                </v-list-item-content>
              </template>
              <template v-else>
              <v-list-item-icon>
                <v-icon color="red">mdi-map-marker</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Adres paylaşılmamış
              </v-list-item-content>
            </template>
            </v-list-item>

          </v-card>

      </v-col>

    </v-row>
    <template>
      <v-row justify="center" style="background-color: white">
        <v-col>
          <v-dialog
              v-model="use_request_form"
              max-width="600"
              style="background-color: white"
              color="white"
          >
            <v-card>
              <v-card-title>
                Kaynağı kullanmak için istek gönderin
              </v-card-title>
              <v-card-text>
                  <CreateFacilityUseRequest
                    v-bind:organization=organization
                    v-bind:facility=selected_facility
                  ></CreateFacilityUseRequest>

              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import OrganizationDataService from "../services/organizationDataService";
import {LMap, LTileLayer, LCircleMarker, LPopup} from 'vue2-leaflet';
import CreateFacilityUseRequest from "../components/createFacilityUseRequest"

export default {
  name: "organizationDetail",
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LPopup,
    // LGeoJson
    CreateFacilityUseRequest
  },
  data () {
    return {
      organization: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 6,
      center: [38.9637, 35.2433],
      bounds: null,
      map: null,
      use_request_form: false,
      selected_facility: null,
    }
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
    getProvinceBounds() {
      let province_bounds;
      province_bounds = this.$refs.province_geojson.getBounds();
      this.$refs.single_organization_map.fitBounds(province_bounds);
      console.log(province_bounds);
    }
  },
  mounted () {
    OrganizationDataService.get(this.$route.params.id)
      .then(response => {
        this.organization = response.data
        this.center = [this.organization.location.coordinates[1], this.organization.location.coordinates[0]]
      });
  },
}
</script>
