<template>
  <div
    style="background: #00487C; padding:30px; width:90%; margin:auto; border-radius:20px"
  >
    <div class="mb-12" style="display:flex; flex-direction:column;">
      <div style="display:flex; justify-content:flex-end; padding-top:20px;">
        <div style="display:flex; width:100%; justify-content:flex-start;">
          <sequential-entrance tag="section" fromLeft>
            <img src="./../../assets/stride1.png" />
          </sequential-entrance>
        </div>

        <div style="display:flex; width:100%; flex-direction:column;">
          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <p class="step-level">
              Step 2 of 6
            </p>
          </div>

          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <v-progress-linear
              v-if="
                input.name &&
                  input.logo &&
                  input.opening_hour &&
                  input.closing_hour &&
                  input.address &&
                  input.email &&
                  input.second_address &&
                  input.phone_number &&
                  input.second_phone_number &&
                  input.website_url
              "
              height="10"
              :value="Math.round((2 / 6) * 100)"
              striped
            >
              {{ Math.round((2 / 6) * 100) }}% completion
            </v-progress-linear>

            <v-progress-linear
              v-else
              height="10"
              :value="Math.round((1 / 6) * 100)"
              striped
            >
              {{ Math.round((1 / 6) * 100) }}% completion
            </v-progress-linear>
          </div>
        </div>
      </div>

      <div style="display:flex; width:50%; margin:auto;">
        <p class="text-input" style="display:flex; justify-content:center;">
          Set Up Your Company Profile
        </p>
      </div>

      <div style="display:flex; width:40%; margin:auto; padding-top:20px;">
        <p class="note-text">
          Information inputted here will show up in every of your correspondence
          sent, and on all your printed documents e.g. invoice quotes, contracts
          etc.
        </p>
      </div>

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

        <div style="display:flex; justify-content:center;">
          <div
            style="display:flex; justify-content:flex-start; padding-top:4%; padding-right:70%; align-item:center;"
          >
            <v-btn @click="onPrevStep">
              Previous
            </v-btn>
          </div>

          <div
            style="display:flex; justify-content:flex-end; padding-top:4%; align-item:center"
          >
            <v-btn @click="onNextStep">
              Next
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mdi-arrow-left-thick } from '@mdi/js'
import validations from "../../lib/validations";
import axios from 'axios'

export default {
  name: "App",

  props: ["step2"],

  data() {
    return {
      rules: [
        (value) =>
          value &&
          value.size > 3000000 &&
          "Avatar size should be less than 3 MB!",
      ],
      e1: 3,
      loading: false,
      initialState: {
        name: "",
        // logo: "",
        opening_hour: "",
        closing_hour: "",
        address: "",
        second_address: "",
        phone_number: "",
        second_phone_number: "",
        website_url: "",
        email: "",
      },
      messages: {
        ...this.initialState,
        success: "",
        failure: "",
      },
      input: { ...this.initialState },
    };
  },

  methods: {
    onNextStep() {
      this.e1 = 4;
      this.$emit("onStep2", this.e1);
    },

    onPrevStep() {
      this.e1 = 2;
      this.$emit("onStep2", this.e1);
    },

    clearError() {
      this.input = { ...this.initialState };
      this.messages = { ...this.initialState, success: "", failure: "" };
    },

    validateField(e) {
      if (e.target.name === "name") {
        const validate = validations(
          this.input.name,
          "Company Name",
          true,
          "name"
        );
        if (validate.status) {
          this.messages = {
            ...this.messages,
            name: validate.message,
            success: "",
            failure: "",
          };
        } else {
          this.messages = {
            ...this.messages,
            name: "",
            success: "",
            failure: "",
          };
        }
      }

      if (e.target.name === "address") {
        const validate = validations(this.input.address, "Company Address");
        if (validate.status) {
          this.messages = {
            ...this.messages,
            address: validate.message,
            success: "",
            failure: "",
          };
        } else {
          this.messages = {
            ...this.messages,
            address: "",
            success: "",
            failure: "",
          };
        }
      }

      if (e.target.name === "email") {
        const validate = validations(
          this.input.email,
          "Company Email",
          true,
          "email"
        );
        if (validate.status) {
          this.messages = {
            ...this.messages,
            email: validate.message,
            success: "",
            failure: "",
          };
        } else {
          this.messages = {
            ...this.messages,
            email: "",
            success: "",
            failure: "",
          };
        }
      }

      if (e.target.name === "phone_number") {
        const validate = validations(
          this.input.phone_number,
          "Company Phone Number",
          true,
          "digits"
        );
        if (validate.status) {
          this.messages = {
            ...this.messages,
            phone_number: validate.message,
            success: "",
            failure: "",
          };
        } else {
          this.messages = {
            ...this.messages,
            phone_number: "",
            success: "",
            failure: "",
          };
        }
      }

      // if (e.target.name === 'website_url') {
      //   const validate = validations(this.input.website_url, 'Company Website');
      //   if (validate.status) {
      //     this.messages = { ...this.messages, name: validate.message, success: '', failure: '' }
      //   } else {
      //     this.messages = { ...this.messages, name: validate.message, success: '', failure: '' }
      //   }
      // }
    },

    async handleSubmit(event) {
      event.preventDefault();

      let isValid = true;

      // if (isValid) {
      //   const validate = validations(input.first_name, 'First Name');
      //   if (validate.status) {
      //     setMessages({ ...messages, first_name: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid) {
      //   const validate = validations(input.last_name, 'Last Name');
      //   if (validate.status) {
      //     setMessages({ ...messages, last_name: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid) {
      //   const validate = validations(input.email, 'Email', true, 'email');
      //   if (validate.status) {
      //     setMessages({ ...messages, email: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid && input.phone_number) {
      //   const validate = validations(input.phone_number, 'Phone Number', true, 'digits');
      //   if (validate.status) {
      //     setMessages({ ...messages, phone_number: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid) {
      //   const validate = validations(input.password, 'Password', true, 'password');
      //   if (validate.status) {
      //     setMessages({ ...messages, password: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid) {
      //   const validate = validations(input.confirm_password,
      //     'Password Confirmation', true, 'compare', input.password);
      //   if (validate.status) {
      //     setMessages({ ...messages, confirm_password: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid) {
      //   const validate = validations(input.role_name, 'Role Name');
      //   if (validate.status) {
      //     setMessages({ ...messages, role_name: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid) {
      //   const validate = validations(input.role_id, 'Role Id');
      //   if (validate.status) {
      //     setMessages({ ...messages, role_id: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid) {
      //   const validate = validations(input.staff_id, 'Staff Id');
      //   if (validate.status) {
      //     setMessages({ ...messages, staff_id: validate.message });
      //     isValid = false;
      //   }
      // }

      // if (isValid) {
      //   const validate = validations(input.department, 'Department');
      //   if (validate.status) {
      //     setMessages({ ...messages, department: validate.message });
      //     isValid = false;
      //   }
      // }

      const body = {
        name: this.input.name,
        opening_hour: this.input.opening_hour,
        closing_hour: this.input.closing_hour,
        address: this.input.address,
        address2: this.input.second_address,
        phone1: this.input.phone_number,
        phone2: this.input.second_phone_number,
        website: this.input.website_url,
        email: this.input.email,
      };
      // console.log(body)
      const url = `http://opsmanager.local/api/company`;
      // const token = isAuthenticated().token;
      const token = `eeyJpdiI6IkJad1J2d01VRTNhbEtvSlArN0k5dnc9PSIsInZhbHVlIjoibDJrMUh0K3dLRng3VWY0eG9oMEY3RCtiSFo1UjN1dGR3RVdTOWF
      xSEo3RVRqU2g5SlJTaWViR0Z4REllaWNjY01GMzNnVjkzXC8wMVwva3NpRGpweFZcLzVHenQrdFZjNDlIZFNPSlIwV1wvTlwvVkF5Wmd2c2FLVHVoRmMre
      TNBTzN6VyIsIm1hYyI6IjJiZTNkYWZlODk2OGUwYmFhNzUxMTM2ZmFlNjQxMTQ5ZjE0MjFhNzdhYmEwYWUxMjFjMDE0ZjgzNWYyNjY2ZTgifQ%3D%3D`

      if (isValid) {
        try {
          const response = await axios.post(url, body, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data)

          // const router = useRouter()

          // if (response.data.success === true) {
          // router.push('/verifyemail')
          this.loading =false
          this.onNextStep()

          // setMessages({ ...messages, success: response.data.response_message });
          // setInput(initialState);
          // setOpen(false);

          // enqueueSnackbar(`${response.data.response_message}`, {
          //   variant: "success",
          // });
          // }
        } catch (e) {
          console.log(e);

          // setLoading(false);

          if (e.response) {
            if (e.response.status >= 500) {
              console.log(e)
          //     setMessages({
          //       ...messages,
          //       failure: `We are sorry. We can't process your 
          // request at the moment, please try again later`,
          //     });

              // enqueueSnackbar(
              //   "We are sorry. We can't process your request at the moment, please try again later",
              //   {
              //     variant: "error",
              //   }
              // );
            } else {
              // setMessages({
              //   ...messages,
              //   failure: e.response.data.response_message,
              // });
              // enqueueSnackbar(
              //   `${e.response.data.response_message}. Try again`,
              //   {
              //     variant: "error",
              //   }
              // );
              console.log(e)
            }
          }
        }
      }
    },
  },
};
</script>

<style>
.text-input {
  font-size: 45px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.step-level {
  font-size: 21px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.text-style {
  font-size: 12.5px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.form-group {
  padding-top: 30px;
}

.note-text {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 28px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -0.03em;
}

.error-message-style {
  color: red;
  font-size: 15px;
  font-weight: bold;
  font-style: normal;
  /* margin-bottom: 0.5rem; */
  margin-top: -25px;
  /* background-color: #ffffff; */
  border-radius: 2px;
  /* padding: 5px; */
}
</style>
