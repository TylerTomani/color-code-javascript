const header = document.querySelector('body > header')
export const sidebarBtn = document.querySelector('#sideBarBtn')
const sideBarContainer = document.querySelector(".sideBarBtn-container")
export const sidebar = document.querySelector('.side-bar')
import { parts } from "./letterFocus-sidebar.js"
import { lastClickedLink, lastFocusedLink } from "./inject-content.js"
import { mainTargetDiv } from "./letterFocus-sidebar.js"
import { navBar } from "./letterFocus-sidebar.js"
mainTargetDiv.addEventListener('keydown', e =>{
    let letter = e.key.toLowerCase()
    if(letter == 's' || letter == 'a'){
        if(sidebar.classList.contains('deactive')){
            sidebar.classList.remove('deactive')
        }
        
    }
    
})
sidebarBtn.addEventListener('click', e =>{
    e.preventDefault()
    toggleBar()
})
sidebarBtn.addEventListener('keydown', e =>{
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){ 
        toggleBar()
    }
    if(letter == 'a' && sidebar.classList.contains('deactive')){
        sidebar.classList.remove('deactive')
        
    }    
    if(letter == 'a'){
        if(lastClickedLink){
            lastClickedLink.focus()
        } else if(lastFocusedLink){
            lastFocusedLink.focus()
        } else {
            parts[0].focus()
        }
    }
    
})
header.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if (letter == 'a' && lastClickedLink) {
        lastClickedLink.focus()

    } else if (letter == 'a' && !lastClickedLink) {
        parts[0].focus()
    }
})
navBar.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if (letter == 'enter') {
        toggleBar()
    }
})
navBar.addEventListener('click', e => {
    e.preventDefault()
    toggleBar()
})

sidebar.addEventListener('click', e => {
    e.preventDefault()
    if (e.target.tagName == 'ASIDE'){
        toggleBar()
    } else {
        return
    }
})
export function toggleBar(){
    sidebarBtn.classList.toggle('drop')
    sidebar.classList.toggle('deactive')
    
}


