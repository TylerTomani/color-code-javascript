import { getLastCLICKEDLink } from "./sidebar-state.js"
import { mainTargetDiv } from "../core/inject-content.js"
let steps = []
export function initStepNav(){
    updateSteps()
}
function updateSteps(){
    steps = mainTargetDiv.querySelectorAll('.step-float')
}
// step-nav.js
export function stepNav({e,navState}){
    const key = e.key.toLowerCase()

    console.log(steps)
    if(key === 's'){
        getLastCLICKEDLink().focus()        
        return true
    }
    if(key === 'f'){
        return true
    }   
    return true
}