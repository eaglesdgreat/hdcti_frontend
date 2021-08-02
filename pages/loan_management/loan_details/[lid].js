import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  NoSsr,
  Divider,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import Layout from './../../../Components/Layout'
import { isAuthenticated } from "./../../../lib/auth.helper";
import LoanApp from './../../../Components/loan_details_component/LoanApp'
import ApproveComponent from './../../../Components/loan_details_component/ApproveComponent'
import BorrowerDetails from './../../../Components/loan_details_component/BorrowerDetails'



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "40px",
    display: "flex", 
    flexDirection: "column",
    // justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      // flexDirection: "column",
      paddingLeft: "0px",
      paddingTop: '0px',
      paddingRight: '0px',
    },
  },
}))



const fetcher = async (...arg) => {
  const [url, token] = arg;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
    // params: {page:1}
  });

  return response.data;
};


const loanData = () => {
  const router = useRouter();
  const { lid } = router.query;

  // const url = `${process.env.BACKEND_URL}/account/singleloan/${lid}`
  const url = `https://hcdti.savitechnig.com/account/singleloan/${lid}`;
  const token = isAuthenticated().auth_token;

  const { data, error } = useSWR([url, token], fetcher, {
    shouldRetryOnError: false,
  });

  return {
    loan: data,
    isLoading: !error && !data,
    isError: error,
  };
};



export default function LoanDetails() {
  const path = '/loans'
  const classes = useStyles()

  // Fetching data from backend with SWR
  const { loan, isLoading, isError } = loanData();
  console.log(loan);

  return (
    <Layout path={path}>
      <NoSsr>
        <Box className={classes.root}>
          <LoanApp isLoading={isLoading} isError={isError} loan={loan ? loan : {result: {}}} />

          <ApproveComponent isLoading={isLoading} isError={isError} loan={loan ? loan : { result: {} }} />

          <BorrowerDetails isLoading={isLoading} isError={isError} loan={loan ? loan : { result: {} }} />
        </Box>
      </NoSsr>
    </Layout>
  )
}