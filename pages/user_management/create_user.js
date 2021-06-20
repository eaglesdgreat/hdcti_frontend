import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Hidden,
  TextField,
  CircularProgress,
  Divider,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import useSWR from "swr";
import ReactLoading from "react-loading";
import { useRouter } from "next/router";
import { PieChart } from "react-minimal-pie-chart";

// import { useStateValue } from '../../StateProviders';
import TableLayout from "./../../Components/Tables";
import Layout from "./../../Components/Layout";
// import { isAuthenticated } from "./../../lib/auth.helper";
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
      height: '38px',
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
      width: "89%", // Fix IE 11 issue.
      marginTop: theme.spacing(4),
      // fontSize: "14px",
      margin:'auto'
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
    createBox: {
        background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
        border: "1px solid var(--unnamed-color-e0e0e0)",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "1px solid #E0E0E0",
        borderRadius: "5px",
        opacity: "1",
        height: "562px",
        width:"98%",
    }
  }));


export default function Home() {
    const path = '/create_user'
    const classes = useStyles()
    const router = useRouter()

    const errorMessageStyle = {
      color: "red",
      fontSize: "10px",
      fontWeight: "bolder",
      fontStyle: "oblique",
    }
  
    const initialState = {
      email: '',
      username: '',
      password: '',
      role: '',
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
      }
  
  
      const url = `${process.env.BACKEND_URL}/account/token/login`;
  
      if (isValid) {
        setLoading(true); 
  
        try {
          const response = await axios.post(url, body)
  
          setMessages({ ...messages, success: response.data.success.message });
          setState(initialState)
          
          // console.log(response)
  
          if (response.data) {
            authenticate(response.data, () => {
              return router.push('/dashboard')
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
      <Layout path={path}>
        <Box display="flex" style={{width:"100%"}}>
          <Box className={classes.createBox}>
            <Typography
              className={classes.typography}
              style={{
                padding: "16px",
                paddingLeft: "30px",
                fontWeight: 600,
              }}
            >
              Create New User
            </Typography>

            <Divider light />

            <Box>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Typography
                      className={classes.typography}
                      style={{
                        marginBottom: "-11px",
                      }}
                    >
                      Email
                    </Typography>
                    <TextField
                      className={classes.textField}
                      // type="email"
                      placeholder="Enter the email address of the user"
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
                      <span style={errorMessageStyle}>{messages.email}</span>
                    )}
                  </Grid>

                  <Grid item xs={6} sm={6}>
                    <Typography
                      className={classes.typography}
                      style={{
                        marginBottom: "-11px",
                      }}
                    >
                      Username
                    </Typography>
                    <TextField
                      className={classes.textField}
                      // type="email"
                      placeholder="Enter a username for the user"
                      id="username"
                      name="username"
                      type="text"
                      variant="outlined"
                      size="small"
                      autoFocus
                      required
                      fullWidth
                      margin="normal"
                      value={state.username}
                      onChange={handleChange}
                      // onKeyUp={''}
                    />
                    {messages.email && (
                      <span style={errorMessageStyle}>{messages.username}</span>
                    )}
                  </Grid>

                  <Grid item xs={6} sm={6}>
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
                  <Grid item></Grid>
                </Grid>

                <Box display="flex" justifyContent="flex-end">
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
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </Layout>
    );
}