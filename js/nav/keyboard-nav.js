// keyboard-nav.js
import { letterNav } from "./letter-nav.js"
import { sideBarNav } from "./sidebar-nav.js"
import { getFocusZone } from "./get-focus-zone.js"
export function keyboardNav({e}){
    const zone = getFocusZone({ e })
    if (!zone) return

    let isLetterNavEnabled = true
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