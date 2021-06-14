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
              Step 5 of 5
            </p>
          </div>

          <div
            style="display:flex; width:100%; justify-content:flex-end; align-item:flex-start;"
          >
            <v-progress-linear
              v-if="deduction"
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

      <div style="display:flex; width:40%; margin:auto;">
        <p class="text-input-fn5" style="display:flex; justify-content:center;">
          CLICK HERE TO UPLOAD YOUR EMPLOYEE'S FILE
        </p>
      </div>

      <div
        style="display:flex; width:50%; margin:auto; justify-content:center; padding-top:20px;"
      >
        <v-file-input
          chips
          :rules="rules"
          accept=".csv"
          label="Upload your excel sheet file for employees"
          multiple
          v-model="logo"
          outlined
          name="logo"
          prepend-icon="mdi-upload"
          show-size
          counter
        ></v-file-input>
      </div>

      <div
        style="display:flex; width:50%; margin:auto; justify-content:center; padding-top:20px;"
      >
        <v-file-input
          chips
          :rules="rules"
          accept=".csv"
          label="Upload your excel sheet file for clients"
          multiple
          v-model="logo"
          outlined
          name="logo"
          prepend-icon="mdi-upload"
          show-size
          counter
        ></v-file-input>
      </div>

      <div
        style="display:flex; width:50%; margin:auto; justify-content:center; padding-top:20px;"
      >
        <v-file-input
          chips
          :rules="rules"
          accept=".csv"
          label="Upload your excel sheet file for vendor"
          multiple
          v-model="logo"
          outlined
          name="logo"
          prepend-icon="mdi-upload"
          show-size
          counter
        ></v-file-input>
      </div>

      <div
        style="display:flex; width:50%; margin:auto; justify-content:center; padding-top:20px;"
      >
        <v-file-input
          chips
          :rules="rules"
          accept=".csv"
          label="Upload your excel sheet file for assets"
          multiple
          v-model="logo"
          outlined
          name="logo"
          prepend-icon="mdi-upload"
          show-size
          counter
        ></v-file-input>
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
import {
  mdiPlus,
  mdiClose,
  mdiPencil,
  mdiDeleteOutline,
  mdiUpload,
} from "@mdi/js";

export default {
  name: "App",

  props: ["step_fn5"],

  // components: {
  //   mdiPlus,
  // },

  data() {
    return {
      e1: 5,
      rules: [
        (value) =>
          value &&
          value.size > 3000000 &&
          "Avatar size should be less than 3 MB!",
      ],
      deduction: "",
      addingItem: [],
      icons: {
        mdiPlus,
        mdiClose,
        mdiPencil,
        mdiDeleteOutline,
        mdiUpload,
      },
      editUnit: "",
      edit: "",
      logo: "",
    };
  },

  methods: {
    onNextStep() {
      this.e1 = 6;
      this.$emit("onStepFn5", this.e1);
    },

    onPrevStep() {
      this.e1 = 4;
      this.$emit("onStepFn5", this.e1);
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
.text-input-fn5 {
  font-size: 41px !important;
  font-family: "Source Sans Pro" Geneva, Verdana, sans-serif !important;
  font-style: normal;
  color: #ffffff !important;
  line-height: 48px !important;
  font-weight: 700 !important;
  text-align: center !important;
  letter-spacing: -0.03em !important;
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
</style>
