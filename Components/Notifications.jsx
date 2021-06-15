import React, { useState, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import { Menu, MenuItem } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
import clsx from 'clsx';

import PrivateRoute from './PrivateRoute'
import { isAuthenticated } from '../lib/auth.helper'



const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#FFFFFF',
    paddingRight: '4%',
    paddingBottom: '1%',
    paddingTop: '1%',
  },
  avatar: {
    color: '#FF5C00',
    backgroundColor: '#FAEAE1',
    width: '30px',
    height: '30px',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '19px',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 'i8px',
    lineHeight: '21px',
    color: '#171616',
  },
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  notify: {
    textDecoration: 'none',
    '&:hover,&:focus,&:active,&:visited': {
      textDecoration: 'none',
    },
  }
}))



const CssBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#FFF2EB',
    color: '#FF5C00',
    margin: 'auto',
    width: '80%',
    height: '70%',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    //   '&::after': {
    //     // position: 'static',
    //     top: 0,
    //     left: 0,
    //     width: '100%',
    //     height: '100%',
    //     borderRadius: '50%',
    //     // animation: '$ripple 1.2s infinite ease-in-out',
    //     // border: '2px solid #FFF2EB',
    //   },
  },
  // '@keyframes ripple': {
  //   '0%': {
  //     transform: 'scale(.8)',
  //     opacity: 1,
  //   },
  //   '100%': {
  //     transform: 'scale(2.4)',
  //     opacity: 0,
  //   },
  // },
}))(Badge);



const fetcher = async (...arg) => {
  const [url, token] = arg

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}


const productData = () => {
  const url = `${process.env.BACKEND_URL}/api/all-products`
  // const url = 'http://localhost:8000/api/all-products'
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    products: data,
    isLoading: !error && !data,
    isError: error
  }
}



function Notifications() {
  const router = useRouter()
  const classes = useStyles()

  // Fetching data from backend with SWR
  const { products, isLoading, isError } = productData()

  const note = []
  for (let id = 1; id <= 100; id++)
    for (let name of ['Peter'])
      for (let message of ['just uploaded'])
        for (let item of ['Original Oraimo Charger with Fast Charging'])
          for (let read of [false])
            for (let platform of ['wholesaler'])
              for (let created of [new Date()])
                note.push({ id, name, message, item, read, platform, created })


  const [anchorEl, setAnchorEl] = useState(null);
  const [state, setState] = useState([...note])

  const onClickRead = (idx) => () => {
    let product = [...note]
    product[idx] = { ...product[idx], read: true }
    setState([...product])
    handleClose()
    console.log(state)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <Tooltip title="check your notification">
        <IconButton
          aria-controls="notification"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ float: 'right', marginRight: '20px' }}
        >
          <CssBadge
            badgeContent={(state.filter(product => product.read === false)).length}
            // overlap="circle"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            variant="standard"
          >
            <img src="/bell.svg" alt="notification" />
          </CssBadge>
        </IconButton>
      </Tooltip>

      <Menu
        id="notification"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '10px',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.08)',
            backgroundColor: '#FFFFFF',
            width: '300px',
            height: '350px',
            margin: '45px 0px 0px -110px',
            // paddingTop: '1%',
            // paddingBottom: '2%'
          }
        }}
      >
        <MenuItem
          onClick={handleClose}
          // disabled={true}
          className={classes.button}
        >
          <Box
            display="flex"
            style={{
              paddingLeft: '3%',
              paddingBottom: '2%',
              paddingTop: '2%',
            }}
          >
            <Typography className={classes.typography} >
              Notifications
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              component="span"
              // m={1}
              style={{
                backgroundColor: '#FFF2EB',
                margin: 'auto',
                borderRadius: '4px',
                marginLeft: '10px',
                padding: 4.5,
              }}
            >
              <Typography
                className={classes.typography}
                style={{
                  color: '#FF5C00',
                  fontWeight: '500',
                  fontSize: '14px',
                  lineHeight: '16.41px',
                }}
              >
                {(state.filter(product => product.read === false)).length}
              </Typography>
            </Box>
          </Box>
        </MenuItem>

        <Divider light />

        {state
          .filter(product => product.read === false)
          .map((product, i) => {
            return (
              <MenuItem
                key={product.id}
                onClick={onClickRead(i)}
                className={classes.button}
              // disabled={true}
              >
                <Tooltip title={`${product.name} ${product.message} ${product.item}`}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    style={{
                      paddingLeft: '3%',
                      paddingBottom: '2%',
                      paddingTop: '2%',
                    }}
                  >
                    <Box
                      display="block"
                      // component="span"
                      style={{
                        whiteSpace: 'initial',
                      }}
                    >
                      <Link
                        href={`/products/editproduct/viewproduct/[view]?merchant=${product.platform}`}
                        as={`/products/editproduct/viewproduct/${product.id}?merchant=${product.platform}`}
                      >
                        <a
                          className={classes.notify}
                        >
                          <Typography
                            className={clsx(classes.typography)}
                            style={{
                              fontWeight: '400',
                              fontSize: '14px',
                              lineHeight: '16.41px',
                              color: '#343434',
                            }}
                          >
                            {product.name} {product.message} <strong> {product.item}</strong>
                          </Typography>
                        </a>
                      </Link>
                    </Box>

                    <Box
                      display="flex"
                      component="span"
                    >
                      <Typography
                        className={classes.typography}
                        style={{
                          fontWeight: 'normal',
                          fontSize: '12px',
                          lineHeight: '14px',
                          color: '#868686'
                        }}
                      >
                        {'25min'} ago
                      </Typography>
                    </Box>
                  </Box>
                </Tooltip>
              </MenuItem>
            )
          })}
      </Menu>
    </Fragment>
  )
}


export default Notifications
