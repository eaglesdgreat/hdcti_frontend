import React, { useState, Fragment } from 'react'
import TableLayout from './../../../../Components/Tables'
import Search from './../../../../Components/Search'
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
import {
  ArrowBackIos,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import axios from 'axios';
import useSWR, { mutate } from 'swr'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import moment from 'moment'
import clsx from 'clsx';
import NumberFormat from 'react-number-format'

import { isAuthenticated } from './../../../../lib/auth.helper'
import PrivateRoute from './../../../../Components/PrivateRoute'



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
  const router = useRouter()
  const { view } = router.query

  const { orders, isLoading, isError } = ordersData()
  // console.log(orders.orders.total.rows
  //   .filter(ord => (ord.requestId === '909381SC' && ord.status === 'in review'))
  //   .map(stat => stat.status)[0])

  const [search, setSearch] = useState('')
  const [displaySearch, setDisplaySearch] = useState([])
  const [selected, setSelected] = useState('')
  const [selectSort, setSelectSort] = useState('')
  const [displayFilter, setDisplayFilter] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Grouping orders data by request ID
  const grouping = () => {
    // `data` is an array of objects, `key` is the key (or property accessor) to group by
    const data = ((search.length < 1 && displayFilter.length === 0)
      ? orders.orders.total.rows.filter(ord => ord.orderId !== null)
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )
    const key = 'orderId'

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


  const realOrders = () => {
    const orderHistory = []
    let requestedOrdersItems = Object.values(grouping())
    // console.log(requestedOrdersItems)

    for (let i = 0; i < requestedOrdersItems.length; i++) {
      let data1 = requestedOrdersItems
        .map((request) => request)[i]
        .filter(x => x.sellerId === Number(view))

      if (data1.length > 0) {
        orderHistory.push(data1[0])
      }
    }

    return orderHistory
  }
  // console.log(realOrders())

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
    <TableLayout tableNav={tableNav} name="Users">
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
          <Box style={{ padding: "1.5rem 1rem 3rem 2.5rem" }}
            className={classes.boxDisplay}
          >
            <span className={classes.back}>
              <Button
                size="large"
                className={classes.buttonHover}
                disableRipple
                onClick={() => router.back()}
              >
                <ArrowBackIos style={{ fontSize: "0.9rem", }} />
                <Typography style={{ fontSize: "0.9rem", }}>
                  BACK
                </Typography>
              </Button>
            </span>

            <Typography style={{
              fontWeight: 600,
              marginBottom: "0.8rem"
            }}>
              Orders History
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">ID</StyledTableCell>
                    <StyledTableCell align="left">Date & Time</StyledTableCell>
                    <StyledTableCell align="left">Customer Name</StyledTableCell>
                    <StyledTableCell align="left">Sub-total</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    realOrders()
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((order, i) => (
                        <StyledTableRow key={i}>
                          <StyledTableCell style={{ width: "5rem" }} align="left">
                            <Typography className={classes.tableInfo}>
                              {order.order_history ? order.order_history.orderId : ''}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ minwidth: "9rem" }} align="left">
                            <Typography className={classes.tableInfo}>
                              {order.order_history ? moment(order.order_history.createdAt).format('MMM DD, YYYY') : ''},
                            {order.order_history ? moment(order.order_history.createdAt).format('hh:mm a') : ''}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ minwidth: "10rem" }}
                            align="left">
                            <Typography className={classes.tableInfo}>
                              {order.customer_details.firstName} {order.customer_details.lastName}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ minwidth: "10rem" }}
                            align="left">
                            <Typography className={classes.tableInfo}>
                              <NumberFormat
                                value={order.order_history ? order.order_history.subtotal : ''}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'₦'}
                              />
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell
                            style={{ minwidth: "10rem" }} align="left">
                            <Typography style={
                              order.status === "cancelled" ?
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
              rowsPerPageOptions={[10, 15, 20]}
              component="div"
              count={realOrders().length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box>
      }
    </TableLayout>
  )
}