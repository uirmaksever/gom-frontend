<template>
  <v-container>
    <v-col cols="12">
      <div class="mt-5">
        <h1 class="text-center primary--text">Tematik Alanlar</h1>
      </div>
      <v-divider class="my-5"></v-divider>
      <v-card tile>
        <v-list-item :key="thematic_field.id" v-for="thematic_field in thematic_fields" :to="'thematic_fields/' + thematic_field.id">
          <v-list-item-icon>
            <v-icon>mdi-{{ thematic_field.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ thematic_field.thematic_field_name }}</v-list-item-title>
            <v-list-item-subtitle>{{ thematic_field.total_organizations }} Örgüt</v-list-item-subtitle>
<!--          <v-list-item-action>-->
<!--            <v-btn :to="'thematic_fields/' + thematic_field.id">ÖRGÜTLERİ GÖR</v-btn>-->
<!--          </v-list-item-action>-->
          </v-list-item-content>

        </v-list-item>
      </v-card>
    </v-col>

  </v-container>
</template>

<script>
import ThematicFieldDataService from "@/services/thematicFieldDataService";

export default {
  name: "ThematicFieldsList",
  data () {
    return {
      thematic_fields: [],
    }
  },
  mounted() {
    ThematicFieldDataService.getAll()
      .then(response => {
        this.thematic_fields = response.data;
      })
  },
  watch: {

  },
}
</script>