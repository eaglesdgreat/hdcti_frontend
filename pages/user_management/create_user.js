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
import TableLayout from "./../../Components/Tables";
import Layout from "./../../Components/Layout";
// import { isAuthenticated } from "./../../lib/auth.helper";
// import PrivateRoute from "./../../Components/PrivateRoute";


const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      height: "100%",
      // margin: 'auto',
      paddingTop: 100,
      paddingBottom: 250,
      background: "#ECF1F2 0% 0% no-repeat padding-box",
      background: "var(--unnamed-color-ecf1f2) 0% 0% no-repeat padding-box",
      opacity: "1",
    },
    card: {
      width: "529px",
      height: "421px",
      // paddingTop: '5%',
      // paddingBottom: '5%',
      // margin: 'auto',
      // alignItems: 'center',
      // borderRadius: '10px'
      background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
      border: "1px solid var(--unnamed-color-e0e0e0)",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      border: "1px solid #E0E0E0",
      borderRadius: "5px",
      opacity: "1",
    },
    box1: {
      width: "100%",
      // margin: 'auto',
      // alignItem: 'center',
      // border: '1px solid red',
    },
    typography: {
      // lineHeight: '35px',
      // fontSize: '25px',
      // fontWeight: 'bold',
      // fontFamily: 'Source Sans Pro',
      // letterSpacing: '0.01em',
      // fontStyle: 'normal',
      // color: '#000000',
      // textAlign: 'center',
      font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-helveticaneue-medium)",
      letterSpacing: "var(--unnamed-character-spacing-0)",
      color: "var(--unnamed-color-0d0d0d)",
      textAlign: "left",
      font: "normal normal normal 16px/19px HelveticaNeue-Medium",
      letterSpacing: " 0px",
      color: "#0D0D0D",
      opacity: "1",
    },
    textField: {
      // borderRadius: "6px",
      // height: '45px',
      // margin: 'auto',
      "& input": {
        // color: "#182C51",
        fontSize: "16px",
        // fontWeight: "bold",
        fontFamily: "Source Sans Pro",
        fontStyle: "normal",
        lineHeight: "20px",
      },
      "& ::placeholder": {
        fontSize: "12px",
        fontWeight: "500",
        font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-23) var(--unnamed-font-family-poppins)",
        letterSpacing: "var(--unnamed-character-spacing-0)",
        color: "var(--unnamed-color-868d96)",
        textAlign: "left",
        font: "normal normal normal 14px/23px Poppins",
        letterSpacing: "0px",
        color: "#868D96",
        opacity: "1",
      },
  
      background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
      border: "1px solid var(--unnamed-color-e0e0e0)",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      border: "1px solid #E0E0E0",
      borderRadius: "5px",
      opacity: "1",
    },
    form: {
      width: "89%", // Fix IE 11 issue.
      marginTop: theme.spacing(4),
      fontSize: "14px",
    },
    submit: {
      // margin: theme.spacing(3, 0, 2),
      fontSize: "14px",
      boxShadow: "none",
      padding: "10px",
      fontWeight: "600",
      marginTop: theme.spacing(4),
    },
    createBox: {
        background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
        border: "1px solid var(--unnamed-color-e0e0e0)",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "1px solid #E0E0E0",
        borderRadius: "5px",
        opacity: "1",
        height: "562px",
        width:"90%",
    }
  }));


export default function Home() {
    const path = '/create_user'
    const classes = useStyles()
    const router = useRouter()

    return (
      <Layout path={path}>
        <Box display="flex" style={{width:"100%"}}>
          <Box className={classes.createBox}>
            {/* <h1>Hello World</h1> */}
          </Box>
        </Box>
      </Layout>
    );
}