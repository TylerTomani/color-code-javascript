// toggle-sidebar.js
import { mainContainer } from "../core/main-script.js"
import { navLessonTitle } from "../nav/nav-lesson-title-nav.js"
export const sideBar = document.querySelector('.page-wrapper .side-bar')
export const sideBarBtn = document.querySelector('#sideBarBtn')
export function initToggleSideBar() {
    sideBar.addEventListener('click', toggleSidebar)
    sideBarBtn.addEventListener('click', toggleSidebar)
    sideBarBtn.addEventListener('keydown', toggleSidebar)
    navLessonTitle.addEventListener('click', toggleSidebar)
    navLessonTitle.addEventListener('keydown', toggleSidebar)
    function toggleSidebar(e) {
        if (e.type == 'click') {
            e.stopPropagation()
            if(e.target.tagName === 'A') {
                return
            }
            mainContainer.classList.toggle('collapsed')
            
        }
        if (e.type == 'keydown') {
            if (e.key === 'Enter') {
                e.preventDefault()
                mainContainer.classList.toggle('collapsed')
            }
        }
    }
}
