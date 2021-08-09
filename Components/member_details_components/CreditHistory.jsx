import React, { useState, useEffect, useRef, Fragment } from "react";
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
  MenuList,
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
  DialogTitle,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { PieChart } from "react-minimal-pie-chart";
// import { DeleteOutlinedIcon } from "@material-ui/icons";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import NumberFormat from 'react-number-format'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    paddingRight: "40px",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingRight: "0px",
    },
  },
  tContainer: {
    overflowX: "auto",
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    // borderRadius: "5px",
    opacity: "1",
  },
  downBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    // borderRadius: "5px",
    opacity: "1",
    padding: '41px',
    marginTop: '-1px'
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
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 12px/14px Helvetica Neue",
    letterSpacing: " 0px",
    color: "#0D0D0DC7",
    textTransform: "uppercase",
    opacity: 0.63,
  },
  typography2: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 12px/14px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0DC7",
    textTransform: "uppercase",
    opacity: 1,
  },
  tableCell: {
    borderBottom: "none",
    // width: '100%',
  },
  // tabCell: {
  //   background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
  //   border: "1px solid var(--unnamed-color-ebebeb)",
  //   background: "#FFFFFF 0% 0% no-repeat padding-box",
  //   border: "1px solid #EBEBEB",
  //   borderRadius: "3px",
  //   opacity: 1,
  // },
  thead: {
    background: "#ffffff 0% 0% no-repeat padding-box",
    opacity: "1",
  },
  typography3: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal medium 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: 1,
    // fontWeight: 600,
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
  typo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-12)/15px var(--unnamed-font-family-helvetica-neue)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal medium 12px/15px Helvetica Neue",
    letterSpacing: "0.6px",
    color: "#0D0D0D",
    textTransform: "capitalize",
    opacity: 0.4,
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
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-12)/18px var(--unnamed-font-family-poppins)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal medium 12px/18px Poppins",
    letterSpacing: "0.6px",
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
  leftBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: 1,
    height: "331px",
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
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
  actionBox: {
    background: "var(--unnamed-color-ecf1f2) 0% 0% no-repeat padding-box",
    background: "#ECF1F2 0% 0% no-repeat padding-box",
    borderRadius: "0px 0px 5px 5px",
    // opacity: 0.35,
    height: "48px",
    paddingTop: "13px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "10px",
  },
  rightBox: {
    background: "var(--unnamed-color-ecf1f2) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-ecf1f2)",
    // border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#ecf1f2 0% 0% no-repeat padding-box",
    border: "1px solid #ecf1f2",
    // border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: 1,
    width: "70%",
    "@media only screen and (max-width: 280px)": {
      marginTop: "69px",
      width: "240px",
    },
    "@media only screen and (min-width: 281px) and (max-width: 320px)": {
      marginTop: "69px",
      width: "270px",
    },
    "@media only screen and (min-width: 321px) and (max-width: 360px)": {
      marginTop: "69px",
      width: "310px",
    },
    "@media only screen and (min-width: 361px) and (max-width: 375px)": {
      marginTop: "69px",
      width: "330px",
    },
    "@media only screen and (min-width: 376px) and (max-width: 384px)": {
      marginTop: "69px",
      width: "340px",
    },
    "@media only screen and (min-width: 385px) and (max-width: 411px)": {
      marginTop: "69px",
      width: "367px",
    },
    "@media only screen and (min-width: 412px) and (max-width: 414px)": {
      marginTop: "69px",
      width: "367px",
    },
    "@media only screen and (min-width: 415px) and (max-width: 480px)": {
      marginTop: "69px",
      width: "435px",
    },
    "@media only screen and (min-width: 481px) and (max-width: 540px)": {
      marginTop: "69px",
      width: "495px",
    },
    "@media only screen and (min-width: 541px) and (max-width: 600px)": {
      marginTop: "69px",
      width: "317px",
    },
    "@media only screen and (min-width: 601px) and (max-width: 768px)": {
      marginTop: "69px",
      width: "490px",
    },
    "@media only screen and (min-width: 769px) and (max-width: 800px)": {
      marginTop: "69px",
      width: "510px",
    },
    "@media only screen and (min-width: 801px) and (max-width: 834px)": {
      marginTop: "69px",
      width: "530px",
    },
  },
  actionTypo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-16) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal medium 14px/16px Poppins",
    letterSpacing: " 0px",
    color: "#362D73",
    opacity: 1,
  },
  groupTypo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal medium 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#362D73",
    opacity: 1,
  },
  nameTypo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-12)/18px var(--unnamed-font-family-poppins)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "center",
    font: "normal normal medium 12px/18px Poppins",
    letterSpacing: "0.6px",
    color: "#362D73",
    opacity: 1,
  },
  menuBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    // borderRadius: "5px",
    opacity: 1,
    width: "100%",
  },
  menuText: {
    font: "var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal 600 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#362D73",
    opacity: 1,
    // width: '100%',
    "&:hover,&:focus,&:active": {
      background: "#ffffff00",
    },
  },
  button: {
    border: "1px solid #E0E0E0",
    width: "25px",
    height: "25px",
    "&:hover,&:focus,&:active,&:target": {
      background: "#ffffff00",
    },
  },
  dialogTypo: {
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
  itemGrid: {
    width: "100%",
  },
  formTypo: {
    marginBottom: "11px",
  },
  typography6: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal medium 14px/21px Poppins",
    letterSpacing: " 0px",
    color: "#0D0D0D",
    // textTransform: "capi",
    opacity: 1,
  },
}));


const credits = [
  {
    id: 1,
    amount: 1000000000,
    date: '12/07/2021',
  },
  {
    id: 2,
    amount: 2000000000,
    date: '12/07/2021',
  }
]



export default function CreditHistory({ member, isError, isLoading }) {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // handle change per page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handler for pagination change per page
  const handleRowsChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Fragment>
      <TableContainer className={classes.tContainer} component="div">
        <Box
          display="flex"
          flexDirection="column"
          className={classes.topBox}
        >
          <Box style={{ display: "flex", width: "100%" }}>
            <div
              style={{
                paddingLeft: "25px",
                paddingTop: "15px",
                paddingBottom: "15px",
                width: "47%",
              }}
            >
              <Typography className={classes.typography3}>
                Credit History
              </Typography>
            </div>
          </Box>

          {/* <Divider light /> */}
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
                Error Fetching All Credit History Data
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
            member && (
              <Table className={classes.table}>
                <TableHead className={classes.thead}>
                  <TableRow>
                    <TableCell size="small" className={classes.tableCell}>
                      <Typography className={classes.typo}>
                        Last Loan Received
                      </Typography>
                    </TableCell>

                    <TableCell size="small" className={classes.tableCell}>
                      <Typography className={classes.typo}>
                        Date Of Full Repayment
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {
                    credits
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((credit, i) => (
                        <TableRow key={credit.id}>
                          <TableCell className={classes.tableCell}>
                            <Typography className={classes.sn}>
                              <NumberFormat
                                value={credit.amount}
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
                            <Typography className={classes.sn}>
                              {moment(credit.date).format(
                                "Do MMM YYYY"
                              )}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            )
          )}
      </TableContainer>

      <Box className={classes.downBox}>
        <Grid container spacing={3}>
          <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
            <Typography
              className={clsx(classes.typography, classes.formTypo)}
              variant="body1"
              gutterBottom
            >
              Is Member Owing Any Bfb/Mfi?
            </Typography>

            {isError ? (
              <Typography className={classes.typography3}>
                Bfb/Mfi Unavailable
              </Typography>
            ) : isLoading ? (
              <CircularProgress size="1em" style={{ color: "#362D73" }} />
            ) : (
              member && member.businessInfo ? (
                <Typography
                  className={clsx(classes.typography6)}
                  variant="body1"
                  gutterBottom
                >
                  {member.businessInfo.owningMFI ? 'yes' : 'no'}
                </Typography>
              ) : (
                <Typography
                  className={clsx(classes.typography2)}
                  variant="body1"
                  noWrap={true}
                  gutterBottom
                >
                  Bfb/Mfi not Selected
                </Typography>
              )
            )}

            {/* <Typography
              className={clsx(classes.typography6)}
              variant="body1"
              gutterBottom
            >
              {member.businessInfo.owningMFI ? 'yes' : 'no'}
            </Typography> */}
          </Grid>

          <Grid className={classes.itemGrid} item md={6} lg={6} xl={6}>
            <Typography
              className={clsx(classes.typography, classes.formTypo)}
              variant="body1"
              gutterBottom
            >
              Is Member Owing Any Bfb/Mfi?
            </Typography>

            {isError ? (
              <Typography className={classes.typography3}>
                Bfb/Mfi Unavailable
              </Typography>
            ) : isLoading ? (
              <CircularProgress size="1em" style={{ color: "#362D73" }} />
            ) : (
              member && member.businessInfo ? (
                <ul style={{marginLeft: "-28px"}}>
                  {
                    member.businessInfo.mfiName.split(',').map((name, i)  => (
                      <li key={i} className={clsx(classes.typography6)}>
                        {name}
                      </li>
                    ))
                  }
                </ul>
              ) : (
                <Typography
                  className={clsx(classes.typography2)}
                  variant="body1"
                  noWrap={true}
                  gutterBottom
                >
                  Bfb/Mfi not Selected
                </Typography>
              )
            )}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}