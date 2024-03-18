import { useProgress } from "@react-three/drei"
import { useJoystickControlsStore , useReady} from "./useGame"

export default function LoadingScreen() {
    const { progress } = useProgress()
    const enableJoystick = useJoystickControlsStore((state)=> state.enable)
    const isReady = useReady((state)=> state.enable)

    const handleClick = (e) => {
        if (e.type === "touchend") {
            enableJoystick()            
        }
        isReady()
        document.getElementsByClassName("loading_screen")[0].style.display = "none"
    }

    return (
        <div className="loading_screen">
            <button className="loading_screen_button" onPointerDown={handleClick} onTouchEnd={handleClick}> {progress < 100 ? "Loading.." : "Ready"}</button>
        </div>
    )
}