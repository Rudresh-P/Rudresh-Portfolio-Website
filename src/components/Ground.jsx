import { usePlane, useCompoundBody } from "@react-three/cannon"
import { ContactShadows } from "@react-three/drei"
export default function Ground() {

    const [physicsPlane, planeApi] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -0.01, 0] }))

    // Invisible Bounds
    const wallSize = [20, 2, 0.5]
    const wallOffset = wallSize[0]* 0.5 + 0.25
    const wallPositions = [
        [0, 1, wallOffset],
        [0, 1, -wallOffset],
        [wallOffset, 1, 0],
        [-wallOffset, 1, 0]
    ]
    const [_bounds] = useCompoundBody(() => ({
        mass: 0,
        position: [0, 0, 0],
        shapes: [
            {
                type: 'Box',
                position: wallPositions[0],
                args: wallSize,
            },
            {
                type: 'Box',
                position: wallPositions[1],
                args: wallSize,
            },
            {
                type: 'Box',
                position: wallPositions[2],
                args: wallSize,
                rotation: [0, Math.PI / 2, 0]
            },
            {
                type: 'Box',
                position: wallPositions[3],
                args: wallSize,
                rotation: [0, Math.PI / 2, 0]
            },

        ],
    }))


    return <>

        <mesh ref={physicsPlane}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <ContactShadows  />
    </>
}