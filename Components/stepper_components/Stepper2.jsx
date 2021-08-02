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
import { useStateValue } from "./../../StateProviders";
import { Autocomplete, Alert, AlertTitle } from "@material-ui/lab";

import { maritalStatuses, educations } from './../../lib/places'


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
  menuPlaceholder: {
    fontSize: "12px",
    fontWeight: "500",
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-23) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-868d96)",
    textAlign: "left",
    font: "normal normal normal 14px/23px Poppins",
    letterSpacing: "0px",
    color: "#868D96",
    opacity: "1",
  },
}))



export default function Stepper2() {
  const classes = useStyles()
  const [{ exist_mem }, dispatch] = useStateValue();

  const initialState = {
    full_name: '',
    father_husband_name: '',
    res_address: '',
    perm_address: '',
    phone: '',
    next_kin_phone: '',
    marital_status: '',
    formal_education: '',
    buz_address: '',
    next_kin_name: '',
    member_name: '',
    member_exist: exist_mem,
  }

  const [state, setState] = useState({});
  const [inputValue, setInputValue] = useState({})

  useEffect(() => {
    const prevState = JSON.parse(localStorage.getItem("stepper2"))

    if (prevState) {
      setState(prevState)
      setInputValue(prevState)
    } else {
      setState(initialState)
      setInputValue(initialState)
    }
  }, [])

  const handleChange = (event) => {
    localStorage.removeItem("stepper2");
    const { name, value } = event.target

    setState({ ...state, [name]: value })

    localStorage.setItem("stepper2", JSON.stringify(state));
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
            {
              !exist_mem && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Box display="flex">
                    <Typography variant="body1" gutterBottom className={classes.text}>
                      Full Name Of Applicant
                    </Typography><span style={{ color: 'red' }}>*</span>
                  </Box>

                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="none"
                    style={{ width: '95%' }}
                    className={classes.roots}
                    name="full_name"
                    value={state.full_name}
                    onChange={(event) => handleChange(event)}
                    placeholder="Enter the full name of the applicant"
                    id="full_name"
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
              )
            }

            {!exist_mem && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box display="flex">
                  <Typography variant="body1" gutterBottom className={classes.text}>
                    Name Of Father/Husband
                  </Typography><span style={{ color: 'red' }}>*</span>
                </Box>

                <TextField
                  type="text"
                  fullWidth
                  variant="outlined"
                  margin="none"
                  className={classes.roots}
                  style={{ width: '95%' }}
                  name="father_husband_name"
                  value={state.father_husband_name}
                  onChange={(event) => handleChange(event)}
                  placeholder="Enter the full name of the father/husband"
                  id="father_husband_name"
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
            )}

            {!exist_mem && (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box display="flex">
                  <Typography variant="body1" gutterBottom className={classes.text}>
                    Residential Address
                  </Typography><span style={{ color: 'red' }}>*</span>
                </Box>

                <TextareaAutosize
                  aria-label="residential"
                  placeholder="Enter the residential address"
                  minrows={3}
                  style={{ width: '90%', borderRadius: '5px', height: '95px' }}
                  value={state.res_address}
                  name="res_address"
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
            )}

            {!exist_mem && (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box display="flex">
                  <Typography variant="body1" gutterBottom className={classes.text}>
                    Permanent Address
                  </Typography><span style={{ color: 'red' }}>*</span>
                </Box>

                <TextareaAutosize
                  aria-label="permanent"
                  placeholder="Enter permanent address"
                  minrows={3}
                  style={{ width: '90%', borderRadius: '5px', height: '95px' }}
                  value={state.perm_address}
                  name="perm_address"
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
            )}

            {
              !exist_mem && (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box display="flex">
                    <Typography variant="body1" gutterBottom className={classes.text}>
                      Phone No
                    </Typography><span style={{ color: 'red' }}>*</span>
                  </Box>

                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="none"
                    className={classes.roots}
                    value={state.phone}
                    name="phone"
                    onChange={(event) => handleChange(event)}
                    placeholder="Enter the phone Number"
                    id="phone"
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
              )
            }

            {!exist_mem && (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box display="flex">
                  <Typography variant="body1" gutterBottom className={classes.text}>
                    Phone No of Next of Kin
                  </Typography><span style={{ color: 'red' }}>*</span>
                </Box>

                <TextField
                  type="text"
                  fullWidth
                  variant="outlined"
                  margin="none"
                  className={classes.roots}
                  value={state.next_kin_phone}
                  name="next_kin_phone"
                  onChange={(event) => handleChange(event)}
                  placeholder="Enter the Phone Number of Next of Kin"
                  id="next_kin_phone"
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
            )}

            {
              !exist_mem ? (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Box display="flex">
                    <Typography variant="body1" gutterBottom className={classes.text}>
                      Marital Status
                    </Typography><span style={{ color: 'red' }}>*</span>
                  </Box>

                  <Autocomplete
                    id="marital_status"
                    options={maritalStatuses}
                    // getOptionSelected={(option, value) =>
                    //   option.name === value.name
                    // }
                    getOptionLabel={(option) => option}
                    classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                    style={{ width: '90%' }}
                    value={state.marital_status}
                    onChange={(event, newValue) => {
                      localStorage.removeItem("stepper2");

                      const id = event.target.id;
                      const name = id.split("-")[0];

                      if (newValue !== null) {
                        setState({
                          ...state,
                          [name]: newValue,
                        });

                        localStorage.setItem("stepper2", JSON.stringify({ ...state, [name]: newValue }));
                      } else {
                        setState({
                          ...state,
                          marital_status: "",
                        });

                        localStorage.setItem("stepper2", JSON.stringify({ ...state, marital_status: '' }));
                      }
                    }}
                    inputValue={inputValue.marital_status}
                    onInputChange={(_, newInputValue) => {
                      setInputValue({ ...inputValue, marital_status: newInputValue })
                    }}
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
              )
              : (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Box display="flex">
                      <Typography variant="body1" gutterBottom className={classes.text}>
                        Who is applying?
                      </Typography><span style={{ color: 'red' }}>*</span>
                    </Box>

                    <Autocomplete
                      id="member_name"
                      options={roles}
                      // getOptionSelected={(option, value) =>
                      //   option.name === value.name
                      // }
                      getOptionLabel={(option) => option.name}
                      classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                      style={{ width: '90%' }}
                      value={state.member_name}
                      onChange={(event, newValue) => {
                        localStorage.removeItem("stepper2");

                        const id = event.target.id;
                        const name = id.split("-")[0];

                        if (newValue !== null) {
                          setState({
                            ...state,
                            [name]: newValue.name,
                          });

                          localStorage.setItem("stepper2", JSON.stringify({ ...state, [name]: newValue.name }));
                        } else {
                          setState({
                            ...state,
                            member_name: "",
                          });

                          localStorage.setItem("stepper2", JSON.stringify({ ...state, member_name: '' }));
                        }
                      }}
                      inputValue={inputValue.member_name}
                      onInputChange={(_, newInputValue) => {
                        setInputValue({ ...inputValue, member_name: newInputValue.name })
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          // label="Select Group Name"
                          placeholder="Select Member"
                          size="small"
                          variant="outlined"
                          fullWidth
                          margin="none"
                        />
                      )}
                    />
                  </Grid>
              )
            }

            {!exist_mem && (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Box display="flex">
                  <Typography variant="body1" gutterBottom className={classes.text}>
                    Formal Education
                  </Typography><span style={{ color: 'red' }}>*</span>
                </Box>

                <Autocomplete
                  id="marital_status"
                  options={educations}
                  // getOptionSelected={(option, value) =>
                  //   option.name === value.name
                  // }
                  getOptionLabel={(option) => option}
                  classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                  style={{ width: '90%' }}
                  value={state.formal_education}
                  onChange={(event, newValue) => {
                    localStorage.removeItem("stepper2");

                    const id = event.target.id;
                    const name = id.split("-")[0];

                    if (newValue !== null) {
                      setState({
                        ...state,
                        [name]: newValue,
                      });

                      localStorage.setItem("stepper2", JSON.stringify({ ...state, [name]: newValue }));
                      console.log(JSON.parse(localStorage.getItem("stepper2")), state)
                    } else {
                      setState({
                        ...state,
                        formal_education: "",
                      });

                      localStorage.setItem("stepper2", JSON.stringify({ ...state, formal_education: '' }));
                    }
                  }}
                  inputValue={inputValue.formal_education}
                  onInputChange={(_, newInputValue) => {
                    setInputValue({ ...inputValue, formal_education: newInputValue })
                  }}
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
            )}

            {!exist_mem && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box display="flex">
                  <Typography variant="body1" gutterBottom className={classes.text}>
                    Name of Next of Kin
                  </Typography><span style={{ color: 'red' }}>*</span>
                </Box>

                <TextField
                  type="text"
                  fullWidth
                  variant="outlined"
                  margin="none"
                  style={{ width: '95%' }}
                  className={classes.roots}
                  value={state.next_kin_name}
                  name="next_kin_name"
                  onChange={(event) => handleChange(event)}
                  placeholder="Enter the full name of the next of kin"
                  id="next_kin_name"
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
            )}

            {!exist_mem && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Box display="flex">
                  <Typography variant="body1" gutterBottom className={classes.text}>
                    Business Address
                  </Typography><span style={{ color: 'red' }}>*</span>
                </Box>

                <TextareaAutosize
                  minrows={3}
                  aria-label="business"
                  placeholder="Enter the Business address"
                  style={{ width: '95%', borderRadius: '5px', height: '95px' }}
                  value={state.buz_address}
                  name="buz_address"
                  onChange={(event) => handleChange(event)}
                />
              </Grid>
            )}
          </Grid>
        </form>
      </Box>
    </>
  )
}