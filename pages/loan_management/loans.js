import React, { useState, useEffect, useRef } from "react";
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
  MenuList,
  Paper,
  ClickAwayListener,
  Popper,
  Grow,
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
import { useSnackbar } from "notistack";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import moment from 'moment'
import Link from 'next/link'
import NumberFormat from 'react-number-format'

import { useStateValue } from '../../StateProviders';
import Layout from "./../../Components/Layout";
import { isAuthenticated } from "../../lib/auth.helper";

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
    font: "var(--unnamed-font-style-normal) normal bold 13px/var(--unnamed-line-spacing-16) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal bold 13px/16px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0DA0",
    textTransform: "capitalize",
    opacity: 1,
  },
  typography5: {
    font: "var(--unnamed-font-style-normal) normal bold 13px/var(--unnamed-line-spacing-16) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal bold 13px/16px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0DA0",
    textTransform: "capitalize",
    opacity: 1,
  },
  typography2: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "center",
    font: "normal normal medium 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#362D73",
    opacity: 1,
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
    opacity: 1,
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
    opacity: 1,
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
  sn: {
    font: "var(--unnamed-font-style-normal) normal bold var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal bold 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: 1,
  },
  member: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal normal 12px/14px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: 1,
  },
  boxBtn: {
    display: "flex",
    width: "72%",
    justifyContent: "flex-end",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  search: {
    display: "flex",
    width: "23%",
    justifyContent: "flex-start",
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingRight: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "26%",
    },
  },
  icon: {
    width: '36px',
    height: '36px',
    '&:hover': {
      background: '#DAF2B6 0% 0% no-repeat padding-box',
      // borderRadius: '5px',
      opacity: 0.42,
    }
  },
  dropdown: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #362D7365',
    opacity: 1,
    height: '78px',
    width: '130px',
  },
  details: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) 13px/20px var(--unnamed-font-family-poppins)',
    color: 'var(--unnamed-color-362d73)',
    textAlign: 'center',
    font: 'normal normal bold 13px/20px Poppins',
    letterSpacing: '0.65px',
    color: '#362D73',
    opacity: 1
  },
  dialogText: {
    font: "var(--unnamed-font-style-normal) normal bold 13px/var(--unnamed-line-spacing-16) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal bold 13px/16px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0DA0",
    textTransform: "capitalize",
    opacity: 1,
  },
}));

const filter_list = [
  { id: 1, name: 'All', value: 'all' },
  {id:2, name: 'Approved', value: 'approved' },
  // {id:3, name: 'Declined', value: 'declined' },
  { id: 4, name: 'Pending', value: 'pending' },
]



const fetcher = async (...arg) => {
  const [url, token] = arg;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Token ${token}`,
    },
    // params: {page:1}
  });

  return response.data;
};


const loansData = () => {
  // const url = `${process.env.BACKEND_URL}/account/all_loan`
  const url = `https://hcdti.savitechnig.com/account/all_loan`;
  const token = isAuthenticated().auth_token;

  const { data, error } = useSWR([url, token], fetcher, {
    shouldRetryOnError: false,
  });

  return {
    loans: data,
    isLoading: !error && !data,
    isError: error,
  };
};


export default function Loans() {
  const path = "/loans";
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [{ openDialog }, dispatch] = useStateValue();

  const addToBasket = (data) => {
    dispatch({
      type: "OPEN_DIALOG_BOX",
      item: data,
    });
  };

  // Fetching data from backend with SWR
  const { loans, isLoading, isError } = loansData();
  // console.log(loans);

  const [state, setState] = useState("");
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  // const [openDialog, setOpenDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loanId, setLoanId] = useState('')
  const [borrowerName, setBorrowerName] = useState('')
  const [filterData, setFilterData] = useState([])

  const anchorRef = useRef(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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

    if(value === 'all') {
      setFilter(value)
      setFilterData([])
    }

    if(value === 'pending') {
      const data = loans.result.filter(x => x.approve.length === 0)

      setFilterData(data)
      setFilter(value)
    }

    if (value === 'approved') {
      const data = loans.result.filter(x => x.approve.length > 0)

      setFilterData(data)
      setFilter(value)
    }
  }

  const handleToggle = (e, id, name) => {
    setLoanId(id)
    setBorrowerName(name)
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // click open dialog pop up
  const handleDialogClick = (e) => {
    // setOpenDialog(true);
    addToBasket(true)

    handleClose(e)
  };

  // handle dialog close changes
  const handleDialogClose = () => {
    // setOpenDialog(false);

    addToBasket(false)
  };

  // delete a group handler
  const clickDelete = async (e) => {
    e.preventDefault();

    let isValid = true;

    const tok = isAuthenticated().auth_token;

    // const url = `${process.env.BACKEND_URL}/account/removegroup/${idx}`;
    const url = `https://hcdti.savitechnig.com/account/removeloan/${loanId}`;

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

        setLoading(false);

        enqueueSnackbar(`Group Account Has Been Deleted Succesfully.`, {
          variant: "success",
        });

        handleDialogClose();

        window.location.href = "/loan_management/loans";
      } catch (e) {
        // console.log(e);

        if (e.response) {
          setLoading(false);

          enqueueSnackbar(`Error Deleting Group Account. Try Again`, {
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
    const data = loans.result;

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
        const name = `${request.fullname ? request.fullname : ""} ${request.app_type ? request.app_type : ""} ${request.application_id ? request.application_id : ""
          } ${request.date_of_app ? moment(request.date_of_app).format('Do MMM YYYY') : ""} ${request.loan_applied_for ? request.loan_applied_for : ""}`.toLowerCase();

        return name.includes(state.toLowerCase());
      });
      console.log(newList)

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
                  <Typography className={classes.typography3}>
                    Loan Applications
                  </Typography>
                </div>

                <div
                  style={{
                    padding: "15px",
                    width: "47%",
                    // paddingRight: "40px",
                  }}
                >
                  <Typography className={classes.typography4}>
                    {loans && loans.result ? loans.result.length : 0}{" "}Loan Application
                  </Typography>
                </div>
              </Box>

              <Divider light />

              <Box style={{ display: "flex", width: "100%", margin: "auto" }}>
                <Box className={classes.boxBtn}>
                  <FormControl
                    variant="outlined"
                    style={{ width: "20%" }}
                    // margin="dense"
                    // size="small"
                  >
                    <Select
                      id="filter"
                      value={filter}
                      name="filter"
                      displayEmpty
                      // native={false}
                      // renderValue={(value) => value}
                      onChange={handleChange}
                      input={<BootstrapInput />}
                    >
                      {filter_list.map((list) => (
                        <MenuItem key={list.id} value={list.value}>
                          <Typography
                            noWrap
                            variant="body1"
                            className={classes.typography5}
                          >
                            {list.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box className={classes.search}>
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
                    placeholder="Search Groups"
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

            {
            isError ? (
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
                  Error Fetching All Loans Data
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
            ) : 
            (
              loans && loans.result && (
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
                          Application No
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography className={classes.typography}>
                          Type
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography className={classes.typography}>
                          Amount Requested
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography className={classes.typography}>
                          Borrower
                        </Typography>
                      </TableCell>

                      <TableCell size="small" className={classes.tableCell}>
                        <Typography className={classes.typography}>
                          Date of Application
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
                    {(search.length > 0 ? search : filterData.length > 0 ? filterData : loans.result)
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((loan, i) => (
                        <TableRow key={loan.application_id}>
                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.sn}>
                              {i + 1}
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.sn}>
                              {loan.application_id}
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.sn}>
                              {loan.app_type}
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.sn}>
                              <NumberFormat
                                value={loan.loan_applied_for}
                                thousandSeparator={true}
                                decimalScale={2}
                                decimalSeparator="."
                                prefix={'₦'}
                                fixedDecimalScale={true}
                                displayType="text"
                              />
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Link
                              href={{
                                pathname: `/group_management/member_details/[mdid]`,
                                query: {
                                  mdid: 1,
                                },
                              }}
                            >
                              <a
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <Typography className={classes.typography2}>
                                  {loan.fullname}
                                </Typography>
                              </a>
                            </Link>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.sn}>
                              {moment(loan.date_of_app).format('Do MMM YYYY')}
                            </Typography>
                          </TableCell>

                          <TableCell className={classes.tableCell}>
                            <Box display="flex" justifyContent="center">
                              <IconButton
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={(e) => handleToggle(e, loan.application_id, loan.fullname)}
                                className={classes.icon}
                              >
                                <FiberManualRecordIcon style={{ fontSize: '0.5rem', color:'#72A624' }} />
                                <FiberManualRecordIcon style={{ fontSize: '0.5rem', color: '#72A624' }} />
                                <FiberManualRecordIcon style={{ fontSize: '0.5rem', color: '#72A624' }} />
                              </IconButton>

                              <Dialog
                                open={openDialog}
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
                                    className={classes.dialogText}
                                    style={{
                                      fontWeight: "700",
                                      fontSize: "24px",
                                      lineHeight: "28px",
                                    }}
                                  >
                                    Delete Loan
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
                                    <Typography className={classes.dialogText}>
                                      You want to delete the loan for{" "}
                                      <strong>{borrowerName} </strong>, click delete
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
                                  <Box display="flex" justifyContent="center">
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
                                            className={classes.dialogText}
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
                                        className={classes.dialogText}
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

                              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                  <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                  >
                                    <Paper>
                                      <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList className={classes.dropdown} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                          <Link
                                            href={{
                                              pathname: `/loan_management/loan_details/[lid]`,
                                              query: {
                                                lid: loanId,
                                              },
                                            }}
                                          >
                                            <a
                                              style={{
                                                textDecoration: "none",
                                                cursor: "pointer",
                                              }}
                                            >
                                              <MenuItem onClick={handleClose}>
                                                <Typography gutterBottom className={classes.details}>
                                                  View Details
                                                </Typography>
                                              </MenuItem>
                                            </a>
                                          </Link>

                                          <Divider light />

                                          <MenuItem 
                                            onClick={(e) => {
                                              handleDialogClick(e)
                                              // handleClose(e)
                                            }}
                                          >
                                            <Typography gutterBottom className={classes.details}>
                                              Delete
                                            </Typography>
                                          </MenuItem>
                                        </MenuList>
                                      </ClickAwayListener>
                                    </Paper>
                                  </Grow>
                                )}
                              </Popper>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )
            )}
            {loans && loans.result && (
              <TablePagination
                rowsPerPageOptions={[10, 20, 30, 40]}
                component="div"
                count={
                  search.length > 0 ? search.length : filterData.length > 0 ? filterData.length : loans.result.length
                }
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
