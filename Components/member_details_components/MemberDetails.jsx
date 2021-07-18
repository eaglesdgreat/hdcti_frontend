import React, { useState, useEffect, Fragment } from 'react'
import {
  Box,
  Typography,
  Divider,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import axios from "axios";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import moment from "moment";
import clsx from 'clsx'


const useStyles = makeStyles((theme) => ({
  typography: {
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
  typography2: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal normal 12px/14px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0DC7",
    textTransform: "uppercase",
    opacity: 1,
  },
  typography3: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "left",
    font: "normal normal medium 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#0D0D0D",
    opacity: 1,
    // fontWeight: 600,
  },
  groupTypo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal medium 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#362D73",
    opacity: 1,
  },
  actionTypo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-16) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal medium 14px/16px Poppins",
    letterSpacing: " 0px",
    color: "#362D73",
    opacity: 1,
  },
  actionBox: {
    background: "var(--unnamed-color-ecf1f2) 0% 0% no-repeat padding-box",
    background: "#ECF1F2 0% 0% no-repeat padding-box",
    borderRadius: "0px 0px 5px 5px",
    opacity: 0.90,
    height: "48px",
    paddingTop: "13px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "10px",
  },
  button: {
    border: "1px solid #E0E0E0",
    width: "25px",
    height: "25px",
    "&:hover,&:focus,&:active,&:target": {
      background: "#ffffff00",
    },
  },
  menuBox: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    border: "1px solid var(--unnamed-color-e0e0e0)",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #E0E0E0",
    // borderRadius: "5px",
    opacity: 1,
    width: "100%",
  },
  menuText: {
    font: "var(--unnamed-font-style-normal) normal 600 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal 600 14px/21px Poppins",
    letterSpacing: "0px",
    color: "#362D73",
    opacity: 1,
    // width: '100%',
    "&:hover,&:focus,&:active": {
      background: "#ffffff00",
    },
  },
  dialogTypo: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) var(--unnamed-font-size-14)/var(--unnamed-line-spacing-17) var(--unnamed-font-family-helvetica-neue)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-0d0d0d)",
    textAlign: "center",
    font: "normal normal medium 14px/17px Helvetica Neue",
    letterSpacing: "0px",
    color: "#0D0D0DA0",
    textTransform: "capitalize",
    opacity: "1",
  },
}))




export default function MemberDetails() {
  const classes = useStyles()
  
  const [openMenu, setOpenMenu] = useState(false)
  const [loading, setloading] = useState(false)

  const handleToggle = () => {
    setOpenMenu(!openMenu);
  };

  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }

    setOpenMenu(false);
  };

  return (
    <Fragment>
      <Box style={{ padding: "20px" }}>
        <Typography className={classes.typography}>
          Member Details
        </Typography>
      </Box>

      <Divider light />

      <Box style={{ padding: "20px" }}>
        <Typography className={classes.typography2}>
          Name
        </Typography>

        <Typography className={classes.typography3}>
          Name Unavailable
        </Typography>
      </Box>

      <Box style={{ padding: "20px" }}>
        <Typography className={classes.typography2}>
          Group
        </Typography>

        <Typography className={classes.groupTypo}>
          Group Unavailable
        </Typography>
      </Box>

      <Box style={{ padding: "20px", paddingTop: "7px" }}>
        <Typography className={classes.typography2}>
          Phone
        </Typography>

        <Typography className={classes.typography3}>
          Phone Unavailable
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.actionBox}
      >
        <Typography className={classes.actionTypo}>Actions</Typography>

        <Button
          className={classes.button}
          disableFocusRipple
          disableRipple
          disableTouchRipple
          // ref={anchorRef}
          // aria-controls={open ? "menu-list-grow" : undefined}
          // aria-haspopup="true"
          onClick={handleToggle}
        >
          <img src="/right-arro.svg" />
        </Button>
      </Box>
      {openMenu && (
        <ClickAwayListener onClickAway={handleClose}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.menuBox}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              style={{ paddingLeft: "10px" }}
            >
              <Button
                disableFocusRipple
                disableRipple
                disableTouchRipple
                // onClick={changeType}
                className={classes.menuText}
              >
                Edit Member Details
              </Button>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-start"
              style={{ paddingLeft: "10px" }}
            >
              <Button
                disableFocusRipple
                disableRipple
                disableTouchRipple
                // onClick={handleDialogClickGroup}
                className={classes.menuText}
              >
                Suspend Member
              </Button>

              <Dialog
                // open={groupOpen}
                // onClose={handleDialogCloseGroup}
                BackdropProps={{
                  style: {
                    opacity: 0.1,
                  },
                }}
                PaperProps={{
                  style: {
                    borderRadius: "8px",
                    width: "428px",
                    // height: '369px',
                    paddingBottom: "5%",
                    paddingTop: "2.5%",
                    boxShadow: "none",
                  },
                }}
              >
                <DialogTitle>
                  <Typography
                    className={classes.dialogTypo}
                    style={{
                      fontWeight: "700",
                      fontSize: "24px",
                      lineHeight: "28px",
                    }}
                  >
                    Delete Group Account
                  </Typography>
                </DialogTitle>

                <DialogContent>
                  <Box
                    display="flex"
                    component="span"
                    style={{
                      whiteSpace: "initial",
                    }}
                  >
                    <Typography className={classes.dialogTypo}>
                      You want to delete{" "}
                      <strong>{group.result.groupName} </strong>
                      group account from this platform, click delete
                      button to proceed or cancel this action.
                    </Typography>
                  </Box>
                </DialogContent>

                <DialogActions
                  style={{
                    padding: "11px",
                    justifyContent: "center",
                  }}
                >
                  <Box display="flex" justifyContent="center">
                    <Button
                      size="large"
                      className={classes.button2}
                      onClick={clickDelete}
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      disabled={loading}
                      style={{
                        border: "2px solid #72A624",
                      }}
                    >
                      {loading ? (
                        <CircularProgress
                          size="1em"
                          style={{ color: "#72A624" }}
                        />
                      ) : (
                        <Typography
                          className={classes.dialogTypo}
                          style={{
                            textAlign: "center",
                            color: "#72A624",
                            fontSize: "13px",
                            fontWeight: "500",
                            lineHeight: "15px",
                            textTransform: "capitalize",
                            lineSpacing: "0.02em",
                          }}
                        >
                          Delete
                        </Typography>
                      )}
                    </Button>

                    <Button
                      size="large"
                      className={classes.button2}
                      // onClick={handleDialogCloseGroup}
                      disabled={loading}
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      style={{
                        border: "1px solid #72A624",
                        backgroundColor: "#72A624",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography
                        className={classes.dialogTypo}
                        style={{
                          textAlign: "center",
                          color: "#FFFFFF",
                          fontSize: "13px",
                          fontWeight: "500",
                          lineHeight: "15px",
                          textTransform: "capitalize",
                          lineSpacing: "0.02em",
                        }}
                      >
                        cancel
                      </Typography>
                    </Button>
                  </Box>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </ClickAwayListener>
      )}
    </Fragment>
  )
}