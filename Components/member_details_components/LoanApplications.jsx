import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Box,
  Typography,
  Hidden,
  TextField,
  CircularProgress,
  Divider,
  Button,
  MenuItem,
  MenuList,
  Table,
  TablePagination,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  IconButton,
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
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-helveticaneue-medium)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 16px/19px HelveticaNeue-Medium",
    letterSpacing: "0px",
    color: "#0D0D0DA0",
    textTransform: "capitalize",
    opacity: 1,
    fontWeight: 600,
  },
  typography2: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-12)/12px var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal 12px/14px Helvetica Neue",
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
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-helveticaneue-medium)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 16px/19px HelveticaNeue-Medium",
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
    opacity: 0.63,
    fontWeight:600,
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
  checkRoot: {
    marginTop: '-11px',
    marginRight: '-7px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  checkIcon: {
    // borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    borderRadius: '50px',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#72A624',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#72A624',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#72A624',
    },
  },
}));


const members = [
  {
    id:1,
    app_no: 75681,
    type: 'Loan',
    amount: 1000000000,
    date: '12/07/2021',
  },
  {
    id: 2,
    app_no: 75682,
    type: 'Loan',
    amount: 1000000000,
    date: '12/07/2021',
  }
]



export default function LoanApplications(member, isError, isLoading) {
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
                Loan Applications
              </Typography>
            </div>

            <div
              style={{
                display:"flex",
                justifyContent:'flex-end',
                paddingRight: "10px",
                paddingTop: "15px",
                paddingBottom: "15px",
                width: "47%",
              }}
            >
              <Typography className={classes.typography4}>status: </Typography>
              <Box>
                <Checkbox
                  className={classes.checkRoot}
                  disableRipple
                  color="default"
                  checkedIcon={<span className={clsx(classes.checkIcon, classes.checkedIcon)} />}
                  icon={<span className={classes.checkIcon} />}
                  inputProps={{ 'aria-label': 'decorative checkbox' }}
                />
              </Box>
              <Typography className={classes.typography2}> Pending</Typography>
            </div>
          </Box>

          {/* <Divider light /> */}

          {/* <Box style={{ display: "flex", width: "100%", margin: "auto" }}>
            <Box className={classes.boxBtn}>
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
                  style={{
                    font: "var(--unnamed-font-style-normal) normal 600 13px/20px var(--unnamed-font-family-poppins)",
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
                  Add Member
                </Typography>
              </Button>
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
                onKeyUp={searchResult}
                placeholder="Search Members"
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
          </Box> */}
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
              Error Fetching All Members Data
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
          member && member.loanHistory && (
            <Table className={classes.table}>
              <TableHead className={classes.thead}>
                <TableRow>
                  <TableCell
                    align="left"
                    size="small"
                    className={classes.tableCell}
                  >
                      <Typography className={classes.typo}>Application No</Typography>
                  </TableCell>

                  <TableCell size="small" className={classes.tableCell}>
                    <Typography className={classes.typo}>
                      Type
                    </Typography>
                  </TableCell>

                    <TableCell size="small" className={classes.tableCell}>
                      <Typography className={classes.typo}>
                        Amount Requested
                      </Typography>
                    </TableCell>

                  <TableCell size="small" className={classes.tableCell}>
                    <Typography className={classes.typo}>
                      Date Of Application
                    </Typography>
                  </TableCell>

                  <TableCell size="small" className={classes.tableCell}>
                    <Typography className={classes.typo}>
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                    // (search.length > 0 ? search : members.results.result)
                  member.loanHistory
                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  .map((member, i) => (
                    <TableRow key={member.id}>
                      <TableCell className={classes.tableCell}>
                        <Typography className={classes.sn}>
                          {member.application_id}
                        </Typography>
                      </TableCell>

                      <TableCell className={classes.tableCell}>
                        <Typography className={classes.sn}>
                          {member.app_type}
                        </Typography>
                      </TableCell>

                      <TableCell className={classes.tableCell}>
                        <Typography className={classes.sn}>
                          <NumberFormat
                            value={member.loan_applied_for}
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
                          {moment(member.date_of_app).format("Do MMM YYYY")}
                        </Typography>
                      </TableCell>

                      <TableCell className={classes.tableCell}>
                        
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )
        )}
        {member && member.loanHistory && (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 40]}
            component="div"
            // count={
            //   search.length > 0
            //     ? search.length
            //     : members.results.result.length
            // }
            count={ member.loanHistory.length }
            page={page}
            style={{ paddingRight: 30 }}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleRowsChangePerPage}
          />
        )}
      </TableContainer>
    </Fragment>
  )
}