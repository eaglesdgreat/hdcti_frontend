import React, { useState, useRef, Fragment, useEffect } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  InputAdornment,
  TextField,
  TablePagination,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputBase,
  FormControl,
  TableContainer,
  Hidden,
  Checkbox,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import clsx from 'clsx';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    display: 'flex',
  },
  table: {
    width: '90%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  typography: {
    fontfamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '24px',
    color: '#2F3237',
    lineHeight: '28px',
  },
  search: {
    border: '1px solid #EAEAEA',
    borderRadius: '6px'
  },
  tableCell: {
    borderBottom: 'none',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  tContainer: {
    padding: 30,
    paddingBottom: 0,
    paddingRight: 0,
  },
  image: {
    maxWidth: '90%',
    maxHeight: 'auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '90%',
      maxHeight: 'auto'
    },
  },
}))


function Sort({ onSortClick, selectSort }) {
  const classes = useStyles()
  // const { tableNav } = props
  const router = useRouter();

  const sortItems = [
    { name: 'By Date ASC', value: 'date_asc' },
    { name: 'By Date DESC', value: 'date_desc' },
    { name: 'By Amount ASC', value: 'amount_asc' },
    { name: 'By Amount DESC', value: 'amount_desc' },
    { name: 'Leaderboard ASC', value: 'sales_asc' },
    { name: 'Leaderboard DESC', value: 'sales_desc' },
  ]

  // Setting state value with react useState
  const [anchorEl, setAnchorEl] = useState(null);
  // const [checked, setChecked] = useState(true)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  // const handleCheck = (e) => {
  //   setChecked(e.target.checked)
  // }

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      // component="span"
      style={{
        margin: 'auto',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 20,
      }}
    >
      <Typography
        className={classes.typography}
        style={{
          fontSize: '15px',
          fontWeight: 'normal',
          linHeight: '18px',
          color: '#272643',
          marginLeft: '10px'
        }}
      >
        Sort:
    </Typography>
      <Typography
        className={classes.typography}
        style={{
          fontSize: '15px',
          fontWeight: '500',
          linHeight: '18px',
          color: '#272643',
          marginLeft: '10px'
        }}
      >
        {
          selectSort === "date_asc" ? "By Date ASC" :
            selectSort === "date_desc" ? "By Date DESC" :
              selectSort === "amount_asc" ? "By Amount ASC" :
                selectSort === "amount_desc" ? "By Date ASC" :
                  selectSort === "sales_asc" ? "Leaderboard ASC" :
                    selectSort === "sales_desc" ? "Leaderboard DESC" : "Unsorted"
        }
      </Typography>
      <Button disableRipple aria-controls="sort-menu" style={{ marginLeft: '-17px' }}
        className={classes.button} aria-haspopup="tree" onClick={handleClick}
      >
        <img src="/Vector.svg" alt="menu" />
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '8px',
            margin: '40px 0px 0px -20px',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#FFFFFF',
            width: '200px',
            height: 'auto',
            paddingTop: '0.5%',
            paddingBottom: '1%',
            // paddingLeft: '1%',
          }
        }}
      >
        {
          router.pathname === "/influencers/all" ?
            sortItems.map((item, i) => (
              <MenuItem
                key={i}
                selected={item.value === selectSort}
                onClick={() => {
                  onSortClick(item.value)
                  setAnchorEl(null)
                }}
                className={classes.button}
              >
                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '400',
                    fontSize: '15px',
                    // lineHeight: '17.58px',
                    color: '#272643',
                    // marginBottom: '-15px',
                  }}
                >
                  {/* <Checkbox
                    checked={item.value === selectSort ? checked : false}
                    onChange={handleCheck}
                    style={{
                      color: item.value === selectSort ? '#FF5C00' : ''
                    }}
                  /> */}
                  {item.name}
                </Typography>
              </MenuItem>
            )) :
            sortItems.slice(0, sortItems.length - 2).map((item, i) => (
              <MenuItem
                key={i}
                selected={item.value === selectSort}
                onClick={() => {
                  onSortClick(item.value)
                  setAnchorEl(null)
                }}
                className={classes.button}
              >
                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '400',
                    fontSize: '15px',
                    // lineHeight: '17.58px',
                    color: '#272643',
                    // marginBottom: '-15px',
                  }}
                >
                  {/* <Checkbox
                    checked={item.value === selectSort ? checked : false}
                    onChange={handleCheck}
                    style={{
                      color: item.value === selectSort ? '#FF5C00' : ''
                    }}
                  /> */}
                  {item.name}
                </Typography>
              </MenuItem>
            ))
        }

        <Box
          display="flex"
          justifyContent="center"
          style={{
            border: '1px solid #EAEAEA',
            borderRadius: '2px',
            width: '50%',
            margin: 'auto',
            marginTop: '15px'
            // backgroundColor: 'rgba(255, 92, 0, 0.08)'
          }}
        >
          <Button
            variant="text"
            className={clsx(classes.Typography, classes.button)}
            style={{
              fontWeight: 'normal',
              fontSize: '13px',
              color: '#616161',
              lineHeight: '15px',
            }}
            onClick={() => {
              onSortClick('clear')
              setAnchorEl(null)
            }}
          >
            CLEAR ALL
        </Button>
        </Box>
      </Menu>
    </Box>
  )
}

export default Sort
