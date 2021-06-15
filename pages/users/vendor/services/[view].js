import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
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
import NumberFormat from 'react-number-format'

import TableLayout from './../../../../Components/Tables'
import { isAuthenticated } from './../../../../lib/auth.helper'
import PrivateRoute from './../../../../Components/PrivateRoute'

// CSS Styles
const useStyles = makeStyles(() => ({
  container: {
    margin: "0 auto",
    padding: "2rem 2rem 6rem 2rem",
  },
  back: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginBottom: "3rem",
  },
  boxProducts: {
    width: "100%",
  }
}));

const tableNav = [
  {
    active: false,
    label: 'stats',
    link: '/users/stats',
  },
  {
    active: false,
    label: 'user',
    link: '/users/user',
  },
  {
    active: false,
    label: 'customers',
    link: '/users/customers',
  },
  {
    active: true,
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


const productData = () => {
  const url = `${process.env.BACKEND_URL}/api/all-products`
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    userProducts: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default function View() {
  const classes = useStyles();
  const router = useRouter();
  const { view } = router.query

  // Fetching data from backend with SWR
  const { userProducts, isLoading, isError } = productData()
  // console.log(userProducts)

  return (
    <TableLayout tableNav={tableNav} name="Users">
      <Box className={classes.container}>
        <Typography style={{
          color: "rgba(36, 33, 32, 0.5)",
          marginBottom: "1rem",
        }}>
          VENDORS / PROFILE / SERVICES
        </Typography>

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

        <Box className={classes.boxDisplayProducts}>
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
                  <CircularProgress style={{ 'color': '#FF5C00' }} />
                </Box> : userProducts &&
                <Box className={classes.boxProducts}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Typography style={{ fontWeight: "600", marginRight: "1rem" }}>
                      Services
                    </Typography>

                    <Typography style={{
                      padding: "0.15rem 0.7rem",
                      background: "#FFF2EB",
                      color: "#FF5C00",
                      borderRadius: "4px",
                      fontWeight: "500",
                    }}>
                      {0}
                    </Typography>
                  </Box>

                  <Box style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    margin: 'auto'
                  }}>
                    <Box>
                      <Typography style={{
                        textAlign: "center",
                        fontSize: "0.9rem",
                        marginTop: "1rem"
                      }}>
                        SERVICES ARE CURRENTLY UNAVAILABLE
                      </Typography>
                    </Box>
                  </Box>
                </Box>
          }
        </Box>
      </Box>
    </TableLayout>
  )
}