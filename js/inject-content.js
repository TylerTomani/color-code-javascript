import { stepTxtsFocus } from "./stepTxts-colorCode.js";
import { addCopyCodes } from "./copy-code-colorCode.js";
import { letterFocus } from "./letterFocus-sidebar.js";
import { parts, mainTargetDiv } from "./letterFocus-sidebar.js";
import { sidebar, sidebarBtn } from "./toggle-sidebar.js";
import { loadTutorialCurrentTime } from "./loadTutorialCurrentTime.js";

export const nxtLesson = document.querySelector('#nxtLesson');
const prevLesson = document.querySelector("#prevLesson");

export let lastFocusedLink = null;
export let lastClickedLink = null;
export let currentWidth = innerWidth;

let sidebarLinksFocused = false;
let currentLinkIndex = 0;
let partsFocused = false;
let mainTargetDivFocused = false;

document.addEventListener('DOMContentLoaded', () => {
    // Inject content from the given href and re-run setup scripts
    function injectContent(href) {
        fetch(href)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                return response.text();
            })
            .then(html => {
                mainTargetDiv.innerHTML = html;
                addCopyCodes();
                letterFocus();
                stepTxtsFocus();
                loadTutorialCurrentTime();
            })
            .catch(err => {
                console.error('Failed to load content:', err);
            });
    }

    // Helper: Find the closest anchor element
    function getAnchorFromEventTarget(el) {
        while (el && el.tagName !== 'A') {
            el = el.parentElement;
        }
        return el;
    }

    // Initialize parts behavior
    let autoFocused = false;

    parts.forEach((el, index) => {
        if (el.hasAttribute('autofocus')) {
            injectContent(el.href);
            lastFocusedLink = el;
            lastClickedLink = el;
            autoFocused = true;
        }

        el.addEventListener('focus', () => {
            partsFocused = true;
            mainTargetDivFocused = false;
            currentLinkIndex = index;
        });

        el.addEventListener('focusout', () => {
            partsFocused = false;
        });

        el.addEventListener('click', (e) => {
                currentWidth = window.innerWidth; // ✅ add this line at the start

            const anchor = getAnchorFromEventTarget(e.target);
            if (anchor && anchor.href) {
                e.preventDefault();
                injectContent(anchor.href);
                lastClickedLink = anchor;
                lastFocusedLink = anchor;
                currentLinkIndex = index;

                // ✅ Prevent shrinking on large screens
                if (currentWidth < 420) {
                    sidebar.classList.add('deactive');
                } else {
                    sidebar.classList.remove('deactive');
                }
            }
        });

        el.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (key === 'enter') {
                e.preventDefault();
                injectContent(el.href);

                if (el === lastClickedLink && currentWidth < 420) {
                    sidebar.classList.add('deactive');
                    scrollTo(0, 0);
                    mainTargetDiv.focus();
                }

                lastClickedLink = el;
                lastFocusedLink = el;
            }

            // Keyboard navigation (a/s)
            if (!mainTargetDivFocused && partsFocused) {
                if ((key === 'a' || key === 's') && !e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex + 1) % parts.length;
                    parts[currentLinkIndex].focus();
                } else if (key === 'a' && e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex - 1 + parts.length) % parts.length;
                    parts[currentLinkIndex].focus();
                } else if (key === 's' && e.shiftKey) {
                    scrollTo(0, 0);
                    partsFocused = false;
                    sidebarBtn.focus();
                }
            }

            if (!mainTargetDivFocused && key === 'm') {
                mainTargetDiv.focus();
            }
        });
    });

    // Fallback inject if no element had autofocus
    if (!autoFocused) {
        const fallbackHref = mainTargetDiv.getAttribute('data-href');
        if (fallbackHref) {
            injectContent(fallbackHref);
        } else {
            console.warn('No autofocus element found, and no data-href fallback present.');
        }
    }

    // Resize listener
    addEventListener('resize', () => {
        currentWidth = innerWidth;
    });

    // Global key navigation
    addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        if (!mainTargetDivFocused && !isNaN(key)) {
            const index = parseInt(key) - 1;
            if (index >= 0 && index < parts.length) {
                parts[index].focus();
            }
        }

        if (!mainTargetDivFocused && key === 'm') {
            mainTargetDiv.focus();
            scrollTo(0, 0);
        }

        if (sidebar.classList.contains('deactive')) {
            document.body.style.overflowX = 'none';
        }
    });

    // Focus tracking
    mainTargetDiv.addEventListener('focusin', () => {
        mainTargetDivFocused = true;
    });

    mainTargetDiv.addEventListener('focusout', () => {
        mainTargetDivFocused = false;
    });

    // Next/Prev buttons
    nxtLesson?.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if (!lastClickedLink) {
                lastFocusedLink?.focus();
            } else {
                let index = parts.indexOf(lastClickedLink);
                if (index < parts.length - 1) {
                    parts[index + 1].focus();
                    parts[index + 1].click();
                }
            }
        }
    });

    prevLesson?.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            if (!lastClickedLink) {
                lastFocusedLink?.focus();
            } else {
                let index = parts.indexOf(lastClickedLink);
                parts[(index - 1 + parts.length) % parts.length].focus();
                parts[(index - 1 + parts.length) % parts.length].click();
            }
        }
    });
});

// Run these once on load
letterFocus();
stepTxtsFocus();
