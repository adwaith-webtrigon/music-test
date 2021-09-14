import { notesToPlayInOrder } from "./music-to-play";
import { Pitch, Accidental, BEATS_PER_MINUTE} from "./musical-score";

const notes: any[] = notesToPlayInOrder;

function playMusic() {
    playNotes(notes[0], 0);
}

function playNotes(note: any, index: number) {
    
    let pitch: Pitch = note.pitch;
    let octave: number = note.octave;
    let accidental: Accidental = note.accidental ? note.accidental : '';
    let beats: number = note.beats;

    const audioId: string = `${pitch}${octave}${accidental}`;

    let audioToPlay = document.getElementById(audioId) as HTMLAudioElement;

    audioToPlay.play();
    setTimeout(() => {
        audioToPlay.pause();
        if (index + 1 < notes.length) {
            playNotes(notes[index + 1], index + 1);
        }
    }, beats * BEATS_PER_MINUTE);

}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
