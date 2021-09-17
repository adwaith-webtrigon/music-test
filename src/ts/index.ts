import { notesToPlayInOrder } from "./music-to-play";

function playMusic() {
    const notes = notesToPlayInOrder;

    // TODO Play these notes one after the other at the pitch and rhythm given in each note


    var i = -1;  // REVIEW - Magic number. Avoid. Also, "var" has weird scoping - better to replace with "let"
    const playNext = () =>  // REVIEW - Weird choice - creating an anonymous function, then assigning it to a constant. Better to create a function declaration.
    {
        i++;    // REVIEW - Increment operator on an index variable - This is simply creating a glorified for loop in a roundabout way. 
        // Plus, with javascript's associative loops, you can get rid of the index entirely.

        if (notes[i])    // REVIEW - A function is invoked, and the entire body is put in an if block in order to exit correctly. 
        // Either early exit or check before function call would be better
        {
            const audio = new Audio(); // creating audio for each object present in the array  
            // REVIEW - Unclear instantiation - better to call the constructor with a source URL

            if (notes[i].accidental || notes[i].accidental != null) // Find the source which has accidental 
            // REVIEW - Unnecessarily complex condition. There are cleaner ways to check for a truthy value
            {
                audio.src = notes[i].pitch + notes[i].octave.toString() + " " + notes[i].accidental + ".mp3";   // REVIEW - This is more readable with a couple of 
                // intermediate variables and template strings
            }
            else {
                audio.src = notes[i].pitch + notes[i].octave.toString() + ".mp3";  // REVIEW - Repeated code. Factor out some of this to make it readable
                // Plus, you are mixing single quotes and double quotes in the same line. 
                // It's recommended to choose one set and stick to it for the entire project
            }

            audio.currentTime = 0; // Play the new audio from the start while keeping the current time as 0  // REVIEW - Unnecessary. The current time is 0 by default
            audio.play();

            setTimeout(function () // Pause the audio after (notes[i].beats * 250) milli-seconds  
            // REVIEW - Fat arrow function might be a better fit here, since the function is anonymous anyway
            {
                audio.pause();
            }, (notes[i].beats) * 250); // BEATS_PER_MINUTE = 240, X BEATS = Y milliseconds  // REVIEW - Calculation logic is hard to read. Can take more steps, with intermediate variables. 
            // Plus, there are no spaces between operators - inconsistent with previous style, which used spaces between them.

            audio.addEventListener("pause", function () // eventlistener to call the playNext() once the audio is paused  
            // REVIEW - Unnecessary overhead with event handling. The body of this function can literally be placed after the call to pause.
            {
                return playNext(); // recursion  // REVIW - Questionable use of recursion. Unnecessary return statement - this line will work fine without it.
            });
        }
    }
    playNext(); // Method/function to play audio one after another
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);