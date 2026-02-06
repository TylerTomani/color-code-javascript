// inject-content.js
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { sideBar } from "../ui/toggle-sidebar.js"
import { getLastSideBarLink, setLastCLICKEDLink } from "../nav/sidebar-state.js";
let lastClickedSideBarLink = null
import { sideBarAsARRAY } from "../nav/sidebar-nav.js";
import { initStepNav,updateSteps } from "../nav/step-nav.js";
import { updateImgs } from "../ui/toggle-img-sizes.js";
export function initInjectContentListeners(){
    let linkClicked = false
    initStepNav()
    sideBarAsARRAY.forEach(el =>{
        if(el.hasAttribute('autofocus')){
            linkClicked = true
        }
    })
    if(!linkClicked){injectFromHref('home-page.html')        }
    sideBar.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const a = e.target.closest('a')
        if(a === null) return        
        injectFromHref(a)
        window.scrollTo(0,0)
        lastClickedSideBarLink = a
        setLastCLICKEDLink(a)
        linkClicked = true
    });
    sideBar.addEventListener('keydown', e => {
        const a = e.target.closest('a')
        const key = e.key.toLowerCase()

        if(a === null) return
        if(key === 'enter'){
            e.preventDefault()
            e.stopPropagation()
            setLastCLICKEDLink(a)
            if (a === getLastSideBarLink() && lastClickedSideBarLink == a) {
                
                mainTargetDiv.focus()
                mainTargetDiv.scrollIntoView({ behavior : 'instant', block: 'start'})
            } else {
                injectFromHref(a)
                document.querySelector('body').scrollIntoView({ behavior : 'instant', block: 'start'})
            }
        }
    });
}
export async function injectFromHref(href) {
    if (!href) return
    try {
        const response = await fetch(href)
        const html = await response.text()
        mainTargetDiv.innerHTML = html
        updateSteps()
    } catch (err) {
        mainTargetDiv.innerHTML = `<p>Failed to load content.</p>`
    }
}
