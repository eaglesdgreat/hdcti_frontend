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
  Button,
  Divider,
  TablePagination,
  Typography,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import axios from 'axios';
import useSWR, { mutate } from 'swr'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import moment from 'moment'
import clsx from 'clsx';

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


const filterStatuses = [
  { name: 'Delivered', value: 'delivered' },
  { name: 'In-Process', value: 'in process' },
  { name: 'Faulty/Return', value: 'faulty/return' },
  { name: 'Faulty/Refund', value: 'faulty/refund' },
  { name: 'Completed', value: 'completed' },
  { name: 'Perfected', value: 'perfected' },
]


export default function History() {
  const classes = useStyles();

  const { orders, isLoading, isError } = ordersData()

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(true)
  const [search, setSearch] = useState('')
  const [displaySearch, setDisplaySearch] = useState([])
  const [selected, setSelected] = useState('')
  const [selectSort, setSelectSort] = useState('')
  const [displayFilter, setDisplayFilter] = useState([])
  const [selectStatus, setSelectStatus] = useState({})


  // handler for filtering data
  const handleFilter = (arg) => {
    // const data = [...products.wholesaleProducts.rows, ...products.products.rows]
    if (arg === 'wholesaler') {
      setDisplayFilter(orders.orders.total.rows)
      setPage(0);
    } else if (arg === 'vendor') {
      setDisplayFilter(orders.orders.total.rows)
      setPage(0);
    } else {
      setDisplayFilter([])
    }

    // console.log(displayFilter, arg)
  }

  // handling sorting data
  const onSortClick = (arg) => {
    const data = displayFilter.length > 0 ? displayFilter
      : orders.orders.total.rows

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

    const items = orders.orders.total.rows
      .filter(request => request.paid === 1)
    // JSON.parse(items[0].varieties).map((items, i) => { return console.log(items)})

    let currentList = items.map(item => {
      // console.log({...item})
      return { ...item }
    })

    if (search !== '') {
      let newList = []

      newList = currentList.filter(request => {
        const name = (`${request.customer.firstName} ${request.customer.lastName}`).toLowerCase()
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleCheck = (e) => {
    setChecked(e.target.checked)
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
            <ReactLoading type={'spinningBubbles'} color={"#FF5C00"} height={'50px'} width={'50px'} />
          </Box> : orders &&
          <Box className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {/* <StyledTableCell>Request ID</StyledTableCell>
                    <StyledTableCell align="left">Request Status</StyledTableCell>
                    <StyledTableCell align="left">Date/Time</StyledTableCell>
                    <StyledTableCell align="left">Customer Name</StyledTableCell>
                    <StyledTableCell align="left">Customer Phone No</StyledTableCell>
                    <StyledTableCell align="left">Number of Products Requested</StyledTableCell>
                    <StyledTableCell align="left">Sub-total</StyledTableCell> */}
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="left">Date & Time</StyledTableCell>
                    <StyledTableCell align="left">Cust. Name</StyledTableCell>
                    <StyledTableCell align="left">Cust. Phone</StyledTableCell>
                    <StyledTableCell align="left">No. of Products</StyledTableCell>
                    <StyledTableCell align="left">Sub-total</StyledTableCell>
                    <StyledTableCell align="left">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {((search.length < 1 && displayFilter.length === 0)
                    ? orders.orders.total.rows
                    : search.length >= 1 ? displaySearch
                      : displayFilter.length > 0 ? displayFilter
                        : '')
                    .filter(order => order.status === ('perfected' || 'refunded' || 'cancelled'))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((request, id) => (
                      <Link
                        key={id}
                        href="/orders/history/[historyId]"
                        as={`/orders/history/${request.orderId}`}
                      >
                        <StyledTableRow>
                          <StyledTableCell>
                            <Typography>
                              {request.orderId}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell
                            style={{
                              color: "#272643",
                            }}>
                            <Box>
                              <Typography style={{ width: "6rem", fontSize: "0.9375rem" }}>
                                {moment(request.createdAt).format('DD-MM-YYYY')}
                              </Typography>
                              <Typography style={{ fontSize: "0.75rem", color: "#868686", }}>
                                {moment(request.createdAt).format('hh:mm:ss a')}
                              </Typography>
                            </Box>
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            <Typography style={{
                              color: "#272643",
                              fontSize: "0.9375rem",
                              width: "10rem",
                            }}>
                              {request.customer.firstName} {request.customer.lastName}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            {request.customer.phone}
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            <Typography style={{
                              color: "#272643",
                              fontSize: "0.9375rem",
                              width: "9rem",
                            }}>
                              {
                                orders.orders.total.rows
                                  .filter(ord => ord.orderId === request.orderId
                                    && ord.status === ('perfected' || 'refunded' || 'cancelled')).length
                              }
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            <Typography style={{ width: "4rem" }}>
                              ₦{request.product.price}
                            </Typography>
                          </StyledTableCell>

                          <StyledTableCell align="left">
                            <span style={{
                              background: "rgba(255, 92, 0, 0.08)",
                              color: "#FF5C00",
                              borderRadius: "4px",
                              padding: "0.5rem 0.8rem",
                              fontSize: "0.8rem"
                            }}>
                              {request.status}
                            </span>
                          </StyledTableCell>
                        </StyledTableRow>
                      </Link>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={
                  (search.length < 1 && displayFilter.length === 0)
                    ? orders.orders.total.rows.filter(order => order.status === ('perfected' || 'refunded' || 'cancelled')).length
                    : search.length >= 1 ? displaySearch.length
                      : displayFilter.length > 0 ? displayFilter.length
                        : 0
                }
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Box>
      }
    </TableLayout>
  )
}
