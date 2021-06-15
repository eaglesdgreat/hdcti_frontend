import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
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
import { useSnackbar } from 'notistack'

import TableLayout from './../../../../Components/Tables'
// import { useStateValue } from './../../../StateProviders';
import { isAuthenticated } from './../../../../lib/auth.helper'
import PrivateRoute from './../../../../Components/PrivateRoute'




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
    fontSize: '0.937rem',
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



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginLeft: theme.spacing(8),
      width: '25ch',
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
  button: {
    '&:hover,&:focus': {
      backgroundColor: '#ffffff00',
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(2),
    fontSize: "14px"
  },
  formControl: {
    marginTop: theme.spacing(2),
    // minWidth: 175,
  },
  image: {
    maxWidth: '80%',
    maxHeight: 'auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '80%',
      maxHeight: 'auto'
    },
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


const stripHtmlTags = (str) => {
  if ((str === null) || (str === '')) {
    return false
  } else {
    str = str.toString()
    return str.replace(/<[^>]*>|&nbsp;/g, '\r\n')
  }
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
  const router = useRouter()
  const { view, merchant } = router.query

  const url = `${process.env.BACKEND_URL}/api/product/${view}?merchant=${merchant}`

  const token = isAuthenticated().authToken

  const options = {
    // shouldRetryOnError: false,
  }

  const { data, error, mutate: productMutate } = useSWR([url, token], fetcher, options)

  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
    productMutate,
  }
}



export default function EditProduct() {
  const router = useRouter()
  const { view, merchant } = router.query
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar();

  const { product, isLoading, isError, productMutate } = productData()
  // console.log(product)

  const [logo, setLogo] = useState('')
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = { status: 'approved' }
    // console.log(body)


    const token = isAuthenticated().authToken
    const url = `${process.env.BACKEND_URL}/api/update-product/${view}?platform=${merchant}`

    try {
      setLoading(true);
      // await productMutate(async(data) => {
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

        productMutate((data) => {
          return {
            ...product,
            product: { ...data.product, status: body.status }
          }
        }, false)
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
          paddingTop: 20,
          paddingBottom: 50,
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
                lineHeight: '0.937rem',
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
            <>
              <Box
                display="flex"
                justifyContent="flex-end"
                style={{
                  // margin: 'auto',
                  paddingRight: 120,
                }}
              >
                <Link
                  href={`/products/editproduct/[pid]?merchant=${merchant}`}
                  as={`/products/editproduct/${view}?merchant=${merchant}`}
                >
                  <Button
                    size="large"
                    className={classes.button}
                    disableRipple
                    style={{
                      // marginLeft: '20px' 
                      backgroundColor: 'rgba(225, 92, 1, 0.08)',
                      borderRadius: '8px',
                      padding: 10
                    }}
                  >
                    <img src="/pen.svg" alt="edit-pen" />
                    <Typography
                      className={classes.typography}
                      style={{
                        // textAlign: 'center',
                        color: '#FF5C00',
                        fontSize: '13px',
                        fontWeight: '500',
                        lineHeight: '0.937rem',
                        textTransform: 'uppercase',
                        lineSpacing: '0.05em',
                        marginLeft: '10px'
                      }}
                    >
                      edit product
                    </Typography>
                  </Button>
                </Link>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                style={{
                  padding: 30
                }}
              >
                <Grid container spacing={1}>
                  {isLoading ?
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
                    </Box> : product &&
                    <>
                      <Grid item md={6} lg={6} xl={6}>
                        <Box
                          display="flex"
                          flexDirection="column"
                        >
                          <Box
                            display="flex"
                            flexDirection="column"
                            style={{ paddingBottom: '20px' }}
                          >
                            <Typography
                              className={classes.typography}
                              style={{
                                fontWeight: '500',
                                fontSize: '0.937rem',
                                lineHeight: '18px',
                                color: '#242120',
                                // marginBottom: '-10px',
                              }}
                            >
                              Product Status
                            </Typography>

                            <Typography
                              className={classes.typography}
                              style={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '16px',
                                color: '#242120',
                                // marginBottom: '-10px',
                              }}
                            >
                              {product.product.status}
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            // component="span"
                            style={{
                              width: '192px',
                              height: '192px',
                              padding: 30,
                            }}
                          >
                            <img src={logo ? logo
                              : JSON.parse(product.product.varieties)[0].images[0]}
                              alt="item-logo" className={classes.image}
                            />
                          </Box>

                          <Box
                            display="flex"
                            flexDirection="column"
                            style={{
                              border: '1px solid #EAEAEA',
                              width: '60%',
                              borderRadius: '5px',
                              paddingBottom: 15,
                            }}
                          >
                            <Typography
                              className={classes.typography}
                              style={{
                                textAlign: 'left',
                                color: '#242120',
                                fontSize: '11px',
                                fontWeight: 'normal',
                                lineHeight: '13px',
                                textTransform: 'uppercase',
                                lineSpacing: '0.05em',
                                paddingBottom: 5,
                                padding: 10,
                                paddingLeft: 15,
                              }}
                            >
                              variant(s)
                          </Typography>

                            <Divider light />

                            {
                              JSON.parse(product.product.varieties).map((variant, i) => (
                                <Grid container spacing={2} key={i}>
                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Box
                                      display="flex"
                                      justifyContent="center"
                                      style={{
                                        margin: 'auto',
                                        width: '55px',
                                        height: '55px',
                                        paddingTop: '4%',
                                        paddingBottom: '4%',
                                        marginTop: '10px',
                                      }}
                                    >
                                      <Button
                                        disableRipple
                                        className={classes.button}
                                        onClick={() => {
                                          setLogo(variant.images[0])
                                        }}
                                      >
                                        <img style={{ width: '65%' }} src={variant.images[0]} alt="item-log" />
                                      </Button>
                                    </Box>
                                  </Grid>

                                  <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <Typography
                                      className={classes.typography}
                                      style={{
                                        color: 'rgba(0, 0, 0, 0.8)',
                                        fontSize: '12px',
                                        fontWeight: 'normal',
                                        lineHeight: '18px',
                                        marginTop: '10px',
                                      }}
                                    >
                                      size: {variant.size}<br />
                                    colour:
                                    <Box
                                        component="span"
                                        style={{
                                          backgroundColor: variant.colorName,
                                          paddingTop: 1.5,
                                          paddingBottom: 1.5,
                                          paddingRight: 30,
                                        }}
                                      ></Box><br />
                                    Stock: {variant.quantity}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              ))
                            }
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                            style={{
                              width: '60%',
                              border: '1px solid #EAEAEA',
                              paddingTop: '3%',
                              paddingBottom: '4%',
                              borderRadius: '5px',
                              paddingLeft: 20,
                              // paddingRight: 10,
                              marginTop: '20px'
                            }}
                          >
                            <Typography
                              className={classes.typography}
                              style={{
                                // textAlign: 'left',
                                color: '#242120',
                                fontSize: '11px',
                                fontStyle: 'Regular',
                                fontWeight: 'normal',
                                lineHeight: '13px',
                                textTransform: 'uppercase',
                                lineSpacing: '0.05em',
                              }}
                            >
                              sold by
                          </Typography>

                            <Link
                              href="/users/vendor/[view]"
                              as={`/users/vendor/${product.product.userId}`}
                            >
                              <a style={{ textDecoration: 'none' }}>
                                <Box
                                  display="flex"
                                  component="span"
                                  style={{
                                    paddingTop: 10,
                                    paddingRight: 13,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      textAlign: 'left',
                                      color: '#FF5C00',
                                      fontSize: '13px',
                                      fontWeight: '500',
                                      lineHeight: '0.937rem',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {product.product.user.businessName}
                                  </Typography>
                                  <img src="/chevronleft.svg" alt="arrow-right" />
                                </Box>
                              </a>
                            </Link>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item md={6} lg={6} xl={6}>
                        <Box
                          display="flex"
                          justifyContent="flex-start"
                          style={{
                            marginTop: '-20px',
                            // border: '1px solid black',
                            marginLeft: '-90px',
                            // paddingRight: 40,
                            width: '100%'
                          }}
                        >
                          <form className={classes.form} noValidate>
                            <Grid container spacing={3}>
                              <Grid item xs={12}>
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
                                  Name
                            </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '100%',
                                    whiteSpace: 'initial',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 15,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {product.product.name}
                                  </Typography>
                                </Box>
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
                                  Category
                              </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '100%',
                                    whiteSpace: 'initial',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 15,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {product.product.category}
                                  </Typography>
                                </Box>
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
                                  Sub Category
                              </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '100%',
                                    whiteSpace: 'initial',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 15,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {product.product.subCategory}
                                  </Typography>
                                </Box>
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
                                  Brand Name
                              </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '100%',
                                    whiteSpace: 'initial',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 15,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {product.product.brand}
                                  </Typography>
                                </Box>
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
                                  Second Sub Category
                              </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '100%',
                                    whiteSpace: 'initial',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 15,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {product.product.sub2Category}
                                  </Typography>
                                </Box>
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
                                  Weight (in kg)
                              </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '60%',
                                    whiteSpace: 'initial',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 15,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {product.product.weight ? product.product.weight : 'N/A'}
                                  </Typography>
                                </Box>
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
                                  Warranty (in Months)
                              </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '30%',
                                    whiteSpace: 'initial',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 15,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {product.product.warranty}
                                  </Typography>
                                </Box>
                                {/* <FormControl style={{ width: '30%' }} className={classes.formControl}>
                            <BootstrapInput
                              disabled
                              id="warranty"
                              value={product.product.warranty}
                              name="warranty"
                              // onChange={handleChange}
                            />
                          </FormControl> */}
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
                                  }}
                                >
                                  Description
                              </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '100%',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 50,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {stripHtmlTags(product.product.description)}
                                  </Typography>
                                </Box>
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
                                  }}
                                >
                                  Specification
                              </Typography>
                                <Box
                                  display="flex"
                                  style={{
                                    width: '100%',
                                    border: '1px solid #EAEAEA',
                                    borderRadius: '4px',
                                    marginTop: '0.937rem',
                                    paddingTop: 10,
                                    paddingBottom: 50,
                                    paddingLeft: 10,
                                  }}
                                >
                                  <Typography
                                    className={classes.typography}
                                    style={{
                                      fontWeight: '500',
                                      fontSize: '0.937rem',
                                      lineHeight: '18px',
                                      color: '#242120',
                                      marginBottom: '-10px',
                                    }}
                                  >
                                    {stripHtmlTags(product.product.specification)}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </form>
                        </Box>
                      </Grid>

                      {/* <Grid item>
                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          style={{
                            // margin: 'auto',
                            paddingRight: 120,
                          }}
                        >
                          <Button
                            size="large"
                            className={classes.button}
                            disableRipple
                            onClick={handleSubmit}
                            style={{
                              // marginLeft: '20px' 
                              backgroundColor: 'rgba(225, 92, 1, 0.08)',
                              borderRadius: '8px',
                              padding: 10
                            }}
                          >
                            <Typography
                              className={classes.typography}
                              style={{
                                // textAlign: 'center',
                                color: '#FF5C00',
                                fontSize: '13px',
                                fontWeight: '500',
                                lineHeight: '0.937rem',
                                textTransform: 'uppercase',
                                lineSpacing: '0.05em',
                                marginLeft: '10px'
                              }}
                            >
                              approve product
                            </Typography>
                          </Button>
                        </Box>
                      </Grid> */}
                    </>
                  }

                </Grid>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  style={{
                    // margin: 'auto',
                    paddingRight: 120,
                    paddingTop: 40,
                  }}
                >
                  <Button
                    size="large"
                    className={classes.button}
                    disableRipple
                    onClick={handleSubmit}
                    style={{
                      // marginLeft: '20px' 
                      backgroundColor: 'rgba(225, 92, 1, 0.08)',
                      borderRadius: '8px',
                      padding: 10
                    }}
                  >
                    {
                      loading
                        ? <CircularProgress size="2em" style={{ color: '#FF5C00' }} />
                        :
                        <Typography
                          className={classes.typography}
                          style={{
                            // textAlign: 'center',
                            color: '#FF5C00',
                            fontSize: '13px',
                            fontWeight: '500',
                            lineHeight: '0.937rem',
                            textTransform: 'uppercase',
                            lineSpacing: '0.05em',
                            marginLeft: '10px'
                          }}
                        >
                          approve product
                        </Typography>
                    }
                  </Button>
                </Box>
              </Box>
            </>
        }
      </Box>
    </TableLayout>
  )
}