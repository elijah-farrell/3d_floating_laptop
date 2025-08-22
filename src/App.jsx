import * as THREE from 'three'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import HeroPage from './HeroPage.jsx'

function Model(props) {
  const group = useRef()
  const [modelLoaded, setModelLoaded] = useState(false)
  const [screenReady, setScreenReady] = useState(false)

  // Load model
  const { scene } = useGLTF('/laptop.glb')
  
  // Make it float - balanced sway
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 3) / 25 + 0.25, 0.08)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 6) / 20, 0.08)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 12) / 25, 0.08)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-4.75 + Math.sin(t / 3)) / 3, 0.08)
  })

  // Calculate model bounds and adjust scale/position
  useEffect(() => {
    if (group.current) {
      const box = new THREE.Box3().setFromObject(group.current)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      
      // Calculate appropriate scale (target size around 5-8 units)
      const maxDimension = Math.max(size.x, size.y, size.z)
      const targetScale = 9 / maxDimension 
      
      // Apply scale and center the model
      group.current.scale.setScalar(targetScale)
      group.current.position.sub(center.multiplyScalar(targetScale))
      
      setModelLoaded(true)
    }
  }, [scene])

  // Find the Screen object in the scene
  useEffect(() => {
    if (scene) {
      // Find the Screen object and rotate it to make it more level
      const findScreenObject = (obj) => {
        if (obj.name === 'Screen') {
          // Rotate the screen to make it more level (open it up properly)
          obj.rotation.x = Math.PI * 11/12 // Open the screen 165 degrees
          return obj
        }
        for (const child of obj.children) {
          const found = findScreenObject(child)
          if (found) return found
        }
        return null
      }
      
      const screenObject = findScreenObject(scene)
      if (screenObject) {
        setScreenReady(true)
      }
    }
  }, [scene])

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Render the entire scene hierarchy properly */}
      <primitive object={scene} />
      
      {/* Only render HTML content when model and screen are ready */}
      {scene && modelLoaded && screenReady && (
        <Html 
          className="laptop-content" 
          rotation-x={-Math.PI / 12} // Fix upside down and match screen angle
          rotation-y={0}
          rotation-z={0}
          position={[0, 10.25, -13.175]} // Move up to the actual screen surface
          transform 
          occlude={true}
          style={{
            width: '1160px',
            height: '660px',
            background: 'white',
            borderRadius: '0px',
            padding: '0px',
            boxShadow: 'none',
            overflow: 'hidden',
            fontSize: '20px',
            zIndex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}

        >
          <div className="wrapper" onPointerDown={(e) => e.stopPropagation()} style={{
            width: '100%', 
            height: '100%',
            overflow: 'auto',
            position: 'relative'
          }}>
            <HeroPage />
          </div>
        </Html>
      )}

      
    </group>
  )
}

export default function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate scale factor based on screen width
  const getScaleFactor = () => {
    if (screenWidth <= 768) return 0.6; // 60% size below 768px
    if (screenWidth <= 900) return 0.9; // 90% size below 900px
    return 1; // Full size
  };
  
  const scaleFactor = getScaleFactor();
  
  return (
    <>
      <Canvas camera={{ position: [-5, 0, 13], fov: 55 }} style={{ position: 'relative', zIndex: 1 }}>
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <group rotation={[0, 0, 0]} position={[0, 0, 3]} scale={scaleFactor}>
            <Model />
          </group>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
        <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
      </Canvas>

             {/* Fancy Credit Badge - Top Left of Screen */}
       <div className="credit-badge">
         <div className="credit-content">
           <div className="credit-links">
             <a href="https://github.com/elijah-farrell" target="_blank" rel="noopener noreferrer" className="credit-link">
               <svg className="credit-icon" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
               </svg>
             </a>
             <a href="https://elijahfarrell.com" target="_blank" rel="noopener noreferrer" className="credit-link">
               <svg className="credit-icon" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
               </svg>
             </a>
           </div>
         </div>
       </div>
    </>
  )
} 