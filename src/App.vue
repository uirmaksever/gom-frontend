<template>
  <v-app>
    <v-container fluid>
      <Sidebar></Sidebar>
<!--      <HeaderTop></HeaderTop>-->
<!--      <v-divider></v-divider>-->
      <v-main>
        <router-view :key="$route.fullPath"></router-view>
      </v-main>
      <v-btn
        href="https://forms.gle/KyoEkCvCUbgHuk858"
        target="_blank"
        class="primary"
        elevation="2"
        fab
        raised
        text
        fixed right bottom>
        <v-icon large>mdi-plus</v-icon>
      </v-btn>
    </v-container>
  </v-app>

</template>

<script>
// import HeaderTop from "@/components/HeaderTop"
import Sidebar from "@/components/sidebar"
export default {
  name: 'App',

  components: {
    // HeaderTop,
    Sidebar
  },

  data () {
    return {
      drawer: null,
    }
  },
};
</script>
