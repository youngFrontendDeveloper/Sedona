var e=document.querySelector(".btn-replay"),t=document.querySelector(".video"),n=document.querySelector(".volume-slider"),s=document.querySelector(".btn-fullscreen"),o=(document.querySelector(".volume-slider"),document.querySelector(".video-controls")),l=document.querySelector("video[poster]"),i=document.querySelectorAll(".photo__like"),c=document.querySelector(".top-menu"),r=document.querySelector(".mobile-menu"),u=document.querySelector(".close"),d=document.querySelector(".mobile-menu__button");document.documentElement.clientWidth<768&&(c.classList.add("none"),u.classList.add("none"),d.addEventListener("click",function(){c.classList.remove("none"),u.classList.remove("none"),r.classList.add("none")}),u.addEventListener("click",function(){c.classList.add("none"),u.classList.add("none"),r.classList.remove("none")}));for(var a=0;a<i.length;a++)i[a].addEventListener("click",function(){var e=this.innerText;e=Number.parseInt(e),this.classList.contains("liked")?(this.classList.remove("liked"),--e):(this.classList.add("liked"),e+=1),this.innerText=e});function m(){l.style.background="#000000",t.paused?t.play():t.pause()}t.controls=!1,o.style.display="flex",e.addEventListener("click",m),t.addEventListener("click",m),t.addEventListener("mouseover",function(){o.style.transition="ease 3s",o.style.display="flex"}),o.addEventListener("mouseover",function(){o.style.transition="ease 3s",o.style.display="flex"}),t.addEventListener("mouseout",function(){o.style.transition="ease 3s",o.style.display="none"}),o.addEventListener("mouseout",function(){o.style.transition="ease 3s",o.style.display="none"}),n.addEventListener("input",function(){var e=this.value;t.volume=e/100}),s.addEventListener("click",function(){t.requestFullScreen?t.requestFullScreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.webkitRequestFullScreen&&t.webkitRequestFullScreen()});