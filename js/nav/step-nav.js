import { getLastCLICKEDLink } from "./sidebar-state.js"
import { mainTargetDiv } from "../core/inject-content.js"
let steps = []
let iSteps = 0
let target
let lastStep
export function initStepNav(){
    updateSteps()
    steps.forEach((el,i) => {
        el.addEventListener('focus', e => {
            lastStep = steps[i]
        });
    })
}
function updateSteps(){
    steps = mainTargetDiv.querySelectorAll('.step-float')
}
// step-nav.js
export function stepNav({e,navState}){
    if(navState.zone != 'mainTargetDiv') return
    const key = e.key.toLowerCase()
    
    // if(e.target == mainTargetDiv){
    //     if (key === 'f' || key === 'enter'){
    //        target = steps[0]
    //        target.focus()
    //        return true
    //    }


    // }
    // console.log(steps)
    if(key === 's'){
        getLastCLICKEDLink().focus()        
    }
    
    if(key === 'f'){
        iSteps = (iSteps + 1) % steps.length

        target = steps[iSteps]
        if(e.target == mainTargetDiv){
            target = steps[0]
        } else {
            
        }
        
    }   
    // if(key === 'a'){
    //     target = steps[(iSteps - 1 + steps.length) % steps.length]
    // }   
    if(key === 'm'){
        if(e.target != mainTargetDiv){
            mainTargetDiv.focus()
            mainTargetDiv.scrollIntoView({behavior:'smooth', block: 'nearest'})
        } else {
            console.log(lastStep)
            console.log('here')
            lastStep?.focus()

            // return 
        }
    }   
    // console.log(steps.length, "iSteps:", iSteps,target)
    console.log(iSteps)
    // target.focus()
    return true
}