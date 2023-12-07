import { notesToPlayInOrder } from "./music-to-play";
import { BEATS_PER_MINUTE } from "./musical-score";

const notesToPlay= notesToPlayInOrder;

function playMusic() {
    playNotes(notesToPlay[0], 0);
}

function playNotes(note, index) {

    const pitch = note.pitch;
    const octave = note.octave;
    const accidental = note.accidental ? note.accidental : '';
    const beats = note.beats;

    const audioElementId = pitch + octave + accidental;
    const audioToPlay = document.getElementById(audioElementId);

    audioToPlay.play();
    setTimeout(() => {
        audioToPlay.pause();
        if (index + 1 < notesToPlay.length) {
            playNotes(notesToPlay[index + 1], index + 1);
        }
    }, beats * BEATS_PER_MINUTE);
}

document.getElementById('start-playing').addEventListener('click', playMusic);
