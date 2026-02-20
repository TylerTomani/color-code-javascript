// step-clicked-nav.js
export function handleStepClickedNav({ e, iCopyCodes }) {
    const step = e.target.closest('.step-float')
    const key = e.key.toLowerCase()

    let stepCopyCodes = updateStepCopyCodes(step)

    if (!isNaN(key)) {
        iCopyCodes = parseInt(key) - 1
        stepCopyCodes[iCopyCodes]?.focus()
        return iCopyCodes
    } else {
        if (key === 'a') {
            iCopyCodes = (iCopyCodes - 1 + stepCopyCodes.length) % stepCopyCodes.length
        }
        if (key === 'f') {
            iCopyCodes = (iCopyCodes + 1) % stepCopyCodes.length
        }
        if (key === 'm') {
            step?.focus()
        }

        if (key === 'enter') {
            if (!step) return
            stepCopyCodes = getCopyCodes(step)
        
            stepCopyCodes[iCopyCodes]?.focus()
        }
        stepCopyCodes[iCopyCodes]?.focus()
        return iCopyCodes
    }
}

function updateStepCopyCodes(step){
    if (!step) return []
    return [...step.querySelectorAll('.copy-code')]
}
function getCopyCodes(step) {
    if (!step) return
    let copyCodes = step.querySelectorAll('.copy-code')
    copyCodes.forEach(el => {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0')
        }
    })
    if (copyCodes) return [...copyCodes]
}
