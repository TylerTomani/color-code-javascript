// sidebar-nav.js
// import { pageWrapper } from "../core/main-script.js"
import { mainContainer } from "../ui/toggle-sidebar.js"
import { setLastSideBarLink, getLastSideBarLink,clearLastSideBarLink, 
    setLastCLICKEDLink,getLastCLICKEDLink } from "./sidebar-state.js"
import { sideBarBtn } from "../ui/toggle-sidebar.js"
import { injectFromHref, mainTargetDiv } from "../core/inject-content.js"
import { getLastStep } from "./step-nav.js"
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
    // el.scrollIntoView({behavior:'smooth', block: 'nearest'})

    setLastSideBarLink(el)
    
    // This below line will inject #mainTargetDiv everytime side-bar a element is focused 
    // injectFromHref(el)   // ✅ single injection point
}
export function initSideBarListeners() {
    sideBarAs.forEach((el,i,arr) => {
        if (el.hasAttribute('autofocus')) {
            setLastCLICKEDLink(el)
            injectFromHref(el)
            iSideBarAs = sideBarAsARRAY.indexOf(el)
        }
        if (el.hasAttribute('focus')) {
            setLastSideBarLink(0)
            iSideBarAs[[...arr].indexOf(el)]
        }
        el.addEventListener('click', (e) => {
            clearLastSideBarLink()
            const lastClickedLink = getLastCLICKEDLink()
            if(e.target === getLastCLICKEDLink()){
                mainTargetDiv.focus()
            }
            setLastCLICKEDLink(el)
        })
        el.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase()
            clearLastSideBarLink()
            const lastClickedLink = getLastCLICKEDLink()
            const lastStep = getLastStep()
            
            if(lastClickedLink == e.target && key === 'enter' ){
                mainTargetDiv.focus()
            }
            if(key === 's'){
                sideBarBtn?.focus()
                document.querySelector('body').scrollIntoView({ behavior: 'instant', block: 'start' })
            }
            setLastCLICKEDLink(el)
        })
    })
}
export function sideBarNav({ e,navState }) {
    if(navState.zone != 'sideBar') return
    const key = e.key.toLowerCase()
    if(e.target == sideBarBtn && key === 'm' && mainContainer.classList.contains('collapsed')){
        // console.log(e.target)        

    }
    if (key === 'a') {
        if (e.target.id == 'homepageSideBar') {
            iSideBarAs = (sideBarAs.length - 2)
            
            focusSideBarIndex(iSideBarAs)
        } else {

            focusSideBarIndex((iSideBarAs - 1 + sideBarAs.length) % sideBarAs.length)
        }
        return true
    }
    if (!isNaN(key)) {
        focusSideBarIndex(parseInt(key) - 1)
        return true
    }
    if(key === 'm'){
        
        const lastStep = getLastStep()
        if(lastStep ){
            lastStep?.focus() 
        } else {
            mainTargetDiv.focus()
        }
        // window.scrollIntoView({behavior:'smooth',block: 'start'})
        return true
    }
    
    if (key === 'f') {
        if (e.target === sideBarBtn) iSideBarAs = -1
        focusSideBarIndex((iSideBarAs + 1) % sideBarAs.length)
        return true
    }
    
    if (key === 's' ) {
        return true
    }
    return false
}
