import React, { useState } from 'react'
import TableLayout from '../../Components/Tables'
import Search from '../../Components/Search'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
  TablePagination,
  Typography,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Badge,
  CircularProgress
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import axios from 'axios';
import useSWR, { mutate } from 'swr'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import moment from 'moment'
import clsx from 'clsx';
import NumberFormat from 'react-number-format'

import { isAuthenticated } from './../../lib/auth.helper'
import PrivateRoute from './../../Components/PrivateRoute'

// CSS Styles
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
    '&:hover': {
      backgroundColor: "#F9F9FB",
    },
    cursor: "pointer"
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },

  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },

  typography: {
    fontSize: "0.8rem",
    lineHeight: '15px',
    fontWeight: 'normal',
    fontfamily: 'Roboto',
    fontStyle: 'normal',
  }
});


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

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}


const ordersData = () => {
  const url = `${process.env.BACKEND_URL}/api/all-payed-orders`
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error
  }
}



export default function Active() {
  const classes = useStyles();

  const { orders, isLoading, isError } = ordersData()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [checked, setChecked] = useState(true)
  const [search, setSearch] = useState('')
  const [displaySearch, setDisplaySearch] = useState([])
  const [selected, setSelected] = useState('')
  const [selectSort, setSelectSort] = useState('')
  const [displayFilter, setDisplayFilter] = useState([])
  const [selectStatus, setSelectStatus] = useState({})


  const activeOrders = () => {
    const activeLists = []
    let activeOrdersItems = orders.map(order => order.ordrpayment)
    // console.log(activeOrdersItems[0])

    for (let i = 0; i < activeOrdersItems.length; i++) {
      let data1 = activeOrdersItems
        .map((active) => active)[i]
        .filter(x => (x.status.toLowerCase() === 'available' && x.paid === 1 && x.orderId !== null)
          || (x.status.toLowerCase() === 'delivered' && x.paid === 1 && x.orderId !== null))

      // let data2 = activeOrdersItems
      //   .map((active) => active)[i]

      // this check if the number of items with the 'requestId' that is same as the arg are all available or declined 
      if (data1.length > 0) {
        // console.log(data1)
        activeLists.push(data1[0])
      }
    }

    return activeLists
  }
  // console.log(activeOrders())


  const checkStatus = (...arg) => {
    const [ordId, status] = arg
    // console.log(reqId)

    const data = !(
      ((search.length < 1 && displayFilter.length === 0)
        ? activeOrders()
        : search.length >= 1 ? displaySearch
          : displayFilter.length > 0 ? displayFilter
            : ''
      )
        .filter(ord => ord.status.toLowerCase() === 'available' && ord.paid === 1 && ord.orderId === ordId)
        .map(stat => stat.status)[0]
    )

      ? status

      : ((search.length < 1 && displayFilter.length === 0)
        ? activeOrders()
        : search.length >= 1 ? displaySearch
          : displayFilter.length > 0 ? displayFilter
            : ''
      )
        .filter(ord => ord.status.toLowerCase() === 'available' && ord.paid === 1 && ord.orderId === ordId)
        .map(stat => stat.status)[0]

    return data.toLowerCase() === 'available' ? 'Processing' : data
  }


  // handler for filtering data
  const handleFilter = (arg) => {
    // const data = [...products.wholesaleProducts.rows, ...products.products.rows]
    if (arg === 'wholesaler') {
      const wholesalerRequest = orders.filter(order => order.platform === 'wholesaler')
      setDisplayFilter([...wholesalerRequest])
      grouping()
      // console.log(wholesalerRequest)
    }

    if (arg === 'vendor') {
      const vendorRequest = orders.filter(order => order.platform === 'vendor')
      setDisplayFilter([...vendorRequest])
      grouping()
      // console.log(vendorRequest)
    }

    if (arg === 'clear' || arg === 'comfirmed') {
      setDisplayFilter([])
      setShowavialable(false)
    }

    // console.log(displayFilter, arg)
  }

  // handling sorting data
  const onSortClick = (arg) => {
    const data = ((search.length < 1 && displayFilter.length === 0)
      ? activeOrders()
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )

    // sort date ascending order
    if (arg === 'date_asc') {
      const dateAsc = data.sort((a, b) => new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateAsc)
      setPage(0);
    }

    // sorting date descending order
    if (arg === 'date_desc') {
      const dateDesc = data.sort((a, b) => new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateDesc)
      setPage(0);
    }

    if (arg !== 'date_asc' && arg !== 'date_desc') {
      setDisplayFilter([])
    }
  }

  // seacrh handler and display
  const onSearchChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    setSearch(value)

    const items = ((search.length < 1 && displayFilter.length === 0)
      ? activeOrders()
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )
      .filter(x => (x.status === 'available' && x.paid === 1) || (x.status === 'delivered' && x.paid === 1))
    // JSON.parse(items[0].varieties).map((items, i) => { return console.log(items)})

    let currentList = items.map(item => {
      // console.log({...item})
      return { ...item }
    })

    if (search !== '') {
      let newList = []

      newList = currentList.filter(request => {
        const name = (`${request.customer.firstName} ${request.customer.lastName} ${request.orderId}`).toLowerCase()
        return name.includes(search.toLowerCase())
      })

      setDisplaySearch(newList)
      setPage(0);
    } else {
      setDisplaySearch(items)
      setPage(0);
    }
    // console.log(displaySearch)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableLayout tableNav={tableNav} name="Orders">
      <Search
        search={search}
        selected={selected}
        selectSort={selectSort}
        onSearchChange={onSearchChange}
        onSelected={(arg) => {
          setSelected(arg)
          handleFilter(arg)
        }}
        onSortClick={(arg) => {
          setSelectSort(arg)
          onSortClick(arg)
        }}
      />

      <Divider style={{ background: "#EAEAEA" }} />

      <Box className={classes.root}>
        {isError ? (<PrivateRoute isError={isError} />) :
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
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Order No</StyledTableCell>
                    <StyledTableCell align="left">Date & Time</StyledTableCell>
                    <StyledTableCell align="left">Customer Info</StyledTableCell>
                    <StyledTableCell align="left">Products Ordered</StyledTableCell>
                    <StyledTableCell align="left">Sub-total</StyledTableCell>
                    <StyledTableCell align="left">Delivery Mode</StyledTableCell>
                    <StyledTableCell align="left">Estimated Weight</StyledTableCell>
                    <StyledTableCell align="left">Platform</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                {activeOrders()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, i) => (
                    <TableBody key={i}>
                      <StyledTableRow>
                        <Link
                          href="/orders/active/[activeId]"
                          as={`/orders/active/${order.orderId}`}
                        >
                          <StyledTableCell
                            style={{
                              color: "#272643",
                              fontSize: "0.9375rem",
                            }}
                            align="left"
                          >
                            <Typography style={{ width: "4rem" }}>
                              {order.orderId}
                            </Typography>
                          </StyledTableCell>
                        </Link>

                        <Link
                          href="/orders/active/[activeId]"
                          as={`/orders/active/${order.orderId}`}
                        >
                          <StyledTableCell
                            style={{ color: "#272643", fontSize: "0.9375rem" }}
                            align="left"
                          >
                            <Box>
                              <Typography style={{ width: "6rem", fontSize: "0.9375rem" }}>
                                {moment(order.createdAt).format('DD-MM-YYYY')}
                              </Typography>
                              <Typography style={{ fontSize: "0.75rem", color: "#868686", }}>
                                {moment(order.createdAt).format('hh:mm:ss a')}
                              </Typography>
                            </Box>
                          </StyledTableCell>
                        </Link>

                        <Link
                          href="/orders/active/[activeId]"
                          as={`/orders/active/${order.orderId}`}
                        >
                          <StyledTableCell align="left">
                            <Box style={{ width: "10rem" }}>
                              <Typography style={{
                                color: "#272643",
                              }}>
                                {orders.filter(ord => ord.orderId === order.orderId)[0].User.firstName
                                } {orders.filter(ord => ord.orderId === order.orderId)[0].User.lastName}
                              </Typography>
                              <Typography style={{ color: "#868686", fontSize: "0.9rem" }}>
                                {orders.filter(ord => ord.orderId === order.orderId)[0].User.address}
                              </Typography>
                              <Typography style={{ color: "#868686", fontSize: "0.8rem" }}>
                                {orders.filter(ord => ord.orderId === order.orderId)[0].User.phone}
                              </Typography>
                            </Box>
                          </StyledTableCell>
                        </Link>

                        <Link
                          href="/orders/active/[activeId]"
                          as={`/orders/active/${order.orderId}`}
                        >
                          <StyledTableCell
                            style={{ color: "#272643", fontSize: "0.9375rem" }}
                            align="left"
                          >
                            {
                              orders
                                .filter(ord => ord.orderId === order.orderId)
                                .map(ord => ord.ordrpayment.filter(x =>
                                  (x.status.toLowerCase() === 'available' && x.paid === 1) 
                                  || (x.status.toLowerCase() === 'delivered' && x.paid === 1)).length)[0]
                            }
                          </StyledTableCell>
                        </Link>

                        <Link
                          href="/orders/active/[activeId]"
                          as={`/orders/active/${order.orderId}`}
                        >
                          <StyledTableCell
                            style={{ color: "#272643", fontSize: "0.9375rem" }}
                            align="left">
                            <NumberFormat
                              value={
                                orders
                                  .filter(ord => ord.orderId === order.orderId)
                                  .map(amount => amount.subtotal)[0]
                              }
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'₦'}
                            />
                          </StyledTableCell>
                        </Link>

                        <Link
                          href="/orders/active/[activeId]"
                          as={`/orders/active/${order.orderId}`}
                        >
                          <StyledTableCell
                            align="left">
                            <Typography style={{
                              color: "#272643",
                              fontSize: "0.9375rem",
                              width: "7rem"
                            }}>
                              {
                                orders
                                  .filter(ord => ord.orderId === order.orderId)
                                  .map(ord => ord.terminalAddr)[0]
                              }
                            </Typography>
                          </StyledTableCell>
                        </Link>

                        <Link
                          href="/orders/active/[activeId]"
                          as={`/orders/active/${order.orderId}`}
                        >
                          <StyledTableCell
                            style={{ color: "#272643", fontSize: "0.9375rem" }}
                            align="left">
                            <Typography
                              style={{
                                color: "#272643",
                                fontSize: "0.9375rem",
                                width: "5rem"
                              }}
                            >
                              {order.weight}kg
                            </Typography>
                          </StyledTableCell>
                        </Link>

                        <Link
                          href="/orders/active/[activeId]"
                          as={`/orders/active/${order.orderId}`}
                        >
                          <StyledTableCell
                            component="th"
                            scope="row">
                            {
                              order.platform === "vendor" ?
                                <span style={{
                                  width: "92px",
                                  padding: "0.2rem 0.4rem",
                                  color: "#2924B6",
                                  backgroundColor: "#DBEBFF",
                                  fontSize: "11px",
                                  borderRadius: "4px",
                                }}>
                                  {order.platform}
                                </span> :
                                <span style={{
                                  width: "78px",
                                  padding: "0.2rem 0.4rem",
                                  color: "#24B65E",
                                  backgroundColor: "#EAF8EF",
                                  fontSize: "11px",
                                  borderRadius: "4px",
                                }}>
                                  {order.platform}
                                </span>
                            }
                          </StyledTableCell>
                        </Link>

                        <StyledTableCell align="left">
                          <Box
                            display="flex"
                            justifyContent="center"
                            style={{
                              background: "rgba(255, 92, 0, 0.08)",
                              border: '1px solid rgba(255, 92, 0, 0.08)',
                              borderRadius: '10px',
                              width: '100%',
                              margin: 'auto',
                            }}
                          >
                            <Button
                              className={classes.button}
                              disabled
                              disableRipple
                              variant="text"
                              size="small"
                            >
                              <Typography
                                className={classes.typography}
                                style={{ color: "#FF5C00" }}
                              >
                                {checkStatus(order.orderId, order.status)}
                              </Typography>
                            </Button>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  ))
                }
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={
                  (search.length < 1 && displayFilter.length === 0)
                    ? activeOrders().length
                    : search.length >= 1 ? displaySearch.filter(order => order.paid === 1
                      && (ord.status === 'available' || ord.status === 'delivered')).length
                      : displayFilter.length > 0 ? displayFilter.filter(order => order.paid === 1
                        && (ord.status === 'available' || ord.status === 'delivered')).length
                        : 0
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
        }
      </Box>
    </TableLayout>
  )
}
