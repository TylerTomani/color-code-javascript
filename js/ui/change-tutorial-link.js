// change-tutorial-link.js
const tutorialLink = document.querySelector('#tutorialLink')
export function changeTutorialLink(e) {
    const tutorialLink = document.querySelector('#tutorialLink')
    // console.log(e.target)
    const targetLink = e.target
    if(e.target.classList.contains('.step-float')){
        const step = targetLink.closest('.step-float')
        const vidBase = step.getAttribute("data-video");
        const ts = step.getAttribute("data-timestamp");
        let vidHref = vidBase;
        if (ts) {
            vidHref += (vidBase.includes("?") ? "&" : "?") + `&t=${ts}s`;
        }
        tutorialLink.href = vidHref
    }
    if(e.target.tagName == 'A'){
        const vidBase = targetLink.getAttribute("data-video");
        const ts = targetLink.getAttribute("data-timestamp");
        let vidHref = vidBase;
        if (ts) {
            vidHref += (vidBase.includes("?") ? "&" : "?") + `&t=${ts}s`;
        }
        tutorialLink.href = vidHref
    }
    tutorialLink.addEventListener('click', e => {
        window.open('_blank', tutorialLink.href)
        console.log(tutorialLink.href)
    })
    tutorialLink.addEventListener('keydown', e => {
        const key = e.key.toLowerCase()
        if(key === 'enter'){
            console.log(tutorialLink)
        }
    })
}