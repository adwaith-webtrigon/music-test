import { notesToPlayInOrder } from "./music-to-play";
import { BEATS_PER_MINUTE } from "./musical-score";

function playMusic() {
    const notes = notesToPlayInOrder;
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    console.log(notes)

    const oneBeat = 60000 / BEATS_PER_MINUTE;
    // There are 60,000 milliseconds in a minute. So 60,000 / BPM(240) = one beat (250ms)
    let i = 0
    //Check console logs of a browser to see a note playing
    function playNote() {
        if (i >= notes.length) {
            //stop after all notes are completed
            return
        }

        if (notes[i].accidental) {
            let sound = document.getElementById(notes[i].pitch + notes[i].octave + notes[i].accidental)!; (sound as HTMLAudioElement).play();
            let currentBeat = oneBeat * notes[i].beats;
            setTimeout(function () {
                (sound as HTMLAudioElement).pause();
                (sound as HTMLAudioElement).currentTime = 0;
            }, currentBeat);
            console.log(notes[i].pitch + notes[i].octave + notes[i].accidental + " beats " + notes[i].beats + "   " + currentBeat + 'ms')
            i++
            sound.onpause = playNote //calling same function on pause


        } else {
            let sound = document.getElementById(notes[i].pitch + notes[i].octave)!; (sound as HTMLAudioElement).play();
            let currentBeat = oneBeat * notes[i].beats;
            setTimeout(function () {
                (sound as HTMLAudioElement).pause();
                (sound as HTMLAudioElement).currentTime = 0;
            }, currentBeat);
            console.log(notes[i].pitch + notes[i].octave + " beats " + notes[i].beats + "   " + currentBeat + 'ms')
            i++
            sound.onpause = playNote

        }
    }

    playNote(); //calling a recursive function

}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
