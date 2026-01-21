// keyboard-nav.js
import { letterNav } from "./letter-nav.js"
import { sideBarNav } from "./sidebar-nav.js"
export function keyboardNav({e,focusZone}){
    console.log(focusZone)
    letterNav({e})
    if (focusZone === 'letterNavMode'){

        return
    }
    if(focusZone === 'sideBar'){
        sideBarNav({e})
        return
    }
    
    // if(focusZone === 'default' || focusZone === 'pageHeader'){
        //     // Maybe pass 's' key suppresser boolean for side bar focusZone
        //     letterNav({e})
        // }
    // if(focusZone === 'side-bar'){
    //     console.log('sidebar')
        
    // }
    
}