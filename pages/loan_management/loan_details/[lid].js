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

import Layout from './../../../Components/Layout'
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



export default function LoanDetails() {
  const path = '/loans'
  const classes = useStyles()

  return (
    <Layout path={path}>
      <NoSsr>
        <Box className={classes.root}>
          <LoanApp />

          <ApproveComponent />

          <BorrowerDetails />
        </Box>
      </NoSsr>
    </Layout>
  )
}