let progress = document.getElementById("progress");
let volume_slider = document.getElementById("volume_slider");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

song.onloadedmetadata = function(){
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
    progress.value = 300;
    song.currentTime = progress.value;
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

function setVolume(){
    song.volume = volume_slider.value/100;
}

if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
        setUpdate();
    },500);
}

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
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
    }
}