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
              Step 2 of 5
            </p>
          </div>

          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <v-progress-linear
              v-if="job_title"
              height="10"
              :value="Math.round((2 / 5) * 100)"
              striped
            >
              {{ Math.round((2 / 5) * 100) }}% completion
            </v-progress-linear>

            <v-progress-linear
              v-else
              height="10"
              :value="Math.round((1 / 5) * 100)"
              striped
            >
              {{ Math.round((1 / 5) * 100) }}% completion
            </v-progress-linear>
          </div>
        </div>
      </div>

      <div style="display:flex; width:30%; margin:auto;">
        <p class="text-2" style="display:flex; justify-content:center;">
          Set-Up Job Titles
        </p>
      </div>

      <div style="display:flex; width:45%; margin:auto; padding-top:20px;">
        <p class="note-2">
          Stride allows you to configure job titles that will be used to update
          employee's profile
        </p>
      </div>

      <div>
        <div>
          <div style="display:flex; justify-content:center;">
            <v-form class="form-2">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <div
                      style="display:flex; justify-content:center; width:15%;"
                    >
                      <p class="style-2">JOB TITLE:</p>
                    </div>

                    <v-text-field
                      v-model="job_title"
                      placeholder="Enter your Job title"
                      outlined
                      height="45"
                      type="text"
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
            <v-form class="form-2">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field
                      v-model="item.job_title"
                      outlined
                      height="45"
                      type="text"
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

          <div class="edit-view-2">
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

export default {
  name: "App",

  props: ["step_hr2"],

  data() {
    return {
      e1: 2,
      job_title: "",
      addingItem: [],
      icons: {
        mdiPlus,
        mdiClose,
        mdiPencil,
        mdiDeleteOutline,
      },
      editUnit: "",
      edit: "",
    };
  },

  methods: {
    onNextStep() {
      this.e1 = 3;
      this.$emit("onStepHr2", this.e1);
    },
    onPrevStep() {
      this.e1 = 1;
      this.$emit("onStepHr2", this.e1);
    },

    handleItem() {
      let items = {
        job_title: "",
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
  },
};
</script>

<style>
.text-2 {
  font-size: 41px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  text-align: center !important;
  letter-spacing: -0.03em !important;
}

.step-2 {
  font-size: 21px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.style-2 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.note-2 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 28px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -0.03em;
}

.edit-view-2 {
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: whitesmoke;
  display: flex;
  width: 50%;
  /* justify-content: space-around; */
  /* margin: auto; */
  padding: 30px;
  flex-direction: column;
}

.form-2 {
  padding-top: 30px;
  width: 50%;
}

a {
  text-decoration: none;
}
</style>
