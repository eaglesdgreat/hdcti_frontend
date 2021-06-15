import React, { useState } from 'react'
import Layout from './Layout'
// import http from 'http2'
import {
  Box,
  Typography,
  Button,
  Divider,
  AppBar,
  Tabs,
  Tab,
  withWidth,
  Toolbar,
  Hidden,
  Modal,
  Backdrop,
  Fade,
  InputBase,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import clsx from 'clsx';
import axios from 'axios';
import { Add, Close } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert';
import { useSnackbar } from 'notistack'

import validations from '../lib/validations';
import { isAuthenticated } from './../lib/auth.helper'



const useStyles = makeStyles((theme) => ({
  typography: {
    fontfamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    color: '#2F3237',
    lineHeight: '28px',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#FFFFFF',
  },
  appbar: {
    backgroundColor: '#FFFFFF00',
    boxShadow: 'none',
    color: '#242120',
    display: 'flex',
    width: '100%',
  },
  tab1: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "50%",
      width: "50%",
    }
  },
  indicator: {
    backgroundColor: '#FF5C00',
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
  scrollmenu: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  anchor: {
    display: 'inline-block',
    textDecoration: 'none',
    padding: '14px',
  },
  bodyWidth: {
    width: '95%',
    maxWidth: "1440px",
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.down('md')]: {
      width: '96%',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#FFFFFF",
    borderRadius: '8px',
    border: "none",
    height: '98%',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 8, 3),
    "&:focus": {
      outline: "none"
    }
  },
  textField: {
    border: "1px solid #EAEAEA",
    borderRadius: "5px",
    width: "100%",
    height: "42px",
    padding: "1rem",
    fontSize: "0.9rem",
  },
  label: {
    color: "000000, 90%",
    fontWeight: 400,
  },
  buttonBox: {
    textAlign: "right",
    margin: "1.5rem 0 2rem 0",
  },
  usertype: {
    display: 'block',
    '& > label > span.MuiFormControlLabel-label': {
      fontSize: '14px'
    },
    '& > label > span > span > div > svg.MuiSvgIcon-root': {
      height: '0.7em',
      width: '0.7em'
    }
  }
}))



function AddAdmin() {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const errorMessageStyle = {
    color: "red",
    fontSize: "11px",
    fontWeight: "bold",
    fontStyle: "normal",
    marginBottom: "1.0rem"
  };

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    // password: bcrypt.hashSync('pass12345', 10),
    password: 'passwordadmin12345',
    userType: 'vendor',
    pageFrom: 'vendor',
    address: "",
    city: "",
    state: "",
    gender: '',
    phone: "",
    department: '',
  };

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState({
    ...initialState, success: '', failure: ''
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [input, setInput] = useState(initialState);

  const handleAddInfluencerOpen = () => {
    setOpen(true);
  };

  const handleAddInfluencerClose = () => {
    setOpen(false);
    setInput(initialState);
    setMessages({ ...initialState, success: '', failure: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }


  const validateField = (e) => {

    if (e.target.name === 'firstName') {
      const validate = validations(input.firstName, 'First Name');
      if (validate.status) {
        setMessages({ ...messages, firstName: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, firstName: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'lastName') {
      const validate = validations(input.lastName, 'Last Name');
      if (validate.status) {
        setMessages({ ...messages, lastName: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, lastName: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'email') {
      const validate = validations(input.email, 'Email', true, 'email');
      if (validate.status) {
        setMessages({ ...messages, email: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, email: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'phone') {
      const validate = validations(input.phone, 'Phone Number', true, 'digits');
      if (validate.status) {
        setMessages({ ...messages, phone: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, phone: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'password') {
      const validate = validations(input.password, 'Password', true, 'password');
      if (validate.status) {
        setMessages({ ...messages, password: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, password: '', success: '', failure: '' });
      }
    }


    if (e.target.name === 'confirm_password') {
      const validate = validations(input.confirm_password, 'Confirm Password', true, 'compare', input.password);
      if (validate.status) {
        setMessages({ ...messages, confirm_password: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, confirm_password: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'address') {
      const validate = validations(input.address, 'Address');
      if (validate.status) {
        setMessages({ ...messages, address: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, address: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'state') {
      const validate = validations(input.state, 'State');
      if (validate.status) {
        setMessages({ ...messages, state: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, state: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'department') {
      const validate = validations(input.department, 'Department');
      if (validate.status) {
        setMessages({ ...messages, department: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, department: '', success: '', failure: '' });
      }
    }

    if (e.target.name === 'city') {
      const validate = validations(input.city, 'City');
      if (validate.status) {
        setMessages({ ...messages, city: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, city: '', success: '', failure: '' });
      }
    }
  }

  // Add influencer form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    if (isValid) {
      const validate = validations(input.firstName, 'First Name');
      if (validate.status) {
        setMessages({ ...messages, firstName: validate.message });
        isValid = false;
      }
    }


    if (isValid) {
      const validate = validations(input.lastName, 'Last Name');
      if (validate.status) {
        setMessages({ ...messages, lastName: validate.message });
        isValid = false;
      }
    }


    if (isValid) {
      const validate = validations(input.email, 'Email', true, 'email');
      if (validate.status) {
        setMessages({ ...messages, email: validate.message });
        isValid = false;
      }
    }


    if (isValid && input.phone) {
      const validate = validations(input.phone, 'Phone Number', true, 'digits');
      if (validate.status) {
        setMessages({ ...messages, phone: validate.message });
        isValid = false;
      }
    }


    if (isValid) {
      const validate = validations(input.password, 'Password', true, 'password');
      if (validate.status) {
        setMessages({ ...messages, password: validate.message });
        isValid = false;
      }
    }


    if (isValid) {
      const validate = validations(input.confirm_password,
        'Password Confirmation', true, 'compare', input.password);
      if (validate.status) {
        setMessages({ ...messages, confirm_password: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validate = validations(input.city, 'City');
      if (validate.status) {
        setMessages({ ...messages, city: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validate = validations(input.address, 'Address');
      if (validate.status) {
        setMessages({ ...messages, address: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validate = validations(input.state, 'State');
      if (validate.status) {
        setMessages({ ...messages, state: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validate = validations(input.department, 'Department');
      if (validate.status) {
        setMessages({ ...messages, department: validate.message });
        isValid = false;
      }
    }

    const body = {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      department: input.department,
      password: input.password,
      city: input.city,
      address: input.address,
      state: input.state,
      gender: input.gender,
      pageFrom: input.pageFrom,
      userType: input.userType,
    }
    // console.log(body)
    const url = `${process.env.BACKEND_URL}/api/auth/signup`

    // if (isValid) {
      setLoading(true);

      try {
        const response = await axios.post(
          url,
          body,
        )
        console.log(response.data)

        // const router = useRouter()

        // if (response.data.success === true) {
        // router.push('/verifyemail')
        setLoading(false);

        // setMessages({ ...messages, success: response.data.success });
        setInput(initialState);
        setOpen(false);

        enqueueSnackbar(`${response.data.success}`, {
          variant: 'success',
        });
        // }

      } catch (e) {
        console.log(e.response);

        setLoading(false);

        if (e.response) {
          if (e.response.status >= 500) {
          //   setMessages({
          //     ...messages, failure:
          //       `We are sorry. We can't process your 
          // request at the moment, please try again later` })

            enqueueSnackbar("We are sorry. We can't process your request at the moment, please try again later", {
              variant: 'error',
            });
          } else {
            // setMessages({ ...messages, failure: e.response.data.response_message })
            enqueueSnackbar(`${e.response.data.errors.message}. Try again`, {
              variant: 'error',
            });
          }
        }

      }

    // }
  }

  const clearError = () => {
    setInput(initialState);
    setMessages({ ...initialState, success: '', failure: '' });
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        // marginTop: '-50px',
        // paddingLeft: '2.5%',
        width: '100%',
      }}
    >
      <Box style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
      }}>
        {/* <Typography className={classes.typography}>
          {name}
        </Typography> */}
        <Button style={{
          background: "#FFFFFF",
          color: "#FF5C00",
          borderRadius: "6px",
          border: '1px solid #FF5C00',
        }}
          onClick={handleAddInfluencerOpen}
        >
          <Add style={{ fontSize: "1.0rem", marginRight: "0.1rem" }} />
          <Typography style={{ fontSize: "0.6rem", fontWeight: 500 }}>
            ADMIN
          </Typography>
        </Button>
      </Box>

      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleAddInfluencerClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box className={classes.paper}>
              <Box
                display="flex"
              >
                <h2 style={{ marginBottom: "1.5rem", color: '#FF5C00' }} id="transition-modal-title">Add Admin User</h2>

                <Button
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderRadius: "2px",
                    width: "4.2rem",
                    padding: 0,
                    marginLeft: "15.5rem"
                  }}
                  size="small"
                  disableRipple
                  onClick={handleAddInfluencerClose}
                >
                  <Close style={{
                    fontWeight: 500, fontSize: "1.2rem",
                    color: "#000000", marginRight: "0.3rem"
                  }} />
                  <Typography style={{ fontWeight: 400, color: "#242120" }}>
                    Close
                  </Typography>
                </Button>
              </Box>

              {messages.failure &&
                <Alert severity="error" style={{ width: '100%' }}
                  onClose={() => clearError('failure')}
                  color="error">
                  {messages.failure}
                </Alert>
              }

              {messages.success &&
                <Alert severity="success" style={{ width: '100%' }}
                  onClose={() => clearError('success')}
                  color="info">
                  {messages.success}
                </Alert>
              }

              <form noValidate onSubmit={handleSubmit}>
                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">First Name</Typography>

                    <InputBase
                      name="firstName"
                      className={classes.textField}
                      variant="outlined"
                      value={input.firstName}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.firstName ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.firstName && (
                        <span style={errorMessageStyle}>{messages.firstName}</span>
                      )}
                    </Box>
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Last Name</Typography>

                    <InputBase
                      name="lastName"
                      className={classes.textField}
                      variant="outlined"
                      value={input.lastName}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.lastName ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.lastName && (
                        <span style={errorMessageStyle}>{messages.lastName}</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Phone Number</Typography>

                    <InputBase
                      name="phone"
                      type="text"
                      className={classes.textField}
                      variant="outlined"
                      value={input.phone}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.phone ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.phone && (
                        <span style={errorMessageStyle}>{messages.phone}</span>
                      )}
                    </Box>
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Department</Typography>

                    <InputBase
                      // style={{ height: "84px", }}
                      className={classes.textField}
                      variant="outlined"
                      // multiline
                      type="text"
                      // rows={4}
                      value={input.department}
                      name="department"
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.department ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.department && (
                        <span style={errorMessageStyle}>{messages.department}</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">State</Typography>

                    <InputBase
                      name="state"
                      className={classes.textField}
                      variant="outlined"
                      value={input.state}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.state ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.state && (
                        <span style={errorMessageStyle}>{messages.state}</span>
                      )}
                    </Box>
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Address</Typography>

                    <InputBase
                      className={classes.textField}
                      variant="outlined"
                      type="text"
                      value={input.address}
                      name="address"
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.address ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.address && (
                        <span style={errorMessageStyle}>{messages.address}</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box style={{ display: "flex", justifyContent: "space-between" }}>
                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">City</Typography>

                    <InputBase
                      name="city"
                      className={classes.textField}
                      variant="outlined"
                      // type="password"
                      value={input.city}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.city ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.city && (
                        <span style={errorMessageStyle}>{messages.city}</span>
                      )}
                    </Box>
                  </Box>

                  <Box style={{ width: "48%" }}>
                    <Typography
                      className={classes.label}
                      component="legend">Email</Typography>

                    <InputBase
                      name="email"
                      className={classes.textField}
                      variant="outlined"
                      type="email"
                      value={input.email}
                      onChange={handleInputChange}
                      onKeyUp={validateField}
                      style={{
                        marginBottom: messages.email ? '0px' : "1.0rem",
                      }}
                    />

                    <Box
                      display="flex"
                      style={{ width: '70%' }}
                    >
                      {messages.email && (
                        <span style={errorMessageStyle}>{messages.email}</span>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Typography
                    className={classes.label}
                    component="legend"
                  >
                    Select Gender
                  </Typography>
                  <RadioGroup
                    className={classes.usertype}
                    aria-label="roleName"
                    name="gender"
                    value={input.gender}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>

                  <Box
                    display="flex"
                    style={{ width: '70%' }}
                  >
                    {messages.gender && (
                      <span style={errorMessageStyle}>{messages.gender}</span>
                    )}
                  </Box>
                </Box>

                <Box className={classes.buttonBox}>
                  <Button
                    style={{
                      color: "#888888",
                      borderRadius: "4px",
                      marginRight: "1rem",
                    }}
                    onClick={handleAddInfluencerClose}
                  >
                    <Typography style={{ fontSize: "0.9rem", }}>
                      CANCEL
                    </Typography>
                  </Button>

                  <Button
                    style={{
                      background: "#FF5C00",
                      color: "#FFFFFF",
                      borderRadius: "4px",
                      fontSize: "0.9rem"
                    }}
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    {loading ? <CircularProgress size="2em" style={{ color: '#fff' }} /> : 'CREATE ADMIN'}
                  </Button>
                </Box>
              </form>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  )
}

export default AddAdmin
