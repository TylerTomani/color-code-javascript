// sidebar-nav.js
import { setLastSideBarLink, getLastSideBarLink} from "./sidebar-state.js";
import { sideBarBtn } from "../ui/toggle-sidebar.js";
const sideBarAs = document.querySelectorAll('.side-bar-links-container ul a')
let iSideBarAs = 0

function focusSideBarIndex(index) {
    iSideBarAs = index
    const el = sideBarAs[iSideBarAs]
    if (!el) return

    el.focus()
    setLastSideBarLink(el)
}


export function initSideBarListeners(){
    sideBarAs.forEach((el,i,arr) =>{
        if(el.hasAttribute('autofocus')){
            setLastSideBarLink(el)
        }
        el.addEventListener('focusin', e => {
            setLastSideBarLink(el)
        });
    })    
}

export function sideBarNav({ e, links = sideBarAs,index = iSideBarAs}){
    let key = e.key.toLowerCase()

    

    if(!isNaN(key)){
        focusSideBarIndex(parseInt(key) - 1)
        return true
    }
    if(key === 'f'){
        if(e.target === sideBarBtn) iSideBarAs = -1

        focusSideBarIndex((iSideBarAs + 1) % sideBarAs.length)
        return true
    }
    if(key === 'a'){
        focusSideBarIndex((iSideBarAs - 1 + sideBarAs.length) % sideBarAs.length)
        return true
    }
    if(key === 's'){
        if(e.target === sideBarBtn){
            const lastLink = getLastSideBarLink()
            iSideBarAs = [...sideBarAs].indexOf(lastLink)
            focusSideBarIndex(iSideBarAs)
            return true
        }
    }
    return false 
}