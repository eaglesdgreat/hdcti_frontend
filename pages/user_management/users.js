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
// import { DeleteOutlinedIcon } from "@material-ui/icons";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from "@material-ui/icons/Edit";

// import { useStateValue } from '../../StateProviders';
import TableLayout from "../../Components/Tables";
import Layout from "../../Components/Layout";
import validations from '../../lib/validations'
import { isAuthenticated } from "../../lib/auth.helper";
// import PrivateRoute from "./../../Components/PrivateRoute";


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
    height: "11px",
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
    // borderRadius: "5px",
    opacity: "1",
    // padding: '10px',
  },
  box: {
    paddingTop: "50px",
    width: "95%",
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
    float: "left",
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
    float: "right",
    font: "normal normal normal 12px/14px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: "1",
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    fontSize: "14px",
    boxShadow: "none",
    padding: "10px",
    fontWeight: "600",
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

    const [state, setState] = useState('')
    const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(false);
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
      const { name, value } = event.target;
      setState(value);
      console.log(state);
    }

    const handleSearch = (event) => {
      const { value } = event.target;

      const data = users.users.filter(
        (user) => user.staffname == value || user.email == value
      );

      if(data.length > 0) {
        setSearch(data);
      }

      if(data.length === 0) {
        setSearch([])
      }
    };

    return (
      <Layout path={path}>
        <Box className={classes.box}>
          <TableContainer className={classes.tContainer} component="div">
            <Box
              display="flex"
              flexDirection="column"
              className={classes.topBox}
            >
              <Box style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    // paddingLeft: "40px",
                    paddingLeft: "45px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    width: "47%",
                    // paddingTop: "10px",
                  }}
                >
                  <Typography className={classes.typography3}>Users</Typography>
                </div>

                <div
                  style={{
                    padding: "15px",
                    width: "47%",
                    // paddingRight: "40px",
                  }}
                >
                  <Typography className={classes.typography4}>
                    {users ? users.users.length : 0} users
                  </Typography>
                </div>
              </Box>

              <Divider light />
              <Box style={{ display: "flex", width: "100%", margin: "auto" }}>
                <Box
                  style={{
                    display: "flex",
                    width: "77%",
                    justifyContent: "flex-end",
                    padding: "20px",
                  }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: "#72A624",
                      color: "white",
                      width: "152px",
                      height: "33px",
                      opacity: "1",
                      borderRadius: "4px",
                    }}
                    className={classes.submit}
                  >
                    <Typography
                      // className={classes.typography}
                      style={{
                        font: "var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
                        letterSpacing: "var(--unnamed-character-spacing-0)",
                        color: "var(--unnamed-color-ffffff)",
                        textAlign: "center",
                        font: "normal normal 600 14px/21px Poppins",
                        letterSpacing: "0px",
                        color: "#FFFFFF",
                        opacity: "1",
                        textTransform: "capitalize",
                      }}
                    >
                      Create New User
                    </Typography>
                  </Button>
                </Box>

                <Box
                  style={{
                    display: "flex",
                    width: "23%",
                    justifyContent: "flex-start",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <BootstrapInput
                    placeholder="Search Users"
                    value={state}
                    name="state"
                    id="state"
                    onKeyUp={handleSearch}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
            </Box>

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
                        <Typography className={classes.typography}>
                          Name
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography className={classes.typography}>
                          Email
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography className={classes.typography}>
                          Role
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography className={classes.typography}>
                          Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(search.length > 0 ? search : users.users)
                      // .slice(
                      //   page * rowsPerPage,
                      //   page * rowsPerPage + rowsPerPage
                      // )
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
                            <Box display="flex" justifyContent="center">
                              <EditIcon />
                              <DeleteOutlinedIcon />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )
            )}
          </TableContainer>
        </Box>
      </Layout>
    );
}