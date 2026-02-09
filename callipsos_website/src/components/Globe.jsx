//
//
import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    globe: {
        radius: 2.5,
        rows: 100,
        dotsPerRow: 600,
        dotSize: 0.018,
        dotColor: '#78716c',
        dotOpacity: 0.5,
    },
    continents: {
        dotSize: 0.020,
        dotColor: '#e7e5e4',
        glowColor: '#a8a29e',
        step: 6,
        dotOpacity: 0.9,
        glowOpacity: 0.15,
    },
    atmosphere: {
        glowColor: new THREE.Color(0.180, 0.176, 0.176),
        intensity: 1.5,
        scale: 0.999,
        falloff: 2.4,
    },
    nodes: {
        live: [
            { lat: 40.7, lon: -74, name: 'New York' },
            { lat: 37.7, lon: -122.4, name: 'San Francisco' },
            { lat: -23.5, lon: -46.6, name: 'São Paulo' },
            { lat: 51.5, lon: -0.1, name: 'London' },
            { lat: 52.5, lon: 13.4, name: 'Berlin' },
            { lat: 35.6, lon: 139.6, name: 'Tokyo' },
            { lat: 1.3, lon: 103.8, name: 'Singapore' },
            { lat: 22.3, lon: 114.1, name: 'Hong Kong' },
            { lat: -33.8, lon: 151.2, name: 'Sydney' },
            { lat: 25.2, lon: 55.2, name: 'Dubai' },
            { lat: -1.3, lon: 36.8, name: 'Nairobi' },
        ],
        liveColor: '#10b981',
        size: 0.045,
        hoverScale: 1.5,
        bounceHeight: 0.1,
    },
    arcs: {
        color: '#10b981',
        opacity: 0.35,
        height: 0.3,
    },
    rotation: {
        speed: 0.0003,
        baseTilt: 0.4,
        maxTiltAngle: 0.25,
        tiltSmoothing: 0.04,
    },
}

const ARC_CONNECTIONS = [
    [0, 3],
    [3, 4],
    [4, 9],
    [7, 5],
    [7, 6],
    [6, 8],
    [9, 10],
]

// ============================================
// UTILITY
// ============================================
function latLonToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    )
}

// ============================================
// RESPONSIVE CAMERA
// ============================================
function ResponsiveCamera() {
    const { camera, size } = useThree()

    useEffect(() => {
        // Adjust camera distance based on screen width
        // Mobile needs camera further back to see full globe
        const isMobile = size.width < 768
        const isTablet = size.width >= 768 && size.width < 1024

        if (isMobile) {
            camera.position.z = 7.5
            camera.fov = 50
        } else if (isTablet) {
            camera.position.z = 7
            camera.fov = 47
        } else {
            camera.position.z = 6.5
            camera.fov = 45
        }
        camera.updateProjectionMatrix()
    }, [camera, size.width])

    return null
}

// ============================================
// DOTTED GLOBE (base grid)
// ============================================
function DottedGlobe() {
    const positions = useMemo(() => {
        const pos = []
        const { radius, rows, dotsPerRow } = CONFIG.globe

        for (let i = 0; i <= rows; i++) {
            const v = i / rows
            const theta = v * Math.PI
            const rowDotCount = Math.floor(Math.sin(theta) * dotsPerRow)

            for (let j = 0; j < rowDotCount; j++) {
                const u = j / rowDotCount
                const phi = u * Math.PI * 2

                const x = radius * Math.sin(theta) * Math.cos(phi)
                const y = radius * Math.cos(theta)
                const z = radius * Math.sin(theta) * Math.sin(phi)

                pos.push(x, y, z)
            }
        }

        return new Float32Array(pos)
    }, [])

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color={CONFIG.globe.dotColor}
                size={CONFIG.globe.dotSize}
                sizeAttenuation
                transparent
                opacity={CONFIG.globe.dotOpacity}
                depthWrite={false}
            />
        </points>
    )
}

// ============================================
// CONTINENT DOTS
// ============================================
function ContinentDots() {
    const [positions, setPositions] = useState(null)

    useEffect(() => {
        const img = new Image()
        img.src = '/textures/earth-landmask.jpg'

        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            const imageData = ctx.getImageData(0, 0, img.width, img.height)
            const data = imageData.data

            const pos = []
            const radius = CONFIG.globe.radius * 1.002
            const sampleStep = CONFIG.continents.step

            for (let y = 0; y < img.height; y += sampleStep) {
                const v = y / img.height
                const lat = 90 - v * 180

                let effectiveStep = sampleStep
                if (lat < -55 || lat > 75) {
                    effectiveStep = sampleStep * 3
                } else if (lat < -40 || lat > 60) {
                    effectiveStep = sampleStep * 1.5
                }

                for (let x = 0; x < img.width; x += effectiveStep) {
                    const i = (y * img.width + x) * 4
                    const r = data[i], g = data[i + 1], b = data[i + 2]
                    const brightness = (r + g + b) / 3
                    const isLand = brightness > 25

                    if (isLand) {
                        const u = x / img.width
                        const lon = u * 360 - 180
                        const phi = (90 - lat) * Math.PI / 180
                        const theta = (lon + 180) * Math.PI / 180

                        const px = -radius * Math.sin(phi) * Math.cos(theta)
                        const py = radius * Math.cos(phi)
                        const pz = radius * Math.sin(phi) * Math.sin(theta)

                        pos.push(px, py, pz)
                    }
                }
            }

            setPositions(new Float32Array(pos))
        }
    }, [])

    if (!positions) return null

    return (
        <group>
            {/* Glow layer */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color={CONFIG.continents.glowColor}
                    size={CONFIG.continents.dotSize * 2.5}
                    sizeAttenuation
                    transparent
                    opacity={CONFIG.continents.glowOpacity}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>

            {/* Main continent dots */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color={CONFIG.continents.dotColor}
                    size={CONFIG.continents.dotSize}
                    sizeAttenuation
                    transparent
                    opacity={CONFIG.continents.dotOpacity}
                    depthWrite={false}
                />
            </points>
        </group>
    )
}

// ============================================
// ATMOSPHERE GLOW
// ============================================
function Atmosphere() {
    const meshRef = useRef()

    const uniforms = useMemo(() => ({
        glowColor: { value: CONFIG.atmosphere.glowColor },
        intensity: { value: CONFIG.atmosphere.intensity },
        falloff: { value: CONFIG.atmosphere.falloff },
    }), [])

    useFrame((state) => {
        if (meshRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.01
            meshRef.current.scale.setScalar(CONFIG.atmosphere.scale + pulse)
        }
    })

    return (
        <mesh ref={meshRef} scale={CONFIG.atmosphere.scale}>
            <sphereGeometry args={[CONFIG.globe.radius, 64, 64]} />
            <shaderMaterial
                vertexShader={`
          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
                fragmentShader={`
          uniform vec3 glowColor;
          uniform float intensity;
          uniform float falloff;

          varying vec3 vNormal;
          varying vec3 vPosition;

          void main() {
            vec3 viewDirection = normalize(-vPosition);
            float fresnel = dot(vNormal, viewDirection);
            fresnel = abs(fresnel);
            fresnel = 1.0 - fresnel;

            float innerGlow = pow(fresnel, falloff);
            float outerRim = pow(fresnel, falloff * 1.8);
            float combinedGlow = mix(innerGlow, outerRim, 0.4);
            float alpha = combinedGlow * intensity * 0.5;

            gl_FragColor = vec4(glowColor, alpha);
          }
        `}
                uniforms={uniforms}
                blending={THREE.AdditiveBlending}
                side={THREE.FrontSide}
                transparent
                depthWrite={false}
            />
        </mesh>
    )
}

// ============================================
// STATIC ARC
// ============================================
function StaticArc({ startNode, endNode }) {
    const geometry = useMemo(() => {
        const startVec = latLonToVector3(startNode.lat, startNode.lon, CONFIG.globe.radius * 1.01)
        const endVec = latLonToVector3(endNode.lat, endNode.lon, CONFIG.globe.radius * 1.01)

        const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)
        const dist = startVec.distanceTo(endVec)
        midPoint.normalize().multiplyScalar(CONFIG.globe.radius + dist * CONFIG.arcs.height)

        const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec)
        const points = curve.getPoints(50)

        return new THREE.BufferGeometry().setFromPoints(points)
    }, [startNode, endNode])

    return (
        <line geometry={geometry}>
            <lineBasicMaterial
                color={CONFIG.arcs.color}
                transparent
                opacity={CONFIG.arcs.opacity}
                depthWrite={false}
            />
        </line>
    )
}

// ============================================
// ARCS CONTAINER
// ============================================
function Arcs() {
    const arcs = useMemo(() => {
        return ARC_CONNECTIONS.map(([fromIdx, toIdx], i) => ({
            startNode: CONFIG.nodes.live[fromIdx],
            endNode: CONFIG.nodes.live[toIdx],
            key: i,
        })).filter(a => a.startNode && a.endNode)
    }, [])

    return (
        <group>
            {arcs.map((arc) => (
                <StaticArc key={arc.key} startNode={arc.startNode} endNode={arc.endNode} />
            ))}
        </group>
    )
}

// ============================================
// NODE
// ============================================
function Node({ position, color }) {
    const meshRef = useRef()
    const glowRef = useRef()
    const [hovered, setHovered] = useState(false)
    const targetScale = useRef(1)
    const currentBounce = useRef(0)

    useFrame((state) => {
        if (!meshRef.current) return

        const scaleTarget = hovered ? CONFIG.nodes.hoverScale : 1
        targetScale.current += (scaleTarget - targetScale.current) * 0.12

        if (hovered) {
            currentBounce.current = Math.abs(Math.sin(state.clock.elapsedTime * 8)) * CONFIG.nodes.bounceHeight
        } else {
            currentBounce.current *= 0.85
        }

        const dir = new THREE.Vector3(...position).normalize()
        const offset = dir.multiplyScalar(currentBounce.current)

        meshRef.current.position.set(
            position[0] + offset.x,
            position[1] + offset.y,
            position[2] + offset.z
        )
        meshRef.current.scale.setScalar(targetScale.current)

        if (glowRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.4 + 1.2
            glowRef.current.scale.setScalar(targetScale.current * pulse)
            glowRef.current.position.copy(meshRef.current.position)
        }

        if (meshRef.current.material) {
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.5 + 0.5
            meshRef.current.material.emissiveIntensity = 2 + pulse * 2
        }
    })

    return (
        <group>
            <mesh ref={glowRef} position={position}>
                <sphereGeometry args={[CONFIG.nodes.size * 1.8, 16, 16]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.15}
                    depthWrite={false}
                />
            </mesh>

            <mesh
                ref={meshRef}
                position={position}
                onPointerOver={(e) => {
                    e.stopPropagation()
                    setHovered(true)
                    document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                    setHovered(false)
                    document.body.style.cursor = 'auto'
                }}
            >
                <sphereGeometry args={[CONFIG.nodes.size, 24, 24]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2.5}
                    toneMapped={false}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </group>
    )
}

// ============================================
// NODES GROUP
// ============================================
function Nodes() {
    const nodes = useMemo(() => {
        return CONFIG.nodes.live.map((n) => {
            const pos = latLonToVector3(n.lat, n.lon, CONFIG.globe.radius * 1.015)
            return { position: [pos.x, pos.y, pos.z], color: CONFIG.nodes.liveColor }
        })
    }, [])

    return (
        <group>
            {nodes.map((node, i) => <Node key={i} {...node} />)}
        </group>
    )
}

// ============================================
// CURSOR TRACKER
// ============================================
function CursorTracker({ onCursorMove }) {
    useFrame((state) => {
        onCursorMove(state.pointer.x, state.pointer.y)
    })

    return null
}

// ============================================
// MAIN SCENE
// ============================================
function GlobeScene({ isHovered, setIsHovered }) {
    const groupRef = useRef()
    const currentSpeed = useRef(CONFIG.rotation.speed)

    const targetTiltX = useRef(0)
    const targetTiltZ = useRef(0)
    const currentTiltX = useRef(0)
    const currentTiltZ = useRef(0)

    const handleCursorMove = useCallback((x, y) => {
        if (isHovered) {
            targetTiltX.current = -y * CONFIG.rotation.maxTiltAngle
            targetTiltZ.current = x * CONFIG.rotation.maxTiltAngle
        } else {
            targetTiltX.current = 0
            targetTiltZ.current = 0
        }
    }, [isHovered])

    useFrame(() => {
        if (!groupRef.current) return

        const targetSpeed = isHovered ? CONFIG.rotation.speed * 6 : CONFIG.rotation.speed
        currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.08

        currentTiltX.current += (targetTiltX.current - currentTiltX.current) * CONFIG.rotation.tiltSmoothing
        currentTiltZ.current += (targetTiltZ.current - currentTiltZ.current) * CONFIG.rotation.tiltSmoothing

        groupRef.current.rotation.y += currentSpeed.current
        groupRef.current.rotation.x = CONFIG.rotation.baseTilt + currentTiltX.current
        groupRef.current.rotation.z = currentTiltZ.current
    })

    return (
        <>
            <ResponsiveCamera />
            <CursorTracker onCursorMove={handleCursorMove} />

            <group ref={groupRef} rotation={[CONFIG.rotation.baseTilt, 0, 0]}>
                {/* Hit area for hover detection */}
                <mesh
                    onPointerOver={(e) => {
                        e.stopPropagation()
                        setIsHovered(true)
                    }}
                    onPointerOut={(e) => {
                        e.stopPropagation()
                        setIsHovered(false)
                    }}
                >
                    <sphereGeometry args={[CONFIG.globe.radius * 1.3, 32, 32]} />
                    <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                </mesh>

                <Atmosphere />
                <ContinentDots />
                <Nodes />
                <Arcs />
            </group>
        </>
    )
}

// ============================================
// EXPORT
// ============================================
export default function Globe({ className = '' }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 6.5], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.15} />
                <pointLight position={[5, 3, 5]} intensity={0.3} color="#fafaf9" />

                <GlobeScene isHovered={isHovered} setIsHovered={setIsHovered} />
            </Canvas>
        </div>
    )
}

