import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Box,
  Grid,
  Menu,
  MenuItem,
  InputBase,
  Button,
  Tooltip,
  CircularProgress
} from '@material-ui/core'
import DatePicker from '../../Components/DatePicker'
import axios from 'axios';
import useSWR from 'swr'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import moment from 'moment'
import clsx from 'clsx';

import { isAuthenticated } from './../../lib/auth.helper'
import PrivateRoute from './../../Components/PrivateRoute'
import TableLayout from '../../Components/Tables'
import { PieChart } from 'react-minimal-pie-chart';

// CSS Styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: " 0 2rem 4rem 1.3rem",
  },
  title: {
    fontSize: "0.75rem",
    marginBottom: "0.5rem",
    color: "#6A6A6A",
  },
  boxRightTop: {
    padding: "1.5rem 1rem 1rem 1rem",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    height: "100%",
    width: "100%",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  boxLeft: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    padding: "1.5rem 1.5rem 1.3rem 1.5rem",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
    height: "100%"
  },
  pieChartNumberLeft: {
    fontSize: "2rem",
    fontWeight: 600,
    position: "absolute",
    right: "37%",
    top: "34%",
  },
  piechartNumberRightTop1: {
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#242120",
    position: "absolute",
    right: "32%",
    top: "30%",
  },
  piechartNumberRightTop2: {
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#242120",
    position: "absolute",
    right: "30%",
    top: "32%",
  },
  piechartNumberRightBottom: {
    fontSize: "2rem",
    fontWeight: 600,
    color: "#242120",
    position: "absolute",
    right: "40%",
    top: "34%",
  },
  incrementIndicator: {
    fontSize: "0.65rem",
    color: "#6A6A6A",
    background: "#F8FAFA",
    marginBottom: "0.6rem",
    padding: "0.3rem 0.4rem",
    borderRadius: "4px"
  },
  span: {
    content: "/2139",
  }
}));

const tableNav = [
  {
    active: true,
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
    active: false,
    label: 'vendors',
    link: '/users/vendors'
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


const userData = () => {
  const url = `${process.env.BACKEND_URL}/api/all-users`
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    users: data,
    isLoading: !error && !data,
    isError: error
  }
}



export default function Stats() {
  const router = useRouter()
  const classes = useStyles();

  // fetching data from API
  const { users, isLoading, isError } = userData()
  // console.log(users)

  // date Picker props
  var date = new Date(), year = date.getFullYear(), month = date.getMonth();

  const [startDate, setStartDate] = useState(new Date(year, month, 1))
  const [endDate, setEndDate] = useState(new Date())
  const [allUsers, setAllUsers] = useState([])
  const [allCustomers, setAllCustomers] = useState([])
  const [allVendors, setAllVendors] = useState([])
  const [allSignups, setAllSignups] = useState([])

  // Getting wholesaler vendors
  const wholesaleVendors = () => {
    const data = (allVendors.length > 0 ? allVendors : users.vendor).filter(vendor => {
      const type = vendor.userTypes.split(',')
      return type.includes('wholesaler')
    })

    return data
  }


  // Getting marketplace vendors
  const marketplaceVendors = () => {
    const data = (allVendors.length > 0 ? allVendors : users.vendor).filter(vendor => {
      const type = vendor.userTypes.split(',')
      return type.includes('vendor')
    })

    return data
  }

  const verifiedSignupUsers = () => {
    const data = (allSignups.length > 0 ? allSignups : users.signup).filter(user => {
      const type = user.userTypes.split(',')
      return (type.includes('user') && user.activated === 1)
    })

    return data
  }

  const singleOrderCustomers = () => {
    const data = (allCustomers.length > 0 ? allCustomers : users.customer)
      .filter(customer => customer.paid_orders.length > 0 && customer.paid_orders.length <= 1)
    // console.log(data)

    return data
  }

  const multipleOrderCustomers = () => {
    const data = (allCustomers.length > 0 ? allCustomers : users.customer).filter(customer => customer.paid_orders.length > 1)
    // console.log(data.length, users.customer.length)

    return data
  }

  const unVerifiedVendors = (ventype) => {
    const data = (allVendors.length > 0 ? allVendors : users.vendor).filter(vendor => {
      const type = vendor.userTypes.split(',')
      return (type.includes(ventype) && vendor.activated === 0)
    })

    return data
  }

  const dateRangeChange = (start, end) => {
    const upperBound = moment(moment(start).format("DD/MM/YYYY"), "DD/MM/YYYY")
    const lowerBound = moment(moment(end).format("DD/MM/YYYY"), "DD/MM/YYYY")

    if (upperBound && lowerBound) {
      const usersData = users.users.filter(date => {
        const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
        const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
        return check
      })

      const customersData = users.customer.filter(date => {
        const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
        const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
        return check
      })

      const signupsData = users.signup.filter(date => {
        const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
        const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
        return check
      })

      const vendorsData = users.vendor.filter(date => {
        const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
        const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
        return check
      })

      setAllUsers([...usersData])
      setAllCustomers([...customersData])
      setAllSignups([...signupsData])
      setAllVendors([...vendorsData])

      // if (status === 'Clear' || status === '') {
      //   const allOrders = orders.orders.total.rows
      //     .filter(date => {
      //       const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
      //       const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
      //       return check
      //     })
      //   // console.log(allOrders, status)
      //   setPlatform([...allOrders])
      //   setGraphData([])
      // }
    } else {
      return
    }
  }
  // console.log(allUsers)

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

    dateRangeChange(ranges.selection.startDate, ranges.selection.endDate)
  }

  const handleCurrentStatus = () => {
    setStartDate(new Date(year, month, 1));
    setEndDate(new Date());

    dateRangeChange(new Date(year, month, 1), new Date())
  }

  return (
    <TableLayout tableNav={tableNav} name="Users">
      {
        isError ? (<PrivateRoute isError={isError} />)
          : isLoading ?
            (<Box
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
            </Box>) : users &&
            <Box>
              <Box style={{
                width: "70%",
                padding: "1.3rem"
              }}>
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  handleSelect={handleSelect}
                  handleCurrentStatus={handleCurrentStatus}
                />
              </Box>

              <Grid container spacing={2} className={classes.root}>
                <Grid
                  item
                  xs={12} sm={6} md={4} lg={4} xl={4}
                >
                  <Box className={classes.boxLeft}>
                    <Typography style={{
                      color: "#6A6A6A",
                      fontSize: "0.9375rem"
                    }}>
                      All Users
                    </Typography>

                    <Box style={{ position: "relative" }}>
                      <Box style={{
                        position: "relative",
                        marginTop: "1rem",
                      }}>
                        <PieChart
                          data={[
                            {
                              title: 'Sign-Ups',
                              value: (allSignups.length > 0 ? allSignups.length : users.signup.length),
                              color: '#FF5C00',
                            },
                            {
                              title: 'Customers',
                              value: (allCustomers.length > 0 ? allCustomers.length : users.customer.length),
                              color: '#1A56EF',
                            },
                            {
                              title: 'Vendors',
                              value: (allVendors.length > 0 ? allVendors.length : users.vendor.length),
                              color: '#E12222',
                            },
                          ]}
                          lineWidth={12}
                          startAngle={30}
                          paddingAngle={11}
                          rounded={true}
                          animate={true}
                          animationDuration={800}
                          animationEasing="ease-in-out"
                          background="#F4F5F6"
                        />
                      </Box>

                      <Typography className={classes.pieChartNumberLeft}>
                        {
                          allUsers.length > 0
                            ? allUsers.length
                            : users.totalUsers
                        }
                      </Typography>
                    </Box>

                    <Box style={{ margin: "2rem auto" }}>
                      <Box style={{ display: "flex", }}>
                        <img src="/signups-dot.svg" alt="dot"
                          style={{ marginRight: "0.5rem" }}
                        />
                        <Typography
                          style={{
                            color: "#6A6A6A",
                            fontSize: "0.8rem"
                          }}
                        >
                          {
                            allSignups.length > 0
                              ? allSignups.length
                              : users.signup.length
                          } New Users <Tooltip
                            title="The New Users are the Users that signup on any Vasiti platform and haven't bougth/shop on Vasiti"
                          >
                            <span className={classes.span}>&#8505;</span>
                          </Tooltip>
                        </Typography>
                      </Box>

                      <Box style={{ display: "flex", }}>
                        <img src="/wholesalers-dot.svg" alt="dot"
                          style={{ marginRight: "0.5rem" }}
                        />
                        <Typography
                          style={{
                            color: "#6A6A6A",
                            fontSize: "0.8rem"
                          }}
                        >
                          {
                            allCustomers.length > 0
                              ? allCustomers.length
                              : users.customer.length
                          } Customers
                        </Typography>
                      </Box>

                      <Box style={{ display: "flex", }}>
                        <img src="/customers-dot.svg" alt="dot"
                          style={{ marginRight: "0.5rem" }}
                        />
                        <Typography
                          style={{
                            color: "#6A6A6A",
                            fontSize: "0.8rem"
                          }}
                        >
                          {
                            allVendors.length > 0
                              ? allVendors.length
                              : users.vendor.length
                          } Vendors
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography style={{
                        color: "#6A6A6A",
                        fontSize: "0.9375rem",
                        fontWeight: '600',
                      }}>
                        Weekly added Users
                      </Typography>
                      <Typography style={{ width: "5.3rem" }} className={classes.incrementIndicator}>
                        <span style={{ color: "#00A210" }}>+{
                          (allSignups.length > 0 ? allSignups : users.signup).filter(user => {
                            const currentDate = moment();
                            const weekStart = currentDate.clone().startOf('week');
                            const weekEnd = currentDate.clone().endOf('week');

                            let days = [];
                            for (let i = 0; i <= 6; i++) {
                              days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd YYYY"));
                            }

                            // return moment(moment(user.createdAt).format('DD/MM/YYYY')).isSame(moment(date).format('DD/MM/YYYY'))
                            return days.includes(moment(user.createdAt).format("MMMM Do,dddd YYYY"))
                          }).length
                        }</span> New Users
                      </Typography>

                      <Typography style={{ width: "6.5rem" }} className={classes.incrementIndicator}>
                        <span style={{ color: "#00A210" }}>+{
                          (allCustomers.length > 0 ? allCustomers : users.customer).filter(customer => {
                            const currentDate = moment();
                            const weekStart = currentDate.clone().startOf('week');
                            const weekEnd = currentDate.clone().endOf('week');

                            let days = [];
                            for (let i = 0; i <= 6; i++) {
                              days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd YYYY"));
                            }

                            // return moment(moment(customer.createdAt).format('DD/MM/YYYY')).isSame(moment(date).format('DD/MM/YYYY'))
                            return days.includes(moment(customer.createdAt).format("MMMM Do,dddd YYYY"))
                          }).length
                        }</span> CUSTOMERS
                      </Typography>

                      <Typography style={{ width: "9.5rem" }} className={classes.incrementIndicator}>
                        <span style={{ color: "#00A210" }}>+{
                          (allVendors.length > 0 ? allVendors : users.vendor).filter(vendor => {
                            const currentDate = moment();
                            const weekStart = currentDate.clone().startOf('week');
                            const weekEnd = currentDate.clone().endOf('week');

                            let days = [];
                            for (let i = 0; i <= 6; i++) {
                              days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd YYYY"));
                            }

                            const type = vendor.userTypes.split(',')

                            // return (type.includes('wholesaler')
                            //   && moment(moment(vendor.createdAt).format('DD/MM/YYYY')).isSame(moment(date).format('DD/MM/YYYY')))
                            return (type.includes('wholesaler') && days.includes(moment(vendor.createdAt).format("MMMM Do,dddd YYYY")))
                          }).length
                        }</span> WHOLESALE VENDORS
                      </Typography>

                      <Typography style={{ width: "10rem" }} className={classes.incrementIndicator}>
                        <span style={{ color: "#00A210" }}>
                          +{
                            (allVendors.length > 0 ? allVendors : users.vendor).filter(vendor => {
                              const currentDate = moment();
                              const weekStart = currentDate.clone().startOf('week');
                              const weekEnd = currentDate.clone().endOf('week');

                              let days = [];
                              for (let i = 0; i <= 6; i++) {
                                days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd YYYY"));
                              }

                              const type = vendor.userTypes.split(',')

                              // return (type.includes('vendor')
                              //   && moment(moment(vendor.createdAt).format('DD/MM/YYYY')).isSame(moment(date).format('DD/MM/YYYY')))
                              return (type.includes('vendor') && days.includes(moment(vendor.createdAt).format("MMMM Do,dddd YYYY")))
                            }).length
                          }
                        </span> MARKETPLACE VENDORS
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  className={classes.boxRightContainer}
                  xs={12} sm={6} md={8} lg={8} xl={8}
                >
                  <Grid
                    container
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={12} sm={4} md={4} lg={4} xl={4}
                    >
                      <Box className={classes.boxRightTop}>
                        <Typography
                          className={classes.title}>
                          Verified Sign-ups
                        </Typography>

                        <Box style={{ position: "relative" }}>
                          <Box style={{ padding: "0.5rem", position: "relative" }}>
                            <PieChart
                              data={
                                [
                                  {
                                    title: 'Verified Signups',
                                    // value: Math.round((verifiedSignupUsers().length / users.signup.length) * 100),
                                    value: verifiedSignupUsers().length,
                                    color: '#1A56EF',
                                  },

                                  // {
                                  //   title: 'Total Signups',
                                  //   value: users.signup.length,
                                  //   color: '',
                                  // },
                                ]
                              }
                              lineWidth={12}
                              startAngle={190}
                              paddingAngle={11}
                              rounded={true}
                              animate={true}
                              animationDuration={800}
                              animationEasing="ease-in-out"
                              background="#F4F5F6"
                            />
                          </Box>

                          <Typography className={classes.piechartNumberRightTop1}>
                            {Math.round((verifiedSignupUsers().length / users.signup.length) * 100)}%
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid
                      item
                      xs={12} sm={8} md={8} lg={8} xl={8}
                    >
                      <Box className={classes.boxRightTop}>
                        <Typography className={classes.title}>
                          Customers
                        </Typography>

                        <Grid container>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Box style={{ position: "relative" }}>
                              <Box style={{
                                padding: "0.5rem",
                                position: "relative"
                              }}>
                                <PieChart
                                  data={
                                    [
                                      {
                                        title: 'Single Orders Customers',
                                        value: Math.round((singleOrderCustomers().length / users.customer.length) * 100),
                                        // value: singleOrderCustomers().length,
                                        color: '#1A56EF',
                                      },
                                      {
                                        title: 'All Customers',
                                        // value: Math.round((users.customer.length / users.customer.length) * 100),
                                        value: users.customer.length,
                                        color: '',
                                      },
                                    ]
                                  }
                                  lineWidth={12}
                                  startAngle={20}
                                  paddingAngle={11}
                                  rounded={true}
                                  animate={true}
                                  animationDuration={800}
                                  animationEasing="ease-in-out"
                                  background="#F4F5F6"
                                />
                              </Box>

                              <Typography className={classes.piechartNumberRightTop2}>
                                {
                                  users.customer.length === 0 ? 0 :
                                    singleOrderCustomers() &&
                                    Math.round((singleOrderCustomers().length / users.customer.length) * 100)
                                }%
                              </Typography>
                            </Box>

                            <Typography style={{ textAlign: "center" }} className={classes.title}>
                              Single Orders
                            </Typography>
                          </Grid>

                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Box style={{ position: "relative" }}>
                              <Box style={{
                                padding: ".5rem",
                                position: "relative"
                              }}>
                                <PieChart
                                  data={
                                    [
                                      {
                                        title: 'All Customers',
                                        // value: Math.round((users.customer.length / users.customer.length) * 100),
                                        value: users.customer.length,
                                        color: '',
                                      },
                                      {
                                        title: 'Reordered Customers',
                                        value: Math.round((multipleOrderCustomers().length / users.customer.length) * 100),
                                        color: '#FF5C00',
                                      },
                                    ]
                                  }
                                  lineWidth={12}
                                  startAngle={280}
                                  paddingAngle={11}
                                  rounded={true}
                                  animate={true}
                                  animationDuration={800}
                                  animationEasing="ease-in-out"
                                  background="#F4F5F6"
                                />
                              </Box>

                              <Typography className={classes.piechartNumberRightTop2}>
                                {
                                  users.customer.length === 0 ? 0 :
                                    multipleOrderCustomers() &&
                                    Math.round((multipleOrderCustomers().length / users.customer.length) * 100)
                                }%
                              </Typography>
                            </Box>

                            <Typography style={{ textAlign: "center" }} className={classes.title}>
                              Reorders
                          </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>

                    <Grid
                      container
                      item
                      xs={12} sm={12} md={12} lg={12} xl={12}
                    >
                      <Box className={classes.boxRightTop}>
                        <Typography className={classes.title}>
                          All Vendors
                        </Typography>

                        <Grid container>
                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Box style={{ position: "relative" }}>
                              <Box style={{
                                padding: ".5rem 2rem",
                                position: "relative"
                              }}>
                                <PieChart
                                  data={
                                    [
                                      {
                                        title: 'Marketplace',
                                        value: users.vendor && marketplaceVendors().length,
                                        color: '#8222E1',
                                      },
                                      {
                                        title: 'Wholesale',
                                        value: users.vendor && wholesaleVendors().length,
                                        color: '#FF5C00',
                                      },
                                    ]
                                  }
                                  lineWidth={12}
                                  startAngle={280}
                                  paddingAngle={11}
                                  rounded={true}
                                  animate={true}
                                  animationDuration={800}
                                  animationEasing="ease-in-out"
                                  background="#F4F5F6"
                                />
                              </Box>

                              <Typography className={classes.piechartNumberRightBottom}>
                                {users.vendor.length}
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <Box style={{
                              paddingLeft: "2rem",
                              display: "flex",
                              alignItems: "flex-start"
                            }}>
                              <img src="/vendors-dot.svg" alt="dot"
                                style={{ marginRight: "0.7rem", marginTop: "0.5rem" }}
                              />
                              <Box>
                                <Typography style={{
                                  fontSize: "1.5rem",
                                  fontWeight: 600
                                }}>
                                  {users.vendor && marketplaceVendors().length}
                                </Typography>

                                <Typography style={{
                                  fontSize: "0.7rem",
                                  color: "#6A6A6A"
                                }}>
                                  Marketplace Vendors
                                </Typography>

                                <Typography style={{
                                  fontSize: "0.7rem",
                                  background: "#F4F6F7",
                                  color: "#6A6A6A",
                                  padding: "0.2rem 0.4rem",
                                  width: "5.5rem",
                                  borderRadius: "4px",
                                  marginTop: "0.5rem",
                                  marginBottom: "1rem"
                                }}>
                                  {unVerifiedVendors('vendor').length} UNVERIFIED
                                </Typography>
                              </Box>
                            </Box>

                            <Box style={{
                              paddingLeft: "2rem",
                              marginBottom: "2rem"
                            }}>
                              <Box style={{
                                display: "flex",
                                alignItems: "flex-start"
                              }}>
                                <img src="/signups-dot.svg" alt="dot"
                                  style={{ marginRight: "0.7rem", marginTop: "0.5rem" }}
                                />
                                <Box>
                                  <Typography style={{
                                    fontSize: "1.5rem",
                                    fontWeight: 600
                                  }}>
                                    {users.vendor && wholesaleVendors().length}
                                  </Typography>

                                  <Typography style={{
                                    fontSize: "0.7rem",
                                    color: "#6A6A6A"
                                  }}>
                                    Wholesale Vendors
                                  </Typography>

                                  <Typography style={{
                                    fontSize: "0.7rem",
                                    background: "#F4F6F7",
                                    color: "#6A6A6A",
                                    padding: "0.2rem 0.4rem",
                                    width: "5.8rem",
                                    borderRadius: "4px",
                                    marginTop: "0.5rem"
                                  }}>
                                    {unVerifiedVendors('wholesaler').length} UNVERIFIED
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
      }
    </TableLayout>
  )
}