// toggle-sidebar.js
export const sideBar = document.querySelector('.page-wrapper .side-bar')
export const mainContentContainer = document.querySelector('.main-content-container')
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
            console.log(e.target)
            e.stopPropagation()
            if(e.target.tagName === 'A') {
                return
            }
            mainContentContainer.classList.toggle('collapsed')
            
        }
        if (e.type == 'keydown') {
            if (e.key === 'Enter') {
                e.preventDefault()
                mainContentContainer.classList.toggle('collapsed')
            }
        }
        // OLD CODE
        // const isSidebarClick =
        //     e.currentTarget === sideBar && e.target === sideBar

        // const isButtonClick =
        //     e.currentTarget === sideBarBtn

        //     console.log(e.type)
        // if (!isSidebarClick && !isButtonClick) return
    }
}
