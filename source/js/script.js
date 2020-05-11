// Управление кнопками видео-плеера

document.querySelector('.btn-replay').onclick = play; 
document.querySelector('.video').onclick = play;
// document.querySelector('.video').mouseover = emergenceControls;
document.querySelector('.volume-slider').oninput = videoVolume;
document.querySelector('.btn-fullscreen').onclick = FullScreen;

// document.querySelector(' ').onclick = cancelFullscreen;


var video = document.querySelector('.video');
var progress = document.querySelector('.volume-slider');
var videoControls = document.querySelector('.video-controls'); // создаем переменную для блока с нашими элементами контроля
var poster = document.querySelector('video[poster]');
var like = document.querySelectorAll('.photo__like');


// Счетчик лайков

for (var i = 0 ; i < like.length; i++) {
    like[i].addEventListener('click' , function(){
        var namberLikes = this.innerText; // Получаем текст элемента
        namberLikes = Number.parseInt(namberLikes); // Преобразуем полученную строку в число
            if(this.classList.contains('liked')) {  
                this.classList.remove('liked');  // Убираем класс liked
                namberLikes = namberLikes - 1;
                this.innerText = namberLikes;
            }else {
                this.classList.add('liked');
                namberLikes = namberLikes + 1;
                this.innerText = namberLikes;
            }
    }) ; 
 }



function disableControls() {
    video.controls = false;
    videoControls.style.display = "flex";
}

disableControls();

function play() {
    poster.style.background = "#000000";  // Замена картинки постера на черный фон
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Появление паннели управления при наведении мышки на видео
video.addEventListener("mouseover", function() {
    videoControls.style.transition = "ease 3s";
    videoControls.style.display = "flex";
});


//  Исчезновение паннели управления при убирании мышки с видео
video.addEventListener("mouseout", function() {
    videoControls.style.transition = "ease 3s";
    videoControls.style.display = "none";
});


// Звук 
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