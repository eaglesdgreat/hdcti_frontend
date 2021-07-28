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
import moment from 'moment'
import NumberFormat from 'react-number-format'



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


export default function LoanApp({ isLoading, isError, loan}) {
  const classes = useStyles()
  const myLoan = loan.result

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
                {myLoan.app_type === 'new' ? 'New Loan Application' : 'Loan Application'}
              </Typography>
            </Box>

            <Hidden smDown><Divider light orientation="vertical" flexItem /></Hidden>

            <Box className={clsx(classes.topText, classes.upText)}>
              <Typography gutterBottom className={classes.typography}>
                Application No:
              </Typography>

              <Typography gutterBottom className={classes.typography2}>
                {myLoan.application_id ? myLoan.application_id : ''}
              </Typography>
            </Box>

            <Hidden smDown><Divider light orientation="vertical" flexItem /></Hidden>

            <Box display="flex" className={clsx(classes.topText, classes.upText)}>
              <Typography gutterBottom className={classes.typography}>
                Date Of Application:
              </Typography>

              <Typography gutterBottom className={classes.typography2}>
                {myLoan.date_of_app ? moment(myLoan.date_of_app).format('Do MMM YYYY') : ''}
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

            {
              isError ? '' :
                isLoading ? (<CircularProgress size="1em" style={{ color: "#362D73" }} />)
              : myLoan &&
              (
                <Typography
                  className={clsx(classes.typography2, classes.text)}
                  style={{
                    font: 'normal normal bold 20px/30px Poppins',
                  }}
                  gutterBottom
                >
                      <NumberFormat
                        value={myLoan.loan_applied_for}
                        thousandSeparator={true}
                        decimalScale={2}
                        decimalSeparator="."
                        prefix={'₦'}
                        fixedDecimalScale={true}
                        displayType="text"
                      />
                </Typography>
              )
            }
          </Box>

          <Divider light orientation="vertical" flexItem />

          <Box display="flex" flexDirection="column" style={{ marginLeft: '30px', marginRight: '30px' }}>
            <Typography className={clsx(classes.typography, classes.text)}>
              Amount Approved
            </Typography>

            {
              isError ? '' :
                isLoading ? (<CircularProgress size="1em" style={{ color: "#362D73" }} />)
                  : myLoan &&
                  (
                    <Typography
                      className={clsx(classes.typography2, classes.text)}
                      style={{
                        font: 'normal normal bold 20px/30px Poppins',
                      }}
                      gutterBottom
                    >
                      <NumberFormat
                        value={myLoan.loan_applied_for}
                        thousandSeparator={true}
                        decimalScale={2}
                        decimalSeparator="."
                        prefix={'₦'}
                        fixedDecimalScale={true}
                        displayType="text"
                      />
                    </Typography>
                  )
            }
          </Box>

          <Divider light orientation="vertical" flexItem />

          <Box display="flex" flexDirection="column" style={{ marginLeft: '30px', marginRight: '30px' }}>
            <Typography className={clsx(classes.typography, classes.text)}>
              Amount Owed
            </Typography>

            {
              isError ? '' :
                isLoading ? (<CircularProgress size="1em" style={{ color: "#362D73" }} />)
                  : myLoan &&
                  (
                    <Typography
                      className={clsx(classes.typography2, classes.text)}
                      style={{
                        font: 'normal normal bold 20px/30px Poppins',
                      }}
                      gutterBottom
                    >
                      <NumberFormat
                        value={myLoan.loan_applied_for}
                        thousandSeparator={true}
                        decimalScale={2}
                        decimalSeparator="."
                        prefix={'₦'}
                        fixedDecimalScale={true}
                        displayType="text"
                      />
                    </Typography>
                  )
            }
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}