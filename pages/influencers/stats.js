import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Zoom,
} from '@material-ui/core'
import DatePicker from '../../Components/DatePicker'
import axios from 'axios';
import useSWR from 'swr'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import moment from 'moment'

import { isAuthenticated } from './../../lib/auth.helper'
import PrivateRoute from './../../Components/PrivateRoute'
import TableLayout from '../../Components/Tables'
import Chart from '../../Components/LineChart.jsx'

// CSS Styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: " 0 2rem 4rem 1.3rem",
  },
  title: {
    color: "#6A6A6A",
    fontSize: "0.9375rem"
  },
  boxTop: {
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    padding: "1rem 2.5rem 3rem  2.5rem",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  topInfo: {
    fontSize: "2rem",
    fontWeight: 500,
  },
  boxBottom: {
    padding: "1.5rem 1rem 1rem 1rem",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
    // height: "100%",
    // width: "100%",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  toolTipWidth: {
    maxWidth: 180,
  },
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
    active: true,
    label: 'stats',
    link: '/influencers/stats',
  },
  {
    active: false,
    label: 'all',
    link: '/influencers/all',
  },
];

const fetcher = async (...arg) => {
  const [url, token] = arg
  // console.log(url, token)

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}

const influencerData = () => {
  const url = `${process.env.BACKEND_URL}/api/all-influencers`
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    influencers: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default function Stats() {
  const classes = useStyles();

  // fetching data from API
  const { influencers, isLoading, isError } = influencerData()

  // date Picker props
  var date = new Date(), year = date.getFullYear(), month = date.getMonth();

  const [startDate, setStartDate] = useState(new Date(year, month, 1))
  const [endDate, setEndDate] = useState(new Date())
  const [allInfluencers, setAllInfluencers] = useState([])

  const data = allInfluencers.length > 0 ? allInfluencers : influencers
  // console.log(data);

  const orders = () => {
    if (data) {

      const ordersTotal = data.map(influencer => influencer.OrderPayments.length)
        .reduce((a, b) => a = Number(a) + Number(b), 0)

      return ordersTotal;
    }

  }

  const revenueTotal = () => {
    if (data) {
      const revenue = data.map(influencer => influencer.customer_earnings
        .map(y => y.paid_to_earn.amount).reduce((a, b) => a = Number(a) + Number(b), 0));

      return revenue.reduce((a, b) => a = Number(a) + Number(b), 0);
    }
  }

  const earningsTotal = () => {

    if (data) {

      const influencerEarnings = data.map(influencer => influencer.customer_earnings
        .map(y => y.amount).reduce((a, b) => a = Number(a) + Number(b), 0));

      return influencerEarnings.reduce((a, b) => a = Number(a) + Number(b), 0);

    }
  }

  const dateRangeChange = (start, end) => {

    const upperBound = moment(moment(start).format("DD/MM/YYYY"), "DD/MM/YYYY")
    const lowerBound = moment(moment(end).format("DD/MM/YYYY"), "DD/MM/YYYY")

    if (upperBound && lowerBound) {
      const influencersData = influencers.filter(date => {
        const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
        const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
        return check
      })
      setAllInfluencers([...influencersData])
    } else {
      return;
    }

  }

  // console.log(allInfluencers);

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

  // Leaderboard
  const leaderboard = () => {
    if (data) {
      const leaderboardData = data.sort((a, b) => (
        (a.customer_earnings.map(y => y.amount)
          .reduce((a, b) => a = Number(a) + Number(b), 0) >
          b.customer_earnings.map(y => y.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0))) ? -1 :
        ((b.customer_earnings.map(y => y.amount).
          reduce((a, b) => a = Number(a) + Number(b), 0) >
          a.customer_earnings.map(y => y.amount)
            .reduce((a, b) => a = Number(a) + Number(b), 0) ? 1 : 0))
      );
      return leaderboardData.slice(0, 2);
    }
  }


  return (
    <TableLayout tableNav={tableNav} name="Influencers" currentPath="/influencers/stats">
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
              <ReactLoading type={'spinningBubbles'} color={"#FF5C00"} height={'20%'} width={'10%'} />
            </Box>) : influencers ?
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
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box className={classes.boxTop}>
                      <Typography className={classes.topInfo}>
                        {influencers.length.toLocaleString()}
                      </Typography>
                      <Tooltip placement="bottom" TransitionComponent={Zoom}
                        title="All influencers for the selected date range"
                        arrow classes={{ tooltip: classes.toolTipWidth }}
                      >
                        <Typography className={classes.title}>
                          Influencers
                        </Typography>
                      </Tooltip>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <Box style={{
                      display: "flex",
                    }} className={classes.boxTop}>
                      <Box style={{ marginRight: "6rem" }}>
                        <Typography className={classes.topInfo}>
                          ₦{revenueTotal().toLocaleString()}
                        </Typography>
                        <Tooltip placement="bottom" TransitionComponent={Zoom}
                          title="Revenue made from influencers for the selected date range"
                          arrow classes={{ tooltip: classes.toolTipWidth }}
                        >
                          <Typography className={classes.title}>
                            Revenue Generated
                          </Typography>
                        </Tooltip>
                      </Box>

                      <Box>
                        <Typography className={classes.topInfo}>
                          {orders().toLocaleString()}
                        </Typography>
                        <Tooltip placement="bottom" TransitionComponent={Zoom}
                          title="All paid orders for the selected date range"
                          arrow classes={{ tooltip: classes.toolTipWidth }}
                        >
                          <Typography className={classes.title}>
                            Orders Raised
                          </Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box className={classes.boxBottom}>
                      <Tooltip placement="top" TransitionComponent={Zoom}
                        title="Top performers: Determined from influencer earnings (i.e top earners)"
                        arrow classes={{ tooltip: classes.toolTipWidth }}
                      >
                        <Box style={{ width: "10rem" }}>
                          <Typography className={classes.title}>
                            Influencers Activity
                          </Typography>
                        </Box>
                      </Tooltip>
                      <Chart
                        data={{
                          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                          datasets: [
                            {
                              label: "Orders",
                              borderColor: '#FF5C00',
                              borderWidth: 1,
                              pointBorderColor: '#FF5C00',
                              pointBackgroundColor: '#FF5C00',
                              pointBorderWidth: 1,
                              data: [25, 8, 30, 35, 40, 43, 40, 56, 78, 90, 12, 22, 34]
                            }
                          ]
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box> : 'Influencers Service Unavailable at the moment'
      }
    </TableLayout>
  )

}