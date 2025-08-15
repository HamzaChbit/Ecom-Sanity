"use client";
import React from 'react'
import { motion } from 'framer-motion'
function Footer() {
  return (
    <motion.div className='p-10'  initial={{y:10,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.8,delay:0.8}} >
        <h1 className='text-center text-lg'>Made By Hamza Chbit</h1>
    </motion.div>
  )
}

export default Footer