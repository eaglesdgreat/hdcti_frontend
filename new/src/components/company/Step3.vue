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
            <p class="step-level2">
              Step 3 of 6
            </p>
          </div>

          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <v-progress-linear
              v-if="start_date && end_date"
              height="10"
              :value="Math.round((3 / 6) * 100)"
              striped
            >
              {{ Math.round((3 / 6) * 100) }}% completion
            </v-progress-linear>

            <v-progress-linear
              v-else
              height="10"
              :value="Math.round((2 / 6) * 100)"
              striped
            >
              {{ Math.round((2 / 6) * 100) }}% completion
            </v-progress-linear>
          </div>
        </div>
      </div>

      <div style="display:flex; width:40%; margin:auto;">
        <p class="text-input2" style="display:flex; justify-content:center;">
          Set-up your operating year
        </p>
      </div>

      <div style="display:flex; width:60%; margin:auto; padding-top:20px;">
        <p class="note-text2">
          Operating year allows you set up your company's operating year window,
          which guides your holiday, timesheet, time-off etc.
        </p>
      </div>

      <div>
        <div>
          <div style="display:flex; justify-content:center;">
            <v-form class="form-group2">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                    <div
                      style="display:flex; justify-content:center; width:30%;"
                    >
                      <p class="style-fn5">START YEAR:</p>
                    </div>

                    <v-text-field
                      v-model="start_date"
                      placeholder="Enter the start year"
                      outlined
                      height="45"
                      type="date"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                    <div
                      style="display:flex; justify-content:center; width:27%;"
                    >
                      <p class="style-2">END YEAR:</p>
                    </div>

                    <v-text-field
                      v-model="end_date"
                      placeholder="Enter the end year"
                      outlined
                      height="45"
                      type="date"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

            <div
              style="display:flex; justify-content:flex-end; width:2%; padding-left:30px;"
            >
              <v-icon class="icon-color" medium @click="handleItem()">
                <!-- v-if="addingItem.length === 0" -->
                {{ icons.mdiPlus }}
              </v-icon>
            </div>
          </div>
        </div>

        <div v-for="(item, i) in addingItem" :key="i">
          <div style="display:flex; justify-content:center; margin-top:-70px;">
            <v-form class="form-group2">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field
                      v-model="item.start_date"
                      outlined
                      height="45"
                      type="date"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field
                      v-model="item.end_date"
                      outlined
                      height="45"
                      type="date"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

            <div
              style="display:flex; justify-content:flex-end; width:2%; padding-left:30px;"
            >
              <v-icon medium @click="handleItemRemove(i)">
                {{ icons.mdiClose }}
              </v-icon>
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:center;">
          <div style="width:4%;"></div>
          <div style="width:4%;"></div>

          <!-- <div class="edit-view2">
            <div
              style="display:flex; justify-content:center; padding-bottom:30px;"
            >
              <div
                v-if="editUnit === 1"
                style="display:flex; width:80%; padding-right:30px;"
              >
                <v-text-field
                  v-model="edit"
                  outlined
                  type="text"
                ></v-text-field>
              </div>

              <div v-else style="display:flex; width:80%;">
                <span
                  style="background-color:#ffd700; padding:5px; border-radius:5px"
                >
                  <p
                    style="font-size:20px; font-weight:700; font-family:'Source Sans Pro';"
                  >
                    Partnership
                  </p>
                </span>
              </div>

              <div v-if="editUnit === 1" style="display:flex; width:20%;;">
                <v-btn @click="editBusinessUnit">
                  save
                </v-btn>
              </div>

              <div v-else style="display:flex; width:20%;">
                <div
                  style="display:flex; border-radius:3px; background-color:red;"
                >
                  <v-icon medium @click="deleteBusinessUnit">
                    {{ icons.mdiDeleteOutline }}
                  </v-icon>
                </div>

                <div
                  style="display:flex; border-radius:3px; background-color:blue; margin-left:40px"
                >
                  <v-icon medium @click="allowEdit((num = 1))">
                    {{ icons.mdiPencil }}
                  </v-icon>
                </div>
              </div>
            </div>

            <div
              style="display:flex; justify-content:center; padding-bottom:30px;"
            >
              <div
                v-if="editUnit === 2"
                style="display:flex; width:80%; padding-right:30px;"
              >
                <v-text-field
                  v-model="edit"
                  outlined
                  type="text"
                ></v-text-field>
              </div>

              <div v-else style="display:flex; width:80%;">
                <span
                  style="background-color:#ffd700; padding:5px; border-radius:5px"
                >
                  <p
                    style="font-size:20px; font-weight:700; font-family:'Source Sans Pro';"
                  >
                    Sole proprietorship
                  </p>
                </span>
              </div>

              <div v-if="editUnit === 2" style="display:flex; width:20%;;">
                <v-btn @click="editBusinessUnit">
                  save
                </v-btn>
              </div>

              <div v-else style="display:flex; width:20%;">
                <div
                  style="display:flex; border-radius:3px; background-color:red;"
                >
                  <v-icon medium @click="deleteBusinessUnit">
                    {{ icons.mdiDeleteOutline }}
                  </v-icon>
                </div>

                <div
                  style="display:flex; border-radius:3px; background-color:blue; margin-left:40px"
                >
                  <v-icon medium @click="allowEdit((num = 2))">
                    {{ icons.mdiPencil }}
                  </v-icon>
                </div>
              </div>
            </div>
          </div> -->

          <div
            style="display:flex; width:74%; margin:auto; justify-content:center; padding-top:20px;"
          >
            <v-card style="width:inherit;">
              <v-card-title style="width:40%;">
                <div style="display:flex; width:40%;">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    placeholder="Search"
                    single-line
                  ></v-text-field>
                </div>
              </v-card-title>

              <v-data-table
                v-model="selected"
                :headers="headers"
                item-key="email"
                :calculate-widths="true"
                class="elevation-1"
                :disable-sort="true"
              >
              </v-data-table>
            </v-card>
          </div>

          <div style="width:4%;"></div>
          <div style="width:4%;"></div>
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
import { mdiPlus, mdiClose, mdiPencil, mdiDeleteOutline } from "@mdi/js";
import axios from "axios";

export default {
  name: "App",

  props: ["step3"],

  mounted() {
    this.getProjects();
  },

  data() {
    return {
      e1: 4,
      start_date: "",
      end_date: "",
      addingItem: [],
      selected: [],
      search: "",
      icons: {
        mdiPlus,
        mdiClose,
        mdiPencil,
        mdiDeleteOutline,
      },
      editUnit: "",
      edit: {},
      tableData: {
        draw: 0,
        length: 5,
        search: "",
        column: 0,
        dir: "desc",
      },
      operating_years: [],
      headers: [
        {
          text: "S/N",
          align: "start",
          filterable: false,
          value: "index",
        },
        { text: "Start", value: "start" },
        { text: "End", value: "end" },
        { text: "Edit", value: "edit" },
        { text: "Delete", value: "delete" },
      ],
      pagination: {
        lastPage: "",
        currentPage: "",
        total: "",
        lastPageUrl: "",
        nextPageUrl: "",
        prevPageUrl: "",
        from: "",
        to: "",
      },
    };
  },

  methods: {
    onNextStep() {
      this.e1 = 5;
      this.$emit("onStep3", this.e1);
    },

    onPrevStep() {
      this.e1 = 3;
      this.$emit("onStep3", this.e1);
    },

    handleItem() {
      let items = {
        start_date: "",
        end_date: "",
      };
      this.addingItem.push(items);
    },

    handleItemRemove(index) {
      this.addingItem.splice(index, 1);
    },

    allowEdit(num) {
      this.editUnit = num;
    },

    deleteBusinessUnit() {
      console.log("delete");
    },

    getProjects(url = "http://opsmanager.local/api/all/carlendaryear") {
      // this.show = true;
      this.tableData.draw++;
      axios
        .get(url, { params: this.tableData })
        .then((response) => {
          //
          // this.show = false;
          let data = response.data.data;
          this.operating_years = data.data;
          // console.log(data.data);
          this.configPagination(data); //Update the pagination
        })
        .catch((errors) => {
          // this.show = false;
          console.log(errors);
        });
    },

    configPagination(data) {
      this.pagination.lastPage = data.last_page;
      this.pagination.currentPage = data.current_page;
      this.pagination.total = data.total;
      this.pagination.lastPageUrl = data.last_page_url;
      this.pagination.nextPageUrl = data.next_page_url;
      this.pagination.prevPageUrl = data.prev_page_url;
      this.pagination.from = data.from;
      this.pagination.to = data.to;
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
        start: this.start_date,
        end: this.end_date,
      };
      // console.log(body)
      const url = `http://opsmanager.local/api/carlendaryear`;
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

    async sendEditData(){
      let isValid = true;

      const body = {
        start: this.edit.start_date,
        end: this.edit.end_date
      };

      if(isValid) {
        try {
          const update =  await axios.post('/api/carlendaryear/'+this.operational_year.id, body)
          console.log(update)
        } catch(e) {
          console.log(e)
        }
      }
    }
  },
};
</script>

<style>
.text-input2 {
  font-size: 41px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  text-align: center !important;
  letter-spacing: -0.03em !important;
}

.step-level2 {
  font-size: 21px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.text-style2 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.note-text2 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 28px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -0.03em;
}

.edit-view2 {
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: whitesmoke;
  display: flex;
  width: 54%;
  /* justify-content: space-around; */
  /* margin: auto; */
  padding: 30px;
  flex-direction: column;
}

.form-group2 {
  padding-top: 30px;
  width: 54%;
}
</style>
