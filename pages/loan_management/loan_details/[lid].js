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



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: "40px",
    // display: "flex",
    // justifyContent: "space-between",
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column",
    //   paddingRight: "0px",
    // },
  },
  topBox: {
    background:' var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed-color-e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    opacity: 1,
    height: '197px',
  },
  typography: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-0d0d0d)',
    textAlign: 'left',
    font: 'normal normal normal 14px/21px Helvetica Neue',
    letterSpacing: '0px',
    color: '#0D0D0DC7',
    marginRight: '5px',
    opacity: 0.63,
  },
  typography2: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-0d0d0d)',
    textAlign: 'left',
    font: 'normal normal bold 14px/21px Poppins',
    letterSpacing: '0px',
    color: '#0D0D0D',
    opacity: 1,
  }
}))



export default function LoanDetails() {
  const path = '/loans'
  const classes = useStyles()

  return (
    <Layout path={path}>
      <NoSsr>
        <Box className={classes.root}>
          <Box className={classes.topBox}>
            <Box display="flex" justifyContent="space-between" style={{padding: '20px', width:'100%'}}>
              <Box display="flex" style={{ width: '60%' }}>
                <Box display="flex" style={{marginRight: '15px'}}>
                  <Typography className={classes.typography}>
                    Type:
                  </Typography>

                  <Typography className={classes.typography2}>
                    Loan Application
                  </Typography>
                </Box>

                <Divider light orientation="vertical" flexItem/>

                <Box display="flex" style={{ marginLeft: '15px', marginRight: '15px' }}>
                  <Typography className={classes.typography}>
                    Application No:
                  </Typography>

                  <Typography className={classes.typography2}>
                    9021
                  </Typography>
                </Box>

                <Divider light orientation="vertical" flexItem />

                <Box display="flex" style={{ marginLeft: '15px', marginRight: '15px' }}>
                  <Typography className={classes.typography}>
                    Date Of Application:
                  </Typography>

                  <Typography className={classes.typography2}>
                    19/02/2021
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" justifyContent="flex-end" style={{ padding: '5px', width: '30%' }}>
                <IconButton>
                  {/* <EditIcon /> */}
                </IconButton>
              </Box>
            </Box>

            <Divider light />

            <Box display="flex" justifyContent="space-around" style={{ padding: '30px', width: '100%' }}>
              <Box display="flex" flexDirection="column" style={{ marginLeft: '30px', marginRight: '30px' }}>
                <Typography className={classes.typography} style={{textAlign:'center'}}>
                  Principal/Amount Requested
                </Typography>

                <Typography 
                  className={classes.typography2}
                  style={{
                    textAlign: 'center',
                    font: 'normal normal bold 20px/30px Poppins',
                  }}
                >
                  ₦40,000.00
                </Typography>
              </Box>

              <Divider light orientation="vertical" flexItem />

              <Box display="flex" flexDirection="column" style={{ marginLeft: '30px', marginRight: '30px' }}>
                <Typography className={classes.typography} style={{ textAlign: 'center' }}>
                  Amount Approved
                </Typography>

                <Typography
                  className={classes.typography2}
                  style={{
                    textAlign: 'center',
                    font: 'normal normal bold 20px/30px Poppins',
                  }}
                >
                  ₦40,000.00
                </Typography>
              </Box>

              <Divider light orientation="vertical" flexItem />

              <Box display="flex" flexDirection="column" style={{ marginLeft: '30px', marginRight: '30px' }}>
                <Typography className={classes.typography} style={{ textAlign: 'center' }}>
                  Amount Owed
                </Typography>

                <Typography
                  className={classes.typography2}
                  style={{
                    textAlign: 'center',
                    font: 'normal normal bold 20px/30px Poppins',
                  }}
                >
                  ₦40,000.00
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </NoSsr>
    </Layout>
  )
}