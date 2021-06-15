import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  CircularProgress
} from '@material-ui/core';
import {
  ArrowBackIos, Cached, EditOutlined,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
import moment from 'moment'
import NumberFormat from 'react-number-format'

import TableLayout from '../../../Components/Tables'
import { isAuthenticated } from '../../../lib/auth.helper'
import PrivateRoute from './../../../Components/PrivateRoute'
import Switch from '../../../Components/Switch';

// CSS Styles
const useStyles = makeStyles(() => ({
  container: {
    margin: "0 auto",
    padding: "2rem 2rem 6rem 2rem",
  },
  backEditWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem"
  },
  back: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    // marginBottom: "1rem",
  },
  edit: {
    background: "rgba(255, 92, 1, 0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    width: "7rem",
    marginLeft: "1.5rem"
  },
  status: {
    color: "#FF5C00",
    marginTop: "0.2rem",
    display: "flex",
    justifyContent: "center",
    AlignItems: "center",
    marginBottom: "1rem",
    borderRadius: "6px",
    background: "#FFF2EB",
    width: "8rem",
  },
  boxDisplay: {
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  boxRight: {
    display: "flex",
    padding: "2rem",
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  tableInfo: {
    color: "#272643",
    fontSize: "1rem"
  },
  backgroundOrange: {
    background: "rgba(255, 92, 1, 0.08)"
  },
  switchFontSize: {
    fontSize: "0.8rem"
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FFFFFF",
    color: "#252525",
    borderBottom: "none",
  },
  body: {
    fontSize: 14,
    borderBottom: "none",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: "#FFFFFF",
    },
    '&:hover': {
      background: "#F4F6F7"
    },
    cursor: "pointer",
    transition: "all 0.3s ease-in-out 0s",
  },
}))(TableRow);


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
  const { view } = router.query

  const url = `${process.env.BACKEND_URL}/api/get-user/${view}`

  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

const platform = [
  { name: 'Wholesaler' },
  { name: 'Campus Rep' },
  { name: 'vendor' },
]

export default function View() {
  const classes = useStyles();
  const router = useRouter();
  const { view } = router.query

  // Fetching data from backend with SWR
  const { user, isLoading, isError } = userData()
  // console.log(user)

  // initializing state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePlatformClose = () => {
    setAnchorEl(null);
  }

  const handleFilterSelect = (name, index) => {
    setSelectedFilterIndex(index);
    setAnchorEl(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const additionalType = (type) => {
    const check = type.split(',')
    let addType = []

    for (let i = 0; i < check.length; i++) {
      if (check[i] !== 'customer') {
        addType.push(check[i])
      }
    }

    return addType
  }



  return (
    <TableLayout tableNav={tableNav} name="Users">
      <Box className={classes.container}>
        <Box className={classes.backEditWrapper}>
          <span className={classes.back}>
            <Button
              size="large"
              className={classes.buttonHover}
              disableRipple
              onClick={() => router.back()}
            >
              <ArrowBackIos style={{ fontSize: "0.8rem", }} />
              <Typography style={{ fontSize: "0.8rem", }}>
                BACK
              </Typography>
            </Button>
          </span>
          <Box style={{
            display: "flex",
            alignItems: "center"
          }}>
            {/* <Box>
              <Switch
                content="SWITCH TO"
                contentSize={classes.switchFontSize}
                anchorEl={anchorEl}
                platform={platform}
                handleClick={handleClick}
                handlePlatformClose={handlePlatformClose}
                selectedFilterIndex={selectedFilterIndex}
                handleFilterSelect={handleFilterSelect}
                background={classes.backgroundOrange}
              />
            </Box> */}

            <Link
              href={"/users/customer/editcustomer/[edit]"}
              as={`/users/customer/editcustomer/${view}`}
            >
              <span className={classes.edit}>
                <Button
                  size="large"
                  className={classes.buttonHover}
                  disableRipple
                >
                  <EditOutlined style={{ fontSize: "0.9rem", color: "#FF5C00", marginRight: "0.3rem" }} />
                  <Typography style={{ fontSize: "0.8rem", fontWeight: 500, color: "#FF5C00" }}>
                    EDIT INFO
                  </Typography>
                </Button>
              </span>
            </Link>
          </Box>
        </Box>

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
              </Box> : user.user &&
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12} sm={5} md={5} lg={5} xl={5}
                >
                  <Box style={{ marginBottom: "1rem" }} className={classes.boxDisplay}>
                    <Box style={{
                      background: "#FF5C00",
                      borderRadius: "4px 4px 0 0",
                      padding: "1rem 1rem",
                    }}>
                      <Typography style={{
                        fontWeight: 600,
                        color: "#FFFFFF",
                        fontSize: "1.2rem"
                      }}>
                        {user.user.firstName} {user.user.lastName}
                      </Typography>

                      <Box className={classes.status}>
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

                        <Box style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          // alignItems: "center",
                          marginBottom: "2rem"
                        }}>
                          {
                            additionalType(user.user.userTypes).map((type, i) => (
                              <Link
                                key={i}
                                href={
                                  (type === 'wholesaler' || type === 'vendor')
                                    ? `/users/vendor/${user.user.id}`
                                    : type === 'user'
                                      ? `/users/user/${user.user.id}`
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
                          {/* 
                          <Box>
                            <Switch
                              content="Switch"
                              anchorEl={anchorEl}
                              platform={platform}
                              handleClick={handleClick}
                              handlePlatformClose={handlePlatformClose}
                              selectedFilterIndex={selectedFilterIndex}
                              handleFilterSelect={handleFilterSelect}
                            />
                          </Box> */}
                        </Box>
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
                  <Box style={{
                    height: "100%",
                    flexDirection: "column",
                  }}
                    className={classes.boxRight}
                  >
                    <Box style={{ marginBottom: "1.5rem" }}>
                      <Typography style={{ color: "#6A6A6A" }}>
                        Account Details
                      </Typography>

                      <Typography style={{
                        padding: "0.15rem 0",
                        color: "#242120",
                      }}>
                        {user.bank ? `${user.bank.accountNumber},` : ''} {user.bank ? user.bank.bankName : ''}
                        {user.bank ? user.bank.accountName : ''}
                        </Typography>
                    </Box>

                    <Box style={{ marginBottom: "1.5rem" }}>
                      <Typography style={{ color: "#6A6A6A" }}>
                        Referred by
                      </Typography>

                      <Link href={
                        user.user.userTypes.split(',').includes('user')
                          ? `/users/signup/${user.user.invited_by.id}`
                          : user.user.userTypes.split(',').includes('customer')
                            ? `/users/customer/${user.user.invited_by.id}`
                            : (user.user.userTypes.split(',').includes('vendor') || user.user.userTypes.split(',').includes('wholesaler'))
                              ? `/users/vendor/${user.user.invited_by.id}`
                              : user.user.userTypes.split(',').includes('influencer')
                                ? `/influencers/all/${user.user.invited_by.id}?code=${user.user.invited_by.refCode}` : ''
                      }>
                        <a>
                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                            textDecoration: "underline"
                          }}>
                            {user.user.invited_by.firstName} {user.user.invited_by.lastName}
                          </Typography>
                        </a>
                      </Link>
                    </Box>

                    <Box style={{ display: "flex", }}>
                      <Box style={{ marginRight: "5rem" }}>
                        <Box>
                          <Typography style={{ color: "#6A6A6A", marginRight: "1rem" }}>
                            Total Referral
                          </Typography>

                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}>
                            {user.user.my_referrers.length}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                            marginTop: "0.5rem"
                          }}>
                            Referral Code
                          </Typography>

                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}>
                            {user.user.refCode}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                            marginTop: "0.5rem"
                          }}>
                            Sign -up Platform
                          </Typography>

                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}>
                            {
                              user.user.platform === 'wholesaler'
                                ? 'Wholesale Center' : 'Marketplace Center'
                            }
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Box>
                          <Typography style={{
                            color: "#6A6A6A",
                            marginRight: "1rem"
                          }}>
                            Verified Referrals
                          </Typography>

                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}>
                            {
                              user.user.my_referrers.filter(ref => ref.activated === 1).length
                            }
                          </Typography>
                        </Box>

                        <Box>
                          <Typography style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                            marginTop: "0.5rem"
                          }}>
                            Earnings
                          </Typography>
                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}>
                            <NumberFormat 
                              value={
                                user.customer_earnings_payments.map(earn => earn.amount).reduce((a, b) => a = Number(a) + Number(b), 0)
                              } 
                              displayType={'text'} 
                              thousandSeparator={true} 
                              prefix={'₦'} 
                            />
                          </Typography>
                        </Box>

                        <Box>
                          <Typography style={{
                            color: "#6A6A6A",
                            marginRight: "1rem",
                            marginTop: "0.5rem"
                          }}>
                            Sign-up Date
                          </Typography>
                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}>
                            {moment(user.user.createdAt).format('MMM DD, YYYY')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                </Grid>

                <Grid
                  item
                  xs={12} sm={12} md={12} lg={12} xl={12}
                >
                  <Box style={{ padding: "1.5rem 1rem 3rem 2.5rem" }}
                    className={classes.boxDisplay}
                  >
                    <Typography style={{
                      fontWeight: 600,
                      marginBottom: "0.8rem"
                    }}>
                      Orders Placed
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left">ID</StyledTableCell>
                            <StyledTableCell align="left">Date & Time</StyledTableCell>
                            <StyledTableCell align="left">Product</StyledTableCell>
                            <StyledTableCell align="left">Sub-total</StyledTableCell>
                            <StyledTableCell align="left">Status</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            user.customer_orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map(order => (
                                <StyledTableRow key={order.id}>
                                  <StyledTableCell style={{ width: "5rem" }} align="left">
                                    <Typography className={classes.tableInfo}>
                                      {order.orderId}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "9rem" }} align="left">
                                    <Typography className={classes.tableInfo}>
                                      {moment(order.createdAt).format('MMM DD, YYYY')}, {moment(order.createdAt).format('hh:mm a')}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }}
                                    align="left">
                                    <Typography className={classes.tableInfo}>
                                      {order.ordrpayment.filter(ord => ord.orderId === order.orderId).length}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }}
                                    align="left">
                                    <Typography className={classes.tableInfo}>
                                      ₦{order.subtotal}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }} align="left">
                                    <Typography style={
                                      order.status === "CANCELED" ?
                                        {
                                          width: "5.5rem",
                                          fontSize: "0.65rem",
                                          color: "#299253",
                                          background: "#F0FAF4",
                                          borderRadius: "4px",
                                          padding: "0.3rem 0.75rem"
                                        } :
                                        {
                                          width: "5.5rem",
                                          fontSize: "0.65rem",
                                          color: "#FF1111",
                                          background: "#FFECEC",
                                          borderRadius: "4px",
                                          padding: "0.3rem 0.75rem"
                                        }
                                    }>
                                      {order.status}
                                    </Typography>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15, 20]}
                      component="div"
                      count={user.customer_orders.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12} sm={12} md={12} lg={12} xl={12}
                >
                  <Box style={{ padding: "1.5rem 1rem 3rem 2.5rem" }}
                    className={classes.boxDisplay}
                  >
                    <Typography style={{
                      fontWeight: 600,
                      marginBottom: "0.8rem"
                    }}>
                      Testimonial
                    </Typography>

                    <Typography style={{
                      color: "rgba(39, 38, 67, 0.8)",
                      opacity: 0.8,
                      fontSize: "0.9rem"
                    }}>
                      {/* 12 Mar, 2020 */}
                      N/A
                    </Typography>

                    {/* <Typography style={{
                      color: "#272643",
                      fontSize: "1rem",
                      maxWidth: "30rem"
                    }}>
                      I had the best experience shopping with vasiti.
                      Usability of the website was great, very good customer service,
                      an all round great experience. I would definately be coming back!
                  </Typography> */}
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12} sm={12} md={12} lg={12} xl={12}
                >
                  <Box style={{ padding: "1.5rem 1rem 3rem 2.5rem" }}
                    className={classes.boxDisplay}
                  >
                    <Typography style={{
                      fontWeight: 600,
                      marginBottom: "0.8rem"
                    }}>
                      Reviews
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left">Product SKU</StyledTableCell>
                            <StyledTableCell align="left">Review</StyledTableCell>
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="left">Rating</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {user.reviews ? 
                            user.reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((review, index) => (
                                <StyledTableRow key={index}>
                                  <StyledTableCell style={{ width: "8rem" }} align="left">
                                    <Typography className={classes.tableInfo}>
                                      {review.product}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "9rem" }} align="left">
                                    <Typography className={classes.tableInfo}>
                                      {review.review}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }}
                                    align="left">
                                    <Typography className={classes.tableInfo}>
                                      {review.date}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }}
                                    align="left">
                                    <Typography style={
                                      {
                                        width: "4.5rem",
                                        fontSize: "0.65rem",
                                        color: "#299253",
                                        background: "#F0FAF4",
                                        borderRadius: "4px",
                                        padding: "0.3rem 0.75rem"
                                      }
                                    }>
                                      {review.rating}
                                    </Typography>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))
                              : 'N/A'
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15, 20]}
                      component="div"
                      count={user.reviews ? user.reviews.length : ''}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Box>
                </Grid>
              </Grid>
        }
      </Box>
    </TableLayout>
  )
}