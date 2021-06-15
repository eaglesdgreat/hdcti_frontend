import React, { useState, useEffect } from 'react'
import Stats from './stats'
import { useRouter } from 'next/router'



export default function Orders() {
  const router = useRouter()

  return (
    <>
      <Stats />
    </>
  )
}