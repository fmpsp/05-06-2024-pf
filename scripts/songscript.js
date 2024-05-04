// TODO
// [ ] Make variables for directories
// [ ] Dynamically change height of song-list based on number of lists

let progress = document.getElementById("progress");
let fill = document.getElementById("progress-fill");

let volume_slider = document.getElementById("volume_slider");
let volume_percent = document.getElementById("volume-percent");
let volume_icon = document.getElementById("volume-icon");

let song = document.createElement("audio");
let ctrlIcon = document.getElementById("ctrlIcon");
let playButton = document.querySelector('.play-icon');
let randomIcon = document.querySelector('.fa-random');

let lyrics = document.getElementById("lyrics");

let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

let songCover = document.getElementById("track-image");
let songTitle = document.getElementById("track-title");
let songArtist = document.getElementById("track-artist");

let unorderedList = document.getElementById("unordered-song-list");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let imgDir = '../media/songs/covers/';
let musicDir = '../media/songs/';
let lyricsDir = '../media/songs/lyrics/';

const music_list = [
    {
        img: 'betweentwoworlds.jpg',
        name: 'Between Two Worlds',
        artist: 'Mili',
        music: 'betweentwoworlds.ogg',
        lyrics: 'betweentwoworlds.txt'
    },
    {
        img: 'sleeptalkmetropolis.jpg',
        name: 'Sleep Talk Metropolis',
        artist: 'Mili',
        music: 'sleeptalkmetropolis.ogg',
        lyrics: 'sleeptalkmetropolis.txt'
    },
    {
        img: 'millenniummother.jpg',
        name: 'Every Other Ghost',
        artist: 'Mili',
        music: 'everyotherghost.ogg',
        lyrics: 'everyotherghost.txt'
    },
    {
        img: 'millenniummother.jpg',
        name: 'Excαlibur',
        artist: 'Mili',
        music: 'excalibur.ogg',
        lyrics: 'excalibur.txt'
    },
    {
        img: 'millenniummother.jpg',
        name: 'Lemonade',
        artist: 'Mili',
        music: 'lemonade.ogg',
        lyrics: 'lemonade.txt'
    },
    {
        img: 'millenniummother.jpg',
        name: 'world.search(you)',
        artist: 'Mili',
        music: 'worldsearchyou.ogg',
        lyrics: 'worldsearchyou.txt'
    },
    {
        img: 'millenniummother.jpg',
        name: 'Summoning 101',
        artist: 'Mili',
        music: 'summoning101.ogg',
        lyrics: 'summoning101.txt'
    },
    {
        img: 'miraclemilk.jpg',
        name: 'Bathtub Mermaid',
        artist: 'Mili',
        music: 'bathtubmermaid.ogg',
        lyrics: 'bathtubmermaid.txt'
    },
    {
        img: 'miraclemilk.jpg',
        name: 'Cerebrite',
        artist: 'Mili',
        music: 'cerebrite.ogg',
        lyrics: 'cerebrite.txt'
    },
    {
        img: 'miraclemilk.jpg',
        name: 'Colorful',
        artist: 'Mili',
        music: 'colorful.ogg',
        lyrics: 'colorful.txt'
    },
    {
        img: 'miraclemilk.jpg',
        name: 'Ga1ahad and Scientific Witchery',
        artist: 'Mili',
        music: 'ga1ahad.ogg',
        lyrics: 'ga1ahad.txt'
    },
    {
        img: 'miraclemilk.jpg',
        name: 'world.execute(me)',
        artist: 'Mili',
        music: 'worldexecuteme.ogg',
        lyrics: 'worldexecuteme.txt'
    },
    {
        img: 'godonlyknows.jpg',
        name: 'God Only Knows -Secrets of the Goddess-',
        artist: 'Hayami Saori, Kawasaki Satomi & Masuda Takeshi',
        music: 'godonlyknows.mp3',
        lyrics: 'godonlyknows.txt'
    },
    
    {
        img: 'mmm.jpg',
        name: 'The Bidding',
        artist: 'tally hall',
        music: 'thebidding.ogg',
        lyrics: 'thebidding.txt'
    }
];

for (let i = 0; i < music_list.length; i++) {
    createListItem(music_list[i].img, music_list[i].name, music_list[i].artist, i);
}

loadTrack(track_index);

function loadTrack(){
    clearInterval(updateTimer);
    reset();

    song.src = musicDir + music_list[track_index].music;
    song.load();

    songCover.src = imgDir + music_list[track_index].img;
    songTitle.textContent = music_list[track_index].name;
    songArtist.textContent = music_list[track_index].artist;

    (async () => {
        try {
          const resp = await fetch(lyricsDir + music_list[track_index].lyrics);
          if (!resp.ok) throw null;
          lyrics.innerText = await resp.text();
        } catch {
          lyrics.innerHTML = lyrics.textContent;
        }
      })()

    updateTimer = setInterval(setUpdate, 1000);

    song.addEventListener('ended', nextTrack);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    progress.value = 0;
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
    isRandom = true;
    randomIcon.style.color = "#ffffff";
}


function pauseRandom(){
    isRandom = false;
    randomIcon.style.color = "#606060";
}

function repeatTrack(){
    loadTrack();
    playTrack();
}

function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack(){
    song.play();
    isPlaying = true;
    playButton.innerHTML = '<i class="play-pause fas fa-pause"></i>';
}

function pauseTrack(){
    song.pause();
    isPlaying = false;
    playButton.innerHTML = '<i class="play-pause fas fa-play"></i>';
}

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    song.currentTime = progress.value;
}

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else{
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

volume_slider.oninput = function() {
    song.volume = volume_slider.value;
    checkVolume();
  } 

  function checkVolume() {
    let vpercentage = Math.floor(volume_slider.value * 100);
    volume_percent.innerHTML = vpercentage + "%";
    if (vpercentage > 50){
        volume_icon.classList.remove("fa-volume-low");
        volume_icon.classList.remove("fa-volume-off");
        volume_icon.classList.remove("fa-volume-xmark");
        volume_icon.classList.add("fa-volume-high");
    }
    else if (vpercentage > 1){
        volume_icon.classList.remove("fa-volume-off");
        volume_icon.classList.remove("fa-volume-high");
        volume_icon.classList.remove("fa-volume-xmark");
        volume_icon.classList.add("fa-volume-low");
    }
    else{
        volume_icon.classList.remove("fa-volume-low");
        volume_icon.classList.remove("fa-volume-high");
        volume_icon.classList.remove("fa-volume-xmark");
        volume_icon.classList.add("fa-volume-off");
    }
    
  }

  function volumeToggle() {
    let preSongVolume = volume_slider.value;
    if(volume_icon.classList.contains("fa-volume-high") || volume_icon.classList.contains("fa-volume-low") || volume_icon.classList.contains("fa-volume-off")){
        volume_slider.value = 0;
        song.volume = volume_slider.value;
        volume_icon.classList.remove("fa-volume-high");
        volume_icon.classList.remove("fa-volume-low");
        volume_icon.classList.remove("fa-volume-off");
        volume_icon.classList.add("fa-volume-xmark");
        volume_percent.innerHTML = "0%";
    }
    else if (volume_icon.classList.contains("fa-volume-xmark")){
        volume_slider.value = 0.15;
        song.volume = volume_slider.value;
        checkVolume();
    }
  }

function setUpdate(){
    if(!isNaN(song.duration)){
    
        let currentMinutes = Math.floor(song.currentTime / 60);
        let currentSeconds = Math.floor(song.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(song.duration / 60);
        let durationSeconds = Math.floor(song.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
        
        progress.max = song.duration;
        progress.value = song.currentTime;
        
        var songPercentage = (song.currentTime / song.duration) * 100;
        fill.style.setProperty('--progress-bar-transform', songPercentage + "%");
    }
}

function createListItem(image, title, artist, index){
    
    var list = document.createElement("li");
    var box = document.createElement("div");
    var button = document.createElement("button");
    var imageSideArea = document.createElement("div");
    var imageSideAreaContainer = document.createElement("div");
    var listImage = document.createElement("img");
    var headerArea = document.createElement("div");
    var column = document.createElement("div");
    var miniArtist = document.createElement("span");

    box.classList.add("box");
    box.innerHTML = `<button class="button" onclick="switchTrack(${index})"></button>`
    imageSideArea.classList.add("image-sidearea");
    imageSideAreaContainer.classList.add("image-sidearea-container");
    listImage.classList.add("list-image");
    headerArea.classList.add("header-area");
    column.classList.add("column");
    
    miniArtist.style.fontSize = "10px";
    miniArtist.innerText = artist;

    listImage.src = imgDir + image;

    unorderedList.append(list);
    list.append(box);
    box.append(imageSideArea, headerArea);
    imageSideArea.append(imageSideAreaContainer);
    imageSideAreaContainer.append(listImage);
    headerArea.append(column);
    column.append(title,miniArtist);
}

function switchTrack(number){
    track_index = number;
    loadTrack();
    playTrack();
}