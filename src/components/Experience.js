import React, { useLayoutEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

function AnimatedCube() {
  const cubeRef = useRef()

  useLayoutEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#journey-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    })

    // Séquence d'animations
    timeline
      .to(cubeRef.current.position, {
        x: -2,
        duration: 2,
        ease: "power1.inOut"
      })
      .to(cubeRef.current.rotation, {
        y: Math.PI * 2,
        duration: 2,
        ease: "none"
      })
      .to(cubeRef.current.position, {
        x: 2,
        duration: 2,
        ease: "power1.inOut"
      })
      .to(cubeRef.current.scale, {
        x: 2,
        y: 2,
        z: 2,
        duration: 1,
        ease: "back.out(1.7)"
      })
      .to(cubeRef.current.rotation, {
        z: Math.PI * 2,
        duration: 2,
        ease: "none"
      })
      .to(cubeRef.current.position, {
        y: 2,
        duration: 1,
        ease: "power2.out"
      })
      .to(cubeRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "power2.in"
      })
      .to(cubeRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power1.inOut"
      })

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#2196f3" />
    </mesh>
  )
}

export default function Experience() {
  useLayoutEffect(() => {
    // Animation des étapes avec disparition progressive
    const steps = gsap.utils.toArray('.step')
    
    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onEnter: () => {
          // Fait apparaître l'étape courante
          gsap.to(step, {
            opacity: 1,
            y: 0,
            duration: 0.5
          })
          
          // Fait disparaître toutes les étapes précédentes
          steps.slice(0, i).forEach(prevStep => {
            gsap.to(prevStep, {
              opacity: 0,
              y: -50,
              duration: 0.5
            })
          })
        },
        onLeave: () => {
          // Fait disparaître l'étape courante quand on la quitte
          gsap.to(step, {
            opacity: 0,
            y: -50,
            duration: 0.5
          })
        },
        onEnterBack: () => {
          // Fait réapparaître l'étape courante quand on revient
          gsap.to(step, {
            opacity: 1,
            y: 0,
            duration: 0.5
          })
          
          // Fait disparaître toutes les étapes suivantes
          steps.slice(i + 1).forEach(nextStep => {
            gsap.to(nextStep, {
              opacity: 0,
              y: 50,
              duration: 0.5
            })
          })
        },
        onLeaveBack: () => {
          // Fait disparaître l'étape courante quand on la quitte vers le haut
          gsap.to(step, {
            opacity: 0,
            y: 50,
            duration: 0.5
          })
        }
      })
    })
  }, [])

  return (
    <div className="experience-container">
      <section className="hero">
        <h1>Scroll Journey</h1>
        <p>Follow the cube through its journey</p>
      </section>

      <section id="journey-section" className="journey-section">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedCube />
            <OrbitControls enabled={false} />
          </Canvas>
        </div>
        
        <div className="journey-steps">
          <div className="step">
            <h2>Step 1</h2>
            <p>Watch as the cube moves left</p>
          </div>
          <div className="step">
            <h2>Step 2</h2>
            <p>See it spin and travel right</p>
          </div>
          <div className="step">
            <h2>Step 3</h2>
            <p>Experience growth and transformation</p>
          </div>
          <div className="step">
            <h2>Step 4</h2>
            <p>Final return to center</p>
          </div>
        </div>
      </section>

      <section className="final-section">
        <h2>Journey Complete</h2>
        <p>Thank you for following along</p>
      </section>
    </div>
  )
}


