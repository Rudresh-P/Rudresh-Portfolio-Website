/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshMatcapMaterial, TextureLoader } from "three";
import { useBox } from "@react-three/cannon";






export function Name(props) {
    const { nodes, materials } = useGLTF("/name.glb");

    const texture = new TextureLoader().load("https://raw.githubusercontent.com/nidorx/matcaps/master/512/3B3C3F_DAD9D5_929290_ABACA8-512px.png")
    const material = new MeshMatcapMaterial({
        matcap: texture
    })



    const preset = {
        mass: 5,
        args: [0.19, 0.38, 0.15],
        restitution: 0.25
        // position:[-1, 0.025, 0],
        // rotation:[Math.PI / 2, 0, 0]


    }

    const [L1] = useBox(() => ({
        ...preset,
        position: [-0.699, 0.23, 0]
    }), useRef(null))
    const [L2] = useBox(() => ({
        ...preset,
        position: [-0.443, 0.2, 0]
    }), useRef(null))
    const [L3] = useBox(() => ({
        ...preset,
        position: [-0.214, 0.201, 0]
    }), useRef(null))
    const [L4] = useBox(() => ({
        ...preset,
        position: [0.016, 0.201, 0]
    }), useRef(null))
    const [L5] = useBox(() => ({
        ...preset,
        position: [0.224, 0.201, 0]
    }), useRef(null))
    const [L6] = useBox(() => ({
        ...preset,
        position: [0.44, 0.201, 0]
    }), useRef(null))
    const [L7] = useBox(() => ({
        ...preset,
        position: [0.671, 0.201, 0]
    }), useRef(null))



    return (
        <group {...props} dispose={null}>
            <mesh
                ref={L1}
                castShadow
                receiveShadow
                geometry={nodes.Text001.geometry}
                material={material}
                position={[-0.699, 0.201, 0]}
            />
            <mesh
                ref={L2}
                castShadow
                receiveShadow
                geometry={nodes.Text002.geometry}
                material={material}
                position={[-0.443, 0.2, 0]}
            />
            <mesh
                ref={L3}
                castShadow
                receiveShadow
                geometry={nodes.Text003.geometry}
                material={material}
                position={[-0.214, 0.201, 0]}
            />
            <mesh
                ref={L4}
                castShadow
                receiveShadow
                geometry={nodes.Text004.geometry}
                material={material}
                position={[0.016, 0.201, 0]}
            />
            <mesh
                ref={L5}
                castShadow
                receiveShadow
                geometry={nodes.Text005.geometry}
                material={material}
                position={[0.224, 0.201, 0]}
            />
            <mesh
                ref={L6}
                castShadow
                receiveShadow
                geometry={nodes.Text006.geometry}
                material={material}
                position={[0.44, 0.201, 0]}
            />
            <mesh
                ref={L7}
                castShadow
                receiveShadow
                geometry={nodes.Text007.geometry}
                material={material}
                position={[0.671, 0.201, 0]}
            />
        </group>
    );
}

useGLTF.preload("/name.glb");