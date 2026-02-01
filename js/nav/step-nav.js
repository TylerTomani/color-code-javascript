import { getLastSideBarLink } from "./sidebar-state.js"

// step-nav.js
export function stepNav({e,navState}){
    // console.log(e,navState.zone)
    const key = e.key.toLowerCase()
    if(key === 's'){
        getLastSideBarLink().focus()        
        return true
    }
    
    return false
}