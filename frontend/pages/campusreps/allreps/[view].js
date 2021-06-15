import React, { useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  Grid
} from '@material-ui/core';
import {
  ArrowBackIos,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import TableLayout from '../../../Components/Tables'
import { useRouter } from 'next/router'

// CSS Styles
const useStyles = makeStyles(() => ({
  container: {
    margin: "0 auto",
    padding: "2rem 4rem 6rem 2rem",
  },
  back: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  smallBoxTop: {
    color: "#242120",
    background: "#EAEAEA",
    borderRadius: "2px",
    textAlign: "center",
    marginBottom: "1rem",
    marginRight: "1.8rem",
  },
  avatar: {
    width: "80px",
    borderRadius: "8px"
  }
}))

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

const reps = [
  {
    id: 1,
    firstName: "Ebere",
    lastName: "Nwaiwu",
    email: "nwaiwuebere@gmail.com",
    school: "University of Lagos",
    department: "Electrical & Electonics Engineering",
    schoolAddress: "A314 Jaja Hall, Unilag",
    homeAddress: "CL Private School Premises, GbegiraEstate, Mowe, Ogun State.",
    Level: "400L",
    repLevel: "GOLD",
  },
  {
    id: 2,
    firstName: "Onowomano",
    lastName: "Iluezi-Ogbaudu",
    phone: "0802 441 9462",
    email: "milueziogbaudu@gmail.com",
    school: "University of Lagos",
    department: "Law",
    schoolAddress: "A314 Jaja Hall, Unilag",
    homeAddress: "CL Private School Premises, GbegiraEstate, Mowe, Ogun State.",
    Level: "400L",
    repLevel: "GOLD",
  },
  {
    id: 3,
    firstName: "Yussuf",
    lastName: "Mohammed",
    phone: "0802 441 9462",
    email: "sundayayoade@gmail.com",
    school: "University of Lagos",
    department: "Electrical & Electonics Engineering",
    schoolAddress: "A314 Jaja Hall, Unilag",
    homeAddress: "CL Private School Premises, GbegiraEstate, Mowe, Ogun State.",
    Level: "400L",
    repLevel: "SILVER",
  },
  {
    id: 4,
    firstName: "Toluwani",
    lastName: "Nana",
    phone: "0802 441 9462",
    email: "nwaiwuebere@gmail.com",
    school: "University of Ibadan",
    department: "Pharmacy",
    schoolAddress: "A314 Jaja Hall, Unilag",
    homeAddress: "CL Private School Premises, GbegiraEstate, Mowe, Ogun State.",
    Level: "400L",
    repLevel: "SILVER",
  },
  {
    id: 5,
    firstName: "Sadiq",
    lastName: "Akinola",
    phone: "0802 441 9462",
    email: "nwaiwuebere@gmail.com",
    school: "University of Lagos",
    department: "Adult Education",
    schoolAddress: "A314 Jaja Hall, Unilag",
    homeAddress: "CL Private School Premises, GbegiraEstate, Mowe, Ogun State.",
    Level: "400L",
    repLevel: "PROBATION",
  },
  {
    id: 6,
    firstName: "Emmanuel",
    lastName: "Fayemi",
    phone: "0802 441 9462",
    email: "nwaiwuebere@gmail.com",
    school: "Covenant University",
    department: "Europea Studies",
    schoolAddress: "A314 Jaja Hall, Unilag",
    homeAddress: "CL Private School Premises, GbegiraEstate, Mowe, Ogun State.",
    Level: "400L",
    repLevel: "SILVER",
  },
]

export default function view() {
  const classes = useStyles();
  const router = useRouter()

  return (
    <TableLayout tableNav={tableNav} name="Campus Reps">
      <Box className={classes.container}>
        <span className={classes.back}>
          <Button
            size="large"
            disableRipple
            onClick={() => router.back()}
          >
            <ArrowBackIos style={{ fontSize: "0.8rem", }} />
            <Typography style={{ fontSize: "0.8rem" }}>
              BACK
            </Typography>
          </Button>
        </span>
        <Grid container style={{ marginTop: "1rem" }}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <img className={classes.avatar}
              src="/rep-img.png"
              alt="campus rep" />
            {
              reps.map((rep, index) => (
                <Box key={index} >
                  <Typography>
                    {rep.lastName}
                  </Typography>
                  {
                    rep.repLevel === "GOLD" ?
                      <Typography>
                        {rep.repLevel} Rep ⭐️⭐️⭐️⭐️⭐️
                      </Typography> :
                      rep.repLevel === "SILVER" ?
                        <Typography>
                          {rep.repLevel} Rep ⭐️⭐️⭐️
                        </Typography> :
                        <Typography>
                          {rep.repLevel} Rep ⭐️⭐
                        </Typography>
                  }
                  <Typography>
                    {rep.school}
                  </Typography>
                  <Typography>
                    {rep.email}
                  </Typography>
                  <Typography>
                    {rep.phone}
                  </Typography>
                  <Button>
                    <Typography>
                      SHOW MORE
                    </Typography>
                  </Button>
                </Box>
              ))
            }
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <Typography style={{
              color: "#8A8A8A",
              fontSize: "0.8rem",
              marginBottom: "1.5rem"
            }}>
              REP ACTIVITY
            </Typography>
            <Grid style={{
              border: "1px solid #FAFAFA",
              borderRadius: "4px"
            }} container spacing={4}>
              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Typography
                  component="div"
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 500,
                    padding: 0
                  }}>
                  <Box lineHeight="normal">
                    10
                  </Box>
                </Typography>
                <Typography style={{
                  fontSize: "0.8rem",
                }}>
                  USERS
              </Typography>
              </Grid>
              <Grid
                style={{ paddingTop: "1rem" }}
                item xs={5} sm={5} md={5} lg={5} xl={5}>
                <Box style={{ display: "flex" }}>
                  <img style={{ paddingLeft: "1rem" }} src="/dot.svg" alt="dot" />
                  <Typography style={{
                    fontSize: "0.9rem",
                    marginLeft: "0.5rem"
                  }}>
                    6 Vendors
                  </Typography>
                </Box>
                <Box style={{ display: "flex" }}>
                  <img style={{ paddingLeft: "1rem" }} src="/dot.svg" alt="dot" />
                  <Typography style={{
                    fontSize: "0.9rem",
                    marginLeft: "0.5rem"
                  }}>
                    2 Customers
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item xs={5} sm={5} md={5} lg={5} xl={5}>
                <Box style={{ display: "flex" }}>
                  <img src="/dot.svg" alt="dot" />
                  <Typography style={{
                    fontSize: "0.9rem",
                    marginLeft: "0.5rem"
                  }}>
                    1 Users
                  </Typography>
                </Box>
                <Box style={{ display: "flex" }}>
                  <img src="/dot.svg" alt="dot" />
                  <Typography style={{
                    fontSize: "0.9rem",
                    marginLeft: "0.5rem"
                  }}>
                    1 Campus Rep
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box style={{ marginTop: "2rem" }}>
              <Typography
                component="div"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 500,
                }}>
                <Box lineHeight="normal">
                  15
                </Box>
              </Typography>
              <Typography style={{
                fontSize: "0.8rem",
              }}>
                ORDERS RAISED
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </TableLayout>
  )
}