<template>
  <v-app>
    <v-container fluid>
      <Sidebar v-if="$route.name !== 'iframe-page'"></Sidebar>
<!--      <HeaderTop></HeaderTop>-->
<!--      <v-divider></v-divider>-->
      <v-main>
        <!-- <div>{{ $route.name !== "iframe-page" }}</div>

        <div>{{ $route.matched.some(({ name }) => name === 'iframe') }}</div> -->
        <router-view :key="$route.fullPath"></router-view>
      </v-main>
      <v-btn
        href="new"
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
