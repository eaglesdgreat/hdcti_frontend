import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Hidden,
  TextField,
  CircularProgress,
  Divider,
  Button,
  Select,
  MenuItem,
  InputBase,
  NoSsr,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import useSWR from "swr";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { PieChart } from "react-minimal-pie-chart";
import {Autocomplete, Alert, AlertTitle} from "@material-ui/lab";

import { useStateValue } from '../../StateProviders';
import Layout from "./../../Components/Layout";
import validations from "./../../lib/validations";
import { isAuthenticated } from "./../../lib/auth.helper";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
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

    borderRadius: "5px",
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    lineHeight: "18px",
    padding: "10px 0px 10px 12px",
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: "5px",
      borderColor: "#ced4da",
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    // margin: 'auto',
    paddingTop: 100,
    paddingBottom: 250,
    background: "#ECF1F2 0% 0% no-repeat padding-box",
    background: "var(--unnamed-color-ecf1f2) 0% 0% no-repeat padding-box",
    opacity: "1",
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
    // minWidth: 175,
  },
  card: {
    width: "529px",
    height: "421px",
    // paddingTop: '5%',
    // paddingBottom: '5%',
    // margin: 'auto',
    // alignItems: 'center',
    // borderRadius: '10px'
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: "1",
  },
  box1: {
    width: "100%",
    // margin: 'auto',
    // alignItem: 'center',
    // border: '1px solid red',
  },
  typography: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-helveticaneue-medium)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 16px/19px HelveticaNeue-Medium",
    letterSpacing: " 0px",
    color: "#0D0D0D",
    opacity: "1",
  },
  textField: {
    // borderRadius: "6px",
    height: "38px",
    // margin: 'auto',
    "& input": {
      // color: "#182C51",
      fontSize: "16px",
      // fontWeight: "bold",
      fontFamily: "Source Sans Pro",
      fontStyle: "normal",
      lineHeight: "20px",
    },
    "& ::placeholder": {
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

    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    // border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    // border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: "1",
  },
  form: {
    width: "85%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    paddingTop: "90px",
    // fontSize: "14px",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0),
      paddingTop: "45px",
    },
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    fontSize: "14px",
    boxShadow: "none",
    padding: "10px",
    fontWeight: "600",
    marginTop: theme.spacing(4),
  },
  showPass: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-16) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "right",
    font: "normal normal medium 12px/16px Poppins",
    letterSpacing: " 0px",
    color: "#362D73",
    opacity: "1",
    fontSize: "10px",
    marginTop: "-11px",
    "&:hover,&:focus": {
      background: "#ffffff00",
    },
  },
  itemGrid: {
    width: "100%",
  },
  createBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: "1",
    height: "578px",
    width: "98%",
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
  formTypo: {
    marginBottom: "-11px",
  },
  submitTypo: {
    font: "var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-ffffff)",
    textAlign: "center",
    font: "normal normal 600 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#FFFFFF",
    opacity: "1",
    textTransform: "capitalize",
  },
}));


export default function AddMember() {
  const path = "/groups";
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const token = isAuthenticated().auth_token;

  const initialState = {
    memberName: "",
    mobileNumber: "",
    isLeader: false,
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [getQuery, setGetQuery] = useState(JSON.parse(localStorage.getItem('add_member')));
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "isLeader") {
      setState({ ...state, [name]: !state.isLeader });
    } else {
      setState({ ...state, [name]: value });
    }
  }

  const clearError = (e) => {
    const { name } = e.target;
    setMessages({ ...messages, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // if (isValid) {
    //   const validate = validations(state.groupName, "Group ID");
    //   if (validate.status) {
    //     setMessages({ ...messages, groupName: validate.message });
    //     isValid = false;
    //   }
    // }

    if (isValid) {
      const validate = validations(state.memberName, "Member Name");
      if (validate.status) {
        setMessages({ ...messages, memberName: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validatePass = validations(
        state.mobileNumber,
        "Phone Number",
        true,
        "digits"
      );
      if (validatePass.status) {
        setMessages({ ...messages, mobileNumber: validatePass.message });
        isValid = false;
      }
    }

    const body = {
      groupId: getQuery.group || null,
      memberName: state.memberName || null,
      mobileNumber: state.mobileNumber || null,
      isLeader: state.isLeader,
    };
    // console.log(body)

    // const url = `${process.env.BACKEND_URL}/account/addmember`;
    const url = `https://hcdti.savitechnig.com/account/addmember`;

    if (isValid) {
      setLoading(true);

      try {
        const response = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        // setMessages({ ...messages, success: response.data.success.message });
        setState(initialState);

        // console.log(response)

        if (response.data) {
          const last_url = JSON.parse(localStorage.getItem("last_url"));

          setLoading(false);

          enqueueSnackbar(`${response.data.reason}`, {
            variant: "success",
          });

          if (last_url) {
            localStorage.removeItem("last_url");
            router.push(`${last_url}`);
          }
        }
      } catch (e) {
        if (e.response) {
          // console.log(e.response)
          setLoading(false);

          if (e.response.data.detail) {
            enqueueSnackbar(`${e.response.data.detail}, Try again`, {
              variant: "error",
            });
          }

          if (e.response.data.reason) {
            enqueueSnackbar(`${e.response.data.reason}, Try again`, {
              variant: "error",
            });
          }

          // setState(initialState);
        }
      }
    }
  };

  return (
    <Layout path={path}>
      <NoSsr>
        <Box display="flex" style={{ width: "100%" }}>
          <Box className={classes.createBox}>
            <NoSsr>
              <Typography
                className={classes.typography}
                style={{
                  padding: "16px",
                  paddingLeft: "30px",
                  fontWeight: 600,
                }}
              >
                Create New Member
              </Typography>

              <Divider light />

              <Box>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={4}>
                    <Grid
                      className={classes.itemGrid}
                      item
                      md={6}
                      lg={6}
                      xl={6}
                    >
                      <Typography
                        className={clsx(classes.typography, classes.formTypo)}
                        variant="body1"
                        gutterBottom
                      >
                        Group Name<span style={{ color: "red" }}>*</span>
                      </Typography>
                      <TextField
                        className={classes.textField}
                        placeholder="Enter the group name"
                        id="groupName"
                        name="groupName"
                        type="text"
                        disabled
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        margin="normal"
                        value={getQuery.name}
                        onChange={handleChange}
                        onKeyUp={clearError}
                      />
                      {/* {messages.groupName && (
                        <Alert severity="error">{messages.groupName}</Alert>
                      )} */}
                    </Grid>

                    <Grid
                      className={classes.itemGrid}
                      item
                      md={6}
                      lg={6}
                      xl={6}
                    >
                      <Typography
                        className={clsx(classes.typography, classes.formTypo)}
                        variant="body1"
                        gutterBottom
                      >
                        Member Name<span style={{ color: "red" }}>*</span>
                      </Typography>
                      <TextField
                        className={classes.textField}
                        placeholder="Enter a name for the new memeber"
                        id="memberName"
                        name="memberName"
                        type="text"
                        variant="outlined"
                        autoFocus={true}
                        size="small"
                        required
                        fullWidth
                        margin="normal"
                        value={state.memberName}
                        onChange={handleChange}
                        onKeyUp={clearError}
                      />
                      {messages.memberName && (
                        <Alert severity="error">{messages.memberName}</Alert>
                      )}
                    </Grid>

                    <Grid
                      className={classes.itemGrid}
                      item
                      md={6}
                      lg={6}
                      xl={6}
                    >
                      <Typography
                        className={clsx(classes.typography, classes.formTypo)}
                        variant="body1"
                        gutterBottom
                      >
                        Phone Number<span style={{ color: "red" }}>*</span>
                      </Typography>
                      <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="Enter member phone number"
                        id="mobileNumber"
                        name="mobileNumber"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        margin="normal"
                        value={state.mobileNumber}
                        onChange={handleChange}
                        onKeyUp={clearError}
                      />
                      {messages.mobileNumber && (
                        <Alert severity="error">{messages.mobileNumber}</Alert>
                      )}
                    </Grid>
                    <Grid
                      className={classes.itemGrid}
                      item
                      md={6}
                      lg={6}
                      xl={6}
                    >
                      <Typography
                        className={clsx(classes.typography, classes.formTypo)}
                        variant="body1"
                        gutterBottom
                      >
                        Set Member As Leader?
                      </Typography>
                      <FormControl
                        variant="outlined"
                        // style={{ width: "100%" }}
                        className={classes.formControl}
                      >
                        <RadioGroup
                          row
                          aria-label="position"
                          name="isLeader"
                          id="isLeader"
                          value={state.isLeader}
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
                            labelPlacement="top"
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
                            labelPlacement="top"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading}
                      variant="contained"
                      style={{
                        backgroundColor: "#72A624",
                        color: "white",
                        width: "70px",
                        height: "40px",
                        opacity: "1",
                      }}
                      className={classes.submit}
                    >
                      {loading ? (
                        <CircularProgress
                          size="2em"
                          style={{ color: "#fff" }}
                        />
                      ) : (
                        // "Login"
                        <Typography
                          variant="body1"
                          className={classes.submitTypo}
                        >
                          Submit
                        </Typography>
                      )}
                    </Button>
                  </Box>
                </form>
              </Box>
            </NoSsr>
          </Box>
        </Box>
      </NoSsr>
    </Layout>
  );
}
