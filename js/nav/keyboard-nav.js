// keyboard-nav.js
import { letterNav } from "./letter-nav.js"
import { sideBarNav } from "./sidebar-nav.js"
import { getFocusZone } from "./get-focus-zone.js"
let isLetterNavEnabled = true
export function keyboardNav({e}){
    const zone = getFocusZone({ e })
    if (!zone) return
    
    if (e.key === 'x' && e.shiftKey && e.metaKey) {
        isLetterNavEnabled = !isLetterNavEnabled
        return
    }
    if(zone === 'sideBar'){
        const isHandled = sideBarNav({e})
        if(isHandled) return
    }
    letterNav({e})
       
}