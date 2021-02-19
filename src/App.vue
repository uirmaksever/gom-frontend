<template>
  <v-app>
    <v-app-bar
      color="white"
      app
      flat
      class="mb-0"
    >
      <div class="d-flex align-center">
        <router-link to="/" class="navbar-brand text-dark">Gençlik Örgütleri Haritası</router-link>
      </div>
      <router-link to="/filter" class="nav-link text-dark">Filtre</router-link>

      <v-spacer></v-spacer>
      <v-btn href="/new">
        Örgütünü Ekle!
      </v-btn>
      <v-btn
        href="https://www.go-for.org/"
        target="_blank"
        text
        rounded
        class="m-2"
      >
        <img height="40" src="/logos/gofor-logo.png">
<!--        <span class="mr-2">Gençlik Örgütleri Forumu</span>-->
<!--        <v-icon>mdi-open-in-new</v-icon>-->
      </v-btn>

    </v-app-bar>
    <v-divider></v-divider>
    <v-main fluid>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
};
</script>
