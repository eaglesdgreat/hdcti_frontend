import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  InputBase,
  Grid,
  CircularProgress
} from '@material-ui/core';
import {
  ArrowBackIos,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
import moment from 'moment'
import { useSnackbar } from 'notistack'

import TableLayout from './../../../../Components/Tables'
import { isAuthenticated } from './../../../../lib/auth.helper'
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
    link: '/users/stats',
  },
  {
    active: true,
    label: 'sign ups',
    link: '/users/signups',
  },
  {
    active: false,
    label: 'customers',
    link: '/users/customers',
  },
  {
    active: false,
    label: 'vendors',
    link: '/users/vendors'
  },
]


const fetcher = async (...arg) => {
  const [url, token] = arg

  // const {url, token} = arg

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}


const userData = () => {
  const router = useRouter()
  const { edit } = router.query

  const url = `${process.env.BACKEND_URL}/api/get-user/${edit}`

  const token = isAuthenticated().authToken

  const options = {
    shouldRetryOnError: false,
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }

  const { data, error, mutate: userMutate } = useSWR([url, token], fetcher, { ...options })

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    userMutate
  }
}


export default function Edit() {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { edit } = router.query

  // Fetching data from backend with SWR
  const { user, isLoading, isError, userMutate } = userData()
  // console.log(user)

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false);

  const additionalType = (type) => {
    const check = type.split(',')
    let addType = []

    for (let i = 0; i < check.length; i++) {
      if (check[i] !== 'user') {
        addType.push(check[i])
      }
    }

    return addType
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    // console.log(data)

    userMutate((data) => {
      // console.log(data.user)
      return {
        ...user,
        user: { ...data.user, [name]: value }
        // ...data.user,
        // [name]: value 
      }
    }, false)
    // console.log(user)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = { ...data }
    // console.log(body)


    const token = isAuthenticated().authToken
    const url = `${process.env.BACKEND_URL}/api/update-user/${edit}`

    try {
      setLoading(true);
      // await productMutate(async(data) => {
      const response = await axios.patch(
        url,
        body,
        { headers: { authenticate: token } },
      )

      // console.log(response.data)
      if (response.data.success) {
        // router.push(`/users/signup/${edit}`)
        enqueueSnackbar(`${response.data.success}`, {
          variant: 'success',
        });

        setLoading(false);
      }
    } catch (e) {
      console.log(e)

      setLoading(false);

      if (e.response) {
        enqueueSnackbar(`${e.response.data.errors.message}. Try again`, {
          variant: 'error',
        });
      }
    }
  }


  return (
    <TableLayout tableNav={tableNav} name="Users">
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
            :
            isLoading ?
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
                <CircularProgress style={{ 'color': '#FF5C00' }} />
              </Box> : user.user &&
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
                        {user.user.firstName} {user.user.lastName}
                      </Typography>

                      {
                        user.user.activated === 1
                          ? <Box className={classes.status}>
                            <img src="/check-circle.svg" style={{ marginRight: "0.5rem" }} />
                            <Typography style={{
                              fontSize: "0.9rem",
                              fontWeight: 500,
                              padding: "0.5rem 0",
                            }}>
                              VERIFIED
                            </Typography>
                          </Box>
                          : <Box className={classes.status}>
                            <Typography style={{
                              fontSize: "0.9rem",
                              fontWeight: 500,
                              padding: "0.5rem 0",
                            }}>
                              UNVERIFIED
                            </Typography>
                          </Box>
                      }
                    </Box>

                    <Box style={{
                      padding: "1rem 2rem 1rem 1rem",
                    }}>
                      <Typography style={{ color: "#6A6A6A" }}>
                        Contact Info
                      </Typography>

                      <Typography>
                        {user.user.email}
                      </Typography>

                      <Typography style={{ fontWeight: "500", }}>
                        {user.user.phone}
                      </Typography>

                      <Box style={{ marginTop: "1rem", }}>
                        <Typography style={{ color: "#6A6A6A", marginBottom: "0.4rem" }}>
                          Address
                        </Typography>

                        <Typography>
                          {user.user.address}, {user.user.city}, {user.user.state}
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

                        {
                          additionalType(user.user.userTypes).map((type, i) => (
                            <Link
                              key={i}
                              href={
                                (type === 'wholesaler' || type === 'vendor')
                                  ? `/users/vendor/${user.user.id}`
                                  : type === 'customer'
                                    ? `/users/customer/${user.user.id}`
                                    : type === 'influencer'
                                      ? `/influencers/all/${user.user.id}?code=${user.user.refCode}` : ''
                              }
                            >
                              <a
                                style={{
                                  textDecoration: 'none'
                                }}
                              >
                                <Button
                                  disableRipple
                                  size="small"
                                  variant="contained"
                                  className={classes.button}
                                  style={{
                                    background: '#FFFFFF00'
                                  }}
                                >
                                  <Typography key={i} style={{
                                    padding: "0.15rem 0",
                                    color: "#242120",
                                  }}>
                                    {type}
                                  </Typography>
                                </Button>
                              </a>
                            </Link>
                          ))
                        }
                      </Box>
                    </Box>
                  </Box>

                  <Box style={{ padding: "1rem" }} className={classes.boxDisplay}>
                    <Typography>
                      Last Login
                    </Typography>

                    <Typography>
                      {user.user.lastLogin ? moment(user.user.lastLogin).format('DD MMM YYYY') : ''}
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
                            value={user.user.firstName}
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
                            value={user.user.lastName}
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
                          value={user.user.email}
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
                          value={user.user.phone}
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
                          value={user.user.address}
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
                            value={user.user.state}
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
                            value={user.user.city}
                            onChange={handleChange}
                          />
                        </Box>
                      </Box>

                      <Box className={classes.buttonBox}>
                        <Link href="/users/signups">
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
                          {
                             loading
                             ? <CircularProgress size="2em" style={{ color: '#FFFFFF' }} />
                             :
                            <Typography style={{ fontSize: "0.9rem", }}>
                              SAVE
                            </Typography>
                          }
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Grid>
              </Grid>
        }
      </Box>
    </TableLayout >
  )
}