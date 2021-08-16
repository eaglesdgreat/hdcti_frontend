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
import axios from 'axios'

import { useStateValue } from "./../../StateProviders";
import validations from './../../lib/validations'
import { banks } from './../../lib/places'
import { isAuthenticated } from "../../lib/auth.helper";



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



export default function Stepper3() {
  const classes = useStyles()

  const [{ validate_stepper3 }, dispatch] = useStateValue();

  const addToBasket = (data) => {
    dispatch({
      type: "STEPPER_3_VALIDATIONS",
      item: data,
    });
  };

  const initialState = {
    group_of_application: null,
    date_of_membership: new Date(),
    type_of_business: '',
    family_member_in_hcdti: false,
    amount_of_savings: '',
    business_length: '',
    bank: null,
    account_number: '',
    groupId: '',
  }

  const [state, setState] = useState(initialState);
  const [check, setCheck] = useState(false)
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  useEffect(() => {
    const prevState = JSON.parse(localStorage.getItem("stepper3"))

    if (prevState) {
      if (prevState.family_member_in_hcdti === 'true') {
        prevState.family_member_in_hcdti = true
      } else {
        prevState.family_member_in_hcdti = false
      }

      setCheck(true)
      setState(prevState)
    } else {
      setState(initialState)
    }
  }, [])

  useEffect(async() => {
    // const url = `${process.env.BACKEND_URL}/account/allgroup`
    const url = `https://hcdti.savitechnig.com/account/allgroup`;
    const token = isAuthenticated().auth_token

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // console.log(response.data)

      if(response.data) {
        // const all_groups = response.data.map(x => x.groupName)
        const all_groups = response.data

        setGroups(all_groups)
      }
    } catch(e) {
      // console.log(e)
    }   
  }, [])

  useEffect(() => {
      if (state.group_of_application && state.date_of_membership && state.type_of_business
        && (state.family_member_in_hcdti === true || state.family_member_in_hcdti === false) 
        && state.amount_of_savings && state.business_length && state.account_number && state.bank && check
      ) {
        // setCheck(true)
        addToBasket(true)
      } else {
        // setCheck(false)
        addToBasket(false)
      }
  }, [
    check, state.group_of_application, state.date_of_membership, state.type_of_business,
    state.family_member_in_hcdti, state.amount_of_savings, state.business_length,
    state.account_number, state.bank,
  ])

  const clearError = (e) => {
    const { name } = e.target;

    if (name === 'account_number') {
      const validatePass = validations(state.account_number, "Account Number", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, [name]: validatePass.message });
        setCheck(false)
      } else {
        setMessages({ ...messages, [name]: "" });
        setCheck(true)
      }
    }

    if (name === 'amount_of_savings') {
      const validatePass = validations(state.amount_of_savings, "Savings Amount", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, [name]: validatePass.message });
        setCheck(false)
      } else {
        setMessages({ ...messages, [name]: "" });
        setCheck(true)
      }
    }

    if (name === 'business_length') {
      const validatePass = validations(state.business_length, "Business Length", false, "digits");

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
    localStorage.removeItem("stepper3");
    const { name, value } = event.target

    if (name === "family_member_in_hcdti") {
      setState({ ...state, [name]: !state.family_member_in_hcdti });
    } else {
      setState({ ...state, [name]: value });
    }

    localStorage.setItem("stepper3", JSON.stringify({ ...state, [name]: value }));
  };

  const handleDateChange = (date) => {
    localStorage.removeItem("stepper3");

    setState({ ...state, date_of_membership: date })

    localStorage.setItem("stepper3", JSON.stringify({ ...state, date_of_membership: date }));
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
									Group of Applicant
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

							<Autocomplete
                id="group_of_application"
                options={groups}
								// getOptionSelected={(option, value) =>
                //   option.groupName === value.groupName
								// }
                getOptionLabel={(option) => option.groupName}
								classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
								// PaperComponent={({ children }) => (
								//   <Paper elevation={0} style={{ background: "yellow" }}>{children}</Paper>
								// )}
								style={{ width: '90%' }}
                value={state.group_of_application}
								// selectOnFocus
								onChange={(event, newValue) => {
                  localStorage.removeItem("stepper3");
                  const id = event.target.id;
								  const name = id.split("-")[0];

								  if (newValue !== null) {
								    setState({
								      ...state,
                      [name]: newValue,
                      groupId: newValue.groupId
								    });
                    localStorage.setItem("stepper3", JSON.stringify({ ...state, [name]: newValue, groupId: newValue.groupId }));
                  } else {
								    setState({
								      ...state,
                      group_of_application: "",
								    });
                    localStorage.setItem("stepper3", JSON.stringify({ ...state, group_of_application: "", groupId: "" }));
                  }
								}}
								// inputValue={inputValue}
								// onInputChange={(event, newInputValue) => {
								//   setInputValue(newInputValue.name);
								// }}
								renderInput={(params) => (
									<TextField
										{...params}
										// label="Select Group Name"
										placeholder="Select the group of the applicant"
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
									Date of Membership
								</Typography><span style={{ color: 'red' }}>*</span>
							</Box>

							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
                  id="date_of_membership"
                  label="Date of Membership"
									format="dd/MM/yyyy"
									value={state.date_of_membership}
									onChange={handleDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
									style={{ width: '90%' }}
								/>
							</MuiPickersUtilsProvider>
						</Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
									Type of Business
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                style={{ width: '95%' }}
                value={state.type_of_business}
                name="type_of_business"
                onChange={(event) => handleChange(event)}
								placeholder="Enter the type of business"
                id="type_of_business"
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
									Got family member registered in any HCDTI Group?
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

							<FormControl
								variant="outlined"
								style={{ width: "90%" }}
								className={classes.formControl}
							>
								<RadioGroup
									row
									aria-label="position-family"
                  name="family_member_in_hcdti"
                  id="family_member_in_hcdti"
                  value={state.family_member_in_hcdti === true ? true : false}
									onChange={handleChange}
								// style={{justifyContent: 'spaace-between'}}
								>
									<FormControlLabel
										value={true}
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
										value={false}
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
									Amount of savings in passbook
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.amount_of_savings}
                name="amount_of_savings"
                onKeyUp={clearError}
                onChange={(event) => handleChange(event)}
								placeholder="Enter amount of savings in passbook"
                id="amount_of_savings"
                InputProps={{
                  className: classes.input,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />

              {messages.amount_of_savings && (
                <Alert style={{ width: '90%' }} severity="error">
                  {messages.amount_of_savings}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
									How long is this business (years)?
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.business_length}
                name="business_length"
                onKeyUp={clearError}
                onChange={(event) => handleChange(event)}
								placeholder="For how long has customer been running the business"
                id="business_length"
                InputProps={{
                  className: classes.input,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />

              {messages.business_length && (
                <Alert style={{ width: '90%' }} severity="error">
                  {messages.business_length}
                </Alert>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Box display="flex">
                <Typography variant="body1" gutterBottom className={classes.text}>
									Bank
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <Autocomplete
                id="bank"
                options={banks}
                // getOptionSelected={(option, value) =>
                //   option === value
                // }
                getOptionLabel={(option) => option}
                classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                style={{ width: '90%' }}
                value={state.bank}
                onChange={(event, newValue) => {
                  localStorage.removeItem("stepper3");

                  const id = event.target.id;
                  const name = id.split("-")[0];

                  if (newValue !== null) {
                    setState({
                      ...state,
                      [name]: newValue,
                    });

                    localStorage.setItem("stepper3", JSON.stringify({ ...state, [name]: newValue }));
                  } else {
                    setState({
                      ...state,
                      bank: "",
                    });

                    localStorage.setItem("stepper3", JSON.stringify({ ...state, bank: "" }));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Select Group Name"
                    placeholder="Select Bank"
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
									Account Number
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextField
                type="text"
                fullWidth
                variant="outlined"
                margin="none"
                className={classes.roots}
                value={state.account_number}
                name="account_number"
                onKeyUp={clearError}
                onChange={(event) => handleChange(event)}
								placeholder="Enter customer account number"
                id="account_number"
                InputProps={{
                  className: classes.input,
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />

              {messages.account_number && (
                <Alert style={{ width: '90%' }} severity="error">
                  {messages.account_number}
                </Alert>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}