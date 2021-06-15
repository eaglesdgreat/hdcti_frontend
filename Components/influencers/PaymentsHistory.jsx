import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import DatePicker from '../DatePicker';
import moment from 'moment';


// CSS Styles
const useStyles = makeStyles((theme) => ({
  boxDisplay: {
    width: "100%",
    border: "1px solid #EAEAEA",
    borderRadius: "8px",
  },
  tableInfo: {
    color: "#272643",
    fontSize: "1rem"
  },
}));

// Custom table cell
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

// custom table row
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

const PaymentsHistory = ({
  data,
  filteredData,
  startDate,
  endDate,
  handleSelect,
  handleCurrentStatus,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid
      item xs={12} sm={12} md={12} lg={12} xl={12}
    >
      <Box style={{ padding: "1.5rem 1rem 3rem 2.5rem" }}
        className={classes.boxDisplay}
      >
        <Typography style={{
          fontWeight: 600,
          marginBottom: "0.8rem"
        }}>
          Payment History
                  </Typography>
        <Box style={{ padding: "0 6rem" }}>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            handleSelect={handleSelect}
            handleCurrentStatus={handleCurrentStatus}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="left">Date & Time</StyledTableCell>
                <StyledTableCell align="left">Earnings</StyledTableCell>
                <StyledTableCell align="left">Bank Details</StyledTableCell>
                <StyledTableCell align="left">Period</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (filteredData.length > 0 ? filteredData : data.payment)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(payment => (
                    <StyledTableRow key={payment.id}>
                      <StyledTableCell style={{ width: "5rem" }} align="left">
                        <Typography className={classes.tableInfo}>
                          {payment.transId}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "9rem" }} align="left">
                        <Typography className={classes.tableInfo}>
                          {moment(payment.createdAt).format('MMM DD, YYYY')}, {moment(payment.datePaid).format('hh:mm a')}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          ₦{payment.amount.toLocaleString()}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          1100206363
                                  </Typography>
                        <Typography style={{ color: "#6A6A6A" }}>
                          Kuda Bank
                                  </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          {moment(payment.datePaid).format('MMM, YYYY')}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }} align="left">
                        <Typography style={
                          {
                            width: "3rem",
                            fontSize: "0.65rem",
                            color: "#299253",
                            background: "#F0FAF4",
                            borderRadius: "4px",
                            padding: "0.3rem 0.75rem"
                          }}>
                          {payment.earning.status.toUpperCase()}
                        </Typography>
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
          count={filteredData.length > 0 ? filteredData : data.payment.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Grid>
  )
}

export default PaymentsHistory;