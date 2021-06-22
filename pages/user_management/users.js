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
  FormControl,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useSnackbar } from 'notistack'
import { PieChart } from "react-minimal-pie-chart";

// import { useStateValue } from '../../StateProviders';
import TableLayout from "../../Components/Tables";
import Layout from "../../Components/Layout";
import validations from '../../lib/validations'
import { isAuthenticated } from "../../lib/auth.helper";
// import PrivateRoute from "./../../Components/PrivateRoute";


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
      width: "85%", // Fix IE 11 issue.
      marginTop: theme.spacing(4),
      paddingTop:'90px',
      // fontSize: "14px",
      margin:'auto',
      [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
      paddingTop:'45px',
      }
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
    itemGrid: {
      width:'100%'
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
    }
  }));


  const roles = [
    // { id: 6, name: "Select Role", value: "", disabled: true },
    { id: 1, name: "Super User", value: "super", disabled: false },
    { id: 2, name: "Credit Officer", value: "credit_officer", disabled: false },
    { id: 3, name: "Branch Manager", value: "branch_manager", disabled: false },
    { id: 4, name: "Senior Manager", value: "senior_manager", disabled: false },
    { id: 5, name: "Agency Bank", value: "agency_bank", disabled: false },
  ];


export default function Home() {
    const path = '/users'
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const token = isAuthenticated().auth_token

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
        const validate = validations(state.username, 'Username');
        if (validate.status) {
          setMessages({ ...messages, username: validate.message });
          isValid = false;
        }
      }
  
      if (isValid) {
        const validatePass = validations(state.password, 'Password');
        if (validatePass.status) {
          setMessages({ ...messages, password: validatePass.message });
          isValid = false;
        }
      }
  
      const body = {
        email: state.email || null,
        password: state.password || null,
        staffname: state.username || null,
        role: state.role ? state.role : 'credit_officer',
      }
      // console.log(body)
  
  
      // const url = `${process.env.BACKEND_URL}/account/create_user`;
      const url = `https://hcdti.savitechnig.com/account/create_user`;
  
      if (isValid) {
        setLoading(true); 
  
        try {
          const response = await axios.post(url, body, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token}`,
            },
          });
  
          // setMessages({ ...messages, success: response.data.success.message });
          setState(initialState)
          
          // console.log(response)
  
          if (response.data) {
            setLoading(false); 
  
            enqueueSnackbar(
              `${response.data.reason}`,
              {
                variant: "success",
              }
            );
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
            
            setState(initialState)
          }
        }
      }
    }

    return (
      <Layout path={path}>
      
      </Layout>
    );
}