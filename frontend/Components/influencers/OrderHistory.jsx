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

const OrderHistory = ({
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
  handleDialogOpen
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
          Order History
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
                <StyledTableCell align="left">Customer Name</StyledTableCell>
                <StyledTableCell align="left">Sub-total</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (filteredData.length > 1 ? filteredData : data.order)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(ordr => (
                    <StyledTableRow onClick={handleDialogOpen('paper', ordr.orderId)} key={ordr.id}>
                      <StyledTableCell style={{ width: "5rem" }} align="left">
                        <Typography className={classes.tableInfo}>
                          {ordr.orderId}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "9rem" }} align="left">
                        <Typography className={classes.tableInfo}>
                          {moment(ordr.createdAt).format('MMM DD, YYYY')}, {moment(ordr.createdAt).format('hh:mm a')}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          {ordr.User.firstName} {ordr.User.lastName}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          ₦{ordr.subtotal.toLocaleString()}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }} align="left">
                        {
                          (ordr.status === 'Success')
                            ? <Typography style={
                              {
                                width: "4rem",
                                fontSize: "0.65rem",
                                color: "#299253",
                                background: "#F0FAF4",
                                borderRadius: "4px",
                                padding: "0.3rem 0.7rem"
                              }
                            }>
                              {ordr.status.toUpperCase()}
                            </Typography>

                            : <Typography style={
                              {
                                width: "4rem",
                                fontSize: "0.65rem",
                                color: "#FF1111",
                                background: "#FFECEC",
                                borderRadius: "4px",
                                padding: "0.3rem 0.7rem"
                              }
                            }>
                              {ordr.status.toUpperCase()}
                            </Typography>
                        }
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
          count={filteredData.length > 0 ? filteredData.length : data.order.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Grid>
  )
}

export default OrderHistory;