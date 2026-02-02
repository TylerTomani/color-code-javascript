// sidebar-state.js
let lastSideBarLink = null
let lastClickedLink = null
// LastFocused
export function setLastSideBarLink(el){lastSideBarLink = el}
export function getLastSideBarLink(){return lastSideBarLink}
export function clearLastSideBarLink(el){lastSideBarLink = null}

export function setLastCLICKEDLink(el){lastClickedLink = el}
export function getLastCLICKEDLink() { return lastClickedLink }
export function clearLastCLICKEDLink(el) { lastClickedLink = null}