
const sideBarAs = document.querySelectorAll('.side-bar-links-container ul a')
let activeSideBarA = -1
export function initSideBarListeners(){
    sideBarAs.forEach(el =>{
        el.addEventListener('focusin', e => {
            activeSideBarA = [...sideBarAs].indexOf(el)
        });
    })
}
export function sideBarNav({e}){
    let key = e.key.toLowerCase()
    if(!isNaN(key)){
        console.log(key)
        let intKey = parseInt(key)
        sideBarAs[intKey - 1]?.focus()
        return 
    }
    if(key === 'f'){
        
        activeSideBarA = (activeSideBarA + 1) % sideBarAs.length
    }
    if(key === 'a'){
        activeSideBarA = (activeSideBarA - 1 + sideBarAs.length) % sideBarAs.length
        
    }
    sideBarAs[activeSideBarA]?.focus()       
}