// toggle-sidebar.js
const sideBar = document.querySelector('.page-wrapper .side-bar')
export const mainContentContainer = document.querySelector('.main-content-container')
export const main = document.querySelector('.page-wrapper')
export const sideBarBtn = document.querySelector('#sideBarBtn')

export function initToggleSideBar() {
    sideBar.addEventListener('click', toggleSidebar)
    sideBarBtn.addEventListener('click', toggleSidebar)
    sideBarBtn.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault()
            mainContentContainer.classList.toggle('collapsed')
        }
    })
    function toggleSidebar(e) {
        const isSidebarClick =
            e.currentTarget === sideBar && e.target === sideBar

        const isButtonClick =
            e.currentTarget === sideBarBtn

        if (!isSidebarClick && !isButtonClick) return

        mainContentContainer.classList.toggle('collapsed')
    }
}
