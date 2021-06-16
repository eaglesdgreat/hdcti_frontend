import React, { useState } from 'react';
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
// import { useStateValue } from '../StateProviders';
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { authenticate } from './../lib/auth.helper'

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
    return { message: `${name} is required`, status: true }
  }

  // validation for email field 
  if (type === 'email' && !emailRegex.test(value)) {
    return { message: `${name} is invalid`, status: true }
  }

  // validation for password 
  if (type === 'password' && !passwordRegex.test(value)) {
    return { message: `${name} must contain at least a number and a letter`, status: true }
  }

  return { message: '', status: false };
}

export default function Index() {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  // const [{ basket }, dispatch] = useStateValue();

  // // console.log(basket)

  // const addToBasket = () => {
  //   dispatch({
  //     type: 'ADD_TO_BASKET',
  //     item: {
  //       id: 1,
  //       name: 'product name'
  //     }
  //   })
  // }
  const errorMessageStyle = {
    color: "red",
    fontSize: "10px",
    fontWeight: "bolder",
    fontStyle: "oblique",
  }

  const initialState = {
    email: '',
    password: ''
  }

  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState({
    ...initialState,
    success: '',
    failure: '',
  })
  const [newType, setNewType] = useState('password')

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
  }

  const changeType = () => {
    if(newType === 'password') {
      setNewType('text')
    }

    if(newType === 'text') {
      setNewType('password')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValid = true

    if (isValid) {
      const validate = validations(state.email, 'Email', true, 'email');
      if (validate.status) {
        setMessages({ ...messages, email: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validatePass = validations(state.password, 'password');
      if (validatePass.status) {
        setMessages({ ...messages, password: validatePass.message });
        isValid = false;
      }
    }

    const body = {
      email: state.email || null,
      password: state.password || null,
      pageFrom: 'vendor',
    }


    const url = `https://hcdti.savitechnig.com/account/token/login`;

    if (isValid) {
      setLoading(true); 

      try {
        const response = await axios.post(url, body, {headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }})

        setMessages({ ...messages, success: response.data.success.message });
        setState(initialState)
        
        console.log(response)

        if (response.data) {
          authenticate(response.data, () => {
            // return router.push('/products')
            return
          })
          setLoading(false); 

          enqueueSnackbar(
            `${response.data.success}. You are being redirected to your dashboard`,
            {
              variant: "success",
            }
          );
        }
      } catch (e) {
        if (e.response) {
          console.log(e.response)
          setLoading(false); 

          setMessages({ ...messages, failure: e.response.data.errors.message })
          enqueueSnackbar(`${e.response.data.errors.message}. Try again`, {
            variant: 'error',
          });
          setState(initialState)
        }
      }
    }
  }


  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Box display="flex" className={classes.box}>
          <Card className={classes.card}>
            <CardContent style={{ padding: "0px" }}>
              <Typography
                className={classes.typography}
                style={{
                  padding: "16px",
                  paddingLeft: "30px",
                  fontWeight: 600,
                }}
              >
                Login
              </Typography>

              <Divider light />

              {/* {messages.failure && (
                <span style={errorMessageStyle}>{messages.failure}</span>
              )} */}

              <Box
                display="flex"
                justifyContent="center"
                className={classes.box}
                // style={{ width: '60%' }}
              >
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
                        Username or Email
                      </Typography>
                      <TextField
                        className={classes.textField}
                        // type="email"
                        placeholder="Enter your username or email"
                        id="email"
                        name="email"
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
                        <span style={errorMessageStyle}>{messages.email}</span>
                      )}
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Typography
                        className={classes.typography}
                        style={{
                          marginBottom: "-11px",
                        }}
                      >
                        Password
                      </Typography>
                      <TextField
                        className={classes.textField}
                        type={newType}
                        placeholder="Enter your password"
                        id="password"
                        name="password"
                        variant="outlined"
                        size="small"
                        autoFocus
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
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
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
                      <CircularProgress size="2em" style={{ color: "#fff" }} />
                    ) : (
                      // "Login"
                      <Typography
                        // className={classes.typography}
                        style={
                          {
                            font: 'var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)',
                            letterSpacing: 'var(--unnamed-character-spacing-0)',
                            color: 'var(--unnamed-color-ffffff)',
                            textAlign: 'center',
                            font: 'normal normal 600 14px/21px Poppins',
                            letterSpacing: '0px',
                            color: '#FFFFFF',
                            opacity: '1',
                            textTransform:'capitalize',
                          }
                        }
                      >
                        Login
                      </Typography>
                    )}
                  </Button>
                </form>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}
