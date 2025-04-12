'use client'
import { useRef } from 'react'
import { Box, useTheme } from '@mui/material'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const ParallaxSection = () => {
  const containerRef = useRef()
  const backgroundRef = useRef()
  const sabeloRef = useRef()

  useGSAP(() => {
    // Parallax effect for background image
    gsap.to(backgroundRef.current, {
      yPercent: 30, // Moves slower than scroll
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    // Parallax effect for sabelo image (moves faster)
    gsap.to(sabeloRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    // Fade in/out effect
    gsap.to([backgroundRef.current, sabeloRef.current], {
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "bottom center",
        scrub: true
      }
    })

  }, { scope: containerRef })

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Background Image (moves slower) */}
      <Box
        ref={backgroundRef}
        sx={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          zIndex: 1
        }}
      >
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>

      {/* Sabelo Image (moves faster) */}
      <Box
        ref={sabeloRef}
        sx={{
          position: 'relative',
          width: { xs: '80%', md: '50%' },
          height: '80%',
          zIndex: 2,
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
        }}
      >
        <Image
          src="/sabelo.png"
          alt="Sabelo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>
    </Box>
  )
}

export default ParallaxSection