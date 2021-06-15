import React, { useState } from 'react'
import Layout from './Layout'
import {
  Box,
  Typography,
  Button,
  Divider,
  AppBar,
  Tabs,
  Tab,
  withWidth,
  Toolbar,
  Hidden,
  Modal,
  Backdrop,
  Fade,
  InputBase,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import clsx from 'clsx';
import axios from 'axios';
import { Add, Close } from '@material-ui/icons'
import { useSnackbar } from 'notistack'




const useStyles = makeStyles((theme) => ({
  typography: {
    fontfamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    color: '#2F3237',
    lineHeight: '28px',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#FFFFFF',
  },
  appbar: {
    backgroundColor: '#FFFFFF00',
    boxShadow: 'none',
    color: '#242120',
    display: 'flex',
    width: '100%',
  },
  tab1: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "50%",
      width: "50%",
    }
  },
  indicator: {
    backgroundColor: '#FF5C00',
  },
  root: {
    flexGrow: 1,
    width: '100%',
  },
  scrollmenu: {
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  anchor: {
    display: 'inline-block',
    textDecoration: 'none',
    padding: '14px',
  },
  bodyWidth: {
    width: '95%',
    maxWidth: "1440px",
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.05)',
    [theme.breakpoints.down('md')]: {
      width: '96%',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#FFFFFF",
    borderRadius: '8px',
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 8, 3),
    "&:focus": {
      outline: "none"
    }
  },
  textField: {
    border: "1px solid #EAEAEA",
    borderRadius: "5px",
    width: "100%",
    height: "42px",
    padding: "1rem",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
  },
  label: {
    color: "000000, 90%",
    fontWeight: 400,
  },
  buttonBox: {
    textAlign: "right",
    margin: "4.5rem 0 2rem 0",
  },
}))




function Tables(props) {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const { tableNav, name, width, currentPath } = props

  const [values, setValues] = useState(tableNav);
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    userType: "influencer",
    pageFrom: "vendor",
    password: `${Math.random() * 1000000}`,
  });

  const handleChange = (event, newValue) => {
    setValues(
      values
        .map(value => ({ ...value, active: false }))
        .map((value, index) => ({
          ...value,
          active: index === newValue
        }))
    );
  };

  const handleAddInfluencerOpen = () => {
    setOpen(true);
  };

  const handleAddInfluencerClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event, parent) => {

    const { name, value } = event.target;
    // if (parent) {
    //   setInput({
    //     ...values,
    //     [parent]: { ...values[parent], [name.split(":")[1]]: value },
    //   });
    // } else {
    //   setInput({ ...values, [name]: value, });
    // }
    setInput({ ...input, [name]: value });
  }

  // Add influencer form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = { ...input }
    console.log(body)

    // const token = isAuthenticated().authToken
    // const url = `${process.env.BACKEND_URL}/api/auth/signu`
    const url = 'http://localhost:8000/api/auth/signup'

    try {
      const response = await axios.post(
        url,
        body,
        // { headers: { authenticate: token } }
      )

      console.log(response);

      if (response.data.success) {
        enqueueSnackbar("Edited Successfully", {
          variant: 'success',
        });
      }
    } catch (error) {
      enqueueSnackbar("There was an error while editing", {
        variant: 'error',
      });
      console.log(error);
    }

    setOpen(false);
  }

  const active = values.findIndex(value => value.active)

  const path = values.find(value => value.active).link

  return (
    <Layout path={path}>
      <Box
        display="flex"
        flexDirection="column"
        style={{
          marginTop: '-50px',
          paddingLeft: '2.5%',
          width: '100%',
        }}
      >
        <Box style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%"
        }}>
          <Typography className={classes.typography}>
            {name}
          </Typography>

          {router.pathname === "/influencers" || currentPath ?
            <Button style={{
              background: "#FFF2EB",
              color: "#FF5C00",
              borderRadius: "6px",
            }}
              onClick={handleAddInfluencerOpen}
            >
              <Add style={{ fontSize: "1.2rem", marginRight: "0.3rem" }} />
              <Typography style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                ADD
              </Typography>
            </Button> : ""
          }
        </Box>

        <Box>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleAddInfluencerClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box className={classes.paper}>
                <Button style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderRadius: "2px",
                  width: "4.2rem",
                  padding: 0,
                  margin: "1rem 0 2rem 0"
                }}
                  size="large"
                  disableRipple
                  onClick={handleAddInfluencerClose}
                >
                  <Close style={{
                    fontWeight: 500, fontSize: "1.2rem",
                    color: "#000000", marginRight: "0.3rem"
                  }} />
                  <Typography style={{ fontWeight: 400, color: "#242120" }}>
                    Close
                  </Typography>
                </Button>
                
                <h2 style={{ marginBottom: "3rem" }} id="transition-modal-title">Add Influencer</h2>

                <form noValidate onSubmit={handleSubmit}>
                  <Box style={{ display: "flex", justifyContent: "space-between" }}>
                    <Box style={{ width: "48%" }}>
                      <Typography
                        className={classes.label}
                        component="legend">First Name</Typography>
                        
                      <InputBase
                        name="firstName"
                        className={classes.textField}
                        variant="outlined"
                        value={input.firstName}
                        onChange={handleInputChange}
                      />
                    </Box>

                    <Box style={{ width: "48%" }}>
                      <Typography
                        className={classes.label}
                        component="legend">Last Name</Typography>
                      <InputBase
                        name="lastName"
                        className={classes.textField}
                        variant="outlined"
                        value={input.lastName}
                        onChange={handleInputChange}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      className={classes.label}
                      component="legend">Email</Typography>
                    <InputBase
                      name="email"
                      className={classes.textField}
                      variant="outlined"
                      value={input.email}
                      onChange={handleInputChange}
                    />
                  </Box>

                  <Box>
                    <Typography
                      className={classes.label}
                      component="legend">Phone</Typography>
                    <InputBase
                      name="phone"
                      className={classes.textField}
                      variant="outlined"
                      value={input.phone}
                      onChange={handleInputChange}
                    />
                  </Box>

                  <Box>
                    <Typography
                      className={classes.label}
                      component="legend">Address</Typography>
                    <InputBase
                      style={{ height: "84px", }}
                      className={classes.textField}
                      variant="outlined"
                      multiline
                      type="text"
                      rows={4}
                      value={input.address}
                      name="address"
                      onChange={handleInputChange}
                    />
                  </Box>

                  <Box className={classes.buttonBox}>
                    <Button
                      style={{
                        color: "#888888",
                        borderRadius: "4px",
                        marginRight: "1rem",
                      }}
                      onClick={handleAddInfluencerClose}
                    >
                      <Typography style={{ fontSize: "0.9rem", }}>
                        CANCEL
                      </Typography>
                    </Button>

                    <Button
                      style={{
                        background: "#FF5C00",
                        color: "#FFFFFF",
                        borderRadius: "4px",
                      }}
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      <Typography style={{ fontSize: "0.9rem", }}>
                        ADD
                      </Typography>
                    </Button>
                  </Box>
                </form>
              </Box>
            </Fade>
          </Modal>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          className={classes.bodyWidth}
          style={{
            border: '1px solid #EAEAEA',
            marginTop: '30px',
            borderRadius: '10px',
          }}
        >
          <AppBar className={classes.appbar} position="static">
            <Hidden lgUp>
              <Toolbar>
                {values.map((value, i) => (
                  <Link key={value.label} href={value.link}>
                    <Button
                      variant="text"
                      disableRipple
                      // size="small"
                      className={clsx(classes.button)}
                    >
                      <Typography
                        className={classes.typography}
                        style={{
                          fontWeight: '400',
                          fontSize: '15px',
                          lineHeight: '18px',
                          lineSpacing: '0.05em',
                          color: '#242120',
                          borderBottom: path === value.link ? '2px solid #FF5C00' : 'none',
                          paddingBottom: '6px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {value.label}
                      </Typography>
                    </Button>
                  </Link>
                ))}
              </Toolbar>
            </Hidden>

            <Hidden mdDown>
              <Tabs
                value={active}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons={['xs', 'sm'].includes(width) ? 'on' : 'auto'}
                classes={{
                  indicator: classes.indicator,
                }}
              >
                {values.map((value, i) => (
                  <Link key={value.label} href={value.link}>
                    <Tab
                      key={value.label}
                      value={i}
                      label={value.label}
                      className={clsx(classes.typography && classes.tab1)}
                      style={{
                        fontWeight: '400',
                        fontSize: '15px',
                        lineHeight: '18px',
                        lineSpacing: '0.05em',
                        color: '#242120',
                        textTransform: 'uppercase',
                      }}
                    />
                  </Link>
                ))}
              </Tabs>
            </Hidden>
          </AppBar>

          <Divider light />

          <main>
            {props.children}
          </main>
        </Box>
      </Box>
    </Layout>
  )
}

Tables.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(Tables)
