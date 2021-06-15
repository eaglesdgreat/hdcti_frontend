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
  CircularProgress,
} from '@material-ui/core';
import {
  ArrowBackIos,
  EditOutlined,
  ArrowForwardIos,
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
  boxProducts: {
    padding: "2rem 3rem",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  smallTopBox: {
    padding: "1rem 1rem 1rem 1.5rem",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #F1F1F1",
    borderRadius: "8px",
    margin: "0 0.5rem 0.5rem 0",
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
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const additionalType = (type, platform) => {
    const check = type.split(',')
    let addType = []

    for (let i = 0; i < check.length; i++) {
      if ((check[i] !== 'wholesaler' && platform === 'wholesaler') || (check[i] !== 'vendor' && platform === 'vendor')) {
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
              href={"/users/vendor/editvendor/[edit]"}
              as={`/users/vendor/editvendor/${view}`}
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
                      <Box
                        display="flex"
                      >
                        <Typography style={{
                          fontWeight: 600,
                          color: "#FFFFFF",
                          fontSize: "1.2rem",
                        }}>
                          {user.user.firstName} {user.user.lastName}
                        </Typography>

                        <Typography style={{
                          fontWeight: 600,
                          color: "#FFFFFF",
                          fontSize: "15px",
                          marginLeft: '20px',
                        }}>
                          {
                            user.user.userTypes.split(',').includes('wholesaler')
                              ? 'WHOLESALER' : user.user.userTypes.split(',').includes('vendor')
                                ? 'VENDOR'
                                : (user.user.userTypes.split(',').includes('wholesaler') && user.user.userTypes.split(',').includes('vendor'))
                                  ? 'WHOLESALER/ VENDOR' : ''
                          }
                        </Typography>
                      </Box>

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
                      <Box style={{ marginBottom: "1rem" }}>
                        <Typography style={{ color: "#6A6A6A" }}>
                          Business Info
                        </Typography>

                        <Typography style={{ fontWeight: "500", }}>
                          {user.user.businessName}
                        </Typography>

                        <Typography>
                          {user.user.address}, {user.user.city}, {user.user.state}
                        </Typography>
                      </Box>

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
                                  type === 'customer'
                                    ? `/users/customer/${user.user.id}`
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
                          {/* <Box>
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
                  item container
                  xs={12} sm={7} md={7} lg={7} xl={7}
                >
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Link
                      href="/users/vendor/reviews/[view]"
                      as={`/users/vendor/reviews/${view}`}
                    >
                      <a style={{ textDecoration: 'none' }}>
                        <Box className={classes.smallTopBox}>
                          <Typography style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                            N/A
                          </Typography>

                          <Typography style={{ color: "#6A6A6A", fontSize: "0.9rem" }}>
                            REVIEWS/ RATINGS
                          </Typography>
                        </Box>
                      </a>
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Link
                      href="/users/vendor/products/[view]"
                      as={`/users/vendor/products/${view}`}
                    >
                      <a style={{ textDecoration: 'none' }}>
                        <Box className={classes.smallTopBox}>
                          <Typography style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                            {user.products_count}
                          </Typography>

                          <Typography style={{ color: "#6A6A6A", fontSize: "0.9rem" }}>
                            PRODUCTS
                          </Typography>
                        </Box>
                      </a>
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Link
                      href="/users/vendor/services/[view]"
                      as={`/users/vendor/services/${view}`}
                    >
                      <a style={{ textDecoration: 'none' }}>
                        <Box className={classes.smallTopBox}>
                          <Typography style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                            N/A
                          </Typography>

                          <Typography style={{ color: "#6A6A6A", fontSize: "0.9rem" }}>
                            SERVICES
                          </Typography>
                        </Box>
                      </a>
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Box className={classes.smallTopBox}>
                      <Typography style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                        {user.wholesaler_orders_sold.length}
                      </Typography>

                      <Typography style={{ color: "#6A6A6A", fontSize: "0.9rem" }}>
                        SOLD
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Link
                      href="/users/vendor/orders/[view]"
                      as={`/users/vendor/orders/${view}`}
                    >
                      <a style={{ textDecoration: 'none' }}>
                        <Box className={classes.smallTopBox}>
                          <Typography style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                            {user.wholesaler_orders_count.length}
                          </Typography>

                          <Typography style={{ color: "#6A6A6A", fontSize: "0.9rem" }}>
                            ORDERS
                          </Typography>
                        </Box>
                      </a>
                    </Link>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <Box className={classes.smallTopBox}>
                      <Typography style={{ fontSize: "1.3rem", fontWeight: 700 }}>
                        <NumberFormat
                          value={
                            user.wholesaler_earnings_payments
                              .map(sale => sale.paid_to_earn.amount)
                              .reduce((a, b) => a = Number(a) + Number(b), 0)
                          }
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'₦'}
                        />
                      </Typography>

                      <Typography style={{ color: "#6A6A6A", fontSize: "0.9rem" }}>
                        SALES
                      </Typography>
                    </Box>
                  </Grid>

                  <Box style={{
                    flexDirection: "column",
                    marginTop: "0.8rem"
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

                      <Link href={user.user.invited_by ?
                        (user.user.userTypes.split(',').includes('user')
                          ? `/users/signup/${user.user.invited_by.id}`
                          : user.user.userTypes.split(',').includes('customer')
                            ? `/users/customer/${user.user.invited_by.id}`
                            : (user.user.userTypes.split(',').includes('vendor') || user.user.userTypes.split(',').includes('wholesaler'))
                              ? `/users/vendor/${user.user.invited_by.id}`
                              : user.user.userTypes.split(',').includes('influencer')
                                ? `/influencers/all/${user.user.invited_by.id}?code=${user.user.invited_by.refCode}` : '') : ''
                      }>
                        <a>
                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                            textDecoration: "underline"
                          }}>
                            {user.user.invited_by ? user.user.invited_by.firstName : ''} {
                              user.user.invited_by ? user.user.invited_by.lastName : ''}
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
                            Total Earnings
                          </Typography>
                          <Typography style={{
                            padding: "0.15rem 0",
                            color: "#242120",
                          }}>
                            <NumberFormat
                              value={
                                (user.wholesaler_earnings_payments
                                  .map(earn => earn.amount)
                                  .reduce((a, b) => a = Number(a) + Number(b), 0))
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
                  item xs={12} sm={12} md={12} lg={12} xl={12}
                >
                  <Box style={{ padding: "1.5rem 1rem 3rem 2.5rem" }}
                    className={classes.boxDisplay}
                  >
                    <Typography style={{
                      fontWeight: 600,
                      marginBottom: "0.8rem"
                    }}>
                      Payment History
                    </Typography>

                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left">ID</StyledTableCell>
                            <StyledTableCell align="left">Date & Time</StyledTableCell>
                            <StyledTableCell align="left">Earnings</StyledTableCell>
                            <StyledTableCell align="left">Bank Details</StyledTableCell>
                            <StyledTableCell align="left">Date</StyledTableCell>
                            <StyledTableCell align="left">Status</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            user.wholesaler_earnings_payments
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map(payment => (
                                <StyledTableRow key={payment.id}>
                                  <StyledTableCell style={{ width: "5rem" }} align="left">
                                    <Typography className={classes.tableInfo}>
                                      {payment.paid_to_earn.transId}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "9rem" }} align="left">
                                    <Typography className={classes.tableInfo} style={{ fontSize: '13px' }}>
                                      {moment(payment.paid_to_earn.createdAt).format('MMM DD, YYYY')},
                                      {moment(payment.paid_to_earn.createdAt).format('hh:mm a')}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }}
                                    align="left">
                                    <Typography className={classes.tableInfo}>
                                      <NumberFormat
                                        value={payment.paid_to_earn.amount}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'₦'}
                                      />
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }}
                                    align="left">
                                    <Typography
                                      className={classes.tableInfo}
                                      style={{ fontSize: '13px' }}
                                    >
                                      {user.bank ? `${user.bank.accountNumber}` : ''}
                                      {user.bank ? user.bank.bankName : ''}
                                    </Typography>

                                    <Typography style={{ color: "#6A6A6A", fontSize: '13px' }}>
                                      {user.bank ? user.bank.accountName : ''}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }}
                                    align="left">
                                    <Typography className={classes.tableInfo} style={{ fontSize: '13px' }}>
                                      {moment(payment.paid_to_earn.datePaid).format('MMM DD, YYYY')}
                                    </Typography>
                                  </StyledTableCell>

                                  <StyledTableCell
                                    style={{ minwidth: "10rem" }} align="left">
                                    <Typography style={
                                      {
                                        width: "3rem",
                                        fontSize: "0.65rem",
                                        color: "#299253",
                                        background: "#F0FAF4",
                                        borderRadius: "4px",
                                        padding: "0.3rem 0.75rem"
                                      }}>
                                      {
                                        payment.paid_to_earn.earnId === payment.id
                                          ? payment.status : 'not paid'
                                      }
                                    </Typography>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <TablePagination
                      rowsPerPageOptions={[10, 15, 20]}
                      component="div"
                      count={user.wholesaler_earnings_payments.length}
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
              </Grid>
        }
      </Box>
    </TableLayout>
  )
}