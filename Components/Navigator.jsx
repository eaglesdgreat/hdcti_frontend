import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Typography from '@material-ui/core/Typography'

import { logout } from '../lib/auth.helper'
import { isAuthenticated } from '../lib/auth.helper'



const categories = [
  {
    id: 1,
    head: "Loan Applications",
    body1: {
      id: "Create New",
      icon: <img src="/home.svg" alt="home" />,
      activeIcon: <img src="/home.svg" alt="home" />,
      path: "/create_application",
    },
    body2: {
      id: "View Applications",
      icon: <img src="/home.svg" alt="home" />,
      activeIcon: <img src="/home.svg" alt="home" />,
      path: "/applications",
    },
  },

  {
    id: 2,
    head: "Groups",
    body1: {
      id: "Create New",
      icon: <img src="/home.svg" alt="home" />,
      activeIcon: <img src="/home.svg" alt="home" />,
      path: "/create_group",
    },
    body2: {
      id: "View Groups",
      icon: <img src="/home.svg" alt="home" />,
      activeIcon: <img src="/home.svg" alt="home" />,
      path: "/groups",
    },
  },

  {
    id: 3,
    head: "Users",
    body1: {
      id: "Create New",
      icon: <img src="/home.svg" alt="home" />,
      activeIcon: <img src="/home.svg" alt="home" />,
      path: "/create_user",
    },
    body2: {
      id: "View Users",
      icon: <img src="/home.svg" alt="home" />,
      activeIcon: <img src="/home.svg" alt="home" />,
      path: "/users",
    },
  },
];

const styles = (theme) => ({
  header: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  drawer: {
    background: "var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    opacity: "1",
    paddingLeft:'27px'
  },
  item: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) 15px/20px var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal medium 15px/20px Poppins;",
    letterSpacing: "0px",
    color: "#362D73",
    opacity: "1",
    // fontfamily: 'Roboto',
    // fontStyle: 'normal',
    // fontWeight: '400',
    // fontSize: '16px',
    // lineHeight: '18.75px',
    // color: '#687282',
    // '&:hover,&:focus': {
    //   backgroundColor: '#F8F8F8',
    // },
  },
  itemActiveItem: {
    font: "var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-medium) 15px/20px var(--unnamed-font-family-poppins)",
    letterSpacing: "var(--unnamed-character-spacing-0)",
    color: "var(--unnamed-color-362d73)",
    textAlign: "left",
    font: "normal normal medium 15px/20px Poppins;",
    letterSpacing: "0px",
    color: "#362D73",
    opacity: "1",
  },
  itemIcon: {
    // minWidth: "auto",
    marginLeft: '-15px',
    // marginRight: theme.spacing(2),
  },
  button: {
    background: "#DAF2B6 0% 0% no-repeat padding-box",
    borderRadius: " 2px 0px 0px 2px",
    opacity: "1",
    width:204,
    height:39,
    "&:hover,&:focus": {
      background: "#DAF2B6 0% 0% no-repeat padding-box",
      borderRadius: " 2px 0px 0px 2px",
      opacity: "1",
    },
  },
  logout: {
    // margin: 'auto',
    display: "flex",
    justifyContent: "flex-start",
    paddingRight: 10,
  },
  head: {
    font: 'var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal) var(--unnamed-font-size-12)/var(--unnamed-line-spacing-14) var(--unnamed-font-family-helvetica-neue)',
    letterSpacing: 'var(--unnamed-character-spacing-0)',
    color: 'var(--unnamed-color-0d0d0d)',
    textAlign: 'center',
    font: 'normal normal normal 12px/14px Helvetica Neue',
    letterSpacing: '0px',
    color: '#0D0D0D',
    textTransform: 'uppercase',
    opacity: '0.63',
  },
});

function Navigator(props) {
  const router = useRouter()
  const { classes, ...other } = props;

  const token = isAuthenticated()
  const checkPath = props.path.split('/')[1]
  // console.log(checkPath)

  const handleLogout = () => {
    logout(() => {
      router.push('/')
    })
  }

  return (
    <Drawer classes={{ paper: classes.drawer }} variant="permanent" {...other}>
      <Box
        display="flex"
        style={{
          // margin: 'auto',
          // border: '1px solid red',
          marginTop: "30px",
        }}
      >
        <List disablePadding>
          <ListItem className={clsx(classes.header)}>
            <img width="100%" src="" alt="Hcdti Logo" />
          </ListItem>

          <Box
            display="flex"
            flexDirection="column"
            style={{
              paddingBottom: "30px",
            }}
          >
            <Link href={"/dashboard"}>
              <Button varaint="contained" className={classes.button}>
                <ListItem>
                  <ListItemIcon className={classes.itemIcon}>
                    {"/dashboard" === `/${checkPath}` ? (
                      <img src="/home.svg" alt="home" />
                    ) : (
                      <img src="/home.svg" alt="home" />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      className={clsx(
                        classes.item,
                        router.pathname === props.path,
                        "/dashboard" === `/${checkPath}` &&
                          classes.itemActiveItem
                      )}
                      style={{
                        fontSize:'14px',
                        fontWeight: 600,
                      }}
                    >
                      {"Home"}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </Button>
            </Link>
          </Box>

          {categories.map(({ id, head, body1, body2 }) => (
            <React.Fragment key={id}>
              <Box
                display="flex"
                flexDirection="column"
                style={{
                  paddingBottom: "30px",
                }}
              >
                <Box
                  display="flex"
                  style={{
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <Typography className={classes.head}>{head}</Typography>
                </Box>

                <Box
                  display="flex"
                  style={{
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <Link href={body1.path}>
                    <Button varaint="contained" className={classes.button}>
                      <ListItem>
                        <ListItemIcon className={classes.itemIcon}>
                          {body1.path === `/${checkPath}`
                            ? body1.activeIcon
                            : body1.icon}
                        </ListItemIcon>
                        <ListItemText>
                          <Typography
                            className={clsx(
                              classes.item,
                              router.pathname === props.path,
                              body1.path === `/${checkPath}` &&
                                classes.itemActiveItem
                            )}
                            style={{
                              fontSize:'14px',
                              fontWeight: 600,
                            }}
                          >
                            {body1.id}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Button>
                  </Link>
                </Box>

                <Box
                  display="flex"
                  style={{
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <Link href={body2.path}>
                    <Button varaint="contained" className={classes.button}>
                      <ListItem>
                        <ListItemIcon className={classes.itemIcon}>
                          {body2.path === `/${checkPath}`
                            ? body2.activeIcon
                            : body2.icon}
                        </ListItemIcon>
                        <ListItemText>
                          <Typography
                            className={clsx(
                              classes.item,
                              router.pathname === props.path,
                              body2.path === `/${checkPath}` &&
                                classes.itemActiveItem
                            )}
                            style={{
                              fontWeight: 600,
                              fontSize:'14px',
                            }}
                          >
                            {body2.id}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Button>
                  </Link>
                </Box>
              </Box>
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* <Box
        display="flex"
        style={{
          paddingTop: 45,
          // marginTop: '40px'
        }}
      >
        <Button
          varaint="contained"
          onClick={handleLogout}
          style={{
            backgroundColor: "#687282",
            borderRadius: "6px",
            fontfamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            color: "#FFFFFF",
            width: "80%",
            margin: "auto",
          }}
        >
          <span className={classes.logout}>
            <img src="/logout.svg" alt="logout" />
          </span>
          {token === false ? "LOGIN" : "LOGOUT"}
        </Button>
      </Box> */}
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
