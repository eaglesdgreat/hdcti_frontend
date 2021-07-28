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

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [personName, setPersonName] = useState("");

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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

              <Autocomplete
                id="groupId"
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
                // onChange={(event, newValue) => {
                //   const id = event.target.id;
                //   const name = id.split("-")[0];

                //   if (newValue !== null) {
                //     getMembers(newValue.groupId);
                //     clearError(event);
                //     setState({
                //       ...state,
                //       [name]: newValue.groupId,
                //     });
                //   } else {
                //     setShow(true);
                //     setState({
                //       ...state,
                //       groupId: "",
                //       number: "",
                //     });
                //   }
                // }}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                //   setInputValue(newInputValue.name);
                // }}
                // style={{ width: "100%", height: "40px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Select Group Name"
                    placeholder="Enter amount of last loan received"
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
                  Date last loan was fully repaid
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  // label="Date picker dialog"
                  format="dd/MM/yyyy"
                  value={selectedDate}
                  variant="otlined"
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
                // value={state}
                // onChange={(event) => onSearchChange(event)}
                // onKeyPress={enterSearch}
                // onKeyUp={searchResult}
                placeholder="How much is the customer applying for (principal)"
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
                  name="isLeader"
                  id="isLeader"
                // value={state.isLeader}
                // onChange={handleChange}
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
                  Business Address
                </Typography><span style={{ color: 'red' }}>*</span>
              </Box>

              <TextareaAutosize
                minRows={3}
                aria-label="business"
                placeholder="Enter the Business address"
                style={{ width: '90%', borderRadius: '5px', height: '95px' }}
              // value={state}
              // onChange={(event) => onSearchChange(event)}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}