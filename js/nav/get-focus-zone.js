// get-focus-zone.js
export function getFocusZone({e}){
    if (e.target.closest('.page-header')) {
        return 'pageHeader'
    }
    if (e.target.closest('.side-bar')) {
        return 'sideBar'
    }
    if (e.target.closest('#mainTargetDiv')) {
        return 'mainTargetDiv'
    }
    return 'default'
}

