// sidebar-nav.js
// import { pageWrapper } from "../core/main-script.js"
import { mainContainer } from "../ui/toggle-sidebar.js"
import { setLastFocusedLink,getLastFocusedLink,clearLastFocusedLink, 
    setLastCLICKEDLink,getLastCLICKEDLink, 
    clearLastCLICKEDLink} from "./sidebar-state.js"
import { sideBarBtn } from "../ui/toggle-sidebar.js"
import { injectFromHref, mainTargetDiv } from "../core/inject-content.js"
import { getLastStep } from "./step-nav.js"
import { changeTutorialLink } from "../ui/change-tutorial-link.js"
const sideBarAs = document.querySelectorAll('.side-bar-links-container ul a')
export const sideBarAsARRAY = Array.from(sideBarAs)
let iSideBarAs 
export function setIndexSideBarAs(i){iSideBarAs = i}
export function getIndexSideBarAs(){
    return iSideBarAs
}
function focusSideBarIndex(index) {
    iSideBarAs = index
    const el = sideBarAs[index]
    if (!el) return
    el.focus()   
    setLastFocusedLink(el)
    console.log([...sideBarAs].indexOf(el))
}
export function initSideBarListeners() {
    sideBarBtn.addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        const lastClicked = getLastCLICKEDLink()
        
    });
    sideBarAs.forEach((el,i) => {
        if (el.hasAttribute('autofocus')) {
            setLastCLICKEDLink(el)
            setLastFocusedLink(el)
            injectFromHref(el)
            iSideBarAs = sideBarAsARRAY.indexOf(el)
            focusSideBarIndex(iSideBarAs)
        }
        if (el.hasAttribute('focus')) {
            clearLastCLICKEDLink()
            // setLastFocusedLink(0)
            iSideBarAs = i
            focusSideBarIndex(i)
        }
        el.addEventListener('click', (e) => {
            clearLastFocusedLink()
            const lastClicked = getLastCLICKEDLink()
            if(e.target === lastClicked){
                mainTargetDiv.focus()
            }
            changeTutorialLink(e)
        })
        el.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase()
            const lastClicked = getLastCLICKEDLink()
            if(lastClicked == e.target && key === 'enter' ){mainTargetDiv.focus()}
            if(key === 'enter'){mainTargetDiv.scrollTo(0,0)}
            if(key === 's'){sideBarBtn?.focus()}
            if(key === 'm'){
                mainTargetDiv?.focus()
                document.querySelector('body').scrollIntoView({ behavior: 'instant', block: 'start' })
            }
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
    return false
}
