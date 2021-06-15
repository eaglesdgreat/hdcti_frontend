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
  // console.log([...userProducts.wholesaleProducts.rows, ...userProducts.products.rows]
  //   .filter(prod => prod.userId === Number(view)))

  // This check for he product available in stock
  const productInStock = (idx) => {
    const variant = [...userProducts.wholesaleProducts.rows, ...userProducts.products.rows]
      .filter(prod => prod.userId === Number(view))
      .map(product => JSON.parse(product.varieties))[idx]
    const moq = [...userProducts.wholesaleProducts.rows, ...userProducts.products.rows]
      .filter(prod => prod.userId === Number(view))
      .map(product => JSON.parse(product.productMoqPrice))[idx]

    const minimumMoq = moq.map(min => min.moq).reduce((a, b) => {
      const min = Number(a) < Number(b)
      if (min) {
        return a
      }
      return b
    })
    // console.log(minimumMoq)

    const variantSum = variant.map(variant => variant.quantity).reduce((a, b) => a = Number(a) + Number(b), 0)
    // console.log(variantSum)

    if (variantSum > minimumMoq) {
      return variantSum
    } else {
      return 0
    }
  }

  return (
    <TableLayout tableNav={tableNav} name="Users">
      <Box className={classes.container}>
        <Typography style={{
          color: "rgba(36, 33, 32, 0.5)",
          marginBottom: "1rem",
        }}>
          VENDORS / PROFILE / PRODUCTS
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
                      Products
                    </Typography>

                    <Typography style={{
                      padding: "0.15rem 0.7rem",
                      background: "#FFF2EB",
                      color: "#FF5C00",
                      borderRadius: "4px",
                      fontWeight: "500",
                    }}>
                      {[...userProducts.wholesaleProducts.rows, ...userProducts.products.rows]
                        .filter(prod => prod.userId === Number(view)).length}
                    </Typography>
                  </Box>

                  <Box style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between"
                  }}>
                    {
                      [...userProducts.wholesaleProducts.rows, ...userProducts.products.rows]
                        .filter(prod => prod.userId === Number(view)).length > 0
                        ?
                        [...userProducts.wholesaleProducts.rows, ...userProducts.products.rows]
                          .filter(prod => prod.userId === Number(view))
                          .reverse()
                          .map((product, i) => {
                            return (
                              <Box key={i} style={{
                                display: "flex",
                                margin: "2rem 0",
                                width: "49%"
                              }}>
                                <Link
                                  href={`/products/editproduct/viewproduct/[view]?merchant=${product.user.platform}`}
                                  as={`/products/editproduct/viewproduct/${product.id}?merchant=${product.user.platform}`}
                                >
                                  <a style={{ textDecoration: 'none' }}>
                                    <img
                                      style={{ width: "4rem", marginRight: "1.5rem" }}
                                      src={JSON.parse(product.varieties)[0].images[0]}
                                      alt="product" />
                                    <Box>
                                      <Typography style={{ fontWeight: "500", color: "#000000" }}>
                                        {product.name}
                                      </Typography>

                                      <Typography style={{ color: "#A37A78" }}>
                                        {product.category}
                                      </Typography>

                                      <Box style={{ display: "flex" }}>
                                        <Typography style={{ marginRight: "1rem", color: "#000000" }}>
                                          <NumberFormat
                                            value={product.price ? product.price : '0.00'}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'₦'}
                                          />
                                        </Typography>

                                        <Typography style={{ fontWeight: "500", color: "#000000" }}>
                                          {productInStock(i)} in stock
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </a>
                                </Link>
                              </Box>
                            )
                          })
                        :
                        <Box style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: '20px',
                          margin: 'auto'
                        }}>
                          <Box style={{
                            display: "flex",
                            alignItems: "center",
                          }}>
                            {/* <Typography style={{ fontWeight: "600", marginRight: "1rem" }}>
                              Products
                              </Typography> */}

                            <Typography style={{
                              padding: "0.15rem 0.7rem",
                              background: "#FFF2EB",
                              color: "#FF5C00",
                              borderRadius: "4px",
                              fontWeight: "500",
                            }}>
                              No Products Available For Vendor
                            </Typography>
                          </Box>
                        </Box>
                    }
                  </Box>
                </Box>
          }
        </Box>
      </Box>
    </TableLayout>
  )
}