import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import { Menu, MenuItem } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import clsx from 'clsx';
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import Link from 'next/link'
import axios from 'axios'

import { logout, isAuthenticated } from '../lib/auth.helper'
import Notifications from './Notifications'
import AddAdmin from './AddAdmin'

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: '#EFEFEF 0% 0% no-repeat padding-box;',
    paddingRight: '4%',
    paddingBottom: '1%',
    paddingTop: '1%',
    height: "60px",
    opacity: "1",
  },
  avatar: {
    color: '#362D73',
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
    // fontFamily: 'Roboto',
    // fontStyle: 'normal',
    // fontWeight: 'bold',
    // fontSize: 'i8px',
    // lineHeight: '21px',
    // color: '#171616',
    font: "var(--unnamed-font-style-normal) normal 900 var(--unnamed-font-size-14)/var(--unnamed-line-spacing-16) Avenir",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-03658c)",
    textAlign: "right",
    font: "normal normal 900 14px/16px Avenir",
    letterSpacing: "0px",
    color: "#03658C",
    opacity: "1",
    
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



function Header(props) {
  const router = useRouter();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { onDrawerToggle } = props;
  // const headName = isAuthenticated().user.firstName
  const headName = ''
  const token = isAuthenticated().auth_token
  // console.log(token)

  const [anchorEl2, setAnchorEl2] = useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    const url = `https://hcdti.savitechnig.com/account/token/logout`;

    // logout(() => {
    //   setAnchorEl2(null);
    //   router.push("/");
    // });

    // enqueueSnackbar(
    //   `You have successfully logout`,
    //   {
    //     variant: "success",
    //   }
    // );
    
    try {
      const response = await axios.post(url, {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
      });
      console.log('yes')
      
      // console.log(response)

      logout(() => {
        setAnchorEl2(null);
        router.push("/");
      });

      enqueueSnackbar(
        `You have successfully logout`,
        {
          variant: "success",
        }
      );
    } catch (e) {
      console.log(e)

      enqueueSnackbar(`Error while loging out. Try again`, {
        variant: 'error',
      });
    }
  };

  return (
    <React.Fragment>
      <Box
        display="flex"
        style={{
          width: "100%",
          // paddingTop: '1.5%',
          // paddingBottom: '1.5%',
        }}
      >
        <AppBar className={classes.appbar} position="sticky" elevation={1}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Hidden smUp>
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerToggle}
                    // className={classes.menuButton}
                  >
                    <MenuIcon style={{ backgroundColor: "#362D73" }} />
                  </IconButton>
                </Grid>
              </Hidden>

              <Grid item xs />

              {/* <Grid item>
                <AddAdmin />
              </Grid> */}

              <Grid item>
                <Notifications />
              </Grid>

              {/* <Grid item>
                <IconButton
                  color="inherit"
                  disableRipple
                  style={{ marginRight: "70px" }}
                >
                  <Avatar className={classes.avatar} >
                    {(headName ? headName : "User").split("")[0]}
                  </Avatar>
                </IconButton>
              </Grid> */}

              <Grid item>
                <Box 
                  display="flex"
                  aria-controls="avatar-menu"
                  aria-haspopup="true"
                  style={{alignItems:"center"}}
                >
                  <IconButton
                    color="inherit"
                    disableRipple
                    style={{ marginRight: "70px" }}
                  >
                    <Avatar className={classes.avatar} />
                      {/* {(headName ? headName : "User").split("")[0]}
                    </Avatar> */}
                  </IconButton>
                  
                  <Box component="span" dsplay="flex" style={{width: '100%'}}>
                    <Typography
                      noWrap
                      className={classes.typography}
                      style={{
                        // fontWeight: "500",
                        // fontSize: "15px",
                        // lineHeight: "17.58px",
                        // color: "#242120",
                        marginLeft: "-70px",
                        marginRight: "5px",
                      }}
                    >
                      Hello, {headName ? headName : "User"}
                    </Typography>
                  </Box>

                  <img
                    src="/right-arro.svg"
                    alt="menu"
                    aria-controls="avatar-menu"
                    aria-haspopup="true"
                    onClick={handleClick2}
                  />

                  <Menu
                    id="avatar-menu"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={handleClose2}
                    PaperProps={{
                      style: {
                        borderRadius: "8px",
                        margin: "25px 0px 0px -23px",
                        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.08)",
                        backgroundColor: "#FFFFFF",
                        width: "100px",
                        height: "60px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        // paddingLeft: "5px",
                        overflow:'hidden'
                      },
                    }}
                  >
                    {/* <MenuItem>
                      <Typography
                        className={classes.typography}
                      >
                        Profile
                      </Typography>
                    </MenuItem>

                    <MenuItem>
                      <Typography
                        className={classes.typography}
                      >
                        Settings
                      </Typography>
                    </MenuItem> */}

                    <MenuItem onClick={handleLogout}>
                      <Typography
                        className={classes.typography}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
}

Header.propTypes = {
  // classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
