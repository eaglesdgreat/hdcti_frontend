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
  NoSsr,
  Card,
  CardContent,
  Container,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Alert, AlertTitle } from "@material-ui/lab";
import Link from "next/link";
import { useSnackbar } from "notistack";
import clsx from "clsx";

// import { useStateValue } from '../../StateProviders';
import Layout from "../../../Components/Layout";
import validations from "./../../../lib/validations";
import { isAuthenticated } from "../../../lib/auth.helper";
// import PrivateRoute from "./../../Components/PrivateRoute";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    paddingTop: 50,
    margin: "auto",
    background: "#ECF1F2 0% 0% no-repeat padding-box",
    background: "var(--unnamed-color-ecf1f2) 0% 0% no-repeat padding-box",
    opacity: "1",
    [theme.breakpoints.down("sm")]: {
      marginTop: -70,
    },
  },
  card: {
    width: "100%",
    height: "400px",
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
  box: {
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
    "& input": {
      fontSize: "16px",
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
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "5px",
    opacity: "1",
  },
  form: {
    width: "89%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    fontSize: "14px",
  },
  submit: {
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
  success: {
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-155724)",
    textAlign: "left",
    letterSpacing: "0px",
    color: "#155724",
    opacity: 1,
    fontSize: "16px",
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

const groupData = () => {
  const router = useRouter();
  const { gpid } = router.query;

  //   const url = `${process.env.BACKEND_URL}/account/groupbyid/${gpid}`;
  const url = `https://hcdti.savitechnig.com/account/groupbyid/${gpid}`;

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
    mutate: groupMutate,
  } = useSWR([url, token], fetcher, { ...options });

  return {
    group: data,
    isLoading: !error && !data,
    isError: error,
    groupMutate,
  };
};

export default function Update() {
  const path = "/groups";
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { gpid } = router.query;
  const token = isAuthenticated().auth_token;

  const { group, isLoading, isError, groupMutate } = groupData();
  console.log(group);

  const initialState = {
    name: "",
  };

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  // const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...initialState, [name]: value });

    groupMutate((data) => {
      return {
        ...group,
        result: { ...data.result, groupName: value },
      };
    }, false);
  };

  const clearError = (e) => {
    const { name } = e.target;
    setMessages({ ...messages, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (isValid) {
      const validate = validations(state.name, "Group Name");
      if (validate.status) {
        setMessages({ ...messages, name: validate.message });
        isValid = false;
      } else {
        setMessages({ ...messages, name: "" });
      }
    }

    const body = {
      groupName: state.name || null,
    };
    // console.log(body)

    // const url = `${process.env.BACKEND_URL}/account/updategroup/${gpid}`;
    const url = `https://hcdti.savitechnig.com/account/updategroup/${gpid}`;

    if (isValid) {
      setLoading(true);

      try {
        const response = await axios.put(url, body, {
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
          } else {
            enqueueSnackbar(`Operation Failed, Try again`, {
              variant: "error",
            });
          }
        }
      }
    }
  };

  return (
    <Layout path={path}>
      <NoSsr>
        <div className={classes.root}>
          <Container maxWidth="sm">
            <Box display="flex" className={classes.box}>
              <Card className={clsx(classes.card)}>
                <CardContent style={{ padding: "0px" }}>
                  <Typography
                    className={classes.typography}
                    style={{
                      padding: "16px",
                      paddingLeft: "30px",
                      fontWeight: 600,
                    }}
                  >
                    Update Group
                  </Typography>

                  <Divider light />

                  <Box
                    display="flex"
                    justifyContent="center"
                    className={classes.box}
                    // style={{ width: '60%' }}
                  >
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
                        <CircularProgress
                          size="3em"
                          style={{ color: "#362D73" }}
                        />
                      </Box>
                    ) : (
                      group && (
                        <form
                          className={classes.form}
                          noValidate
                          onSubmit={handleSubmit}
                        >
                          <Grid container spacing={6}>
                            <Grid item xs={12} sm={12}></Grid>

                            <Grid item xs={12} sm={12}>
                              <Typography
                                className={classes.typography}
                                style={{
                                  marginBottom: "-11px",
                                }}
                              >
                                Name of Group
                                <span style={{ color: "red" }}>*</span>
                              </Typography>

                              <TextField
                                className={classes.textField}
                                placeholder="Change group name"
                                id="name"
                                name="name"
                                type="text"
                                variant="outlined"
                                size="small"
                                autoFocus
                                required
                                fullWidth
                                margin="normal"
                                value={group.result.groupName}
                                onChange={handleChange}
                                onKeyUp={clearError}
                              />
                              {messages.name && (
                                <Alert severity="error">
                                  {/* <AlertTitle>Error</AlertTitle> */}
                                  {messages.name}
                                </Alert>
                              )}
                            </Grid>
                          </Grid>

                          <Box display="flex">
                            <div
                              style={{
                                width: "55%",
                                display: "flex",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                style={{
                                  backgroundColor: "#72A624",
                                  color: "white",
                                  width: "128px",
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
                                      letterSpacing:
                                        "var(--unnamed-character-spacing-0)",
                                      color: "var(--unnamed-color-ffffff)",
                                      textAlign: "center",
                                      font: "normal normal 600 14px/21px Poppins",
                                      letterSpacing: "0px",
                                      color: "#FFFFFF",
                                      opacity: "1",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Update Group
                                  </Typography>
                                )}
                              </Button>
                            </div>
                          </Box>
                        </form>
                      )
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Container>
        </div>
      </NoSsr>
    </Layout>
  );
}
