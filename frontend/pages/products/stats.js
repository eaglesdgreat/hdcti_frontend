import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Typography,
  Hidden,
  CircularProgress
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios';
import useSWR from 'swr'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import { PieChart } from "react-minimal-pie-chart"

// import { useStateValue } from '../../StateProviders';
import TableLayout from '../../Components/Tables'
import { isAuthenticated } from './../../lib/auth.helper'
import PrivateRoute from './../../Components/PrivateRoute'



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
  box: {
    marginLeft: '-100px',
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    }
  },
  smallSize: {
    [theme.breakpoints.down('md')]: {
      width: '217px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '150px',
    }
  }
}))



const tableNav = [
  {
    active: true,
    label: 'stats',
    link: '/products/stats',
  },
  {
    active: false,
    label: 'pending',
    link: '/products/pending',
  },
  {
    active: false,
    label: 'wholesale',
    link: '/products/wholesale',
  },
  {
    active: false,
    label: 'marketplace',
    link: '/products/marketplace',
  },
]


const fetcher = async (...arg) => {
  const [url, token] = arg
  // console.log(url, token)

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
    products: data,
    isLoading: !error && !data,
    isError: error
  }
}



export default function Stats() {
  const router = useRouter()
  const classes = useStyles()

  const { products, isLoading, isError } = productData()
  // console.log(products.wholesaleProducts.rows.map(item => 
  //     item.name.toLowerCase() === "nike airmax 2019 mid-tops mens shoe brand new 1"))


  const productOutOfStock = (idx) => {
    let data = [...products.wholesaleProducts.rows, ...products.products.rows]
    const stock = []

    for (let i = 0; i < data.length; i++) {
      let variant = data.map(product => JSON.parse(product.varieties))[i]
      let moq = data.map(product => JSON.parse(product.productMoqPrice))[i]

      let minimumMoq = moq.map(min => min.moq).reduce((a, b) => {
        const min = Number(a) < Number(b)
        if (min) {
          return a
        }
        return b
      })
      // console.log(minimumMoq)
  
      let variantSum = variant.map(variant => variant.quantity).reduce((a, b) => a = Number(a) + Number(b), 0)
      // console.log(variantSum)
  
      if (variantSum < minimumMoq) {
        stock.push(data[i])
      }
    }

    return stock
  }
  // console.log(productOutOfStock())

  return (
    <TableLayout tableNav={tableNav} name="Products">
      {isError ? (<PrivateRoute isError={isError} />)
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
          </Box> :
          <Box
            display="flex"
            style={{
              padding: 30,
              paddingBottom: 60,
              width: '100%',
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              className={classes.smallSize}
              style={{
                border: '1px solid #EAEAEA',
                padding: 30,
                borderRadius: '8px',
                width: '40%',
                // paddingRight: 50,
              }}
            >
              <Box
                display="flex"
                component="span"
                flexDirection="column"
                style={{
                  paddingBottom: 50,
                }}
              >
                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '400',
                    fontSize: '15px',
                    lineHeight: '18px',
                    letterSpacing: '0.02em',
                    color: '#6A6A6A',
                    textTransform: 'uppercase',
                  }}
                >
                  Total Products
                </Typography>

                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '500',
                    fontSize: '36px',
                    lineHeight: '42.19px',
                    color: '#242120'
                  }}
                >
                  {products.total}
                </Typography>
              </Box>

              <Typography
                className={classes.typography}
                style={{
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '16.41px',
                  letterSpacing: '0.02em',
                  color: '#6A6A6A',
                  textTransform: 'uppercase',
                  paddingBottom: 20,
                }}
              >
                BreakDown
              </Typography>

              <Box
                display="flex"
                component="span"
                flexDirection="column"
                style={{
                  paddingBottom: 35,
                }}
              >
                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '500',
                    fontSize: '24px',
                    lineHeight: '28px',
                    color: '#242120'
                  }}
                >
                  {products.wholesaleProducts.count}
                </Typography>

                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '16.41px',
                    letterSpacing: '0.02em',
                    color: '#6A6A6A'
                  }}
                >
                  Wholesale <br />Products
                </Typography>
              </Box>

              <Box
                display="flex"
                component="span"
                flexDirection="column"
                style={{
                  paddingBottom: 10,
                }}
              >
                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '500',
                    fontSize: '24px',
                    lineHeight: '28px',
                    color: '#242120'
                  }}
                >
                  {products.products.count}
                </Typography>

                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '16.41px',
                    letterSpacing: '0.02em',
                    color: '#6A6A6A'
                  }}
                >
                  Marketplace <br />Products
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-start"
              style={{
                marginLeft: '10px',
                width: '100%',
              }}
            >
              <Grid container spacing={1}>
                <Grid item md={12} lg={4} xl={4}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="span"
                    className={classes.smallSize}
                    style={{
                      border: '1px solid #EAEAEA',
                      padding: 20,
                      borderRadius: '8px',
                      // width: '100%',
                      paddingRight: 25,
                    }}
                  >
                    <Typography
                      className={classes.typography}
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        color: '#6A6A6A',
                        textTransform: 'uppercase',
                      }}
                    >
                      Pending Products
                    </Typography>

                    <Typography
                      className={classes.typography}
                      style={{
                        fontWeight: '500',
                        fontSize: '30px',
                        lineHeight: '35.16px',
                        color: '#242120'
                      }}
                    >
                      {products.pending}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={12} lg={4} xl={4}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="span"
                    className={classes.smallSize}
                    style={{
                      border: '1px solid #EAEAEA',
                      padding: 20,
                      borderRadius: '8px',
                      // width: '100%',
                    }}
                  >
                    <Typography
                      className={classes.typography}
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        color: '#6A6A6A',
                        textTransform: 'uppercase',
                      }}
                    >
                      Wholesale Pedning
                    </Typography>

                    <Typography
                      className={classes.typography}
                      style={{
                        fontWeight: '500',
                        fontSize: '30px',
                        lineHeight: '35.16px',
                        color: '#242120'
                      }}
                    >
                      {products.pendingWholesaleProducts.count}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={12} lg={4} xl={4}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    className={classes.smallSize}
                    component="span"
                    style={{
                      border: '1px solid #EAEAEA',
                      padding: 20,
                      borderRadius: '8px',
                      // width: '100%',
                      paddingRight: 25,
                    }}
                  >
                    <Typography
                      className={classes.typography}
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        color: '#6A6A6A',
                        textTransform: 'uppercase',
                      }}
                    >
                      Marketplace Pending
                    </Typography>

                    <Typography
                      className={classes.typography}
                      style={{
                        fontWeight: '500',
                        fontSize: '30px',
                        lineHeight: '35.16px',
                        color: '#242120'
                      }}
                    >
                      {products.pendingProducts.count}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={12} lg={4} xl={4}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="span"
                    className={classes.smallSize}
                    style={{
                      border: '1px solid #EAEAEA',
                      padding: 20,
                      borderRadius: '8px',
                      // width: '100%',
                      paddingRight: 25,
                    }}
                  >
                    <Typography
                      className={classes.typography}
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '16px',
                        letterSpacing: '0.02em',
                        color: '#6A6A6A',
                        textTransform: 'uppercase',
                      }}
                    >
                      Out of stock
                    </Typography>

                    <Typography
                      className={classes.typography}
                      style={{
                        fontWeight: '500',
                        fontSize: '30px',
                        lineHeight: '35.16px',
                        color: '#242120'
                      }}
                    >
                      {productOutOfStock().length}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    display="flex"
                    className={classes.smallSize}
                    style={{
                      border: '1px solid #EAEAEA',
                      padding: 20,
                      borderRadius: '8px',
                      paddingBottom: 40,
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                    >
                      <Typography
                        className={classes.typography}
                        style={{
                          fontWeight: '400',
                          fontSize: '14px',
                          lineHeight: '16px',
                          letterSpacing: '0.02em',
                          color: '#6A6A6A',
                          textTransform: 'uppercase',
                        }}
                      >
                        Product Category
                      </Typography>

                      <Hidden mdUp>
                        <Box
                          display="flex"
                          style={{
                            margin: 'auto',
                            width: '100%',
                            marginTop: '20px'
                          }}
                        >
                          <PieChart
                            animate={true}
                            animationDuration={1000}
                            animationEasing="ease-out"
                            center={[50, 50]}
                            data={[
                              {
                                color: "#FF5C00",
                                title: "Mobile Devices",
                                value: (
                                  products.wholesaleProducts.rows
                                    .filter(x => x.category === 'mobile-devices').length +
                                  products.products.rows
                                    .filter(x => x.category === 'mobile-devices').length
                                ),
                              },
                              {
                                color: "#FF8500",
                                title: "Fashion",
                                value: (
                                  products.wholesaleProducts.rows
                                    .filter(x => x.category === 'fashion').length +
                                  products.products.rows
                                    .filter(x => x.category === 'fashion').length
                                ),
                              },
                              {
                                color: "#993700",
                                title: "Laptops",
                                value: (
                                  products.wholesaleProducts.rows
                                    .filter(x => x.category === 'laptops-and-accessories').length +
                                  products.products.rows
                                    .filter(x => x.category === 'laptops-and-accessories').length
                                ),
                              },
                              {
                                color: "#000000",
                                title: "Others",
                                value: (
                                  products.wholesaleProducts.rows
                                    .filter(x => x.category !== 'mobile-devices'
                                      && x.category !== 'laptops-and-accessories'
                                      && x.category !== 'fashion').length +
                                  products.products.rows
                                    .filter(x => x.category !== 'mobile-devices'
                                      && x.category !== 'laptops-and-accessories'
                                      && x.category !== 'fashion').length
                                ),
                              },
                            ]}
                            // label={({ dataEntry }) => dataEntry.value}
                            label={({ dataEntry }) => dataEntry === 0 ? '' : `${Math.round(dataEntry.percentage)}%`}
                            labelPosition={70}
                            lengthAngle={-360} //negative num move clockwise while positive move anti-clockwise
                            lineWidth={100}
                            paddingAngle={0}
                            radius={50}
                            // segmentsShift={10}
                            // rounded
                            startAngle={0}
                            viewBoxSize={[100, 100]}
                            labelStyle={{
                              fontSize: '0.4375rem',
                              fill: '#FFFFFF',
                              fontFamily: 'Roboto',
                              fontWeight: 'bold'
                            }}
                          />
                        </Box>
                      </Hidden>

                      <Box
                        display="flex"
                        component="span"
                        style={{
                          marginTop: '30px',
                        }}
                      >
                        <img src="/bg-primary-red.svg" alt="dot" />
                        <Typography
                          className={classes.typography}
                          style={{
                            fontWeight: '400',
                            fontSize: '12.5px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',
                            color: '#263238',
                            paddingLeft: 8,
                          }}
                        >
                          Mobile Devices
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        component="span"
                        style={{
                          marginTop: '20px',
                        }}
                      >
                        <img src="/bg-primary-orange.svg" alt="dot" />
                        <Typography
                          className={classes.typography}
                          style={{
                            fontWeight: '400',
                            fontSize: '12.5px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',
                            color: '#263238',
                            paddingLeft: 8,
                          }}
                        >
                          Fashion
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        component="span"
                        style={{
                          marginTop: '20px',
                        }}
                      >
                        <img src="/bg-primary-brown.svg" alt="dot" />
                        <Typography
                          className={classes.typography}
                          style={{
                            fontWeight: '400',
                            fontSize: '12.5px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',
                            color: '#263238',
                            paddingLeft: 8,
                          }}
                        >
                          Laptops
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        component="span"
                        style={{
                          marginTop: '20px',
                        }}
                      >
                        <img src="/bg-primary-black.svg" alt="dot" />
                        <Typography
                          className={classes.typography}
                          style={{
                            fontWeight: '400',
                            fontSize: '12.5px',
                            lineHeight: '16px',
                            letterSpacing: '0.02em',
                            color: '#263238',
                            paddingLeft: 8,
                          }}
                        >
                          Others
                        </Typography>
                      </Box>
                    </Box>

                    <Hidden smDown>
                      <Box
                        display="flex"
                        style={{
                          margin: 'auto',
                          width: '50%'
                        }}
                      >
                        <PieChart
                          animate={true}
                          animationDuration={1000}
                          animationEasing="ease-out"
                          center={[50, 50]}
                          data={[
                            {
                              color: "#FF5C00",
                              title: "Mobile Devices",
                              value: (
                                products.wholesaleProducts.rows
                                  .filter(x => x.category === 'mobile-devices').length +
                                products.products.rows
                                  .filter(x => x.category === 'mobile-devices').length
                              ),
                            },
                            {
                              color: "#FF8500",
                              title: "Fashion",
                              value: (
                                products.wholesaleProducts.rows
                                  .filter(x => x.category === 'fashion').length +
                                products.products.rows
                                  .filter(x => x.category === 'fashion').length
                              ),
                            },
                            {
                              color: "#993700",
                              title: "Laptops",
                              value: (
                                products.wholesaleProducts.rows
                                  .filter(x => x.category === 'laptops-and-accessories').length +
                                products.products.rows
                                  .filter(x => x.category === 'laptops-and-accessories').length
                              ),
                            },
                            {
                              color: "#000000",
                              title: "Others",
                              value: (
                                products.wholesaleProducts.rows
                                  .filter(x => x.category !== 'mobile-devices'
                                    && x.category !== 'laptops-and-accessories'
                                    && x.category !== 'fashion').length +
                                products.products.rows
                                  .filter(x => x.category !== 'mobile-devices'
                                    && x.category !== 'laptops-and-accessories'
                                    && x.category !== 'fashion').length
                              ),
                            },
                          ]}
                          // label={({ dataEntry }) => dataEntry.value}
                          label={({ dataEntry }) => dataEntry.value === 0 ? '' : `${Math.round(dataEntry.percentage)}%`}
                          labelPosition={70}
                          lengthAngle={-360} //negative num move clockwise while positive move anti-clockwise
                          lineWidth={100}
                          paddingAngle={0}
                          radius={50}
                          // segmentsShift={10}
                          // rounded
                          startAngle={0}
                          viewBoxSize={[100, 100]}
                          labelStyle={{
                            fontSize: '0.4375rem',
                            fill: '#FFFFFF',
                            fontFamily: 'Roboto',
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>
                    </Hidden>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
      }
    </TableLayout>
  )
}