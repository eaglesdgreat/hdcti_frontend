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
            <p class="step-level4">
              Step 6 of 8
            </p>
          </div>

          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <v-progress-linear
              v-if="desserts"
              height="10"
              :value="Math.round((4 / 4) * 100)"
              striped
            >
              {{ Math.round((4 / 4) * 100) }}% completion
            </v-progress-linear>

            <v-progress-linear
              v-else
              height="10"
              :value="Math.round((3 / 4) * 100)"
              striped
            >
              {{ Math.round((3 / 4) * 100) }}% completion
            </v-progress-linear>
          </div>
        </div>
      </div>

      <div style="display:flex; padding-top:40px">
        <p class="text-input-fn12">
          EMPLOYEE'S INFORMATION
        </p>
      </div>

      <div
        style="display:flex; width:100%; margin:auto; justify-content:center; padding-bottom: 40px; padding-top:30px;"
      >
        <div class="search-box6">
          <v-form class="form-group-fn10">
            <v-container>
              <!-- <v-row v-for="(item, i) in lists" :key="i"> -->
              <v-row>
                <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                  <div style="display:flex; justify-content:flex-start;">
                    <p class="style-fn12">Select Name:</p>
                  </div>

                  <v-combobox
                    v-model="name"
                    :items="items"
                    :search-input.sync="search_name"
                    outlined
                    dense
                    placeholder="Select Name"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >No results matching
                            {{ search_name }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                  <div style="display:flex; justify-content:flex-start;">
                    <p class="style-fn12">Select Email:</p>
                  </div>
                  <v-combobox
                    v-model="email"
                    :items="items"
                    :search-input.sync="search_email"
                    outlined
                    dense
                    placeholder="Select Email"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >No results matching
                            {{ search_email }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                  <div style="display:flex; justify-content:flex-start;">
                    <p class="style-fn12">Select Business Unit:</p>
                  </div>
                  <v-combobox
                    v-model="business_unit"
                    :items="items"
                    :search-input.sync="search_business_unit"
                    outlined
                    dense
                    placeholder="Select Business Unit"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >No results matching
                            {{ search_business_unit }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                  <div style="display:flex; justify-content:flex-start;">
                    <p class="style-fn12">Select Department:</p>
                  </div>
                  <v-combobox
                    v-model="department"
                    :items="items"
                    :search-input.sync="search_department"
                    outlined
                    dense
                    placeholder="Select Department"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >No results matching
                            {{ search_department }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                  <div style="display:flex; justify-content:flex-start;">
                    <p class="style-fn12">Select Job Title:</p>
                  </div>
                  <v-combobox
                    v-model="job_title"
                    :items="items"
                    :search-input.sync="search_job_title"
                    outlined
                    dense
                    placeholder="Select Job Title"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >No results matching
                            {{ search_job_title }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                  <div style="display:flex; justify-content:flex-start;">
                    <p class="style-fn12">Select Employee's Type:</p>
                  </div>
                  <v-combobox
                    v-model="employee_type"
                    :items="items"
                    :search-input.sync="search_employee_type"
                    outlined
                    dense
                    placeholder="Select Employees Type"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >No results matching
                            {{ search_employee_type }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                  <div style="display:flex; justify-content:flex-start;">
                    <p class="style-fn12">Select Leave Type:</p>
                  </div>
                  <v-combobox
                    v-model="leave_type"
                    :items="items"
                    :search-input.sync="search_leave_type"
                    outlined
                    dense
                    placeholder="Select Leave Type"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >No results matching
                            {{ search_leave_type }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12" sm="6" md="4" lg="4" xl="4">
                  <div style="display:flex; justify-content:flex-start;">
                    <p class="style-fn12">Select Shift:</p>
                  </div>
                  <v-combobox
                    v-model="shift"
                    :items="items"
                    :search-input.sync="search_shift"
                    outlined
                    dense
                    placeholder="Select Shift"
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title
                            >No results matching
                            {{ search_shift }}</v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-combobox>
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <div style="display:flex; padding:10px; width:100%;">
            <div style="display:flex; justify-content:flex-start;">
              <v-btn>
                search
              </v-btn>
            </div>

            <div
              style="display:flex; justify-content:flex-end; width:inherit; align-item:flex-end"
            >
              <v-btn @click="openMyDialog">
                batch process
              </v-btn>
            </div>

            <vs-dialog overflow-hidden not-close width="80%" v-model="dialog">
              <template #header>
                <div
                  class="dialog-header"
                  style="display:flex; justify-content:center; background-color:#00b0e4; width:100%"
                >
                  Batch Process
                </div>
              </template>

              <div class="con-content" style="width:80%; padding:20px">
                <div style="display:flex; justify-content:flex-start;">
                  <p class="style-fn12" style="color:#00b0e4;">
                    Select Location:
                  </p>
                </div>

                <vs-select
                  placeholder="Select Location"
                  color="#00b0e4"
                  state="#00b0e4"
                  v-model="batch_select"
                >
                  <vs-option label="Vuesax" value="1">
                    Vuesax
                  </vs-option>
                  <vs-option label="Vue" value="2">
                    Vue
                  </vs-option>
                  <vs-option label="Javascript" value="3">
                    Javascript
                  </vs-option>
                  <vs-option label="Sass" value="4">
                    Sass
                  </vs-option>
                  <vs-option label="Typescript" value="5">
                    Typescript
                  </vs-option>
                  <vs-option label="Webpack" value="6">
                    Webpack
                  </vs-option>
                  <vs-option label="Nodejs" value="7">
                    Nodejs
                  </vs-option>
                </vs-select>
              </div>

              <div class="con-content" style="padding:20px; width:100%;">
                <div style="display:flex; justify-content:flex-start;">
                  <p class="style-fn12" style="color:#00b0e4;">
                    List of all Locations:
                  </p>
                </div>

                <vs-select
                  placeholder="List of all Locations"
                  color="#00b0e4"
                  v-model="batch_select"
                  width="80%"
                >
                  <vs-option label="Vuesax" value="1">
                    Vuesax
                  </vs-option>
                  <vs-option label="Vue" value="2">
                    Vue
                  </vs-option>
                  <vs-option label="Javascript" value="3">
                    Javascript
                  </vs-option>
                  <vs-option label="Sass" value="4">
                    Sass
                  </vs-option>
                  <vs-option label="Typescript" value="5">
                    Typescript
                  </vs-option>
                  <vs-option label="Webpack" value="6">
                    Webpack
                  </vs-option>
                  <vs-option label="Nodejs" value="7">
                    Nodejs
                  </vs-option>
                </vs-select>

                <div style="display:flex; padding-top:20px;">
                  <div>
                    <vs-button flat :active="dialog === true" @click="dialog = false">
                      SUBMIT
                    </vs-button>
                  </div>

                  <div>
                    <vs-button danger flat :active="dialog === true" @click="dialog = false">
                      CANCEL
                    </vs-button>
                  </div>
                </div>
              </div>
            </vs-dialog>
          </div>
        </div>
      </div>

      <div
        style="display:flex; width:100%; margin:auto; justify-content:center; padding-top:20px;"
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
            :items="desserts"
            item-key="email"
            :calculate-widths="true"
            show-select
            :value="selected"
            class="elevation-1"
            :disable-sort="true"
            :options="options"
          >
          </v-data-table>
        </v-card>
      </div>

      <div>
        <div style="display:flex; justify-content:center;">
          <div
            style="display:flex; justify-content:flex-start; padding-top:4%; padding-right:70%; align-item:center;"
          >
            <v-btn @click="onPrevStep">
              Previous
            </v-btn>
          </div>

          <!-- <div
            style="display:flex; justify-content:flex-end; padding-top:4%; align-item:center"
          >
            <v-btn @click="onNextStep">
              Next
            </v-btn>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  // name: "App",

  props: ["step_fn8"],

  mounted() {
    this.getProjects();
  },

  // components: {
  //   mdiPlus,
  // },

  data() {
    return {
      e1: 12,
      search_name: "",
      search_email: "",
      search_business_unit: "",
      search_department: "",
      search_job_title: "",
      search_employee_type: "",
      search_leave_type: "",
      search_shift: "",
      dialog: false,
      search: "",
      select: [],
      selected: [],
      options: {
        page: 50,
        itemsPerPage: 10,
      },
      headers: [
        {
          text: "FirstName",
          align: "start",
          // filterable: false,
          value: "name",
        },
        { text: "Last Name", value: "last_name" },
        { text: "Email", value: "email" },
        { text: "Business Unit", value: "unit" },
        { text: "DEPT", value: "department" },
        { text: "Job Title", value: "job_title" },
        { text: "EMPL Type", value: "type" },
        { text: "Report To", value: "report" },
        { text: "Location", value: "location" },
      ],
      desserts: [
        {
          name: "Micheal",
          last_name: "MichealMicheal",
          email: "micheals@example.com",
          unit: "Sole proprietorship",
          department: "Medical",
          job_title: "Medical Doctor",
          type: "Contract",
          report: "Vacation Leave",
          location: "Morning",
        },
        {
          name: "Micheal",
          last_name: "Fills",
          email: "michealss@example.com",
          unit: "Partnership",
          department: "Finance",
          job_title: "Finance Analyst",
          type: "Contract",
          report: "School Leave",
          location: "Evening",
        },
        {
          name: "Micheal",
          last_name: "Fills",
          email: "michealsss@example.com",
          unit: "Sole proprietorship",
          department: "Sales",
          job_title: "Sales Manager",
          type: "Part Time",
          report: "Sick Leave",
          location: "Morning",
        },
        {
          name: "Micheal",
          last_name: "Fills",
          email: "super95@securishieldtestserver.com",
          unit: "Sole proprietorship",
          department: "Technology",
          job_title: "Software Developer",
          type: "Full Time",
          report: "Travel Leave",
          location: "Evening",
        },
        {
          name: "Micheal",
          last_name: "Fills",
          email: "michealssss@example.com",
          unit: "Partnership",
          department: "Accounting",
          job_title: "Accountant",
          type: "Full Time",
          report: "Vacation Leave",
          location: "Morning",
        },
      ],
      name: "",
      email: "",
      business_unit: "",
      department: "",
      job_title: "",
      employee_type: "",
      leave_type: "",
      shift: "",
      items: [
        "Programming",
        "Design",
        "Vue",
        "Vuetify",
        "Stride",
        "ERP",
        "Peace",
      ],
      search_list: [],
      batch_select: "",
      batch_process_list: [],
    };
  },

  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    },
  },

  methods: {
    onNextStep() {
      this.e1 = 13;
      this.$emit("onStepFn12", this.e1);
    },

    onPrevStep() {
      this.e1 = 11;
      this.$emit("onStepFn12", this.e1);
    },

    openMyDialog() {
      this.dialog = !this.dialog;
      this.businessUnitChange(); // emit the event to the bus
    },

    businessUnitChange() {
      const type = this.desserts.filter((list) => list.shift !== "");
      console.log(type);

      if (type.length === this.desserts.length) {
        this.search_list.push(...type);
      }

      return type;
    },

    getProjects(url = "http://opsmanager.local/api/user") {
      // this.show = true;
      this.tableData.draw++;
      axios
        .get(url, { params: this.tableData })
        .then((response) => {
          //
          // this.show = false;
          let data = response.data.data;
          this.batch_process_list = data.data;
          // console.log(data.data);
          this.configPagination(data); //Update the pagination
        })
        .catch((errors) => {
          // this.show = false;
          console.log(errors);
        });
    },
  },
};
</script>

<style scoped>
.text-input-fn12 {
  font-size: 20px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  text-align: center !important;
  letter-spacing: -0.03em !important;
}

.step-level-fn7 {
  font-size: 21px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.style-fn12 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #000000;
  line-height: 15px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.dialog-header {
  font-size: 30px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  letter-spacing: -0.03em;
  display: flex;
  justify-content: center;
  background-color: #00b0e4;
  width: 100%;
  padding: 10px;
}

.form-group-fn12 {
  /* padding-top: 30px; */
  width: 100%;
}

.edit-view-4 {
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: whitesmoke;
  display: flex;
  width: 52%;
  justify-content: space-around;
  margin: auto;
  padding: 30px;
  flex-direction: column;
}

.butn {
  font-size: 50px;
  color: #ffffff;
  border: none;
  outline: none;
}

.icon-color {
  fill: white;
}

.search-box6 {
  background-color: #ffffff;
  display: flex;
  width: inherit;
  border-radius: 5px;
  padding: 30px;
  flex-direction: column;
}
</style>
