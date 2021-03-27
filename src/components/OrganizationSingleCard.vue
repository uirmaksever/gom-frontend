<template>
          <v-card flat v-if="organization">
            <v-card-text v-if="organization.logo !== null">
              <v-img contain max-height="40"  :src="organization.logo"></v-img>

            </v-card-text>

            <v-card-title>{{ organization.organization_name }}</v-card-title>
            <v-card-subtitle>
              <v-icon>mdi-domain</v-icon>
              {{ organization.type_of_organization }}
              <template v-if="organization.comms_permissions.registered_province === true">
                <v-icon>mdi-map-marker-outline</v-icon>
                {{ organization.registered_province }} - {{ organization.registered_district }}
              </template>

            </v-card-subtitle>

            <v-card-text>
              <v-chip
                small
                class="my-2"
                color="#EEE8AA"
                text-color="purple"
                v-if="organization.gofor_membership_status === true">
              <v-icon small color="purple">mdi-star</v-icon>
              Go-for Üyesi
              </v-chip>
              <div v-if="organization.comms_permissions.social_media === true">
                <v-btn v-if="organization.comms_permissions.web_site === true && organization.web_site !== null"
                       :href="organization.web_site"
                       icon>
                  <v-icon color="primary">mdi-web</v-icon>
                </v-btn>
                <template v-for="account in social_media">
                  <v-btn icon
                         :href="get_social_media_url(account.accessor)"
                         :key="account.accessor"
                         v-if="does_social_media_exists(account.accessor)"
                  >
                    <v-icon v-bind:color="account.color">{{ account.icon }}</v-icon>

                  </v-btn>
                </template>


              </div>
              <div>
                <h4>Tematik Alanlar</h4>
                <v-chip-group column>
                  <v-chip v-bind:key="thematic_field.id"
                          v-for="thematic_field in organization.related_thematic_fields"
                          :to="'/thematic_fields/' + thematic_field.id">
                    {{ thematic_field.thematic_field_name }}
                  </v-chip>
                </v-chip-group>
              </div>
              <div v-if="organization.comms_permissions.related_facilities">
                <h4>Kaynaklar</h4>
                <v-chip-group column>
                  <v-chip v-for="facility in organization.related_facilities"
                          v-bind:key="facility.id"
                          :to="'/facilities/' + facility.id"
                  >{{ facility.facility_name }}</v-chip>
                </v-chip-group>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn :to="'/organizations/' + organization.id" outlined color="primary">GÖRÜNTÜLE</v-btn>
            </v-card-actions>
          </v-card>
          <p v-else>
            <v-card-text>
              Lütfen listeden ya da haritadan bir örgüt seçin.
            </v-card-text>
          </p>
</template>

<script>
 export default {
   name: "OrganizationSingleCard",
   data() {
     return {
      social_media: {
        facebook: {"accessor": "facebook","icon": "mdi-facebook", "color": "#3b5998"},
        twitter: {"accessor": "twitter", "icon": "mdi-twitter", "color": "#00acee"},
        instagram: {"accessor": "instagram", "icon": "mdi-instagram", "color": "#833AB4"},
        youtube: {"accessor": "youtube", "icon": "mdi-youtube", "color": "#255000"}
      }
     }
   },
   props: {
    organization: {
      type: Object,
      default() {
        return this.organization;
      }
    },
   },
   methods: {
     get_social_media_url (accessor) {
       console.log(accessor)
       return this.organization[accessor]
     },
     does_social_media_exists (accessor) {
       if (this.organization[accessor] === null) {
         return false;
       } else {
         return true;
       }
     }
   }
 }
</script>