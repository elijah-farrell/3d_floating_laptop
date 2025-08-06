import * as THREE from 'three'
import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Environment, useGLTF, ContactShadows, OrbitControls } from '@react-three/drei'
import HeroPage from './HeroPage.jsx'

function Model(props) {
  const group = useRef()
  // Load model
  const { nodes, materials, scene } = useGLTF('/laptop.glb')
  
  // Make it float
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20 + 0.25, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
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
      const targetScale = 6 / maxDimension
      
      // Apply scale and center the model
      group.current.scale.setScalar(targetScale)
      group.current.position.sub(center.multiplyScalar(targetScale))
      
      console.log('Model bounds:', size, 'Scale applied:', targetScale)
    }
  }, [scene])

  // Find the screen mesh (look for screen-related names)
  const findScreenMesh = () => {
    const screenNames = ['Screen', 'screen', 'Display', 'display', 'Monitor', 'monitor']
    for (const name of screenNames) {
      if (nodes[name]) {
        console.log('Found screen mesh:', name)
        return nodes[name]
      }
    }
    
    // If no screen found, return the first mesh
    const firstMesh = Object.values(nodes).find(node => node.geometry)
    console.log('Using first mesh as screen')
    return firstMesh
  }

  const screenMesh = findScreenMesh()

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Render all meshes from the model */}
      {Object.entries(nodes).map(([name, node]) => {
        if (node.geometry) {
          return (
            <mesh
              key={name}
              geometry={node.geometry}
              material={node.material || materials[node.material] || materials.default}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
            >
              {/* Add HTML content to the screen mesh */}
              {screenMesh && node === screenMesh && (
                <Html 
                  className="content" 
                  rotation-x={-Math.PI / 2} 
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
            </mesh>
          )
        }
        return null
      })}
    </group>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [-8, 2, -8], fov: 60 }}>
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <group rotation={[0, Math.PI / 4, 0]} position={[0, 0, 0]}>
          <Model />
        </group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
      <OrbitControls enablePan={true} enableZoom={true} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  )
} 