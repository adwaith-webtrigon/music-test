import { notesToPlayInOrder } from "./music-to-play";
import { Accidental, BEATS_PER_MINUTE, MusicalNote } from "./musical-score";

function playMusic() {
    const notes = notesToPlayInOrder;
    playMusicOneAfterAnother(notes, 0);
}
function playMusicOneAfterAnother(notes: MusicalNote[], index: number) {
    let source = getSource(notes, index);
    playAudio(source, notes, index);
}

function playAudio(source: string, notes: MusicalNote[], index: number) {
    let audio = new Audio(source);
    audio.currentTime = 0;
    audio.play();
    setTimeout(() => {
        audio.pause();
    }, notes[index].beats * BEATS_PER_MINUTE);
    audio.onpause = function() {
        if(index + 1 < notes.length) {
            playMusicOneAfterAnother(notes, index + 1);
        }
    }
}

function getSource(notes: MusicalNote[], index: number) {
    let accidental = "";
    if (notes[index].accidental === Accidental.FLAT) {
        accidental = " Flat";
    }
    else if (notes[index].accidental === Accidental.SHARP) {
        accidental = " Sharp";
    }
    let filePath = "../music-test/src/assets/" + notes[index].pitch + notes[index].octave + accidental + ".mp3";
    return filePath;
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);