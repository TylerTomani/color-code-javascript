// toggle-img-sizes.js
let allImgs
let iStepImgs = -1
export function updateImgs() {
    allImgs = document.querySelectorAll('.step-img img, .step-vid video')
}
// --- Image handling ---
export function handleImgSizes({e}) {
    const step = e.target.closest('.step-float')
    if (!step) return

    const imgsContainer = step.querySelector('.imgs-container')

    if (!imgsContainer) {
        toggleSingleImage({ e })
    } else {
        toggleMultipleImages({ e, step })

    }    
}
function toggleSingleImage({e}) {
    const img = e.target.closest('.step-float').querySelector('img,video')
    // denlargeAllImages()
    if (img) {
        toggleImgSize(img)
        
    }
}
function toggleMultipleImages({ e, step }) {
    const key = e.key.toLowerCase()
    console.log(key)
    if(key === 'enter'){
        const stepImgs = step.querySelectorAll('.step-img > img')
        iStepImgs++ 
        console.log(iStepImgs)
        if(iStepImgs >= stepImgs.length){
            denlargeAllImages(allImgs)
            iStepImgs = -1
            return
        } else {
            toggleImgSize(stepImgs[iStepImgs])
        }
        
    }
}
function toggleImgSize(img){
    img.classList.toggle("enlarge");
    img.style.zIndex = img.classList.contains("enlarge") ? 100 : 0;
}
// --- Utility ---
export function denlargeAllImages(allImgs) {
    allImgs.forEach(img => {
        if (img.classList.contains('enlarge')) img.classList.remove("enlarge");
        img.style.zIndex = 0;
    });
    // allVids.forEach(vid => {
    //     if (vid.classList.contains('first-vid-enlarge')) vid.classList.remove("first-vid-enlarge");
    // })
}