// app/page.jsx
'use client'
import Image from 'next/image'
import { Button } from '@mui/material'

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/02.jpg"
          alt="Background"
          fill
          className="object-fit"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-center items-end pr-20">
        <div className="text-right max-w-md">
          <h1 className="text-7xl font-bold text-white mb-6">SABELO NDIMANDE</h1>
          <p className="text-2xl text-white mb-8">Professional Speaker</p>
          <Button 
            variant="contained" 
            size="large"
            className="bg-primary-main hover:bg-primary-dark text-white py-3 px-8 text-lg"
          >
            BOOK ME
          </Button>
        </div>
      </div>
    </div>
  )
}