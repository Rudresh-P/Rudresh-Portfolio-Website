import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Ground from './components/Ground.jsx'
import Car from './components/Car.jsx'
import { Name } from './components/Name.jsx'
import { useControls } from "leva";

export default function Experience() {

    const {followCar} = useControls({followCar:false})

     

    return <>

        {!followCar && <OrbitControls makeDefault />}
        <Lights />
        <Car followCar={followCar}/>
        <Name />
        <Ground />
    </>
}