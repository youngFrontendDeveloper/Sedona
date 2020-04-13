// Управление кнопками видео-плеера

document.querySelector('.btn-replay').onclick = play; 
document.querySelector('.video').onclick = play;
document.querySelector('.volume-slider').oninput = videoVolume;
document.querySelector('.btn-fullscreen').onclick = FullScreen;
// document.querySelector(' ').onclick = cancelFullscreen;


var video = document.querySelector('.video');
var progress = document.querySelector('.volume-slider');
var videoControls = document.querySelector('.video-controls'); // создаем переменную для блока с нашими элементами контроля

// video.ontimeupdate = progressUpdate;  // обновление прогресс-бара
// progress.onclick = videoRewind;  // Клик на полосе прокрутки

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

function videoVolume() {
    var v = this.value;
    video.volume = v / 100;
}

// Полноэкранный режим видео
function FullScreen() {
    if(video.requestFullScreen) {
        video.requestFullScreen();
      } else if(video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if(video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen();
      }  
}

// Выход из полноэкранного режима
// function cancelFullscreen() {
//     if(video.cancelFullScreen) {
//       video.cancelFullScreen();
//     } else if(video.mozCancelFullScreen) {
//       video.mozCancelFullScreen();
//     } else if(video.webkitCancelFullScreen) {
//       video.webkitCancelFullScreen();
//     }
//   }

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



// function progressUpdate() {
//     var d = video.duration;
//     var c = video.currentTime;
//     progress.value = (100 * c) / d;
//     // document.querySelector('#out').innerHTML = video.currentTime;
// }

// function videoRewind() {
//     var w = this.offsetWidth;  // Получаем полную ширину прогресс бара
//     var o = event.offsetX; // Получаем ширину прогресс бара в месте клика
//     this.value = (100 * o) / w;
//     video.pause();
//     video.currentTime = video.duration * (o / w); 
//     video.play();
//     document.querySelector('#out').innerHTML = this.value ;
// }