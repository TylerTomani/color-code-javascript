import { mainContainer } from "../core/main-script.js"
export const navLessonTitle = document.querySelector('.nav-lesson-title')
import { sideBarAsARRAY } from "./sidebar-nav.js"
import { getSteps } from "./step-nav.js"
export function handleNavLessonTitle({ e, navState }){
    const key = e.key.toLowerCase()
    const {zone, isLetterNavEnable} = navState
    if(zone != 'navLessonTitle') return
    if(key === 'f'){
        if(!mainContainer.classList.contains('collapsed')){
            sideBarAsARRAY[0].focus()
        } else {
            const steps = getSteps()
            getSteps()[0].focus()
        }   
        return true
    }

}