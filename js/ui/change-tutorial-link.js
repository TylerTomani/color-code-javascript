// change-tutorial-link.js
export const tutorialLink = document.querySelector('#tutorialLink')
export function changeTutorialLink(e) {
    const link = e.target.closest('a')
    if (!link) return

    const isSideBar = link.closest('.side-bar')

    if (isSideBar) {
        const vidBase = link.getAttribute("data-video")
        const ts = link.getAttribute("data-timestamp")

        let vidHref = vidBase
        if (ts) {
            vidHref += (vidBase.includes("?") ? "&" : "?") + `t=${ts}s`
        }

        tutorialLink.href = vidHref
        return
    }

    const step = e.target.closest('.step-float')
    if (step) {
        const vidBase = step.getAttribute("data-video")
        const ts = step.getAttribute("data-timestamp")

        let vidHref = vidBase
        if (ts) {
            vidHref += (vidBase.includes("?") ? "&" : "?") + `t=${ts}s`
        }

        tutorialLink.href = vidHref
    }
}