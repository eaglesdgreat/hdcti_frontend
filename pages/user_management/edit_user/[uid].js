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
import Link from 'next/link'
import { useSnackbar } from "notistack";
import { PieChart } from "react-minimal-pie-chart";

// import { useStateValue } from '../../StateProviders';
import Layout from "../../../Components/Layout";
// import validations from "../../lib/validations";
import { isAuthenticated } from "../../../lib/auth.helper";
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
    height: "38px",
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
    paddingTop: "90px",
    // fontSize: "14px",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(0),
      paddingTop: "45px",
    },
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
    width: "100%",
  },
  createBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
    opacity: "1",
    height: "562px",
    width: "98%",
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
  },
}));


const fetcher = async (...arg) => {
  const [url, token] = arg;

  // const {url, token} = arg

  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  return response.data;
};

const userData = () => {
  const router = useRouter();
  const { uid } = router.query;

  //   const url = `${process.env.BACKEND_URL}/account/get_single_user/${uid}`;
  const url = `https://hcdti.savitechnig.com/account/get_single_user/${uid}`;

  const token = isAuthenticated().auth_token;

  const options = {
    shouldRetryOnError: false,
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  const {
    data,
    error,
    mutate: userMutate,
  } = useSWR([url, token], fetcher, { ...options });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    userMutate,
  };
};


const roles = [
  // { id: 6, name: "Select Role", value: "", disabled: true },
  { id: 1, name: "Super User", value: "super", disabled: false },
  { id: 2, name: "Credit Officer", value: "credit_officer", disabled: false },
  { id: 3, name: "Branch Manager", value: "branch_manager", disabled: false },
  { id: 4, name: "Senior Manager", value: "senior_manager", disabled: false },
  { id: 5, name: "Agency Bank", value: "agency_bank", disabled: false },
];

export default function Update() {
  const path = "/users";
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { uid } = router.query;
  const token = isAuthenticated().auth_token;

  const { user, isLoading, isError, userMutate } = userData();
//   console.log(user)

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [svaeRole, setSaveRole] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target;

    if(name === 'staffname') {
        userMutate((data) => {
          return {
            ...user,
            ...{...data, [name]: value},
          };
        }, false);
    }

    if(name === 'role') {
        setSaveRole(value)

        userMutate((data) => {
            data.is_superuser = false;
            data.is_credit_officer = false;
            data.is_branch_manager = false;
            data.is_senior_manager = false;
            data.is_agency_bank = false;

            let str =
              value === "super"
                ? "is_superuser"
                : value === "credit_officer"
                ? "is_credit_officer"
                : value === "branch_manager"
                ? "is_branch_manager"
                : value === "senior_manager"
                ? "is_senior_manager"
                : value === "agency_bank"
                ? "is_agency_bank"
                : "";

            return {
                ...user,
                ...{...data, [str]: true,}
            };
        }, false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    const body = {
      staffname: user.staffname || null,
      role: svaeRole || null,
    };
    // console.log(body)

    // const url = `${process.env.BACKEND_URL}/account/update_user`;
    const url = `https://hcdti.savitechnig.com/account/update_user_admin/${uid}`;

    if (isValid) {
      setLoading(true);

      try {
        const response = await axios.post(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        // console.log(response)

        if (response.data) {
          const last_url = JSON.parse(localStorage.getItem("last_url"));

          setLoading(false);

          enqueueSnackbar(`${response.data.reason}`, {
            variant: "success",
          });

          if (last_url) {
            localStorage.removeItem("last_url");
            router.push(`${last_url}`);
          }
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
        }
      }
    }
  };

  return (
    <Layout path={path}>
      <Box display="flex" style={{ width: "100%" }}>
        <Box className={classes.createBox}>
          <Typography
            className={classes.typography}
            style={{
              padding: "16px",
              paddingLeft: "30px",
              fontWeight: 600,
            }}
          >
            Edit User
          </Typography>

          <Divider light />

          <Box>
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
                  Error Getting User Data
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
              user && (
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Grid container spacing={4}>
                    <Grid
                      className={classes.itemGrid}
                      item
                      md={6}
                      lg={6}
                      xl={6}
                    >
                      <Typography
                        className={classes.typography}
                        style={{
                          marginBottom: "-11px",
                        }}
                      >
                        Email
                      </Typography>
                      <TextField
                        className={classes.textField}
                        disabled={disabled}
                        placeholder="Enter the email address of the user"
                        id="email"
                        name="email"
                        type="email"
                        variant="outlined"
                        size="small"
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                        value={user.email}
                        onChange={handleChange}
                        // onKeyUp={''}
                      />
                    </Grid>

                    <Grid
                      className={classes.itemGrid}
                      item
                      md={6}
                      lg={6}
                      xl={6}
                    >
                      <Typography
                        className={classes.typography}
                        style={{
                          marginBottom: "-11px",
                        }}
                      >
                        Username
                      </Typography>
                      <TextField
                        className={classes.textField}
                        placeholder="Enter a username for the user"
                        id="staffname"
                        name="staffname"
                        type="text"
                        variant="outlined"
                        size="small"
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                        value={user.staffname}
                        onChange={handleChange}
                        // onKeyUp={''}
                      />
                    </Grid>

                    <Grid
                      className={classes.itemGrid}
                      item
                      md={6}
                      lg={6}
                      xl={6}
                    >
                      <Typography
                        className={classes.typography}
                        style={{
                          marginBottom: "-11px",
                        }}
                      >
                        Password
                      </Typography>
                      <TextField
                        className={classes.textField}
                        disabled={disabled}
                        type="password"
                        placeholder="Enter your password"
                        id="password"
                        name="password"
                        variant="outlined"
                        size="small"
                        autoFocus
                        required
                        fullWidth
                        margin="normal"
                        value={"**********"}
                        onChange={handleChange}
                        // onKeyUp={''}
                      />
                    </Grid>

                    <Grid
                      className={classes.itemGrid}
                      item
                      md={6}
                      lg={6}
                      xl={6}
                    >
                      <Typography
                        className={classes.typography}
                        style={{
                          marginBottom: "-11px",
                        }}
                      >
                        Role
                      </Typography>
                      <FormControl
                        variant="outlined"
                        style={{ width: "100%" }}
                        className={classes.formControl}
                      >
                        <Select
                          id="role"
                          value={
                            user.is_superuser
                              ? "super"
                              : user.is_credit_officer
                              ? 'credit_officer'
                              : user.is_branch_manager
                              ? 'branch_manager'
                              : user.is_senior_manager
                              ? 'senior_manager'
                              : user.is_agency_bank
                              ? 'agency_bank'
                              : ""
                          }
                          name="role"
                          displayEmpty
                          // native={false}
                          // renderValue={(value) => value}
                          onChange={handleChange}
                          input={<BootstrapInput />}
                        >
                          <MenuItem disabled={roles.length > 0} value="">
                            <Typography
                              noWrap
                              className={classes.menuPlaceholder}
                            >
                              Select Role
                            </Typography>
                          </MenuItem>

                          {roles.map((role) => (
                            <MenuItem key={role.id} value={role.value}>
                              <Typography noWrap className={classes.typography}>
                                {role.name}
                              </Typography>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      style={{
                        backgroundColor: "#72A624",
                        color: "white",
                        width: "70px",
                        height: "40px",
                        opacity: "1",
                      }}
                      className={classes.submit}
                    >
                      {loading ? (
                        <CircularProgress
                          size="2em"
                          style={{ color: "#fff" }}
                        />
                      ) : (
                        // "Login"
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
                          Update
                        </Typography>
                      )}
                    </Button>

                    <Link href={"/user_management/users"}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{
                          backgroundColor: "red",
                          marginLeft: "10px",
                          color: "white",
                          width: "70px",
                          height: "40px",
                          opacity: "1",
                        }}
                        className={classes.submit}
                      >
                        <Typography
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
                          cancel
                        </Typography>
                      </Button>
                    </Link>
                  </Box>
                </form>
              )
            )}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
