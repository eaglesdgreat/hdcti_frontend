import React, { Fragment, useState } from 'react'
import TableLayout from '../../../Components/Tables'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  InputBase,
  Divider,
  Grid,
  CircularProgress,
  Menu,
  MenuItem,
} from '@material-ui/core';
import {
  ArrowBackIos,
  EditOutlined,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
import moment from 'moment'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import NumberFormat from 'react-number-format'

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
    padding: "0.3rem 1rem",
    borderRadius: "4px",
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  divider: {
    marginBottom: "0.8rem"
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
    padding: "1rem",
  }
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
    active: true,
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

  const url = `${process.env.BACKEND_URL}/api/all-payed-orders`

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
  const { activeId } = router.query

  const [{ status }, dispatch] = useStateValue();

  const filterItems = [
    { name: 'Select product status', value: '', disabled: true },
    { name: 'Product Delivered', value: 'Delivered', disabled: false },
    { name: 'Product Faulty/Refunded', value: 'Faulty-Refunded', disabled: false },
    { name: 'Product Faulty/Returned', value: 'Faulty-Returned', disabled: false },
    { name: 'Product Completed', value: 'Completed', disabled: false },
    { name: 'Product Perfected', value: 'Perfected', disabled: false },
  ]

  // Fetching data from backend with SWR
  const { orders, isLoading, isError } = ordersData()
  // console.log(orders
  //   .filter(order => order.orderId === activeId)
  //   // .map(order => order.ordrpayment)[0][0]
  // )

  const [notes, setNotes] = useState("");
  const [id, setId] = useState('')
  const [index, setIndex] = useState('')
  const [prodId, setProdId] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState('Select product status')

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === 'note') {
      setNotes(value)
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }


  const handleSingleStatusChange = async () => {
    const token = isAuthenticated().authToken

    const url = `${process.env.BACKEND_URL}/api/update-order-status/${prodId}`

    const mutateUrl = `${process.env.BACKEND_URL}/api/all-payed-orders`

    const check = orders
    .filter(order => order.orderId === activeId)
    .map(order => order.ordrpayment.filter(ord => ord.orderId === activeId
      && ord.paid === 1 && ord.status.toLowerCase() === 'available'
      //  && (ord.product.productStatus.toLowerCase() === 'pending' || ord.product.productStatus.toLowerCase() === 'delivered')
       ))

    if (check.length > 0 && status !== '') {
      const body = { productStatus: status }

      const num = orders
      .filter(order => order.orderId === activeId)
      .map(order => order.ordrpayment.findIndex(o => o.id === prodId))[0]
      console.log(prodId, id, num)

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
            let updatedOrders = orders

            updatedOrders[id - 1].ordrpayment[num] = { 
              ...updatedOrders[id - 1].ordrpayment[num], 
              product: { ...updatedOrders[id - 1].ordrpayment[num].product, productStatus: body.productStatus } 
            }

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

    const url = `${process.env.BACKEND_URL}/api/update-order/${prodId}`

    const mutateUrl = `${process.env.BACKEND_URL}/api/all-payed-orders`

    const body = {
      note: notes === '' ? '' : {
        id: uuidv4(),
        name: `${adminUser.firstName} ${adminUser.lastName}`,
        message: notes,
        createdAt: new Date()
      },
    }

    // This return the index number of the specific product you want to update
    const num = orders
      .filter(order => order.orderId === activeId)
      .map(order => order.ordrpayment.findIndex(o => o.id === prodId))[0]

    try {

      if (notes === '') {
        console.log('You need to write a note to save.')
      } else {
        const response = await axios.patch(
          url,
          body,
          { headers: { authenticate: token } }
        )

        mutate(mutateUrl, async () => {
          let updateOrder = orders

          updateOrder[id - 1].ordrpayment[num] = {
            ...updateOrder[id - 1].ordrpayment[num],
            note: [...updateOrder[id - 1].ordrpayment[num].note, body.note]
          }
          // console.log(updateOrder[id - 1])

          return updateOrder
        }, false)

        if (response.data.success) {
          console.log(response.data.success)

          setNotes('')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }


  const orderLevelStatus = () => {
    // const [ordId, status] = arg
    // console.log(reqId)

    const data = !orders
      .filter(order => order.orderId === activeId)
      .map(order => order.ordrpayment
        .filter(ord => ord.status.toLowerCase() === 'available' && ord.paid === 1 && ord.orderId === activeId)
        .map(stat => stat.status)[0]
      )[0]
      // .filter(ord => ord.status.toLowerCase() === 'available' && ord.paid === 1 && ord.orderId === activeId)
      // .map(stat => stat.status)[0]
      // ? status
      ? 'Completed'

      : orders
        .filter(order => order.orderId === activeId)
        .map(order => order.ordrpayment
          .filter(ord => ord.status.toLowerCase() === 'available' && ord.paid === 1 && ord.orderId === activeId)
          .map(stat => stat.status)[0]
        )[0]
    // .filter(ord => ord.status.toLowerCase() === 'available' && ord.paid === 1 && ord.orderId === activeId)
    // .map(stat => stat.status)[0]

    return data.toLowerCase() === 'available' ? 'Processing' : data
  }
  // console.log(orderLevelStatus())

  // const itemLevelStatus = () => {

  // }


  return (
    <TableLayout tableNav={tableNav} name="Orders">
      <Box className={classes.container}>
        <span onClick={() => router.back()} className={classes.back}>
          <ArrowBackIos style={{ fontSize: "0.9rem", }} />
          <Typography style={{ fontSize: "0.9rem" }}>
            BACK
          </Typography>
        </span>

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
            <>
              {
                orders
                  .filter(order => order.orderId === activeId)
                  .map((order, i) => (
                    <Fragment key={i}>
                      <Box>
                        <Typography style={{ fontSize: "0.8rem", marginBottom: "0.3rem" }}>
                          Order ID: {order.orderId}
                        </Typography>

                        <Typography style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                          Date/Time: {moment(order.createdAt).format('DD-MM-YYYY')}, {moment(order.createdAt).format('hh:mm:ss a')}
                        </Typography>

                        <Box style={{ width: "43%" }}>
                          <Typography className={classes.label}>
                            Order Status
                        </Typography>

                          <Typography className={classes.detailsText}>
                            {orderLevelStatus()}
                          </Typography>
                        </Box>

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
                                    {order.User.firstName} {order.User.lastName}
                                  </Typography>
                                </Box>

                                <Box>
                                  <Typography className={classes.label}>
                                    Phone No
                                </Typography>

                                  <Typography className={classes.detailsText}>
                                    {order.User.phone}
                                  </Typography>
                                </Box>

                                <Box>
                                  <Typography className={classes.label}>
                                    Email
                                </Typography>

                                  <Typography className={classes.detailsText}>
                                    {order.User.email}
                                  </Typography>
                                </Box>

                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      <Grid item
                        container
                        style={{ marginTop: "2rem" }}
                        className={classes.boxRight}
                        xs={12} sm={12} md={12} lg={12} xl={12}
                      >
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <Box>
                            <Typography className={classes.label}>
                              Order Placed By
                            </Typography>

                            <Typography className={classes.detailsText}>
                              Campus Rep
                            </Typography>
                          </Box>

                          <Box>
                            <Typography className={classes.label}>
                              Product Quantity
                            </Typography>

                            <Typography className={classes.detailsText}>
                              {
                                orders
                                  .filter(ord => ord.orderId === activeId)
                                  .map(ord => ord.ordrpayment.filter(x => x.status.toLowerCase() === 'available' && x.paid === 1).length)[0]
                              }
                            </Typography>
                          </Box>

                          <Box style={{ width: "57%" }}>
                            <Typography className={classes.label}>
                              Discounts/Coupon
                            </Typography>

                            <Typography className={classes.detailsText}>
                              {order.discount}
                            </Typography>
                          </Box>

                          <Box style={{ width: "43%" }}>
                            <Typography className={classes.label}>
                              Shipping Fee
                            </Typography>

                            <Typography className={classes.detailsText}>
                              <NumberFormat
                                value={order.fee}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₦'}
                              />
                            </Typography>
                          </Box>

                          <Box style={{ width: "43%" }}>
                            <Typography className={classes.label}>
                              Total
                            </Typography>

                            <Typography className={classes.detailsText}>
                              <NumberFormat
                                value={order.finalTotal}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₦'}
                              />
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <Box>
                            <Typography className={classes.label}>
                              Platform
                            </Typography>

                            <Typography style={{
                              fontSize: "0.9rem",
                              fontWeight: 600,
                            }} className={classes.detailsText}>
                              {
                                orders
                                  .filter(order => order.orderId === activeId)
                                  .map(order => order.ordrpayment.filter(ord => ord.orderId === activeId
                                    && ord.paid === 1 && ord.status.toLowerCase() === 'available')
                                  )[0][0].platform === 'vendor' ? 'MARKETPLACE' : 'WHOLESALER'
                              }
                            </Typography>
                          </Box>

                          <Box style={{ width: "57%" }}>
                            <Typography className={classes.label}>
                              Payment Mode
                            </Typography>

                            <Typography className={classes.detailsText}>
                              {order.shipping}
                            </Typography>
                          </Box>

                          <Box style={{ width: "43%" }}>
                            <Typography className={classes.label}>
                              Delivery Mode
                            </Typography>

                            <Typography className={classes.detailsText}>
                              {order.shipping}
                            </Typography>
                          </Box>

                          <Box>
                            <Typography className={classes.label}>
                              Shipping Address
                            </Typography>

                            <Typography className={classes.detailsText}>
                              {order.shipping}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Fragment>
                  ))
              }

              {orders
                .filter(order => order.orderId === activeId)
                .map(ord => ord.ordrpayment.filter(ord => ord.orderId === activeId
                  && ord.paid === 1 && ord.status.toLowerCase() === 'available')
                  .map((order, i) => (
                    <Box style={{ paddingTop: '40px' }} key={i}>
                      <Grid container>
                        <Grid item
                          container
                          className={classes.boxRight}
                          xs={12} sm={12} md={12} lg={12} xl={12}
                        >
                          <Box style={{ width: "57%" }}>
                            <Typography className={classes.label}>
                              Product Status
                            </Typography>

                            <Typography className={classes.detailsText}>
                              {typeof(order.product) === 'object' ? order.product.productStatus : JSON.parse(order.product).productStatus}
                            </Typography>
                          </Box>

                          <Grid style={{
                            paddingRight: "3.5rem",
                          }}
                            item
                            xs={6} sm={6} md={6} lg={6} xl={6}
                          >
                            <Box>
                              <img
                                style={{ width: "8rem" }}
                                src={order.product.image}
                                alt="product"
                              />

                              <Typography style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                                {order.product.name}
                              </Typography>

                              <Typography style={{ fontSize: "0.7rem", }}>
                                Weight: {order.weight}
                              </Typography>

                              <Box style={{ display: "flex" }}>
                                <Typography style={{ fontSize: "0.7rem", marginRight: "0.5rem" }}>
                                  Review:
                                </Typography>

                                <Typography style={{ fontSize: "0.7rem" }}>
                                  Amazing and quality Product
                              </Typography>
                              </Box>

                              <Box style={{ display: "flex" }}>
                                <Typography style={{ fontSize: "0.7rem", marginRight: "0.5rem", }}>
                                  Rating:
                                </Typography>

                                <span style={{ fontSize: "0.6rem" }}>
                                  ⭐️ ⭐️ ⭐️ ⭐️
                                </span>
                              </Box>

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
                                    <Typography style={{ fontSize: "0.65rem" }}>
                                      {order.product.size}, <Box
                                        component="span"
                                        style={{
                                          backgroundColor: order.product.colorName,
                                          paddingTop: 1.5,
                                          paddingBottom: 1.5,
                                          paddingRight: 30,
                                        }}
                                      ></Box>
                                    </Typography>

                                    <Typography style={{ fontSize: "0.65rem" }}>
                                      {
                                        <NumberFormat
                                          value={order.product.wholesalerPrice}
                                          displayType={'text'}
                                          thousandSeparator={true}
                                          prefix={'₦'}
                                        />
                                      }
                                    </Typography>

                                    <Box style={{ display: "flex" }}>
                                      <Typography style={{ fontSize: "0.65rem", marginRight: "0.2rem" }}>
                                        Available Qty: {order.approvedQty}
                                      </Typography>
                                    </Box>

                                    <Typography style={{ fontSize: "0.65rem" }}>
                                      Requested Qty: {order.quantity}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item
                            xs={3} sm={3} md={3} lg={3} xl={3}
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
                            item xs={3} sm={3} md={3} lg={3} xl={3}
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
                                  setId(ord.id)
                                  setProdId(order.id)
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
                                    // (order.product.productStatus.toLowerCase() === 'delivered' ? 'Product Delivered'
                                    //   : order.product.productStatus.toLowerCase() === 'cancelled-refunded' ? 'Product Faulty/Refunded'
                                    //     : order.product.productStatus.toLowerCase() === 'cancelled-returned' ? 'Product Faulty/Returned'
                                    //     : order.product.productStatus.toLowerCase() === 'completed' ? 'Product Completed'
                                    //     : order.product.productStatus.toLowerCase() === 'perfected' ? 'Product Perfected'
                                    //       : order.product.productStatus.toLowerCase() === 'pending' && 'Select product status')
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
                                    width: '17%',
                                    height: '40%',
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
                                      setAnchorEl(null)
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
                            <Box style={{ marginTop: "1rem" }}>
                              <Typography
                                style={{ marginBottom: "0.5rem" }}
                                className={classes.label}
                                component="legend">
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
                                name="note"
                                value={index === i ? notes : ''}
                                onChange={(event) => {
                                  handleChange(event)
                                  setId(ord.id)
                                  setIndex(i)
                                  setProdId(order.id)
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
                                onClick={handleSubmit}
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
                  )))
              }
            </>
        }
      </Box>
    </TableLayout>
  )
}

