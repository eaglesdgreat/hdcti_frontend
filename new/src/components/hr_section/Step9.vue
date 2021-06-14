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
              Step 3 of 5
            </p>
          </div>

          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <v-progress-linear
              v-if="time_sheet"
              height="10"
              :value="Math.round((3 / 5) * 100)"
              striped
            >
              {{ Math.round((3 / 5) * 100) }}% completion
            </v-progress-linear>

            <v-progress-linear
              v-else
              height="10"
              :value="Math.round((2 / 5) * 100)"
              striped
            >
              {{ Math.round((2 / 5) * 100) }}% completion
            </v-progress-linear>
          </div>
        </div>
      </div>

      <div style="display:flex; width:30%; margin:auto;">
        <p class="text-1" style="display:flex; justify-content:center;">
          Timesheet Settings
        </p>
      </div>

      <div style="display:flex; width:45%; margin:auto; padding-top:20px;">
        <p class="note-1">
          This settings, when toggled on allows you to approve timesheet with
          incomplete hours
        </p>
      </div>

      <div>
        <div style="display:flex; justify-content:center; padding-top:30px;">
          <!-- <div style="display:flex; justify-content:center; width:42%;">
            <p class="style-1">TIMESHEET SETTINGS:</p>
          </div> -->
          <p class="style-1" style="padding-right:30px;">TIMESHEET SETTINGS:</p>
          
          <vs-switch v-model="time_sheet">
            <template #off>
              Off
            </template>
            <template #on>
              On
            </template>
          </vs-switch>
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

export default {
  name: "App",

  props: ["step_hr3"],

  data() {
    return {
      e1: 3,
      time_sheet: "",
    };
  },

  methods: {
    onNextStep() {
      this.e1 = 4;
      this.$emit("onStepHr3", this.e1);
    },
    onPrevStep() {
      this.e1 = 2;
      this.$emit("onStepHr3", this.e1);
    },
  },
};
</script>

<style>
.text-1 {
  font-size: 41px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  text-align: center !important;
  letter-spacing: -0.03em !important;
}

.step-1 {
  font-size: 21px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.style-1 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

.note-1 {
  font-size: 15px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 28px;
  font-weight: 500;
  text-align: center;
  letter-spacing: -0.03em;
}

.form-1 {
  padding-top: 30px;
  width: 37%;
}

a {
  text-decoration: none;
}
</style>
