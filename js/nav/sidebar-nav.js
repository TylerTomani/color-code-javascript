// sidebar-nav.js
import { setLastSideBarLink, getLastSideBarLink,clearLastSideBarLink, 
         setLastCLICKEDLink,getLastCLICKEDLink } from "./sidebar-state.js"
import { sideBarBtn } from "../ui/toggle-sidebar.js"
import { injectFromHref, mainTargetDiv } from "../core/inject-content.js"
const sideBarAs = document.querySelectorAll('.side-bar-links-container ul a')
export const sideBarAsARRAY = Array.from(sideBarAs)
let iSideBarAs = 0
function focusSideBarIndex(index) {
    iSideBarAs = index
    const el = sideBarAs[iSideBarAs]
    if (!el) return
    el.focus()
    // THIS CODE RIGHT HERE IS AWFUL, get rid of this
    scrollTo(0,0)
    el.scrollIntoView({behavior:'smooth', block: 'nearest'})
    setLastSideBarLink(el)
    // This below line will inject #mainTargetDiv everytime side-bar a element is focused 
    // injectFromHref(el)   // ✅ single injection point
}
export function initSideBarListeners() {
    sideBarAs.forEach((el) => {
        if (el.hasAttribute('autofocus')) {
            setLastCLICKEDLink(el)
            injectFromHref(el)
            iSideBarAs = sideBarAsARRAY.indexOf(el)
        }
        // el.addEventListener('focusin', () => {
        //     setLastSideBarLink(el)
        //     setLastCLICKEDLink(el)
        // })
        el.addEventListener('click', (e) => {
            clearLastSideBarLink()
            const lastClickedLink = getLastCLICKEDLink()
            // console.log(lastClickedLink)
            if(e.target === getLastCLICKEDLink()){
                mainTargetDiv.focus()
            }
            setLastCLICKEDLink(el)
        })
        el.addEventListener('focus', (e) => {
                
        })
        el.addEventListener('keydown', (e) => {
            clearLastSideBarLink()
            const lastClickedLink = getLastCLICKEDLink()
            // console.log(lastClickedLink)
            if(e.target === getLastCLICKEDLink()){
                mainTargetDiv.focus()
            }
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
        if (lastClicked) {
            iSideBarAs = sideBarAsARRAY.indexOf(lastClicked)
            focusSideBarIndex(iSideBarAs)
        } else {
            iSideBarAs = sideBarAsARRAY.indexOf(lastLink)
            focusSideBarIndex(iSideBarAs)
        }
        return true
    }

    return false
}
