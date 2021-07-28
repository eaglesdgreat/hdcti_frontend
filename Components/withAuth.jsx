import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  Box
} from '@material-ui/core'
import { Alert, AlertTitle } from "@material-ui/lab";

import { logout, isAuthenticated } from "./../lib/auth.helper";
import SessionTimedOut from "./SessionTimedOut";

const AuthContext = createContext();

const useStyles = makeStyles((theme) => ({
  box: {
    width:"80%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  infoBox: {
    margin: 'auto', 
    width: '30%', 
    height: '60px', 
    padding: '20px',
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: '30px',
      padding: '10px',
    }
  }
}));



function AuthProvider({ children }) {
  const { pathname, events } = useRouter();
  const checkUrl = ["/", "/staff_reset_password"];
  const classes = useStyles()
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(true)

  // This check if the user is not authenticated or authorized to access a route and redirect them back to the login page
  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = (url) => {
      if (url === "/staff_reset_password" && !isAuthenticated().auth_token) {
        setLoading(false);
        window.location.href = "/staff_reset_password";
      }

      // Check that initial route is a private route and user is not login
      if (!checkUrl.includes(url) && !isAuthenticated().auth_token) {
        setLoading(false);
        window.location.href = "/";
      }

      // Check that initial route is a private route and user is login
      if (!checkUrl.includes(url) && isAuthenticated().auth_token) {
        setLoading(false);
      }

      // Check that initial route is not a private route
      if (checkUrl.includes(url) && !isAuthenticated().auth_token) {
        setLoading(false);
      }

      if (url === '/' && isAuthenticated().auth_token) {
        logout(() => {
          setLoading(false);
          window.location.href = "/";
        })
      }
    };

    // Check that initial route is OK
    if (!checkUrl.includes(pathname) && !isAuthenticated().auth_token) {
      window.location.href = "/";
      // router.replace('/')
    }

    // Check that initial route is not a private route
    if (checkUrl.includes(pathname) && !isAuthenticated().auth_token) {
      setLoading(false);
    }

    //check if the user have token to login
    if (!checkUrl.includes(pathname) && isAuthenticated().auth_token) {
      setLoading(false);
    }

    if (pathname === '/' && isAuthenticated().auth_token) {
      logout(() => {
        setLoading(false);
        window.location.href = "/";
      })
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [pathname, loading]);

  const logOutFnc = () => {
    logout(() => {
      setLoading(false);
      
      localStorage.removeItem("last_url");
      localStorage.setItem(
        "last_url",
        JSON.stringify(pathname)
      );
      localStorage.setItem('alert', true)

      window.location.href = "/";
    })
  }

  return (
    <>
      {loading ? (
        <>
          <Box display="flex">
            <Box style={{width:'18%', paddingRight:'30px'}}>
              <Skeleton height={720} />
            </Box>

            <Box display="flex" flexDirection="column" className={classes.box}>
              <Box style={{ paddingBottom: '40px' }}>
                <Skeleton height={50} />
              </Box>
              <Skeleton height={627}  />
            </Box>
          </Box>
        </>
      ) : (
        <AuthContext.Provider value={{ user: isAuthenticated().user }}>
          <SessionTimedOut isAuthenticated={isAuthenticated()} logOut={logOutFnc} />
          {localStorage.getItem('alert') && alert && (
              <Box className={classes.infoBox}>
                <Alert severity="info" onClose={() => { localStorage.removeItem('alert'); setAlert(false) }}>
                <AlertTitle>Info</AlertTitle>
                Your session has expired - <strong>login to continue.</strong>
              </Alert>
            </Box>
          )}
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
