<template>
  <div style="">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          <p class="stp">Banks Setting</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <!-- <v-stepper-step :complete="e1 > 2" step="2">
          <p class="stp">Currency</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider> -->

        <v-stepper-step :complete="e1 > 2" step="2">
          <p class="stp">Fiscal Yeare</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <!-- <v-stepper-step :complete="e1 > 4" step="4">
          <p class="stp">Pay Period</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider> -->

        <v-stepper-step :complete="e1 > 3" step="3">
          <p class="stp">Earnings</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4">
          <p class="stp">Deductions</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <v-stepper-step :complete="e1 > 5" step="5">
          <p class="stp">Upload File</p>
        </v-stepper-step>

        <v-divider color="white"></v-divider>

        <v-stepper-step :complete="e1 === 12" :step="6 || 7 || 8 || 9 || 10 || 11">
          <p class="stp">Batch Process</p>
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <Step1 @onStepFn1="onStepFn1" />
        </v-stepper-content>

        <v-stepper-content step="2">
          <Step2 @onStepFn2="onStepFn2" />
        </v-stepper-content>

        <v-stepper-content step="3">
          <Step3 @onStepFn3="onStepFn3" />
        </v-stepper-content>

        <v-stepper-content step="4">
          <Step4 @onStepFn4="onStepFn4" />
        </v-stepper-content>

        <v-stepper-content step="5">
          <Step5 @onStepFn5="onStepFn5" />
        </v-stepper-content>

        <v-stepper-content step="6">
          <Step6 @onStepFn6="onStepFn6" />
        </v-stepper-content>

        <v-stepper-content step="7">
          <Step7 @onStepFn7="onStepFn7" />
        </v-stepper-content>

        <v-stepper-content step="8">
          <Step8 @onStepFn8="onStepFn8" />
        </v-stepper-content>

        <v-stepper-content step="9">
          <Step9 @onStepFn9="onStepFn9" />
        </v-stepper-content>

        <v-stepper-content step="10">
          <Step10 @onStepFn10="onStepFn10" />
        </v-stepper-content>

        <v-stepper-content step="11">
          <Step11 @onStepFn11="onStepFn11" />
        </v-stepper-content>

        <v-stepper-content step="12">
          <Step12 @onStepFn12="onStepFn12" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import Step1 from "./finance/Step1";
// import Step2 from "./finance/Step2";
import Step2 from "./finance/Step3";
// import Step4 from "./finance/Step4";
import Step3 from "./finance/Step5";
import Step4 from "./finance/Step6";
import Step5 from "./finance/Step7";
import Step6 from "./batch_process/Step1";
import Step7 from "./batch_process/Step2";
import Step8 from "./batch_process/Step3";
import Step9 from "./batch_process/Step4";
import Step10 from "./batch_process/Step5";
import Step11 from "./batch_process/Step6";
import Step12 from "./batch_process/Step7";


export default {
  name: "finance_section",

  components: {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
    Step7,
    Step8,
    Step9,
    Step10,
    Step11,
    Step12,
  },
  data() {
    return {
      e1: 1,
    };
  },

  methods: {
    onStepFn1(value) {
      this.e1 = value;
    },
    onStepFn2(value) {
      this.e1 = value;
    },
    onStepFn3(value) {
      this.e1 = value;
    },
    onStepFn4(value) {
      this.e1 = value;
    },
    onStepFn5(value) {
      this.e1 = value;
    },
    onStepFn6(value) {
      this.e1 = value;
    },
    onStepFn7(value) {
      this.e1 = value;
    },
    onStepFn8(value) {
      this.e1 = value;
    },
    onStepFn9(value) {
      this.e1 = value;
    },
    onStepFn10(value) {
      this.e1 = value;
    },
    onStepFn11(value) {
      this.e1 = value;
    },
    onStepFn12(value) {
      this.e1 = value;
    },
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
