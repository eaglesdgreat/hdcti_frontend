import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableLayout from '../../Components/Tables'
import {
  Typography,
  Box,
  Button,
  MenuItem,
  InputBase,
  Menu,
  Grid,
  CircularProgress
} from '@material-ui/core'
import axios from 'axios';
import useSWR, { mutate } from 'swr'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import moment from 'moment';
// import { extendMoment } from 'moment-range';
import clsx from 'clsx';
import Link from 'next/link'
import NumberFormat from 'react-number-format'

import { isAuthenticated } from './../../lib/auth.helper'
import PrivateRoute from './../../Components/PrivateRoute'
import Chart from './stats/Chart'
import DatePicker from '../../Components/DatePicker'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1.5rem 1rem 4rem 1.3rem",
    position: "relative"
  },
  title: {
    fontSize: "0.8rem",
    color: "#6A6A6A",
  },
  boxRight: {
    padding: "1.5rem 2rem 2rem 1.5rem",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    marginBottom: "1rem",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
    [theme.breakpoints.down('sm')]: {
      marginTop: "2rem",
    },
  },
  boxLeft: {
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    marginRight: "1rem",
    // marginBottom: "1rem",
    padding: "1.5rem 2.5rem 1.3rem 1.3rem",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  salesChat: {
    marginTop: "1rem",
  },
  chartBox: {
    borderRadius: "8px",
    border: "1px solid #EAEAEA",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
    marginBottom: "1rem",
    height: "80%"
  },
  sortBox: {
    width: "100%",
    height: "2.7rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FFFFFF",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    paddingLeft: "0.6rem",
    paddingRight: "0.6rem",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
  }
}));

const tableNav = [
  {
    active: true,
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
    active: false,
    label: 'history',
    link: '/orders/history'
  },
]



const fetcher = async (...arg) => {
  const [url, token] = arg

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}


const ordersData = () => {
  const url = `${process.env.BACKEND_URL}/api/all-orders`
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error
  }
}



export default function Stats() {
  const classes = useStyles();
  // const moment = extendMoment(Moment);

  const { orders, isLoading, isError } = ordersData()
  // console.log(orders.orders.total.rows)

  // date Picker props
  var date = new Date(), year = date.getFullYear(), month = date.getMonth();

  const [anchorEl, setAnchorEl] = useState();
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [platform, setPlatform] = useState([])
  const [status, setStatus] = useState('')
  const [dateFilterCheck, setDateFilterCheck] = useState('')
  const [graphData, setGraphData] = useState([])
  const [startDate, setStartDate] = useState(new Date(year, month, 1))
  const [endDate, setEndDate] = useState(new Date())

  const filterItems = [
    { name: 'Filter by platform', disabled: true },
    { name: 'Wholesaler', disabled: false },
    { name: 'Marketplace', disabled: false },
    { name: 'Clear', disabled: false },
  ]

  const onWeekChange = (...date) => {
    const month = date[0][0]
    const year = date[0][1]
    // console.log(date[0][1])

    const newDate = []
    // const data = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
    //   'October', 'November', 'December',]

    const items = orders.orders.total.rows
      .filter(x => {
        const check = moment(x.createdAt).format('YYYY').toString() === year;
        // console.log(moment(x.createdAt).format('MMMM'))
        return check
      })
      .filter(x => {
        const check = moment(x.createdAt).format('MMMM').toString() === month;
        // console.log(moment(x.createdAt).format('MMMM'))
        return check
      })
    // .map(y => Number(JSON.parse(y.product).price))

    const week1 = items.filter(y => {
      const check = moment(y.createdAt).week(1)
      console.log(check)
      return check
    })

    // console.log(newDate)
    return newDate
  }

  // Grouping orders data by request ID and order ID
  const grouping = (arg) => {
    // `data` is an array of objects, `key` is the key (or property accessor) to group by
    const requestsData = dateFilterCheck === 'no_data' ? [] :
      platform.length > 0 ? platform.length
        : orders.orders.total.rows

    const ordersData = requestsData.filter(ord => ord.orderId !== null)

    const data = arg === 'requestId' ? requestsData : ordersData

    const key = arg

    // reduce runs this arrow function on each element of `data` (the `item` parameter),
    // returning the `storage` parameter at the end
    return data.reduce((storage, item) => {
      // get the first instance of the key by which we're grouping
      let group = item[key];
      // console.log(group)

      // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
      storage[group] = storage[group] || [];

      // add this item to its group within `storage`
      storage[group].push(item);
      // console.log(storage)

      // return the updated storage to the reduce function, which will then loop through the next 
      return storage;
    }, {}); // [] is the initial value of the storage
  };
  // console.log(Object.values(grouping('orderId')))


  // Get the number of orders placed on each platform
  const orderItems = (arg) => {
    let result = 0
    let requestedOrdersItems = Object.values(grouping('orderId'))
    // console.log(requestedOrdersItems)

    for (let i = 0; i < requestedOrdersItems.length; i++) {
      //this check for only the available or declined request
      let data1 = requestedOrdersItems
        .map((request) => request)[i]
        .filter(order => order.platform === arg)

      // let result = result + data1.length
      if (data1.length > 0) {
        result += 1
      }
    }

    return result
  }
  // console.log(orderItems('vendor'))


  const weeklyAvg = () => {
    let result
    const currentDate = moment();
    const weekStart = currentDate.clone().startOf('week');
    const weekEnd = currentDate.clone().endOf('week');

    let days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, 'days').format("MMMM Do,dddd YYYY"));
    }

    if (status === 'Wholesaler') {
      let items = (
        dateFilterCheck === 'no_data' ? [] :
          platform.length > 0 ? platform : orders.orders.total.rows)
        .filter(y => y.platform === 'wholesaler')
        .filter(x => {
          const check = days.includes(moment(x.createdAt).format("MMMM Do,dddd YYYY"))
          // console.log(moment(x.createdAt).format("MMMM Do,dddd YYYY"))

          return check
        })

      result = items.length / 7
    }

    if (status === 'Marketplace') {
      let items = (
        dateFilterCheck === 'no_data' ? [] :
          platform.length > 0 ? platform : orders.orders.total.rows)
        .filter(y => y.platform === 'vendor')
        .filter(x => {
          const check = days.includes(moment(x.createdAt).format("MMMM Do,dddd YYYY"))
          // console.log(moment(x.createdAt).format("MMMM Do,dddd YYYY"))

          return check
        })

      result = items.length / 7
    }

    if (status === 'Clear' || status === '') {
      let items = (
        dateFilterCheck === 'no_data' ? [] :
          platform.length > 0 ? platform : orders.orders.total.rows)
        .filter(x => {
          const check = days.includes(moment(x.createdAt).format("MMMM Do,dddd YYYY"))
          // console.log(moment(x.createdAt).format("MMMM Do,dddd YYYY"))

          return check
        })

      result = items.length / 7
    }

    return result
  }
  // console.log(weeklyAvg())

  // This function calculate the data for a calender year (e.g 2020)
  // and place the data in the graph (num of orders against month)
  const onYearlyChange = (date) => {
    const year = date

    const newDate = []
    let data = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December']

    if (status === 'Wholesaler') {
      let items = (
        dateFilterCheck === 'no_data' ? [] :
          platform.length > 0 ? platform : orders.orders.total.rows)
        .filter(y => y.platform === 'wholesaler')
        .filter(x => {
          const check = moment(x.createdAt).format('YYYY').toString() === year;
          // console.log(moment(x.createdAt).format('MMMM'))
          return check
        })

      for (let count = 0; count < 12; count++) {
        let item = items.filter(x => moment(x.createdAt).format('MMMM') === data[0]).length
        // console.log(item)

        newDate.push(item)

        // Remove the first element of the array and reassign data to be the new array
        data.shift()
        data = data
        // console.log(data)
      }

      // console.log(newDate)
      setGraphData([...newDate])
      // return newDate
    }

    if (status === 'Marketplace') {
      let items = (
        dateFilterCheck === 'no_data' ? [] :
          platform.length > 0 ? platform : orders.orders.total.rows)
        .filter(y => y.platform === 'vendor')
        .filter(x => {
          const check = moment(x.createdAt).format('YYYY').toString() === year;
          // console.log(moment(x.createdAt).format('MMMM'))
          return check
        })

      for (let count = 0; count < 12; count++) {
        let item = items.filter(x => moment(x.createdAt).format('MMMM') === data[0]).length
        // console.log(item)

        newDate.push(item)

        // Remove the first element of the array and reassign data to be the new array
        data.shift()
        data = data
        // console.log(data)
      }

      // console.log(newDate)
      setGraphData([...newDate])
      // return newDate
    }

    if (status === 'Clear' || status === '') {
      let items = (
        dateFilterCheck === 'no_data' ? [] :
          platform.length > 0 ? platform : orders.orders.total.rows)
        .filter(x => {
          const check = moment(x.createdAt).format('YYYY').toString() === year;
          // console.log(moment(x.createdAt).format('MMMM'))
          return check
        })

      for (let count = 0; count < 12; count++) {
        let item = items.filter(x => moment(x.createdAt).format('MMMM') === data[0]).length
        // console.log(item)

        newDate.push(item)

        // Remove the first element of the array and reassign data to be the new array
        data.shift()
        data = data
        // console.log(data)
      }

      // console.log(newDate)
      setGraphData([...newDate])
      // return newDate
    }

    return newDate
  }

  const handleClickFilterItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  }

  const handleFilterSelect = (name, index) => {
    if (name === 'Wholesaler') {
      const wholesaleOrder = orders.orders.total.rows.filter(order => order.platform === 'wholesaler')

      setSelectedFilterIndex(index);
      setPlatform([...wholesaleOrder])
      setStatus(name)
      setGraphData([])
      setAnchorEl(null);
    }

    if (name === 'Marketplace') {
      const marketPlaceOrder = orders.orders.total.rows.filter(order => order.platform === 'vendor')

      setSelectedFilterIndex(index);
      setPlatform([...marketPlaceOrder])
      setStatus(name)
      setGraphData([])
      setAnchorEl(null);
    }

    if (name === 'Clear') {
      setSelectedFilterIndex(0);
      setPlatform([])
      setStatus(name)
      setGraphData([])
      setAnchorEl(null);
    }
  };

  const dateRangeChange = (start, end) => {
    // const upperBound = moment(start).format('ddd MMM DD YYYY')
    // const lowerBound = moment(end).format('ddd MMM DD YYYY')
    // upperBound.isSame(moment(startDate, "DD/MM/YYYY"))
    // lowerBound.isSame(moment(endDate, "DD/MM/YYYY")))

    const upperBound = moment(moment(start).format("DD/MM/YYYY"), "DD/MM/YYYY")
    const lowerBound = moment(moment(end).format("DD/MM/YYYY"), "DD/MM/YYYY")
    // const thirdDate = moment(moment('24/11/2020', "DD/MM/YYYY"))
    // console.log(upperBound, lowerBound)
    // console.log(thirdDate.isBetween(upperBound, lowerBound, null, '[]'))

    if (upperBound && lowerBound) {
      if (status === 'Wholesaler') {
        const wholesaleOrders = orders.orders.total.rows
          .filter(order => order.platform === 'wholesaler')
          .filter(date => {
            const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
            const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
            return check
          })
        // console.log(wholesaleOrders, status)
        setPlatform([...wholesaleOrders])
        setDateFilterCheck(wholesaleOrders.length > 0 ? '' : 'no_data')
        setGraphData([])
      }

      if (status === 'Marketplace') {
        const marketPlaceOrders = orders.orders.total.rows
          .filter(order => order.platform === 'vendor')
          .filter(date => {
            const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
            const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
            return check
          })
        // console.log(marketPlaceOrders, status)
        setPlatform([...marketPlaceOrders])
        setDateFilterCheck(marketPlaceOrders.length > 0 ? '' : 'no_data')
        setGraphData([])
      }

      if ((upperBound && lowerBound) && (status === 'Clear' || status === '')) {
        const allOrders = orders.orders.total.rows
          .filter(date => {
            const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
            const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
            return check
          })
        // console.log(allOrders, status)
        setPlatform([...allOrders])
        setDateFilterCheck(allOrders.length > 0 ? '' : 'no_data')
        setGraphData([])
      }

      // if ((!upperBound && !lowerBound) && (status === 'Clear' || status === '')) {
      //   setPlatform([])
      //   setGraphData([])
      // }
    } else {
      return
    }
  }

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
    <TableLayout tableNav={tableNav} name="Orders">
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
          <Box className={classes.root}>
            <Box style={{
              display: "flex",
              justifyContent: "space-between",
            }}>
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                handleSelect={handleSelect}
                handleCurrentStatus={handleCurrentStatus}
              />

              <Box style={{
                width: "27%"
              }}>
                <Box className={classes.sortBox}>
                  <Typography
                    className={classes.typography}
                    style={{
                      fontSize: '15px',
                      fontWeight: 'normal',
                      linHeight: '18px',
                      opacity: 0.8,
                      color: "#242120"
                    }}
                  >
                    {filterItems[selectedFilterIndex].name}
                  </Typography>

                  <Box aria-controls="simple-menu"
                    aria-haspopup="true" onClick={handleClickFilterItem}
                  >
                    <img style={{ opacity: 0.5 }} src="/Vector.svg" alt="menu" />
                  </Box>
                </Box>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleFilterClose}
                  PaperProps={{
                    style: {
                      borderRadius: '8px',
                      margin: '31px 0px 0px -20px',
                      boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.08)',
                      backgroundColor: '#FFFFFF',
                      width: '160px',
                      height: '180px',
                      paddingTop: '2%',
                      paddingBottom: '1%',
                      // paddingLeft: '1%',
                    }
                  }}
                >
                  {filterItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      disabled={item.disabled}
                      selected={index === selectedFilterIndex}
                      onClick={() => handleFilterSelect(item.name, index)}
                    >
                      <Typography
                        className={classes.typography}
                        style={{
                          fontWeight: '400',
                          fontSize: '15px',
                          lineHeight: '17.58px',
                          color: '#242120',
                        }}
                      >
                        {item.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>

            <Grid style={{ marginTop: "2.5rem" }} container>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Box className={classes.boxLeft} style={{ marginBottom: "1rem" }}>
                  <Typography
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 500,
                    }}>
                    {Object.values(grouping('requestId')).length}
                  </Typography>

                  <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
                    All Requests
                  </Typography>

                  <Typography
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 500,
                    }}>
                    {Object.values(grouping('orderId')).length}
                  </Typography>

                  <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
                    All Orders
                  </Typography>

                  <Box style={{ marginTop: "0.5rem" }}>
                    <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
                      {status === 'Marketplace' ? '' :
                        `${orderItems('wholesaler')} (Wholesaler)`
                      }
                    </Typography>

                    <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
                      {status === 'Wholesaler' ? '' :
                        `${orderItems('vendor')} (Marketplace)`
                      }
                    </Typography>
                  </Box>

                  <Box style={{ marginTop: "1.5rem" }}>
                    <Typography
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 500,
                      }}>
                      <NumberFormat
                        value={
                          dateFilterCheck === 'no_data' ? 0 :
                            platform.length > 0 ? platform
                              .map(amount => amount.product.price).reduce((a, b) => a = Number(a) + Number(b), 0)
                              : orders.orders.totalAmount
                        }
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'₦'}
                      />
                    </Typography>

                    <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
                      Sales(Amount)
                    </Typography>
                  </Box>

                  <Box style={{ marginTop: "1.5rem", color: "#00A210" }}>
                    <Typography
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 500,
                      }}>
                      {weeklyAvg()}
                    </Typography>

                    <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
                      Wkly Orders (Avg.)
                    </Typography>
                  </Box>

                  <Box style={{ marginTop: "1.5rem" }}>
                    <Typography style={{
                      fontSize: "0.7rem",
                      color: "#6A6A6A",
                      background: "#F4F6F7",
                      padding: "0.3rem 0.5rem",
                      width: "6rem",
                      borderRadius: "4px",
                      marginBottom: "0.3rem"
                    }}>
                      SUCCESS RATE
                    </Typography>

                    <Box style={{ display: "flex" }}>
                      <Box style={{ marginRight: "1rem" }}>
                        <Typography style={{
                          fontSize: "1.5rem",
                          fontWeight: 500,
                          color: "#00A210",
                          display: "flex",
                          alignItems: "flex-start"
                        }}>
                          {
                            dateFilterCheck === 'no_data' ? 0 :
                              platform.length > 0
                                ? Math.round(
                                  (
                                    (platform
                                      .filter(order => order.status === 'perfected' || order.status === 'completed').length) /
                                    (platform
                                      .filter(order => order.status).length)
                                  ) * 100
                                )
                                :
                                Math.round(
                                  (
                                    (orders.orders.total.rows
                                      .filter(order => order.status === 'perfected' || order.status === 'completed').length) /
                                    (orders.orders.total.rows
                                      .filter(order => order.status).length)
                                  ) * 100
                                )
                          }
                          <span style={{ fontSize: "0.9rem", paddingTop: "0.3rem", paddingLeft: "0.2rem" }}>%</span>
                        </Typography>

                        <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
                          Success
                        </Typography>
                      </Box>

                      <Box>
                        <Typography style={{
                          fontSize: "1.5rem",
                          fontWeight: 500,
                          color: "#ED3424",
                          display: "flex",
                          alignItems: "flex-start"
                        }}>
                          {
                            dateFilterCheck === 'no_data' ? 0 :
                              platform.length > 0
                                ? Math.round(
                                  (
                                    (platform
                                      .filter(order => order.status === 'cancelled' || order.status === 'refunded').length) /
                                    (platform
                                      .filter(order => order.status).length)
                                  ) * 100
                                )
                                :
                                Math.round(
                                  (
                                    (orders.orders.total.rows
                                      .filter(order => order.status === 'cancelled' || order.status === 'refunded').length) /
                                    (orders.orders.total.rows
                                      .filter(order => order.status).length)
                                  ) * 100
                                )
                          }
                          <span style={{ fontSize: "0.9rem", paddingTop: "0.3rem", paddingLeft: "0.2rem" }}>%</span>
                        </Typography>

                        <Typography style={{ fontSize: "0.8rem", color: "#6A6A6A" }}>
                          Failed
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item container xs={12} sm={8} md={8} lg={8} xl={8}>
                <Box>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box className={classes.chartBox}>
                      <Chart
                        data={{
                          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                          datasets: [
                            {
                              label: "Orders",
                              borderColor: '#FF5C00',
                              borderWidth: 1,
                              pointBorderColor: '#FF5C00',
                              pointBackgroundColor: '#fff',
                              pointBorderWidth: 2,
                              // data: [25, 8, 30, 35, 40, 43, 40, 56, 78, 90, 12, 22, 34]
                              data: graphData.length > 0 ? graphData : onYearlyChange(moment().format('YYYY'))
                            }
                          ]
                        }}
                        onYearlyChange={(date) => {
                          onYearlyChange(date)
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <Box style={{ marginRight: "1.2rem", }} className={classes.boxRight}>
                        <Typography style={{ fontSize: "1.875rem", fontWeight: 500 }}>
                          {
                            dateFilterCheck === 'no_data' ? 0 :
                              platform.length > 0
                                ? platform.filter(order => order.status === 'perfected' || order.status === 'completed').length
                                : orders.orders.total.rows.filter(order => order.status === 'perfected' || order.status === 'completed').length
                          }
                        </Typography>

                        <Typography className={classes.title}>
                          COMPLETED ORDERS
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <Box className={classes.boxRight}>
                        <Typography style={{ fontSize: "1.875rem", fontWeight: 500 }}>
                          {
                            dateFilterCheck === 'no_data' ? 0 :
                              platform.length > 0
                                ? platform.filter(order => order.status === 'cancelled' || order.status === 'refunded').length
                                : orders.orders.total.rows.filter(order => order.status === 'cancelled' || order.status === 'refunded').length
                          }
                        </Typography>

                        <Typography className={classes.title}>
                          CANCELED ORDERS
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
      }
    </TableLayout>
  )
}