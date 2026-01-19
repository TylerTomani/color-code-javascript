// letter-nav.js
export function letterNav({e,focusZone}){
    const key = e.key.toLowerCase()
    let lastLetterPressed = null
    let target
    const allEls = [...document.querySelectorAll('[id],.side-bar a')].filter(el => {
        const rect = el.getBoundingClientRect()
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0
    })
    const matching = allEls.filter(el =>{
        const id = el.id.toLowerCase()
        el.setAttribute('tabindex','0')
        return id.startsWith(key)
    })
    
    const firstAlpha = allEls.filter(el => {
        if(el.tagName === 'A'){
            const text = (el.innerText || '').trim().toLowerCase()
            for(let i = 0; i < text.length;i++){
                console.log(text)

            }
        }
    })

    const activeEl = document.activeElement
    let iAllEls = allEls.indexOf(activeEl)
    let iMatching = matching.indexOf(activeEl)
    let newIndex

    if (key !== lastLetterPressed) {
        if (iAllEls === -1) {
            // nothing focused: pick first/last
            newIndex = e.shiftKey ? matching.length - 1 : 0
        } else {
            const prevEl = allEls[iAllEls - 1]  // the element directly before
            const nextEl = allEls[iAllEls + 1]  // the element directly after
            // if the previous element matches the letter, go up one
            if (prevEl && matching.includes(prevEl)) {
                newIndex = matching.indexOf(prevEl)
            } else {
                // otherwise go to the next matching element after current focus
                let foundNext = false
                for (let i = iAllEls + 1; i < allEls.length; i++) {
                    if (matching.includes(allEls[i])) {
                        newIndex = matching.indexOf(allEls[i])
                        foundNext = true
                        break
                    }
                }
                if (!foundNext) {
                    // fallback to first matching if nothing found below
                    newIndex = 0
                }
            }
        }
    } else {
        if (iMatching === -1) {
            // currently focused element is not one of the matching elements
            newIndex = e.shiftKey ? matching.length - 1 : 0
        } else {
            newIndex = e.shiftKey
                ? (iMatching - 1 + matching.length) % matching.length
                : (iMatching + 1) % matching.length
        }
    }
    target = matching[newIndex]
    target?.focus()
    lastLetterPressed = key
}