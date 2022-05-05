let term = '';
const songContainer = document.getElementById('songs');
const updateTerm = () => {
    term = document.getElementById('searchinput').value.replace(" ", "+");
    if(!term || term == '') {
        alert('Please enter a search term')
    } else {
        while(songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }
        const url = `https://itunes.apple.com/search?term=${term}&media=music`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const artists = data.results;
            return artists.map(result => {
                const article = document.createElement('article'),
                artist = document.createElement('p'),
                song = document.createElement('p'),
                img = document.createElement('img'),
                audio = document.createElement('audio'),
                audioSource = document.createElement('source');
                
                artist.innerText = result.artistName;
                song.innerText = result.trackName;
                img.src = result.artworkUrl100;
                audioSource.src = result.previewUrl;
                audio.setAttribute("controls", "");
        
                article.appendChild(img);
                article.appendChild(artist);
                article.appendChild(song);
                article.appendChild(audio);
                audio.appendChild(audioSource);
        
                songContainer.appendChild(article);
            });
        })
        .catch(error => console.log("Request failed", error));
    }
};
document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] != event.target) {
            audio[i].pause();
        }
    }
}, true);