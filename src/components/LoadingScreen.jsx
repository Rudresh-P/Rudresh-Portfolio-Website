import { useProgress } from "@react-three/drei"

export default function LoadingScreen(){ 
    const { progress } = useProgress()
    console.log(progress);
    
    return(
        <div className="loading_screen"> loading {progress}</div>
    )
}