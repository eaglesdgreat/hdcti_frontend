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
              Step 1 of 6
            </p>
          </div>

          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <v-progress-linear
              v-if="file"
              height="10"
              :value="Math.round((2 / 6) * 100)"
              striped
            >
              {{ Math.round((2 / 6) * 100) }}% completion
            </v-progress-linear>

            <v-progress-linear
              v-else
              height="10"
              :value="Math.round((0 / 6) * 100)"
              striped
            >
              {{ Math.round((0 / 6) * 100) }}% completion
            </v-progress-linear>
          </div>
        </div>
      </div>

      <!-- <a href="/files/Template_Upload.csv" download> -->
        <div style="display:flex; padding-top:30px; width:80%; flex-direction:column; margin:auto;">
          <p class="text-input">
            CLICK EACH BUTTON BELOW TO DOWNLOAD TEMPLATES
          </p>

          <div style="text-align:center;padding-top:30px">
            <v-btn style="width:60%"><a href="/files/Template_Upload.csv" download>DOWNLOAD EMPLOYEE'S TEMPLATE <v-icon large @click="downloadFile">{{ icons.mdiFileDownload }}</v-icon></a></v-btn>
          </div>

          <div style="text-align:center;padding-top:30px">
            <v-btn style="width:60%"><a href="/files/Template_Upload.csv" download>DOWNLOAD CLIENT'S TEMPLATE <v-icon large @click="downloadFile">{{ icons.mdiFileDownload }}</v-icon></a></v-btn>
          </div>

          <div style="text-align:center;padding-top:30px">
            <v-btn style="width:60%"><a href="/files/Template_Upload.csv" download>DOWNLOAD VENDOR'S TEMPLATE <v-icon large @click="downloadFile">{{ icons.mdiFileDownload }}</v-icon></a></v-btn>
          </div>

          <div style="text-align:center;padding-top:30px">
            <v-btn style="width:60%"><a href="/files/Template_Upload.csv" download>DOWNLOAD ASSET'S TEMPLATE <v-icon large @click="downloadFile">{{ icons.mdiFileDownload }}</v-icon></a></v-btn>
          </div>
        </div>

        <!-- <div
          style="display:flex; width:100%; justify-content:center; padding-top:20px;"
        >
          <v-icon large @click="downloadFile">
            {{ icons.mdiFileDownload }}
          </v-icon>
        </div> -->
      <!-- </a> -->

      <div>
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
import { mdiDownloadBox, mdiFileDownload } from "@mdi/js";

export default {
  name: "App",

  props: ["step1"],

  data() {
    return {
      e1: 2,
      file: false,
      icons: {
        mdiDownloadBox,
        mdiFileDownload,
      },
    };
  },

  methods: {
    onNextStep() {
      this.e1 = 3;
      this.$emit("onStep1", this.e1);
    },

    onPrevStep() {
      this.e1 = 1;
      this.$emit("onStep1", this.e1);
    },

    downloadFile() {
      console.log("downloaded");
      this.file = !this.file;
    },
  },
};
</script>

<style scoped>
.text-input {
  font-size: 30px;
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
