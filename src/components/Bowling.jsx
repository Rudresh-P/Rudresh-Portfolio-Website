import React, { useRef } from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";

export function Bowling(props) {
    const { nodes, materials } = useGLTF("/bowling.glb");

    const pinPositions = [
        [-14.199, 0.3, 4.657],
        [-14.422, 0.3, 4.504],
        [-14.426, 0.3, 4.804],
        [-14.652, 0.3, 4.951],
        [-14.649, 0.3, 4.652],
        [-14.645, 0.3, 4.351],
        [-14.879, 0.3, 5.099],
        [-14.876, 0.3, 4.799],
        [-14.872, 0.3, 4.499],
        [-14.869, 0.3, 4.199]
]


        const pinRefs = [] 
        
        pinPositions.forEach((val)=>{

            const [ ref , refApi] = useBox( ()=>({
                position:val,
                mass:2,
                args:[0.15,0.7,0.15]
            }),useRef(null))

            pinRefs.push({ pin:ref, pinApi: refApi})
        })

    

    

    const [sphere] = useSphere(() => ({
        mass: 10,
        args: [0.262],
        position: [-6.084, 1, 4.656]
    }), useRef(null))
    return (
        <group {...props} dispose={null}>

            <group position={[-6.084, 0, 3]}>
                <mesh >
                    <boxGeometry args={[0.25, 0.05, 0.25]} />
                </mesh>

            </group>

            <mesh
                ref={sphere}

                geometry={nodes.Sphere.geometry}
                material={materials["Material.006"]}
                // position={[-6.084, 0, 4.656]}
                // rotation={[Math.PI, -0.836, Math.PI]}
                scale={0.262}
            />
            <group
            ref={pinRefs[0].pin}
                position={[-14.199, 0, 4.657]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder006_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder006_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[1].pin}
                position={[-14.422, 0, 4.504]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder001_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder001_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[2].pin}
                position={[-14.426, 0, 4.804]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder002_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder002_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[3].pin}
                position={[-14.652, 0, 4.951]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder003_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder003_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[4].pin}
                position={[-14.649, 0, 4.652]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder004_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder004_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[5].pin}
                position={[-14.645, 0, 4.351]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder005_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder005_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[6].pin}
                position={[-14.879, 0, 5.099]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder007_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder007_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[7].pin}
                position={[-14.876, 0, 4.799]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder008_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder008_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[8].pin}
                position={[-14.872, 0, 4.499]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder009_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder009_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>
            <group
            ref={pinRefs[9].pin}
                position={[-14.869, 0, 4.199]}
                rotation={[0, 1.559, 0]}
                scale={0.114}
            >
                <mesh
                    geometry={nodes.Cylinder010_1.geometry}
                    material={materials["Material.001"]}
                />
                <mesh
                    geometry={nodes.Cylinder010_2.geometry}
                    material={materials["Material.002"]}
                />
            </group>


        </group>
    );
}

useGLTF.preload("/bowling.glb");
