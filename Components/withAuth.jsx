import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  Box
} from '@material-ui/core'

import { logout, isAuthenticated } from "./../lib/auth.helper";

const AuthContext = createContext();



const useStyles = makeStyles((theme) => ({
  box: {
    width:"80%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  }
}));


async function checkUser() {
  const url = `https://hcdti.savitechnig.com/account/logged_in_user`;
  let data = false;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${isAuthenticated().auth_token}`,
      },
    });

    // console.log(response)

    if (response.status === 200) {
      data = true;
    }
  } catch (e) {
    if (e.response) {
      // console.log(e.response)
      if (e.response.status === 401) {
        data = false;
      }
    }
  }

  return data;
}

function AuthProvider({ children }) {
  const { pathname, events } = useRouter();
  const checkUrl = ["/", "/staff_reset_password"];
  const classes = useStyles()
  const [loading, setLoading] = useState(false);

  // This check if the user is not authenticated or authorized to access a route and redirect them back to the login page
  useEffect(() => {
    setLoading(true);
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
    };

    // Check if the session has expired
    // if (isAuthenticated().auth_token && !checkUser()) {
    //   logout(() => {
    //     window.location.href = "/";
    //   });
    // }

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

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [pathname, loading]);

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
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
