// inject-content.js
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { sideBar } from "../ui/toggle-sidebar.js"
import { getLastSideBarLink,setLastCLICKEDLink } from "../nav/sidebar-state.js";
let lastClickedSideBarLink = null
let currentHref = null
export function initInjectContentListeners(){
    sideBar.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const a = e.target.closest('a')
        if(a === null) return
        // injectMainTargetDiv({e})
        injectFromLink(a)
        console.log(getLastSideBarLink())
        window.scrollTo(0,0)
        lastClickedSideBarLink = a
        setLastCLICKEDLink(lastClickedSideBarLink)
    });
    sideBar.addEventListener('keydown', e => {
        const a = e.target.closest('a')
        const key = e.key.toLowerCase()
        if(a === null) return
        if(key === 'enter'){
            e.preventDefault()
            e.stopPropagation()
            console.log('enter')

            if (a === getLastSideBarLink() && lastClickedSideBarLink == a) {
                mainTargetDiv.focus()
            } else {
                injectFromLink(a)
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
    // 🚫 already loaded → just focus
    if (a.href === currentHref) {
        mainTargetDiv.focus()
        return
    }

    try {
        const response = await fetch(a.href)
        const html = await response.text()

        mainTargetDiv.innerHTML = html
        currentHref = a.href
        mainTargetDiv.innerHTML = html
        window.scrollTo(0, 0)
    } catch (err) {
        mainTargetDiv.innerHTML = `<p>Failed to load content.</p>`
    }
}
