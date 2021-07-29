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


const roles = [
  { id: 1, name: "Super User", value: "super", disabled: false },
  { id: 2, name: "Credit Officer", value: "credit_officer", disabled: false },
  { id: 3, name: "Branch Manager", value: "branch_manager", disabled: false },
  { id: 4, name: "Senior Manager", value: "senior_manager", disabled: false },
  { id: 5, name: "Agency Bank", value: "agency_bank", disabled: false },
];



export default function Stepper3() {
  const classes = useStyles()

  const initialState = {
    group_of_application: '',
    date_of_membership: new Date(),
    type_of_business: '',
    family_member_in_hcdti: 2,
    amount_of_savings: '',
    business_length: '',
    bank: '',
    account_number: '',
  }

  const [state, setState] = useState({});
  useEffect(() => {
    const prevState = JSON.parse(localStorage.getItem("stepper3"))

    if (prevState) {
      console.log('prev', prevState)
      setState(prevState)
    } else {
      console.log('init', initialState)
      setState(initialState)
    }
  }, [])

  const handleChange = (event) => {
    localStorage.removeItem("stepper3");
    const { name, value } = event.target

    if (name === "family_member_in_hcdti") {
      setState({ ...state, [name]: parseInt(value) });
    } else {
      setState({ ...state, [name]: value });
    }

    localStorage.setItem("stepper3", JSON.stringify(state));
  };

  const handleDateChange = (date) => {
    localStorage.removeItem("stepper3");

    setState({ ...state, date_of_membership: date })

    localStorage.setItem("stepper3", JSON.stringify(state));
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
									Group of Applicant
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

							<Autocomplete
                id="group_of_application"
								options={roles}
								getOptionSelected={(option, value) =>
									option.name === value.name
								}
								getOptionLabel={(option) => option.name}
								classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
								// PaperComponent={({ children }) => (
								//   <Paper elevation={0} style={{ background: "yellow" }}>{children}</Paper>
								// )}
								style={{ width: '90%' }}
								// value={state.groupId}
								// selectOnFocus
								// onInput={clearError}
								onChange={(event, newValue) => {
                  localStorage.removeItem("stepper3");
                  const id = event.target.id;
								  const name = id.split("-")[0];

								  if (newValue !== null) {
								    setState({
								      ...state,
                      [name]: newValue.name,
								    });
                    localStorage.setItem("stepper3", JSON.stringify(state));
                  } else {
								    setState({
								      ...state,
                      group_of_application: "",
								    });
                    localStorage.setItem("stepper3", JSON.stringify(state));
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
									aria-label="position"
                  name="family_member_in_hcdti"
                  id="family_member_in_hcdti"
									value={state.family_member_in_hcdti}
									onChange={handleChange}
								// style={{justifyContent: 'spaace-between'}}
								>
									<FormControlLabel
										value="1"
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
										value="2"
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
									How long is this business?
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
									Bank
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              {/* <FormControl size="small" className={classes.select}>
                <Select
                  id="bank"
                  value={state.bank}
                  displayEmpty
                  name="bank"
                  onChange={handleChange}
                  input={<BootstrapInput />}
									placeholder="Select Bank"
                >
                  <MenuItem disabled={roles.length > 0} value="">
                    <Typography
                      noWrap
                      variant="body1"
                      className={classes.menuPlaceholder}
                    >
                      Select Bank
                    </Typography>
                  </MenuItem>

                  {roles.map((val) => (
                    <MenuItem key={val.id} value={val.name}>
                      {val.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}

              <Autocomplete
                id="bank"
                options={roles}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                style={{ width: '90%' }}
                // value={state.member_name}
                onChange={(event, newValue) => {
                  localStorage.removeItem("stepper3");

                  const id = event.target.id;
                  const name = id.split("-")[0];

                  if (newValue !== null) {
                    setState({
                      ...state,
                      [name]: newValue.name,
                    });

                    localStorage.setItem("stepper3", JSON.stringify(state));
                  } else {
                    setState({
                      ...state,
                      bank: "",
                    });

                    localStorage.setItem("stepper3", JSON.stringify(state));
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
                  // startAdornment: (
                  //   <InputAdornment position="start">
                  //     {/* <img src="/search.svg" alt="search" /> */}
                  //   </InputAdornment>
                  // ),
                }}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}