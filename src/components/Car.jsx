import { useBox, useRaycastVehicle } from "@react-three/cannon"
import { useEffect, useRef, useState } from "react"
import { useWheels } from "./useWheel"
import { useKeyboardControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3 } from "three"

export default function Car({followCar}) {

    // Set up Initial positions and dimentions
    const position = [2, 0.5, 1]
    const width = 0.15
    const height = 0.07
    const front = 0.15
    const wheelRadius = 0.05


    // Create a cannon Box to be used as the Car Chassis
    const chassisBodyArgs = [width, height, front * 2]

    const [chassisBody, chassisBodyApi] = useBox(() => {
        return {
            mass: 150,
            args: chassisBodyArgs,
            position: position
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


    // Controls

    const forward = useKeyboardControls(state => state.forward)
    const backward = useKeyboardControls(state => state.backward)
    const left = useKeyboardControls(state => state.left)
    const right = useKeyboardControls(state => state.right)

    const [ subscribeKeys , _getKeys ] = useKeyboardControls()

    const camera = useThree((state) => state.camera)
    const [bodyPosition] = useState(() => new Vector3(0,0,0))
    const [smoothedCameraPosition] = useState(() => new Vector3(5,5,5))
    const [smoothedCameraTarget] = useState(() => new Vector3(5,5,5))

    useEffect( ()=> {
        const unSubscribeResetKey = subscribeKeys(
            (state)=> state.reset,
            (value)=>{ 

                if(value){
                    chassisBodyApi.position.set(2, 0.5, 1)
                    chassisBodyApi.velocity.set(0,0,0)
                    chassisBodyApi.angularVelocity.set(0,0,0)
                    chassisBodyApi.rotation.set(0,0,0)
                }

                
                
            }
        )

        const unSubscribeChassisPosition = chassisBodyApi.position.subscribe( (pos)=>{
            

            if(!followCar) return
            bodyPosition.set(pos[0],pos[1],pos[2])
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
    },[followCar])

    useFrame((_state, _delta) => {
        if (forward) {
            vehicleApi.applyEngineForce(150, 2)
            vehicleApi.applyEngineForce(150, 3)
        }
        else if (backward) {
            vehicleApi.applyEngineForce(-150, 2)
            vehicleApi.applyEngineForce(-150, 3)
        } else {
            vehicleApi.applyEngineForce(0, 2)
            vehicleApi.applyEngineForce(0, 3)
            // vehicleApi.setBrake(0.1, 0)
            // vehicleApi.setBrake(0.1, 1)
            // vehicleApi.setBrake(0.1, 2)
            // vehicleApi.setBrake(0.1, 3)
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
            for( let i = 0; i < 4; i++){
                vehicleApi.setSteeringValue(0, i)
            }
        }

        // Camera Update

        // _state.camera.position.set()
        ;
    })

    return <>

        <group ref={vehicle}>
            <mesh ref={chassisBody} onClick={() => { console.log("hee"); }}>
                <boxGeometry args={chassisBodyArgs} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </group>



    </>
}