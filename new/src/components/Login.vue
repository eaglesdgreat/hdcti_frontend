<template>
  <div>
<div style="display:flex; justify-content:center; padding-top:20px;">
          <v-form class="form-group">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:50%;">
                    <p class="text-style">COMPANY NAME:</p>
                  </div>

                  <div style="display:flex; flex-direction:column">
                    <div style="display:flex; width:70%; margin:auto;">
                      <v-text-field
                        v-model="input.name"
                        placeholder="Enter your company name"
                        outlined
                        name="name"
                        height="45"
                        @keyup="validateField"
                      ></v-text-field>
                    </div>

                    <div
                      :v-if="messages.name"
                      style="display:flex; margin:auto; width:70%;"
                    >
                      <span class="error-message-style">{{
                        messages.name
                      }}</span>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:50%;">
                    <p class="text-style">COMPANY EMAIL:</p>
                  </div>

                  <div style="display:flex; flex-direction:column">
                    <div style="display:flex; width: 70%; margin:auto;">
                      <v-text-field
                        placeholder="Enter your company email"
                        v-model="input.email"
                        outlined
                        name="email"
                        height="51"
                        @keyup="validateField"
                      ></v-text-field>
                    </div>

                    <div
                      :v-if="messages.email"
                      style="display:flex; margin:auto; width:70%;"
                    >
                      <span class="error-message-style">{{
                        messages.email
                      }}</span>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:48%">
                    <p class="text-style">OPENING HOUR:</p>
                  </div>

                  <div style="display:flex; flex-direction:column">
                    <div style="display:flex; width: 70%; margin:auto;">
                      <v-text-field
                        placeholder=" Enter your opening hour"
                        v-model="input.opening_hour"
                        outlined
                        name="opening_hour"
                        height="45"
                        type="time"
                      ></v-text-field>
                    </div>

                    <div
                      :v-if="messages.opening_hour"
                      style="display:flex; margin:auto; width:70%;"
                    >
                      <span class="error-message-style">{{
                        messages.opening_hour
                      }}</span>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:49%">
                    <p class="text-style">CLOSING HOUR:</p>
                  </div>

                  <div style="display:flex; flex-direction:column">
                    <div style="display:flex; width: 70%; margin:auto;">
                      <v-text-field
                        v-model="input.closing_hour"
                        placeholder="Enter your closing hour"
                        outlined
                        height="51"
                        name="closing_hour"
                        type="time"
                      ></v-text-field>
                    </div>

                    <div
                      :v-if="messages.closing_hour"
                      style="display:flex; margin:auto; width:70%;"
                    >
                      <span class="error-message-style">{{
                        messages.closing_hour
                      }}</span>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:50%;">
                    <p class="text-style">OFFICE ADDRESS:</p>
                  </div>

                  <div style="display:flex; flex-direction:column">
                    <div style="display:flex; width: 70%; margin:auto;">
                      <v-text-field
                        placeholder="Enter your office address"
                        v-model="input.address"
                        outlined
                        @keyup="validateField"
                        name="address"
                        height="51"
                      ></v-text-field>
                    </div>

                    <div
                      :v-if="messages.address"
                      style="display:flex; margin:auto; width:70%;"
                    >
                      <span class="error-message-style">{{
                        messages.address
                      }}</span>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:58%;">
                    <p class="text-style">SECOND OFFICE ADDRESS:</p>
                  </div>

                  <div style="display:flex; width: 70%; margin:auto;">
                    <v-text-field
                      v-model="input.second_address"
                      placeholder="Enter your office address 2"
                      outlined
                      height="51"
                    ></v-text-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:59%">
                    <p class="text-style">COMPANY PHONE NUMBER:</p>
                  </div>

                  <div style="display:flex; flex-direction:column">
                    <div style="display:flex; width: 70%; margin:auto;">
                      <v-text-field
                        v-model="input.phone_number"
                        placeholder="Enter your company phone number"
                        outlined
                        @keyup="validateField"
                        name="phone_number"
                        height="51"
                      ></v-text-field>
                    </div>

                    <div
                      :v-if="messages.phone_number"
                      style="display:flex; margin:auto; width:70%;"
                    >
                      <span class="error-message-style">{{
                        messages.phone_number
                      }}</span>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:62%">
                    <p class="text-style">ALTERNATE PHONE NUMBER:</p>
                  </div>

                  <div style="display:flex; width: 70%; margin:auto;">
                    <v-text-field
                      placeholder="Enter alternate phone numbere"
                      v-model="input.second_phone_number"
                      outlined
                      height="51"
                    ></v-text-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:53%">
                    <p class="text-style">COMPANY WEBSITE:</p>
                  </div>

                  <div style="display:flex; width: 70%; margin:auto;">
                    <v-text-field
                      placeholder="Enter your company's website URL"
                      v-model="input.website_url"
                      outlined
                      height="51"
                    ></v-text-field>
                  </div>
                </v-col>

                <!-- <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                  <div style="display:flex; justify-content:center; width:47%">
                    <p class="text-style">UPLOAD LOGO:</p>
                  </div>

                  <div style="display:flex; flex-direction:column">
                    <div style="display:flex; width: 70%; margin:auto;">
                      <v-file-input
                        chips
                        :rules="rules"
                        accept="image/png, image/jpeg, image/bmp"
                        placeholder="Upload your company logo"
                        multiple
                        v-model="input.logo"
                        outlined
                        name="logo"
                        prepend-icon=""
                        show-size
                        counter
                      ></v-file-input>
                    </div>

                    <div
                      :v-if="messages.logo"
                      style="display:flex; margin:auto; width:70%;"
                    >
                      <span class="error-message-style">{{
                        messages.logo
                      }}</span>
                    </div>
                  </div>
                </v-col> -->
              </v-row>
            </v-container>
          </v-form>
        </div>
  </div>
</template>

<script>


export default {
  name: "company",

  components: {
    
  },

  data() {
    return {
      e1: 1,
    };
  },

  methods: {
  },
};
</script>

<style scoped>
.stp {
  font-size: 15px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
}

/* .media {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2em;
}

.media > * {
  flex: 1 1 250px;
  margin: 10px;
} */
</style>