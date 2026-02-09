// get-focus-zone.js
export function getFocusZone({e}){
    let key = e.key
    let zone= 'letterNavMode'
    if (e.target.closest('.page-header')) {zone= 'letterNavMode'}
    if (e.target.closest('.nav-lesson-title')) {zone= 'navLessonTitle'}
    if (e.target.closest('.side-bar')) {zone= 'sideBar'}
    // if (e.target.closest('#sideBarBtn')) {zone= 'sideBar'}
    if (e.target.closest('#mainTargetDiv')) {zone= 'mainTargetDiv'}
    return zone
}

