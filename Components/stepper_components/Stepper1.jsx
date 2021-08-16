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
  Select,
  InputBase,
  FormControl,
  MenuItem,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Autocomplete, Alert, AlertTitle } from "@material-ui/lab";
import DateFnsUtils from '@date-io/date-fns';
// import MomentUtils from '@date-io/moment';
// import moment from 'moment'

import {states, branches} from './../../lib/places'
import validations from './../../lib/validations'
import { useStateValue } from "./../../StateProviders";



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
  mobileBox: { 
    padding: '30px',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    }
  },
}))



export default function Stepper1() {
  const classes = useStyles()

  const initialState = {
    app_type: '',
    form_no: '',
    state: null,
    stateIndex: '',
    branch: null,
    branchIndex: '',
    date_of_application: new Date(),
  }

  const [{ validate_stepper1 }, dispatch] = useStateValue();

  const addToBasket = (data) => {
    dispatch({
      type: "STEPPER_1_VALIDATIONS",
      item: data,
    });
  };

  const [state, setState] = useState(initialState);
  const [inputValue, setInputValue] = useState({ state: '', branch: '' })
  const [check, setCheck] = useState(false)
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  useEffect(() => { 
    const prevState = JSON.parse(localStorage.getItem("stepper1"))

    if(prevState) {
      setState({ ...initialState, ...prevState})
      setCheck(true)
    } else {
      setState(initialState)
      console.log(initialState)
    }
  }, [])

  useEffect(() => {
    if (state.app_type && state.form_no && state.state && state.branch && state.date_of_application && check) {
      // setCheck(true)
      addToBasket(true)
    } else {
      // setCheck(false)
      addToBasket(false)
    }
  }, [check, state.app_type, state.form_no, state.state, state.branch, state.date_of_application])

  const clearError = (e) => {
    const { name } = e.target;

      const validatePass = validations(state.form_no, "Form No", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, [name]: validatePass.message });
        setCheck(false)
      } else {
        setMessages({ ...messages, [name]: "" });
        setCheck(true)
      }
  };

  const handleChange = (event) => {
    localStorage.removeItem("stepper1");
    const { name, value } = event.target

    setState({...state, [name]: value})

    localStorage.setItem("stepper1", JSON.stringify({ ...state, [name]: value }));
  };

  const handleDateChange = (date) => {
    localStorage.removeItem("stepper1");

    setState({ ...state, date_of_application: date })

    localStorage.setItem("stepper1", JSON.stringify({ ...state, date_of_application: date }));
  };

  return (
    <>
      <Box display="flex" className={classes.mobileBox}>
        <form
          className={classes.form}
          noValidate
          // onSubmit={createGroup}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Type
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.app_type}
                name="app_type"
                onChange={(event) => handleChange(event)}
                placeholder="Enter the type of application"
                id="type"
                InputProps={{
                  className: classes.input,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Form No
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.form_no}
                name="form_no"
                onKeyUp={clearError}
                onChange={(event) => handleChange(event)}
                placeholder="Enter the form number"
                id="form_number"
                InputProps={{
                  className: classes.input,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />

              {messages.form_no && (
                <Alert style={{ width: '90%' }} severity="error">
                  {messages.form_no}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  State
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <Autocomplete
                id="state"
                options={states}
                // getOptionSelected={(option, value) =>
                //   option === value
                // }
                getOptionLabel={(option) => option}
                // defaultValue={states[0]}
                classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                style={{ width: '90%' }}
                value={state.state}
                onChange={(event, newValue) => {
                  localStorage.removeItem("stepper1");

                  const id = event.target.id;
                  const name = id.split("-")[0];

                  if (newValue !== null) {
                    setState({
                      ...state,
                      [name]: newValue,
                    });

                    localStorage.setItem("stepper1", JSON.stringify({ ...state, [name]: newValue }));
                  } else {
                    setState({
                      ...state,
                      state: "",
                    });

                    localStorage.setItem("stepper1", JSON.stringify({ ...state, state: '' }));
                  }
                }}
                // inputValue={inputValue.state}
                // onInputChange={(_, newInputValue) => {
                //   setInputValue({ ...inputValue, state: newInputValue })
                // }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Select Group Name"
                    placeholder="Select State"
                    size="small"
                    variant="outlined"
                    fullWidth
                    margin="none"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Branch
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <Autocomplete
                id="branch"
                options={branches}
                // getOptionSelected={(option, value) =>
                //   option.name === value.name
                // }
                // defaultValue={branches[0 + state.branchIndex]}
                getOptionLabel={(option) => option}
                classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                style={{ width: '90%' }}
                value={state.branch}
                onChange={(event, newValue) => {
                  localStorage.removeItem("stepper1");

                  const id = event.target.id;
                  const name = id.split("-")[0];

                  if (newValue !== null) {
                    setState({
                      ...state,
                      [name]: newValue,
                    });

                    localStorage.setItem("stepper1", JSON.stringify({ ...state, [name]: newValue}));
                  } else {
                    setState({
                      ...state,
                      branch: "",
                    });

                    localStorage.setItem("stepper1", JSON.stringify({ ...state, branch: '' }));
                  }
                }}
                // inputValue={inputValue.branch}
                // onInputChange={(_, newInputValue) => {
                //   setInputValue({ ...inputValue, branch: newInputValue})
                // }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Branch"
                    size="small"
                    variant="outlined"
                    fullWidth
                    margin="none"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" className={classes.text}>
                  Date Of Application
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="date_of_application"
                  label="Date of Application"
                  format="dd/MM/yyyy"
                  value={state.date_of_application}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{width:'90%'}}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}