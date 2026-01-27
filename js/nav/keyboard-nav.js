// keyboard-nav.js
import { letterNav } from "./letter-nav.js"
import { sideBarNav } from "./sidebar-nav.js"
import { getFocusZone } from "./get-focus-zone.js"
import { popupLetterNav } from "../ui/popups.js"
let isLetterNavEnabled = false
export function keyboardNav({e}){
    const zone = getFocusZone({ e })
    if (!zone) return
    
    if (e.key === 'x' && e.shiftKey && e.metaKey) {
        isLetterNavEnabled = !isLetterNavEnabled
        popupLetterNav.innerText = `letter navigation : ${isLetterNavEnabled}`
        popupLetterNav.classList.add('animate')
        setTimeout(() => {
            popupLetterNav.classList.remove('animate')
        }, 1000);
        return
    }
    if(zone === 'sideBar' && !isLetterNavEnabled){
        const isHandled = sideBarNav({e})
        if(isHandled) return
    } else {
        letterNav({ e })
    }
    console.log(isLetterNavEnabled)
    
       
}