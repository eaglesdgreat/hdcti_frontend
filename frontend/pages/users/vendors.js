import React, { useState } from 'react'
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
  Grid,
  CircularProgress,
  Button
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
import moment from 'moment'

import { isAuthenticated } from './../../lib/auth.helper'
import PrivateRoute from './../../Components/PrivateRoute'
import TableLayout from '../../Components/Tables'
import Search from '../../Components/Search'



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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  userTypeWrapper: {
    padding: "1rem 0 1rem 1.5rem",
    borderRadius: "8px",
    border: "1px solid #F1F1F1",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)"
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



export default function Vendors() {
  const classes = useStyles();

  // initializing data
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [search, setSearch] = useState('')
  const [displaySearch, setdisplaySearch] = useState([])
  const [displayFilter, setDisplayFilter] = useState([])
  const [selected, setSelected] = useState('')
  const [selectSort, setSelectSort] = useState('')

  // Fetching data from backend with SWR
  const { users, isLoading, isError } = userData()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // handler for filtering data
  const handleFilter = (arg) => {
    // const data = [...products.wholesaleProducts.rows, ...products.products.rows]
    if (arg === 'wholesaler') {
      const items = users.vendor.filter(user => user.platform === 'wholesaler')
      // console.log(items)
      setDisplayFilter([...items])
      setPage(0)
    } else if (arg === 'vendor') {
      const items = users.vendor.filter(user => user.platform === 'vendor')
      setDisplayFilter([...items])
      setPage(0)
    } else {
      setDisplayFilter([])
    }

    // console.log(displayFilter, arg)
  }

  // handling sorting data
  const onSortClick = (arg) => {
    const data = ((search.length < 1 && displayFilter.length === 0)
      ? users.vendor
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )

    // sort date ascending order
    if (arg === 'date_asc') {
      const dateAsc = data.sort((a, b) => new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateAsc)
      setPage(0)
    }

    // sorting date descending order
    if (arg === 'date_desc') {
      const dateDesc = data.sort((a, b) => new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateDesc)
      setPage(0)
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
      ? users.vendor
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )
    // console.log(items)

    let currentList = data.map(user => {
      // console.log({...item})
      return { ...user }
    })

    if (search !== '') {
      let newList = []

      newList = currentList.filter(user => {
        const name = (`${user.firstName} ${user.lastName} ${user.email}`).toLowerCase()
        return name.includes(search.toLowerCase())
      })

      setdisplaySearch(newList)
      setPage(0)
    } else {
      setdisplaySearch(data)
    }
    // console.log(displaySearch)
  }

  return (
    <TableLayout tableNav={tableNav} name="Users">
      <Grid container spacing={2}>
        <Grid style={{ margin: "2rem 0 2rem 2rem" }}
          item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Box className={classes.userTypeWrapper}>
            <Typography style={{ fontSize: "2.5rem", fontWeight: 500 }}>
              {
                isLoading ? <CircularProgress style={{ 'color': '#FF5C00' }} />
                  : users.vendor && users.vendor
                    .filter(vendor => {
                      const check = vendor.userTypes.split(',')
                      return check.includes('wholesaler') || check.includes('vendor')
                    }).length
              }
            </Typography>

            <Typography style={{ color: "#6A6A6A", }}>
              Total Vendors
            </Typography>
          </Box>
        </Grid>

        <Grid style={{ margin: "2rem 0 2rem 0" }}
          item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Box className={classes.userTypeWrapper}>
            <Typography style={{ fontSize: "2.5rem", fontWeight: 500 }}>
              {
                isLoading ? <CircularProgress style={{ 'color': '#FF5C00' }} />
                  : users.vendor && users.vendor
                    .filter(vendor => {
                      const check = vendor.userTypes.split(',')
                      return check.includes('wholesaler')
                    }).length
              }
            </Typography>

            <Typography style={{ color: "#6A6A6A", }}>
              Wholesale Vendors
            </Typography>
          </Box>
        </Grid>

        <Grid style={{ margin: "2rem 0 2rem 0" }}
          item xs={12} sm={3} md={3} lg={3} xl={3}>
          <Box className={classes.userTypeWrapper}>
            <Typography style={{ fontSize: "2.5rem", fontWeight: 500 }}>
              {
                isLoading ? <CircularProgress style={{ 'color': '#FF5C00' }} />
                  : users.vendor && users.vendor
                    .filter(vendor => {
                      const check = vendor.userTypes.split(',')
                      return check.includes('vendor')
                    }).length
              }
            </Typography>

            <Typography style={{ color: "#6A6A6A", }}>
              Marketplace Vendors
            </Typography>
          </Box>
        </Grid>
      </Grid>

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
            </Box> : users.vendor &&
            <Box className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="left">Address</StyledTableCell>
                      <StyledTableCell align="left">Phone</StyledTableCell>
                      <StyledTableCell align="left">Platform</StyledTableCell>
                      <StyledTableCell align="left">Signup Date</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      ((search.length < 1 && displayFilter.length === 0)
                        ? users.vendor
                        : search.length >= 1 ? displaySearch
                          : displayFilter.length > 0 ? displayFilter
                            : ''
                      )
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((vendor, i) => (
                          <StyledTableRow key={i}>
                            <Link href="/users/vendor/[view]"
                              as={`/users/vendor/${vendor.id}`}>
                              <StyledTableCell
                                style={{ width: "15rem", color: "#272643", fontSize: "0.9375rem" }}
                                align="left">
                                {vendor.firstName} {vendor.lastName}
                                <Box style={{ width: "12rem", display: "flex", flexDirection: "column" }}>
                                  <Typography style={{
                                    color: "#868686",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                  }}>
                                    {vendor.email}
                                  </Typography>
                                </Box>
                              </StyledTableCell>
                            </Link>

                            <Link href="/users/vendor/[view]"
                              as={`/users/vendor/${vendor.id}`}>
                              <StyledTableCell
                                style={{ width: "18rem", color: "#272643", fontSize: "0.9375rem" }}
                                align="left">
                                {vendor.address}
                                <Typography style={{
                                  color: "#242120",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}>
                                  {vendor.city}, {vendor.state}
                                </Typography>
                              </StyledTableCell>
                            </Link>

                            <Link href="/users/vendor/[view]"
                              as={`/users/vendor/${vendor.id}`}>
                              <StyledTableCell
                                style={{ width: "10rem", color: "#272643", fontSize: "0.9375rem" }}
                                align="left">
                                {vendor.phone}
                              </StyledTableCell>
                            </Link>

                            <Link
                              href="/users/vendor/editvendor/[edit]"
                              as={`/users/vendor/editvendor/${vendor.id}`}
                            >
                              <StyledTableCell align="left"
                                style={{ width: "10rem", color: "#272643", fontSize: "0.9375rem" }}
                              >
                                <Box
                                  display="flex"
                                  justifyContent="center"
                                  style={{
                                    background: vendor.platform === 'wholesaler' ? "#DBEBFF" : "#F0FAF4",
                                    border: '1px solid rgba(255, 92, 0, 0.08)',
                                    borderRadius: '10px',
                                    width: '50%',
                                    // margin: 'auto',
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
                                      style={{
                                        textTransform: 'uppercase',
                                        fontSize: "8px",
                                        color: vendor.platform === 'wholesaler' ? "#2924B6" : "#299253"
                                      }}
                                    >
                                      {vendor.platform === 'wholesaler' ? 'wholesaler' : 'marketplace'}
                                    </Typography>
                                  </Button>
                                </Box>
                              </StyledTableCell>
                            </Link>

                            <Link href="/users/vendor/[view]"
                              as={`/users/vendor/${vendor.id}`}>
                              <StyledTableCell
                                style={{ width: "10rem", color: "#272643", fontSize: "0.9375rem" }}
                                align="left">
                                <Typography style={{
                                  color: "#868686",
                                  fontSize: "13px",
                                }}>
                                  {moment(vendor.createdAt).format('DD MMM YYYY')}
                                </Typography>
                              </StyledTableCell>
                            </Link>
                          </StyledTableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 20, 30, 40]}
                component="div"
                count={((search.length < 1 && displayFilter.length === 0)
                  ? users.vendor
                  : search.length >= 1 ? displaySearch
                    : displayFilter.length > 0 ? displayFilter
                      : ''
                ).length}
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