import { usePlane } from "@react-three/cannon"
export default function Ground() {

    const [physicsPlane, planeApi] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0] }))
    return <>

        <mesh ref={physicsPlane}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="greenyellow" />
        </mesh>
    </>
}