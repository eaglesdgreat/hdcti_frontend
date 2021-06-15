import React, { useEffect, useState, useRef, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Divider,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
import {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker
} from 'react-color'
import { useSnackbar } from 'notistack'

import TableLayout from '../../../../Components/Tables'
import { useStateValue } from '../../../../StateProviders';
import { isAuthenticated } from '../../../../lib/auth.helper'
import PrivateRoute from '../../../../Components/PrivateRoute'



const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: '15px',
    lineHeight: '18px',
    fontStyle: 'normal',
    fontWeight: '500',
    padding: '10px 0px 10px 12px',
    color: '#242120',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Roboto',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#FF5C00',
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(InputBase);



const BootstrapInput2 = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#F8F8F8',
    // border: '1px solid #ced4da',
    fontSize: '15px',
    lineHeight: '18px',
    fontStyle: 'normal',
    fontWeight: '400',
    padding: '10px 0px 10px 10px',
    color: '#242120',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: 'Roboto',
    '&:focus': {
      borderRadius: 4,
      borderColor: '#FF5C00',
      backgroundColor: '#F8F8F8',
    },
  },
}))(InputBase);



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(8),
      width: '25ch',
    },
  },
  table: {
    borderRadius: '10px',
    border: '1px solid #EAEAEA',
    boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.05)'
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
  margin: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(2),
    // minWidth: 175,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(2),
    fontSize: "14px"
  },
}))



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


const fetcher = async (...arg) => {
  const [url, token] = arg

  // const {url, token} = arg

  const response = await axios.get(
    url,
    { headers: { authenticate: token } }
  )

  return response.data
}


const productData = () => {
  const router = useRouter()
  const { vid, merchant } = router.query

  const url = `${process.env.BACKEND_URL}/api/product/${vid}?merchant=${merchant}`

  const token = isAuthenticated().authToken

  const options = {
    shouldRetryOnError: false,
    // revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }

  const { data, error, mutate: productMutate } = useSWR([url, token], fetcher, { ...options })

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
    productMutate
  }
}



export default function Variants() {
  const classes = useStyles()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();
  const { vid, merchant } = router.query

  const { product, isLoading, isError, productMutate } = productData()
  // console.log(product, isLoading, isError)

  const [state, setState] = useState({})
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(false);

  const handleChange = (idx) => (event) => {
    const { name, value } = event.target
    setState({ ...state, [name]: value })
    setId(idx)
    // console.log(id)

    productMutate((data) => {
      let prodVaraints = JSON.parse(data.product.varieties)

      prodVaraints[idx] = { ...prodVaraints[idx], [name]: value }
      prodVaraints = JSON.stringify(prodVaraints)
      // console.log(prodVaraints)

      return {
        ...product,
        product: {
          ...data.product,
          varieties: prodVaraints
        }
      }
    }, false)
  }

  const handleChangeComplete = (idx) => (color, event) => {
    setState({ ...state, colorName: color.hex })

    productMutate((data) => {
      let prodVaraints = JSON.parse(data.product.varieties)

      prodVaraints[idx] = { ...prodVaraints[idx], colorName: color.hex }
      prodVaraints = JSON.stringify(prodVaraints)
      // console.log(prodVaraints)

      return {
        ...product,
        product: {
          ...data.product,
          varieties: prodVaraints
        }
      }
    }, false)
    // console.log(state)
  }

  const clickSubmit = async (e) => {
    e.preventDefault()

    let prodVaraints = JSON.parse(product.product.varieties)

    prodVaraints[id] = { ...prodVaraints[id], ...state }
    // prodVaraints= JSON.stringify(prodVaraints)

    const body = { varieties: prodVaraints }
    // console.log(body)

    const token = isAuthenticated().authToken
    const url = `${process.env.BACKEND_URL}/api/update-product/${vid}?platform=${merchant}`

    try {
      setLoading(true);

      const response = await axios.patch(
        url,
        body,
        { headers: { authenticate: token } },
      )

      // console.log(response)
      if (response.data.success) {
        enqueueSnackbar(`${response.data.success.message}`, {
          variant: 'success',
        });

        setLoading(false);
        // router.push('/products/pending')
      }
    } catch (e) {
      console.log(e)

      setLoading(false);

      if (e.response) {
        enqueueSnackbar(`${e.response.data.errors.message}. Try again`, {
          variant: 'error',
        });
      }
    }
  }

  return (
    <TableLayout tableNav={tableNav} name="Products">
      <Box
        display="flex"
        flexDirection="column"
        style={{
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <Box display="flex">
          <Button
            size="large"
            className={classes.button}
            disableRipple
            onClick={() => router.back()}
            style={{ marginLeft: '20px' }}
          >
            <img src="/vectorleft.svg" alt="arrow-left" />
            <Typography
              className={classes.typography}
              style={{
                textAlign: 'center',
                color: '#242120',
                fontSize: '13px',
                fontWeight: 'normal',
                lineHeight: '15px',
                textTransform: 'uppercase',
                lineSpacing: '0.02em',
                marginLeft: '10px'
              }}
            >
              back
            </Typography>
          </Button>
        </Box>

        {
          isError ? (<PrivateRoute isError={isError} />)
            :
            isLoading ?
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
                <CircularProgress size="5em" style={{ color: '#FF5C00' }} />
              </Box> : product && product.product && product.product.varieties &&
              (JSON.parse(product.product.varieties).map((variant, i) => (
                <Fragment key={i}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    style={{
                      paddingLeft: 45,
                      paddingTop: 20,
                      paddingRight: 45,
                      PaddingBottom: 0,
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      style={{
                        border: '1px solid #EAEAEA',
                        borderRadius: '4px',
                      }}
                    >
                      <Box
                        display="flex"
                        style={{
                          backgroundColor: '#F9F9FB',
                          padding: 10,
                        }}
                      >
                        <Typography
                          className={classes.typography}
                          style={{
                            textAlign: 'center',
                            color: '#242120',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '16px',
                            textTransform: 'uppercase',
                            lineSpacing: '0.02em',
                            marginLeft: '25px'
                          }}
                        >
                          variant {i + 1}
                        </Typography>
                      </Box>

                      <Box
                        display="flex"
                        style={{
                          paddingTop: '3%',
                          paddingBottom: '3%',
                          paddingLeft: 35,
                        }}
                      >
                        <Box
                          display="flex"
                          style={{
                            paddingRight: 30,
                          }}
                        >
                          <Grid container spacing={6}>
                            {variant.images.map((imgs, indx) => (
                              <Fragment key={indx}>
                                <Grid item md={6} lg={6} xl={6}>
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    style={{
                                      width: '64px',
                                      height: '64px',
                                      padding: 5,
                                    }}
                                  >
                                    <img style={{ width: '75%' }} src={imgs} alt="item-log" />
                                  </Box>
                                </Grid>

                                <Grid item md={6} lg={6} xl={6}>
                                  <FormControl className={classes.margin} style={{ width: '100%' }}>
                                    {/* <BootstrapInput2
                                      // id="image-name"
                                      value={imgs}
                                      name="imageName"
                                      onChange={handleChange(i)}
                                    /> */}
                                    <Box
                                      style={{
                                        backgroundColor: variant.colorName,
                                        padding: 20,
                                      }}
                                    ></Box>
                                  </FormControl>
                                </Grid>
                              </Fragment>
                            ))}
                          </Grid>
                        </Box>

                        <Box
                          display="flex"
                          style={{
                            paddingLeft: 40,
                            paddingRight: 150,
                          }}
                        >
                          <form className={classes.form} noValidate onSubmit={clickSubmit}>
                            <Grid container spacing={2}>
                              <Grid item md={6} lg={6} xl={6}>
                                <Typography
                                  className={classes.typography}
                                  style={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    color: '#242120',
                                    marginBottom: '-10px',
                                  }}
                                >
                                  Size
                              </Typography>
                                <FormControl style={{ width: '50%' }} className={classes.formControl}>
                                  <BootstrapInput
                                    // id="size"
                                    value={variant.size}
                                    name="size"
                                    onChange={handleChange(i)}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item md={6} lg={6} xl={6}>
                                <Typography
                                  className={classes.typography}
                                  style={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    color: '#242120',
                                    marginBottom: '-10px',
                                    marginTop: '10px',
                                  }}
                                >
                                  Quantity
                              </Typography>
                                <FormControl style={{ width: '50%' }} className={classes.formControl}>
                                  <BootstrapInput
                                    // id="quantity"
                                    value={variant.quantity}
                                    name="quantity"
                                    onChange={handleChange(i)}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item md={6} lg={6} xl={6}>
                                <Typography
                                  className={classes.typography}
                                  style={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    color: '#242120',
                                    marginBottom: '-10px',
                                  }}
                                >
                                  Colour
                              </Typography>
                                <FormControl style={{ width: '80%' }} className={classes.formControl}>
                                  {/* <BootstrapInput
                                    // id="color-name"
                                    value={variant.colorName}
                                    name="colorName"
                                    onChange={handleChange(i)}
                                  /> */}
                                  <SketchPicker
                                    color={variant.colorName}
                                    onChangeComplete={handleChangeComplete(i)}
                                  />
                                </FormControl>
                              </Grid>

                              {/* <Grid item md={6} lg={6} xl={6}>
                                <Typography
                                  className={classes.typography}
                                  style={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    color: '#242120',
                                    marginBottom: '-10px',
                                    marginTop: '10px',
                                  }}
                                >
                                  Vendor's Price
                              </Typography>
                                <FormControl style={{ width: '80%' }} className={classes.formControl}>
                                  <BootstrapInput2
                                    // id="vendor-price"
                                    disabled
                                    value={state.vendorPrice}
                                    name="vendorPrice"
                                    onChange={handleChange(i)}
                                  // InputProps={{
                                  //     fontWeight: '500'
                                  // }}
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12}>
                                <Typography
                                  className={classes.typography}
                                  style={{
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    lineHeight: '16px',
                                    color: '#242120',
                                    marginBottom: '-10px',
                                    marginTop: '10px',
                                  }}
                                >
                                  Customer's Price
                              </Typography>
                                <FormControl style={{ width: '90%' }} className={classes.formControl}>
                                  <BootstrapInput2
                                    // id="customer-price"
                                    disabled
                                    value={state.customerPrice}
                                    name="customerPrice"
                                    onChange={handleChange(i)}
                                  />
                                </FormControl>
                              </Grid> */}
                            </Grid>
                          </form>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Fragment>
              )))
        }

        <Box
          display="flex"
          justifyContent="flex-end"
          style={{
            marginTop: '25px',
            paddingRight: 40,
          }}
        >
          <Link href="/products/pending">
            <Button
              size="small"
              className={classes.button}
              // onClick={router.push('/')}
              disableRipple
              style={{
                border: '1px solid #FF5C00',
                borderRadius: '4px',
                width: '11%',
                height: '35px'
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
                cancel
              </Typography>
            </Button>
          </Link>

          {/* <Link href="/products/pending"> */}
          <Button
            size="small"
            className={classes.button}
            onClick={clickSubmit}
            disableRipple
            style={{
              border: '1px solid #FF5C00',
              backgroundColor: '#FF5C00',
              marginLeft: '10px',
              borderRadius: '4px',
              width: '11%',
              height: '35px'
            }}
          >
            {
              loading
                ? <CircularProgress size="2em" style={{ color: '#FFFFFF' }} />
                :
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
                  save
              </Typography>
            }
          </Button>
          {/* </Link> */}
        </Box>
      </Box>
    </TableLayout>
  )
}