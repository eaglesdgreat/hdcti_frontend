import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Box,
  Container,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  Divider,
  NoSsr,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import clsx from "clsx";
import { Alert, AlertTitle } from "@material-ui/lab";
import Link from 'next/link'

// import { authenticate } from "./../lib/auth.helper";
import Layout from "./../../Components/Layout";
import validations from "./../../lib/validations";
import { fontWeight } from "@material-ui/system";

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
  card: {
    width: "529px",
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
    // lineHeight: '35px',
    // fontSize: '25px',
    // fontWeight: 'bold',
    // fontFamily: 'Source Sans Pro',
    // letterSpacing: '0.01em',
    // fontStyle: 'normal',
    // color: '#000000',
    // textAlign: 'center',
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
    // height: '45px',
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
    width: "89%", // Fix IE 11 issue.
    marginTop: theme.spacing(4),
    fontSize: "14px",
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
  success: {
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-155724)',
    textAlign: 'left',
    letterSpacing: '0px',
    color: '#155724',
    opacity: 1,
    fontSize: '16px',
  }
}));

export default function CreateGroup() {
  const path = "/create_group";
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const errorMessageStyle = {
    color: "red",
    fontSize: "10px",
    fontWeight: "bolder",
    fontStyle: "oblique",
  };

  const initialState = {
    name: "",
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState({
    ...initialState,
    success: "",
    failure: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const clearError = (e) => {
    const { name } = e.target;
    setMessages({ ...messages, [name]: '' });
  };

  const createGroup = async (e) => {
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
      name: state.name || null,
    };
    // console.log(body);

    // const url = `${process.env.BACKEND_URL}/account/token/login`;
    const url = `https://hcdti.savitechnig.com/account/reset_password_otp`;

    if (isValid) {
      console.log(body);
      setMessages({ ...messages, success: 'Groups Created Successfully'})
      console.log(messages)
      // setLoading(true);

      // try {
      //   const response = await axios.post(url, body, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Token ${tok}`,
      //     },
      //   });

      //   if (response.data) {
      //     setLoading(false);
      //     setResetLoading(false);
      //     tok = "";

      //     enqueueSnackbar(`${response.data.reason}`, {
      //       variant: "success",
      //     });

      //     setOpen(true);
      //   }
      // } catch (e) {
      //   if (e.response) {
      //     console.log(e.response);
      //     setLoading(false);

      //     enqueueSnackbar(`Checkk your connection or invalid email`, {
      //       variant: "error",
      //     });
      //   }
      // }
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
                    Create a Group
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
                      onSubmit={createGroup}
                    >
                      <Grid container spacing={6}>
                        <Grid item xs={12} sm={12}>
                          {messages.success && (
                            <Alert severity="success">
                              {/* <AlertTitle>Success</AlertTitle> */}
                              <Typography className={classes.success}>
                                {messages.success} -{" "}
                                <Link href="/groups">
                                  <a
                                    className={classes.success}
                                    style={{
                                      textDecoration: "none",
                                      fontWeight: 700,
                                      cursor: "pointer",
                                    }}
                                  >
                                    {" "}
                                    View all Groups
                                  </a>
                                </Link>
                              </Typography>
                            </Alert>
                          )}
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <Typography
                            className={classes.typography}
                            style={{
                              marginBottom: "-11px",
                            }}
                          >
                            Name of Group<span style={{ color: "red" }}>*</span>
                          </Typography>

                          <TextField
                            className={classes.textField}
                            // type="email"
                            placeholder="Enter the name of the group"
                            id="name"
                            name="name"
                            type="text"
                            variant="outlined"
                            size="small"
                            autoFocus
                            required
                            fullWidth
                            margin="normal"
                            value={state.name}
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
                            width: "45%",
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
                                Create Group
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
