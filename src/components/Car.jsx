import { useBox, useRaycastVehicle } from "@react-three/cannon"
import { Suspense, useEffect, useRef, useState } from "react"
import { useWheels } from "./useWheel"
import { useGLTF, useKeyboardControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"

export default function Car({ followCar }) {

    // Set up Initial positions and dimentions
    const position = [2, 0.5, 1]
    const width = 0.35
    const height = 0.25
    const front = 0.35
    const wheelRadius = 0.165


    // Create a cannon Box to be used as the Car Chassis
    const chassisBodyArgs = [width, height, front * 2]

    const [chassisBody, chassisBodyApi] = useBox(() => {
        return {
            mass: 100,
            args: chassisBodyArgs,
            position: position,
            rotation: [0, Math.PI, 0],
        }
    }, useRef(null))

    // Import the useWheel Helper to be used with the Vehicle
    const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius)

    // Create a new RaycastVehicle Cannon component, assign the chassis, wheelInfos and Wheel 
    const [vehicle, vehicleApi] = useRaycastVehicle(() => {
        return {
            chassisBody,
            wheelInfos,
            wheels
        }
    }, useRef(null)
    )

    // Load Model and get wheels
    const model = useGLTF("/racer.glb")
    useGLTF.preload("/racer.glb")

    const bodyMesh = model.scene.getObjectByName("car_body")
    const frontLeft = model.scene.getObjectByName("Wheel_Front_left")
    const frontRight = model.scene.getObjectByName("Wheel_front_right")
    const rearLeft = model.scene.getObjectByName("Wheel_rear_left")
    const rearRight = model.scene.getObjectByName("Wheel_rear_right")


    // Controls

    const forward = useKeyboardControls(state => state.forward)
    const backward = useKeyboardControls(state => state.backward)
    const left = useKeyboardControls(state => state.left)
    const right = useKeyboardControls(state => state.right)
    const brake = useKeyboardControls(state => state.brake)

    const [subscribeKeys, _getKeys] = useKeyboardControls()

    const camera = useThree((state) => state.camera)
    const [bodyPosition] = useState(() => new Vector3(0, 0, 0))
    const [smoothedCameraPosition] = useState(() => new Vector3(5, 5, 5))
    const [smoothedCameraTarget] = useState(() => new Vector3(5, 5, 5))

    useEffect(() => {
        // Subscribe to the Reset key and reset the vehicle postion and velocity on pressed
        const unSubscribeResetKey = subscribeKeys(
            (state) => state.reset,
            (value) => {
                if (value) {
                    chassisBodyApi.position.set(2, 0.5, 1)
                    chassisBodyApi.velocity.set(0, 0, 0)
                    chassisBodyApi.angularVelocity.set(0, 0, 0)
                    chassisBodyApi.rotation.set(0, 0, 0)
                }

            }
        )

        // Make camera Follow Car
        const unSubscribeChassisPosition = chassisBodyApi.position.subscribe((pos) => {

            if (!followCar) return
            bodyPosition.set(pos[0], pos[1], pos[2])
            smoothedCameraTarget.lerp(bodyPosition, 0.8)
            bodyPosition.x += 2.5
            bodyPosition.y += 4
            bodyPosition.z += 6

            smoothedCameraPosition.lerp(bodyPosition, 0.1)

            camera.position.copy(smoothedCameraPosition)
            camera.lookAt(smoothedCameraTarget)


        })

        return () => {
            unSubscribeResetKey()
            unSubscribeChassisPosition()
        }
    }, [followCar, vehicle])




    // UseFrame to run on every frame, apply foces and steering values for the vehicle
    useFrame((_state, _delta) => {
        if (forward) {
            vehicleApi.applyEngineForce(200, 2)
            vehicleApi.applyEngineForce(200, 3)
        }
        else if (backward) {
            vehicleApi.applyEngineForce(-200, 2)
            vehicleApi.applyEngineForce(-200, 3)
        } else {
            vehicleApi.applyEngineForce(0, 2)
            vehicleApi.applyEngineForce(0, 3)
            vehicleApi.applyEngineForce(0, 0)
            vehicleApi.applyEngineForce(0, 1)
        }

        if (left) {
            vehicleApi.setSteeringValue(0.35, 2)
            vehicleApi.setSteeringValue(0.35, 3)
            vehicleApi.setSteeringValue(-0.1, 0)
            vehicleApi.setSteeringValue(-0.1, 1)
        }
        else if (right) {
            vehicleApi.setSteeringValue(-0.35, 2)
            vehicleApi.setSteeringValue(-0.35, 3)
            vehicleApi.setSteeringValue(0.1, 0)
            vehicleApi.setSteeringValue(0.1, 1)

        } else {
            for (let i = 0; i < 4; i++) {
                vehicleApi.setSteeringValue(0, i)
            }
        }
        // Apply Braking Force when space key is pressed
        if (brake) {
            console.log("break");
            vehicleApi.applyEngineForce(0, 0)
            vehicleApi.applyEngineForce(0, 1)
            vehicleApi.setBrake(2.5, 2)
            vehicleApi.setBrake(2.5, 3)
        } else {
            vehicleApi.setBrake(0, 2)
            vehicleApi.setBrake(0, 3)
        }



    })

    return <>

        <Suspense fallback={ <mesh> <boxGeometry /></mesh>}>

            <group ref={vehicle}>

                <primitive object={bodyMesh} ref={chassisBody} scale={[0.05, 0.05, 0.05]} />
                <primitive object={frontLeft} ref={wheels[0]} scale={[0.05, 0.05, 0.05]} />
                <primitive object={frontRight} ref={wheels[1]} scale={[0.05, 0.05, 0.05]} />
                <primitive object={rearLeft} ref={wheels[2]} scale={[0.05, 0.05, 0.05]} />
                <primitive object={rearRight} ref={wheels[3]} scale={[0.05, 0.05, 0.05]} />

            </group>
        </Suspense>




    </>
}