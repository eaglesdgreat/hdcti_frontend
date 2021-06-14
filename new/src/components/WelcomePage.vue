<template>
  <div
    style="background-color:#00487C; padding:30px; border-radius:20px"
  >
    <div>
      <sequential-entrance tag="section" fromLeft>
        <img src="./../assets/stride1.png" />
      </sequential-entrance>
    </div>

    <div
      style="display:flex; justify-content:center; width:60%; margin: auto; padding-bottom:30px"
    >
      <sequential-entrance delay="3000" tag="section" fromTop>
        <p class="welcome-text">
          Thank you for choosing Stride ERP to help streamline your business,
          this setup wizard will help you configure the basic settings needed to
          get your data running.
        </p>
      </sequential-entrance>
    </div>

    <div style="display:flex; justify-content:center; width:60%; margin: auto;">
      <sequential-entrance delay="7000" tag="section">
        <p class="welcome-text">
          It’s a simple process and it will take you less than an hour to
          complete. You don't have that time right now? Don’t worry! It allows
          you save as draft and you can continue from where you left at when
          ready.
        </p>
      </sequential-entrance>
    </div>

    <div
      style="display:flex; justify-content:center; padding-top:4%; align-item:flex-end"
    >
      <sequential-entrance delay="10000" tag="section" fromBottom>
        <v-btn @click="moveToStepper" large>
          Click here to get started
        </v-btn>
      </sequential-entrance>
    </div>
  </div>
</template>

<script>
// import { mdi-arrow-left-thick } from '@mdi/js'

export default {
  name: "welcome",

  props: ['next_step'],

  data() {
    return {
      e1: 1,
    };
  },

   methods: {
    // Define the method that emits data to the parent as the first parameter to `$emit()`.
    // This is referenced in the <template> call in the parent. The second parameter is the payload.
    moveToStepper () {
      this.e1 = 2
      this.$emit('nextStep', this.e1)
    }
  }
};
</script>

<style>
.theme--light.v-btn.v-btn--has-bg {
  background-color: #00b0e4 !important;
  color: #ffffff !important;
  box-shadow: 0px 10px 40px -10px #00b0e4 !important;
  font-weight: 700 !important;
}

.welcome-text {
  font-size: 30px;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif;
  font-style: normal;
  color: #ffffff;
  line-height: 48px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
}

img {
  max-width: 100%;
  display: block;
}

/* #app {
  margin: 10px 50px;
} */
</style>
