<template>
  <v-container>
    <v-col>
      <h1 class="text-center">Tematik Alanlar</h1>
      <v-card tile>
        <v-list-item :key="thematic_field.id" v-for="thematic_field in thematic_fields">
          <v-list-item-content>
            <v-list-item-title>{{ thematic_field.thematic_field_name }}</v-list-item-title>
            <v-list-item-subtitle>{{ thematic_field.total_organizations }} Örgüt</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn :to="'thematic_fields/' + thematic_field.id">ÖRGÜTLERİ GÖR</v-btn>
          </v-list-item-action>
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
  }
}
</script>