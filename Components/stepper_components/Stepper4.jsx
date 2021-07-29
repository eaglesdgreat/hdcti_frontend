import React, { useState, useEffect, Fragment } from 'react'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  Grid,
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  Select,
  InputBase,
  FormControl,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Autocomplete, Alert, AlertTitle } from "@material-ui/lab";
import DateFnsUtils from '@date-io/date-fns';


const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    // border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    // border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: "1",
    // color: "#182C51",
    fontSize: "16px",
    // fontWeight: "bold",
    fontFamily: "Source Sans Pro",
    fontStyle: "normal",
    lineHeight: "20px",

    borderRadius: '5px',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    lineHeight: '18px',
    padding: '10px 0px 10px 12px',

    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: '5px',
      borderColor: '#ced4da',
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(InputBase);



const useStyles = makeStyles((theme) => ({
  cssOutlinedInput: {
    whiteSpace: "initial",
    "&$cssFocused $notchedOutline": {
      borderColor: "#FFFFFF00",
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#FFFFFF00 !important",
  },
  roots: {
    // background: "blue",
    border: '1px solid var(--unnamed-color-e0e0e0)',
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    width: "90%",
    // width: "426px",
    height: "38px",
  },
  input: {
    // font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-23) var(--unnamed-font-family-poppins)',
    // letterSpacing: 'var(--unnamed - character - spacing - 0)',
    // color: 'var(--unnamed-color-868d96)',
    // textAlign: 'left',
    // font: 'normal normal normal 14px/23px Poppins',
    // letteSpacing: '0px',
    // color: '#868D96',
    // opacity: 1

    color: "var(--unnamed-color-868d96)",
    fontfamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
    marginTop: "-9px",
  },
  text: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-poppins)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-212529)',
    textAlign: 'left',
    font: 'normal normal normal 16px/24px Poppins',
    letterSpacing: '0px',
    color: '#212529',
    opacity: 1,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(4),
    fontSize: "14px",
  },
  inputRoot: {
    // border: '1px solid var(--unnamed-color-e0e0e0)',
    // border: "1px solid #E0E0E0",
    borderRadius: "5px",
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    background: '#FFFFFF 0% 0% no-repeat padding-box',

    color: "var(--unnamed-color-868d96)",
    fontfamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
  },
  autoInput: {
    border: '1px solid var(--unnamed-color-e0e0e0)',
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
  },
  select: {
    height: "38px",
    width: '90%',

    borderRadius: "5px",
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    background: '#FFFFFF 0% 0% no-repeat padding-box',

    color: "var(--unnamed-color-868d96)",
    fontfamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
  },
}))


const roles = [
  { id: 6, name: "Select Role", value: "", disabled: true },
  { id: 1, name: "Super User", value: "super", disabled: false },
  { id: 2, name: "Credit Officer", value: "credit_officer", disabled: false },
  { id: 3, name: "Branch Manager", value: "branch_manager", disabled: false },
  { id: 4, name: "Senior Manager", value: "senior_manager", disabled: false },
  { id: 5, name: "Agency Bank", value: "agency_bank", disabled: false },
];



export default function Stepper4() {
  const classes = useStyles()

  const initialState = {
    last_loan_received: '',
    repay_last_loan_date: new Date(),
    indept: 2,
    business_address: '',
    loan_applied: '',
  }

  const [state, setState] = useState({});

  useEffect(() => {
    const prevState = JSON.parse(localStorage.getItem("stepper4"))

    if (prevState) {
      setState(prevState)
    } else {
      setState(initialState)
    }
  }, [])

  const handleChange = (event) => {
    localStorage.removeItem("stepper4");
    const { name, value } = event.target

    if (name === "indept") {
      setState({ ...state, [name]: parseInt(value) });
    } else {
      setState({ ...state, [name]: value });
    }

    localStorage.setItem("stepper4", JSON.stringify(state));
  };

  const handleDateChange = (date) => {
    localStorage.removeItem("stepper4");

    setState({ ...state, date_of_membership: date })

    localStorage.setItem("stepper4", JSON.stringify(state));
  };

  return (
    <>
      <Box display="flex" style={{ padding: '30px' }}>
        <form
          className={classes.form}
          noValidate
        // onSubmit={createGroup}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Last Loan received
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.last_loan_received}
                name="last_loan_received"
                onChange={(event) => handleChange(event)}
                placeholder="Enter amount of last loan received"
                id="last_loan_received"
                InputProps={{
                  className: classes.input,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     {/* <img src="/search.svg" alt="search" /> */}
                  //   </InputAdornment>
                  // ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" className={classes.text}>
                  Date last loan was fully repaid
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="date-picker-dialog"
                  label="Date of full repayment"
                  format="dd/MM/yyyy"
                  value={state.repay_last_loan_date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{ width: '90%' }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Loan Applied for
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.loan_applied}
                name="loan_applied"
                onChange={(event) => handleChange(event)}
                placeholder="How much is the customer applying for (principal)"
                id="loan_applied"
                InputProps={{
                  className: classes.input,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     {/* <img src="/search.svg" alt="search" /> */}
                  //   </InputAdornment>
                  // ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Indebted to any MFB/MFI?
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <FormControl
                variant="outlined"
                style={{ width: "90%" }}
                className={classes.formControl}
              >
                <RadioGroup
                  row
                  aria-label="position"
                  name="indept"
                  id="indept"
                  value={state.indept}
                  onChange={handleChange}
                // style={{justifyContent: 'spaace-between'}}
                >
                  <FormControlLabel
                    value={'1'}
                    control={
                      <Radio
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                        color="primary"
                      />
                    }
                    label="Yes"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={'2'}
                    control={
                      <Radio
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                        color="primary"
                      />
                    }
                    label="No"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Business Address
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextareaAutosize
                minRows={3}
                aria-label="business"
                placeholder="Enter the Business address"
                style={{ width: '90%', borderRadius: '5px', height: '95px' }}
                value={state.business_address}
                name="business_address"
                onChange={(event) => handleChange(event)}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}