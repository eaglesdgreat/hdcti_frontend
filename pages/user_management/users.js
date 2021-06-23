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
  Table,
  TablePagination,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  tContainer: {
    overflowX: "auto",
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: "1",
  },
  topBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: "1",
  },
  box: {
    paddingTop: "50px",
    width: "90%",
    // display: "flex",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingTop: "0px",
    },
  },
  typography: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-17) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal medium 14px/17px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0DA0",
    textTransform: "capitalize",
    opacity: "1",
  },
  typography2: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal normal 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: "1",
  },
  tableCell: {
    // borderBottom: 'none',
    // width: '100%',
  },
  thead: {
    background: "#DAF2B6 0% 0% no-repeat padding-box",
    opacity: "1",
  },
  typography3: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-helveticaneue-medium)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 16px/19px HelveticaNeue-Medium",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: "1",
    fontWeight: 600,
  },
  typography4: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "right",
    font: "normal normal normal 12px/14px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: "1",
  },
}));


  const fetcher = async (...arg) => {
  const [url, token] = arg

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  });

  return response.data
}


const usersData = () => {
  // const url = `${process.env.BACKEND_URL}/account/get_all_user`
  const url = `https://hcdti.savitechnig.com/account/get_all_user`
  const token = isAuthenticated().auth_token

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    users: data,
    isLoading: !error && !data,
    isError: error
  }
}


export default function Home() {
    const path = '/users'
    const classes = useStyles()
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const token = isAuthenticated().auth_token

    // Fetching data from backend with SWR
    const { users, isLoading, isError } = usersData()

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [newType, setNewType] = useState('password')

    // handle change per page
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    // handler for pagination change per page
    const handleRowsChangePerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

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
        <Box className={classes.box}>
          <Box display="flex" flexDirection="column" className={classes.topBox}>
            <Box display="flex" style={{ width: "100%" }}>
              <Box
                display="flex"
                // justifyContent="flex-start"
                style={{
                  width: "50%",
                  paddingLeft: "20px",
                  paddingTop: "10px",
                }}
              >
                <Typography className={classes.typography3}>Users</Typography>
              </Box>

              <Box
                display="flex"
                // justifyContent="flex-end"
                style={{
                  width: "50%",
                  paddingRight: "40px",
                  paddingTop: "10px",
                }}
              >
                <Typography
                  className={classes.typography4}
                >
                  {users ? users.users.length : 0} users
                </Typography>
              </Box>
            </Box>

            {/* <Divider light />

            <Box>

            </Box> */}
          </Box>
          <Paper className={classes.tContainer}>
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
                  Error Fetching All Users Data
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
              users && (
                <Table>
                  <TableHead class={classes.thead}>
                    <TableRow
                    // style={{ background: "rgba(249, 250, 252, 0.5)" }}
                    >
                      <TableCell size="small" className={classes.tableCell}>
                        <Typography className={classes.typography}>
                          S/N
                        </Typography>
                      </TableCell>

                      <TableCell
                        align="left"
                        size="small"
                        className={classes.tableCell}
                      >
                        <Typography
                          className={classes.typography}
                        >
                          Name
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography
                          className={classes.typography}
                        >
                          Email
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography
                          className={classes.typography}
                        >
                          Role
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography
                          className={classes.typography}
                        >
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {users.users
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user, i) => (
                        <TableRow key={user.id}>
                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.typography2}>
                              {i + 1}
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.typography2}>
                              {user.staffname}
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.typography2}>
                              {user.email}
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.typography2}>
                              {user.is_superuser
                                ? "Super User"
                                : "" || user.is_credit_officer
                                ? "Credit Officer"
                                : "" || user.is_branch_manager
                                ? "Branch Manager"
                                : "" || user.is_senior_manager
                                ? "Senior Manager"
                                : "" || user.is_agency_bank
                                ? "Agency Bank"
                                : ""}
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.typography2}>
                              {/* {user.status} */}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )
            )}
          </Paper>
        </Box>
      </Layout>
    );
}