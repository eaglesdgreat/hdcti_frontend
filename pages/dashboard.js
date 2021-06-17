import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Hidden,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import useSWR from "swr";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import { PieChart } from "react-minimal-pie-chart";

// import { useStateValue } from '../../StateProviders';
import TableLayout from "./../Components/Tables";
import Layout from "./../Components/Layout";
// import { isAuthenticated } from "./../../lib/auth.helper";
// import PrivateRoute from "./../../Components/PrivateRoute";



export default function Home() {
    const path = '/dashboard'

    return (
      // <div>Hello World</div>
      <Layout path={path}></Layout>
    );
}