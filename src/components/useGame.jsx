import { create } from 'zustand'

export const useJoystickControlsStore = create( (set)=> ({
    isEnabled: false,
    enable : () => set({isEnabled : true}),
    disable : () => set({isEnabled : false})
    
}))

export const useReady = create ( (set)=>({
    isReady : false,
    enable : ()=> set({isReady: true})
}))