import * as THREE from 'three'
import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import HeroPage from './HeroPage.jsx'

function Model(props) {
  const group = useRef()
  // Load model
  const { nodes, materials, scene } = useGLTF('/laptop.glb')
  
           // Make it float - matching original example but with bigger rotation
         useFrame((state) => {
           const t = state.clock.getElapsedTime()
           group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
           group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 5, 0.1)
           group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
           group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-2 + Math.sin(t / 2)) / 2, 0.1)
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
      
      console.log('Model bounds:', size, 'Scale applied:', targetScale)
    }
  }, [scene])

  // Find the Screen object in the scene
  useEffect(() => {
    if (scene) {
      // Find the Screen object and rotate it to make it more level
      const findScreenObject = (obj) => {
        if (obj.name === 'Screen') {
          console.log('Found Screen object:', obj)
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
        console.log('Rotated screen object')
      }
    }
  }, [scene])

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Render the entire scene hierarchy properly */}
      <primitive object={scene} />
      
      {/* Try to attach content to the Screen object */}
      {scene && (
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
            zIndex: 1000,
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
  return (
    <Canvas camera={{ position: [-5, 0, 13], fov: 55 }}>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <group rotation={[0, 0, 0]} position={[0, 0, 3]}>
          <Model />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
    </Canvas>
  )
} 