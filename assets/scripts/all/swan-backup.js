// Test whithout JQuery

var width = window.innerWidth;
var menuMain = document.getElementById("menu-main");
var btnMenu = document.getElementById("btnMenu");
var fadeScreen = document.getElementById("fadeScreen");
var classVisible = document.getElementsByClassName("is-visible");

window.addEventListener('resize', function(event){
  if(width <= 768){
      menuMain.className = "menu-mobile";
  } else{
      menuMain.className = "menu";
  }
});

btnMenu.onclick = function(){
    menuMain.className = "menu-mobile is-visible";
    fadeScreen.className += " is-visible";
};
