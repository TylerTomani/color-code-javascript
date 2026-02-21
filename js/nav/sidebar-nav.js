// sidebar-nav.js
// import { pageWrapper } from "../core/main-script.js"
import { mainContainer } from "../core/main-script.js"
import { setLastFocusedLink,getLastFocusedLink,clearLastFocusedLink, 
        setLastCLICKEDLink,getLastCLICKEDLink, clearLastCLICKEDLink} from "./sidebar-state.js"
import { sideBarBtn } from "../ui/toggle-sidebar.js"
import { injectFromHref, mainTargetDiv } from "../core/inject-content.js"
import { getSteps,getLastStep } from "./step-nav.js"
import { changeTutorialLink,tutorialLink } from "../ui/change-tutorial-link.js"
import { refreshImages } from "../ui/toggle-img-sizes.js"
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
        
        return
    });
    const sideBarContainer = document.querySelector('.side-bar-links-container')

    let lastUserActivated = null

    sideBarContainer.addEventListener('click', e => {
        const link = e.target.closest('a')
        if (!link) return

        changeTutorialLink({ target: link })

        if (lastUserActivated === link) {
            mainTargetDiv.focus()
            mainTargetDiv.scrollTo(0, 0)
            window.scrollTo(0, 0)
        }

        lastUserActivated = link
        setLastCLICKEDLink(link)
    })
    sideBarAs.forEach((el,i,arr) => {
        // if(!document.listenerAdded){
            
            if (el.hasAttribute('autofocus')) {
                setLastCLICKEDLink(el)
                setLastFocusedLink(el)
                iSideBarAs = sideBarAsARRAY.indexOf(el)
                focusSideBarIndex(iSideBarAs)
                injectFromHref(el)
                document.listenerAdded = true
                return
            }
        // }
        if (el.hasAttribute('focus')) {
            clearLastCLICKEDLink()
            // clearLastFocusedLink()
            setLastFocusedLink(el)
            iSideBarAs = i
            focusSideBarIndex(i)
        }
        // el.addEventListener('click', (e) => {
        //     const link = e.target.closest('a')
        //     if (!link) return

        //     clearLastFocusedLink()

        //     const lastClicked = getLastCLICKEDLink()

        //     changeTutorialLink({ target: link }) // force correct target

        //     if (link === lastClicked) {
        //         mainTargetDiv.focus()
        //         mainTargetDiv.scrollTo(0, 0)
        //         window.scrollTo(0, 0)
        //     }

        //     setLastCLICKEDLink(link) // MUST pass link
        // })
        el.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase()
            const lastClicked = getLastCLICKEDLink()
            const lastFocused = getLastFocusedLink()
            
            if (key === 'enter') {
                const link = e.target.closest('a')
                if (!link) return

                const lastClicked = getLastCLICKEDLink()

                changeTutorialLink({ target: link })

                if (lastClicked === link) {
                    mainTargetDiv.focus()
                    mainTargetDiv.scrollTo(0, 0)
                    window.scrollTo(0, 0)
                }

                setLastCLICKEDLink(link)
            }
                

            if (key === 'f') {
                const link = e.target.closest('a')
                if (!link) return

                iSideBarAs = sideBarAsARRAY.indexOf(link)
                // setLastFocusedLink(link)
            }
            // if(key === 'enter'){mainTargetDiv.scrollTo(0,0)}
            if(key === 's'){
                
                sideBarBtn?.focus()
            }

            if(key === 'm'){
                
                mainTargetDiv?.focus()
                document.querySelector('body').scrollIntoView({ behavior: 'instant', block: 'start' })
            }
            if(key === 't'){
                
                tutorialLink?.focus()
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
        if (!mainContainer.classList.contains('collapsed')) {
            if (e.target === sideBarBtn) iSideBarAs = -1
            focusSideBarIndex((iSideBarAs + 1) % sideBarAs.length)
        } else {
            if (key === 'f') {
                const steps = getSteps()
                const lastStep = getLastStep()
                if(lastStep){
                    lastStep?.focus()
                } else {

                    steps[0].focus()
                }
            }
        }
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
