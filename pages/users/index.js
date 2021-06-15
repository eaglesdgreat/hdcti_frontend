import React, { useState, useEffect } from 'react'
import Stats from './stats'
import { useRouter } from 'next/router'



export default function Users() {
  const router = useRouter()

  return (
    <>
      <Stats />
    </>
  )
}