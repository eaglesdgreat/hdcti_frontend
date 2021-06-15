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

import Sort from './Sort'



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



const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 6,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #EAEAEA',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Roboto',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#FF5C00',
      border: '1px solid #FF5C00',
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(InputBase);




function Search(props) {
  const classes = useStyles()
  // const { tableNav } = props
  const router = useRouter();

  const {
    search,
    onSearchChange,
    selected,
    onSelected,
    showRemoveButton,
    onSortClick,
    selectSort,
    handleDialogOpen
  } = props

  // item for the filter to change between search
  const filterItems = [
    // { name: 'Cancelled', value: 'cancelled' },
    { name: 'Comfirmed', value: 'comfirmed' },
    { name: 'Wholesale', value: 'wholesaler' },
    { name: 'Marketplace', value: 'vendor' },
  ]

  // Setting state value with react useState
  const [anchorEl, setAnchorEl] = useState(null);
  // const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(true)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleCheck = (e) => {
    setChecked(e.target.checked)
  }

  // const onSelected = (selected) => () => {
  //   setSelected(selected)
  //   setAnchorEl(null)
  //   console.log(selected)
  // }

  return (
    <Grid container spacing={10}>
      <Grid item
        xs={router.pathname === '/influencers/all' ? 4 : 5}
        md={router.pathname === '/influencers/all' ? 4 : 5}
        lg={router.pathname === '/influencers/all' ? 4 : 5}
        xl={router.pathname === '/influencers/all' ? 4 : 5}
      >
        <Box
          display="flex"
          style={{
            padding: 10,
            minWidth: '200px',
            paddingLeft: 30,
          }}
        >
          <FormControl>
            <BootstrapInput
              value={search}
              onChange={onSearchChange}
              // onKeyDown={onSearchChange}
              placeholder={"Search"}
              className={classes.search}
              id="input-search"
            // InputProps={{
            //     startAdornment: (
            //     <InputAdornment position="start">
            //         <SearchIcon />
            //     </InputAdornment>
            //     )
            // }}
            />
          </FormControl>
        </Box>
      </Grid>

      { showRemoveButton ?
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Button
            style={{
              background: "#FF5C00",
              color: "#FFFFFF",
              borderRadius: "4px",
              marginTop: "0.9rem"
            }}
            variant="contained"
            onClick={handleDialogOpen}
          >
            <Typography style={{ fontSize: "0.9rem", }}>
              Remove
            </Typography>
          </Button>
        </Grid> : ""
      }

      <Grid item xs={4} md={4} lg={4} xl={4} >
        <Sort
          selectSort={selectSort}
          onSortClick={(arg) => {
            onSortClick(arg)
          }}
        />
      </Grid>

      <Grid item
        xs={router.pathname === '/influencers/all' ? 2 : 3}
        md={router.pathname === '/influencers/all' ? 2 : 3}
        lg={router.pathname === '/influencers/all' ? 2 : 3}
        xl={router.pathname === '/influencers/all' ? 2 : 3}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          // component="span"
          style={{
            margin: 'auto',
            paddingTop: 15,
            paddingBottom: 15,
            marginLeft: 10,
          }}
        >
          <img src="/filter.svg" alt="filter" />
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
            Filter
          </Typography>
          <Button disableRipple aria-controls="simple-menu" style={{ marginLeft: '-17px' }}
            className={classes.button} aria-haspopup="true" onClick={handleClick}
          >
            <img src="/Vector.svg" alt="menu" />
          </Button>
          <Menu
            id="simple-menu"
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
            {filterItems.map((item, i) => (
              <MenuItem
                key={i}
                selected={item.value === selected}
                onClick={() => {
                  onSelected(item.value)
                  setAnchorEl(null)
                }}
                className={classes.button}
              >
                <Typography
                  className={classes.typography}
                  style={{
                    fontWeight: '400',
                    fontSize: '15px',
                    lineHeight: '17.58px',
                    color: '#272643',
                    marginBottom: '-15px',
                  }}
                >
                  <Checkbox
                    checked={item.value === selected ? checked : false}
                    onChange={handleCheck}
                    style={{
                      color: item.value === selected ? '#FF5C00' : ''
                    }}
                  />
                  {item.name}
                </Typography>
              </MenuItem>
            ))}

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
                  onSelected('clear')
                  setAnchorEl(null)
                }}
              >
                CLEAR ALL
              </Button>
            </Box>
          </Menu>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Search