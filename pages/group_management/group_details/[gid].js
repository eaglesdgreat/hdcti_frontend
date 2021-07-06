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
  DialogContentText,
  DialogTitle,
  Popper,
  Grow,
  ClickAwayListener,
  Collapse,
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

// import { useStateValue } from '../../StateProviders';
import Layout from "./../../../Components/Layout";
import { isAuthenticated } from "../../../lib/auth.helper";

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
    width: "30%",
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
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: 1,
    width: "65%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "69px",
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
}));

const fetcher = async (...arg) => {
  const [url, token] = arg;

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  return response.data;
};

const groupData = () => {
  const router = useRouter();
  const { gid, groupId } = router.query;

  // const url = `${process.env.BACKEND_URL}/account/groupbyid/${gid}`
  const url = `https://hcdti.savitechnig.com/account/groupbyid/${gid}`;
  const token = isAuthenticated().auth_token;

  const { data, error } = useSWR([url, token], fetcher, {
    shouldRetryOnError: false,
  });

  return {
    group: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const membersData = () => {
  const router = useRouter();
  const { groupId } = router.query;

  // const url = `${process.env.BACKEND_URL}/account/get_group_member/${groupId}?page=1`
  const url = `https://hcdti.savitechnig.com/account/get_group_member/${groupId}?page=1`;
  const token = isAuthenticated().auth_token;

  const { data, error } = useSWR([url, token], fetcher, {
    shouldRetryOnError: false,
  });

  return {
    members: data,
    isMemberLoading: !error && !data,
    isMemberError: error,
  };
};


export default function GroupDetails() {
  const path = "/groups";
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // Fetching data from backend with SWR
  const { group, isLoading, isError } = groupData();
  // console.log(group);

  const { members, isMemberLoading, isMemberError } = membersData();
  console.log(members);

  const [state, setState] = useState("");
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [idx, setIdx] = useState("");
  const [loading, setLoading] = useState(false);
  const [groupName, setGroupName] = useState("");

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenMenu(!openMenu);
  };

  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }

    setOpenMenu(false);
  };

  // function handleListKeyDown(event) {
  //   if (event.key === 'Tab') {
  //     event.preventDefault();
  //     setOpenMenu(false);
  //   }
  // }

  // return focus to the button when we transitioned from !open -> open
  // const prevOpen = useRef(openMenu);
  // useEffect(() => {
  //   if (prevOpen.current === true && openMenu === false) {
  //     anchorRef.current.focus();
  //   }

  //   prevOpen.current = openMenu;
  // }, [openMenu]);

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

  // click open dialog pop up
  const handleDialogClickGroup = () => {
    setGroupOpen(true);
  };

  // handle dialog close changes
  const handleDialogClose = () => {
    setOpen(false);
  };

  // handle dialog close changes
  const handleDialogCloseGroup = () => {
    setGroupOpen(false);
  };

  const handleClick = () => {
    const url = "/group_management/create_group";

    router.push(url);
  };

  const handleEditClick = (id) => {
    localStorage.removeItem("last_url");

    const url = "/group_management/edit_group/" + id;
    console.log(url);
    localStorage.setItem(
      "last_url",
      JSON.stringify("/group_management/groups")
    );

    router.push(url);
  };

  // delete a group handler
  const clickDelete = async (e) => {
    e.preventDefault();
    // console.log(idx);

    let isValid = true;

    const tok = isAuthenticated().auth_token;

    // const url = `${process.env.BACKEND_URL}/account/removegroup/${idx}`;
    const url = `https://hcdti.savitechnig.com/account/removegroup/${idx}`;

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

        if (response.data.code === 200) {
          setLoading(false);

          enqueueSnackbar(`Group Account Has Been Deleted Succesfully.`, {
            variant: "success",
          });

          handleDialogClose();

          window.location.href = "/group_management/groups";
        }
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
    const data = members.results.result;

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
        <Box className={classes.root}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.leftBox}
          >
            <Box style={{ padding: "20px" }}>
              <Typography className={classes.typography}>
                Group Details
              </Typography>
            </Box>

            <Divider light />

            <Box style={{ padding: "20px" }}>
              <Typography className={classes.typography2}>
                Group Name
              </Typography>
              {isError ? (
                <Typography className={classes.typography3}>
                  Name Unavailable
                </Typography>
              ) : isLoading ? (
                <CircularProgress size="1em" style={{ color: "#362D73" }} />
              ) : (
                group && (
                  <Typography className={classes.typography3}>
                    {group.result.groupName}
                  </Typography>
                )
              )}
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              style={{ padding: "20px" }}
            >
              <Box>
                <Typography className={classes.typography2}>
                  Group Leader
                </Typography>
                {isMemberError ? (
                  <Typography className={classes.groupTypo}>
                    Leader Unavailable
                  </Typography>
                ) : isMemberLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  members &&
                  members.results && (
                    <Typography className={classes.groupTypo}>
                      {members.results.result.find(
                        (mem) => mem.isLeader === true
                      )
                        ? members.results.result.find(
                            (mem) => mem.isLeader === true
                          ).memberName
                        : "No Leader Found"}
                    </Typography>
                  )
                )}
              </Box>

              <Button
                // onClick={changeType}
                className={classes.showPass}
                style={{ fontSize: "12px" }}
                disableFocusRipple
                disableRipple
                disableTouchRipple
              >
                Change Leader
              </Button>
            </Box>

            <Box style={{ padding: "20px", paddingTop: "7px" }}>
              <Typography className={classes.typography2}>
                Date Stated
              </Typography>
              {isError ? (
                <Typography className={classes.typography3}>
                  Date Unavailable
                </Typography>
              ) : isLoading ? (
                <CircularProgress size="1em" style={{ color: "#362D73" }} />
              ) : (
                group && (
                  <Typography className={classes.typography3}>
                    {moment(group.result.dateCreated).format("DD/MM/YYYY")}
                  </Typography>
                )
              )}
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              className={classes.actionBox}
            >
              <Typography className={classes.actionTypo}>Actions</Typography>

              <Button
                className={classes.button}
                disableFocusRipple
                disableRipple
                disableTouchRipple
                // ref={anchorRef}
                // aria-controls={open ? "menu-list-grow" : undefined}
                // aria-haspopup="true"
                onClick={handleToggle}
              >
                <img src="/right-arro.svg" />
              </Button>
            </Box>
            {openMenu && (
              <ClickAwayListener onClickAway={handleClose}>
                <Box
                  display="flex"
                  flexDirection="column"
                  className={classes.menuBox}
                >
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    style={{ paddingLeft: "10px" }}
                  >
                    <Button
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      // onClick={changeType}
                      className={classes.menuText}
                    >
                      Deactivate Group
                    </Button>
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    style={{ paddingLeft: "10px" }}
                  >
                    <Button
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      onClick={handleDialogClickGroup}
                      className={classes.menuText}
                    >
                      Delete Group
                    </Button>

                    <Dialog
                      open={groupOpen}
                      onClose={handleDialogCloseGroup}
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
                          className={classes.dialogTypo}
                          style={{
                            fontWeight: "700",
                            fontSize: "24px",
                            lineHeight: "28px",
                          }}
                        >
                          Delete Group Account
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
                          <Typography className={classes.dialogTypo}>
                            You want to delete{" "}
                            <strong>{group.result.groupName} </strong>
                            group account from this platform, click delete
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
                            className={classes.button2}
                            onClick={clickDelete}
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
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
                                className={classes.dialogTypo}
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
                            className={classes.button2}
                            onClick={handleDialogCloseGroup}
                            disabled={loading}
                            disableFocusRipple
                            disableRipple
                            disableTouchRipple
                            style={{
                              border: "1px solid #72A624",
                              backgroundColor: "#72A624",
                              marginLeft: "20px",
                            }}
                          >
                            <Typography
                              className={classes.dialogTypo}
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
                  </Box>
                </Box>
              </ClickAwayListener>
            )}
            {/* <div>
              <Popper
                open={openMenu}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{ width: "23.3%", left:'-161px'}}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom"
                          ? "center bottom"
                          : "center top",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={openMenu}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleClose}>My account</MenuItem>
                          <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div> */}
          </Box>

          <Box className={classes.rightBox}>
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
                      Members
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
                      {members ? members.results.result.length : 0}{" "}
                      {members && members.results.result.length > 1
                        ? "Members"
                        : "Member"}
                    </Typography>
                  </div>
                </Box>

                <Divider light />

                <Box style={{ display: "flex", width: "100%", margin: "auto" }}>
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
                        // className={classes.typography}
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
                      // onKeyPress={enterSearch}
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
                </Box>
              </Box>

              {isMemberError ? (
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
              ) : isMemberLoading ? (
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
                members && (
                  <Table className={classes.table}>
                    <TableHead className={classes.thead}>
                      <TableRow
                      // style={{ background: "rgba(249, 250, 252, 0.5)" }}
                      >
                        <TableCell
                          align="left"
                          size="small"
                          className={classes.tableCell}
                        >
                          <Typography className={classes.typo}>Name</Typography>
                        </TableCell>

                        <TableCell size="small" className={classes.tableCell}>
                          <Typography className={classes.typo}>
                            Phone Number
                          </Typography>
                        </TableCell>

                        <TableCell size="small" className={classes.tableCell}>
                          <Typography className={classes.typo}>
                            Date Joined
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
                      {(search.length > 0 ? search : members.results.result)
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((member, i) => (
                          <TableRow key={i}>
                            <TableCell className={classes.tableCell}>
                              <Typography className={classes.nameTypo}>
                                {member.memberName}
                              </Typography>
                            </TableCell>

                            <TableCell className={classes.tableCell}>
                              <Typography className={classes.sn}>
                                {member.mobileNumber}
                              </Typography>
                            </TableCell>

                            <TableCell className={classes.tableCell}>
                              <Typography className={classes.sn}>
                                {moment(member.dateJoined).format(
                                  "Do MMM YYYY"
                                )}
                              </Typography>
                            </TableCell>

                            <TableCell className={classes.tableCell}>
                              <Box display="flex" justifyContent="center">
                                <IconButton
                                  onClick={() => {
                                    handleEditClick(i + 1, member.groupId);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>

                                <IconButton
                                  onClick={() => {
                                    setIdx(member.id);
                                    setGroupName(member.groupName);
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
                                    className={classes.dialogTypo}
                                    style={{
                                      fontWeight: "700",
                                      fontSize: "24px",
                                      lineHeight: "28px",
                                    }}
                                  >
                                    Delete Member From Group
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
                                      className={classes.dialogTypo}
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
                                      <strong>{groupName} </strong>
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
                                          className={classes.dialogTypo}
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
                                        className={classes.dialogTypo}
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
                  </Table>
                )
              )}
              {members && (
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30, 40]}
                  component="div"
                  count={
                    search.length > 0
                      ? search.length
                      : members.results.result.length
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
        </Box>
      </NoSsr>
    </Layout>
  );
}
