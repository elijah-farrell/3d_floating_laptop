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
           group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 15 + 0.25, 0.1)
           group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 15, 0.1)
           group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 8) / 15, 0.1)
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
      const targetScale = 10 / maxDimension // Make it bigger
      
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
    <group ref={group} {...props} dispose={null} rotation-y={Math.PI}>
      {/* Render the entire scene hierarchy properly */}
      <primitive object={scene} />
      
      {/* Try to attach content to the Screen object */}
      {scene && (
        <Html 
          className="content" 
          rotation-x={0}
          rotation-y={0}
          rotation-z={0}
          position={[0, 0.65, -10.3]} // Based on Screen object position
          transform 
          occlude
          style={{
            width: '300px',
            height: '200px',
            background: 'red', // Make it red so we can see it clearly
            borderRadius: '4px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            fontSize: '12px'
          }}
        >
          <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
            <div style={{color: 'white', textAlign: 'center'}}>
              <h3>TEST SCREEN</h3>
              <p>If you can see this, the screen is working!</p>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [-5, 0, -15], fov: 55 }}>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Suspense fallback={null}>
        <group rotation={[0, 0, 0]} position={[0, -0.5, 4]}>
          <Model />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
    </Canvas>
  )
} 