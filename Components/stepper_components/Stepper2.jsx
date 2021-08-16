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
import axios from 'axios'
import { Autocomplete, Alert, AlertTitle } from "@material-ui/lab";

import { useStateValue } from "./../../StateProviders";
import validations from './../../lib/validations'
import { isAuthenticated } from "../../lib/auth.helper";
import { maritalStatuses, educations } from './../../lib/places'



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
  mobileBox: {
    padding: '30px',
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    }
  },
}))


const roles = [
  // { id: 6, name: "Select Role", value: "", disabled: true },
  { id: 1, name: "Super User", value: "super", disabled: false },
  { id: 2, name: "Credit Officer", value: "credit_officer", disabled: false },
  { id: 3, name: "Branch Manager", value: "branch_manager", disabled: false },
  { id: 4, name: "Senior Manager", value: "senior_manager", disabled: false },
  { id: 5, name: "Agency Bank", value: "agency_bank", disabled: false },
];



export default function Stepper2() {
  const classes = useStyles()
  
  const [{ exist_mem, validate_stepper2 }, dispatch] = useStateValue();

  const addToBasket = (data) => {
    dispatch({
      type: "STEPPER_2_VALIDATIONS",
      item: data,
    });
  };

  const initialState = {
    full_name: '',
    father_husband_name: '',
    res_address: '',
    perm_address: '',
    phone: '',
    next_kin_phone: '',
    marital_status: null,
    formal_education: null,
    buz_address: '',
    next_kin_name: '',
    member_name: null,
    member_exist: exist_mem,
  }

  const [state, setState] = useState(initialState);
  const [check, setCheck] = useState(false)
  const [inputValue, setInputValue] = useState({})
  const [members, setMembers] = useState([])
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  useEffect(() => {
    const prevState = JSON.parse(localStorage.getItem("stepper2"))

    if (prevState) {
      setState(prevState)
      setCheck(true)
    } else {
      setState(initialState)
    }
  }, [])

  useEffect(async () => {
    // const url = `${process.env.BACKEND_URL}/account/allgroupmember`
    const url = `https://hcdti.savitechnig.com/account/allgroupmember`;
    const token = isAuthenticated().auth_token

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // console.log(response.data)

      if (response.data) {
        const all_members = response.data

        setMembers(all_members)
      }
    } catch (e) {
      // console.log(e)
    }
  }, [])

  useEffect(() => {
    if (exist_mem) {
      if (state.member_name) {
        setCheck(true)
        addToBasket(true)
      } else {
        setCheck(false)
        addToBasket(false)
      }
    } else {
      if (state.full_name && state.father_husband_name && state.res_address
        && state.perm_address && state.phone && state.next_kin_phone && state.marital_status
        && state.formal_education && state.buz_address && state.next_kin_name && check
      ) {
        // setCheck(true)
        addToBasket(true)
      } else {
        // setCheck(false)
        addToBasket(false)
      }
    }
  }, [
    check, state.full_name, state.father_husband_name, state.res_address, 
    state.perm_address, state.phone, state.next_kin_phone, state.marital_status,
    state.formal_education, state.buz_address, state.next_kin_name, state.member_name
  ])

  const clearError = (e) => {
    const { name } = e.target;

    if(name === 'phone') {
      const validatePass = validations(state.phone, "Phone Number", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, [name]: validatePass.message });
        setCheck(false)
      } else {
        setMessages({ ...messages, [name]: "" });
        setCheck(true)
      }
    }

    if (name === 'next_kin_phone') {
      const validatePass = validations(state.next_kin_phone, "Phone Number", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, [name]: validatePass.message });
        setCheck(false)
      } else {
        setMessages({ ...messages, [name]: "" });
        setCheck(true)
      }
    }
  };

  const handleChange = (event) => {
    localStorage.removeItem("stepper2");
    const { name, value } = event.target

    setState({ ...state, [name]: value })

    localStorage.setItem("stepper2", JSON.stringify({ ...state, [name]: value}));
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
                    onKeyUp={clearError}
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
                    }}
                  />

                  {messages.phone && (
                    <Alert style={{width: '90%'}} severity="error">
                      {messages.phone}
                    </Alert>
                  )}
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
                  onKeyUp={clearError}
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
                  }}
                />

                {messages.next_kin_phone && (
                  <Alert style={{ width: '90%' }} severity="error">
                    {messages.next_kin_phone}
                  </Alert>
                )}
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
                    // inputValue={inputValue.marital_status}
                    // onInputChange={(_, newInputValue) => {
                    //   setInputValue({ ...inputValue, marital_status: newInputValue })
                    // }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        // label="Select Group Name"
                        placeholder="Select Marital Status"
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
                      options={members}
                      // getOptionSelected={(option, value) =>
                      //   option.memberName === value.memberName
                      // }
                      getOptionLabel={(option) => option.memberName}
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
                            [name]: newValue,
                          });

                          localStorage.setItem("stepper2", JSON.stringify({ ...state, [name]: newValue }));
                        } else {
                          setState({
                            ...state,
                            member_name: "",
                          });

                          localStorage.setItem("stepper2", JSON.stringify({ ...state, member_name: '' }));
                        }
                      }}
                      // inputValue={inputValue.member_name}
                      // onInputChange={(_, newInputValue) => {
                      //   setInputValue({ ...inputValue, member_name: newInputValue.name })
                      // }}
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
                  id="formal_education"
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
                    } else {
                      setState({
                        ...state,
                        formal_education: "",
                      });

                      localStorage.setItem("stepper2", JSON.stringify({ ...state, formal_education: '' }));
                    }
                  }}
                  // inputValue={inputValue.formal_education}
                  // onInputChange={(_, newInputValue) => {
                  //   setInputValue({ ...inputValue, formal_education: newInputValue })
                  // }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="Select Group Name"
                      placeholder="Select Formal Education"
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