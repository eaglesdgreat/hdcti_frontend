<template>
  <v-app style="bacground-color:#FFFFFF00; overflow-x:hidden">
    <div class="media">
      <router-view />
    </div>
  </v-app>
</template>

<script>
// import Company from './components/Company'
// import Hr from './components/HrSection'

export default {
  name: "App",

  // components: {
  //   Company,
  //   // Hr,
  // },

  data() {
    return {
      e1: 1,
    };
  },

  // methods: {
  //   newStep(value) {
  //     this.e1 = value;
  //   },
  //   onStep1(value) {
  //     this.e1 = value
  //   },
  //   onStep2(value) {
  //     this.e1 = value
  //   },
  //   onStep3(value) {
  //     this.e1 = value
  //   },
  //   onStep4(value) {
  //     this.e1 = value
  //   },
  //   onStep5(value) {
  //     this.e1 = value
  //   }
  // },
};
</script>

<style>
.media {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2em;
  margin-top:0;
  width:90%; 
  margin:auto;
}

.media > * {
  flex: 1 1 250px;
  margin: 10px;
}

@media screen and (min-width: 768px) {
  .media {
    width:100%; 
  }
}

.theme--light.v-btn.v-btn--has-bg {
  background-color: #00b0e4 !important;
  color: #ffffff !important;
  /* box-shadow: 0px 10px 40px -10px #00b0e4 !important; */
  font-weight: 700 !important;
}

.v-stepper {
  box-shadow: none !important;
  background-color: transparent !important;
  height: 100%;
}

.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.v-stepper__header {
  box-shadow: none !important;
}

.v-text-field--outlined fieldset {
  border-color: #000000 !important;
  background-color: #ffffff !important;
}

.v-icon__svg {
  height: 24px !important;
  width: 24px !important;
  fill: #ffffff !important;
}

.v-application .primary {
  background-color: blue !important;
  border-color: blue !important;
}

.v-icon.v-icon::after {
  background-color: #ffffff00 !important;
}

.theme--light.v-stepper .v-stepper__step__step {
  color: white;
  font-size: 15px;
  font-weight: 500;
}

.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
  /* color: blue; */
}

.v-data-table-header th {
  text-transform: uppercase !important;
  background-color: #00b0e4;
  font-size: 12px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  font-weight: 500 !important;
  letter-spacing: -0.03em !important;
}

/* .stp {
  font-size: 10px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  letter-spacing: -0.03em !important;
} */

.v-progress-linear {
  background: #00b0e4 !important;
  overflow: hidden !important;
  position: relative !important;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1) !important;
  width: 50% !important;
  border-radius: 60px !important;
  height: 25px !important;
  font-size: 15px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: initial !important;
  color: #ffffff !important;
}

.theme--light.v-counter {
  color: white !important;
}

.theme--light.v-label {
  color: #FFFFFF !important;
}

.vs-select {
  width: 300% !important;
}

.theme--light.v-application {
  background-color: #FFFFFF00 !important;
}

.v-application a {
    color: white !important;
}

.v-application p {
    margin-bottom: 0px !important;
}

#app {
  margin: 10px 0px;
}
</style>
