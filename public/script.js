//a function to toggle the audio playback
function toggleAudio() {
    var audio = document.getElementById('backgroundMusic');
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}
//a function to change the title color to a random color
function changeTitleColor() {
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    document.querySelector('h1').style.color = randomColor;
}

//an event listener for the tell me a joke button
document.getElementById('getJoke').addEventListener('click', () => {
    fetch('/joke')
        .then(response => response.json())
        .then(data => {
            const jokeContainer = document.getElementById('jokeContainer');
            //clearing previous joke
            jokeContainer.innerHTML = '';
            //determining if the joke is a two or a single part
            if (data.setup) {
                jokeContainer.innerHTML = `<p class="joke-text">${data.setup}</p><p class="joke-text">${data.delivery}</p>`;
            } else {
                jokeContainer.innerHTML = `<p class="joke-text">${data.joke}</p>`;
            }
            //changing the title color with each new joke
            changeTitleColor();
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            document.getElementById('jokeContainer').innerHTML = `<p class="joke-text">Oops! Something went wrong. Please try again later.</p>`;
            //changing the title color even if there's an error, to indicate an attempt was made
            changeTitleColor();
        });
});
