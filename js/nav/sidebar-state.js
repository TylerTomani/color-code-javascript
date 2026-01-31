// sidebar-state.js
let lastSideBarLink = null

export function setLastSideBarLink(el){
    
    lastSideBarLink = el
}
export function getLastSideBarLink(){
    return lastSideBarLink
}

export function clearLastSideBarLink(el){
    lastSideBarLink = null
}