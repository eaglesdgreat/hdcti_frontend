import React, { Fragment, useState } from 'react'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  ArrowBackIos,
  EditOutlined,
} from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import axios from 'axios';
import useSWR, { mutate } from 'swr'
import ReactLoading from 'react-loading'
import { customerouter } from 'next/router'
import moment from 'moment'
import clsx from 'clsx';

import { isAuthenticated } from './../../../lib/auth.helper'
import PrivateRoute from './../../../Components/PrivateRoute'
import TableLayout from '../../../Components/Tables'
import OrdersDialog from '../../../Components/influencers/OrdersDialog';
import OrderHistory from '../../../Components/influencers/OrderHistory'
import EarningsHistory from '../../../Components/influencers/EarningsHistory.jsx'
import { useRouter } from 'next/router'
import PaymentsHistory from '../../../Components/influencers/PaymentsHistory';
import CouponActivity from '../../../Components/influencers/CouponActivity';
import InfluencerInfo from '../../../Components/influencers/InfluencerInfo';

// CSS Styles
const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 auto",
    padding: "2rem 2rem 6rem 2rem",
  },
  backDeleteWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem"
  },
  back: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  edit: {
    background: "rgba(255, 92, 1, 0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
    width: "7rem",
  },
  status: {
    color: "#FF5C00",
    marginTop: "0.2rem",
    display: "flex",
    justifyContent: "center",
    AlignItems: "center",
    marginBottom: "1rem",
    borderRadius: "6px",
    background: "#FFF2EB",
    width: "8rem",
  },
  boxDisplay: {
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  boxRight: {
    display: "flex",
    padding: "2rem",
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  tableInfo: {
    color: "#272643",
    fontSize: "1rem"
  },
  boxProducts: {
    padding: "2rem 3rem",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  smallTopBox: {
    padding: "1rem 1rem 1rem 1.5rem",
    boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.05)",
    border: "1px solid #F1F1F1",
    borderRadius: "8px",
    margin: "0 0.5rem 0.5rem 0",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: "60%",
    margin: "0 auto",
  },
  paper: {
    backgroundColor: "#FFFFFF",
    borderRadius: '8px',
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 8, 3),
    margin: "3rem auto",
    "&:focus": {
      outline: "none"
    }
  },
}));

const tableNav = [
  {
    active: false,
    label: 'stats',
    link: '/influencers/stats',
  },
  {
    active: true,
    label: 'all',
    link: '/influencers/all',
  },
]

const coupon_activity = [
  {
    type: "Discount/Flat",
    added_by: "Josiah",
    added_date: "Jun 15, 2020",
    added_time: "12:10",
    expiration_date: "Jun 30, 2020",
    expiration_time: "12:10",
    status: "ACTIVE"
  },
  {
    type: "Discount/Flat",
    added_by: "Josiah",
    added_date: "Jun 15, 2020",
    added_time: "12:10",
    expiration_date: "Jun 30, 2020",
    expiration_time: "12:10",
    status: "ACTIVE"
  },
];


const fetcher = async (...arg) => {
  const [url, token] = arg

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}


const influencerData = () => {
  const router = useRouter()
  const { view, code } = router.query

  const url = `${process.env.BACKEND_URL}/api/get-influencer/${view}?code=${code}`

  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    influencer: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default function View() {
  const router = useRouter()
  const classes = useStyles();
  const { view, code } = router.query

  // Fetching data from backend with SWR
  // const { orders, isLoadingOrders, isErrorOrders } = ordersData()
  // console.log(orders.orders.total.rows.filter(order => order.orderId === "3445WQ"))
  // console.log(users);
  const { influencer, isLoading, isError } = influencerData();

  const dialogDataFetcher = (id) => {
    const data = influencer.order.filter(item => item.orderId === id)
    return data;
  }

  // date Picker props
  var date = new Date(), year = date.getFullYear(), month = date.getMonth();

  // initializing state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(new Date(year, month, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [dialogData, setDialogData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const additionalType = (type) => {
    const check = type.split(',')
    let addType

    for (let i = 0; i < check.length; i++) {
      if (check[i] !== 'influencer') {
        addType = check[i]
        break
      }
    }

    return addType
  }
  // console.log(additionalType('influencer,wholesaler,user,customer'))

  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleDialogOpen = (scrollType, itemId) => () => {
    const data = dialogDataFetcher(itemId);
    setDialogData(data);
    setOpenDialog(true);
    setScroll(scrollType);
  };

  console.log(dialogData);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Date picker functions
  const dateRangeChange = (start, end) => {

    const upperBound = moment(moment(start).format("DD/MM/YYYY"), "DD/MM/YYYY")
    const lowerBound = moment(moment(end).format("DD/MM/YYYY"), "DD/MM/YYYY")

    if (upperBound && lowerBound) {
      const orderData = influencer.order.filter(date => {
        const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
        const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
        return check
      })

      const paymentData = influencer.payment.filter(date => {
        const thirdDates = moment(moment(date.createdAt).format("DD/MM/YYYY"), "DD/MM/YYYY")
        const check = thirdDates.isBetween(upperBound, lowerBound, null, '[]')
        return check
      })

      setFilteredPayments([...paymentData])
      setFilteredOrders([...orderData])
    } else {
      return;
    }

  }

  // console.log(filteredOrders);
  // console.log(filteredPayments);

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
    <TableLayout tableNav={tableNav} name="Influencers">
      <Box className={classes.container}>
        <Box className={classes.backDeleteWrapper}>
          <span className={classes.back}>
            <Button
              size="large"
              className={classes.buttonHover}
              disableRipple
              onClick={() => router.back()}
            >
              <ArrowBackIos style={{ fontSize: "0.8rem", }} />
              <Typography style={{ fontSize: "0.8rem", }}>
                BACK
            </Typography>
            </Button>
          </span>

          <Link
            href={`/influencers/all/editinfluencer/[edit]?code=${code}`}
            as={`/influencers/all/editinfluencer/${view}?code=${code}`}
          >
            <span className={classes.edit}>
              <Button
                size="large"
                className={classes.buttonHover}
              >
                <EditOutlined style={{ fontSize: "0.9rem", color: "#FF5C00", marginRight: "0.3rem" }} />
                <Typography style={{ fontSize: "0.8rem", fontWeight: 500, color: "#FF5C00" }}>
                  EDIT INFO
              </Typography>
              </Button>
            </span>
          </Link>
        </Box>

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
              <ReactLoading type={'spinningBubbles'} color={"#FF5C00"} height={'20%'} width={'10%'} />
            </Box> : influencer &&
            <Grid container spacing={3}>

              <InfluencerInfo
                data={influencer}
                filteredOrders={filteredOrders}
                filteredPayments={filteredPayments}
                additionalType={additionalType}
              />

              <OrderHistory
                data={influencer}
                filteredData={filteredOrders}
                startDate={startDate}
                endDate={endDate}
                handleSelect={handleSelect}
                handleCurrentStatus={handleCurrentStatus}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                handleDialogOpen={handleDialogOpen}
              />

              <Box>
                <OrdersDialog
                  data={dialogData}
                  openDialog={openDialog}
                  handleDialogClose={handleDialogClose}
                  scroll={scroll}
                />
              </Box>

              <EarningsHistory
                data={influencer}
                filteredData={filteredPayments}
                startDate={startDate}
                endDate={endDate}
                handleSelect={handleSelect}
                handleCurrentStatus={handleSelect}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />

              <PaymentsHistory
                data={influencer}
                filteredData={filteredPayments}
                startDate={startDate}
                endDate={endDate}
                handleSelect={handleSelect}
                handleCurrentStatus={handleSelect}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />

              <CouponActivity
                data={coupon_activity}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
              />
            </Grid>
        }
      </Box>
    </TableLayout>
  )
}
