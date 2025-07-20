import { sidebar } from "./toggle-sidebar.js";
import { sidebarBtn } from "./toggle-sidebar.js";
let startX = 0;
let isMouseDown = false

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    console.log(startX)
});
document.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const swipeDistance = endX - startX;

    if (swipeDistance < -50 && !sidebar.classList.contains('deactive')) {
        sidebar.classList.toggle('deactive');
        sidebarBtn.classList.add('drop');
    }
});

document.addEventListener('mousedown', (e) => {
    isMouseDown = true
    startX = e.clientX;

});
document.addEventListener('mouseup', (e) => {
    if(!isMouseDown) return
    const endX = e.clientX;
    const swipeDistance = endX - startX;
    
    if (swipeDistance < -50 && !sidebar.classList.contains('deactive')) {
        sidebar.classList.toggle('deactive');
        sidebarBtn.classList.add('drop');
    }
    isMouseDown = false
});


// function getSideBar(parent) {
//     if (parent.classList.contains('side-bar')) {
//         return parent
//     } else if (parent.parentElement) {
//         return getSideBar(parent.parentElement)
//     } else {
//         return null
//     }
// }