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
  TextareaAutosize,
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
import { Autocomplete, Alert, AlertTitle } from "@material-ui/lab";

import { useStateValue } from "../../../StateProviders";
import Layout from "./../../../Components/Layout";
import validations from "./../../../lib/validations";
import { isAuthenticated } from "./../../../lib/auth.helper";
import { maritalStatuses, educations, banks } from './../../../lib/places'
// import PrivateRoute from "./../../Components/PrivateRoute";


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
    paddingTop: "30px",
    paddingBottom: "20px",
    // fontSize: "14px",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "15px",
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
    height: "max-content",
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
}));


const fetcher = async (...arg) => {
  const [url, token] = arg;

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  return response.data;
};


const memberData = () => {
  const router = useRouter();
  const {mid} = router.query

  // const url = `${process.env.BACKEND_URL}/account/memberinfo/${mid}`
  const url = `https://hcdti.savitechnig.com/account/memberinfo/${mid}`;

  const token = isAuthenticated().auth_token;

  const options = {
    shouldRetryOnError: false,
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  const {
    data,
    error,
    mutate: memberMutate,
  } = useSWR([url, token], fetcher, { ...options });

  return {
    member: data,
    isLoading: !error && !data,
    isError: error,
    memberMutate,
  };
};


export default function EditMember() {
  const path = "/groups";
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const token = isAuthenticated().auth_token;

  const { member, isLoading, isError, memberMutate } = memberData();
  // console.log(member)


  const initialState = {
    memberName: null,
    mobileNumber: null,
    nameOfHusband: null,
    nextOfKin: null,
    nextOfKinMobile: null,
    custEducation: null,
    residentialAddress: null,
    busAddress: null,
    maritalStatus: null,
    typeOfBusiness: null,
    durationOfBusiness: null,
    familyInHcdti: false,
    amountOfPassbook: null,
    bank: null,
    accountNo: null,
    owningMFI: false,
    mfiName: null,
    nameOfGuarantor: null,
    guarantorRelationship: null,
    guarantorHomeAddress: null,
    guarantorOfficeAddress: null,
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(true);
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  useEffect(async () => {
    try {
      const member_chnage = await member

      if (member_chnage && check) {
        setState({ ...state, ...member.memberInfo, ...member.guarantor, ...member.businessInfo, ...member.personal })

        setCheck(false)
      }
    }catch(e) {
      console.log(e)
    }
  }, [member])

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "familyInHcdti") {
      memberMutate((data) => {
        return {
          ...member,
          result: { ...data.result, [name]: !state.familyInHcdti },
        };
      }, false);

      setState({ ...state, [name]: !state.familyInHcdti });
    } else if (name === 'owningMFI') {
      memberMutate((data) => {
        return {
          ...member,
          result: { ...data.result, [name]: !state.owningMFI },
        };
      }, false);

      setState({ ...state, [name]: !state.owningMFI });
    }else {
      memberMutate((data) => {
        return {
          ...member,
          result: { ...data.result, [name]: value },
        };
      }, false);

      setState({ ...state, [name]: value });
    }
  };

  const clearError = (e) => {
    const { name } = e.target;
    setMessages({ ...messages, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { mid } = router.query;

    let isValid = true;

    if (isValid) {
      const validatePass = validations(state.mobileNumber, "Phone Number", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, mobileNumber: validatePass.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validatePass = validations(state.amountOfPassbook, "Amount", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, amountOfPassbook: validatePass.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validatePass = validations(state.nextOfKinMobile, "Phone Number", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, nextOfKinMobile: validatePass.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validatePass = validations(state.accountNo, "Account Number", false, "digits");

      if (validatePass.status) {
        setMessages({ ...messages, accountNo: validatePass.message });
        isValid = false;
      }
    }

    const body = {
      memberName: state.memberName || null,
      mobileNumber: state.mobileNumber || null,
      nameOfHusband: state.nameOfHusband || null,
      nextOfKin: state.nextOfKin || null,
      nextOfKinMobile: state.nextOfKinMobile || null,
      custEduLevel: state.custEducation || null,
      residentAddress: state.residentialAddress || null,
      busAddress: state.busAddress || null,
      maritalStatus: state.maritalStatus || null,
      typeOfBusiness: state.typeOfBusiness || null,
      durationOfBusiness: state.durationOfBusiness || null,
      familyOnHcdtiGroup: state.familyInHcdti === true ? true : false,
      savingsInPassbook: state.amountOfPassbook || null,
      bank: state.bank || null,
      accountNo: state.accountNo || null,
      memberOwningMfi: state.owningMFI === true ? true : false,
      mfiName: state.mfiName || null,
      guarantor: state.nameOfGuarantor || null,
      guarantorRelationship: state.guarantorRelationship || null,
      guarantorAddress: state.guarantorHomeAddress || null,
      guarantorOfficeAddress: state.guarantorOfficeAddress || null,
    };
    // console.log(body)

    // const url = `${process.env.BACKEND_URL}/account/updatemember/${mid}`;
    const url = `https://hcdti.savitechnig.com/account/updatemember/${mid}`;

    if (isValid) {
      setLoading(true);

      try {
        const response = await axios.put(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        // console.log(response.data)

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

          if (!e.response.data.reason && !e.response.data.detail) {
            enqueueSnackbar(`Error Updating Member, Try again`, {
              variant: "error",
            });
          }
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
                Update Member Details
              </Typography>

              <Divider light />

              <Box>
                {isError ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    style={{
                      margin: "auto",
                      width: "100%",
                      borderRadius: "5px",
                      height: "100px",
                      padding: "100px",
                    }}
                  >
                    <Typography className={classes.typography}>
                      Error Getting Group Member Data
                    </Typography>
                  </Box>
                ) : isLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    style={{
                      width: "100%",
                      margin: "auto",
                      paddingLeft: 100,
                      paddingRight: 100,
                      paddingTop: 150,
                      paddingBottom: 150,
                    }}
                  >
                    <CircularProgress size="3em" style={{ color: "#362D73" }} />
                  </Box>
                ) : (
                  member && (
                    <form
                      className={classes.form}
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <Box display="flex" justifyContent="center">
                        <Typography
                          variant="h5"
                          gutterBottom
                        >
                          Member Information
                        </Typography>
                      </Box>
                      <Grid container spacing={4}>
                        <Grid
                          className={classes.itemGrid}
                          item
                          md={6}
                          lg={6}
                          xl={6}
                        >
                          <Typography
                            className={clsx(
                              classes.typography,
                              classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Group Name
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
                            value={state.groupName}
                            onChange={handleChange}
                            onKeyUp={clearError}
                          />
                        </Grid>

                        <Grid
                          className={classes.itemGrid}
                          item
                          md={6}
                          lg={6}
                          xl={6}
                        >
                          <Typography
                            className={clsx(
                              classes.typography,
                              classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Member Name
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
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Phone Number
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
                            <Alert severity="error">
                              {messages.mobileNumber}
                            </Alert>
                          )}
                        </Grid>
                      </Grid>

                      <Divider style={{ height: '5px', marginTop: '20px', marginBottom: '20px', background:'#000'}} light />

                      <Box display="flex" justifyContent="center" style={{paddingTop:'10px', paddingBottom:'10px'}}>
                        <Typography
                          variant="h5"
                          gutterBottom
                        >
                          Personal Information
                        </Typography>
                      </Box>

                      <Grid container spacing={4}>
                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Name Of Father/Husband
                          </Typography>
                          <TextField
                            className={classes.textField}
                            type="text"
                            placeholder="Enter member phone number"
                            id="nameOfHusband"
                            name="nameOfHusband"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            margin="normal"
                            value={state.nameOfHusband}
                            onChange={handleChange}
                            onKeyUp={clearError}
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Name of Next of Kin
                          </Typography>

                          <TextField
                            className={classes.textField}
                            type="text"
                            placeholder="Enter member phone number"
                            id="nextOfKin"
                            name="nextOfKin"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            margin="normal"
                            value={state.nextOfKin}
                            onChange={handleChange}
                            onKeyUp={clearError}
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Phone No of Next of Kin
                          </Typography>
                          <TextField
                            className={classes.textField}
                            type="text"
                            placeholder="Enter member phone number"
                            id="nextOfKinMobile"
                            name="nextOfKinMobile"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            margin="normal"
                            value={state.nextOfKinMobile}
                            onChange={handleChange}
                            onKeyUp={clearError}
                          />
                          {messages.nextOfKinMobile && (
                            <Alert severity="error">
                              {messages.nextOfKinMobile}
                            </Alert>
                          )}
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              // classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Formal Education
                          </Typography>
                          <Autocomplete
                            id="custEducation"
                            options={educations}
                            getOptionLabel={(option) => option}
                            classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                            value={state.custEducation}
                            onChange={(event, newValue) => {

                              const id = event.target.id;
                              const name = id.split("-")[0];

                              if (newValue !== null) {
                                setState({
                                  ...state,
                                  [name]: newValue,
                                });

                                memberMutate((data) => {
                                  return {
                                    ...member,
                                    result: { ...data.result, [name]: newValue },
                                  };
                                }, false);

                              } else {
                                setState({
                                  ...state,
                                  custEducation: "",
                                });

                                memberMutate((data) => {
                                  return {
                                    ...member,
                                    result: { ...data.result, custEducation: '' },
                                  };
                                }, false);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Formal Education"
                                size="small"
                                variant="outlined"
                                fullWidth
                                margin="none"
                              />
                            )}
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              // classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Residential Address
                          </Typography>

                          <TextareaAutosize
                            aria-label="residential"
                            placeholder="Enter the residential address"
                            minrows={3}
                            style={{ width: '100%', borderRadius: '5px', height: '95px' }}
                            value={state.residentialAddress}
                            name="residentialAddress"
                            onChange={(event) => handleChange(event)}
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              // classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Business Address
                          </Typography>

                          <TextareaAutosize
                            aria-label="residential"
                            placeholder="Enter the Business address"
                            minrows={3}
                            style={{ width: '100%', borderRadius: '5px', height: '95px' }}
                            value={state.busAddress}
                            name="busAddress"
                            onChange={(event) => handleChange(event)}
                          />

                          {messages.busAddress && (
                            <Alert severity="error">
                              {messages.busAddress}
                            </Alert>
                          )}
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              // classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Marital Status
                          </Typography>
                          <Autocomplete
                            id="maritalStatus"
                            options={maritalStatuses}
                            getOptionLabel={(option) => option}
                            classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                            value={state.maritalStatus}
                            onChange={(event, newValue) => {

                              const id = event.target.id;
                              const name = id.split("-")[0];

                              if (newValue !== null) {
                                setState({
                                  ...state,
                                  [name]: newValue,
                                });

                                memberMutate((data) => {
                                  return {
                                    ...member,
                                    result: { ...data.result, [name]: newValue },
                                  };
                                }, false);

                              } else {
                                setState({
                                  ...state,
                                  maritalStatus: "",
                                });

                                memberMutate((data) => {
                                  return {
                                    ...member,
                                    result: { ...data.result, maritalStatus: '' },
                                  };
                                }, false);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Marital Status"
                                size="small"
                                variant="outlined"
                                fullWidth
                                margin="none"
                              />
                            )}
                          />
                        </Grid>
                      </Grid>

                      <Divider style={{ height: '5px', marginTop: '20px', marginBottom: '20px', background: '#000' }} light />

                      <Box display="flex" justifyContent="center" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <Typography
                          variant="h5"
                          gutterBottom
                        >
                          Business Information
                        </Typography>
                      </Box>

                      <Grid container spacing={4}>
                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography, classes.formTypo)}
                          >
                            Type of Business
                          </Typography>

                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            className={classes.textField}
                            value={state.typeOfBusiness}
                            name="typeOfBusiness"
                            onChange={(event) => handleChange(event)}
                            placeholder="Enter the type of business"
                            onKeyUp={clearError}
                            id="typeOfBusiness"
                            size="small"
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography, classes.formTypo)}
                          >
                            How long is this business (years)?
                          </Typography>

                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            className={classes.textField}
                            value={state.durationOfBusiness}
                            name="durationOfBusiness"
                            onChange={(event) => handleChange(event)}
                            placeholder="For how long has customer been running the business"
                            onKeyUp={clearError}
                            id="durationOfBusiness"
                            size="small"
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography)}
                          >
                            Got family member registered in any HCDTI Group?
                          </Typography>

                          <RadioGroup
                            row
                            aria-label="position-family"
                            name="familyInHcdti"
                            id="familyInHcdti"
                            value={state.familyInHcdti === true ? true : false}
                            onChange={handleChange}
                            style={{ justifyContent: 'space-between', width: '70%' }}
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
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography, classes.formTypo)}
                          >
                            Amount of savings in passbook
                          </Typography>

                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            className={classes.textField}
                            value={state.amountOfPassbook}
                            name="amountOfPassbook"
                            onChange={(event) => handleChange(event)}
                            placeholder="Enter amount of savings in passbook"
                            onKeyUp={clearError}
                            id="amountOfPassbook"
                            size="small"
                          />

                          {messages.amountOfPassbook && (
                            <Alert severity="error">
                              {messages.amountOfPassbook}
                            </Alert>
                          )}
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              // classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Bank
                          </Typography>

                          <Autocomplete
                            id="bank"
                            options={banks}
                            // getOptionSelected={(option, value) =>
                            //   option === value
                            // }
                            getOptionLabel={(option) => option}
                            classes={{ inputRoot: classes.inputRoot, focused: classes.autoInput }}
                            value={state.bank}
                            onChange={(event, newValue) => {
                              const id = event.target.id;
                              const name = id.split("-")[0];

                              if (newValue !== null) {
                                setState({
                                  ...state,
                                  [name]: newValue,
                                });

                                memberMutate((data) => {
                                  return {
                                    ...member,
                                    result: { ...data.result, [name]: newValue },
                                  };
                                }, false);

                              } else {
                                setState({
                                  ...state,
                                  bank: "",
                                });

                                memberMutate((data) => {
                                  return {
                                    ...member,
                                    result: { ...data.result, bank: '' },
                                  };
                                }, false);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Marital Status"
                                size="small"
                                variant="outlined"
                                fullWidth
                                margin="none"
                              />
                            )}
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography, classes.formTypo)}
                          >
                            Account Number
                          </Typography>

                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            className={classes.textField}
                            value={state.accountNo}
                            name="accountNo"
                            onChange={(event) => handleChange(event)}
                            placeholder="Enter customer account number"
                            onKeyUp={clearError}
                            id="accountNo"
                            size="small"
                          />

                          {messages.accountNo && (
                            <Alert severity="error">
                              {messages.accountNo}
                            </Alert>
                          )}
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography)}
                          >
                            Indebted to any MFB/MFI?
                          </Typography>

                          <RadioGroup
                            row
                            aria-label="position-family"
                            name="owningMFI"
                            id="owningMFI"
                            value={state.owningMFI === true ? true : false}
                            // value={true}
                            onChange={handleChange}
                            style={{ justifyContent: 'space-between', width: '70%' }}
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
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography, classes.formTypo)}
                          >
                            MFB/MFI Name
                          </Typography>

                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            className={classes.textField}
                            value={state.mfiName}
                            name="mfiName"
                            onChange={(event) => handleChange(event)}
                            placeholder="Enter name of mfb/mfi"
                            onKeyUp={clearError}
                            id="mfiName"
                            size="small"
                          />
                        </Grid>
                      </Grid>

                      <Divider style={{ height: '5px', marginTop: '20px', marginBottom: '20px', background: '#000' }} light />

                      <Box display="flex" justifyContent="center" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                        <Typography
                          variant="h5"
                          gutterBottom
                        >
                          Guarantor Information
                        </Typography>
                      </Box>
                      
                      <Grid container spacing={4}>
                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography, classes.formTypo)}
                          >
                            Name of Guarantor
                          </Typography>

                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            className={classes.textField}
                            value={state.nameOfGuarantor}
                            name="nameOfGuarantor"
                            onChange={(event) => handleChange(event)}
                            placeholder="Enter the name of the Guarantor"
                            onKeyUp={clearError}
                            id="nameOfGuarantor"
                            size="small"
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            variant="body1"
                            gutterBottom
                            className={clsx(classes.typography, classes.formTypo)}
                          >
                            Relationship with Member
                          </Typography>

                          <TextField
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                            className={classes.textField}
                            value={state.guarantorRelationship}
                            name="guarantorRelationship"
                            onChange={(event) => handleChange(event)}
                            placeholder="Enter guarantor’s relationship with borrower"
                            onKeyUp={clearError}
                            id="guarantorRelationship"
                            size="small"
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              // classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Guarantor’s Home Address
                          </Typography>

                          <TextareaAutosize
                            aria-label="home"
                            placeholder="Enter the residential address"
                            minrows={3}
                            style={{ width: '100%', borderRadius: '5px', height: '95px' }}
                            value={state.guarantorHomeAddress}
                            name="guarantorHomeAddress"
                            onChange={(event) => handleChange(event)}
                          />
                        </Grid>

                        <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              // classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Guarantor’s Office Address
                          </Typography>

                          <TextareaAutosize
                            aria-label="office"
                            placeholder="Enter the office address"
                            minrows={3}
                            style={{ width: '100%', borderRadius: '5px', height: '95px' }}
                            value={state.guarantorOfficeAddress}
                            name="guarantorOfficeAddress"
                            onChange={(event) => handleChange(event)}
                          />
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
                              Update
                            </Typography>
                          )}
                        </Button>
                      </Box>
                    </form>
                  )
                )}
              </Box>
            </NoSsr>
          </Box>
        </Box>
      </NoSsr>
    </Layout>
  );
}
