// step-nav.js
import { getLastCLICKEDLink } from "./sidebar-state.js"
import { mainTargetDiv } from "../core/inject-content.js"
import { toggleImgSizes } from "../ui/toggle-img-sizes.js"
let steps = []
let iSteps = 0
let target
let lastStep
let allImgs = []
let stepClicked = false
let stepCopyCodes = []
export function initStepNav(){
    stepClicked = false
    updateSteps()
}
export function updateSteps(){
    steps = mainTargetDiv.querySelectorAll('.step-float')
    allImgs = mainTargetDiv.querySelectorAll('.step-img img, step-vid video')
    allImgs.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            toggleImgSizes(e.target)
        });
    })
    steps.forEach((el,i) => {
        el.addEventListener('focus', e => {
            stepClicked = false
            lastStep = steps[i]
        });
    })
    steps.forEach(el => {
        el.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()
            const img = e.target.querySelector('img,video')
            if(key === 'enter'){
                stepClicked =true
                if(stepClicked){
                    focusToCopyCodes(e.target)

                }
            }
            if (e.shiftKey && key === 'enter') {
                console.log('enter')
                toggleImgSizes(img)
            }
        });
    })
}
export function stepNav({e,navState}){
    if (navState.zone !== 'mainTargetDiv') return false
    const key = e.key.toLowerCase()
    
    if(!isNaN(key)){
        const intLet = parseInt(key)
        iSteps = steps[intLet - 1]
        if(intLet > steps.length) iSteps = steps.length - 1

        steps[intLet - 1].focus()
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
            
            mainTargetDiv.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
                // inline: 'nearest',
            })
            mainTargetDiv.focus()
        }
        return true
    }
    if(!stepClicked){
        if(key === 'a'){
            iSteps = (iSteps - 1 + steps.length) % steps.length
            // steps[iSteps].focus()
            stepFocus(iSteps)
            return true
        }
        if(key === 'f'){
            if(e.target === mainTargetDiv){
                iSteps = 0
            } else {
                iSteps = (iSteps + 1) % steps.length
            }
            stepFocus(iSteps)
            return true
        }
        return true
    }
    return false
}
function focusToCopyCodes(step){
    const copyCodes = step.querySelectorAll('.copy-code')
    copyCodes.forEach(el =>{
        el.setAttribute('tabindex','0')
    })
}
function stepFocus(index){steps[index].focus()}
export function getLastStep(){return lastStep}