export const mainLandingPage = document.querySelector('#mainLandingPage')
import { sideBar } from "../ui/toggle-sidebar.js"
export function initInjectContentListeners(){
    sideBar.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const a = e.target.closest('a')
        if(a === null) return
        injectMainLandingPage({e})
        // window.scrollTo(0,0)
    });

}
export async function injectMainLandingPage({e}){
    const href = e.target.href
    try {
        const response = await fetch(href)
        const html = await response.text()
        mainLandingPage.innerHTML = html

    } catch{
        // console.log('color Code error inject-content')
        // console.log(`${error}`)
    }
}