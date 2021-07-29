import React, { useState, useEffect, Fragment } from 'react'
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
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Autocomplete, Alert, AlertTitle } from "@material-ui/lab";


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
  { id: 1, name: "Super User", value: "super", disabled: false },
  { id: 2, name: "Credit Officer", value: "credit_officer", disabled: false },
  { id: 3, name: "Branch Manager", value: "branch_manager", disabled: false },
  { id: 4, name: "Senior Manager", value: "senior_manager", disabled: false },
  { id: 5, name: "Agency Bank", value: "agency_bank", disabled: false },
];



export default function Stepper5() {
  const classes = useStyles()

  const initialState = {
    name_of_guarantor: '',
    relationship_with_borrower: '',
    guarantor_occupation: '',
    guarantor_home_address: '',
    guarantor_office_address: '',
    recommendation: '',
  }

  const [state, setState] = useState({});

  useEffect(() => {
    const prevState = JSON.parse(localStorage.getItem("stepper5"))

    if (prevState) {
      setState(prevState)
    } else {
      setState(initialState)
    }
  }, [])

  const handleChange = (event) => {
    localStorage.removeItem("stepper5");
    const { name, value } = event.target

    if (name === "indept") {
      setState({ ...state, [name]: parseInt(value) });
    } else {
      setState({ ...state, [name]: value });
    }

    localStorage.setItem("stepper5", JSON.stringify(state));
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
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Name of Guarantor
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                style={{ width: '95%' }}
                className={classes.roots}
                value={state.name_of_guarantor}
                name="name_of_guarantor"
                onChange={(event) => handleChange(event)}
                placeholder="Enter the name of the Guarantor"
                id="name_of_guarantor"
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
                  Relationship with borrower
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.relationship_with_borrower}
                name="relationship_with_borrower"
                onChange={(event) => handleChange(event)}
                placeholder="Enter guarantor’s relationship with borrower"
                id="relationship_with_borrower"
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
                  Guarantor’s Occupation
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.guarantor_occupation}
                onChange={(event) => handleChange(event)}
                name="guarantor_occupation"
                placeholder="Enter guarantor’s occupation"
                id="guarantor_occupation"
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
                  Guarantor’s Home Address
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextareaAutosize
                aria-label="residential"
                placeholder="Enter the residential address"
                minRows={3}
                style={{ width: '90%', borderRadius: '5px', height: '95px' }}
                value={state.guarantor_home_address}
                name="guarantor_home_address"
                onChange={(event) => handleChange(event)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Guarantor’s Office Address
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextareaAutosize
                aria-label="residential"
                placeholder="Enter the residential address"
                minRows={3}
                style={{ width: '90%', borderRadius: '5px', height: '95px' }}
                value={state.guarantor_office_address}
                name="guarantor_office_address"
                onChange={(event) => handleChange(event)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
                  Recommendation from Group
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <Autocomplete
                id="recommendation"
                options={roles}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                style={{ width: '90%' }}
                // value={state.member_name}
                onChange={(event, newValue) => {
                  localStorage.removeItem("stepper5");

                  const id = event.target.id;
                  const name = id.split("-")[0];

                  if (newValue !== null) {
                    setState({
                      ...state,
                      [name]: newValue.name,
                    });

                    localStorage.setItem("stepper5", JSON.stringify(state));
                  } else {
                    setState({
                      ...state,
                      recommendation: "",
                    });

                    localStorage.setItem("stepper5", JSON.stringify(state));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Select Group Name"
                    placeholder="Select a group member"
                    size="small"
                    variant="outlined"
                    fullWidth
                    margin="none"
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}