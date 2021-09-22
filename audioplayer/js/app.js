//UI
const musiccontainer = document.getElementById('music-container');

const title = document.getElementById('title'),
    progresscontainer = document.getElementById('progress-container'),
    progress = document.getElementById('progress');

const audio = document.getElementById('audio');

const cover = document.getElementById('cover');

const prevbtn = document.getElementById('prev'),
    playbtn = document.getElementById('play'),
    nextbtn = document.getElementById('next');

//starting point
let songindex = 0;

// song title
const songs = ['sample1','sample2','sample3'];
// console.log(songs[songindex]);

loadsong(songs[songindex]);

function loadsong(music){
    // console.log('music');

    title.innerText = music;
    audio.src= `music/${music}.mp3`;
    cover.src = `img/${music}.jpg`;
}

// evert listener for play song
playbtn.addEventListener('click',()=>{
    // console.log('hay');
    // musiccontainer.classList.add('play');
    const isplaying = musiccontainer.classList.contains('play');

    if(isplaying){
        pausesong();
    }else{
        playsong();
    }
});

// play song
function playsong(){
    musiccontainer.classList.add('play');

    playbtn.querySelector('i.fas').classList.remove('fa-play');
    playbtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//pause song
function pausesong(){
    musiccontainer.classList.remove('play');
    playbtn.querySelector('i.fas').classList.add('fa-play');
    playbtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

// change song
prevbtn.addEventListener('click',previoussong);
nextbtn.addEventListener('click',nextsong);

// previous song
function previoussong(){
    // console.log('hay');
    songindex--;
    // console.log(songindex);

    if(songindex < 0){
        songindex = songs.length -1;
    }

    loadsong(songs[songindex]);

    playsong();

}

// next song
function nextsong(){
    // console.log('hay');
    // songindex += 1;
    songindex++;

    if(songindex > songs.length - 1){
        songindex = 0;
    }

    loadsong(songs[songindex]);

    playsong();
}


//update progress bar
function updateprogress(e){
    // console.log('hay');
    // console.log(audio.currentTime);
    // console.log(audio.duration);


    // method 1
    // const progressprecent = (audio.currentTime / audio.duration) * 100;
    // // console.log(progressprecent);
    // progress.style.width = `${progressprecent}%`;

    // event call
    // console.log(this);
    // console.log(e.target);
    // console.log(e.srcElement);

    // method 2
    //
    // const currenttime = e.target.currentTime;
    // const duration = e.target.duration;
    // const progresspercent = (currenttime / duration) * 100;
    //
    // progress.style.width = `${progresspercent}%`;

    // method3

    // const {currentTime} = e.target.currentTime;
    // const {duration} = e.target;
    // const progresspercent = (currentTime / duration) * 100;
    // progress.style.width = `${progresspercent}%`;

    // method 4
    const {currentTime,duration} = e.target;
    const progresspercent = (currentTime / duration) * 100;
    progress.style.width = `${progresspercent}%`;
}


// time play and stop update
audio.addEventListener('timeupdate',updateprogress);

// click on progress bar
progresscontainer.addEventListener('click',setprogress);

// set progress bar
function setprogress(e){
    // console.log(e.target);

    const width = e.target.clientWidth;
    // console.log(width);

    const clickx = e.offsetX;
    // console.log(clickx);

    const duration = audio.duration;
    // console.log(duration);


    audio.currentTime = (clickx / width) * duration;

}


// song end
audio.addEventListener('ended',nextsong);

