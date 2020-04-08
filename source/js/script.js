// Управление кнопками видео-плеера

document.querySelector('.btn-replay').onclick = play; 
document.querySelector('.video').onclick = play;
document.querySelector('.volume').oninput = videoVolume;



var video = document.querySelector('.video');
var progress = document.querySelector('.volume');
var videoControls = document.querySelector('.video-controls'); // создаем переменную для юлока с нашими элементами контроля

video.ontimeupdate = progressUpdate;  // обновление прогресс-бара
progress.onclick = videoRewind;  // Клик на полосе прокрутки

function disableControls() {
    video.controls = false;
    videoControls.style.display = "flex";
}

disableControls();

function play() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    
}

// function play() {
//     video.play();
// }

// function pause() {
//     video.pause();
// }

// function stop() {
//     video.pause();
//     video.currentTime = 0;
// }
// function speedUp() {
//     video.play();
//     video.playbackRate = 2;
// }

// function speedDown() {
//     video.play();
//     video.playbackRate = 0.5;
// }

// function speedNormal() {
//     video.play();
//     video.playbackRate = 1;
// }

function videoVolume() {
    var v = this.value;
    video.volume = v / 100;
}

function progressUpdate() {
    var d = video.duration;
    var c = video.currentTime;
    progress.value = (100 * c) / d;
    // document.querySelector('#out').innerHTML = video.currentTime;
}

function videoRewind() {
    var w = this.offsetWidth;  // Получаем полную ширину прогресс бара
    var o = event.offsetX; // Получаем ширину прогресс бара в месте клика
    this.value = (100 * o) / w;
    video.pause();
    video.currentTime = video.duration * (o / w); 
    video.play();
    document.querySelector('#out').innerHTML = this.value ;
}