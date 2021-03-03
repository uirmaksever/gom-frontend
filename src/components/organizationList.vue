<template>
  <div>

    <v-card flat class="border">
      <v-list two-line
            max-height="90vh"
            class="overflow-y-auto p-1"
      >
      <v-container class="d-flex flex-nowrap justify-space-between border-bottom w-100"
        v-for="organization in organizations" :key="organization.id"
      >
        <v-card width="100%" outlined>
          <v-list-item
              three-line>
            <v-list-item-content>
              <div class="overline mb-2">
                {{ organization.type_of_organization }}
              </div>
              <v-list-item-title class="headline">
                {{ organization.organization_name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ organization.registered_province }} -
                {{ organization.registered_district }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="80">
              <v-img :src="organization.logo"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-text>
            <v-chip-group>
              <v-chip v-bind:key="thematic_field.id"
                      v-for="thematic_field in organization.related_thematic_fields"
                      :to="'/thematic_fields/' + thematic_field.id">
                {{ thematic_field.thematic_field_name }}
              </v-chip>
            </v-chip-group>
          </v-card-text>


          <v-card-actions>
            <v-btn text color="primary" :to="'/organizations/' + organization.id">
              Gör
            </v-btn>
          </v-card-actions>
  <!--        <v-avatar-->
  <!--          class="ma-3"-->
  <!--          size="75"-->
  <!--          circle-->
  <!--        >-->
  <!--        </v-avatar>-->
        </v-card>


      </v-container>
      </v-list>
    </v-card>
    <v-skeleton-loader
    v-show="loading"
    type="article, actions"
  ></v-skeleton-loader>
  </div>

</template>

<script>
// import OrganizationDataService from "@/services/organizationDataService"

export default {
  name: "OrganizationList",
  data () {
    return {

    }
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return this.loading;
      }
    },
    organizations: {
      type: Array,
      default () {
        return this.organizations
      }
    }
  },
  mounted() {
    // OrganizationDataService.getAll()
    //   .then(
    //       response => {this.organizations = response.data;},
    //   )
  },
  updated() {
    this.$nextTick(function () {
      console.log("Loaded now")
      // this.loading = false
    })
  },
  methods: {

  }
}
</script>
