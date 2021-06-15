import React, { useState, useEffect } from 'react'
import Stats from './stats'
import Pending from './pending'
import { useRouter } from 'next/router'



export default function Products() {
  const router = useRouter()

  return (
    <>
      <Stats />
    </>
  )
}