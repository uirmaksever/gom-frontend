<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="mt-5">
          <h1 class="text-center primary--text">Örgütünüzü ağa dahil edin!</h1>
        </div>
<!--        <v-btn href="https://forms.gle/KyoEkCvCUbgHuk858" depressed class="primary text-center" target="_blank">-->
<!--          <v-icon class="ma-2">mdi-google-downasaur</v-icon>-->
<!--          Google Forms-->
<!--        </v-btn>-->
<!--        <v-divider class="my-5"></v-divider>-->
<!--        <div class="d-flex justify-center" style="height: 90vh">-->
<!--          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScCtZ6e3QNOR8UX6IQyjJtKPvmVnElnvKXRrTWLAz4JeWvdUw/viewform?embedded=true" width="640" height="100%" frameborder="0" marginheight="0" marginwidth="0">Yükleniyor…</iframe>-->
<!--        </div>-->
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

                <v-menu
                  v-model="organization.establishment_date.date_menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="organization.establishment_date.value"
                      label="Kuruluş Tarihi"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="organization.establishment_date.rules"
                      :error="organization.establishment_date.error"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="organization.establishment_date.value"
                    @input="organization.establishment_date.date_menu = false"
                  ></v-date-picker>
                </v-menu>

                <v-select
                  v-model="organization.type_of_organization.value"
                  :items="organization_types"
                  item-text="full"
                  item-value="abbr"
                  placeholder="Örgüt Tipi"
                  return-object
                  single-line
                  :rules="organization.type_of_organization.rules"
                  :error="organization.type_of_organization.error"
                ></v-select>

                <v-select
                  v-model="organization.registered_province.value"
                  :items="provinces"
                  item-text="name_1"
                  item_value="gid_1"
                  return-object
                  single-line
                  :rules="organization.registered_province.rules"
                  :error="organization.registered_province.error"
                  @change="change_districts"
                  v-bind:loading="organization.registered_province.loading"
                ></v-select>

                <v-select
                  ref="district_field"
                  v-model="organization.registered_district.value"
                  :items="districts"
                  item-text="name_2"
                  item-value="gid_2"
                  return-object
                  single-line
                  :rules="organization.registered_district.rules"
                  :error="organization.registered_district.error"
                  v-bind:disabled="organization.registered_district.disabled"
                ></v-select>

                <v-select
                  v-model="organization.related_thematic_fields.value"
                  :items="thematic_fields"
                  item-text="thematic_field_name"
                  item-value="pk"
                  return-object
                  multiple
                  single-line
                  chips
                  :rules="organization.related_thematic_fields.rules"
                  :error="organization.related_thematic_fields.error"
                ></v-select>

                <v-btn
                  color="primary"
                  @click="selected_page = 2"
                >
                  İLERİ
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">

                <v-text-field
                  v-model="organization.email.value"
                  :rules="organization.email.rules"
                  :error="organization.email.error"
                  label="E-posta Adresi"
                ></v-text-field>

                <v-text-field
                  v-model="organization.contact_person_name_surname.value"
                  :rules="organization.contact_person_name_surname.rules"
                  :error="organization.contact_person_name_surname.error"
                  label="İletişim Kişisi İsim Soyismi"
                ></v-text-field>

                <VuetifyPhoneInput
                    :countries="phone_countries"
                    placeholder="İletişim Kişisinin Telefon Numarası"
                    v-model="organization.phone_number.value"
                ></VuetifyPhoneInput>

                <v-checkbox
                    label="Örgütünüzün ofisi varsa bu kutuyu işaretleyiniz."
                    v-model="organization.organization_have_office.value"
                ></v-checkbox>

                <v-text-field
                    v-model="organization.website_address.value"
                    :rules="organization.website_address.rules"
                    :error="organization.website_address.error"
                    label="Örgütünüzün Web Sitesi"
                    placeholder="http://www.go-for.org/"
                ></v-text-field>



                <v-btn
                  color="primary"
                  @click="selected_page = 3"
                >
                  İLERİ
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">

                <v-text-field
                    v-model="organization.facebook.value"
                    :rules="organization.facebook.rules"
                    :error="organization.facebook.error"
                    label="Örgütünüzün Facebook Sayfası/Grubu"
                    placeholder="https://www.facebook.com/gofortr"
                ></v-text-field>

                <v-text-field
                    v-model="organization.youtube.value"
                    :rules="organization.youtube.rules"
                    :error="organization.youtube.error"
                    label="Örgütünüzün Youtube Kanalı"
                    placeholder="https://www.youtube.com/channel/UCSmJwmgSJvJybozF1uYTtkw"
                ></v-text-field>

                <v-text-field
                    v-model="organization.whatsapp_telegram.value"
                    :rules="organization.whatsapp_telegram.rules"
                    :error="organization.whatsapp_telegram.error"
                    label="Örgütünüzün Whatsapp/Telegram Grubu"
                    placeholder="https://chat.whatsapp.com/ENV9Oxgg0SOHyc7Mm2bsaS"
                ></v-text-field>
                
                <v-btn
                  color="primary"
                  @click="selected_page = 4"
                >
                  İLERİ
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-btn
                  color="primary"
                  @click="submit()"
                >
                  İLERİ
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
  import ProvinceNameDataService from "../services/provinceNameDataService"
  import DistrictNameDataService from "../services/districtNameDataService"
  import ThematicFieldDataService from "../services/thematicFieldDataService"
  import VuetifyPhoneInput from '@kingscode/vuetify-phone-input';


  export default {
    components: {VuetifyPhoneInput},
    data () {
      return {
        selected_page: 1,
        organization_types: [
            {abbr: "dernek", full: "Dernek"},
            {abbr: "kooperatif", full: "Kar amacı gütmeyen kooperatif"},
            {abbr: "platform", full: "Platform"},
            {abbr: "kulup", full: "Üniversite Kulübü"},
            {abbr: "vakif", full: "Vakıf"},
            {abbr: "sosyal_girisim", full: "Sosyal Girişim"},
            {abbr: "inisiyatif", full: "İnisiyatif"},
            {abbr: "diger", full: "Diğer"},
            {abbr: "genclik_meclisi", full: "Gençlik Meclisi"}
        ],
        provinces: [],
        districts: [],
        thematic_fields: [],
        organization: {
          organization_name: {
            value: null,
            rules: [],
            error: []
          },
          establishment_date: {
            value: new Date().toISOString().substr(0, 10),
            date_menu: false,
            rules: [],
            error: [],
          },
          type_of_organization: {
            value: {abbr: "dernek", full: "Dernek"},
            rules: [],
            error: [],
          },
          registered_province: {
            value: null,
            rules: [],
            error: [],
            loading: true,
          },
          registered_district: {
            value: null,
            rules: [],
            error: [],
            disabled: true,
          },
          related_thematic_fields: {
            value: null,
            rules: [], //TODO! Max 3
            error: [],
            loading: true,
          },
          email: {
            value: null,
            rules: [], //TODO! Email rules
            error: [],
          },
          contact_person_name_surname: {
            value: null,
            rules: [],
            error: [],
          },
          phone_number: {
            value: null,
            rules: [], // TODO! Phone rules
            error: []
          },
          organization_have_office: {
            // Boolean - Checkbox
            value: false,
            rules: [],
          },
          address: {
            value: null,
            rules: [],
            error: []
          },
          // SECTION 3: Social Media and Visibility Info
          // TODO!: Organization Logo Field will be here
          website_address: {
            value: null,
            rules: [], // TODO!: URL rules
            error: []
          },
          facebook: {
            value: null,
            rules: [], // TODO!: URL rules
            error: []
          },
          twitter: {
            value: null,
            rules: [],
            error: []
          },
          youtube: {
            value: null,
            rules: [],
            error: []
          },
          whatsapp_telegram: {
            value: null,
            rules: [],
            error: []
          },

        }
      }
    },
    methods: {
      change_districts() {
        DistrictNameDataService.getForProvince(this.organization.registered_province.value.gid_1)
          .then(
              response => {this.districts = response.data}
          )
        this.organization.registered_district.disabled = false;
      }
    },
    mounted() {
      ProvinceNameDataService.getAll()
        .then(
            response => {this.provinces = response.data}
        )
      this.organization.registered_province.loading = false
      ThematicFieldDataService.getAll()
        .then(
            response => {this.thematic_fields = response.data}
        )
    },
    computed: {
      phone_countries: () => [
        {code: 90, name: "TR",}
      ],
    }
  }


</script>
