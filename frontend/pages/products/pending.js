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
  Badge,
  CircularProgress
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
import clsx from 'clsx';
import moment from 'moment'
import { useSnackbar } from 'notistack'

import TableLayout from '../../Components/Tables'
import NoPending from '../../Components/noPending'
import { isAuthenticated } from './../../lib/auth.helper'
import SearchFilter from './../../Components/Search'
import PrivateRoute from './../../Components/PrivateRoute'
// import { useStateValue } from '../../StateProviders';

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
  cssOutlinedInput: {
    whiteSpace: 'initial',
    '&$cssFocused $notchedOutline': {
      borderColor: '#FF5C00',
    },
  },
  cssFocused: {},
  notchedOutline: {},
}))


const CssBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#DBEBFF',
    color: '#2924B6',
    width: 'auto',
    height: 'auto',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    fontWeight: 'normal',
    fontSize: '8.5px',
    lineHeight: '13px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  }
}))(Badge);


const CssBadge2 = withStyles((theme) => ({
  badge: {
    backgroundColor: '#EAF8EF',
    color: '#24B65E',
    width: 'auto',
    height: 'auto',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    fontWeight: 'normal',
    fontSize: '8.5px',
    lineHeight: '13px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  }
}))(Badge);


const tableNav = [
  {
    active: false,
    label: 'stats',
    link: '/products/stats',
  },
  {
    active: true,
    label: 'pending',
    link: '/products/pending',
  },
  {
    active: false,
    label: 'wholesale',
    link: '/products/wholesale',
  },
  {
    active: false,
    label: 'marketplace',
    link: '/products/marketplace',
  },
]


const validations = (value, name, required = true, type, secondValue) => {

  // validation for required field 
  if (required && !value) {
    return { message: `${name} is required`, status: true }
  }

  return { message: '', status: false };
}


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
  const token = isAuthenticated().authToken

  const { data, error } = useSWR([url, token], fetcher, { shouldRetryOnError: false })

  return {
    products: data,
    isLoading: !error && !data,
    isError: error
  }
}



export default function Pending() {
  const router = useRouter()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar();

  const errorMessageStyle = {
    color: "red",
    fontSize: "10px",
    fontWeight: "bolder",
    fontStyle: "oblique",
  }

  // Setting state value with react useState
  const [search, setSearch] = useState('')
  const [displaySearch, setDisplaySearch] = useState([])
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [displayFilter, setDisplayFilter] = useState([])
  const [prodDetails, setProdDetails] = useState({})
  const [selected, setSelected] = useState('')
  const [selectSort, setSelectSort] = useState('')
  const [messages, setMessages] = useState({
    comment: '',
    success: '',
    failure: '',
  })

  // Fetching data from backend with SWR
  const { products, isLoading, isError } = productData()

  const name = 'Products'

  const clearError = () => {
    setComment('');
    setMessages({ comment: '', success: '', failure: '' });
  }

  // handler for filtering data
  const handleFilter = (arg) => {
    // const data = [...products.wholesaleProducts.rows, ...products.products.rows]
    if (arg === 'wholesaler') {
      setDisplayFilter([...products.wholesaleProducts.rows])
      setPage(0)
    } else if (arg === 'vendor') {
      setDisplayFilter([...products.products.rows])
      setPage(0)
    } else {
      setDisplayFilter([])
    }

    // console.log(displayFilter, arg)
  }

  // handle change per page
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // handler for pagination change per page
  const handleRowsChangePerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // handling sorting data
  const onSortClick = (arg) => {
    const data = ((search.length < 1 && displayFilter.length === 0)
      ? [...products.wholesaleProducts.rows, ...products.products.rows]
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )

    // sort date ascending order
    if (arg === 'date_asc') {
      const dateAsc = data.sort((a, b) => new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateAsc)
      setPage(0)
    }

    // sorting date descending order
    if (arg === 'date_desc') {
      const dateDesc = data.sort((a, b) => new Date(...(moment(b.createdAt).format('DD/MM/YYYY')).split('/').reverse())
        - new Date(...(moment(a.createdAt).format('DD/MM/YYYY')).split('/').reverse()))

      setDisplayFilter(dateDesc)
      setPage(0)
    }

    if (arg !== 'date_asc' && arg !== 'date_desc') {
      setDisplayFilter([])
    }
  }

  // seacrh handler and display
  const onSearchChange = (e) => {
    e.preventDefault()
    const { value } = e.target
    setSearch(value)

    const data = ((search.length < 1 && displayFilter.length === 0)
      ? [...products.wholesaleProducts.rows, ...products.products.rows]
      : search.length >= 1 ? displaySearch
        : displayFilter.length > 0 ? displayFilter
          : ''
    )
    // JSON.parse(items[0].varieties).map((items, i) => { return console.log(items)})

    const items = data.slice().sort((a, b) => a.id > b.id)
    // console.log(items)

    let currentList = items.map(item => {
      // console.log({...item})
      return { ...item }
    })

    if (search !== '') {
      let newList = []

      newList = currentList.filter(product => {
        const name = (`${product.name} ${product.category}`).toLowerCase()
        return name.includes(search.toLowerCase())
      })

      setDisplaySearch(newList)
      setPage(0)
    } else {
      setDisplaySearch(items)
    }
    // console.log(displaySearch)
  }

  // click open dialog pop up
  const handleDialogClick = () => {
    setOpen(true)
  }

  // handle dialog close changes
  const handleDialogClose = () => {
    setOpen(false)
    clearError()
  }

  //handle comment changes
  const handleComment = (e) => {
    const { value } = e.target
    setComment(value)
  }

  // validating comment before submit
  const validateField = (e) => {
    if (e.target.name === 'comment') {
      const validate = validations(comment, 'Comment');
      if (validate.status) {
        setMessages({ ...messages, comment: validate.message, success: '', failure: '' });
      } else {
        setMessages({ ...messages, comment: '', success: '', failure: '' });
      }
    }
  }

  // delete a product handler 
  const clickDelete = async (e) => {
    e.preventDefault()

    let isValid = true

    if (isValid) {
      const validate = validations(comment, 'Comment');
      if (validate.status) {
        setMessages({ ...messages, comment: validate.message });
        isValid = false;
      }
    }

    const body = {
      name: prodDetails.name,
      email: prodDetails.email,
      productName: prodDetails.prodName,
      message: comment,
    }

    const token = isAuthenticated().authToken

    const url = `${process.env.BACKEND_URL}/api/delete-product/
                ${prodDetails.prodId}?merchant=${prodDetails.platform}`

    if (isValid) {
      try {
        // const response = { data: { body, success: 'You have successfully delected the product' } }
        // console.log(response.data.body)
        const response = await axios.delete(
          url,
          { headers: { authenticate: token } }
        )

        if (response.data.success) {
          await axios.post('/api/send-mail', body)

          enqueueSnackbar(`${response.data.success.message}. Email has been sent to the vendor`, {
            variant: 'success',
          });

          handleDialogClose()
        }
      } catch (e) {
        console.log(e)

        if (e.response) {
          enqueueSnackbar(`${e.response.data.errors.message}. Try again`, {
            variant: 'error',
          });
        }
      }
    }
  }


  return (
    <TableLayout tableNav={tableNav} name={name}>
      <SearchFilter
        search={search}
        selected={selected}
        selectSort={selectSort}
        onSearchChange={onSearchChange}
        onSelected={(arg) => {
          setSelected(arg)
          handleFilter(arg)
        }}
        onSortClick={(arg) => {
          setSelectSort(arg)
          onSortClick(arg)
        }}
      />

      <Divider light />

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
            <CircularProgress style={{ 'color': '#FF5C00' }} />
          </Box> :
          products.pending === 0 ? <NoPending name={name} /> :
            <Box
              display="flex"
              // flexDirection="column"
              style={{
                width: '100%'
              }}
            >
              <TableContainer className={classes.tContainer} component="div">
                <Table className={classes.table} >
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableCell} variant="head" size="small">
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '15px',
                            lineHeight: '18px',
                            color: '#252525'
                          }}
                        >
                          Image
                        </Typography>
                      </TableCell>

                      <TableCell className={classes.tableCell} variant="head" size="small">
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '15px',
                            lineHeight: '18px',
                            color: '#252525'
                          }}
                        >
                          Product name
                        </Typography>
                      </TableCell>

                      <TableCell className={classes.tableCell} variant="head" size="small">
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '15px',
                            lineHeight: '18px',
                            color: '#252525'
                          }}
                        >
                          Variants
                        </Typography>
                      </TableCell>

                      <TableCell className={classes.tableCell} variant="head" size="small">
                        <Typography
                          className={classes.typography}
                          style={{
                            fontSize: '15px',
                            lineHeight: '18px',
                            color: '#252525'
                          }}
                        >
                          Category
                        </Typography>
                      </TableCell>
                    </TableRow>

                    {
                      ((search.length < 1 && displayFilter.length === 0)
                        ? [...products.wholesaleProducts.rows, ...products.products.rows]
                        : search.length >= 1 ? displaySearch
                          : displayFilter.length > 0 ? displayFilter
                            : ''
                      )
                        .filter(item => item.status === 'pending')
                        .reverse()
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, i) => {
                          return (
                            <Fragment key={i}>
                              <TableRow key={item.id}>
                                <TableCell className={classes.tableCell} size="small">
                                  <Link
                                    href={`/products/editproduct/viewproduct/[view]?merchant=${item.user.platform}`}
                                    as={`/products/editproduct/viewproduct/${item.id}?merchant=${item.user.platform}`}
                                  >
                                    <a
                                      style={{
                                        textDecoration: 'none'
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        // component="span"
                                        style={{
                                          width: '39px',
                                          height: '39px',
                                        }}
                                      >
                                        <img src={JSON.parse(item.varieties)[0].images[0]}
                                          alt="item-logo"
                                          className={classes.image}
                                        />
                                      </Box>
                                    </a>
                                  </Link>
                                </TableCell>

                                <TableCell align="left" className={classes.tableCell} size="small">
                                  <Link
                                    href={`/products/editproduct/viewproduct/[view]?merchant=${item.user.platform}`}
                                    as={`/products/editproduct/viewproduct/${item.id}?merchant=${item.user.platform}`}
                                  >
                                    <a
                                      style={{
                                        textDecoration: 'none'
                                      }}
                                    >
                                      <Box
                                        display="flex"
                                        flexDirection="column"
                                        style={{
                                          width: '100%',
                                        }}
                                      >
                                        <Box
                                          display="flex"
                                          style={{
                                            width: '100%'
                                          }}
                                        >
                                          <Typography
                                            className={classes.typography}
                                            style={{
                                              fontWeight: '400',
                                              fontSize: '13.5px',
                                              lineHeight: '17.58px',
                                              color: '#272643',
                                              // whiteSpace: 'initial',
                                            }}
                                          >
                                            {item.name}
                                          </Typography>
                                        </Box>

                                        {item.user.platform === 'vendor' ?
                                          <Box
                                            display="flex"
                                            justifyContent="flex-start"
                                            style={{
                                              width: '100%',
                                              margin: 'auto',
                                              paddingTop: 10,
                                              paddingBottom: 10,
                                              paddingLeft: 37,
                                            }}
                                          >
                                            <CssBadge2
                                              badgeContent={'marketplace'}
                                            />
                                          </Box>
                                          :
                                          <Box
                                            display="flex"
                                            justifyContent="flex-start"
                                            style={{
                                              width: '100%',
                                              margin: 'auto',
                                              paddingTop: 10,
                                              paddingBottom: 10,
                                              paddingLeft: 34,
                                            }}
                                          >
                                            <CssBadge
                                              badgeContent={'wholesale'}
                                            />
                                          </Box>
                                        }
                                      </Box>
                                    </a>
                                  </Link>
                                </TableCell>

                                <TableCell align="left" className={classes.tableCell} size="small">
                                  <Link
                                    href={`/products/editproduct/viewproduct/[view]?merchant=${item.user.platform}`}
                                    as={`/products/editproduct/viewproduct/${item.id}?merchant=${item.user.platform}`}
                                  >
                                    <a
                                      style={{
                                        textDecoration: 'none'
                                      }}
                                    >
                                      <Typography
                                        className={classes.typography}
                                        style={{
                                          fontWeight: '400',
                                          fontSize: '15px',
                                          lineHeight: '17.58px',
                                          color: '#272643',
                                          whiteSpace: 'initial',
                                        }}
                                      >
                                        {JSON.parse(item.varieties).length}
                                      </Typography>
                                    </a>
                                  </Link>
                                </TableCell>

                                <TableCell align="left" className={classes.tableCell} size="small">
                                  <Link
                                    href={`/products/editproduct/viewproduct/[view]?merchant=${item.user.platform}`}
                                    as={`/products/editproduct/viewproduct/${item.id}?merchant=${item.user.platform}`}
                                  >
                                    <a
                                      style={{
                                        textDecoration: 'none'
                                      }}
                                    >
                                      <Typography
                                        className={classes.typography}
                                        style={{
                                          fontWeight: '400',
                                          fontSize: '15px',
                                          lineHeight: '17.58px',
                                          color: '#272643',
                                          whiteSpace: 'initial',
                                        }}
                                      >
                                        {item.category}
                                      </Typography>
                                    </a>
                                  </Link>
                                </TableCell>

                                <Hidden smDown>
                                  <TableCell align="left" className={classes.tableCell} size="small">
                                    <Link
                                      href={`/products/editproduct/[pid]?merchant=${item.user.platform}`}
                                      as={`/products/editproduct/${item.id}?merchant=${item.user.platform}`}
                                    >
                                      <a
                                        style={{
                                          textDecoration: 'none'
                                        }}
                                      >
                                        <Box
                                          display="flex"
                                          justifyContent="center"
                                          style={{
                                            border: '1px solid rgba(255, 92, 0, 0.08)',
                                            borderRadius: '2px',
                                            width: '80%',
                                            margin: 'auto',
                                            backgroundColor: 'rgba(255, 92, 0, 0.08)'
                                          }}
                                        >
                                          <Button
                                            variant="text"
                                            className={clsx(classes.Typography, classes.button)}
                                            disableRipple
                                            size="small"
                                            style={{
                                              fontWeight: 'normal',
                                              fontSize: '13px',
                                              color: '#FF5C00',
                                              lineHeight: '15px',
                                            }}
                                          >
                                            EDIT
                                            </Button>
                                        </Box>
                                      </a>
                                    </Link>
                                  </TableCell>

                                  <TableCell align="left" className={classes.tableCell} size="small">
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      style={{
                                        border: '1px solid #EAEAEA',
                                        borderRadius: '2px',
                                        width: '100%',
                                        margin: 'auto',
                                        // backgroundColor: 'rgba(255, 92, 0, 0.08)'
                                      }}
                                    >
                                      <Button
                                        variant="text"
                                        className={clsx(classes.Typography, classes.button)}
                                        style={{
                                          fontWeight: 'normal',
                                          fontSize: '13px',
                                          color: '#EAEAEA',
                                          lineHeight: '15px',
                                        }}
                                        onClick={
                                          () => {
                                            handleDialogClick()
                                            setProdDetails({
                                              prodName: item.name,
                                              prodId: item.id,
                                              platform: item.user.platform,
                                              email: item.user.email,
                                              name: `${item.user.firstName} ${item.user.lastName}`
                                            })
                                          }
                                        }
                                      >
                                        REMOVE
                                        </Button>
                                    </Box>
                                    <Dialog
                                      open={open}
                                      onClose={handleDialogClose}
                                      BackdropProps={{
                                        style: {
                                          opacity: .1
                                        }
                                      }}
                                      PaperProps={{
                                        style: {
                                          borderRadius: '8px',
                                          width: '428px',
                                          // height: '369px',
                                          paddingBottom: '5%',
                                          paddingTop: '2.5%',
                                          boxShadow: 'none'
                                        }
                                      }}
                                    >
                                      <DialogTitle>
                                        <Typography
                                          className={classes.typography}
                                          style={{
                                            fontWeight: '600',
                                            fontSize: '24px',
                                            lineHeight: '28px',
                                          }}
                                        >
                                          Remove Product
                                          </Typography>
                                      </DialogTitle>

                                      <DialogContent>
                                        <Box
                                          display="flex"
                                          component="span"
                                          style={{
                                            whiteSpace: 'initial',
                                          }}
                                        >
                                          <Typography
                                            className={classes.typography}
                                            style={{
                                              fontWeight: 'normal',
                                              fontSize: '15px',
                                              lineHeight: '22px',
                                              color: '#242120',
                                            }}
                                          >
                                            If you remove <strong>{prodDetails.prodName}, </strong>
                                              all the information about this product would be
                                              lost and cannot be recovered.
                                            </Typography>
                                        </Box>

                                        <Box
                                          display="flex"
                                          component="span"
                                          flexDirection="column"
                                          style={{
                                            whiteSpace: 'initial',
                                            marginTop: '20px'
                                          }}
                                        >
                                          <Typography
                                            className={classes.typography}
                                            style={{
                                              fontWeight: 'normal',
                                              fontSize: '14px',
                                              lineHeight: '16px',
                                              color: '#242120',
                                              marginBottom: '-10px',
                                            }}
                                          >
                                            Comments:
                                            </Typography>
                                          <TextField
                                            type="text"
                                            value={comment}
                                            name="comment"
                                            multiline
                                            rows="3"
                                            fullWidth
                                            InputProps={{
                                              classes: {
                                                root: classes.cssOutlinedInput,
                                                focused: classes.cssFocused,
                                                notchedOutline: classes.notchedOutline,
                                              }
                                            }}
                                            onChange={handleComment}
                                            onKeyUp={validateField}
                                            variant="outlined"
                                            margin="normal"
                                          />
                                          {messages.comment && (
                                            <span style={{ ...errorMessageStyle }}>{messages.comment}</span>
                                          )}
                                        </Box>
                                      </DialogContent>

                                      <DialogActions>
                                        <Box
                                          display="flex"
                                          style={{
                                            // margin: 'auto',
                                            marginRight: '25px',
                                            // border: '1px solid red',
                                          }}
                                        >
                                          <Button
                                            size="large"
                                            className={classes.button}
                                            onClick={clickDelete}
                                            disableRipple
                                            style={{
                                              border: '2px solid #FF5C00',
                                            }}
                                          >
                                            <Typography
                                              className={classes.typography}
                                              style={{
                                                textAlign: 'center',
                                                color: '#FF5C00',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                lineHeight: '15px',
                                                textTransform: 'uppercase',
                                                lineSpacing: '0.02em'
                                              }}
                                            >
                                              remove
                                              </Typography>
                                          </Button>

                                          <Button
                                            size="large"
                                            className={classes.button}
                                            onClick={handleDialogClose}
                                            disableRipple
                                            style={{
                                              border: '1px solid #FF5C00',
                                              backgroundColor: '#FF5C00',
                                              marginLeft: '20px'
                                            }}
                                          >
                                            <Typography
                                              className={classes.typography}
                                              style={{
                                                textAlign: 'center',
                                                color: '#FFFFFF',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                lineHeight: '15px',
                                                textTransform: 'uppercase',
                                                lineSpacing: '0.02em'
                                              }}
                                            >
                                              cancel
                                              </Typography>
                                          </Button>
                                        </Box>
                                      </DialogActions>
                                    </Dialog>
                                  </TableCell>
                                </Hidden>
                              </TableRow>
                            </Fragment>
                          )
                        })
                    }
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 20, 30, 40]}
                  component="div"
                  count={
                    (search.length < 1 && displayFilter.length === 0)
                      ? [...products.wholesaleProducts.rows, ...products.products.rows].filter(item => item.status === 'pending').length
                      : search.length >= 1 ? displaySearch.length
                        : displayFilter.length > 0 ? displayFilter.length
                          : 0
                  }
                  page={page}
                  style={{ paddingRight: 30 }}
                  onChangePage={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onChangeRowsPerPage={handleRowsChangePerPage}
                />
              </TableContainer>
            </Box>
      }
    </TableLayout>
  )
}
