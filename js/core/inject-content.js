export const mainLandingPage = document.querySelector('#mainLandingPage')
import { sideBar } from "../ui/toggle-sidebar.js"
export function initInjectContentListeners(){
    sideBar.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const a = e.target.closest('a')
        if(a === null) return
        injectMainTargetDiv({e})
    });
}
export async function injectMainTargetDiv({e}){
    const href = e.target.href
    try {
        const response = await fetch(href)
        const html = await response.text()
        mainLandingPage.innerHTML = html
    } catch{
        // console.log('color Code error inject-content')
        console.log(`${error}`)
    }
}