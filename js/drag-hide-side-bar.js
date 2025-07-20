import { sidebar } from "./toggle-sidebar.js";

let startX = 0;
let endX = 0;
let startMouseX = 0;
let endMouseX = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    console.log(startX)
});
document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const swipeDistance = endX - startX;

    if (swipeDistance < -20 && !sidebar.classList.contains('deactive')) {
        sidebar.classList.toggle('deactive');
    }
});

document.addEventListener('mousedown', (e) => {
    startMouseX = e.clientX;
    console.log(startX)
});
document.addEventListener('mouseup', (e) => {
    endMouseX = e.clientX;
    const swipeDistance = endMouseX - startMouseX;

    if (swipeDistance < -20 && !sidebar.classList.contains('deactive')) {
        sidebar.classList.toggle('deactive');
    }
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