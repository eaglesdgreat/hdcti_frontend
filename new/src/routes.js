import Login from "./components/Login";
import HrSection from "./components/HrSection";
import Finance from "./components/Finance";

export const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },

  {
    path: "/hr",
    name: "hr_section",
    component: HrSection,
  },

  {
    path: "/finance",
    name: "finance_section",
    component: Finance,
  },
];
