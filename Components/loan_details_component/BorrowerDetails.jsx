import React, { useState, useEffect, Fragment } from 'react'
import {
  Box,
  Typography,
  Divider,
} from '@material-ui/core'
import { mkaeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import { makeStyles } from '@material-ui/styles'

import Payments from './Payments'



const useStyles = makeStyles((theme) => ({
  leftBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: 1,
    height: "278px",
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  rightBox: {
    background: "var(--unnamed-color-ecf1f2) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-ecf1f2)",
    background: "#ecf1f2 0% 0% no-repeat padding-box",
    border: "1px solid #ecf1f2",
    borderRadius: "5px",
    opacity: 1,
    width: "65%",
    height: 'max-content',
    "@media only screen and (max-width: 280px)": {
      marginTop: "20px",
      width: "240px",
    },
    "@media only screen and (min-width: 281px) and (max-width: 320px)": {
      marginTop: "20px",
      width: "270px",
    },
    "@media only screen and (min-width: 321px) and (max-width: 360px)": {
      marginTop: "20px",
      width: "310px",
    },
    "@media only screen and (min-width: 361px) and (max-width: 375px)": {
      marginTop: "20px",
      width: "330px",
    },
    "@media only screen and (min-width: 376px) and (max-width: 384px)": {
      marginTop: "20px",
      width: "340px",
    },
    "@media only screen and (min-width: 385px) and (max-width: 411px)": {
      marginTop: "20px",
      width: "367px",
    },
    "@media only screen and (min-width: 412px) and (max-width: 414px)": {
      marginTop: "20px",
      width: "367px",
    },
    "@media only screen and (min-width: 415px) and (max-width: 480px)": {
      marginTop: "20px",
      width: "435px",
    },
    "@media only screen and (min-width: 481px) and (max-width: 540px)": {
      marginTop: "20px",
      width: "495px",
    },
    "@media only screen and (min-width: 541px) and (max-width: 600px)": {
      marginTop: "20px",
      width: "317px",
    },
    "@media only screen and (min-width: 601px) and (max-width: 768px)": {
      marginTop: "20px",
      width: "490px",
    },
    "@media only screen and (min-width: 769px) and (max-width: 800px)": {
      marginTop: "20px",
      width: "510px",
    },
    "@media only screen and (min-width: 801px) and (max-width: 834px)": {
      marginTop: "20px",
      width: "530px",
    },
  },
  typography: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-helveticaneue-medium)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 16px/19px HelveticaNeue-Medium",
    letterSpacing: "0px",
    color: "#0D0D0D",
    textTransform: "capitalize",
    opacity: 1,
    // fontWeight: 600,
  },
  typography2: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 12px/14px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0DC7",
    // textTransform: "uppercase",
    opacity: 1,
  },
  typography3: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal bold 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: 1,
    // fontWeight: 600,
  },
  groupTypo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal bold 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#362D73",
    opacity: 1,
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%', 
    paddingTop: '30px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingTop: '10px',
    }
  }
}))



export default function BorrowerDetails() {
  const classes = useStyles()

  return (
    <Fragment>
      <Box className={classes.box}>
        <Box className={classes.leftBox}>
          <Box style={{padding: '20px'}}>
            <Typography className={classes.typography}>
              Borrower Details
            </Typography>
          </Box>

          <Divider light />

          <Box style={{ padding: "20px" }}>
            <Box style={{paddingTop: '20px', paddingBottom: '20px'}}>
              <Typography gutterBottom className={classes.typography2}>
                Name
              </Typography>

              <Link
                href={{
                  pathname: `/group_management/member_details/[mdid]`,
                  query: {
                    mdid: 1,
                  },
                }}
              >
                <a
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <Typography className={classes.groupTypo}>
                    Mirabel Chukwu
                  </Typography>
                </a>
              </Link>
            </Box>

            <Box style={{ paddingBottom: '20px' }}>
              <Typography gutterBottom className={classes.typography2}>
                Group
              </Typography>

              <Link
                href={{
                  pathname: `/group_management/group_details/[gid]`,
                  query: {
                    gid: 1,
                  },
                }}
              >
                <a
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <Typography className={classes.groupTypo}>
                    Diamond
                  </Typography>
                </a>
              </Link>
            </Box>

            <Box>
              <Typography className={classes.typography2}>
                Phone
              </Typography>

              <Typography className={classes.typography3}>
                07033390533
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.rightBox}>
          <Payments />
        </Box>
      </Box>
    </Fragment>
  )
}