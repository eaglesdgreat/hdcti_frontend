import React, { useState, useEffect, Fragment } from 'react'
import {
  Box,
  Typography,
  Button,
  NoSsr,
  Divider,
  IconButton,
  Hidden,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import clsx from 'clsx'



const useStyles = makeStyles((theme) => ({
  topBox: {
    background: ' var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed-color-e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    opacity: 1,
    height: '197px',
    [theme.breakpoints.down('sm')]: {
      height: 'max-content',
    }
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
  },
  box: {
    width: '70%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  topText: {
    marginLeft: '15px', 
    marginRight: '15px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
    }
  },
  lowBox: {
    padding: '30px', 
    width: '100%',
    display:"flex",
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      paddingLeft: '0px'
    }
  },
  text: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    }
  },
  upText: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  }
}))


export default function LoanApp() {
  const classes = useStyles()

  return (
    <Fragment>
      <Box className={classes.topBox}>
        <Box display="flex" justifyContent="space-between" style={{ padding: '20px', width: '100%' }}>
          <Box className={classes.box}>
            <Box className={classes.upText} style={{ marginRight: '15px' }}>
              <Typography className={classes.typography}>
                Type:
              </Typography>

              <Typography gutterBottom className={classes.typography2}>
                Loan Application
              </Typography>
            </Box>

            <Hidden smDown><Divider light orientation="vertical" flexItem /></Hidden>

            <Box className={clsx(classes.topText, classes.upText)}>
              <Typography gutterBottom className={classes.typography}>
                Application No:
              </Typography>

              <Typography gutterBottom className={classes.typography2}>
                9021
              </Typography>
            </Box>

            <Hidden smDown><Divider light orientation="vertical" flexItem /></Hidden>

            <Box display="flex" className={clsx(classes.topText, classes.upText)}>
              <Typography gutterBottom className={classes.typography}>
                Date Of Application:
              </Typography>

              <Typography gutterBottom className={classes.typography2}>
                19/02/2021
              </Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="flex-end" style={{ padding: '5px', width: '25%' }}>
            <IconButton>
              {/* <EditIcon /> */}
            </IconButton>
          </Box>
        </Box>

        <Divider light />

        <Box className={classes.lowBox}>
          <Box display="flex" flexDirection="column" style={{ marginLeft: '30px', marginRight: '30px' }}>
            <Typography className={clsx(classes.typography, classes.text)}>
              Principal/Amount Requested
            </Typography>

            <Typography
              className={clsx(classes.typography2, classes.text)}
              style={{
                font: 'normal normal bold 20px/30px Poppins',
              }}
              gutterBottom
            >
              ₦40,000.00
            </Typography>
          </Box>

          <Divider light orientation="vertical" flexItem />

          <Box display="flex" flexDirection="column" style={{ marginLeft: '30px', marginRight: '30px' }}>
            <Typography className={clsx(classes.typography, classes.text)}>
              Amount Approved
            </Typography>

            <Typography
              className={clsx(classes.typography2, classes.text)}
              style={{
                font: 'normal normal bold 20px/30px Poppins',
              }}
              gutterBottom
            >
              ₦40,000.00
            </Typography>
          </Box>

          <Divider light orientation="vertical" flexItem />

          <Box display="flex" flexDirection="column" style={{ marginLeft: '30px', marginRight: '30px' }}>
            <Typography className={clsx(classes.typography, classes.text)}>
              Amount Owed
            </Typography>

            <Typography
              className={clsx(classes.typography2, classes.text)}
              style={{
                font: 'normal normal bold 20px/30px Poppins',
              }}
              gutterBottom
            >
              ₦40,000.00
            </Typography>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}