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
  NoSsr,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Container,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import useSWR from "swr";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { PieChart } from "react-minimal-pie-chart";
import { Autocomplete, Alert, AlertTitle } from "@material-ui/lab";

import { useStateValue } from "../../StateProviders";
import Layout from "./../../Components/Layout";
import validations from "./../../lib/validations";
import { isAuthenticated } from "./../../lib/auth.helper";
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
    height: "450px",
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
  formTypo: {
    marginBottom: "10px",
  },
}));



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

const groupsData = () => {
  // const url = `${process.env.BACKEND_URL}/account/allgroup?page=1`
  const url = `https://hcdti.savitechnig.com/account/allgroup?page=1`;
  const token = isAuthenticated().auth_token;

  const { data, error } = useSWR([url, token], fetcher, {
    shouldRetryOnError: false,
  });

  return {
    groups: data,
    isLoading: !error && !data,
    isError: error,
  };
};


export default function ChangeLeader() {
  const path = "/groups";
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const token = isAuthenticated().auth_token;

  // Fetching data from backend with SWR
  const { groups, isLoading, isError } = groupsData();
  // console.log(groups);

  const initialState = {
    groupId: "",
    number: "",
  };

  const [state, setState] = useState(initialState);
  const [inputValueMember, setInputValueMember] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [members, setMembers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  useEffect(() => {
    // console.log(show, state)
    return 
  }, [show, state.groupId, state.number])

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   if (name === "isLeader") {
  //     setState({ ...state, [name]: !state.isLeader });
  //   } else {
  //     setState({ ...state, [name]: value });
  //   }
  // };

  const clearError = (e) => {
    const { id } = e.target;
    const name = id.split('-')[0]
    setMessages({ ...messages, [name]: "" });
  };

  const getMembers = async (gId) => {
    // const url = `${process.env.BACKEND_URL}/account/get_group_member/${gId}?page=1`
    const url = `https://hcdti.savitechnig.com/account/get_group_member/${gId}?page=1`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
        // params: {page:1}
      });
      // console.log(response)

      setMembers(response.data.results.result)
      setShow(false)
    } catch (e){
      console.log(e)
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    // if (isValid) {
    //   const validate = validations(state.groupName, "Group ID");
    //   if (validate.status) {
    //     setMessages({ ...messages, groupName: validate.message });
    //     isValid = false;
    //   }
    // }

    if (isValid) {
      const validate = validations(state.groupId, "Group name");
      if (validate.status) {
        setMessages({ ...messages, groupId: validate.message });
        isValid = false;
      }
    }

    if (isValid) {
      const validatePass = validations(state.number, "Member name");
      if (validatePass.status) {
        setMessages({ ...messages, number: validatePass.message });
        isValid = false;
      }
    }

    const body = { ...state }

    // console.log(body, token);

    // const url = `${process.env.BACKEND_URL}/account/${state.groupId}/${state.number}`;
    const url = `https://hcdti.savitechnig.com/account/changeleader/${state.groupId}/${state.number}`;

    if (isValid) {
      setLoading(true);

      try {
        const response = await axios.put(url, body, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        // setMessages({ ...messages, success: response.data.success.message });
        setState(initialState);

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

          // setState(initialState);
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
                    Select Group Leader
                  </Typography>

                  <Divider light />

                  <Box
                    display="flex"
                    justifyContent="center"
                    className={classes.box}
                    // style={{ width: '60%' }}
                  >
                    <form
                      className={classes.form}
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <Grid container spacing={6}>
                        <Grid item xs={12} sm={12}>
                          <Typography
                            className={classes.typography}
                            style={{
                              marginBottom: "10px",
                            }}
                          >
                            Select Group<span style={{ color: "red" }}>*</span>
                          </Typography>

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
                              <Autocomplete
                                id="noData"
                                options={[]}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="No Group Found"
                                    variant="outlined"
                                  />
                                )}
                              />
                            </Box>
                          ) : isLoading ? (
                            <Box
                              display="flex"
                              justifyContent="flex-start"
                              style={{
                                width: "100%",
                                // margin: "auto",
                                // paddingLeft: 100,
                                // paddingRight: 100,
                                // paddingTop: 150,
                                // paddingBottom: 150,
                              }}
                            >
                              <CircularProgress
                                size="2em"
                                style={{ color: "#362D73" }}
                              />
                            </Box>
                          ) : (
                            groups && (
                              <Autocomplete
                                id="groupId"
                                options={groups.results}
                                getOptionSelected={(option, value) =>
                                  option.groupName === value.groupName
                                }
                                getOptionLabel={(option) => option.groupName}
                                // value={state.groupId}
                                // selectOnFocus
                                onInput={clearError}
                                onChange={(event, newValue) => {
                                  const id = event.target.id;
                                  const name = id.split("-")[0];

                                  if (newValue !== null) {
                                    getMembers(newValue.groupId);
                                    clearError(event);
                                    setState({
                                      ...state,
                                      [name]: newValue.groupId,
                                    });
                                  } else {
                                    setShow(true);
                                    setState({
                                      ...state,
                                      groupId: "",
                                      number: "",
                                    });
                                  }
                                }}
                                // inputValue={inputValue}
                                // onInputChange={(event, newInputValue) => {
                                //   setInputValue(newInputValue.name);
                                // }}
                                // style={{ width: "100%", height: "40px" }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Select Group Name"
                                    size="small"
                                    variant="outlined"
                                  />
                                )}
                              />
                            )
                          )}

                          {messages.groupId && (
                            <Alert severity="error">
                              {/* <AlertTitle>Error</AlertTitle> */}
                              {messages.groupId}
                            </Alert>
                          )}
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <Typography
                            className={clsx(
                              classes.typography,
                              classes.formTypo
                            )}
                            variant="body1"
                            gutterBottom
                          >
                            Select Member<span style={{ color: "red" }}>*</span>
                          </Typography>

                          <Autocomplete
                            id="number"
                            disabled={show}
                            options={members}
                            getOptionSelected={(option, value) =>
                              option.memberName === value.memberName
                            }
                            getOptionLabel={(option) => option.memberName}
                            // value={state.number}
                            onInput={clearError}
                            // selectOnFocus
                            onChange={(event, newValue) => {
                              const id = event.target.id;
                              const name = id.split("-")[0];

                              if (newValue !== null) {
                                clearError(event);
                                setState({
                                  ...state,
                                  [name]: newValue.mobileNumber,
                                });
                              } else {
                                setState({
                                  ...state,
                                  number: "",
                                });
                              }
                            }}
                            // inputValue={inputValueMember}
                            // onInputChange={(event, newInputValue) => {
                            //   setInputValueMember(newInputValue.memberName);
                            // }}
                            // style={{ width: "100%", height: "40px" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                label="Select Member Name"
                                variant="outlined"
                              />
                            )}
                          />

                          {messages.number && (
                            <Alert severity="error">
                              {/* <AlertTitle>Error</AlertTitle> */}
                              {messages.number}
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
                            disabled={loading || show}
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
                                Submit
                              </Typography>
                            )}
                          </Button>
                        </div>
                      </Box>
                    </form>
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
