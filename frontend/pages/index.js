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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
// import { useStateValue } from '../StateProviders';
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'

import { authenticate } from './../lib/auth.helper'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    margin: 'auto',
    // paddingTop: 100,
    // paddingBottom: 250,
    background: '#ECF1F2 0% 0% no-repeat padding-box',
    background: 'var(--unnamed-color-ecf1f2) 0% 0% no-repeat padding-box',
    opacity:'1',
  },
  card: {
    width: '529px',
    height: 'auto',
    // paddingTop: '5%',
    // paddingBottom: '5%',
    margin: 'auto',
    alignItems: 'center',
    // borderRadius: '10px'
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed-color-e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius:'5px',
    opacity: '1',
  },
  box: {
    width: '80%',
    margin: 'auto',
    alignItem: 'center',
    // border: '1px solid red',
  },
  typography: {
    lineHeight: '35px',
    fontSize: '25px',
    fontWeight: 'bold',
    fontFamily: 'Source Sans Pro',
    letterSpacing: '0.01em',
    fontStyle: 'normal',
    color: '#000000',
    textAlign: 'center',
  },
  textField: {
    borderRadius: "6px",
    // height: '45px',
    margin: 'auto',
    '& input': {
      color: '#182C51',
      fontSize: '16px',
      fontWeight: 'bold',
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      lineHeight: '20px',
    },
    "& ::placeholder": { fontSize: "12px", fontWeight: '500' },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    fontSize: "14px"
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    fontSize: "14px",
    boxShadow: "none",
    padding: '10px',
    fontWeight: '600',
    marginTop: theme.spacing(4),
  },
}))

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

  const handleChange = (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
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


    const url = `${process.env.BACKEND_URL}/api/auth/login`

    if (isValid) {
      setLoading(true); 

      try {
        const response = await axios.post(url, body)

        setMessages({ ...messages, success: response.data.success.message });
        setState(initialState)
        
        // console.log(response.data)
        enqueueSnackbar(`${response.data.success}. You are being redirected to your dashboard`, {
          variant: 'success',
        });

        if (response.data) {
          authenticate(response.data, () => {
            return router.push('/products')
          })
        }
      } catch (e) {
        if (e.response) {
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
        <Box
          display="flex"
          className={classes.box}
        >
          <Card className={classes.card}>

            <CardContent>
              <Typography className={classes.typography}>
                Login
              </Typography>

              {/* {messages.failure && (
                <span style={errorMessageStyle}>{messages.failure}</span>
              )} */}

              <Box
                display="flex"
                justifyContent="center"
                className={classes.box}
                style={{ width: '60%' }}
              >
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        className={classes.textField}
                        type="email"
                        placeholder="Email"
                        id="email"
                        name='email'
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
                      <TextField
                        className={classes.textField}
                        type="password"
                        placeholder="Password"
                        id="password"
                        name='password'
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
                      {messages.password && (
                        <span style={errorMessageStyle}>{messages.password}</span>
                      )}
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "#FF5C00", color: "white" }}
                    className={classes.submit}
                  >
                    {loading ? <CircularProgress size="2em" style={{ color: '#fff' }} /> : 'LOGIN'}
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
