// inject-content.js
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { sideBar } from "../ui/toggle-sidebar.js"
import { getLastSideBarLink } from "../nav/sidebar-state.js";
let lastClickedSideBarLink = null
export function initInjectContentListeners(){
    sideBar.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const a = e.target.closest('a')
        if(a === null) return
        injectMainTargetDiv({e})
        if(a === getLastSideBarLink() && lastClickedSideBarLink == a){
            mainTargetDiv.focus()
        }
        window.scrollTo(0,0)
        lastClickedSideBarLink = a
    });

}
export async function injectMainTargetDiv({e}){
    const href = e.target.href
    try {
        const response = await fetch(href)
        const html = await response.text()
        mainTargetDiv.innerHTML = html

    } catch{
        // console.log('color Code error inject-content')
        // console.log(`${error}`)
    }
}