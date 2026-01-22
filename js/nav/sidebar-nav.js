// sidebar-nav.js

const sideBarAs = document.querySelectorAll('.side-bar-links-container ul a')
import { sideBarBtn } from "../ui/toggle-sidebar.js";
import { mainContentContainer } from "../ui/toggle-sidebar.js";
let iSideBarAs = -1
export function initSideBarListeners(){
    sideBarAs.forEach(el =>{
        el.addEventListener('focusin', e => {
            iSideBarAs = [...sideBarAs].indexOf(el)
        });
    })
    
}
export function sideBarNav({e}){
    let key = e.key.toLowerCase()
    if(!isNaN(key)){
        iSideBarAs = parseInt(key) - 1
        sideBarAs[iSideBarAs]?.focus()
        return true
    }
    if(key === 'f'){
        if(e.target === sideBarBtn) iSideBarAs = -1
        iSideBarAs = (iSideBarAs + 1) % sideBarAs.length
        sideBarAs[iSideBarAs]?.focus()       
        return true
    }
    if(key === 'a'){
        iSideBarAs = (iSideBarAs - 1 + sideBarAs.length) % sideBarAs.length
        if(iSideBarAs > sideBarAs.length){
            sideBarAs[sideBarAs.length - 1]?.focus()
            return
        }
        sideBarAs[iSideBarAs]?.focus()       
        return true
    }
    if(key === 'm'){
        e.preventDefault()
        // window.scrollIntoView({behavior: 'instant'})
        window.scrollIntoView({behavior: 'instant',inline:'nearest'})
        // return true
    }
    return false 
}