document.addEventListener("DOMContentLoaded", function(){

    // DECLARE VARIABLES
    // dynamically input from the user
    let timeSig = 4;
    let tempo = 100;

    // calculate the seconds between each beat
    let bpm = 60 / tempo;
    let bpmMille = bpm * 1000;  // in milleseconds, needed for the interval function

    // select elements from DOM
    const inputForm = document.querySelector("#input-form");
    const metronomeDiv = document.querySelector("#metronome-div");
    const startBtn = document.querySelector("#start");
    const stopBtn = document.querySelector("#stop");
    const dotContainer = document.querySelector(".dot-container")
    const audioContainer = document.querySelector("#audio-files");
    const formTimeSig = document.querySelector("#timeSig");
    const formTempo = document.querySelector("#tempo");
    let bpmLabel = document.querySelector(".bpm-label");

    // add event listener for timeSig change
    formTimeSig.addEventListener("change", function() {

        // update timeSig value
        timeSig = formTimeSig.value;

        // clear out any previous settings
        dotContainer.innerHTML = "";
        audioContainer.innerHTML = "";
        
        // loop through count in time sig, adjust the DOM
        for (var i=1; i <= timeSig; i++) { 

            // create the dots that flash the beat
            var writtenNumber = document.createElement("span"); 
            var textNode = document.createTextNode(`${i}`); 
            writtenNumber.appendChild(textNode); 

            var dot = document.createElement("div");
            dot.classList = "dot dot-transparent";
            dot.setAttribute("id", `${i}`)
            dot.appendChild(writtenNumber);

            dotContainer.appendChild(dot);

            // insert the audio tracks for each beat
            audioFile = document.createElement("audio");
            audioFile.setAttribute("src", `audio/${i}.mp3`);
            audioFile.setAttribute("id", `audio-${i}`);
            audioFile.setAttribute("preload", "auto");
            audioContainer.appendChild(audioFile);
        };
    })

    // add event listener for tempo input
    formTempo.addEventListener("change", function(){

        // update all variables associated with the tempo
        tempo = formTempo.value;
        bpm = 60 / tempo;
        bpmMille = bpm * 1000;
    })

    // add event listener for tempo input to adjust label. On input calls the function with each notch of the range bar.
    formTempo.addEventListener("input", function(){

        // insert the new bpm into the label under the range selector
        bpmLabel.innerHTML = `${formTempo.value} BPM`
    })

    // add event listener for start
    startBtn.addEventListener("click", function() {

        // hide the form div, show the metronome div
        inputForm.classList.toggle("hidden");
        metronomeDiv.classList.toggle("hidden");

        // save audio tracks and dots in node lists
        audioTracks = document.querySelectorAll("audio");
        dots = document.querySelectorAll(".dot")

        // variable to track the beat
        let x = 0;

        metronome = setInterval(function() {

            // make all dots transparent
            for (i=0; i < timeSig; i++){
                dots[i].classList.add("dot-transparent");
                dots[i].classList.remove("dot-animate");
            }

            // show the current beat's dot, play audio
            dots[x].classList.add("dot-animate");
            audioTracks[x].play();

            // update count, if last beat in measure set to zero
            x++;
            if (x == timeSig){  
                x = 0;
            }
            
        }, bpmMille);
    })

    // event listener for stop
    stopBtn.addEventListener("click", function() {

        // stop the loop
        clearInterval(metronome);

        // hide metronome, show form
        metronomeDiv.classList.toggle("hidden");
        inputForm.classList.toggle("hidden");
    })
})