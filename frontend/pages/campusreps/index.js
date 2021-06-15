import React from 'react'
import Stats from './stats'
import { useRouter } from 'next/router'



export default function Campusreps() {
  const router = useRouter()

  return (
    <>
      <Stats />
    </>
  )
}