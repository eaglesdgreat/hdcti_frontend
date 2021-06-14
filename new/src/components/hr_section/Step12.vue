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
            <p class="step-1">
              Step 5 of 5
            </p>
          </div>

          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <v-progress-linear
              v-if="holiday_name && holiday_day"
              height="10"
              :value="Math.round((5 / 5) * 100)"
              striped
            >
              {{ Math.round((5 / 5) * 100) }}% completion
            </v-progress-linear>

            <v-progress-linear
              v-else
              height="10"
              :value="Math.round((4 / 5) * 100)"
              striped
            >
              {{ Math.round((4 / 5) * 100) }}% completion
            </v-progress-linear>
          </div>
        </div>
      </div>

      <div style="display:flex; width:45%; margin:auto;">
        <p class="text-5" style="display:flex; justify-content:center;">
          Set-Up Your Holiday Schedules
        </p>
      </div>

      <div style="display:flex; width:60%; margin:auto; padding-top:20px;">
        <p class="note-5">
          Stride allows you to key in your holiday schedule for the year and
          excludes this specified date from your normal work days
        </p>
      </div>

      <div>
        <div>
          <div style="display:flex; justify-content:center;">
            <v-form class="form-5">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                    <div
                      style="display:flex; justify-content:center; width:45%;"
                    >
                      <p class="style-5">NAME OF HOLIDAY:</p>
                    </div>

                    <v-text-field
                      v-model="holiday_name"
                      placeholder="Enter the name of the Holiday"
                      outlined
                      height="45"
                      type="text"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                    <div
                      style="display:flex; justify-content:center; width:40%;"
                    >
                      <p class="style-5">HOLIDAY'S DATE:</p>
                    </div>

                    <v-text-field
                      v-model="holiday_day"
                      placeholder="Select the holiday date"
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
          <div style="display:flex; justify-content:center; margin-top:-60px;">
            <v-form class="form-5">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field
                      v-model="item.holiday_name"
                      outlined
                      height="45"
                      type="text"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                    <v-text-field
                      v-model="item.holiday_day"
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

          <!-- <div class="edit-view-5">
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
            style="display:flex; width:72%; margin:auto; justify-content:center; padding-top:20px;"
          >
            <v-card style="width:inherit;">
              <v-card-title style="width:40%;">
                <div style="display:flex; width:40%;">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
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
            <v-btn>
              <router-link to="/finance">Continue</router-link>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mdiPlus, mdiClose, mdiPencil, mdiDeleteOutline } from "@mdi/js";
import axios from 'axios'

export default {
  name: "App",

  props: ["step_hr5"],

  mounted() {
    this.getProjects();
  },

  data() {
    return {
      e1: 5,
      holiday_name: "",
      holiday_day: "",
      addingItem: [],
      search: '',
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
      holiday_lists: [],
      headers: [
        {
          text: "S/N",
          align: "start",
          // filterable: false,
          value: "index",
        },
        { text: "Name", value: "name" },
        { text: "Date", value: "date" },
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
      this.e1 = 6;
      this.$emit("onStepHr5", this.e1);
    },
    onPrevStep() {
      this.e1 = 4;
      this.$emit("onStepHr5", this.e1);
    },

    handleItem() {
      let items = {
        holiday_name: "",
        holiday_day: "",
      };
      this.addingItem.push(items);
    },

    handleItemRemove(index) {
      this.addingItem.splice(index, 1);
    },

    allowEdit(num) {
      this.editUnit = num;
    },

    editBusinessUnit() {
      this.editUnit = !this.editUnit;
      this.edit = "";
    },

    deleteBusinessUnit() {
      console.log("delete");
    },

    getProjects(url = "http://opsmanager.local/api/holidays") {
      // this.show = true;
      this.tableData.draw++;
      axios
        .get(url, { params: this.tableData })
        .then((response) => {
          //
          // this.show = false;
          let data = response.data.data;
          this.holiday_lists = data.data;
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

      const body = {
        name: this.holiday_name,
        date: this.holiday_day,
      };
      // console.log(body)
      const url = `http://opsmanager.local/api/holidays`;

      if (isValid) {
        try {
          const response = await axios.post(url, body);
          console.log(response.data)

          this.loading =false
          this.onNextStep()
        } catch (e) {
          console.log(e);
        }
      }
    },

    async sendEditData(){
      let isValid = true;

      const body = {
        name: this.edit.name,
        date: this.edit.date
      };

      if(isValid) {
        try {
          const update =  await axios.post('/api/holidays/'+this.editbank.id, body)
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
.text-5 {
  font-size: 41px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  text-align: center !important;
  letter-spacing: -0.03em !important;
}

.step-5 {
  font-size: 21px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.style-5 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.note-5 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 28px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -0.03em;
}

.form-5 {
  padding-top: 30px;
  width: 52%;
}

.edit-view-5 {
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: whitesmoke;
  display: flex;
  width: 52%;
  /* justify-content: space-around; */
  /* margin: auto; */
  padding: 30px;
  flex-direction: column;
}

a {
  text-decoration: none;
}
</style>
