import React, { useState, useEffect, Fragment } from 'react'
import {
  Box,
  Typography,
  Button,
  Chip,
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Approved from './Approved'
import Pending from './Pending'
import { isAuthenticated } from "./../../lib/auth.helper";

const useStyles = makeStyles((theme) => ({
  rootBox: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%', 
    paddingTop: '30px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  approvedBox: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed-color-e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    opacity: 1,
    height: '183px',
    width: '30%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '20px',
    }
  },
  pendingBox: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed-color-e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    opacity: 1,
    height: '218px',
    width: '30%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '20px',
      height: 'max-content',
      width: '100%',
    }
  },
  itemGrid: {
    width: "100%",
  },
  typography: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-16) var(--unnamed -font-family-helvetica-neue)',
    letterSpacing: 'var(--unnamed - character - spacing - 0)',
    color: 'var(--unnamed - color - 0d0d0d)',
    textAlign: 'right',
    font: 'normal normal normal 14px/16px Helvetica Neue',
    letterSpacing: '0px',
    color: '#0D0D0D',
    opacity: 1,
  },
  typography3: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)',
    letterSpacing: 'var(--unnamed - character - spacing - 0)',
    color: 'var(--unnamed - color - 0d0d0d)',
    textAlign: 'right',
    font: 'normal normal medium 14px/21px Poppins',
    letterSpacing: '0px',
    color: '#0D0D0D',
    opacity: 1,
  },
  typography2: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)',
    letterSspacing:' var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-0d0d0d)',
    textAlign: 'right',
    font: 'normal normal normal 12px/14px Helvetica Neue',
    letterSpacing: '0px',
    color: '#0D0D0DC7',
    opacity: 0.63
  },
  chip: {
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-ffffff)',
    textAlign: 'center',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    width: '80px',
    height: '21px',
    background: '#28A745 0% 0% no-repeat padding-box'
  },
  chip2: {
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-343a40)',
    textAlign: 'center',
    letterSpacing: '0px',
    color: '#343a40',
    opacity: 1,
    width: '80px',
    height: '21px',
    background: '#FFC107 0% 0% no-repeat padding-box'
  },
  checkBox: {
    width: '16px',
    height: '16px',
    borderRadius: '50px',
    background: '#28A745 0% 0% no-repeat padding-box',
    padding: '4px'
  },
  uncheckBox: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #B6B6B6',
    opacity: 1,
    width: '16px',
    height: '16px',
    borderRadius: '50px',
  },
  button: {
    background: '#28A745 0% 0% no-repeat padding-box',
    borderRadius: '4px',
    opacity: 1,
    height: '33px',
    "&:hover,&:focus": {
      background: '#28A745 0% 0% no-repeat padding-box',
      borderRadius: '4px'
    },
  },
  button2: {
    background: '#DC3545 0% 0% no-repeat padding-box',
    borderRadius: '4px',
    opacity: 1,
    height: '33px',
    "&:hover,&:focus": {
      background: '#DC3545 0% 0% no-repeat padding-box',
      borderRadius: '4px',
    },
  },
  buttonText: {
    font: 'var(--unnamed-font-style-normal) normal 600 13px/20px var(--unnamed-font-family-poppins)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-ffffff)',
    textAlign: 'left',
    font: 'normal normal 600 13px/20px Poppins',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
  },
  buttonBox: {
    padding: '20px', 
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    }
  },
  singleBox: {
    width: '48%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingBottom: '15px'
    }
  }
}))



export default function ApproveComponent({ isLoading, isError, loan }) {
  const classes = useStyles()
  
  const credit_officer_permission = isAuthenticated().is_credit_officer
  const branch_manager_permission = isAuthenticated().is_branch_manager
  const agency_bank_permission = isAuthenticated().is_agency_bank

  const credit_officer_approved = loan.result.credit_officer_approve === 'PENDING' ? false : true
  const branch_manager_approved = loan.result.branch_manager_approve === 'PENDING' ? false : true
  const agency_bank_approved = loan.result.agency_bank_approve === 'PENDING' ? false : true

  return (
    <Fragment>
      <Box className={classes.rootBox}>
        {
          credit_officer_approved ? (<Approved user={'Credit Officer'} name={loan.result.credit_officer_name} />) : (<Pending user={'Credit Officer'} permission={credit_officer_permission} level={'First'} />)
        }

        {
          branch_manager_approved ? (<Approved user={'Branch Manager'} name={loan.result.branch_manager_approved} />) : (<Pending user={'Branch Manager'} permission={branch_manager_permission} level={'Second'} />)
        }

        {
          agency_bank_approved ? (<Approved user={'Agency Bank'} name={loan.result.agency_bank_approved} />) : (<Pending user={'Agency Bank'} permission={agency_bank_permission} level={'Third'} />)
        }
      </Box>
    </Fragment>
  )
}