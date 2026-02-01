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
        console.log(getLastSideBarLink())
        window.scrollTo(0,0)
        lastClickedSideBarLink = a
    });
    sideBar.addEventListener('keydown', e => {
        const a = e.target.closest('a')
        const key = e.key.toLowerCase()
        if(a === null) return
        if(key === 'enter'){
            e.preventDefault()
            e.stopPropagation()
            if (a === getLastSideBarLink() && lastClickedSideBarLink == a) {
                mainTargetDiv.focus()
            }
        }
    });

}
export function injectMainTargetDiv({ e }) {
    const a = e.target.closest('a')
    if (!a) return
    injectFromLink(a)
}


export async function injectFromLink(a) {
    if (!a || !a.href) return

    try {
        const response = await fetch(a.href)
        const html = await response.text()
        mainTargetDiv.innerHTML = html
        window.scrollTo(0, 0)
    } catch (err) {
        mainTargetDiv.innerHTML = `<p>Failed to load content.</p>`
    }
}
