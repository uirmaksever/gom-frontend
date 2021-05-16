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
                :complete="selected_page > 5"
                editable
                step="4">
              Kaynak Paylaşımı
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
                :complete="selected_page > 5"
                editable
                step="5">
              Bilgi Paylaşım İzinleri
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-form>
              <v-stepper-content step="1">
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field ref="organization_name"
                        v-model="organization.organization_name.value"
                        :rules="organization.organization_name.rules"
                        :error=organization.organization_name.show_error
                        label="Örgütün Adı *"
                        prepend-icon="mdi"
                        @input="$v.organization.organization_name.value.$touch()"
                        @blur="$v.organization.organization_name.value.$touch()"
                        :error-messages=organization_name_errors
                      >
                      </v-text-field>

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
                            :error="organization.establishment_date.show_error"
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
                        placeholder="Örgüt Tipi *"
                        return-object
                        single-line
                        prepend-icon="mdi"
                        :rules="organization.type_of_organization.rules"
                        :error="organization.type_of_organization.show_error"
                        required
                        :error-messages="type_of_organization_errors"
                        @input="$v.organization.type_of_organization.value.$touch()"
                        @blur="$v.organization.type_of_organization.value.$touch()"
                      >
                        <template v-slot:label>Örgüt Tipi *</template>
                      </v-select>



                      <v-text-field
                        v-model="organization.address.value"
                        :rules="organization.address.rules"
                        :error="organization.address.show_error"
                        label="Örgütünüzün Merkezinin Adresi"
                        prepend-icon="mdi-map"
                        placeholder="Cumhuriyet Mh. Gençlik Cd. No: 1"
                      ></v-text-field>


                      <v-row>
                        <v-col cols="6">
                          <v-select
                            v-model="organization.registered_province.value"
                            :items="provinces"
                            item-text="name_1"
                            item_value="gid_1"
                            return-object
                            prepend-icon="mdi"
                            single-line
                            label="İl *"
                            :rules="organization.registered_province.rules"
                            :error="organization.registered_province.show_error"
                            @change="change_districts"
                            v-bind:loading="organization.registered_province.loading"
                            required
                            :error-messages="registered_province_errors"
                            @input="$v.organization.registered_province.value.$touch()"
                            @blur="$v.organization.registered_province.value.$touch()"
                          ></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            ref="district_field"
                            v-model="organization.registered_district.value"
                            :items="districts"
                            item-text="name_2"
                            item-value="gid_2"
                            label="İlçe *"
                            prepend-icon="mdi"
                            return-object
                            single-line
                            :rules="organization.registered_district.rules"
                            :error="organization.registered_district.show_error"
                            v-bind:disabled="organization.registered_district.disabled"
                            required
                            :error-messages="registered_district_errors"
                            @input="$v.organization.registered_district.value.$touch()"
                            @blur="$v.organization.registered_district.value.$touch()"
                          ></v-select>

                        </v-col>
                      </v-row>

                      <v-switch
                          v-model="organization.location.show_map"
                          @change="activateMarker"
                          label="Örgütümün konumunu eklemek istiyorum"
                          prepend-icon="mdi-map-marker"
                      >
                        <template v-slot:label>Örgütümün konumunu eklemek istiyorum</template>
                      </v-switch>
                      <template v-if="organization.location.show_map === true">
                        <LMap
                          :zoom.sync="locationmap.zoom"
                          :options="locationmap.mapOptions"
                          :center="locationmap.center"
                          :bounds="locationmap.bounds"
                          :min-zoom="locationmap.minZoom"
                          :max-zoom="locationmap.maxZoom"
                          style="height: 500px; width: 100%; z-index: 0"
                          @update:zoom="zoomUpdated"
                          @update:center="centerUpdated"
                          @update:bounds="boundsUpdated"
                          @click="updateLocation"
                        >
                          <l-tile-layer :url="locationmap.url"></l-tile-layer>
                          <l-control-zoom position="topleft"  ></l-control-zoom>

                          <LMarker
                              :visible=true
                              :draggable=true
                              :lat-lng.sync="organization.location.value"
                          >
                            <LPopup content="Örgütünüz konumu"></LPopup>
                            <l-icon :icon-size="locationmap.icon.icon_size"
                                    :icon-anchor="locationmap.icon.icon_anchor"
                                    :popup-anchor="locationmap.icon.popup_anchor"
                                    :icon-url="locationmap.icon.icon_url"
                            ></l-icon>
                          </LMarker>
                        </LMap>
                      </template>

                      <v-select
                        v-model="organization.related_thematic_fields.value"
                        :items="thematic_fields"
                        item-text="thematic_field_name"
                        item-value="id"
                        label="Tematik Alanlar *"
                        multiple
                        prepend-icon="mdi-shape"
                        single-line
                        chips
                        :rules="organization.related_thematic_fields.rules"
                        :error="organization.related_thematic_fields.show_error"
                        required
                        :error-messages="related_thematic_fields_errors"
                        @input="$v.organization.related_thematic_fields.value.$touch()"
                        @blur="$v.organization.related_thematic_fields.value.$touch()"
                      ></v-select>

                      <v-checkbox
                          label="Örgütünüz Gençlik Örgütleri Forumu üyesi mi?"
                          v-model="organization.gofor_membership_status.value"
                      ></v-checkbox>

                    </v-col>
                  </v-row>

                </v-container>

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
                  :error="organization.email.show_error"
                  label="E-posta Adresi *"
                  placeholder="yusufyilmaz@genclikorgutunuz.org"
                  required
                  :error-messages="email_errors"
                  prepend-icon="mdi-email"
                  @input="$v.organization.email.value.$touch()"
                  @blur="$v.organization.email.value.$touch()"
                ></v-text-field>

                <v-text-field
                  v-model="organization.contact_person_name_surname.value"
                  :rules="organization.contact_person_name_surname.rules"
                  :error="organization.contact_person_name_surname.show_error"
                  placeholder="Yusuf Yılmaz"
                  label="İletişim Kişisi İsim Soyismi *"
                  required
                  :error-messages="contact_person_name_surname_errors"
                  prepend-icon="mdi-account"
                  @input="$v.organization.contact_person_name_surname.value.$touch()"
                  @blur="$v.organization.contact_person_name_surname.value.$touch()"
                ></v-text-field>

                <v-text-field
                    v-model="organization.phone_number.value"
                    placeholder="5321001010"
                    label="İletişim Kişisinin Telefon Numarası"
                    :error-messages="phone_number_errors"
                    prepend-icon="mdi-phone"
                    prefix="+90"
                    @input="$v.organization.phone_number.value.$touch()"
                    @blur="$v.organization.phone_number.value.$touch()"
                >

                </v-text-field>
<!--                <VuetifyPhoneInput-->
<!--                    :countries="phone_countries"-->
<!--                    placeholder="İletişim Kişisinin Telefon Numarası"-->
<!--                    v-model="organization.phone_number.value"-->
<!--                    @phone="onPhone"-->
<!--                ></VuetifyPhoneInput>-->

                <v-checkbox
                    label="Örgütünüzün ofisi varsa bu kutuyu işaretleyiniz."
                    v-model="organization.organization_have_office.value"
                ></v-checkbox>

                <v-btn
                  color="primary"
                  @click="selected_page = 3"
                >
                  İLERİ
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-text-field
                  v-model="organization.website_address.value"
                  :rules="organization.website_address.rules"
                  :error="organization.website_address.show_error"
                  :prefix=organization.website_address.prefix
                  label="Örgütünüzün Web Sitesi"
                  placeholder="www.go-for.org/"
                  prepend-icon="mdi-web"
                  @change="get_full_url(organization.website_address)"
                  :error-messages="website_address_errors"
                  @input="$v.organization.website_address.full_url.$touch()"
                  @blur="$v.organization.website_address.full_url.$touch()"
                ></v-text-field>

                <v-text-field
                    v-model="organization.facebook.value"
                    :rules="organization.facebook.rules"
                    :error="organization.facebook.show_error"
                    label="Örgütünüzün Facebook Sayfası/Grubu"
                    :prefix=organization.facebook.prefix
                    placeholder="gofortr"
                    :error-messages="facebook_errors"
                    prepend-icon="mdi-facebook"
                    @input="$v.organization.facebook.full_url.$touch()"
                    @blur="$v.organization.facebook.full_url.$touch()"
                    @change="get_full_url(organization.facebook)"
                ></v-text-field>

                <v-text-field
                    v-model="organization.twitter.value"
                    :rules="organization.twitter.rules"
                    :error="organization.twitter.show_error"
                    label="Örgütünüzün Twitter Hesabı"
                    :prefix=organization.twitter.prefix
                    placeholder="gofortr"
                    prepend-icon="mdi-twitter"
                    :error-messages="twitter_errors"
                    @input="$v.organization.twitter.full_url.$touch()"
                    @blur="$v.organization.twitter.full_url.$touch()"
                    @change="get_full_url(organization.twitter)"
                ></v-text-field>

                <v-text-field
                    v-model="organization.instagram.value"
                    :rules="organization.instagram.rules"
                    :error="organization.instagram.show_error"
                    label="Örgütünüzün Instagram Hesabı"
                    :error-messages="instagram_errors"
                    :prefix=organization.instagram.prefix
                    prepend-icon="mdi-instagram"
                    placeholder="gofortr"
                    @input="$v.organization.instagram.full_url.$touch()"
                    @blur="$v.organization.instagram.full_url.$touch()"
                    @change="get_full_url(organization.instagram)"
                ></v-text-field>

                <v-text-field
                    v-model="organization.youtube.value"
                    :rules="organization.youtube.rules"
                    :error="organization.youtube.show_error"
                    label="Örgütünüzün Youtube Kanalı"
                    placeholder="https://www.youtube.com/channel/UCSmJwmgSJvJybozF1uYTtkw"
                    :error-messages="youtube_errors"
                    prepend-icon="mdi-youtube"
                    @input="$v.organization.youtube.value.$touch()"
                    @blur="$v.organization.youtube.value.$touch()"
                ></v-text-field>

                <v-text-field
                    v-model="organization.whatsapp_telegram.value"
                    :rules="organization.whatsapp_telegram.rules"
                    :error="organization.whatsapp_telegram.show_error"
                    prepend-icon="mdi-whatsapp"
                    label="Örgütünüzün Whatsapp/Telegram Grubu"
                    placeholder="https://chat.whatsapp.com/ENV9Oxgg0SOHyc7Mm2bsaS"
                ></v-text-field>

                <v-file-input
                  label="Örgütünüzün Logosu"
                  v-model="organization.logo.value"
                  counter
                  show-size
                  prepend-icon="mdi-file"
                  :accept="organization.logo.accepted_formats"
                  truncate-length="50"
                  @change="imageToBase64(organization.logo.value)"
                ></v-file-input>
                <v-btn
                  color="primary"
                  @click="selected_page = 4"
                >
                  İLERİ
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-container>
                  <h3>Sahip olduğunuz kaynakların kullanımına yönelik hangilerine dair sizinle iletişime geçilmesine izin veriyorsunuz?</h3>
                  <v-row>
                    <v-col>
                      <v-switch
                        color="primary"
                        v-model="organization.facilities_select"
                        :value=facility.id
                        :key="facility.id" v-for="facility in facilities"
                      >
                        <template v-slot:label>
                          {{ facility.facility_name }}
                        </template>
                      </v-switch>
                    </v-col>

                  </v-row>
                </v-container>

                <v-btn
                  color="primary"
                  @click="selected_page = 5"
                >
                  İLERİ
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="5">
                <v-container>
                  <h3>Örgütünüze ait bilgilerden hangilerinin herkese açık şekilde paylaşılması izin veriyorsunuz?</h3>
                  <v-row>
                    <v-col>
                      <v-switch
                          color="primary"
                          :key="index"
                          v-model="permission.value"
                      v-for="(permission, index) in comms_permission_fields">
                        <template v-slot:label>
                          {{ permission.label }}
                        </template>
                      </v-switch>
                    </v-col>
                  </v-row>
                </v-container>
                <v-alert type="error" outlined v-show="$v.$invalid">
                  Girdiğiniz hatalı ya da eksik bilgiler var.Lütfen önceki adımları gözden geçirin
                  ve zorunlu olarak işaretlenen tüm alanları doldurduğunuzdan emin olun.
                </v-alert>
                <v-btn
                  color="secondary"
                  @click="submit()"
                  :disabled="$v.$invalid"
                >
                  TAMAMLA
                </v-btn>
              </v-stepper-content>
            </v-form>
          </v-stepper-items>

        </v-stepper>
      </v-col>
    </v-row>

<!--    SUCCESS MODAL-->
    <v-dialog v-model="success_dialog"
              max-width=600
    >
      <v-card>
        <v-card-title class="justify-center">Örgüt kaydınız başarıyla iletildi!</v-card-title>
        <v-card-text class="justify-content-center">
          <div class="text-center">
            <v-btn icon color="primary" height=80 width=80>
              <v-icon size=60>mdi-check-outline</v-icon>
            </v-btn>
            <p>Örgütünüzün kaydını başarıyla aldık. Kaydınız onaylandığında bir onay e-postası alacaksınız ve örgütünüzü Gençlik Örgütleri Haritası'nda görüntüleyebileceksiniz.</p>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

<!--    FAILURE MODAL-->
    <v-dialog v-model="show_error_modal"
              max-width=600
    >
      <v-card>
        <v-card-title class="justify-center">Kaydınızın işlenmesinde bir sorun oluştu!</v-card-title>
        <v-card-text class="justify-content-center">
          <div class="text-center">
            <v-btn icon color="error" height=80 width=80>
              <v-icon size=60>mdi-alert-circle-outline</v-icon>
            </v-btn>
            <p>Bu utanç verici. Kaydınız işlenirken bir sorun oluştu. Kısa bir süre sonra yeniden denemenizi,
              sorun devam ediyorsa orgutler@go-for.org adresine e-posta göndermenizi öneriyoruz. E-postanıza aşağıdaki
              hata metnini de eklerseniz sorunu daha hızlı çözebiliriz.
            </p>
              <v-expansion-panels>
                <v-expansion-panel
                >
                  <v-expansion-panel-header>
                    Hata Metni: <code>{{ this.error_status }}</code>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content v-if="this.error_status !== 500">
                    <code>
                      <div>
                        {{ this.error_response }}
                      </div>
                    </code>

                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import ProvinceNameDataService from "../services/provinceNameDataService"
  import FacilityDataService from "../services/facilityDataService"
  import DistrictNameDataService from "../services/districtNameDataService"
  import ThematicFieldDataService from "../services/thematicFieldDataService"
  import OrganizationCreateDataService from "../services/organizationCreateDataService"
  // import VuetifyPhoneInput from '@kingscode/vuetify-phone-input';
  import {LMap,LTileLayer , LMarker, LPopup, LIcon, LControlZoom} from 'vue2-leaflet';
  import { validationMixin } from 'vuelidate'
  import {required, email, url, numeric, minLength, maxLength } from 'vuelidate/lib/validators'


  export default {
    name: "organizationCreate",
    components: {LTileLayer, LMap, LMarker, LPopup, LIcon, LControlZoom},
    mixins: [validationMixin],

    validations: {
      organization: {
        organization_name: {
          value: {required,}
        },
        type_of_organization: {
          value: {
            abbr: {required,}
          }
        },
        registered_province: {
          value: {required, }
        },
        registered_district: {
          value: {required, }
        },
        related_thematic_fields: {
          value: {required, }
        },
        phone_number: {
          value: {numeric, minLength: minLength(10), maxLength: maxLength(10)}
        },
        email: {
          value: {required, email}
        },
        contact_person_name_surname: {
          value:{required}
        },
        website_address: {
          full_url: {url}
        },
        facebook: {
          full_url: {url}
        },
        twitter: {
          full_url: {url}
        },
        instagram: {
          full_url: {url}
        },
        youtube: {
          value: {url}
        }
      },
    },

    data () {
      return {
        response: null,
        error_response: null,
        success_dialog: false,
        error_status: null,
        show_error_modal: false,
        selected_page: 1,
        organization_post_data: null,
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
        facilities: [],
        comms_permission_fields: {
          "organization_name": {
            "label": "Örgüt Adı",
            "value": true
          },
          "logo": {
            "label": "Logo",
            "value": true
          },
          "registered_province": {
            "label": "İl",
            "value": true
          },
          "registered_district": {
            "label": "İlçe",
            "value": true
          },
          "web_site": {
            "label": "Web Sitesi",
            "value": true
          },
          "social_media": {
            "label": "Sosyal Medya",
            "value": true
          },
          "address": {
            "label": "Adres",
            "value": true
          },
          "organization_email_address": {
            "label": "Örgütün E-posta Adresi",
            "value": true
          },
          "organization_phone": {
            "label": "Örgütün Telefon Numarası",
            "value": true
          },
          "contact_person_name_surname": {
            "label": "İletişim Kişisi İsim Soyismi",
            "value": true
          },
          "related_facilities": {
            "label": "Paylaşılan Kaynaklar",
            "value": true
          },
        },
        organization: {
          organization_name: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
          establishment_date: {
            value: null,
            date_menu: false,
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
          location: {
            value: null,
            show_map: false,
            value_fixed: null,
          },
          type_of_organization: {
            value: {abbr: null, full: null},
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
          facilities_select: [],
          registered_province: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
            loading: true,
          },
          registered_district: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
            disabled: true,
          },
          related_thematic_fields: {
            value: null,
            rules: [], //TODO! Max 3
            error: [],
            show_error: false,
            required: false,
            loading: true,
          },
          gofor_membership_status: {
            value: false,
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
          email: {
            value: null,
            rules: [], //TODO! Email rules
            error: [],
            show_error: false,
            required: false,
          },
          contact_person_name_surname: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
          phone_number: {
            value: null,
            value_raw: null,
            rules: [], // TODO! Phone rules
            error: [],
            show_error: false,
            required: false,
          },
          organization_have_office: {
            // Boolean - Checkbox
            value: false,
            error: [],
            show_error: false,
            required: false,
          },
          address: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
          // SECTION 3: Social Media and Visibility Info
          // TODO!: Organization Logo Field will be here
          website_address: {
            value: null,
            rules: [], // TODO!: URL rules
            error: [],
            show_error: false,
            required: false,
            prefix: "http://",
            full_url: null
          },
          facebook: {
            value: null,
            rules: [], // TODO!: URL rules
            error: [],
            show_error: false,
            required: false,
            prefix: "https://www.facebook.com/",
            full_url: null
          },
          twitter: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
            prefix: "https://www.twitter.com/",
            full_url: null
          },
          instagram: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
            prefix: "https://www.instagram.com/",
            full_url: null
          },
          youtube: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
          whatsapp_telegram: {
            value: null,
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
          logo: {
            value: null,
            value_base64: null,
            accepted_formats:"image/*",
            rules: [],
            error: [],
            show_error: false,
            required: false,
          },
        },
        locationmap: {
          center: {"lat": 38.9637, "lng": 35.2433},
          opacity: 0.6,
          mapOptions: {
            zoomControl: false,
            attributionControl: false,
            zoomSnap: true,
          },
          zoom: 6,
          minZoom: 6,
          maxZoom: 13,
          bounds: null,
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          icon: {
            icon_size: [20,30],
            icon_anchor: [10,25],
            popup_anchor: [0, -20],
            icon_url: "/icons/marker.png"
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
        this.organization.registered_district.value = null
      },
      zoomUpdated (zoom) {
        this.locationmap.zoom = zoom;
      },
      centerUpdated (center) {
        this.locationmap.center = center;
      },
      boundsUpdated (bounds) {
        this.locationmap.bounds = bounds;
      },
      activateMarker (active) {
        console.log(active)
        if (active === true) {
          this.organization.location.value = this.locationmap.center;
        }
        else {
          this.organization.location.value = null;
        }
      },
      updateLocation (event) {
        console.log(event)
        this.organization.location.value = event.latlng;
      },
      // This converts image to base64 and saves it alongside the original file and becomes null
      // if there is no image
      imageToBase64 (file) {
        console.log(file)
        var reader = new FileReader()
        if (this.organization.logo.value !== null) {
          reader.readAsDataURL(this.organization.logo.value)
          reader.onload = () => {
              console.log('file to base64 result:' + reader.result)
              this.organization.logo.value_base64 = reader.result
              return reader.result
            }
            reader.onerror = function (error) {
              console.log('Error: ', error)
            }
          }
          else {
            this.organization.logo.value_base64 = null
            return null
          }
        }
,
      submit () {
        this.organization_post_data = {
          "type_of_organization": this.organization.type_of_organization.value.abbr,
          "registered_province": this.organization.registered_province.value.id,
          "registered_district": this.organization.registered_district.value.id,
          "organization_name": this.organization.organization_name.value,
          "establishment_date": this.organization.establishment_date.value,
          "gofor_membership_status": this.organization.gofor_membership_status.value,
          "organization_email_address": this.organization.email.value,
          "contact_person_name_surname": this.organization.contact_person_name_surname.value,
          "organization_phone": this.get_phone,
          "organization_have_office": this.organization.organization_have_office.value,
          "address": this.organization.address.value,
          "web_site": this.organization.website_address.full_url,
          "facebook": this.organization.facebook.full_url,
          "instagram": this.organization.instagram.full_url,
          "twitter": this.organization.twitter.full_url,
          "youtube": this.organization.youtube.value,
          "whatsapp_telegram": this.organization.whatsapp_telegram.value,
          "logo": this.organization.logo.value_base64,
          "location": this.organization.location.value_fixed,
          "answer_id": "",
          "comms_permissions": {
            "organization_name": this.comms_permission_fields.organization_name.value,
            "logo": this.comms_permission_fields.logo.value,
            "registered_province": this.comms_permission_fields.registered_province.value,
            "registered_district": this.comms_permission_fields.registered_district.value,
            "web_site": this.comms_permission_fields.web_site.value,
            "social_media": this.comms_permission_fields.social_media.value,
            "address": this.comms_permission_fields.address.value,
            "organization_email_address": this.comms_permission_fields.organization_email_address.value,
            "organization_phone": this.comms_permission_fields.organization_phone.value,
            "contact_person_name_surname": this.comms_permission_fields.contact_person_name_surname.value,
            "related_facilities": this.comms_permission_fields.related_facilities.value,
            "answer_id": ""
          },
          "related_thematic_fields": this.organization.related_thematic_fields.value,
          "related_facilities": this.organization.facilities_select
        }

        OrganizationCreateDataService.post(this.organization_post_data)
          .then(response => {
            this.response = response.data
            this.error_response = null
            this.success_dialog = true
            console.log(this.response)
          })
          .catch(error => {
            this.error_response = error.response.data
            this.error_status = error.response.status
            this.show_error_modal = true
            console.log(error.response.status)
          })
      },
      get_full_url (field_data) {
        console.log(field_data)
        let field_value = field_data.value
        if (field_value === null || field_value === "") {
          field_data.full_url = null
          return null
        }
        else {
          let prefix = field_data.prefix
          let url = prefix + field_value
          field_data.full_url = url
          return url
        }

      },
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
      FacilityDataService.getAll()
        .then(
            response => {this.facilities = response.data}
        )
    },
    computed: {
      phone_countries: () => [
        {code: 90, name: "TR",}
      ],
      get_phone () {
        if (this.organization.phone_number.value === "" || this.organization.phone_number.value === null) {
          return null;
        }
        else {
          let phone = "+90" + String(this.organization.phone_number.value);
          return phone
        }
      },

      organization_name_errors () {
        const errors = []
        if (!this.$v.organization.organization_name.value.$dirty) return errors
        !this.$v.organization.organization_name.value.required && errors.push('Örgüt adı girilmesi zorunlu bilgidir.')
        return errors
      },
      type_of_organization_errors () {
        const errors = []
        if (!this.$v.organization.type_of_organization.value.abbr.$dirty) return errors
        !this.$v.organization.type_of_organization.value.abbr.required && errors.push('Örgüt tipi girilmesi zorunlu bilgidir.')
        return errors
      },
      registered_province_errors () {
        const errors = []
        if (!this.$v.organization.registered_province.value.$dirty) return errors
        !this.$v.organization.registered_province.value.required && errors.push('Örgütün kayıtlı olduğu il girilmesi zorunlu bilgidir.')
        return errors
      },
      registered_district_errors () {
        const errors = []
        if (!this.$v.organization.registered_district.value.$dirty) return errors
        !this.$v.organization.registered_district.value.required && errors.push('Örgütün kayıtlı olduğu ilçe girilmesi zorunlu bilgidir.')
        return errors
      },
      related_thematic_fields_errors () {
        const errors = []
        if (!this.$v.organization.related_thematic_fields.value.$dirty) return errors
        !this.$v.organization.related_thematic_fields.value.required && errors.push('En az bir tematik alanın seçilmesi zorunludur.')
        return errors
      },
      phone_number_errors () {
        const errors = []
        const error_message = "Telefon numarasını başında 0 olmadan 10 haneli girmelisiniz. Örnek: 5321001010"
        if (!this.$v.organization.phone_number.value.$dirty) return errors
        !this.$v.organization.phone_number.value.numeric && errors.push(error_message)
        !this.$v.organization.phone_number.value.minLength && errors.push(error_message)
        return errors
      },
      email_errors () {
        const errors = []
        if (!this.$v.organization.email.value.$dirty) return errors
        !this.$v.organization.email.value.email && errors.push('Girdiğiniz e-posta adresi geçerli formatta değil.')
        !this.$v.organization.email.value.required && errors.push('Örgütün e-posta adresi girilmesi zorunlu bilgidir.')
        return errors
      },
      contact_person_name_surname_errors () {
        const errors = []
        if (!this.$v.organization.contact_person_name_surname.value.$dirty) return errors
        !this.$v.organization.contact_person_name_surname.value.required && errors.push('İletişim kişisi isim soyismi girilmesi zorunlu bilgidir.')
        return errors
      },
      website_address_errors () {
        const errors = []
        if (!this.$v.organization.website_address.full_url.$dirty) return errors
        !this.$v.organization.website_address.full_url.url && errors.push('Girdiğiniz web adresi doğru formatta değil.')
        return errors
      },
      facebook_errors () {
        const errors = []
        if (!this.$v.organization.facebook.full_url.$dirty) return errors
        !this.$v.organization.facebook.full_url.url && errors.push('Girdiğiniz Facebook linki doğru formatta değil.')
        return errors
      },
      twitter_errors () {
        const errors = []
        if (!this.$v.organization.twitter.full_url.$dirty) return errors
        !this.$v.organization.twitter.full_url.url && errors.push('Girdiğiniz Twitter hesabı doğru formatta değil.')
        return errors
      },
      instagram_errors () {
        const errors = []
        if (!this.$v.organization.instagram.full_url.$dirty) return errors
        !this.$v.organization.instagram.full_url.url && errors.push('Girdiğiniz instagram hesabı hesabı doğru formatta değil.')
        return errors
      },
      youtube_errors () {
        const errors = []
        if (!this.$v.organization.youtube.value.$dirty) return errors
        !this.$v.organization.youtube.value.url && errors.push('Girdiğiniz Youtube linki doğru formatta değil.')
        return errors
      },
      location_fixed () {
        let location_data = this.organization.location;
        if (location_data.value === null) {
          location_data.value_fixed = null
          return null

        }
        else {
          // lat long given in reverse order
          let selected_lat_lng = [location_data.value.lat, location_data.value.lng]
          let point_obj = {"type": "Point",
            "coordinates": selected_lat_lng}
          location_data.value_fixed = point_obj
          return point_obj
        }
      }
    },
    watch: {

    }
  }


</script>
