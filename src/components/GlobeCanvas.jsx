import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import CanvasLoader from "./CanvasLoader"
import Globe from "./Globe"

function GlobeCanvas({ color }) {
    return (
        <Canvas>
            <Suspense fallback={<CanvasLoader />}>
                <PerspectiveCamera makeDefault position={[0, 0, 30]} />

                <Globe 
                    scale={0.23} 
                    color={color} 
                    rotation={[Math.PI / 2, Math.PI / 1.1, 0]}
                />

                <OrbitControls 
                    enableDamping
                    dampingFactor={0.05}
                    autoRotate
                    autoRotateSpeed={3}
                    enablePan={false}
                    enableZoom={false}
                />
            </Suspense>
        </Canvas>
    )
}

export default GlobeCanvas