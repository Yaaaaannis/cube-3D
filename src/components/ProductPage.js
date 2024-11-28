import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './ProductPage.css'

gsap.registerPlugin(ScrollTrigger)

function Product3D() {
  const cylinderRef = useRef()

  useLayoutEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#canvas-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    })

    timeline.to(cylinderRef.current.rotation, {
      x: Math.PI * 2,
      ease: "none"
    })
  }, [])

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={cylinderRef}>
        <boxGeometry args={[1, 1, 3]} />
        <meshStandardMaterial color="#2196f3" />
      </mesh>
      <OrbitControls enableZoom={false} />
    </>
  )
}

export default function ProductPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="product-page">
      <header className="header">
        <h1>Product Name</h1>
        <nav>
          <a href="#features">Features</a>
          <a href="#specs">Specs</a>
          <a href="#buy">Buy Now</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Revolutionary Design</h2>
          <p>Experience the future of product design</p>
        </div>
      </section>

      <section id="canvas-container" className="product-viewer">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Product3D />
        </Canvas>
        <div className="scroll-indicator">
          Scroll to explore
        </div>
      </section>

      <section className="features" id="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Feature 1</h3>
            <p>Description of feature 1</p>
          </div>
          <div className="feature">
            <h3>Feature 2</h3>
            <p>Description of feature 2</p>
          </div>
          <div className="feature">
            <h3>Feature 3</h3>
            <p>Description of feature 3</p>
          </div>
        </div>
      </section>

      <section className="specs" id="specs">
        <h2>Specifications</h2>
        <ul>
          <li>Spec 1: Value</li>
          <li>Spec 2: Value</li>
          <li>Spec 3: Value</li>
        </ul>
      </section>

      <section className="cta" id="buy">
        <h2>Ready to Purchase?</h2>
        <button className="buy-button">Buy Now</button>
      </section>
    </div>
  )
} 