// toggle-sidebar.js
export const sideBar = document.querySelector('.page-wrapper .side-bar')
export const mainContainer = document.querySelector('.main-container')
export const sideBarBtn = document.querySelector('#sideBarBtn')
export const navSectionLessonTitle = document.querySelector('.section-lesson-title')
export function initToggleSideBar() {
    sideBar.addEventListener('click', toggleSidebar)
    sideBarBtn.addEventListener('click', toggleSidebar)
    sideBarBtn.addEventListener('keydown', toggleSidebar)
    navSectionLessonTitle.addEventListener('click', toggleSidebar)
    navSectionLessonTitle.addEventListener('keydown', toggleSidebar)
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
