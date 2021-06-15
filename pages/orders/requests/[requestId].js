import React, { Fragment, useState } from 'react'
import TableLayout from '../../../Components/Tables'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  InputBase,
  Divider,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import {
  ArrowBackIos,
  EditOutlined,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import axios from 'axios';
import clsx from 'clsx'
import ReactLoading from 'react-loading'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { useStateValue } from '../../../StateProviders';
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
    active: true,
    label: 'requests',
    link: '/orders/requests',
  },
  {
    active: false,
    label: 'active',
    link: '/orders/active',
  },
  {
    active: false,
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

  const url = `${process.env.BACKEND_URL}/api/all-orders`

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
  const { requestId } = router.query

  const [{ status }, dispatch] = useStateValue();

  const filterItems = [
    { name: 'Select product status', value: '', disabled: true },
    { name: 'Product Available', value: 'Available', disabled: false },
    { name: 'Product Unavailable', value: 'Declined', disabled: false },
  ]

  // Fetching data from backend with SWR
  const { orders, isLoading, isError } = ordersData()
  // console.log(orders.orders.total.rows.filter(order => order.requestId === requestId).map(ord => ord)[0])

  const [notes, setNotes] = useState('');
  const [stock, setStock] = useState('')
  const [id, setId] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState('Select product status')
  // const [status, setStatus] = useState('')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }


  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'note') {
      setNotes(value)
      // console.log(notes)
    }

    if (name === 'approvedQty') {
      setStock(value)
      // console.log(stock)
    }
  }

  const handleSingleStatusChange = async () => {
    const token = isAuthenticated().authToken

    const url = `${process.env.BACKEND_URL}/api/update-order-status/${id}`

    const mutateUrl = `${process.env.BACKEND_URL}/api/all-orders`

    const check = orders.orders.total.rows
      .filter(request => request.requestId === requestId)
      .filter(stat => stat.id === id && stat.status.toLowerCase() === 'pending')

    if (check.length > 0 && status !== '') {
      const body = { status }

      try {
        const response = await axios.patch(
          url,
          body,
          { headers: { authenticate: token } },
        )


        if (response.data.success) {
          // console.log(response.data.success)

          // swr globla mutate methode for changing data in cache without revalidating 
          mutate(mutateUrl, async () => {
            let updatedOrders = orders.orders.total.rows

            updatedOrders[id - 1] = { ...updatedOrders[id - 1], status: body.status }

            // console.log(updatedOrders[id - 1])

            return updatedOrders
          }, false)

          // console.log('Status already updated, you can not update same status again')
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log('Status already updated, you can not update same status again')
      return
      // handleAllStatusChange()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // let updateOrder = orders.orders.total.rows.find(order => order.id === id)
    // updateOrder.note = [...updateOrder.note, notes.note]

    const adminUser = isAuthenticated().user
    const token = isAuthenticated().authToken

    const url = `${process.env.BACKEND_URL}/api/update-order/${id}`

    const mutateUrl = `${process.env.BACKEND_URL}/api/all-orders`

    const body = {
      note: {
        id: uuidv4(),
        name: `${adminUser.firstName} ${adminUser.lastName}`,
        message: notes,
        createdAt: new Date()
      },
      approvedQty: stock
    }

    try {
      if (notes === '' && stock === '') {
        console.log('You need to write a note or update the available quantity to save.')
      } else {
        const response = await axios.patch(
          url,
          body,
          { headers: { authenticate: token } }
        )

        mutate(mutateUrl, async () => {
          let updateOrder = orders.orders.total.rows

          if (notes === '' && stock === '') {
            return
          }

          if (notes !== '' && stock === '') {
            updateOrder[id - 1] = { ...updateOrder[id - 1], note: [...updateOrder[id - 1].note, body.note] }
          }

          if (notes === '' && stock !== '') {
            updateOrder[id - 1] = { ...updateOrder[id - 1], approvedQty: body.approvedQty }
          }

          if (notes !== '' && stock !== '') {
            updateOrder[id - 1] = { ...updateOrder[id - 1], note: [...updateOrder[id - 1].note, body.note], approvedQty: body.approvedQty }
          }
          // console.log(updateOrder[id - 1])

          return updateOrder
        }, false)

        if (response.data.success) {
          console.log(response.data.success)

          setNotes('')
          setStock('')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <TableLayout tableNav={tableNav} name="Orders">
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
              </Box> : orders &&
              <>
                {
                  orders.orders.total.rows
                    .filter(order => order.requestId === requestId)
                    .map(order => (
                      <Fragment key={order.id}>
                        <Typography style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                          Request ID: {order.requestId}
                        </Typography>

                        <Typography style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                          Date/Time: {moment(order.createdAt).format('DD-MM-YYYY')}, {moment(order.createdAt).format('hh:mm:ss a')}
                        </Typography>

                        <Grid container>
                          <Grid item
                            xs={12} sm={12} md={12} lg={12} xl={12}
                          >
                            <Box
                              className={classes.boxRight}
                              style={{
                                marginBottom: "2rem",
                                marginTop: "1rem"
                              }}
                            >
                              <Typography style={{ fontSize: "1.2rem" }}
                                className={classes.detailsText}
                              >
                                Customer
                                </Typography>

                              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                                <Box>
                                  <Typography className={classes.label}>
                                    Name
                                    </Typography>

                                  <Typography className={classes.detailsText}>
                                    {order.customer_details.firstName} {order.customer_details.lastName}
                                  </Typography>
                                </Box>

                                <Box>
                                  <Typography className={classes.label}>
                                    Phone No
                                    </Typography>

                                  <Typography className={classes.detailsText}>
                                    {order.customer_details.phone}
                                  </Typography>
                                </Box>

                                <Box>
                                  <Typography className={classes.label}>
                                    Email
                                  </Typography>

                                  <Typography className={classes.detailsText}>
                                    {order.customer_details.email}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Fragment>
                    ))[0]
                }

                {orders.orders.total.rows
                  .filter(order => order.requestId === requestId)
                  .map((order, idx) => (
                    <Box key={idx}>
                      <Grid container>
                        <Grid item
                          container
                          className={classes.boxRight}
                          xs={12} sm={12} md={12} lg={12} xl={12}
                        >
                          <Grid style={{
                            paddingRight: "3.5rem",
                            paddingLeft: "1rem"
                          }}
                            item
                            xs={12} sm={5} md={5} lg={5} xl={5}>
                            <Box>
                              <img
                                style={{ width: "8rem" }}
                                src={order.product.image}
                                alt="product"
                              />

                              <Typography style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                                {order.product.name}
                              </Typography>

                              <Box style={{ display: "flex" }}>
                                <Typography style={{ fontSize: "0.7rem", marginRight: "0.5rem" }}>
                                  Product SKU: {order.product.sku}
                                </Typography>
                              </Box>

                              <Box className={classes.variantBox}>
                                <Typography style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
                                  VARIANT(S)
                                </Typography>

                                <Divider className={classes.divider} light />

                                <Box style={{ display: "flex" }}>
                                  <img
                                    style={{ width: "4rem", marginRight: "2rem" }}
                                    src={order.product.image}
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

                                    <Box style={{ display: "flex" }}>
                                      <Typography style={{ fontSize: "0.6rem", marginRight: "0.2rem" }}>
                                        Stock:
                                    </Typography>
                                      <InputBase
                                        style={{
                                          border: "1px solid #EAEAEA",
                                          borderRadius: "4px",
                                          width: "45px",
                                          height: "20px"
                                        }}
                                        type="number"
                                        name="approvedQty"
                                        onChange={(event) => {
                                          handleChange(event)
                                          setId(order.id)
                                        }}
                                        value={order.id === id ? (stock ? stock : order.approvedQty) : order.approvedQty}
                                      />
                                    </Box>

                                    <Typography style={{ fontSize: "0.6rem" }}>
                                      Requested Qty: {order.quantity}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item
                            xs={12} sm={3} md={3} lg={3} xl={3}
                          >
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
                          </Grid>

                          <Grid
                            item xs={12} sm={4} md={4} lg={4} xl={4}
                          >
                            <Box
                              display="flex"
                              justifyContent="flex-end"
                              // component="span"
                              style={{
                                margin: 'auto',
                                paddingTop: 15,
                                paddingBottom: 15,
                                marginLeft: 10,
                              }}
                            >
                              <Button disableRipple aria-controls="simple-menu" style={{ marginLeft: '-17px' }}
                                className={classes.button} aria-haspopup="true" onClick={(event) => {
                                  setSelected('Select product status')
                                  handleClick(event)
                                  setId(order.id)
                                }}
                              >
                                <Typography
                                  className={classes.typography}
                                  style={{
                                    fontSize: '15px',
                                    fontWeight: 'normal',
                                    linHeight: '18px',
                                    color: '#272643',
                                    marginLeft: '10px'
                                  }}
                                >
                                  {
                                    (order.status.toLowerCase() === 'available' ? 'Product Available'
                                      : order.status.toLowerCase() === 'declined' ? 'Product Unavailable'
                                        : order.status.toLowerCase() === 'pending' && 'Select product status')
                                  } <img src="/Vector.svg" alt="menu" />
                                </Typography>
                              </Button>
                              <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    borderRadius: '8px',
                                    border: '1px solid #EAEAEA',
                                    margin: '70px 0px 0px 10px',
                                    // boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.08)',
                                    boxShadow: 'none',
                                    backgroundColor: '#FFFFFF',
                                    width: '13%',
                                    height: '27%',
                                    paddingTop: '0.5%',
                                    paddingBottom: '1%',
                                    // paddingLeft: '1%',
                                  }
                                }}
                              >
                                {filterItems.map((item, i) => (
                                  <MenuItem
                                    key={i}
                                    disabled={item.disabled}
                                    selected={selected === item.name}
                                    onClick={() => {
                                      // setStatus(item.value)
                                      dispatch({
                                        type: 'UPDATE_STATUS',
                                        item: item.value
                                      })
                                      setSelected(item.name)
                                      // setAnchorEl(null)
                                    }}
                                  // className={classes.button}
                                  >
                                    <Typography
                                      className={classes.typography}
                                      style={{
                                        fontWeight: '400',
                                        fontSize: '15px',
                                        lineHeight: '17.58px',
                                        color: '#272643',
                                        // marginBottom: '-15px',
                                      }}
                                    >
                                      {item.name}
                                    </Typography>
                                  </MenuItem>
                                ))}

                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  style={{
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '2px',
                                    width: '50%',
                                    margin: 'auto',
                                    marginTop: '15px'
                                    // backgroundColor: 'rgba(255, 92, 0, 0.08)'
                                  }}
                                >
                                  <Button
                                    variant="text"
                                    className={clsx(classes.Typography, classes.button)}
                                    style={{
                                      fontWeight: 'normal',
                                      fontSize: '13px',
                                      color: '#616161',
                                      lineHeight: '15px',
                                    }}
                                    onClick={() => {
                                      handleSingleStatusChange()
                                    }}
                                  >
                                    SAVE
                                  </Button>
                                </Box>
                              </Menu>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box style={{ width: "48%" }}>
                          <Box style={{ padding: "1rem" }}>
                            <Box style={{ marginTop: "3rem" }}>
                              <Typography
                                style={{ marginBottom: "0.5rem" }}
                                className={classes.label}
                                component="legend"
                              >
                                Notes
                              </Typography>

                              {order.note ?
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
                                )) : (
                                  <Typography style={{ fontSize: "0.6rem" }}>
                                    No note available for this item
                                  </Typography>
                                )
                              }

                              <InputBase
                                style={{ height: "84px", }}
                                className={classes.textField}
                                variant="outlined"
                                multiline
                                type="text"
                                rows={4}
                                value={order.id === id ? notes : ''}
                                name="note"
                                onChange={(event) => {
                                  handleChange(event)
                                  setId(order.id)
                                }}
                                placeholder="Enter some notes"
                              />

                            </Box>

                            <Box style={{
                              textAlign: "right",
                            }}>
                              <Button
                                style={{
                                  background: "#FF5C00",
                                  color: "#FFFFFF",
                                  borderRadius: "4px",
                                }}
                                variant="contained"
                                onClick={(e) => {
                                  handleSubmit(e)
                                  // setId(order.id)
                                }}
                              >
                                <Typography style={{ fontSize: "0.9rem", }}>
                                  SAVE
                                </Typography>
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Box>
                  ))
                }
              </>
        }
      </Box>
    </TableLayout>
  )
}