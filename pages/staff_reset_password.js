import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  Box,
  Container,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { useStateValue } from '../StateProviders';
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSnackbar } from "notistack";
import clsx from 'clsx'

import { authenticate } from './../lib/auth.helper'
import { loginUser  } from '../lib/login.user';

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
  card2: {
    width: "529px",
    height: "555px",
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
  box: {
    width: "100%",
    // margin: 'auto',
    // alignItem: 'center',
    // border: '1px solid red',
  },
  typography: {
    // lineHeight: '35px',
    // fontSize: '25px',
    // fontWeight: 'bold',
    // fontFamily: 'Source Sans Pro',
    // letterSpacing: '0.01em',
    // fontStyle: 'normal',
    // color: '#000000',
    // textAlign: 'center',
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
    // height: '45px',
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
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: "1",
  },
  form: {
    width: "89%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    fontSize: "14px",
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
    "&:hover,&:focus": {
      background: "#ffffff00",
    },
  },
}));


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;


// validate input field 
const validations = (value, name, required = true, type, secondValue) => {
  // validation for required field
  if (required && !value) {
    return { message: `${name} is required`, status: true };
  }

  // validation for email field
  if (type === "email" && !emailRegex.test(value)) {
    return { message: `${name} is invalid`, status: true };
  }

  // validation for password length field
  if (type === "password" && value.length < 7) {
    return {
      message: `${name} must be at least 7 characters long`,
      status: true,
    };
  }

  // validation for digit field
  if (type === "digits" && !/^[0-9]+$/.test(value)) {
    return { message: `${name} must contain only numbers`, status: true };
  }

  // validation for password
  if (type === "password" && value.length >= 7 && !passwordRegex.test(value)) {
    return {
      message: `${name} must contain at least a number and a letter`,
      status: true,
    };
  }

  // validations for comparism
  if (type === "compare" && value !== secondValue) {
    return { message: `passwords do not match`, status: true };
  }

  return { message: "", status: false };
}

const adminLogin = async () => {
  let token = ''

  const body = {
    email: "admin@gmail.com",
    password: "1234",
  };
  const url = `https://hcdti.savitechnig.com/account/token/login`;

  try {
    const response = await axios.post(url, body);

    if (response.data) {
      token = response.data.auth_token;
    }
  } catch (e) {
    if (e.response) {
      return
      // console.log(e.response);
    }
  }

  return token;
}


export default function Index() {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [{ adminToken }, dispatch] = useStateValue();

  const addToBasket = (token) => {
    dispatch({
      type: "SAVE_TOKEN",
      item: token,
    });
  };

  const errorMessageStyle = {
    color: "red",
    fontSize: "10px",
    fontWeight: "bolder",
    fontStyle: "oblique",
  };

  const initialState = {
    email: "",
    password: "",
    confirm_password: "",
    otp: "",
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [newType, setNewType] = useState("password");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const changeType = () => {
    if (newType === "password") {
      setNewType("text");
    }

    if (newType === "text") {
      setNewType("password");
    }
  };

  const sendMail = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (isValid) {
      const validate = validations(state.email, "Email", true, "email");
      if (validate.status) {
        setMessages({ ...messages, email: validate.message });
        isValid = false;
      } else {
        setMessages({ ...messages, email: "" });
      }
    }

    const body = {
      email: state.email || null,
    };
    // console.log(body);

    // const url = `${process.env.BACKEND_URL}/account/token/login`;
    const url = `https://hcdti.savitechnig.com/account/reset_password_otp`;

    if (isValid) {
      if (resetLoading) {
        setLoading(false);
      } else {
        setLoading(true);
      }
      let tok = await adminLogin();
      // console.log('tok:',tok)

      if (tok) {
        // dispatch({
        //   type: "SAVE_TOKEN",
        //   item: '',
        // });
        // addToBasket(tok);

        try {
          const response = await axios.post(url, body, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${tok}`,
            },
          });

          if (response.data) {
            setLoading(false);
            setResetLoading(false);
            tok = "";

            enqueueSnackbar(`${response.data.reason}`, {
              variant: "success",
            });

            setOpen(true);
          }
        } catch (e) {
          if (e.response) {
            console.log(e.response);
            setLoading(false);

            enqueueSnackbar(`Checkk your connection or invalid email`, {
              variant: "error",
            });
          }
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (isValid) {
      const validateOTP = validations(state.otp, "OTP", true, "digits");

      if (validateOTP.status) {
        setMessages({ ...messages, otp: validateOTP.message });
        isValid = false;
      } else {
        setMessages({ ...messages, otp: "" });
      }
    }

    if (isValid) {
      const validatePass = validations(
        state.password,
        "Password",
        true,
        "password"
      );

      if (validatePass.status) {
        setMessages({ ...messages, password: validatePass.message });
        isValid = false;
      } else {
        setMessages({ ...messages, password: "" });
      }
    }

    if (isValid) {
      const validateCP = validations(
        state.confirm_password,
        "Password Confirmation",
        true,
        "compare",
        state.password
      );

      if (validateCP.status) {
        setMessages({ ...messages, confirm_password: validateCP.message });
        isValid = false;
      } else {
        setMessages({ ...messages, confirm_password: "" });
      }
    }

    const body = {
      email: state.email || null,
      password: state.password || null,
      re_password: state.confirm_password || null,
      otp_code: state.otp || null,
    };
    // console.log(body)

    // const url = `${process.env.BACKEND_URL}/account/reset_password_confirm`;
    const url = `https://hcdti.savitechnig.com/account/reset_password_confirm`;

    if (isValid) {
      setLoading(true);

      try {
        const response = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // console.log(response);

        if (response.data) {
            enqueueSnackbar(`You have successfully change your password.`, {
              variant: "success",
            });

            setLoading(false);

            setState(initialState);

            router.push("/");
        }
      } catch (e) {
        if (e.response) {
          // console.log(e.response);

          setLoading(false);

          if(e.response.data.reason) {
            enqueueSnackbar(`${e.response.data.reason}, Try again.`, {
              variant: "error",
            });
          } else {
            enqueueSnackbar(`Passowrd change failed, Try again.`, {
              variant: "error",
            });
          }
          // setState(initialState);
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Box display="flex" className={classes.box}>
          <Card className={clsx(classes.card, open && classes.card2)}>
            <CardContent style={{ padding: "0px" }}>
              <Typography
                className={classes.typography}
                style={{
                  padding: "16px",
                  paddingLeft: "30px",
                  fontWeight: 600,
                }}
              >
                {open ? "Create New Password" : "Staff Reset Password"}
              </Typography>

              <Divider light />

              <Box
                display="flex"
                justifyContent="center"
                className={classes.box}
                // style={{ width: '60%' }}
              >
                {open === false ? (
                  <form className={classes.form} noValidate onSubmit={sendMail}>
                    <Grid container spacing={6}>
                      <Grid item xs={12} sm={12}></Grid>
                      <Grid item xs={12} sm={12}>
                        <Typography
                          className={classes.typography}
                          style={{
                            marginBottom: "-11px",
                          }}
                        >
                          Email<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          className={classes.textField}
                          // type="email"
                          placeholder="Enter your email to reset password"
                          id="email"
                          name="email"
                          type="email"
                          variant="outlined"
                          size="small"
                          autoFocus
                          required
                          fullWidth
                          margin="normal"
                          value={state.email}
                          onChange={handleChange}
                          // onKeyUp={''}
                        />
                        {messages.email && (
                          <span style={errorMessageStyle}>
                            {messages.email}
                          </span>
                        )}
                      </Grid>
                    </Grid>

                    <Box display="flex">
                      <div
                        style={{
                          width: "45%",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={loading}
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
                              // className={classes.typography}
                              style={{
                                font: "var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
                                letterSpacing:
                                  "var(--unnamed-character-spacing-0)",
                                color: "var(--unnamed-color-ffffff)",
                                textAlign: "center",
                                font: "normal normal 600 14px/21px Poppins",
                                letterSpacing: "0px",
                                color: "#FFFFFF",
                                opacity: "1",
                                textTransform: "capitalize",
                              }}
                            >
                              Send
                            </Typography>
                          )}
                        </Button>
                      </div>
                    </Box>
                  </form>
                ) : (
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <Grid container spacing={6}>
                      <Grid item xs={12} sm={12}>
                        <Typography
                          className={classes.typography}
                          style={{
                            marginBottom: "-11px",
                          }}
                        >
                          OTP<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          className={classes.textField}
                          // type="email"
                          placeholder="Enter otp sent to your mail"
                          id="otp"
                          name="otp"
                          type="text"
                          variant="outlined"
                          size="small"
                          autoFocus
                          required
                          fullWidth
                          margin="normal"
                          value={state.otp}
                          onChange={handleChange}
                          // onKeyUp={''}
                        />
                        {messages.otp && (
                          <span style={errorMessageStyle}>{messages.otp}</span>
                        )}
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Typography
                          className={classes.typography}
                          style={{
                            marginBottom: "-11px",
                          }}
                        >
                          New Password<span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          className={classes.textField}
                          type={newType}
                          placeholder="Enter your new password"
                          id="password"
                          name="password"
                          variant="outlined"
                          size="small"
                          required
                          fullWidth
                          margin="normal"
                          value={state.password}
                          onChange={handleChange}
                          // onKeyUp={''}
                        />
                        <Box display="flex" justifyContent="space-between">
                          <div
                            style={{
                              width: "50%",
                            }}
                          >
                            {messages.password && (
                              <span style={errorMessageStyle}>
                                {messages.password}
                              </span>
                            )}
                          </div>

                          <div
                            style={{
                              width: "50%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              onClick={changeType}
                              className={classes.showPass}
                              style={{ fontSize: "10px", marginTop: "-11px" }}
                            >
                              Show password
                            </Button>
                          </div>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Typography
                          className={classes.typography}
                          style={{
                            marginBottom: "-11px",
                          }}
                        >
                          Confirm Password
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <TextField
                          className={classes.textField}
                          type="password"
                          placeholder="Enter your new password again"
                          id="confirm_password"
                          name="confirm_password"
                          variant="outlined"
                          size="small"
                          required
                          fullWidth
                          margin="normal"
                          value={state.confirm_password}
                          onChange={handleChange}
                          // onKeyUp={''}
                        />
                        {messages.confirm_password && (
                          <span style={errorMessageStyle}>
                            {messages.confirm_password}
                          </span>
                        )}
                      </Grid>
                    </Grid>

                    <Box display="flex">
                      <div
                        style={{
                          width: "45%",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          disabled={loading}
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
                              // className={classes.typography}
                              style={{
                                font: "var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
                                letterSpacing:
                                  "var(--unnamed-character-spacing-0)",
                                color: "var(--unnamed-color-ffffff)",
                                textAlign: "center",
                                font: "normal normal 600 14px/21px Poppins",
                                letterSpacing: "0px",
                                color: "#FFFFFF",
                                opacity: "1",
                                textTransform: "capitalize",
                              }}
                            >
                              Send
                            </Typography>
                          )}
                        </Button>
                      </div>

                      <div
                        style={{
                          width: "45%",
                          display: "flex",
                          justifyContent: "flex-end",
                          margin: "auto",
                          paddingTop: "48px",
                        }}
                      >
                        <Button
                          onClick={(event) => {
                            setResetLoading(true);
                            sendMail(event);
                          }}
                          className={classes.showPass}
                          style={{ fontSize: "12px" }}
                        >
                          {resetLoading ? "Resending OTP..." : "Resend OTP"}
                        </Button>
                      </div>
                    </Box>
                  </form>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}
