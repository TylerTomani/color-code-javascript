import { letterNav } from "./letter-nav.js"
// keyboard-nav.js
export function keyboardNav({e,focusZone}){
    letterNav({e})
    // if(focusZone === 'default' || focusZone === 'pageHeader'){
    //     // Maybe pass 's' key suppresser boolean for side bar focusZone
    //     letterNav({e})
    // }
    // if(focusZone === 'side-bar'){
    //     console.log('sidebar')
        
    // }
    
}