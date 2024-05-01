let progress = document.getElementById("progress");
let fill = document.getElementById("progress-fill");

let volume_slider = document.getElementById("volume_slider");
let volume_percent = document.getElementById("volume-percent");
let volume_icon = document.getElementById("volume-icon");

let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

let cover = document.getElementById("track-image");
let songTitle = document.getElementById("track-title");
let songArtist = document.getElementById("track-artist");


const music_list = [
    {
        img: '../media/songs/covers/betweentwoworlds.jpg',
        name: 'Between Two Worlds',
        artist: 'Mili',
        music: '../media/songs/betweentwoworlds.ogg'
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    },
    
    {
        img: '',
        name: '',
        artist: '',
        music: ''
    }
];

song.onloadedmetadata = function(){
    song.pause();
    curr_time.textContent = "0:00";
    total_duration.textContent = "0:00";
    progress.max = song.duration;
    progress.value = song.currentTime;
    volume_slider.value = song.volume
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

function backward(){
    progress.value = 0;
    song.currentTime = progress.value;
    if(ctrlIcon.classList.contains("fa-play")){
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

function forward(){
    progress.value = song.duration;
    song.currentTime = progress.value;
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
        setUpdate();
        // console.log(song.currentTime);
    },200);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
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

        
        var songPercentage = (song.currentTime / song.duration) * 100;
        fill.style.setProperty('--progress-bar-transform', songPercentage + "%");
    }
}