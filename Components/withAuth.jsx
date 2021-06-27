import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { logout, isAuthenticated } from './../lib/auth.helper'

const AuthContext = createContext()

async function  checkUser () {
  const url = `https://hcdti.savitechnig.com/account/logged_in_user`;
  let data = false

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${isAuthenticated().auth_token}`,
      },
    });

    // console.log(response)

    if (response.status === 200) {
      data = true
    }
  } catch (e) {
    if (e.response) {
      // console.log(e.response)
      if(e.response.status === 401) {
        data = false
      }
    }
  }

  return data
}

function AuthProvider({ children }) {
  const { pathname, events } = useRouter()
  const checkUrl = ["/", '/staff_reset_password']

  // This check if the user is not authenticated or authorized to access a route and redirect them back to the login page
  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = url => {
      if (url === "/staff_reset_password" && !isAuthenticated().auth_token) {
        window.location.href = "/staff_reset_password";
      }

      if (!checkUrl.includes(url) && !isAuthenticated().auth_token) {
        window.location.href = "/";
      }

      // Check if the session has expired
      if (isAuthenticated().auth_token && !checkUser()) {
        logout(() => {
          window.location.href = "/";
        });
      }
    }

    // Check that initial route is OK
    if (!checkUrl.includes(pathname) && !isAuthenticated().auth_token) {
      window.location.href = "/";
      // router.replace('/')
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [pathname])

  return (
    <>
      <AuthContext.Provider value={{ user: isAuthenticated().user }}>{children}</AuthContext.Provider>
    </>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
