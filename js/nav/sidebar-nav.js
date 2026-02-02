// sidebar-nav.js
import { setLastSideBarLink, getLastSideBarLink, 
         setLastCLICKEDLink,getLastCLICKEDLink } from "./sidebar-state.js"
import { sideBarBtn } from "../ui/toggle-sidebar.js"
import { injectFromLink } from "../core/inject-content.js"

const sideBarAs = document.querySelectorAll('.side-bar-links-container ul a')
let iSideBarAs = 0
let lastClickedSideBarLink = null
function focusSideBarIndex(index) {
    iSideBarAs = index
    const el = sideBarAs[iSideBarAs]
    if (!el) return
    el.focus()
    setLastSideBarLink(el)
    // This below line will inject #mainTargetDiv everytime side-bar a element is focused 
    // injectFromLink(el)   // ✅ single injection point
}

export function initSideBarListeners() {
    sideBarAs.forEach((el) => {
        if (el.hasAttribute('autofocus')) {
            setLastSideBarLink(el)
            injectFromLink(el)
        }

        el.addEventListener('focusin', () => {
            setLastSideBarLink(el)
        })
        el.addEventListener('click', () => {
            setLastCLICKEDLink(el)
        })
    })
}

export function sideBarNav({ e }) {
    const key = e.key.toLowerCase()

    if (!isNaN(key)) {
        focusSideBarIndex(parseInt(key) - 1)
        return true
    }

    if (key === 'f') {
        if (e.target === sideBarBtn) iSideBarAs = -1
        focusSideBarIndex((iSideBarAs + 1) % sideBarAs.length)
        return true
    }

    if (key === 'a') {
        focusSideBarIndex((iSideBarAs - 1 + sideBarAs.length) % sideBarAs.length)
        return true
    }

    if (key === 's' && e.target === sideBarBtn) {
        const lastLink = getLastSideBarLink()
        const lastClicked = getLastCLICKEDLink()
        console.log('clicked',lastClicked)
        if(lastClicked){
            iSideBarAs = [...sideBarAs].indexOf(lastClicked)
            focusSideBarIndex(iSideBarAs)
            // return

        } else {
            iSideBarAs = [...sideBarAs].indexOf(lastLink)
            focusSideBarIndex(iSideBarAs)

        }
        return true
    }

    return false
}
