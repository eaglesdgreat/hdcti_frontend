import React from 'react';
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TablePagination,
  Typography,
  Checkbox
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import moment from 'moment'

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
    backgroundColor: "#FFFFFF",
    '&:hover': {
      background: "#F4F6F7"
    },
    cursor: "pointer",
    transition: "all 0.3s ease-in-out 0s",
  },
}))(TableRow);

const StyledCheckbox = withStyles((theme) => ({
  root: {
    '&$checked': {
      color: '#FF5C00',
      background: "#FFF2EB"
    },
  },
  checked: {},
}))(Checkbox);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const AllInfluencersTable = ({
  data,
  checked,
  isChecked,
  search,
  displaySearch,
  displayFilter,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  handleClick,
  handleSelectAllClick,
}) => {

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      {
        data ?
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ color: "#6A6A6A" }} align="left">
                    <StyledCheckbox
                      indeterminate={checked.length > 0 && checked.length < data.length}
                      checked={data.length > 0 && checked.length === data.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all influencers' }}
                    /></StyledTableCell>
                  <StyledTableCell style={{ color: "#6A6A6A" }} align="left">S/N</StyledTableCell>
                  <StyledTableCell style={{ color: "#6A6A6A" }} align="left">Name</StyledTableCell>
                  <StyledTableCell style={{ color: "#6A6A6A" }} align="left">Phone</StyledTableCell>
                  <StyledTableCell style={{ color: "#6A6A6A" }} align="left">Orders</StyledTableCell>
                  <StyledTableCell style={{ color: "#6A6A6A" }} align="left">Revenue Gen.</StyledTableCell>
                  <StyledTableCell style={{ color: "#6A6A6A" }} align="left">Last Activity</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  ((search.length < 1 && displayFilter.length === 0)
                    ? data
                    : search.length >= 1 ? displaySearch
                      : displayFilter.length > 0 ? displayFilter
                        : ''
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((customer, i) => {

                      const isItemChecked = isChecked(customer.id);

                      return (
                        <StyledTableRow
                          key={i}
                        >
                          <StyledTableCell
                            hover="true"
                            onClick={(event) => handleClick(event, customer.id)}
                            role="checkbox"
                            aria-checked={isItemChecked}
                            tabIndex={-1}
                            selected={isItemChecked}
                          >
                            <StyledCheckbox checked={isItemChecked} />
                          </StyledTableCell>

                          <Link
                            href={`/influencers/all/[view]?code=${customer.refCode}`}
                            as={`/influencers/all/${customer.id}?code=${customer.refCode}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{ fontSize: "15px", color: "#272643", }}>
                                {i + 1 + (page * rowsPerPage)}
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href={`/influencers/all/[view]?code=${customer.refCode}`}
                            as={`/influencers/all/${customer.id}?code=${customer.refCode}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{
                                fontSize: "15px",
                                color: "#272643",
                                width: "9rem"
                              }}>
                                {customer.firstName} {customer.lastName}
                              </Typography>

                              <Box style={{ width: "8rem", display: "flex", flexDirection: "column" }}>
                                <Typography style={{ color: "#868686", fontSize: "12px", }}>
                                  {customer.email}
                                </Typography>
                              </Box>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href={`/influencers/all/[view]?code=${customer.refCode}`}
                            as={`/influencers/all/${customer.id}?code=${customer.refCode}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{
                                fontSize: "15px",
                                color: "#272643",
                                width: "7rem"
                              }}>
                                {customer.phone}
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href={`/influencers/all/[view]?code=${customer.refCode}`}
                            as={`/influencers/all/${customer.id}?code=${customer.refCode}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{ fontSize: "15px", color: "#272643", }}>
                                {customer.OrderPayments.length}
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href={`/influencers/all/[view]?code=${customer.refCode}`}
                            as={`/influencers/all/${customer.id}?code=${customer.refCode}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{
                                fontSize: "15px",
                                color: "#272643",
                                width: "5rem"
                              }}>
                                ₦{
                                  customer.customer_earnings.map(y => y.paid_to_earn.amount)
                                    .reduce((a, b) => a = Number(a) + Number(b), 0).toLocaleString()
                                }
                              </Typography>
                            </StyledTableCell>
                          </Link>

                          <Link
                            href={`/influencers/all/[view]?code=${customer.refCode}`}
                            as={`/influencers/all/${customer.id}?code=${customer.refCode}`}
                          >
                            <StyledTableCell align="left">
                              <Typography style={{
                                fontSize: "15px",
                                color: "#272643",
                                width: "6rem"
                              }}>
                                {moment(customer.lastLogin).format('MMM DD, YYYY')}
                              </Typography>
                            </StyledTableCell>
                          </Link>
                        </StyledTableRow>)
                    })
                }
              </TableBody>
            </Table>
          </TableContainer> : 'Influencers Service Unavailable at the moment'
      }

      {data ?
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={
            ((search.length < 1 && displayFilter.length === 0)
              ? data
              : search.length >= 1 ? displaySearch
                : displayFilter.length > 0 ? displayFilter
                  : ''
            ).length
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> : ''
      }
    </Box>
  )
}

export default AllInfluencersTable;