// step-nav.js
import { getLastCLICKEDLink } from "./sidebar-state.js"
import { mainTargetDiv } from "../core/inject-content.js"
let steps = []
let iSteps = 0
let target
let lastStep
export function initStepNav(){
    updateSteps()
    // console.log('here')
}
export function updateSteps(){
    steps = mainTargetDiv.querySelectorAll('.step-float')
    steps.forEach((el,i) => {
        el.addEventListener('focus', e => {
            console.log('here')
            lastStep = steps[i]
        });
    })
}

export function stepNav({e,navState}){
    if (navState.zone !== 'mainTargetDiv') return false
    const key = e.key.toLowerCase()
    if(!isNaN(key)){
        const intLet = parseInt(key)
        if(intLet > steps.length) steps[steps.length -1].focus()
            else steps[intLet - 1].focus()
        return true
    }
    if(key === 'enter' && e.target === mainTargetDiv){
        iSteps = 0
        steps[iSteps].focus()
        scrollTo(0,0)
        return true
    }
    if(key === 'm'){
        if(e.target === mainTargetDiv){
            lastStep?.focus()
        } else {
            mainTargetDiv.focus()
        }
        return true
    }
    if(key === 'a'){
        iSteps = (iSteps - 1 + steps.length) % steps.length
        steps[iSteps].focus()
        return true
    }
    if(key === 'f'){
        if(e.target === mainTargetDiv){
            iSteps = 0
        } else {
            iSteps = (iSteps + 1) % steps.length
        }
        steps[iSteps].focus()
        return true
    }
}

export function getLastStep(){
    return lastStep

}