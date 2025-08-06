import * as THREE from 'three'
import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import HeroPage from './HeroPage.jsx'

function Model(props) {
  const group = useRef()
  // Load model
  const { nodes, materials, scene } = useGLTF('/laptop.glb')
  
  // Make it float - adjusted for this specific model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 8) / 20, 0.1)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-0.5 + Math.sin(t / 2)) / 4, 0.1) // Even lower, more natural
  })

  // Calculate model bounds and adjust scale/position
  useEffect(() => {
    if (group.current) {
      const box = new THREE.Box3().setFromObject(group.current)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      
      // Calculate appropriate scale (target size around 5-8 units)
      const maxDimension = Math.max(size.x, size.y, size.z)
      const targetScale = 6 / maxDimension
      
      // Apply scale and center the model
      group.current.scale.setScalar(targetScale)
      group.current.position.sub(center.multiplyScalar(targetScale))
      
      console.log('Model bounds:', size, 'Scale applied:', targetScale)
    }
  }, [scene])

  // Diagnostic logging for model structure
  useEffect(() => {
    console.log('=== GLB MODEL DIAGNOSTICS ===')
    console.log('Scene:', scene)
    console.log('Nodes:', nodes)
    console.log('Materials:', materials)
    
    // Log each mesh with its transformations
    Object.entries(nodes).forEach(([name, node]) => {
      if (node.geometry) {
        console.log(`--- MESH: ${name} ---`)
        console.log('Position:', node.position)
        console.log('Rotation:', node.rotation)
        console.log('Scale:', node.scale)
        
        // Get geometry bounds
        const geometry = node.geometry
        geometry.computeBoundingBox()
        const box = geometry.boundingBox
        console.log('Geometry bounds size:', box.getSize(new THREE.Vector3()))
        console.log('Geometry bounds center:', box.getCenter(new THREE.Vector3()))
        
        console.log('Material:', node.material)
        
        // Classify if it's screen or keyboard based on position
        const isScreen = name.toLowerCase().includes('screen') || node.position.y > 0.5
        const isKeyboard = name.toLowerCase().includes('frame') || name.toLowerCase().includes('keyboard') || node.position.y < 0.5
        console.log('Classification:', { isScreen, isKeyboard })
      }
    })
    
    // Log scene hierarchy
    console.log('=== SCENE HIERARCHY ===')
    const logHierarchy = (obj, depth = 0) => {
      const indent = '  '.repeat(depth)
      console.log(`${indent}${obj.name} (${obj.type})`)
      console.log(`${indent}Position:`, obj.position)
      console.log(`${indent}Rotation:`, obj.rotation)
      console.log(`${indent}Scale:`, obj.scale)
      obj.children.forEach(child => logHierarchy(child, depth + 1))
    }
    logHierarchy(scene)
  }, [scene, nodes, materials])

  // Find the screen mesh for HTML content
  const findScreenMesh = () => {
    return nodes['Screen_ComputerScreen_0'] || Object.values(nodes).find(node => node.geometry)
  }

  const screenMesh = findScreenMesh()

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Render the entire scene hierarchy properly */}
      <primitive object={scene} />
      
      {/* Add HTML content to the screen mesh - compensating for model's internal rotation */}
      {screenMesh && (
        <Html 
          className="content" 
          rotation-x={Math.PI / 2} // Counter-rotate the 180-degree model rotation
          rotation-y={0}
          rotation-z={0}
          position={[0, 0.05, -0.09]} 
          transform 
          occlude
          style={{
            width: '400px',
            height: '300px',
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="wrapper" onPointerDown={(e) => e.stopPropagation()}>
            <HeroPage />
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
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI, 0]} position={[0, 0.2, 0]}>
          <Model />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -2, 0]} scale={15} blur={3} far={3} opacity={0.8} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        minPolarAngle={Math.PI / 2.2} 
        maxPolarAngle={Math.PI / 2.2} 
      />
    </Canvas>
  )
} 