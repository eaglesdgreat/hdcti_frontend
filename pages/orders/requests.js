import React, { useState, Fragment } from 'react'
import TableLayout from '../../Components/Tables'
import Search from '../../Components/Search'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
  Typography,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  TablePagination,
  CircularProgress
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
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




export default function Requested() {
  const classes = useStyles();

  const { orders, isLoading, isError } = ordersData()
  // console.log(orders.orders.total.rows
  //   .filter(ord => (ord.requestId === '909381SC' && ord.status === 'in review'))
  //   .map(stat => stat.status)[0])

  const [showConfirmed, setShowConfirmed] = useState(false);
  const [search, setSearch] = useState('')
  const [displaySearch, setDisplaySearch] = useState([])
  const [selected, setSelected] = useState('')
  const [selectSort, setSelectSort] = useState('')
  const [displayFilter, setDisplayFilter] = useState([])

  // Grouping orders data by request ID
  const grouping = () => {
    // `data` is an array of objects, `key` is the key (or property accessor) to group by
    const data = ((search.length < 1 && displayFilter.length === 0)
      ? orders.orders.total.rows
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )
    const key = 'requestId'

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
  // console.log(Object.values(grouping())
  // .map((request) => request)[2][0])


  const requestedOrders = () => {
    const pendingOrders = []
    let requestedOrdersItems = Object.values(grouping())
    // console.log(requestedOrdersItems)

    for (let i = 0; i < requestedOrdersItems.length; i++) {
      //this check for only the available or declined request
      let data1 = requestedOrdersItems
        .map((request) => request)[i]
        .filter(x => x.status.toLowerCase() === 'available' || x.status.toLowerCase() === 'declined')

      let data2 = requestedOrdersItems
        .map((request) => request)[i]

      if (data1.length !== data2.length) {
        pendingOrders.push(data2[0])
      }
    }

    return pendingOrders
  }
  // console.log(requestedOrders())


  const checkConfirmStatus = () => {
    const confirmRequest = []
    let requestedOrdersItems = Object.values(grouping())
    // console.log(requestedOrdersItems)

    for (let i = 0; i < requestedOrdersItems.length; i++) {
      let data1 = requestedOrdersItems
        .map((request) => request)[i]
        .filter(x => x.status.toLowerCase() === 'available' || x.status.toLowerCase() === 'declined')

      let data2 = requestedOrdersItems
        .map((request) => request)[i]

      // this check if the number of items with the 'requestId' that is same as the arg are all available or declined 
      if (data1.length === data2.length) {
        confirmRequest.push(data1[0])
      }
    }

    return confirmRequest
  }
  // console.log(checkConfirmStatus().length)

  const checkStatus = (...arg) => {
    const [reqId, status] = arg
    // console.log(reqId)

    const data = !(
      ((search.length < 1 && displayFilter.length === 0)
        ? orders.orders.total.rows
        : search.length >= 1 ? displaySearch
          : displayFilter.length > 0 ? displayFilter
            : ''
      )
        .filter(ord => (ord.requestId === reqId && (ord.status.toLowerCase() === 'available' 
            || ord.status.toLowerCase() === 'declined')))
        .map(stat => stat.status)[0]
    )

      ? status

      : ((search.length < 1 && displayFilter.length === 0)
        ? orders.orders.total.rows
        : search.length >= 1 ? displaySearch
          : displayFilter.length > 0 ? displayFilter
            : ''
      )
        .filter(ord => (ord.requestId === reqId && (ord.status.toLowerCase() === 'available' 
          || ord.status.toLowerCase() === 'declined')))
        .map(stat => stat.status)[0]

    return (data.toLowerCase() === 'available' || data.toLowerCase() === 'declined') ? 'In Review' : data
  }

  const handleConfirm = () => {
    setShowConfirmed(!showConfirmed);
  }

  // handler for filtering data
  const handleFilter = (arg) => {
    // const data = [...products.wholesaleProducts.rows, ...products.products.rows]
    if (arg === 'wholesaler') {
      const wholesalerRequest = orders.orders.total.rows.filter(order => order.platform === 'wholesaler')
      setDisplayFilter([...wholesalerRequest])
      grouping()
      // console.log(wholesalerRequest)
    }

    if (arg === 'comfirmed') {
      setShowConfirmed(true)
      // console.log(showConfirmed)
    }

    if (arg === 'vendor') {
      const vendorRequest = orders.orders.total.rows.filter(order => order.platform === 'vendor')
      setDisplayFilter([...vendorRequest])
      grouping()
      // console.log(vendorRequest)
    }

    if (arg === 'clear') {
      setDisplayFilter([])
      setShowConfirmed(false)
    }

    // console.log(displayFilter, arg)
  }

  // handling sorting data
  const onSortClick = (arg) => {
    const data = ((search.length < 1 && displayFilter.length === 0)
      ? orders.orders.total.rows
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )

    // sort date ascending order
    if (arg === 'date_asc') {
      const dateAsc = data.sort((a, b) => new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateAsc)
    }

    // sorting date descending order
    if (arg === 'date_desc') {
      const dateDesc = data.sort((a, b) => new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateDesc)
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

    const data = ((search.length < 1 && displayFilter.length === 0)
      ? orders.orders.total.rows
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )

    let currentList = data.map(request => {
      // console.log({...item})
      return { ...request }
    })

    if (search !== '') {
      let newList = []

      newList = currentList.filter(request => {
        const name = (`${request.customer_details.firstName} ${request.customer_details.lastName} ${request.requestId}`).toLowerCase()
        return name.includes(search.toLowerCase())
      })

      setDisplaySearch(newList)
      setPage(0)
    } else {
      setDisplaySearch(data)
    }
    // console.log(displaySearch)
  }

  return (
    <TableLayout tableNav={tableNav} name="Orders">
      <Search
        showConfirmed={showConfirmed}
        onConfirmed={handleConfirm}
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
          </Box> : orders &&
          <TableContainer style={{ paddingTop: "2rem", paddingBottom: "3rem" }} component={Box}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell align="left">Date & Time</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Phone</StyledTableCell>
                  <StyledTableCell align="left">No. of Products</StyledTableCell>
                  <StyledTableCell align="left">Sub-total</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                </TableRow>
              </TableHead>

              {
                // Object.values(grouping())
                //   .map((request) => request.filter(x => x.status === 'pending' || x.status === 'available' || x.status === 'declined')[0])
                //   .filter(request => request)
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                showConfirmed === false ?
                  requestedOrders()
                    .filter(request => request.status.toLowerCase() === "pending" || request.status.toLowerCase() === 'available' 
                      || request.status.toLowerCase() === 'declined')
                    .map((request, i) => (
                      <TableBody key={i}>
                        <StyledTableRow>
                          <Link
                            href="/orders/requests/[requestId]"
                            as={`/orders/requests/${request.requestId}`}
                          >
                            <StyledTableCell>
                              <Typography>
                                {request.requestId}
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/[requestId]"
                            as={`/orders/requests/${request.requestId}`}
                          >
                            <StyledTableCell
                              style={{
                                color: "#272643",
                              }}>
                              <Box>
                                <Typography style={{ width: "6rem", fontSize: "0.9375rem" }}>
                                  {moment(request.createdAt).format('DD MMM YYYY')}
                                </Typography>
                                <Typography style={{ fontSize: "0.75rem", color: "#868686", }}>
                                  {moment(request.createdAt).format('hh:mm:ss a')}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/[requestId]"
                            as={`/orders/requests/${request.requestId}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{
                                color: "#272643",
                                fontSize: "0.9375rem",
                                width: "10rem",
                              }}>
                                {request.customer_details.firstName} {request.customer_details.lastName}
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/[requestId]"
                            as={`/orders/requests/${request.requestId}`}
                          >
                            <StyledTableCell align="left">
                              {request.customer_details.phone}
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/[requestId]"
                            as={`/orders/requests/${request.requestId}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{
                                color: "#272643",
                                fontSize: "0.9375rem",
                                width: "9rem",
                              }}>
                                {
                                  ((search.length < 1 && displayFilter.length === 0)
                                    ? orders.orders.total.rows
                                    : search.length >= 1 ? displaySearch
                                      : displayFilter.length > 0 ? displayFilter
                                        : ''
                                  )
                                    .filter(ord => ord.requestId === request.requestId).length
                                }
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/[requestId]"
                            as={`/orders/requests/${request.requestId}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{ width: "4rem" }}>
                                <NumberFormat
                                  value={
                                    ((search.length < 1 && displayFilter.length === 0)
                                      ? orders.orders.total.rows
                                      : search.length >= 1 ? displaySearch
                                        : displayFilter.length > 0 ? displayFilter
                                          : ''
                                    )
                                      .filter(ord => ord.requestId === request.requestId)
                                      .map(prod => prod.product.price)
                                      .reduce((a, b) => a = Number(a) + Number(b), 0)
                                  }
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'₦'}
                                />
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/[requestId]"
                            as={`/orders/requests/${request.requestId}`}
                          >
                            <StyledTableCell align="left">
                              <Box
                                display="flex"
                                justifyContent="center"
                                style={{
                                  background: checkStatus(request.requestId, request.status) === 'In Review' ? "#DBEBFF" : "rgba(255, 92, 0, 0.08)",
                                  border: '1px solid rgba(255, 92, 0, 0.08)',
                                  borderRadius: '10px',
                                  // width: '80%',
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
                                    style={{ color: checkStatus(request.requestId, request.status) === "In Review" ? "#2924B6" : "#FF5C00" }}
                                  >
                                    {checkStatus(request.requestId, request.status)}
                                  </Typography>
                                </Button>
                              </Box>
                            </StyledTableCell>
                          </Link>
                        </StyledTableRow>
                      </TableBody>
                    ))
                  : showConfirmed === true ?
                    checkConfirmStatus().map((req, i) => (
                      <TableBody key={i}>
                        <StyledTableRow>
                          <Link
                            href="/orders/requests/confirmed/[confirmed]"
                            as={`/orders/requests/confirmed/${req.requestId}`}
                          >
                            <StyledTableCell>
                              <Typography>
                                {req.requestId}
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/confirmed/[confirmed]"
                            as={`/orders/requests/confirmed/${req.requestId}`}
                          >
                            <StyledTableCell
                              style={{
                                color: "#272643",
                              }}>
                              <Box>
                                <Typography style={{ width: "6rem", fontSize: "0.9375rem" }}>
                                  {moment(req.createdAt).format('DD-MM-YYYY')}
                                </Typography>
                                <Typography style={{ fontSize: "0.75rem", color: "#868686", }}>
                                  {moment(req.createdAt).format('hh:mm:ss a')}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/confirmed/[confirmed]"
                            as={`/orders/requests/confirmed/${req.requestId}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{
                                color: "#272643",
                                fontSize: "0.9375rem",
                                width: "10rem",
                              }}>
                                {req.customer_details.firstName} {req.customer_details.lastName}
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/confirmed/[confirmed]"
                            as={`/orders/requests/confirmed/${req.requestId}`}
                          >
                            <StyledTableCell align="left">
                              {req.customer_details.phone}
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/confirmed/[confirmed]"
                            as={`/orders/requests/confirmed/${req.requestId}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{
                                color: "#272643",
                                fontSize: "0.9375rem",
                                width: "9rem",
                              }}>
                                {
                                  ((search.length < 1 && displayFilter.length === 0)
                                    ? orders.orders.total.rows
                                    : search.length >= 1 ? displaySearch
                                      : displayFilter.length > 0 ? displayFilter
                                        : ''
                                  )
                                    .filter(ord => ord.requestId === req.requestId).length
                                }
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/confirmed/[confirmed]"
                            as={`/orders/requests/confirmed/${req.requestId}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{ width: "4rem" }}>
                                <NumberFormat
                                  value={
                                    ((search.length < 1 && displayFilter.length === 0)
                                      ? orders.orders.total.rows
                                      : search.length >= 1 ? displaySearch
                                        : displayFilter.length > 0 ? displayFilter
                                          : ''
                                    )
                                      .filter(ord => ord.requestId === req.requestId)
                                      .map(prod => prod.product.price)
                                      .reduce((a, b) => a = Number(a) + Number(b), 0)
                                  }
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'₦'}
                                />
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/orders/requests/confirmed/[confirmed]"
                            as={`/orders/requests/confirmed/${req.requestId}`}
                          >
                            <StyledTableCell align="left">
                              <Box
                                display="flex"
                                justifyContent="center"
                                style={{
                                  background: "#F0FAF4",
                                  border: '1px solid rgba(255, 92, 0, 0.08)',
                                  borderRadius: '10px',
                                  // width: '80%',
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
                                    style={{ color: '#299253' }}
                                  >
                                    {'Confirmed'}
                                  </Typography>
                                </Button>
                              </Box>
                            </StyledTableCell>
                          </Link>
                        </StyledTableRow>
                      </TableBody>
                    )) : ''
              }
            </Table>
            {/* <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={
                (search.length < 1 && displayFilter.length === 0)
                  ? orders.orders.total.rows.filter(x => x.status === 'pending' || x.status === 'in review' || x.status === 'confirmed').length
                  : search.length >= 1 ? displaySearch.length
                    : displayFilter.length > 0 ? displayFilter.length
                      : 0
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            /> */}
          </TableContainer>
      }
    </TableLayout>
  )
}