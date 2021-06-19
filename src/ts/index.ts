import { notesToPlayInOrder } from "./music-to-play";

function playMusic() {
    const notes = notesToPlayInOrder;
    
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    let promise = Promise.resolve()       
    notes.forEach(function(el) {
        promise = promise.then(function() {
            if(document.querySelector(`#${el.pitch+el.octave}`) !== null) {                            
                document.querySelector(`#${el.pitch+el.octave}`).play()                
            }                                                             
            return new Promise(function (resolve) {
                setTimeout(resolve, el.beats*1000)
            })
        })
    })
    
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
