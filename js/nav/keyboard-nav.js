// keyboard-nav.js
/**  Notice what changed:
👉 keyboardNav no longer decides behavior
It just updates truth.
*/
import { letterNav } from "./letter-nav.js"
import { sideBarNav } from "./sidebar-nav.js"
import { getFocusZone } from "./get-focus-zone.js"
import { popupLetterNav } from "../ui/popups.js"
export const navState = {
    zone: null,
    isLetterNavEnabled: false
}
export function keyboardNav({e}){
    navState.zone = getFocusZone({ e })
    // if (!navState.zone) return


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

    if (isLetterNavEnabled) {
        letterNav({ e })
        return
    }

    if (zone === 'sideBar') {
        const isHandled = sideBarNav({ e })
        if (isHandled) return
    }
    console.log('going')
    letterNav({ e })
}
