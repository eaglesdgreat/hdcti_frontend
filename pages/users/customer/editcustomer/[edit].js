import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  InputBase,
  CircularProgress,
} from '@material-ui/core';
import {
  ArrowBackIos,
  EditOutlined,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
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
    marginBottom: "2rem",
  },
  label: {
    marginBottom: "0.5rem",
    color: "000000, 90%",
    fontWeight: 400,
  },
  back: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginBottom: "3rem",
  },
  button: {
    color: "#FF5C00",
    background: "rgba(255, 92, 1, 0.08)",
    padding: "0.6rem 0.9rem",
  },
  boxDisplayForm: {
    display: "flex",
    justifyContent: "space-between",
  },
  boxDisplay: {
    width: "38%",
    height: "270px",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  boxForm: {
    width: "58%",
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
}));



const tableNav = [
  {
    active: false,
    label: 'stats',
    link: '/users/stats',
  },
  {
    active: false,
    label: 'sign ups',
    link: '/users/signups',
  },
  {
    active: true,
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
  // const url = `http://localhost:8000/api/get-user/${edit}`

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


export default function View() {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { edit } = router.query

  // Fetching data from backend with SWR
  const { user, isLoading, isError, userMutate } = userData()
  // console.log(user)

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false);

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
    // console.log(user.user)
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

      // console.log(response.data.success)
      if (response.data.success) {
        // router.push(`/users/customer/${edit}`)
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
                <ReactLoading type={'spinningBubbles'} color={"#FF5C00"} height={'20%'} width={'10%'} />
              </Box> : user.user &&
              <Box className={classes.boxDisplayForm}>
                <Box className={classes.boxDisplay}>
                  <Box style={{
                    background: "rgba(255, 242, 235, 0.3)",
                    padding: "2rem 1rem",
                  }}>
                    <Typography style={{ fontWeight: 600, color: "#272643" }}>
                      {user.user.firstName} {user.user.lastName}
                    </Typography>

                    <Typography style={{ color: "#A37A78" }}>
                      {user.user.email}
                    </Typography>
                  </Box>

                  <Box style={{
                    padding: "1rem",
                  }}>
                    <Typography>
                      {user.user.phone}
                    </Typography>

                    <Typography>
                      {user.user.address}, {user.user.city}, {user.user.state}
                    </Typography>
                  </Box>
                </Box>

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
              </Box>
        }
      </Box>
    </TableLayout>
  )
}