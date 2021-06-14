<template>
  <div style="">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <!-- <v-stepper-step :complete="e1 > 7" step="7">
          <p class="stp">Employment Status</p>
        </v-stepper-step> -->

        <!-- <v-divider color="white"></v-divider> -->

        <!-- <v-stepper-step :complete="e1 > 8" step="8">
          <p class="stp">Termination Status</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider> -->

        <!-- <v-stepper-step :complete="e1 > 9" step="9">
          <p class="stp">Leave Type</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider> -->

        <!-- <v-stepper-step :complete="e1 > 10" step="10">
          <p class="stp">Academic Levels</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider> -->

        <v-stepper-step :complete="e1 > 1" step="1">
          <p class="stp">Employment Type</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <!-- <v-stepper-step :complete="e1 > 12" step="12">
          <p class="stp">Incident Type</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider> -->

        <v-stepper-step :complete="e1 > 2" step="2">
          <p class="stp">Job Title</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <!-- <v-stepper-step :complete="e1 > 3" step="3">
          <p class="stp">Timecodes</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider> -->

        <v-stepper-step :complete="e1 > 3" step="3">
          <p class="stp">Timesheet Settings</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4">
          <p class="stp">Benefit Type</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <!-- <v-stepper-step :complete="e1 > 5" step="5">
          <p class="stp">Shift</p>
        </v-stepper-step> -->

        <v-divider color="white"></v-divider>

        <v-stepper-step :complete="e1 === 5" step="5">
          <p class="stp">Holiday</p>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <Step1 @onStepHr1="onStepHr1" />
        </v-stepper-content>

        <v-stepper-content step="2">
          <Step2 @onStepHr2="onStepHr2" />
        </v-stepper-content>

        <v-stepper-content step="3">
          <Step3 @onStepHr3="onStepHr3" />
        </v-stepper-content>

        <v-stepper-content step="4">
          <Step4 @onStepHr4="onStepHr4" />
        </v-stepper-content>

        <v-stepper-content step="5">
          <Step5 @onStepHr5="onStepHr5" />
        </v-stepper-content>

        <!-- <v-stepper-content step="6">
          <Step6 @onStepHr6="onStepHr6" />
        </v-stepper-content> -->

        <!-- <v-stepper-content step="7">
          <Step7 @onStepHr7="onStepHr7" />
        </v-stepper-content> -->
<!-- 
        <v-stepper-content step="14">
          <Step8 @onStepHr8="onStepHr8" />
        </v-stepper-content>

        <v-stepper-content step="15">
          <Step9 @onStepHr9="onStepHr9" />
        </v-stepper-content>

        <v-stepper-content step="16">
          <Step10 @onStepHr10="onStepHr10" />
        </v-stepper-content>

        <v-stepper-content step="17">
          <Step11 @onStepHr11="onStepHr11" />
        </v-stepper-content>

        <v-stepper-content step="18">
          <Step12 @onStepHr12="onStepHr12" />
        </v-stepper-content> -->
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
// import Step1 from "./hr_section/Step1";
// import Step2 from "./hr_section/Step2";
// import Step3 from "./hr_section/Step3";
// import Step4 from "./hr_section/Step4";
import Step1 from "./hr_section/Step5";
// import Step6 from "./hr_section/Step6";
import Step2 from "./hr_section/Step7";
// import Step3 from "./hr_section/Step8";
import Step3 from "./hr_section/Step9";
import Step4 from "./hr_section/Step10";
// import Step5 from "./hr_section/Step11";
import Step5 from "./hr_section/Step12";


export default {
  name: "hr_section",

  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    // Step6,
    // Step7,
    // Step8,
    // Step9,
    // Step10,
    // Step11,
    // Step12,
  },
  data() {
    return {
      e1: 1,
    };
  },

  methods: {
    onStepHr1(value) {
      this.e1 = value;
    },
    onStepHr2(value) {
      this.e1 = value;
    },
    onStepHr3(value) {
      this.e1 = value;
    },
    onStepHr4(value) {
      this.e1 = value;
    },
    onStepHr5(value) {
      this.e1 = value;
    },
    // onStepHr6(value) {
    //   this.e1 = value;
    // },
    // onStepHr7(value) {
    //   this.e1 = value;
    // },
    // onStepHr8(value) {
    //   this.e1 = value;
    // },
    // onStepHr9(value) {
    //   this.e1 = value;
    // },
    // onStepHr10(value) {
    //   this.e1 = value;
    // },
    // onStepHr11(value) {
    //   this.e1 = value;
    // },
    // onStepHr12(value) {
    //   this.e1 = value;
    // },
  },
};
</script>

<style scoped>
.stp {
  font-size: 14px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
}
</style>
