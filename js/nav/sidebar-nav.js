// sidebar-nav.js
// import { pageWrapper } from "../core/main-script.js"
import { mainContainer } from "../ui/toggle-sidebar.js"
import { setLastFocusedLink,getLastFocusedLink,clearLastFocusedLink, 
        setLastCLICKEDLink,getLastCLICKEDLink, clearLastCLICKEDLink} from "./sidebar-state.js"
import { sideBarBtn } from "../ui/toggle-sidebar.js"
import { injectFromHref, mainTargetDiv } from "../core/inject-content.js"
import { getLastStep } from "./step-nav.js"
import { changeTutorialLink } from "../ui/change-tutorial-link.js"
const sideBarAs = document.querySelectorAll('.side-bar-links-container ul a')
export const sideBarAsARRAY = Array.from(sideBarAs)
let iSideBarAs 
export function setIndexSideBarAs(i){iSideBarAs = i}
export function getIndexSideBarAs(){return iSideBarAs}
function focusSideBarIndex(index) {
    setIndexSideBarAs(index)
    const el = sideBarAs[index]
    if (!el) return
    el.focus()   
    // set last focused take e.target NOT el
    setLastFocusedLink(el)
}
export function initSideBarListeners() {
    sideBarBtn.addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        const lastClicked = getLastCLICKEDLink()
        
    });
    sideBarAs.forEach((el,i,arr) => {
        if (el.hasAttribute('autofocus')) {
            setLastCLICKEDLink(el)
            setLastFocusedLink(el)
            injectFromHref(el)
            iSideBarAs = sideBarAsARRAY.indexOf(el)
            focusSideBarIndex(iSideBarAs)
        }
        if (el.hasAttribute('focus')) {
            clearLastCLICKEDLink()
            iSideBarAs = i
            focusSideBarIndex(i)
        }
        el.addEventListener('click', (e) => {
            clearLastFocusedLink()
            const lastClicked = getLastCLICKEDLink()
            if(e.target === lastClicked){
                console.log('click')
                mainTargetDiv.focus()
                mainTargetDiv.scrollTo(0,0)
                window.scrollTo(0,0)
            }
            changeTutorialLink(e)
        })
        el.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase()
            const lastClicked = getLastCLICKEDLink()
            const lastFocused = getLastFocusedLink()
            if(lastClicked == e.target){
                if (key === 'enter'){
                    mainTargetDiv.focus()
                }
                if(key === 'f'){
                    iSideBarAs = sideBarAsARRAY.indexOf(e.target)
                    setLastFocusedLink(iSideBarAs)
                }
            }
            if(key === 'enter'){mainTargetDiv.scrollTo(0,0)}
            if(key === 's'){
                // if(e.target == lastClicked){
                //     console.log('here')
                //     console.log(lastFocused)
                //     lastFocused?.focus() 
                // }
                
                sideBarBtn?.focus()
            }

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
