// sidebar-nav.js
import { getLastSideBarLink } from "./sidebar-state.js";
const sideBarAs = document.querySelectorAll('.side-bar-links-container ul a')
import { sideBarBtn } from "../ui/toggle-sidebar.js";
let iSideBarAs = 0

export function initSideBarListeners(){
    sideBarAs.forEach(el =>{
        el.addEventListener('focusin', e => {
            iSideBarAs = [...sideBarAs].indexOf(el)
        });
    })    
}
export function sideBarNav({e}){
    let key = e.key.toLowerCase()
    let lastSideBarLink = getLastSideBarLink(e)
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
        sideBarAs[iSideBarAs]?.focus()       
        return true
    }
    return false 
}