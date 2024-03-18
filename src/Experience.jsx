import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Ground from './components/Ground.jsx'
import Car from './components/Car.jsx'
import { Name } from './components/Name.jsx'
import { useControls } from "leva";
import { Suspense } from 'react'
import { Bowling } from './components/Bowling.jsx'
import { useReady } from './components/useGame.jsx'

export default function Experience() {

    const {followCar} = useControls({followCar:true})
    const isReady = useReady( state => state.isReady)

     

    return <>

        {!followCar && <OrbitControls makeDefault />}
        <Lights />
        {isReady && <Car followCar={followCar}/> }
        <Bowling />
        <Name />
        <Ground />
    </>
}