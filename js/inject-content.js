
import { stepTxtsFocus } from "./stepTxts-colorCode.js";
import { addCopyCodes } from "./copy-code-colorCode.js";
import { letterFocus } from "./letterFocus-sidebar.js";
import { parts } from "./letterFocus-sidebar.js";
import { mainTargetDiv } from "./letterFocus-sidebar.js";
import { sideBar } from "./toggle-sidebar.js";
import { sidebarBtn } from "./toggle-sidebar.js";

import { loadTutorialCurrentTime } from "./loadTutorialCurrentTime.js";
export let lastFocusedLink = null;
export let lastClickedLink = null;
const sectionLessonTitle = document.querySelector('nav.section-lesson-title');
let sidebarLinksFocused = false;
let currentLinkIndex = 0;

export let currentWidth = innerWidth;
document.addEventListener('DOMContentLoaded', () => {
    let mainTargetDivFocused = false;
    let partsFocused

    parts.forEach(el => {
        el.addEventListener('focus', e => {
            partsFocused = true 
        })
        el.addEventListener('focusout', e => {
            partsFocused = false
        })
    })
    addEventListener('resize', e => {
        currentWidth = innerWidth;
    });

    mainTargetDiv.addEventListener('focusout', e => {
        mainTargetDivFocused = false;
    });
    mainTargetDiv.addEventListener('focusin', e => {
        mainTargetDivFocused = true;
    });

    function injectContent(href) {
        fetch(href)
            .then(response => response.text())
            .then(html => {
                mainTargetDiv.innerHTML = html;
                addCopyCodes();
                letterFocus();
                stepTxtsFocus();
                loadTutorialCurrentTime()
            })
            .catch(err => {
                console.error('Failed to load content:', err);
            });
    }

    function getParts(el) {
        while (el && el.tagName !== 'A') {
            el = el.parentElement;
        }
        return el;
    }

    parts.forEach((el, index) => {
        
        if (el.hasAttribute('autofocus')) {
            injectContent(el.href);
            lastFocusedLink = el;
            lastClickedLink = el;
        }

        el.addEventListener('focus', (e) => {
            mainTargetDivFocused = false;
        });

        // ✅ Updated CLICK HANDLER
        el.addEventListener('focus', (e) => {
            currentLinkIndex = [...parts].indexOf(el)
        })
        el.addEventListener('click', (e) => {
            const anchor = getParts(e.target);
            if (anchor && anchor.href) {
                e.preventDefault();
                injectContent(anchor.href);
                
                if (anchor === lastFocusedLink) {
                    lastClickedLink = anchor;
                }

                lastFocusedLink = anchor;
                currentLinkIndex = index;
            }
        });

        el.addEventListener('keydown', (e) => {
            let letter = e.key.toLowerCase();
            if (letter === 'enter') {
                e.preventDefault();
                e.stopPropagation();
                injectContent(el.href);

                if (el === lastFocusedLink) {
                    if (currentWidth < 600) {
                        const sideBar = document.querySelector('.side-bar');
                        sideBar.classList.add('deactive');
                    }
                    mainTargetDiv.focus();
                    scrollTo(0, 0);
                }

                lastClickedLink = el;
                lastFocusedLink = el;
                currentLinkIndex = index;
            }

            if (!mainTargetDivFocused) {
                if (letter === 'a' || letter === 's' && partsFocused  && !e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex + 1) % parts.length;
                    if(currentLinkIndex == parts.length ){
                        partsFocused = false
                        sidebarBtn.focus()
                        return
                    } else{

                        parts[currentLinkIndex].focus();
                    }
                } else if (letter === 'a' && partsFocused && e.shiftKey) {
                    currentLinkIndex = (currentLinkIndex - 1 + parts.length) % parts.length;
                    parts[currentLinkIndex].focus();
                    parts[currentLinkIndex].focus();
                } else if ( letter === 's' && partsFocused && e.shiftKey) {
                    if(!sideBar.classList.contains('deactive')){
                        scrollTo(0,0)
                    }
                    partsFocused = false
                    sidebarBtn.focus()
                }
                if (letter === 'm') {
                    mainTargetDiv.focus();
                }
            }
        });
    });
    

    // Letter Num focus
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase();
        if (!mainTargetDivFocused) {
            if (!isNaN(letter)) {
                const intLet = parseInt(letter);
                if (intLet <= parts.length) {
                    parts[intLet - 1].focus();
                }
            }

            if (letter === 'm') {
                mainTargetDiv.focus();
                scrollTo(0, 0);
            }
        }
        if(sideBar.classList.contains('deactive')){
            document.querySelector('body').style.overflowX = 'none'
        }
    });
});
letterFocus()
stepTxtsFocus()