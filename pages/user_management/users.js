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
  InputAdornment,
  FormControl,
  Table,
  TablePagination,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  NoSsr,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useSnackbar } from 'notistack'
import { PieChart } from "react-minimal-pie-chart";
// import { DeleteOutlinedIcon } from "@material-ui/icons";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from "@material-ui/icons/Edit";

// import { useStateValue } from '../../StateProviders';
import Layout from "./../../Components/Layout";
import { isAuthenticated } from "../../lib/auth.helper";


const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  button: {
    "&:hover,&:focus": {
      backgroundColor: "#ffffff00",
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
  table: {
    "@media only screen and (max-width: 280px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 281px) and (max-width: 320px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 321px) and (max-width: 360px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 361px) and (max-width: 375px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 376px) and (max-width: 384px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 385px) and (max-width: 411px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 412px) and (max-width: 414px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 415px) and (max-width: 480px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 481px) and (max-width: 540px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 541px) and (max-width: 600px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 601px) and (max-width: 768px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 769px) and (max-width: 800px)": {
      width: "628px",
    },
  },
  topBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    // borderRadius: "5px",
    opacity: "1",
    width: "100%",
    // padding: '10px',
    "@media only screen and (max-width: 280px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 281px) and (max-width: 320px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 321px) and (max-width: 360px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 361px) and (max-width: 375px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 376px) and (max-width: 384px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 385px) and (max-width: 411px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 412px) and (max-width: 414px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 415px) and (max-width: 480px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 481px) and (max-width: 540px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 541px) and (max-width: 600px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 601px) and (max-width: 768px)": {
      width: "628px",
    },
    "@media only screen and (min-width: 769px) and (max-width: 800px)": {
      width: "628px",
    },
  },
  box: {
    paddingTop: "50px",
    width: "95%",
    // display: "flex",
    margin: "auto",
    overflowX: "auto",
    "@media only screen and (max-width: 280px)": {
      paddingTop: "0px",
      width: "240px",
    },
    "@media only screen and (min-width: 281px) and (max-width: 320px)": {
      paddingTop: "0px",
      width: "270px",
    },
    "@media only screen and (min-width: 321px) and (max-width: 360px)": {
      paddingTop: "0px",
      width: "310px",
    },
    "@media only screen and (min-width: 361px) and (max-width: 375px)": {
      paddingTop: "0px",
      width: "330px",
    },
    "@media only screen and (min-width: 376px) and (max-width: 384px)": {
      paddingTop: "0px",
      width: "340px",
    },
    "@media only screen and (min-width: 385px) and (max-width: 411px)": {
      paddingTop: "0px",
      width: "367px",
    },
    "@media only screen and (min-width: 412px) and (max-width: 414px)": {
      paddingTop: "0px",
      width: "367px",
    },
    "@media only screen and (min-width: 415px) and (max-width: 480px)": {
      paddingTop: "0px",
      width: "435px",
    },
    "@media only screen and (min-width: 481px) and (max-width: 540px)": {
      paddingTop: "0px",
      width: "495px",
    },
    "@media only screen and (min-width: 541px) and (max-width: 600px)": {
      paddingTop: "0px",
      width: "317px",
    },
    "@media only screen and (min-width: 601px) and (max-width: 768px)": {
      paddingTop: "0px",
      width: "490px",
    },
    "@media only screen and (min-width: 769px) and (max-width: 800px)": {
      paddingTop: "0px",
      width: "510px",
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
  cssLabel: {
    color: " #007945",
    fontfamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
  },
  cssOutlinedInput: {
    whiteSpace: "initial",
    "&$cssFocused $notchedOutline": {
      borderColor: "#FFFFFF00",
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#FFFFFF00 !important",
  },
  roots: {
    // background: "blue",
    border: "1px solid #979797",
    borderRadius: "23px",
    width: "200%",
    height: "32px",
  },
  input: {
    color: "var(--unnamed-color-868d96)",
    fontfamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
    marginTop: "-10px",
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
  let order = { users: [] };
  // const url = `${process.env.BACKEND_URL}/account/get_all_user`
  const url = `https://hcdti.savitechnig.com/account/get_all_user`;
  const token = isAuthenticated().auth_token;

  const { data, error } = useSWR([url, token], fetcher, {
    shouldRetryOnError: false,
  });

  if (data) {
    data.users.forEach((item) => {
      order.users.unshift(item);
    });
  }

  return {
    users: order,
    isLoading: !error && !data,
    isError: error,
  };
}


export default function Home() {
  const path = "/users";
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // Fetching data from backend with SWR
  const { users, isLoading, isError } = usersData();

  const [state, setState] = useState("");
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [idx, setIdx] = useState('')
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  // handle change per page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handler for pagination change per page
  const handleRowsChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // click open dialog pop up
  const handleDialogClick = () => {
    setOpen(true);
  };

  // handle dialog close changes
  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    const url = "/user_management/create_user";
    localStorage.setItem("last_url", JSON.stringify("/user_management/users"));

    router.push(url);
  };

  const handleEditClick = (id) => {
    const url = "/user_management/edit_user/" + id;
    console.log(url);
    localStorage.setItem("last_url", JSON.stringify("/user_management/users"));

    router.push(url);
  };

  // delete a user handler
  const clickDelete = async (e) => {
    e.preventDefault();
    console.log(idx)

    let isValid = true;

    const tok = isAuthenticated().auth_token;

    const url = `https://hcdti.savitechnig.com/account/delete_user/${idx}`;
    const mutateUrl = `https://hcdti.savitechnig.com/account/get_all_user`

    if (isValid) {
      setLoading(true);
      
      try {
        const response = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${tok}`,
          },
        });
        // console.log(response);

        if(response.data.code === 200) {
          setLoading(false);

          // swr globla mutate methode for changing data in cache without revalidating
          mutate(
            mutateUrl,
            async () => {
              let updatedUsers = users.users;
              const id = users.users.findIndex(user => user.id === idx)

              updatedUsers[id] = {
                ...updatedUsers[id],
                is_active: false,
              };

              return updatedUsers.filter(user => user.is_active === true);
            },
            false
          );

          enqueueSnackbar(`User Account Has Been Deleted Succesfully.`, {
            variant: "success",
          });

          handleDialogClose();

          window.location.href = "/user_management/users";
        }
        
      } catch (e) {
        // console.log(e);

        if (e.response) {
          setLoading(false); 

          enqueueSnackbar(`Error Deleting User Account. Try Again`, {
            variant: "error",
          });
        }
      }
    }
  };

  const onSearchChange = (event) => {
    setState(event.target.value);
  };

  const searchResult = () => {
    const data = users.users;

    let currentList = data.map((request) => {
      return { ...request };
    });
    // console.log(currentList)

    if (state === "") {
      setSearch([]);
    }

    if (state !== "") {
      let newList = [];

      newList = currentList.filter((request) => {
        const name = `${request.staffname ? request.staffname : ""} ${
          request.email ? request.email : ""
        } ${
          request.is_superuser
            ? "Super User"
            : "" || request.is_credit_officer
            ? "Credit Officer"
            : "" || request.is_branch_manager
            ? "Branch Manager"
            : "" || request.is_senior_manager
            ? "Senior Manager"
            : "" || request.is_agency_bank
            ? "Agency Bank"
            : ""
        }`.toLowerCase();

        return name.includes(state.toLowerCase());
      });
      // console.log(newList)

      setSearch(newList);
    }
  };

  return (
    <Layout path={path}>
      <NoSsr>
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
                    onClick={handleClick}
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
                    paddingRight: "10px",
                  }}
                >
                  <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    margin="none"
                    className={classes.roots}
                    value={state}
                    onChange={(event) => onSearchChange(event)}
                    // onKeyPress={enterSearch}
                    onKeyUp={searchResult}
                    placeholder="Search Users"
                    id="input-search"
                    InputProps={{
                      className: classes.input,
                      classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <img src="/search.svg" alt="search" />
                        </InputAdornment>
                      ),
                    }}
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
                <Table className={classes.table}>
                  <TableHead className={classes.thead}>
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

                  {users.users.length > 20 ? (
                    <TableBody>
                      {(search.length > 0 ? search : users.users)
                        .filter((user) => user.is_active === true)
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
                              <Box display="flex" justifyContent="center">
                                <IconButton
                                  onClick={() => {
                                    handleEditClick(user.id);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>

                                <IconButton
                                  onClick={() => {
                                    setIdx(user.id);
                                    setUserName(user.staffname);
                                    handleDialogClick();
                                  }}
                                >
                                  <DeleteOutlinedIcon />
                                </IconButton>
                              </Box>

                              <Dialog
                                open={open}
                                onClose={handleDialogClose}
                                BackdropProps={{
                                  style: {
                                    opacity: 0.1,
                                  },
                                }}
                                PaperProps={{
                                  style: {
                                    borderRadius: "8px",
                                    width: "428px",
                                    // height: '369px',
                                    paddingBottom: "5%",
                                    paddingTop: "2.5%",
                                    boxShadow: "none",
                                  },
                                }}
                              >
                                <DialogTitle>
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: "700",
                                      fontSize: "24px",
                                      lineHeight: "28px",
                                    }}
                                  >
                                    Delete User Account
                                  </Typography>
                                </DialogTitle>

                                <DialogContent>
                                  <Box
                                    display="flex"
                                    component="span"
                                    style={{
                                      whiteSpace: "initial",
                                    }}
                                  >
                                    <Typography
                                      className={classes.typography}
                                      style={
                                        {
                                          // fontWeight: "normal",
                                          // fontSize: "15px",
                                          // lineHeight: "22px",
                                          // color: "#242120",
                                        }
                                      }
                                    >
                                      You want to delete{" "}
                                      <strong>{userName} </strong>
                                      account from this platform, click delete
                                      button to proceed or cancel this action.
                                    </Typography>
                                  </Box>
                                </DialogContent>

                                <DialogActions
                                  style={{
                                    padding: "11px",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    style={
                                      {
                                        // margin: 'auto',
                                        // marginRight: "25px",
                                        // border: '1px solid red',
                                      }
                                    }
                                  >
                                    <Button
                                      size="large"
                                      className={classes.button}
                                      onClick={clickDelete}
                                      disableRipple
                                      disabled={loading}
                                      style={{
                                        border: "2px solid #72A624",
                                      }}
                                    >
                                      {loading ? (
                                        <CircularProgress
                                          size="1em"
                                          style={{ color: "#72A624" }}
                                        />
                                      ) : (
                                        <Typography
                                          className={classes.typography}
                                          style={{
                                            textAlign: "center",
                                            color: "#72A624",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            lineHeight: "15px",
                                            textTransform: "capitalize",
                                            lineSpacing: "0.02em",
                                          }}
                                        >
                                          Delete
                                        </Typography>
                                      )}
                                    </Button>

                                    <Button
                                      size="large"
                                      className={classes.button}
                                      onClick={handleDialogClose}
                                      disabled={loading}
                                      disableRipple
                                      style={{
                                        border: "1px solid #72A624",
                                        backgroundColor: "#72A624",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <Typography
                                        className={classes.typography}
                                        style={{
                                          textAlign: "center",
                                          color: "#FFFFFF",
                                          fontSize: "13px",
                                          fontWeight: "500",
                                          lineHeight: "15px",
                                          textTransform: "capitalize",
                                          lineSpacing: "0.02em",
                                        }}
                                      >
                                        cancel
                                      </Typography>
                                    </Button>
                                  </Box>
                                </DialogActions>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      {(search.length > 0 ? search : users.users)
                        .filter((user) => user.is_active === true)
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
                                <IconButton
                                  onClick={() => {
                                    handleEditClick(user.id);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>

                                <IconButton
                                  onClick={() => {
                                    setIdx(user.id);
                                    setUserName(user.staffname);
                                    handleDialogClick();
                                  }}
                                >
                                  <DeleteOutlinedIcon />
                                </IconButton>
                              </Box>

                              <Dialog
                                open={open}
                                onClose={handleDialogClose}
                                BackdropProps={{
                                  style: {
                                    opacity: 0.1,
                                  },
                                }}
                                PaperProps={{
                                  style: {
                                    borderRadius: "8px",
                                    width: "428px",
                                    // height: '369px',
                                    paddingBottom: "5%",
                                    paddingTop: "2.5%",
                                    boxShadow: "none",
                                  },
                                }}
                              >
                                <DialogTitle>
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: "700",
                                      fontSize: "24px",
                                      lineHeight: "28px",
                                    }}
                                  >
                                    Delete User Account
                                  </Typography>
                                </DialogTitle>

                                <DialogContent>
                                  <Box
                                    display="flex"
                                    component="span"
                                    style={{
                                      whiteSpace: "initial",
                                    }}
                                  >
                                    <Typography
                                      className={classes.typography}
                                      style={
                                        {
                                          // fontWeight: "normal",
                                          // fontSize: "15px",
                                          // lineHeight: "22px",
                                          // color: "#242120",
                                        }
                                      }
                                    >
                                      You want to delete{" "}
                                      <strong>{userName} </strong>
                                      account from this platform, click delete
                                      button to proceed or cancel this action.
                                    </Typography>
                                  </Box>
                                </DialogContent>

                                <DialogActions
                                  style={{
                                    padding: "11px",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    style={
                                      {
                                        // margin: 'auto',
                                        // marginRight: "25px",
                                        // border: '1px solid red',
                                      }
                                    }
                                  >
                                    <Button
                                      size="large"
                                      className={classes.button}
                                      onClick={clickDelete}
                                      disableRipple
                                      disabled={loading}
                                      style={{
                                        border: "2px solid #72A624",
                                      }}
                                    >
                                      {loading ? (
                                        <CircularProgress
                                          size="1em"
                                          style={{ color: "#72A624" }}
                                        />
                                      ) : (
                                        <Typography
                                          className={classes.typography}
                                          style={{
                                            textAlign: "center",
                                            color: "#72A624",
                                            fontSize: "13px",
                                            fontWeight: "500",
                                            lineHeight: "15px",
                                            textTransform: "capitalize",
                                            lineSpacing: "0.02em",
                                          }}
                                        >
                                          Delete
                                        </Typography>
                                      )}
                                    </Button>

                                    <Button
                                      size="large"
                                      className={classes.button}
                                      onClick={handleDialogClose}
                                      disabled={loading}
                                      disableRipple
                                      style={{
                                        border: "1px solid #72A624",
                                        backgroundColor: "#72A624",
                                        marginLeft: "20px",
                                      }}
                                    >
                                      <Typography
                                        className={classes.typography}
                                        style={{
                                          textAlign: "center",
                                          color: "#FFFFFF",
                                          fontSize: "13px",
                                          fontWeight: "500",
                                          lineHeight: "15px",
                                          textTransform: "capitalize",
                                          lineSpacing: "0.02em",
                                        }}
                                      >
                                        cancel
                                      </Typography>
                                    </Button>
                                  </Box>
                                </DialogActions>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  )}
                </Table>
              )
            )}
            {users.users.length > 20 && (
              <TablePagination
                rowsPerPageOptions={[10, 20, 30, 40]}
                component="div"
                count={search.length > 0 ? search.length : users.users.length}
                page={page}
                style={{ paddingRight: 30 }}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleRowsChangePerPage}
              />
            )}
          </TableContainer>
        </Box>
      </NoSsr>
    </Layout>
  );
}