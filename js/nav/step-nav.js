// step-nav.js
import { getLastCLICKEDLink } from "./sidebar-state.js"
import { mainTargetDiv } from "../core/inject-content.js"
import { handleImgSizes,denlargeAllImages } from "../ui/toggle-img-sizes.js"
import { changeTutorialLink } from "../ui/change-tutorial-link.js"
// nonSideBarEls is an awfule way to do this but i'm desperate right now
let nonSideBarEls =[]
let steps = []
let copyCodes = []
let iSteps = 0
let target
let lastStep
let allImgs = []
let stepClicked = false
let iCopyCodes = 0
let stepCopyCodes = []
export function initStepNav(){{
    copyCodes = []
    updateSteps()
    updateCopyCodes()
}}
export function updateSteps(){
    steps = mainTargetDiv.querySelectorAll('.step-float')
    allImgs = mainTargetDiv.querySelectorAll('.step-img img, step-vid video')
    nonSideBarEls = [...document.querySelectorAll('[id],a')].filter(el => {
        if(!el.closest('.side-bar'))
        return el
    })
    copyCodes = updateCopyCodes()
    copyCodes.forEach(el => {
        el.addEventListener('keydown', e => {
            const key = e.key.toLowerCase()
            if(e.shiftKey && key === 'enter'){
                
                handleImgSizes({e})
            }
            if(key === 'enter'){
                // 
                
                handleImgSizes({e})
                scrollToCenter({e})
            }
        });
    })
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
            denlargeAllImages(allImgs)
            removeStepClicked(steps)            
            stepClicked = false
            iSteps = i
            iCopyCodes = 0
            lastStep = steps[iSteps]
            scrollToCenter({e})

        })
        
        
        el.addEventListener('click', e => {
            lastStep = steps[iSteps]
            if(e.type != 'click') return
            changeTutorialLink(e)
            // scrollToCenter({e})
        });
        el.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()
            
            if (key === 'enter') {
                stepClicked = true
                // e.target.scrollIntoView({ behavior: 'instant', block: 'center' })
                let smooth = true
                // scrollToCenter({e})
                handleStepClickedNav({e})
                changeTutorialLink(e)
            }
            if(e.shiftKey && key === 'enter'){
                // e.target.scrollIntoView({ behavior: 'instant', block: 'center' })
                // scrollToCenter({e})
                handleImgSizes({e})
                stepClicked = true
            }
        });
    })
    
}
function updateCopyCodes(){
    copyCodes = document.querySelectorAll('.copy-code')
    return copyCodes

}
export function stepNav({e,navState}){
    if (navState.zone !== 'mainTargetDiv') return false
    const key = e.key.toLowerCase()
    const step = e.target.closest('.step-float')
    if (stepClicked) {
        
        if(!step.classList.contains('step-clicked')){

            step.classList.add('step-clicked')
        }
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
            // lastStep?.focus()
        } else {
            
            mainTargetDiv.focus()
            mainTargetDiv.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
                // inline: 'nearest',
            })
        }
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
function stepFocus(index){
    steps[index].focus()
}
export function getLastStep(){return lastStep}

function getCopyCodes(step){
    if(!step) return
    let copyCodes = step.querySelectorAll('.copy-code')   
    copyCodes.forEach(el => {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0')
        }
    })
    if (copyCodes) return [...copyCodes] 
}
function handleStepClickedNav({e}){
    const step = e.target.closest('.step-float')
    const key = e.key.toLowerCase()
    if(key === 'enter'){
        if(!step) return
        stepCopyCodes = getCopyCodes(step)
        
        stepCopyCodes[iCopyCodes]?.focus()
    }
    if(!document.listenersAdded){
        stepCopyCodes.forEach((el,i,arr) => {
            el.addEventListener('focus', e => {
                iCopyCodes = i
            })
        })
        document.listenersAdded = true
    }
    if(key === 'a'){
        iCopyCodes = (iCopyCodes - 1 + stepCopyCodes.length) % stepCopyCodes.length    
    }
    if(key === 'f'){
        iCopyCodes = (iCopyCodes + 1) % stepCopyCodes.length
    }
    if(key === 'm'){
        step.focus()
    }
    stepCopyCodes[iCopyCodes]?.focus()
    // [iCopyCodes]?.focus()
    return true
}
// function 
function removeStepClicked(steps){
    steps.forEach(el => el.classList.remove('step-clicked'))
}
function scrollToStart({e,smooth}){
    const el = e.target
    el.scrollIntoView({ behavior: 'instant', block: 'start' })
}
function scrollToCenter({e,smooth}){
    const el = e.target
    if(smooth){
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }else {
        el.scrollIntoView({ behavior: 'instant', block: 'center' })
    }
}
function focusToNonSideBarEl(e){
    const key = e.key.toLowerCase()
    nonSideBarEls


}