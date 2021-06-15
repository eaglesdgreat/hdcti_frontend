import React, { Fragment, useState } from 'react'
import TableLayout from '../../../Components/Tables'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  InputBase,
  Divider,
  CircularProgress
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
import moment from 'moment'

// import { useStateValue } from '../../../StateProviders';
import { isAuthenticated } from '../../../lib/auth.helper'
import PrivateRoute from '../../../Components/PrivateRoute'


// CSS Styles
const useStyles = makeStyles(() => ({
  container: {
    margin: "0 auto",
    padding: "2rem 4rem 6rem 2rem",
  },
  back: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem"
  },
  variantBox: {
    border: "1px solid #EAEAEA",
    padding: "0.3rem 1.5rem",
    borderRadius: "4px",
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  divider: {
    marginBottom: "0.8rem"
  },
  orderInfoWrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  detailsText: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
    fontWeight: 500
  },
  label: {
    fontSize: "0.9rem",
    color: "#242120",
  },
  textField: {
    border: "1px solid #FF5C00",
    borderRadius: "5px",
    width: "100%",
    height: "42px",
    padding: "1rem",
    fontSize: "0.9rem",
    margin: "0.5rem 0",
  },
  boxRight: {
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
    padding: "1rem"
  },
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
}));


const tableNav = [
  {
    active: false,
    label: 'stats',
    link: '/orders/stats',
  },
  {
    active: false,
    label: 'requests',
    link: '/orders/requests',
  },
  {
    active: false,
    label: 'active',
    link: '/orders/active',
  },
  {
    active: true,
    label: 'history',
    link: '/orders/history'
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


const ordersData = () => {
  const router = useRouter()
  const { historyId } = router.query

  const url = `${process.env.BACKEND_URL}/api/one-order/${historyId}`

  const token = isAuthenticated().authToken

  const options = {
    shouldRetryOnError: false,
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }

  const { data, error } = useSWR([url, token], fetcher, { ...options })

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}


export default function View() {
  const classes = useStyles();
  const router = useRouter();
  const { historyId } = router.query

  // Fetching data from backend with SWR
  const { orders, isLoading, isError } = ordersData()


  return (
    <TableLayout tableNav={tableNav} name="Users">
      <Box className={classes.container}>
        <Box display="flex">
          <Button
            size="large"
            className={classes.button}
            disableRipple
            onClick={() => router.back()}
          // style={{ marginLeft: '20px' }}
          >
            <img src="/vectorleft.svg" alt="arrow-left" />
            <Typography
              className={classes.typography}
              style={{
                textAlign: 'center',
                color: '#242120',
                fontSize: '13px',
                fontWeight: 'normal',
                lineHeight: '15px',
                textTransform: 'uppercase',
                lineSpacing: '0.02em',
                marginLeft: '10px'
              }}
            >
              back
            </Typography>
          </Button>
        </Box>

        {isError ? (<PrivateRoute isError={isError} />)
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
            </Box> : orders &&
            orders.orders.total.rows
              .filter(order => order.orderId === historyId && (order.status === 'perfected' ||
                order.status === 'refunded' || order.status === 'cancelled'))
              .map(order => (
                <Box key={order.id}>
                  <Typography style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                    Order ID: {order.orderId}
                  </Typography>

                  <Typography style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                    Date/Time: {moment(order.createdAt).format('DD-MM-YYYY')}, {moment(order.createdAt).format('hh:mm:ss a')}
                  </Typography>

                  <Box className={classes.orderInfoWrapper}>
                    <Box style={{ width: "36%" }}>
                      <Box>
                        <img
                          style={{ width: "8rem" }}
                          src={order.product.images[0]}
                          alt="product"
                        />

                        <Typography style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                          {order.product.name}
                        </Typography>

                        <Box style={{ display: "flex" }}>
                          <Typography style={{ fontSize: "0.7rem", marginRight: "0.5rem" }}>
                            Product SKU:
                      </Typography>

                          <span style={{ fontSize: "0.7rem", display: "flex", flexWrap: "wrap" }}>
                            {order.product.sku}
                          </span>
                        </Box>

                        <Box className={classes.variantBox}>
                          <Typography style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                            VARIANTS(S)
                      </Typography>

                          <Divider className={classes.divider} light />

                          <Box style={{ display: "flex" }}>
                            <img
                              style={{ width: "4rem", marginRight: "2rem" }}
                              src={order.product.images[0]}
                              alt="variant"
                            />

                            <Box style={{ marginBottom: "1rem" }}>
                              <Typography style={{ fontSize: "0.6rem" }}>
                                size: {order.product.size}<br />
                            colour: <Box
                                  component="span"
                                  style={{
                                    backgroundColor: order.product.colorName,
                                    paddingTop: 1.5,
                                    paddingBottom: 1.5,
                                    paddingRight: 30,
                                  }}
                                > </Box>
                              </Typography>

                              <Typography style={{ fontSize: "0.6rem" }}>
                                price: ₦{order.product.price}
                              </Typography>

                              <Typography style={{ fontSize: "0.6rem" }}>
                                Stock: {order.approvedQty}
                              </Typography>

                              <Typography style={{ fontSize: "0.6rem" }}>
                                Requested Qty: {order.quantity}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    <Box style={{ width: "48%" }}>
                      <Box className={classes.boxRight}>
                        <Typography style={{ fontSize: "1.2rem" }} className={classes.detailsText}>
                          Customer
                    </Typography>

                        <Typography className={classes.label}>
                          Name
                    </Typography>

                        <Typography className={classes.detailsText}>
                          {order.customer.firstName} {order.customer.lastName}
                        </Typography>

                        <Typography className={classes.label}>
                          Phone No
                    </Typography>

                        <Typography className={classes.detailsText}>
                          {order.customer.phone}
                        </Typography>

                        <Typography className={classes.label}>
                          Email
                    </Typography>

                        <Typography className={classes.detailsText}>
                          {order.customer.email}
                        </Typography>
                      </Box>

                      <Box style={{ marginTop: "3rem" }} className={classes.boxRight}>
                        <Typography style={{ fontSize: "1.2rem" }} className={classes.detailsText}>
                          Vendor
                    </Typography>

                        <Typography className={classes.label}>
                          Name
                    </Typography>

                        <Typography className={classes.detailsText}>
                          {order.product.wholesalerName}
                        </Typography>

                        <Typography className={classes.label}>
                          Business Name
                    </Typography>

                        <Typography className={classes.detailsText}>
                          {order.product.wholesalerBusinessName}
                        </Typography>

                        <Typography className={classes.label}>
                          Phone No
                    </Typography>

                        <Typography className={classes.detailsText}>
                          {order.product.wholesalerPhone}
                        </Typography>

                        <Typography className={classes.label}>
                          Email
                    </Typography>

                        <Typography className={classes.detailsText}>
                          {order.product.wholesalerEmail}
                        </Typography>

                        <Typography className={classes.label}>
                          Location
                    </Typography>

                        <Typography className={classes.detailsText}>
                          {order.product.wholesalerAddr}
                        </Typography>
                      </Box>

                      <Box style={{ padding: "1rem" }}>
                        <Box style={{ marginTop: "3rem" }}>
                          <Typography
                            style={{ marginBottom: "0.5rem" }}
                            className={classes.label}
                            component="legend"
                          >
                            Note
                      </Typography>

                          {
                            order.note.map((note, i) => (
                              <Fragment key={i}>
                                <Typography className={classes.detailsText}>
                                  {note.message}
                                </Typography>

                                <Typography style={{ fontSize: "0.6rem" }}>
                                  Submitted by: {note.name}
                                </Typography>

                                <Typography style={{ fontSize: "0.6rem" }}>
                                  {moment(note.createdAt).format('DD-MM-YYYY')}, {moment(note.createdAt).format('hh:mm:ss a')}
                                </Typography>
                              </Fragment>
                            ))
                          }
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
        }
      </Box>
    </TableLayout>
  )
}