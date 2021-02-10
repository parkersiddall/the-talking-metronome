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

            // firth the text in each dot
            var writtenNumber = document.createElement("span"); 
            var textNode = document.createTextNode(`${i}`); 
            writtenNumber.appendChild(textNode); 

            // then the dot itself
            var dot = document.createElement("div");
            dot.classList = "dot dot-transparent";
            dot.setAttribute("id", `${i}`);

            var diameter = (dotContainer.clientWidth / timeSig) * .50;  // get the ideal diameter based on container size
            dot.style.width = `${Math.floor(diameter)}px`;  // dynamically change the width of the dots so that they fit on one line
            dot.style.height = `${Math.floor(diameter)}px`;

            /* find a way to turn up top into a percentage so that it adjusts when screen size changes */

            // put em all together
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

        // adjust height of dot container
        adjustDotContainerHeight();

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


    // QUOTES SECTION FOR LARGE SCREEN DISPLAY
    // dict with quotes to randomly select
    const quotes = {
        1: {
            "author": "Frank Zappa", 
            "quote": "Without music to decorate it, time is just a bunch of boring production deadlines or dates by which bills must be paid."
        },

        2: {
            "author": "Ludwig van Beethoven",
            "quote": "Music is like a dream. One that I cannot hear."
        },

        3: {
            "author": "Plato", 
            "quote": "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything."
        },

        4: {
            "author": "Albert Einstein", 
            "quote": "If I were not a physicist, I would probably be a musician. I often think in music. I live my daydreams in music. I see my life in terms of music."
        },

        5: {
            "author": "Keith Richards", 
            "quote": "Music is a language that doesn’t speak in particular words. It speaks in emotions, and if it’s in the bones, it’s in the bones."
        },

        6: {
            "author": "Billy Joel", 
            "quote": "I think music in itself is healing. It’s an explosive expression of humanity. It’s something we are all touched by. No matter what culture we’re from, everyone loves music."
        },

        7: {
            "author": "Bob Marley", 
            "quote": "One good thing about music, when it hits you, you feel no pain."
        },

        8: {
            "author": "Charles Darwin", 
            "quote": "If I had my life to live over again, I would have made a rule to read some poetry and listen to some music at least once every week."
        },

        9: {
            "author": "Tom Waits",
            "quote": "I like beautiful melodies telling me terrible things."
        }, 

        10: {
            "author": "Lady Gaga", 
            "quote": "When you make music or write or create, it’s really your job to have mind-blowing, irresponsible, condomless sex with whatever idea it is you’re writing about at the time."
        },

        11: {
            "author": "Wolfgang Amadeus Mozart", 
            "quote": "The music is not in the notes, but in the silence between."
        },

        12: {
            "author": "Confucius", 
            "quote": "Music produces a kind of pleasure which human nature cannot do without."
        },

        13: {
            "author": "Michael Jackson", 
            "quote": "People ask me how I make music. I tell them I just step into it. It’s like stepping into a river and joining the flow. Every moment in the river has its song."
        }, 

        14: {
            "author": "Freddie Mercury", 
            "quote": "I’m just a musical prostitute, my dear."
        }, 

        15: {
            "author": "Louis Armstrong", 
            "quote": "If you have to ask what jazz is, you’ll never know."
        }, 

        16: {
            "author": "Bruce Springsteen", 
            "quote": "A good song takes on more meaning as the years pass."
        }
    }

    // select variables to adjust the quote section
    var quoteText = document.querySelector(".quote-text");
    var quoteAuthor = document.querySelector(".quote-author");

    // get random number from quotes dict
    randomNumber = Math.floor((Math.random() * Object.keys(quotes).length + 1));

    // update the text content with the random quote
    quoteText.innerHTML = `"${quotes[randomNumber]["quote"]}"`;
    quoteAuthor.innerHTML = `-${quotes[randomNumber]["author"]}`;

    // adjust size of dot-container div in order to be the same as the controls div
    function adjustDotContainerHeight() {
        let dotContaniner = document.querySelector('.dot-container');
        let controlsDiv = document.querySelector('.controls');
        height = controlsDiv.offsetHeight;
        dotContainer.style.height = `${height}px`
    }


})