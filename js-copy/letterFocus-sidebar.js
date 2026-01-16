import { lastFocusedLink } from "./inject-content.js";
export const parts = document.querySelectorAll('.parts ul > li > a')
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
export const navBar = document.querySelector('nav.section-lesson-title')
export let enterConsoleFocus = false
import { lastClickedLink } from "./inject-content.js";
import { lastStep, stepFocused } from "./stepTxts-colorCode.js";
import { sidebar } from "./toggle-sidebar.js";
import { nxtLesson } from "./inject-content.js";
let partsFocused = false
const header = document.querySelector('body > header')
// async variables
let enterConsole
const sideBarBtn = document.querySelector('#sideBarBtn')
export function letterFocus(){
    navBar.addEventListener('keydown',  e => {
        let key = e.key.toLowerCase()
        if(key === 's'){
            sideBarBtn.focus()
        }
    })
    header.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'a') {    
            if (!partsFocused) {
                if (lastClickedLink) {
                    lastClickedLink.focus()
                } else {
                    parts[0].focus()
                }
            }

        }
    })
    async function extractElementEnterConsole() {
        enterConsole = await getEnterConsole();
        if (enterConsole) {
            enterConsole.addEventListener('focus', e => {
                enterConsoleFocus = true
            })
            enterConsole.addEventListener('focusout', e => {
                enterConsoleFocus = false 
            })
        }
    }
    extractElementEnterConsole()
    parts.forEach(el => {
        el.addEventListener('focus', e => {
            partsFocused = true
            
        })
    })
    mainTargetDiv.addEventListener('focusin', e => {
        partsFocused = false
    })
    mainTargetDiv.addEventListener('focusout', e => {
    })
    
    
    document.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase();
        if (enterConsoleFocus) {
            return
        } else {
            elsFocus(e, letter)
        }
        
    });
    function elsFocus(e,letter) {
        if(e.metaKey && letter == 'c'){
            e.preventDefault()
            return
        }
        if(letter == 'a' ){
            if(!partsFocused){
                if(lastClickedLink){
                    lastClickedLink.focus()
                } else {
                    parts[0].focus()
                }
            }
        }
        if(letter == 'e'){
            console.log(nxtLesson)
            if(nxtLesson){
                nxtLesson.focus()
            }
            
        }
        if (letter == 'm' && lastStep) {
            lastStep.focus()
            
            if(e.target == lastStep && letter == 'm'){
                mainTargetDiv.focus()
                scrollTo(0, 0)
            }
        }
        //  This is very sloppy handling of letterFocus
        
        if (letter == 'c' && !stepFocused) {
            const chatGpt = document.querySelector('#chatGpt')
            const codeComandShortcuts = document.querySelector('#codeComandShortcuts')   
            if(e.target == codeComandShortcuts){
                chatGpt.focus()
            } else {
                codeComandShortcuts.focus()
            }
        } 
        if(letter == 'd'){
            const darkmodeBtn = document.querySelector('#darkmodeBtn')
            darkmodeBtn.focus()
        }
        if (letter == 'b') {
            const backlink = document.querySelector('#backlink')
            backlink.focus()
        }
        if (letter == 'h') {
            const homelink = document.querySelector('#homelink')
            homelink.focus()
        }
        if(letter == 'n'){
            
            navBar.setAttribute('tabindex', '1')
            navBar.focus()
        }
        if(letter == 't'){
            const tutorialLink = document.querySelector('#tutorialLink')
            tutorialLink.focus()
        }
        if(letter == 's' && !partsFocused){
            if(lastClickedLink){
                lastClickedLink?.focus()
            } else if(lastFocusedLink){
                lastFocusedLink.focus()
            } else {
                sideBarBtn.focus()
            }
            

        }        
        if (letter == 'v') {
            const vsCodeShortRegex = document.querySelector('#vsCodeShortRegex')
            vsCodeShortRegex.focus()
        }
    }    
    // async functions
    function getEnterConsole(){
        return new Promise(function(resolve,reject){
            resolve(document.querySelector('#enterConsole'))
        })
    }
    
    
}

// letterFocus()