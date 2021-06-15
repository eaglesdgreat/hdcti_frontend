import React, { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  InputBase,
  Grid,
} from '@material-ui/core';
import {
  ArrowBackIos,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios';
import moment from 'moment'
import ReactLoading from 'react-loading'
import { useSnackbar } from 'notistack'

import { isAuthenticated } from '../../../../lib/auth.helper';
import TableLayout from './../../../../Components/Tables'
import PrivateRoute from './../../../../Components/PrivateRoute'

// CSS Styles
const useStyles = makeStyles(() => ({
  container: {
    margin: "0 auto",
    padding: "2rem 4rem 6rem 2rem",
  },
  textField: {
    border: "1px solid #EAEAEA",
    borderRadius: "5px",
    width: "100%",
    height: "42px",
    padding: "1rem",
    fontSize: "0.9rem",
    fontWeight: 500,
    marginBottom: "1.5rem",
  },
  label: {
    color: "000000, 90%",
    fontWeight: 400,
  },
  back: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginBottom: "5rem",
  },
  button: {
    color: "#FF5C00",
    background: "rgba(255, 92, 1, 0.08)",
    padding: "0.6rem 0.9rem",
  },
  boxDisplay: {
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  buttonBox: {
    textAlign: "right",
    marginTop: "1.5rem",
  },
  typography: {
    fontfamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    color: '#2F3237',
    lineHeight: '28px',
  },
  buttonHover: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  status: {
    color: "#FF5C00",
    marginTop: "0.4rem",
    display: "flex",
    justifyContent: "center",
    AlignItems: "center",
    marginBottom: "0.5rem",
    borderRadius: "6px",
    background: "#FFF2EB",
    width: "8rem",
  },
}));

const tableNav = [
  {
    active: false,
    label: 'stats',
    link: '/influencers/stats',
  },
  {
    active: true,
    label: 'all',
    link: '/influencers/all',
  },
];

const fetcher = async (...arg) => {
  const [url, token] = arg

  // const {url, token} = arg

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}

const influencerData = () => {
  const router = useRouter()
  const { edit, code } = router.query

  const url = `${process.env.BACKEND_URL}/api/get-influencer/${edit}?code=${code}`

  const token = isAuthenticated().authToken

  const options = {
    shouldRetryOnError: false,
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }

  const { data, error, mutate: influencerMutate } = useSWR([url, token], fetcher, { ...options })

  return {
    influencer: data,
    isLoading: !error && !data,
    isError: error,
    influencerMutate
  }
}

export default function Edit() {
  const classes = useStyles();
  const router = useRouter();
  const { edit, code } = router.query
  const { enqueueSnackbar } = useSnackbar();

  // Fetching data from backend with SWR
  const { influencer, isLoading, isError, influencerMutate } = influencerData();

  const [data, setData] = useState({});

  const handleChange = (event) => {

    const { name, value } = event.target;
    setData({ ...data, [name]: value });

    influencerMutate((data) => {
      return {
        ...influencer,
        influencer: { ...data.influencer, [name]: value }
      }
    }, false)

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = { ...data }

    const token = isAuthenticated().authToken
    const url = `${process.env.BACKEND_URL}/api/update-influencer/${edit}`

    try {
      const response = await axios.patch(
        url,
        body,
        { headers: { authenticate: token } }
      )

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
  }

  const additionalType = (type) => {
    const check = type.split(',')
    let addType

    for (let i = 0; i < check.length; i++) {
      if (check[i] !== 'influencer') {
        addType = check[i]
        break
      }
    }

    return addType
  }

  return (
    <TableLayout tableNav={tableNav} name="Influencer">
      <Box className={classes.container}>
        <span className={classes.back}>
          <Button
            size="large"
            className={classes.buttonHover}
            disableRipple
            onClick={() => router.back()}
          >
            <ArrowBackIos style={{ fontSize: "0.9rem", }} />
            <Typography style={{ fontSize: "0.9rem", }}>
              BACK
            </Typography>
          </Button>
        </span>

        {
          isError ? (<PrivateRoute isError={isError} />)
            : isLoading ?
              <Box
                display="flex"
                justifyContent="center"
                style={{
                  margin: 'auto',
                  paddingLeft: 100,
                  paddingRight: 100,
                  paddingTop: 150,
                  paddingBottom: 150,
                }}
              >
                <ReactLoading type={'spinningBubbles'} color={"#FF5C00"} height={'20%'} width={'10%'} />
              </Box> : influencer &&
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12} sm={5} md={5} lg={5} xl={5}
                >
                  <Box style={{ paddingBottom: "3rem", marginBottom: "1rem" }} className={classes.boxDisplay}>
                    <Box style={{
                      background: "#FF5C00",
                      borderRadius: "4px 4px 0 0",
                      padding: "1rem 1rem",
                    }}>
                      <Typography style={{ fontWeight: 600, color: "#FFFFFF" }}>
                        {influencer.influencer.firstName} {influencer.influencer.lastName}
                      </Typography>
                      <Box className={classes.status}>
                        {influencer.influencer.verified === 0 ? "" :
                          <img src="/check-circle.svg" style={{ marginRight: "0.5rem" }} />
                        }
                        <Typography style={{
                          fontSize: "0.9rem",
                          fontWeight: 500,
                          padding: "0.5rem 0",
                        }}>
                          {influencer.influencer.verified === 0 ? "UNVERIFIED" : "VERIFIED"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box style={{
                      padding: "1rem 2rem 1rem 1rem",
                    }}>
                      <Typography style={{ color: "#6A6A6A" }}>
                        Contact Info
                      </Typography>
                      <Typography>
                        {influencer.influencer.email}
                      </Typography>
                      <Typography style={{ fontWeight: "500", }}>
                        {influencer.influencer.phone}
                      </Typography>
                      <Box style={{ marginTop: "1rem", }}>
                        <Typography style={{ color: "#6A6A6A", marginBottom: "0.4rem" }}>
                          Address
                      </Typography>
                        <Typography>
                          {influencer.influencer.address}, {influencer.influencer.city}, {influencer.influencer.state}
                        </Typography>
                      </Box>
                      <Box style={{
                        marginTop: "1rem"
                      }}>
                        <Typography style={{
                          color: "#6A6A6A",
                        }}>
                          Additional User Type
                        </Typography>
                        <Typography style={{
                          padding: "0.15rem 0",
                          color: "#242120",
                        }}>
                          {additionalType(influencer.influencer.userTypes)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box style={{ padding: "1rem" }} className={classes.boxDisplay}>
                    <Typography>
                      Last Login
                    </Typography>
                    <Typography>
                      {moment(influencer.lastLogin).format('MMM DD, YYYY')}, {moment(influencer.lastLogin).format('hh:mm a')}
                    </Typography>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12} sm={7} md={7} lg={7} xl={7}
                >
                  <Box className={classes.boxForm}>
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
                            value={influencer.influencer.firstName}
                            onChange={handleChange}
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
                            value={influencer.influencer.lastName}
                            onChange={handleChange}
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
                          value={influencer.influencer.email}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box style={{ width: "40%" }}>
                        <Typography
                          className={classes.label}
                          component="legend">Phone</Typography>
                        <InputBase
                          name="phone"
                          className={classes.textField}
                          variant="outlined"
                          value={influencer.influencer.phone}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box>
                        <Typography
                          className={classes.label}
                          component="legend">Address</Typography>
                        <InputBase
                          name="address"
                          style={{ height: "84px", }}
                          className={classes.textField}
                          variant="outlined"
                          multiline
                          rows={4}
                          value={influencer.influencer.address}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box style={{ display: "flex", justifyContent: "space-between" }}>
                        <Box style={{ width: "48%" }}>
                          <Typography
                            className={classes.label}
                            component="legend">State</Typography>
                          <InputBase
                            name="state"
                            className={classes.textField}
                            variant="outlined"
                            value={influencer.influencer.state}
                            onChange={handleChange}
                          />
                        </Box>

                        <Box style={{ width: "48%" }}>
                          <Typography
                            className={classes.label}
                            component="legend">City</Typography>
                          <InputBase
                            name="city"
                            className={classes.textField}
                            variant="outlined"
                            value={influencer.influencer.city}
                            onChange={handleChange}
                          />
                        </Box>
                      </Box>

                      <Box className={classes.buttonBox}>
                        <Link href="/users/customers">
                          <Button
                            style={{
                              color: "#FF5C00",
                              border: "1px solid #FF5C00",
                              borderRadius: "4px",
                              marginRight: "1rem",
                            }}
                            variant="outlined"
                          >
                            <Typography style={{ fontSize: "0.9rem", }}>
                              CANCEL
                          </Typography>
                          </Button>
                        </Link>

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
                            SAVE
                        </Typography>
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Grid>
              </Grid>
        }
      </Box>
    </TableLayout>
  )
}