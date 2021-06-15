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

const CouponActivity = ({
  data,
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
      item
      xs={12} sm={12} md={12} lg={12} xl={12}
    >
      <Box style={{ padding: "1.5rem 1rem 3rem 2.5rem" }}
        className={classes.boxDisplay}
      >
        <Typography style={{
          fontWeight: 600,
          marginBottom: "0.8rem"
        }}>
          Coupon Activity
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Type</StyledTableCell>
                <StyledTableCell align="left">Added by</StyledTableCell>
                <StyledTableCell align="left">Date Added</StyledTableCell>
                <StyledTableCell align="left">Expiration Date</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell style={{ width: "8rem" }} align="left">
                        <Typography className={classes.tableInfo}>
                          {item.type}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "9rem" }} align="left">
                        <Typography className={classes.tableInfo}>
                          {item.added_by}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          {item.added_date} {item.added_time}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography className={classes.tableInfo}>
                          {item.expiration_date} {item.expiration_time}
                        </Typography>
                      </StyledTableCell>

                      <StyledTableCell
                        style={{ minwidth: "10rem" }}
                        align="left">
                        <Typography style={
                          item.status === "ACTIVE" ?
                            {
                              width: "3rem",
                              fontSize: "0.65rem",
                              color: "#299253",
                              background: "#F0FAF4",
                              borderRadius: "4px",
                              padding: "0.3rem 0.75rem"
                            } :
                            {
                              width: "4.5rem",
                              fontSize: "0.65rem",
                              color: "#299253",
                              background: "#F0FAF4",
                              borderRadius: "4px",
                              padding: "0.3rem 0.75rem"
                            }
                        }>
                          {item.status}
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Grid>
  )
}

export default CouponActivity;