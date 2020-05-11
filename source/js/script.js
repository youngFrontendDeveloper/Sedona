var replay = document.querySelector('.btn-replay');
var video = document.querySelector('.video');
var volume = document.querySelector('.volume-slider');
var fullscreen = document.querySelector('.btn-fullscreen');
var progress = document.querySelector('.volume-slider');
var videoControls = document.querySelector('.video-controls'); // создаем переменную для блока с нашими элементами контроля
var poster = document.querySelector('video[poster]');
var like = document.querySelectorAll('.photo__like');  // Переменная для лайков
var topMenu = document.querySelector('.top-menu');
var mobileMenu = document.querySelector('.mobile-menu');
var closeMenu = document.querySelector('.close');
var openMenu = document.querySelector('.mobile-menu__button');



//  Открытие/закрытие мобильного меню

function menu() {
    if (document.documentElement.clientWidth < 768) {
        topMenu.classList.add('none');
        closeMenu.classList.add('none');
        openMenu.addEventListener('click', function() {
            topMenu.classList.remove('none');
            closeMenu.classList.remove('none');
            mobileMenu.classList.add('none');
        }); 

        closeMenu.addEventListener('click', function() {
            topMenu.classList.add('none');
            closeMenu.classList.add('none');
            mobileMenu.classList.remove('none');
        });
    }
}
menu();



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


// Управление кнопками видео-плеера

function disableControls() {
    video.controls = false;  // Отключаем стандартную паннель
    videoControls.style.display = "flex";  // Включаем свою паннель
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

replay.addEventListener('click', play);
video.addEventListener('click', play);


// Появление паннели управления при наведении мышки на видео

video.addEventListener('mouseover', function() {
    videoControls.style.transition = "ease 3s";
    videoControls.style.display = "flex";
});

videoControls.addEventListener('mouseover', function() {
    videoControls.style.transition = "ease 3s";
    videoControls.style.display = "flex";
});

//  Исчезновение паннели управления при убирании мышки с видео
video.addEventListener("mouseout", function() {
    videoControls.style.transition = "ease 3s";
    videoControls.style.display = "none";
});

videoControls.addEventListener('mouseout', function() {
    videoControls.style.transition = "ease 3s";
    videoControls.style.display = "none";
});



// Звук 

function videoVolume() {
    var v = this.value;
    video.volume = v / 100;
}

volume.addEventListener('input', videoVolume);


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

fullscreen.addEventListener('click', FullScreen);