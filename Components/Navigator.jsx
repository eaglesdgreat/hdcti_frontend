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
    id: 'Dashboard',
    icon: <img src="/home.svg" alt="home" />,
    activeIcon: <img src="/homeActive.svg" alt="home" />,
    path: "/dashboard"
  },
  {
    id: 'Orders',
    icon: <img src="/clipboardorder.svg" alt="orders" />,
    activeIcon: <img src="/clipboardActive.svg" alt="orders" />,
    path: "/orders"
  },
  {
    id: 'Products',
    icon: <img src="/box.svg" alt="products" />,
    activeIcon: <img src="/boxActive.svg" alt="products" />,
    path: "/products"
  },
  {
    id: 'Services',
    icon: <img src="/tool.svg" alt="services" />,
    activeIcon: <img src="/toolActive.svg" alt="services" />,
    path: "/services"
  },
  {
    id: 'Campus Reps',
    icon: <img src="/users.svg" alt="users" />,
    activeIcon: <img src="/usersActive.svg" alt="users" />,
    path: "/campusreps"
  },
  {
    id: 'Influencers',
    icon: <img src="/influencer.svg" alt="influencers" />,
    activeIcon: <img src="/influencerActive.svg" alt="influencers" />,
    path: "/influencers"
  },
  {
    id: 'Users',
    icon: <img src="/user.svg" alt="user" />,
    activeIcon: <img src="/userActive.svg" alt="user" />,
    path: "/users"
  },
  {
    id: 'Central Wallet',
    icon: <img src="/dollar-sign.svg" alt="coupons" />,
    activeIcon: <img src="/dollarSignActive.svg" alt="coupons" />,
    path: "/centralwallet"
  },
  {
    id: 'Coupons',
    icon: <img src="/coupon.svg" alt="coupons" />,
    activeIcon: <img src="/couponActive.svg" alt="coupons" />,
    path: "/coupons"
  },
  {
    id: 'Send Mail',
    icon: <img src="/mail.svg" alt="mail" />,
    activeIcon: <img src="/mailActive.svg" alt="mail" />,
    path: "/sendmail"
  },
  // {
  //     id: 'Searches', 
  //     icon: <img src="/search.svg" alt="search" />,
  //     activeIcon: <img src="/searchActive.svg" alt="search" />,
  //     path: "/search"
  // },
];

const styles = (theme) => ({
  header: {
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  item: {
    fontfamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '18.75px',
    color: '#687282',
    '&:hover,&:focus': {
      backgroundColor: '#F8F8F8',
    },
  },
  itemActiveItem: {
    color: '#FF5C00',
  },
  itemIcon: {
    minWidth: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  logout: {
    // margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingRight: 10,
  }
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
    <Drawer variant="permanent" {...other}>
      <Box
        display='flex'
        style={{
          // margin: 'auto',
          // border: '1px solid red',
          marginTop: '30px'
        }}
      >
        <List disablePadding>
          <ListItem className={clsx(classes.header)}>
            <img width="100%" src="/VasitiLogoblack.svg" alt="vasiti Logo" />
          </ListItem>
          {categories.map(({ id, icon, path, activeIcon }) => (
            <React.Fragment key={id}>
              <Link href={path}>
                <a style={{ textDecoration: 'none' }}>
                  <ListItem >
                    <ListItemIcon className={classes.itemIcon}>
                      {path === `/${checkPath}` ? activeIcon : icon}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        className={
                          clsx(classes.item, router.pathname === props.path,
                            path === `/${checkPath}` && classes.itemActiveItem)
                        }
                      >
                        {id}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </a>
              </Link>
            </React.Fragment>
          ))}
        </List>
      </Box>

      <Box
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
            backgroundColor: '#687282',
            borderRadius: '6px',
            fontfamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '16px',
            color: '#FFFFFF',
            width: '80%',
            margin: 'auto'
          }}
        >
          <span className={classes.logout}>
            <img src="/logout.svg" alt="logout" />
          </span>
          {token === false ? 'LOGIN' : 'LOGOUT'}
        </Button>
      </Box>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);
