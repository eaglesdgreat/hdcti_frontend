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
  NativeSelect,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import useSWR from 'swr'
import axios from 'axios';
import ReactLoading from 'react-loading'
import { useSnackbar } from 'notistack'

import { allCategories } from './../../../lib/category'
import TableLayout from '../../../Components/Tables'
import { useStateValue } from '../../../StateProviders';
import { isAuthenticated } from '../../../lib/auth.helper'
import PrivateRoute from '../../../Components/PrivateRoute'



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

  variantSize: {
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row'
    }
  }
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
  const { pid, merchant } = router.query

  const url = `${process.env.BACKEND_URL}/api/product/${pid}?merchant=${merchant}`

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



function EditProduct() {
  const router = useRouter()
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar();
  const { pid, merchant } = router.query

  let weight = 'N/A'

  // Fetching data from backend with SWR
  const { product, isLoading, isError, productMutate } = productData()
  // console.log(product)

  // console.log(allCategories.map(category => category.sub.filter(s => s.sub).map((sub) => sub.sub.map(s => s))))

  const [item, setItem] = useState({})
  const [logo, setLogo] = useState('')
  const [loading, setLoading] = useState(false);
  const editorRef = useRef()
  const [editorloaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    // console.log(allCategories.map(category => category.sub
    //   .map(subCategory => { return subCategory.name })))

    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target
    setItem({ ...item, [name]: value })
    // console.log(item)

    productMutate((data) => {
      return {
        ...product,
        product: { ...data.product, [name]: value }
      }
    }, false)
    // console.log(product.product)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = { ...item }
    // console.log(body)


    const token = isAuthenticated().authToken
    const url = `${process.env.BACKEND_URL}/api/update-product/${pid}?platform=${merchant}`

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
        // router.push(`/products/editproduct/viewproduct/${pid}?merchant=${merchant}`)
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
                <CircularProgress style={{ 'color': '#FF5C00' }} />
              </Box> : product &&
              <Box
                display="flex"
                style={{
                  padding: 30
                }}
              >
                <Grid container spacing={1}>
                  <Grid item md={6} lg={6} xl={6}>
                    <Box
                      display="flex"
                      flexDirection="column"
                    // className={classes.variantSize}
                    >
                      <Box
                        display="flex"
                        // component="span"
                        style={{
                          width: '192px',
                          height: '192px',
                          padding: 30,
                        }}
                      >
                        <img
                          src={logo ? logo
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
                                  {/* <img style={{ width: '65%' }} src={variant.images[0]} alt="item-log" /> */}
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
                          marginTop: '20px'
                        }}
                      >
                        <Typography
                          className={classes.typography}
                          style={{
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
                          href="/users/vendor/editvendor/[edit]"
                          as={`/users/vendor/editvendor/${product.product.userId}`}
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
                                  lineHeight: '15px',
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
                      style={{
                        marginTop: '-20px',
                        marginLeft: '-90px',
                        width: '100%'
                      }}
                    >
                      <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                            <FormControl className={classes.formControl} style={{ width: '100%' }}>
                              <BootstrapInput
                                id="name"
                                value={product.product.name}
                                name="name"
                                onChange={handleChange}
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
                              Category
                            </Typography>
                            <FormControl variant="outlined" style={{ width: '100%' }} className={classes.formControl}>
                              <Select
                                id="category"
                                value={product.product.category}
                                name="category"
                                displayEmpty={true}
                                native={false}
                                renderValue={(value) => value}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                              >
                                {allCategories.map((category, i) => (
                                  <MenuItem key={category.id} value={category.name}>
                                    <Typography
                                      noWrap
                                      className={classes.typography}
                                      style={{
                                        fontSize: '15px',
                                        lineHeight: '18px',
                                        color: '#242120'
                                      }}
                                    >
                                      {category.name}
                                    </Typography>
                                  </MenuItem>
                                ))}
                              </Select>
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
                              Sub Category
                            </Typography>
                            <FormControl variant="outlined" style={{ width: '100%' }} className={classes.formControl}>
                              <Select
                                id="sub-category"
                                value={product.product.subCategory}
                                name="subCategory"
                                displayEmpty={true}
                                native={false}
                                renderValue={(value) => value}
                                onChange={handleChange}
                                input={<BootstrapInput/>}
                              >
                                {allCategories.map(category => category.sub.map((subCategory, i) => (
                                  <MenuItem key={subCategory.id} value={subCategory.name}>
                                    <Typography
                                      noWrap
                                      className={classes.typography}
                                      style={{
                                        fontSize: '15px',
                                        lineHeight: '18px',
                                        color: '#242120'
                                      }}
                                    >
                                      {subCategory.name}
                                    </Typography>
                                  </MenuItem>
                                )))}
                              </Select>
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
                              Brand Name
                            </Typography>
                            <FormControl style={{ width: '100%' }} className={classes.formControl}>
                              <BootstrapInput
                                id="brand-name"
                                value={product.product.brand}
                                name="brand"
                                onChange={handleChange}
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
                              Second Sub Category
                            </Typography>
                            <FormControl variant="outlined" style={{ width: '100%' }} className={classes.formControl}>
                              <Select
                                id="sub-2-category"
                                value={product.product.sub2Category}
                                name="sub2Category"
                                displayEmpty={true}
                                native={false}
                                renderValue={(value) => value}
                                onChange={handleChange}
                                input={<BootstrapInput />}
                              >
                                {
                                  allCategories.map(category => category.sub
                                    .filter(subCategory => subCategory.sub)
                                    .map(subCategory => subCategory.sub.map(sub2Category => (
                                      <MenuItem key={sub2Category.id} value={sub2Category.name}>
                                        <Typography
                                          noWrap
                                          className={classes.typography}
                                          style={{
                                            fontSize: '15px',
                                            lineHeight: '18px',
                                            color: '#242120'
                                          }}
                                        >
                                          {sub2Category.name}
                                        </Typography>
                                      </MenuItem>
                                    ))))
                                }
                              </Select>
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
                              Weight (in kg)
                            </Typography>
                            <FormControl style={{ width: '60%' }} className={classes.formControl}>
                              <BootstrapInput
                                id="weight"
                                value={product.product.weight ? product.product.weight : weight}
                                name="weight"
                                onChange={handleChange}
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
                              Warranty (in Months)
                            </Typography>
                            <FormControl style={{ width: '40%' }} className={classes.formControl}>
                              <BootstrapInput
                                id="warranty"
                                value={product.product.warranty}
                                name="warranty"
                                onChange={handleChange}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>

                        {editorloaded && (
                          <>
                            <Typography
                              className={classes.typography}
                              style={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '16px',
                                color: '#242120',
                                marginBottom: '10px',
                                marginTop: '30px'
                              }}
                            >
                              Description
                            </Typography>
                            <CKEditor
                              editor={ClassicEditor}
                              data={product.product.description}
                              onInit={editor => {
                                editor.ui.getEditableElement().parentElement.insertBefore(
                                  editor.ui.view.toolbar.element,
                                  editor.ui.getEditableElement()
                                );
                              }}
                              onChange={(event, editor) => {
                                const editData = editor.getData();
                                // console.log(editData)
                                setItem({ ...item, description: editData })
                                productMutate((data) => {
                                  return {
                                    ...data,
                                    product: { ...product.product, description: editData }
                                  }
                                }, false)
                              }}
                            />

                            <Typography
                              className={classes.typography}
                              style={{
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '16px',
                                color: '#242120',
                                marginBottom: '10px',
                                marginTop: '30px'
                              }}
                            >
                              Specification
                            </Typography>
                            <CKEditor
                              editor={ClassicEditor}
                              data={product.product.specification}
                              onInit={editor => {
                                editor.ui.getEditableElement().parentElement.insertBefore(
                                  editor.ui.view.toolbar.element,
                                  editor.ui.getEditableElement()
                                );
                              }}
                              onChange={(event, editor) => {
                                const getData = editor.getData();
                                // console.log(getData)
                                setItem({ ...item, specification: getData })
                                productMutate((data) => {
                                  return {
                                    ...data,
                                    product: { ...product.product, specification: getData }
                                  }
                                }, false)
                              }}
                            />
                          </>
                        )}

                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          style={{
                            marginTop: '25px',
                          }}
                        >
                          <Button
                            size="small"
                            type="submit"
                            className={classes.button}
                            onClick={(e) => {
                              handleSubmit(e)
                            }}
                            disableRipple
                            style={{
                              border: '1px solid #FF5C00',
                              backgroundColor: '#FF5C00',
                              marginRight: '15px',
                              borderRadius: '4px',
                              width: '25%',
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
                                save update
                            </Typography>
                            }
                          </Button>

                          <Link href="/products/pending">
                            <Button
                              size="small"
                              className={classes.button}
                              // onClick={router.push('/')}
                              disableRipple
                              style={{
                                border: '1px solid #FF5C00',
                                borderRadius: '4px',
                                width: '25%',
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

                          <Link
                            href={`/products/editproduct/variants/[vid]?merchant=${merchant}`}
                            as={`/products/editproduct/variants/${pid}?merchant=${merchant}`}
                          >
                            <Button
                              size="small"
                              type="submit"
                              className={classes.button}
                              disableRipple
                              style={{
                                border: '1px solid #FF5C00',
                                backgroundColor: '#FF5C00',
                                marginLeft: '10px',
                                borderRadius: '4px',
                                width: '25%',
                                height: '35px'
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
                                next
                              </Typography>
                            </Button>
                          </Link>
                        </Box>
                      </form>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
        }
      </Box>
    </TableLayout>
  )
}


export default EditProduct
