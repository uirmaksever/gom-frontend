<template>
<v-form v-model="valid" ref="use_request_form">
  <v-alert
      rounded
      outlined
      text
      icon="mdi-semantic-web"
      type="info"
  >
    <small>İstek gönderdiğiniz örgüt</small>
    <h5>{{ organization.organization_name }}</h5>
  </v-alert>
  <v-alert
      rounded
      outlined
      text
      icon="mdi-account-group"
      color="orange"
      type="info"
  >
    <small>Kullanım isteği gönderdiğiniz kaynak</small>
    <h5>{{ facility.facility_name }}</h5>

  </v-alert>
  <v-alert rounded outlined type="error" v-if="error_response" >
    Girdiğiniz bilgilerde hatalar var! Lütfen aşağıdaki hataları düzeltip tekrar deneyin.
  </v-alert>
  <v-alert rounded outlined type="error" v-if="error_status == 500" >
    Talebinizi işlerken bir sorun oluştu. Bu utandırıcı.
    Girdiğiniz bilgileri <a href="mailto:orgutler@go-for.org">orgutler@go-for.org</a>
    adresine e-posta kanalıyla iletebilirseniz, ulaşması için elimizden geleni yapacağız.
  </v-alert>
  <v-text-field ref="requester_name_surname"
                v-model="requester_name_surname.value"
                label="İsim Soyisminiz"
                :error=requester_name_surname.show_error
                :rules="requester_name_surname.error"
  ></v-text-field>
  <v-text-field ref="requester_email_address"
                v-model="requester_email_address.value"
                label="E-posta Adresiniz"
                :error=requester_email_address.show_error
                :rules="requester_email_address.error"></v-text-field>
  <v-text-field ref="requester_phone_number"
                v-model="requester_phone_number.value"
                :rules="requester_phone_number.error"
                :error=requester_phone_number.show_error
                label="Telefon Numaranız"></v-text-field>
  <v-text-field ref="requester_organization_name"
                v-model="requester_organization_name.value"
                :error=requester_organization_name.show_error
                :rules="requester_organization_name.error"
                label="Temsil Ettiğiniz Örgütün Adı"></v-text-field>
  <v-text-field ref="requester_organization_name"
                v-model="message.value"
                :error=message.show_error
                :rules="message.error"
                label="Mesajınız / Talebinizle ilgili detaylar"></v-text-field>
  <v-checkbox ref="data_process_permission"
              v-model="data_process_permission.value"
              :error=data_process_permission.show_error
              label='Paylaştığınız kişisel verinin talebinizin iletilmesi adına işlenmesini onaylıyor musunuz?'
              :rules="data_process_permission.error"
  ></v-checkbox>
  <v-btn @click="postUseRequest">Gönder</v-btn>
  <v-dialog v-model="success_dialog"
            max-width=600
  >
    <v-card>
      <v-card-title class="justify-center">Talebiniz başarıyla iletildi!</v-card-title>
      <v-card-text class="justify-content-center">
        <div class="text-center">
          <v-btn icon color="primary" height=80 width=80>
            <v-icon size=60>mdi-check-outline</v-icon>
          </v-btn>
          <p>Talebinizi başarıyla aldık. Talebinizin bir kopyasını size, bir kopyasını da talep gönderdiğiniz
             örgütün iletişim kişisine e-posta yoluyla ilettik. İşbirliğinize aracılık ettiğimiz için mutluyuz :)</p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</v-form>

</template>
<script>
import FacilityUseRequestDataService from "../services/facilityUseRequestDataService"

export default {
  name: "CreateFacilityUseRequest",
  data () {
      return {
        response: null,
        requester_email_address: {
          value: null,
          error: [],
          show_error: false,
        },
        valid:false,
        emailRules: [
            value => !!value || "E-posta adresinizi girmelisiniz. Kullanım isteğinizle ilgili iletişim e-posta kanalı ile gerçekleşecektir."
        ],
        requester_phone_number: {
          value: null,
          error: [],
          show_error: false,
        },
        requester_name_surname: {
          value: null,
          error: [],
          show_error: false,
        },
        requester_organization_name: {
          value: null,
          error: [],
          show_error: false,
        },
        message: {
          value: null,
          error: [],
          show_error: false,
        },
        data_process_permission: {
          value: false,
          error: [],
          show_error: false,

        },
        dataProcessPermissionRules: [
            value =>  !!value || "Kişisel verinizin işlenmesini onaylamalısınız."
        ],
        error_response: null,
        error_status: null,
        show_error_responses: false,
        success_dialog: false,
      }
  },
  computed: {
    field_error_status (val) {
      console.log(val)
      return true
    }
  }
  ,
  props: {
    organization: {
      type: Object,
      default () {
        return this.organization;
      }
    },
    facility: {
      type: Object,
      default() {
        return this.facility;
      }
    }
  },
  methods: {
    postUseRequest() {
      let use_request = {
        related_organization: this.organization.id,
        related_facility: this.facility.id,
        requester_email_address: this.requester_email_address.value,
        requester_phone_number: this.requester_phone_number.value,
        requester_name_surname: this.requester_name_surname.value,
        requester_organization_name: this.requester_organization_name.value,
        message: this.message.value,
        data_process_permission: this.data_process_permission.value
      }
      FacilityUseRequestDataService.post(use_request)
        .then(response => {
          this.response = response.data
          this.error_response = null
          this.success_dialog = true
          console.log(this.response)
        })
        .catch(error => {
          this.error_response = error.response.data
          this.error_status = error.response.status
          console.log(error.response.status)
        })
    },
  },
  watch: {
    error_response: function () {
      this.$refs["use_request_form"].resetValidation()
      let fields_to_reset = ["requester_email_address", "requester_phone_number", "requester_organization_name", "message", "data_process_permission"]
      // Reset all fields to default state
      fields_to_reset.forEach(field_name => {
        this[field_name].error = []
        this[field_name].show_error = false
      })
      // Inject errors given by server
      Object.keys(this.error_response).forEach(
          field_name => {
            this[field_name].error = []
            this[field_name].show_error = false
            console.log(this[field_name])
            console.log(this.error_response[field_name])
            this[field_name].error = this.error_response[field_name]
            this[field_name].show_error = true
          }
      )
    }
  }
}
</script>
