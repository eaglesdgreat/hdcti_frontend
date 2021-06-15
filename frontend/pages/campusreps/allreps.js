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
  Button,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'

import { isAuthenticated } from '../../lib/auth.helper'
import PrivateRoute from '../../Components/PrivateRoute'
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
    cursor: "pointer",
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
    link: '/campusreps/stats',
  },
  {
    active: true,
    label: 'all reps',
    link: '/campusreps/allreps',
  },
  {
    active: false,
    label: 'req request',
    link: '/campusreps/reqrequest',
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
  // const url = 'http://localhost:8000/api/all-users'
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    users: data,
    isLoading: !error && !data,
    isError: error
  }
}



export default function User() {
  const classes = useStyles();

  // initializing state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('')
  const [displaySearch, setdisplaySearch] = useState([])

  // Fetching data from backend with SWR
  const { users, isLoading, isError } = userData()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onSearchChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    setSearch(value)

    const data = users.users.rows
    // console.log(items)

    let currentList = data.map(user => {
      // console.log({...item})
      return { ...user }
    })

    if (search !== '') {
      let newList = []

      newList = currentList.filter(user => {
        const name = (`${user.firstName} ${user.lastName}`).toLowerCase()
        return name.includes(search.toLowerCase())
      })

      setdisplaySearch(newList)
    } else {
      setdisplaySearch(data)
    }
    // console.log(displaySearch)
  }

  const reps = [
    {
      id: 1,
      firstName: "Ebere",
      lastName: "Nwaiwu",
      email: "nwaiwuebere@gmail.com",
      school: "University of Lagos",
      department: "Electrical & Electonics Engineering",
      repLevel: "GOLD",
    },
    {
      id: 2,
      firstName: "Onowomano",
      lastName: "Iluezi-Ogbaudu",
      email: "milueziogbaudu@gmail.com",
      school: "University of Lagos",
      department: "Law",
      repLevel: "GOLD",
    },
    {
      id: 3,
      firstName: "Yussuf",
      lastName: "Mohammed",
      email: "sundayayoade@gmail.com",
      school: "University of Lagos",
      department: "Electrical & Electonics Engineering",
      repLevel: "SILVER",
    },
    {
      id: 4,
      firstName: "Toluwani",
      lastName: "Nana",
      email: "nwaiwuebere@gmail.com",
      school: "University of Ibadan",
      department: "Pharmacy",
      repLevel: "SILVER",
    },
    {
      id: 5,
      firstName: "Sadiq",
      lastName: "Akinola",
      email: "nwaiwuebere@gmail.com",
      school: "University of Lagos",
      department: "Adult Education",
      repLevel: "PROBATION",
    },
    {
      id: 6,
      firstName: "Emmanuel",
      lastName: "Fayemi",
      email: "nwaiwuebere@gmail.com",
      school: "Covenant University",
      department: "Europea Studies",
      repLevel: "SILVER",
    },
  ]


  return (
    <TableLayout tableNav={tableNav} name="Campus Reps">
      <Search />

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
              <ReactLoading type={'spinningBubbles'} color={"#FF5C00"} height={'20%'} width={'10%'} />
            </Box> :
            <Box className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Name</StyledTableCell>
                      <StyledTableCell align="left">Address</StyledTableCell>
                      <StyledTableCell align="left">Rep Level</StyledTableCell>
                      <StyledTableCell align="left">Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reps.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((rep, i) => (
                        <StyledTableRow key={i}>
                          <Link
                            href="/campusreps/allreps/[view]"
                            as={`/campusreps/allreps/${rep.id}`}
                          >
                            <StyledTableCell
                              style={{ width: "15rem", color: "#272643", fontSize: "0.9375rem" }}
                              align="left">
                              {rep.firstName} {rep.lastName}
                              <Box style={{ width: "12rem", display: "flex", flexDirection: "column" }}>
                                <Typography style={{
                                  color: "#868686",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                }}>
                                  {rep.email}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/campusreps/allreps/[view]"
                            as={`/campusreps/allreps/${rep.id}`}
                          >
                            <StyledTableCell
                              style={{ width: "18rem", color: "#272643", fontSize: "0.9375rem" }}
                              align="left">
                              {rep.school}
                              <Typography style={{
                                color: "#242120",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}>
                                {rep.department}
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href="/campusreps/allreps/[view]"
                            as={`/campusreps/allreps/${rep.id}`}
                          >
                            <StyledTableCell
                              style={{ width: "10rem", color: "#272643", fontSize: "0.9375rem" }}
                              align="left">
                              {rep.repLevel}
                            </StyledTableCell>
                          </Link>

                          <StyledTableCell align="left">
                            <Link
                              href="/campusreps/allreps/[view]"
                              as={`/campusreps/allreps/${rep.id}`}
                            >
                              <Box style={{ display: "flex" }}>
                                <Button style={{
                                  fontSize: "11px",
                                  background: "#FAFAFA",
                                  padding: "0.2rem 0.5rem",
                                  borderRadius: "4px",
                                  color: "#BBBBBB",
                                }}>
                                  EDIT
                                    </Button>
                              </Box>
                            </Link>
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
                count={(search.length < 1 ? users.users.rows : displaySearch).length}
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
