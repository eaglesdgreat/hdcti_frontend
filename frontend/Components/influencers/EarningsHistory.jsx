import React from 'react';
import {
  Box,
  Button,
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

const EarningsHistory = ({
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
          Earnings History
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
                <StyledTableCell align="left">Order Id</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell align="left">Amount</StyledTableCell>
                <StyledTableCell align="left">Platform</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (filteredData.length > 0 ? filteredData : data.payment)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((pay, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell style={{ width: "5rem" }} align="left">
                        <Typography className={classes.tableInfo}>
                          {pay.earning.orderId}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "9rem" }} align="left">
                        <Typography className={classes.tableInfo}>
                          {pay.earning.description}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          {pay.earning.type}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          ₦{pay.earning.amount.toLocaleString()}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }} align="left">
                        <Box
                          display="flex"
                          justifyContent="center"
                          style={{
                            background: pay.earning.platform === 'wholesaler' ? "#DBEBFF" : "#F0FAF4",
                            border: '1px solid rgba(255, 92, 0, 0.08)',
                            borderRadius: '6px',
                          }}
                        >
                          <Button
                            disabled
                            disableRipple
                            variant="text"
                            size="small"
                          >
                            <Typography
                              className={classes.typography}
                              style={{
                                textTransform: 'uppercase',
                                fontSize: "0.7rem",
                                color: pay.earning.platform === 'wholesaler' ? "#2924B6" : "#299253"
                              }}
                            >
                              {pay.earning.platform === 'wholesaler' ? 'wholesaler' : 'marketplace'}
                            </Typography>
                          </Button>
                        </Box>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }} align="left">
                        <Typography style={{
                          width: "4rem",
                          fontSize: "0.7rem",
                          color: "#299253",
                          background: "#F0FAF4",
                          borderRadius: "4px",
                          padding: "0.3rem 0.7rem"
                        }}>
                          {pay.earning.status.toUpperCase()}
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
          count={filteredData.length > 0 ? filtere.order.length : data.payment.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Grid>
  )
}

export default EarningsHistory;