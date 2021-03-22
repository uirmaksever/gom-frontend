<template>
  <v-navigation-drawer
          app
          permanent
          expand-on-hover
          v-model="drawer"
          light
          mini-variant
          class="accent-4">
        <v-layout column fill-height>
          <v-list dense>

          <v-list-item class="px-2 primary-accent-4" to="/" >
  <!--          <router-link to="/">-->
              <v-list-item-avatar>
                <v-icon color="primary">mdi-map</v-icon>
              </v-list-item-avatar>
              <v-list-item-title class="px-2">
                Gençlik Örgütleri Haritası

              </v-list-item-title>
  <!--          </router-link>-->
          </v-list-item>

          <v-divider></v-divider>

<!--          <v-list-item to="/filter" link>-->
<!--            <v-list-item-icon>-->
<!--              <v-icon>mdi-filter</v-icon>-->
<!--            </v-list-item-icon>-->
<!--            <v-list-item-content>-->
<!--&lt;!&ndash;              <router-link to="/filter">Filtre</router-link>&ndash;&gt;-->
<!--              Filtre-->
<!--            </v-list-item-content>-->

<!--          </v-list-item>-->
          <v-list-item to="/thematic_fields" link>
            <v-list-item-icon>
              <v-icon>mdi-vector-polyline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Tematik Alanlar
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/facilities" link>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Paylaşılabilecek Kaynaklar
            </v-list-item-content>
          </v-list-item>

          <v-list-item to="/provinces" link>
            <v-list-item-icon>
              <v-icon>mdi-city</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              İller
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2"></v-divider>
          <v-list-item to="/about" link>
            <v-list-item-icon>
              <v-icon >mdi-human-greeting</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Hakkında
            </v-list-item-content>
          </v-list-item>
          </v-list>

          <v-spacer></v-spacer>
          <v-list>
            <v-list-item href="https://www.go-for.org/" target="_blank">
              <v-list-item-icon>
                <v-img contain width="40" src="/logos/gofor-logo-short.png"></v-img>
              </v-list-item-icon>
              <v-list-item-content>Gençlik Örgütleri Forumu</v-list-item-content>
            </v-list-item>
          </v-list>

        </v-layout>
      </v-navigation-drawer>

</template>
<script>
export default {
  name: "Sidebar"
}
</script>