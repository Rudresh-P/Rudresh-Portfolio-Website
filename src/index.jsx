import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Debug, Physics } from '@react-three/cannon'
import { KeyboardControls } from '@react-three/drei'
import { Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen.jsx'
const root = ReactDOM.createRoot(document.querySelector('#root'))


// Creating the key maps the keyboard control will use
const map = [
    { name: "forward", keys: ['ArrowUp', 'KeyW'] },
    { name: "backward", keys: ['ArrowDown', 'KeyS'] },
    { name: "left", keys: ['ArrowLeft', 'KeyA'] },
    { name: "right", keys: ['ArrowRight', 'KeyD'] },
    { name: "brake", keys: ['Space'] },
    { name: "reset", keys: ['KeyR'] },
]

const debug = true

root.render(
    <KeyboardControls map={map}>

        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 0.1,
                far: 200,
                position: [2.5, 4, 6]
            }}
        >
            {/* Cannon Physics and debug */}
            <Physics broadphase='SAP' gravity={[0, -2.6, 0]}>

                <Suspense fallback={null}>

                { debug ? 
                <Debug color="black" scale={1.01}>
                    <Experience />
                </Debug> 
                : 
                <Experience />
                }

                </Suspense>


            </Physics>
        </Canvas>
        <LoadingScreen />
    </KeyboardControls>

)