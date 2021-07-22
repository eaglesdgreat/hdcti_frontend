import React, { useState, useEffect, useRef } from 'react'
import IdleTimer from 'react-idle-timer'


let countDownInterval;
let timeOut;



export default function SessionTimedOut({ isAuthenticated, logOut }) {
  const [timeOutCountDown, setTimeOutCountDown] = useState(0)
  const [startTimeOut, setStartTimeOut] = useState(false)
  const idelTimer = useRef(null)

  const clearSessionTimeOut = () => {
    clearTimeout(timeOut)
  }

  const clearSessionInterval = () => {
    clearInterval(countDownInterval)
  }

  const handleLogOut = (isTimer = false) => {
    try {
      if(isTimer) {
        setStartTimeOut(false)
        clearSessionTimeOut()
        clearSessionInterval()
        logOut()
      } else {
        setStartTimeOut(false)
        clearSessionTimeOut()
        clearSessionInterval()
      }
    } catch(e) {
      console.log(e)
    }
    
  }

  const onActive = () => {
    handleLogOut(false)
  }

  const onIdle = () => {
    const delay = 1000 * 1
    console.log('countdowm:', timeOutCountDown)

    if (isAuthenticated.auth_token && !startTimeOut) {
      timeOut = setInterval(() => {
        let countDown = 10

        setStartTimeOut(false)
        setTimeOutCountDown(countDown)

        countDownInterval = setInterval(() => {
          if (countDown > 0) {
            setTimeOutCountDown(--countDown)
          } else {
            handleLogOut(true)
          }
        }, 1000);
      }, delay);
    }
  }

  return (
    <>
      <IdleTimer
        ref={idelTimer}
        onActive={onActive}
        onIdle={onIdle}
        debounce={250}
        timeout={1000 * 60 * 20}
      />
    </>
  )
}