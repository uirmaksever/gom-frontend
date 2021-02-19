<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-center">Örgütünüzü ağa dahil edin!</h1>
        <v-stepper v-model="selected_page">
          <v-stepper-header>
            <v-stepper-step
                :complete="selected_page > 1"
                editable
                step="1">
              Temel Bilgiler
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :complete="selected_page > 2"
                editable
                step="2">
              İletişim Bilgileri
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :complete="selected_page > 3"
                editable
                step="3">
              Sosyal Medya
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :complete="selected_page > 4"
                editable
                step="4">
              Ekipman Paylaşımı
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-form>
              <v-stepper-content step="1">
                <v-text-field ref="organization_name"
                v-model="organization.organization_name.value"
                :rules="organization.organization_name.rules"
                :error=organization.organization_name.error
                label="Örgütün Adı"></v-text-field>
                <v-btn
                  color="primary"
                  @click="selected_page = 2"
                >
                  İleri
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-btn
                  color="primary"
                  @click="selected_page = 3"
                >
                  İleri
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-btn
                  color="primary"
                  @click="selected_page = 4"
                >
                  İleri
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-btn
                  color="primary"
                  @click="submit()"
                >
                  İleri
                </v-btn>
              </v-stepper-content>
            </v-form>
          </v-stepper-items>

        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        selected_page: 1,
        organization: {
          organization_name: {
            value: null,
            rules: [],
            error: []
          }
        }
      }
    }
  }
</script>
