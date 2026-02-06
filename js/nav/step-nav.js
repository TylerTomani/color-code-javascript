// step-nav.js
import { getLastCLICKEDLink } from "./sidebar-state.js"
import { mainTargetDiv } from "../core/inject-content.js"
import { handleImgSizes } from "../ui/toggle-img-sizes.js"
let steps = []
let iSteps = 0
let target
let lastStep
let allImgs = []
let stepClicked = false
let iCopyCodes = 0
let currentCopyCodes = []
export function initStepNav(){{
    updateSteps()
}}
export function updateSteps(){
    steps = mainTargetDiv.querySelectorAll('.step-float')
    allImgs = mainTargetDiv.querySelectorAll('.step-img img, step-vid video')
    allImgs.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            handleImgSizes({e})
        });
    })
    steps.forEach((el,i) => {
        if(el.hasAttribute('autofocus')){
            el.focus()
        }
        
        el.addEventListener('focus', e => {
            stepClicked = false
            iSteps = i
            lastStep = steps[iSteps]
        })
        
        el.addEventListener('click', e => {
            lastStep = steps[iSteps]
            e.target.scrollIntoView({behavior:'smooth',block: 'start'})
        });
        el.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()
            
            if (key === 'enter') {
                stepClicked = true
                e.target.scrollIntoView({ behavior: 'instant', block: 'center' })
                handleStepClickedNav({e})
            }
            if(e.shiftKey && key === 'enter'){
                handleImgSizes({e})
                stepClicked = true
            }
        });
    })
    
}
export function stepNav({e,navState}){
    if (navState.zone !== 'mainTargetDiv') return false
    const key = e.key.toLowerCase()
    
    if (stepClicked) {
        handleStepClickedNav({ e })
        return true
    }
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
    if(key === 'a'){
        iSteps = (iSteps - 1 + steps.length) % steps.length
        // steps[iSteps].focus()
        stepFocus(iSteps)
        return true
    }
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
    
    return false
}
function stepFocus(index){{steps[index].focus()}}
export function getLastStep(){return lastStep}

function getCopyCodes(step){
    if(!step) return
    let copyCodes = step.querySelectorAll('.copy-code')   
    if (copyCodes) return [...copyCodes] 
}
function handleStepClickedNav({e}){
    const step = e.target.closest('.step-float')
    const key = e.key.toLowerCase()
    if(key === 'enter'){
        currentCopyCodes = getCopyCodes(step)
        currentCopyCodes[iCopyCodes]?.focus()
    }
    if(!document.listenersAdded){
        console.log('here')
        currentCopyCodes.forEach((el,i,arr) => {
            el.addEventListener('focus', e => {
                iCopyCodes = i
            })
        })
        document.listenersAdded = true
    }
    if(key === 'a'){
        iCopyCodes = (iCopyCodes - 1 + currentCopyCodes.length) % currentCopyCodes.length    
    }
    if(key === 'f'){
        iCopyCodes = (iCopyCodes + 1) % currentCopyCodes.length
    }
    if(key === 'm'){
        step.focus()
    }
    currentCopyCodes[iCopyCodes].focus()
    // [iCopyCodes]?.focus()
    
}