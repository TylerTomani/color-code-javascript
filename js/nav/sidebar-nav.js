// sidebar-nav.js
// import { pageWrapper } from "../core/main-script.js"
import { mainContainer } from "../ui/toggle-sidebar.js"
import { setLastSideBarLink, getLastSideBarLink,clearLastSideBarLink, 
    setLastCLICKEDLink,getLastCLICKEDLink, 
    clearLastCLICKEDLink} from "./sidebar-state.js"
import { sideBarBtn } from "../ui/toggle-sidebar.js"
import { injectFromHref, mainTargetDiv } from "../core/inject-content.js"
import { getLastStep } from "./step-nav.js"
import { changeTutorialLink } from "../ui/change-tutorial-link.js"

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
    sideBarBtn.addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        const lastClicked = getLastCLICKEDLink()
        console.log(lastClicked.innerText)
        if(key === 's'){
            // console.log(lastClicked.innerText)
            // lastClicked?.focus()
            return
        }
    });
    sideBarAs.forEach((el,i) => {
        if (el.hasAttribute('autofocus')) {
            setLastCLICKEDLink(el)
            setLastSideBarLink(el)
            injectFromHref(el)
            iSideBarAs = sideBarAsARRAY.indexOf(el)
            focusSideBarIndex(iSideBarAs)
        }
        if (el.hasAttribute('focus')) {
            clearLastCLICKEDLink()
            setLastSideBarLink(0)
            iSideBarAs = i
            focusSideBarIndex(i)
        }
        el.addEventListener('click', (e) => {
            clearLastSideBarLink()
            const lastClicked = getLastCLICKEDLink()
            if(e.target === lastClicked){
                mainTargetDiv.focus()
            }
            // setLastCLICKEDLink(el)
            changeTutorialLink(e)
        })
        el.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase()
            // clearLastSideBarLink()
            const lastClicked = getLastCLICKEDLink()
            // const lastStep = getLastStep()
            if(lastClicked == e.target && key === 'enter' ){
                mainTargetDiv.focus()
            }
            if(key === 'enter'){
                // setLastCLICKEDLink(e.target)
            }
            if(key === 's'){
                sideBarBtn?.focus()
            }
            if(key === 'm'){
                mainTargetDiv?.focus()
                document.querySelector('body').scrollIntoView({ behavior: 'instant', block: 'start' })
            }
            // setLastCLICKEDLink(el)
        })
    })
}
export function sideBarNav({ e,navState }) {
    if(navState.zone != 'sideBar') return
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
        if (e.target.id === 'homePageSideBar'){       
            focusSideBarIndex(sideBarAs.length - 2)
        } else {
            focusSideBarIndex((iSideBarAs - 1 + sideBarAs.length) % sideBarAs.length)
        }
        return true
    }
    if (key === 's' ) {
    //     console.log('sidebar')
        console.log('go')
    //     return false
    }
    return false
}
