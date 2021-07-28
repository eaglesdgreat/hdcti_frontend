import React, {useState, useEffect} from 'react'
import {
  Box,
  Typography,
  NoSsr,
  Grid,
} from '@material-ui/core'
import {makeStyles, withStyles} from '@material-ui/core/styles'
import Link from 'next/link'

import Layout from './../../Components/Layout'



const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    paddingTop: "200px",
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingTop: "20px",
    }
  },
  mainBox: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed-color-e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    opacity: 1,
    height: '92px',
    padding: '20px',
    "@media only screen and (min-width: 320px) and (max-width: 375px)": {
      height: "120px",
    },
  },
  typography: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-362d73)',
    textAlign: 'left',
    font: 'normal normal medium 14px/21px Poppins',
    letterpacing: '0px',
    color: '#362D73',
    opacity: 1,
  },
  typography2: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)',
    letterSpacing: 'var(--unnamed - character - spacing - 0)',
    color: 'var(--unnamed - color - 0d0d0d)',
    textAlign: 'left',
    font: 'normal normal normal 12px/14px Helvetica Neue',
    letterSpacing: '0px',
    color: '#0D0D0DC7',
    opacity: 0.63,
  }
}))


export default function CreateLoan () {
  const path = "/create_loan";
  const classes = useStyles()
  
  return (
    <Layout path={path}>
      <NoSsr>
        <Box className={classes.root}>
          <Grid container spacing={4}>
            <Grid item md={6} lg={6} xl={6}>
              <Box display="flex" flexDirection="column" className={classes.mainBox}>
                <Link href={`/loan_management/stepper_form?exist_member=${true}`}>
                  <a style={{ textDecoration: 'none' }}>
                    <Typography
                      className={classes.typography}
                      variant="body1"
                      gutterBottom
                    >
                      Apply for Existing Member in a Group
                    </Typography>
                  </a>
                </Link>

                <Typography
                  className={classes.typography2}
                  variant="body1"
                  gutterBottom
                >
                  Select this if the applicant has been added to a group on this platform
                </Typography>
              </Box>
            </Grid>

            <Grid item md={6} lg={6} xl={6}>
              <Box display="flex" flexDirection="column" className={classes.mainBox}>
                <Link href={`/loan_management/stepper_form?exist_member=${false}`}>
                  <a style={{ textDecoration: 'none' }}>
                    <Typography
                      className={classes.typography}
                      variant="body1"
                      gutterBottom
                    >
                      Apply for New Member
                    </Typography>
                  </a>
                </Link>

                <Typography
                  className={classes.typography2}
                  variant="body1"
                  gutterBottom
                >
                  Select this if the applicant has not been added to a group on this platform
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </NoSsr>
    </Layout>
  )
}