// get-focus-zone.js
export function getFocusZone({e}){
    let key = e.key

    if(key === 'x' && e.shiftKey && e.metaKey){
        return 'letterNavMode'
    }
    if (e.target.closest('.page-header')) {
        return 'pageHeader'
    }
    if (e.target.closest('.side-bar')) {
        return 'sideBar'
    }
    if (e.target.closest('#mainTargetDiv')) {
        return 'mainTargetDiv'
    }
    return 'letterNavMode'
}

