import { notesToPlayInOrder } from "./music-to-play";
import { BEATS_PER_MINUTE, Pitch, Accidental } from "./musical-score";

const notes: any[] = notesToPlayInOrder;

function playMusic() {
    // TODO Play these notes one after the other at the pitch and rhythm given in each note

    // start with first note
    playSingleNote(notes[0], 0);
}

function playSingleNote(note: any, index: number) {

    let pitch: Pitch = note['pitch'];
    let octave: number = note['octave'];
    let beats: number = note['beats'];
    let accidental: Accidental = note['accidental'] ? note['accidental'] : '';
    let audioId: string = `${pitch}${octave}${accidental}`;

    // find audio by id
    let audio = document.getElementById(audioId) as HTMLAudioElement;

    // play audio
    audio.play();

    setTimeout(() => {

        // pause audio
        audio.pause();

        // play next note
        if (notes[index + 1]) {
            playSingleNote(notes[index + 1], index + 1);
        }

    }, beats * BEATS_PER_MINUTE);

}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
