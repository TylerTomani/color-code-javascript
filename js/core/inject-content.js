// inject-content.js
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { sideBar } from "../ui/toggle-sidebar.js"
export function initInjectContentListeners(){
    sideBar.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const a = e.target.closest('a')
        if(a === null) return
        injectMainTargetDiv({e})
        window.scrollTo(0,0)
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