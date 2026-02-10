// keyboard-nav.js
/**  Notice what changed:
👉 keyboardNav no longer decides behavior
It just updates truth.
*/
import { mainContainer } from "../core/main-script.js"
import { navLessonTitle } from "./nav-lesson-title-nav.js"
import { getFocusZone } from "./get-focus-zone.js"
import { popupLetterNav } from "../ui/popups.js"
import { letterNav } from "./letter-nav.js"
import { sideBarNav } from "./sidebar-nav.js"
import { handleNavLessonTitle } from "./nav-lesson-title-nav.js"
import { stepNav } from "./step-nav.js"
import { getLastStep } from "./step-nav.js"
import { mainTargetDiv } from "../core/inject-content.js"
import { getLastCLICKEDLink, getLastFocusedLink } from "./sidebar-state.js"
import { sideBar, sideBarBtn } from "../ui/toggle-sidebar.js"
// import {navTi}
export const navState = {
    zone: null,
    isLetterNavEnabled: false
}
export function keyboardNav({e}){
    navState.zone = getFocusZone({ e })
    if (!navState.zone) return
    // if
    if (e.key === 'x' && e.shiftKey && e.metaKey) {
        navState.isLetterNavEnabled = !navState.isLetterNavEnabled
        popupLetterNav.innerText = `letter navigation : ${navState.isLetterNavEnabled}`
        popupLetterNav.classList.add('animate')
        document.querySelector('.page-wrapper').classList.toggle('nav-mode-colors')
        setTimeout(() => {
            popupLetterNav.classList.remove('animate')
        }, 1000);

        return
    }
    routeKey({ e })
}
function routeKey({ e }) {
    const { zone, isLetterNavEnabled } = navState
    const key = e.key.toLowerCase()
    if (key === 'm') {        
        handleMainFocus({ e, zone })
        return
    }
    if (key === 's' ) {        
        handleSidebarFocus({ e, zone })
        return
    }
    if (isLetterNavEnabled) {
        letterNav({ e })
        return
    }
    if (zone === 'navLessonTitle') {
        const isHandled = handleNavLessonTitle({e,navState})
        if (isHandled )return
    }
    if (zone === 'mainTargetDiv') {
        const isHandled = stepNav({e,navState})
        if (isHandled )return
    }
    if (zone === 'sideBar') {
        const isHandled = sideBarNav({ e,navState })
        if (isHandled )return
    }
    letterNav({ e })
}
function handleMainFocus({ e, zone }) {
    const key = e.key.toLowerCase()
    const lastStep = getLastStep()
    if(zone === 'mainTargetDiv'){
        if(lastStep){
            if(e.target == lastStep ){
                mainTargetDiv.focus()
                document.querySelector('body').scrollIntoView({ behavior: 'instant', block: 'start' })
            } else {
                lastStep.focus()
                lastStep.scrollIntoView({behavior:'smooth', block: 'center'})
            }
        }
        return
    }
    if (e.target != mainTargetDiv && key === 'm') {
        if(lastStep){
            lastStep?.focus()
        } else {
            mainTargetDiv.focus()
            document.querySelector('body').scrollIntoView({ behavior: 'instant', block: 'start' })       
        }
        return
    } else {
        mainTargetDiv.focus()
        document.querySelector('body').scrollIntoView({ behavior: 'instant', block: 'start' })
    }
}
function handleSidebarFocus({ e, zone }) {
    const lastLink = getLastFocusedLink()
    const lastClicked = getLastCLICKEDLink()
    if(zone === 'sideBar'){
        if(e.target === sideBarBtn){
            if(lastClicked ){
                lastClicked.focus()
            } else if (lastLink) {
                lastLink.focus()
            } 
        }
    } else {
        if(mainContainer.classList.contains('collapsed')){
            sideBarBtn.focus()
        } else {
            lastClicked.focus()
        }
        return
    }
}
