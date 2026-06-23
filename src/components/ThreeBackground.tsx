import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleRing() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 150

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Create a nice distribution of points in a shell/sphere
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 6 + Math.random() * 8 // radius between 6 and 14

      arr[i] = r * Math.sin(phi) * Math.cos(theta)
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    
    // Slow default rotation
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
    
    // Slight mouse follow effect
    const targetX = state.pointer.x * 0.3
    const targetY = state.pointer.y * 0.3
    pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#06b6d4"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-20 bg-transparent pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleRing />
      </Canvas>
    </div>
  )
}
