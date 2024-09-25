"use client";

import React from 'react'
import { auth } from '@clerk/nextjs/server'

const Footer = () => {
  const { userId } = auth()

  return userId && (
    <div>Footer</div>
  )
}

export default Footer