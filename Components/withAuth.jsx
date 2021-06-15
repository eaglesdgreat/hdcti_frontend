import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { logout, isAuthenticated } from './../lib/auth.helper'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const { pathname, events } = useRouter()

  // This check if the user is not authenticated or authorized to access a route and redirect them back to the login page
  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = url => {
      if (url !== '/' && !isAuthenticated().authToken) {
        window.location.href = '/'
        // router.replace('/')
      }
    }

    // Check that initial route is OK
    if (pathname !== '/' && !isAuthenticated().authToken) {
      window.location.href = '/'
      // router.replace('/')
    }

    // Monitor routes
    events.on('routeChangeStart', handleRouteChange)
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
