import React, {useState, useEffect, Fragment} from 'react'
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Grid,
  TextField,
  Alert,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  CircularProgress,
  InputAdornment
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import moment from "moment";
import clsx from 'clsx'


const useStyles = makeStyles((theme) => ({
  firstBox: {
    background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box',
    border: '1px solid var(--unnamed - color - e0e0e0)',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    border: '1px solid #E0E0E0',
    borderRadius: '5px',
    opacity: 1,
    height: '500px',
    [theme.breakpoints.down("sm")]: {
      height: '840px',
    },
  },
  form: {
    width: "95%", // Fix IE 11 issue.
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(2),
      width: '100%',
    },
  },
  itemGrid: {
    width: "100%",
  },
  typography2: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal medium 14px/21px Poppins",
    letterSpacing: " 0px",
    color: "#0D0D0D",
    // textTransform: "capi",
    opacity: 1,
  },
  typography: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 12px/14px Helvetica Neue",
    letterSpacing: " 0px",
    color: "#0D0D0DC7",
    textTransform: "uppercase",
    opacity: 0.63,
  },
  formTypo: {
    marginBottom: "11px",
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: "100%",
    // minWidth: 175,
  },
  mainTypo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-16)/var(--unnamed-line-spacing-19) var(--unnamed-font-family-helveticaneue-medium)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 16px/19px HelveticaNeue-Medium",
    letterSpacing: "0px",
    color: "#0D0D0DA0",
    textTransform: "capitalize",
    opacity: 1,
    fontWeight: 600,
  },
  roots: {
    // background: "blue",
    border: "1px solid #979797",
    borderRadius: "5px",
    width: "80%",
    height: "32px",
  },
  input: {
    color: "var(--unnamed-color-868d96)",
    fontfamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
    marginTop: "-10px",
  },
  cssLabel: {
    color: " #007945",
    fontfamily: "Century Gothic",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "28px",
    letterSpacing: "0.1px",
  },
  cssOutlinedInput: {
    whiteSpace: "initial",
    "&$cssFocused $notchedOutline": {
      borderColor: "#FFFFFF00",
    },
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#FFFFFF00 !important",
  },
  formBox: {
    paddingTop: '30px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '0px',
      paddingLeft: '21px',
    }
  }
}))



export default function PersonalDetails({ member, isError, isLoading }) {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleSubmit = () => {
    console.log('submitted')
  }

  return (
    <Fragment>
      <Box className={classes.firstBox}>
        <Box display="flex" justifyContent="space-between" style={{ padding: '20px' }}>
          <Typography className={classes.mainTypo}>
            Personal Details
          </Typography>

          {/* <IconButton>
            <EditIcon />
          </IconButton> */}
        </Box>

        <Divider light />

        <Box className={classes.formBox}>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={4}>
              <Grid
                className={classes.itemGrid}
                item
                md={6}
                lg={6}
                xl={6}
              >
                <Typography
                  className={clsx(classes.typography, classes.formTypo)}
                  variant="body1"
                  noWrap={true}
                  gutterBottom
                >
                  Name Of Husband/Father
                </Typography>

                {isError ? (
                  <Typography className={classes.typography3}>
                    Name Unavailable
                  </Typography>
                ) : isLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  member && member.personal ?(
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      {member.personal.nameOfHusband}
                    </Typography>
                  ) : (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      Name not Selected
                    </Typography>
                  )
                )}

                {/* {
                  edit ?
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="none"
                      className={classes.roots}
                      value={'state'}
                      // onChange={(event) => onSearchChange(event)}
                      // onKeyPress={enterSearch}
                      // onKeyUp={searchResult}
                      // placeholder="Search Groups"
                      id="input-edit-text"
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src="/search.svg" alt="search" />
                            <EditIcon style={{ color: "#72A624" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    :
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      Victor Test
                    </Typography>
                } */}
              </Grid>

              <Grid
                className={classes.itemGrid}
                item
                md={6}
                lg={6}
                xl={6}
              >
                <Typography
                  className={clsx(classes.typography, classes.formTypo)}
                  variant="body1"
                  noWrap={true}
                  gutterBottom
                >
                  Name Of Next Of Kin
                </Typography>

                {isError ? (
                  <Typography className={classes.typography3}>
                    Name Unavailable
                  </Typography>
                ) : isLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  member && member.personal ?(
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      {member.personal.nextOfKin}
                    </Typography>
                  ) : (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      Name not Selected
                    </Typography>
                  )
                )}

                {/* {
                  edit ?
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="none"
                      className={classes.roots}
                      value={'state'}
                      // onChange={(event) => onSearchChange(event)}
                      // onKeyPress={enterSearch}
                      // onKeyUp={searchResult}
                      // placeholder="Search Groups"
                      id="input-edit-text"
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src="/search.svg" alt="search" />
                            <EditIcon style={{ color: "#72A624" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    :
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      Victor Test
                    </Typography>
                } */}
              </Grid>

              <Grid
                className={classes.itemGrid}
                item
                md={6}
                lg={6}
                xl={6}
              >
                <Typography
                  className={clsx(classes.typography, classes.formTypo)}
                  variant="body1"
                  noWrap={true}
                  gutterBottom
                >
                  Phone Number Of Next Of Kin
                </Typography>

                {isError ? (
                  <Typography className={classes.typography3}>
                    Phone Number Unavailable
                  </Typography>
                ) : isLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  member && member.personal ? (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      {member.personal.nextOfKinMobile}
                    </Typography>
                  ) : (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      Phone Number not Selected
                    </Typography>
                  )
                )}

                {/* {
                  edit ?
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="none"
                      className={classes.roots}
                      value={'state'}
                      // onChange={(event) => onSearchChange(event)}
                      // onKeyPress={enterSearch}
                      // onKeyUp={searchResult}
                      // placeholder="Search Groups"
                      id="input-edit-text"
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src="/search.svg" alt="search" />
                            <EditIcon style={{ color: "#72A624" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    :
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      07034524566
                    </Typography>
                } */}
              </Grid>

              <Grid
                className={classes.itemGrid}
                item
                md={6}
                lg={6}
                xl={6}
              >
                <Typography
                  className={clsx(classes.typography, classes.formTypo)}
                  variant="body1"
                  gutterBottom
                >
                  Education Level Of Customer
                </Typography>

                {isError ? (
                  <Typography className={classes.typography3}>
                    Education Level Unavailable
                  </Typography>
                ) : isLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  member && member.personal ? (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      {member.personal.custEducation}
                    </Typography>
                  ) : (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      Education Level not Selected
                    </Typography>
                  )
                )}

                {/* {
                  edit ?
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="none"
                      className={classes.roots}
                      value={'state'}
                      // onChange={(event) => onSearchChange(event)}
                      // onKeyPress={enterSearch}
                      // onKeyUp={searchResult}
                      // placeholder="Search Groups"
                      id="input-edit-text"
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src="/search.svg" alt="search" />
                            <EditIcon style={{ color: "#72A624" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    :
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      Bachelors
                    </Typography>
                } */}
              </Grid>

              <Grid
                className={classes.itemGrid}
                item
                md={6}
                lg={6}
                xl={6}
              >
                <Typography
                  className={clsx(classes.typography, classes.formTypo)}
                  variant="body1"
                  gutterBottom
                >
                  Residential Address
                </Typography>

                {isError ? (
                  <Typography className={classes.typography3}>
                    Residential Address Unavailable
                  </Typography>
                ) : isLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  member && member.personal ? (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      {member.personal.residentialAddress}
                    </Typography>
                  ) : (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      Residential Address not Selected
                    </Typography>
                  )
                )}

                {/* {
                  edit ?
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="none"
                      className={classes.roots}
                      value={'22, James Ibori Avenue, Sapele Delta State.'}
                      // onChange={(event) => onSearchChange(event)}
                      // onKeyPress={enterSearch}
                      // onKeyUp={searchResult}
                      // placeholder="Search Groups"
                      id="input-edit-text"
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src="/search.svg" alt="search" />
                            <EditIcon style={{ color: "#72A624" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    :
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                      noWrap={true}
                    >
                      22, James Ibori Avenue, Sapele Delta State.
                    </Typography>
                } */}
              </Grid>

              <Grid
                className={classes.itemGrid}
                item
                md={6}
                lg={6}
                xl={6}
              >
                <Typography
                  className={clsx(classes.typography, classes.formTypo)}
                  variant="body1"
                  gutterBottom
                >
                  Business Address
                </Typography>

                {isError ? (
                  <Typography className={classes.typography3}>
                    Business Address Unavailable
                  </Typography>
                ) : isLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  member && member.personal ? (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      {member.personal.busAddress}
                    </Typography>
                  ) : (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      Business Address not Selected
                    </Typography>
                  )
                )}

                {/* {
                  edit ?
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="none"
                      className={classes.roots}
                      value={'22, James Ibori Avenue, Sapele Delta State.'}
                      // onChange={(event) => onSearchChange(event)}
                      // onKeyPress={enterSearch}
                      // onKeyUp={searchResult}
                      // placeholder="Search Groups"
                      id="input-edit-text"
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src="/search.svg" alt="search" />
                            <EditIcon style={{ color: "#72A624" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    :
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      22, James Ibori Avenue, Sapele Delta State.
                    </Typography>
                } */}
              </Grid>

              <Grid
                className={classes.itemGrid}
                item
                md={6}
                lg={6}
                xl={6}
              >
                <Typography
                  className={clsx(classes.typography, classes.formTypo)}
                  variant="body1"
                  gutterBottom
                >
                  Marital Status
                </Typography>

                {isError ? (
                  <Typography className={classes.typography3}>
                    Marital Status Unavailable
                  </Typography>
                ) : isLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  member && member.personal ? (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      {member.personal.maritalStatus}
                    </Typography>
                  ) : (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      Marital Status not Selected
                    </Typography>
                  )
                )}

                {/* {
                  edit ?
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="none"
                      className={classes.roots}
                      value={'state'}
                      // onChange={(event) => onSearchChange(event)}
                      // onKeyPress={enterSearch}
                      // onKeyUp={searchResult}
                      // placeholder="Search Groups"
                      id="input-edit-text"
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src="/search.svg" alt="search" /> 
                            <EditIcon style={{ color: "#72A624"}} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    :
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      Married
                    </Typography>
                } */}
              </Grid>

              <Grid
                className={classes.itemGrid}
                item
                md={6}
                lg={6}
                xl={6}
              >
                <Typography
                  className={clsx(classes.typography, classes.formTypo)}
                  variant="body1"
                  gutterBottom
                >
                  Date Added
                </Typography>

                {isError ? (
                  <Typography className={classes.typography3}>
                    Date Unavailable
                  </Typography>
                ) : isLoading ? (
                  <CircularProgress size="1em" style={{ color: "#362D73" }} />
                ) : (
                  member && member.personal ? (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      {moment(member.personal.dateJoin).format('Do MMM YYYY')}
                    </Typography>
                  ) : (
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      noWrap={true}
                      gutterBottom
                    >
                      Date not Selected
                    </Typography>
                  )
                )}

                {/* {
                  edit ?
                    <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      margin="none"
                      className={classes.roots}
                      value={'state'}
                      // onChange={(event) => onSearchChange(event)}
                      // onKeyPress={enterSearch}
                      // onKeyUp={searchResult}
                      // placeholder="Search Groups"
                      id="input-edit-text"
                      InputProps={{
                        className: classes.input,
                        classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                        },
                        startAdornment: (
                          <InputAdornment position="start">
                            <img src="/search.svg" alt="search" />
                            <EditIcon style={{ color: "#72A624"}} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    :
                    <Typography
                      className={clsx(classes.typography2)}
                      variant="body1"
                      gutterBottom
                    >
                      01/01/2021
                    </Typography>
                } */}
              </Grid>
            </Grid>

            {
              edit &&
              <Box style={{paddingTop: '40px'}} display="flex" justifyContent="flex-start">
                <Button
                  type="submit"
                  fullWidth
                  disabled={loading}
                  variant="contained"
                  style={{
                    backgroundColor: "#72A624",
                    color: "white",
                    width: "80px",
                    height: "35px",
                    opacity: "1",
                  }}
                  className={classes.submit}
                >
                  {loading ? (
                    <CircularProgress
                      size="2em"
                      style={{ color: "#fff" }}
                    />
                  ) : (
                    // "Login"
                    <Typography
                      variant="body1"
                      className={classes.submitTypo}
                    >
                      Update
                    </Typography>
                  )}
                </Button>
              </Box>
            }
          </form>
        </Box>
      </Box>
    </Fragment>
  )
}  