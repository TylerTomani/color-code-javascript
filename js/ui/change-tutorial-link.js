// change-tutorial-link.js
const tutorialLink = document.querySelector('#tutorialLink')
export function changeTutorialLink(e) {
    const tutorialLink = document.querySelector('#tutorialLink')
    console.log(e.target)
    const targetLink = e.target
    const vidBase = targetLink.getAttribute("data-video");
    const ts = targetLink.getAttribute("data-timestamp");
    let vidHref = vidBase;
    if (ts) {
        vidHref += (vidBase.includes("?") ? "&" : "?") + `&t=${ts}s`;
    }
    tutorialLink.href = vidHref
}