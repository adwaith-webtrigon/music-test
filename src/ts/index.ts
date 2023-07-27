import { notesToPlayInOrder } from "./music-to-play";
import { Pitch, BEATS_PER_MINUTE, MusicalNote } from "./musical-score";

const notesToPlay: Array<MusicalNote> = notesToPlayInOrder;

function playMusic() {
    playNotes(notesToPlay[0], 0);
}

function playNotes(note: MusicalNote, index: number) {


    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    let pitch: Pitch = note.pitch;
    let octave: number = note.octave;
    let accidental: string = note.accidental ? note.accidental : '';
    let beats: number = note.beats;


    const audioId: string = `${pitch}${octave}${accidental}`;
    console.log(audioId)
    let audioToPlay = document.getElementById(audioId) as HTMLAudioElement;

    audioToPlay.play();
    setTimeout(() => {
        audioToPlay.pause();
        if (index + 1 < notesToPlay.length) {
            playNotes(notesToPlay[index + 1], index + 1);
        }
    }, beats * BEATS_PER_MINUTE);
}


document.getElementById('start-playing')?.addEventListener('click', playMusic);
