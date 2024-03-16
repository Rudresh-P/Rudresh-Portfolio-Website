import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Ground from './components/Ground.jsx'
import Car from './components/Car.jsx'
import { Name } from './components/Name.jsx'
import { useControls } from "leva";
import { Suspense } from 'react'
import { Bowling } from './components/Bowling.jsx'

export default function Experience() {

    const {followCar} = useControls({followCar:true})

     

    return <>

        {!followCar && <OrbitControls makeDefault />}
        <Lights />
        <Car followCar={followCar}/>
        <Bowling />
        <Name />
        <Ground />
    </>
}