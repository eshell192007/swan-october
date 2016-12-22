// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Swan UI 0.1.0
// Provisional vanilla code
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// --------------------------------------------------------------
// MOBILE MENU
// --------------------------------------------------------------
// This solution is temporal

var menu = document.querySelector(".menu"); 
var menuShow = document.querySelector(".btnMenu");
var menuFadeBg = document.querySelector(".menu-modal-bg");

function showMobileBtn() {
    if (window.innerWidth <= 768) {
        menu.className = "menu-mobile";
    } else {
        menu.className = "menu";
    }
 }

// Execute Function
showMobileBtn();
window.onresize = function() {
  showMobileBtn();
}

// On click Events ::::::::::::::::::

menuShow.onclick = function(event){
     menu.className += " is-visible";
     menuFadeBg.className += " is-visible";
     event.preventDefault();
};
// Shame but works
menuFadeBg.onclick = function(event){
     // Delete and Write menu classes
     menu.className = "";
     menu.className = "menu-mobile";
     // Delete and Write fade screen classes
     menuFadeBg.className = "";
     menuFadeBg.className = "menu-modal-bg";
     event.preventDefault();
};


// --------------------------------------------------------------
// PREVENT DEFAULT for href="#" links
// --------------------------------------------------------------
// This solution is temporal

var nullAnchors = document.querySelectorAll("a[href='#']");

for (var i = 0; i < nullAnchors.length; i++) {
    nullAnchors[i].addEventListener("click", preventDefaultEvent);
}

function preventDefaultEvent(event) {
    event.preventDefault();
}

// --------------------------------------------------------------
// TOGGLE (Hide / Show element)
// --------------------------------------------------------------
// This solution is temporal

var toggleBtn = document.querySelectorAll(".js-toggle");

for (var i = 0; i < toggleBtn.length; i++) {

    toggleBtn[i].addEventListener("click", function (event) {
      var nextEl = this.nextElementSibling;

      if (nextEl.className === "js-toggle-hidden") {
          nextEl.className = "js-toggle-visible";
      } else {
          nextEl.className = "js-toggle-hidden";
      }
  });
}

// --------------------------------------------------------------
// SWITCH STYLESHEET (Black Swan / White Swan)
// --------------------------------------------------------------
// This solution is temporal

var btnSwapTheme = document.getElementById("swap-theme");
var blackSwan = document.styleSheets[0];
var whiteSwan = document.styleSheets[1];

btnSwapTheme.onchange = function() {
  if (whiteSwan.disabled === false) {
      whiteSwan.disabled = true;
      btnSwapTheme.checked = true;
      localStorage.setItem("currentTheme", "black"); 
  } else {
      whiteSwan.disabled = false;
      btnSwapTheme.checked = false;
      localStorage.setItem("currentTheme", "white"); 
  }
  
}

function currentThemeValue() {
    if (localStorage.getItem("currentTheme") === "black" ) {
        whiteSwan.disabled = true;
        btnSwapTheme.checked = true;
    } else {
        whiteSwan.disabled = false;
        btnSwapTheme.checked = false;
    }
}

// --------------------------------------------------------------
// ACTIVE MENU ITEM
// --------------------------------------------------------------
// This solution is temporal


  function activeMenuItem() {
    var menulinks = document.querySelector(".menu, .menu-mobile").getElementsByTagName("a"),
        i = 0,
        length = menulinks.length,
        fullpath = location.href.split("#")[0];

    for(; i < length; i++) {
        if(menulinks[i].href.split("#")[0] === fullpath) {
            menulinks[i].className += " active";
        }
    }
}

// --------------------------------------------------------------
// ACTIVE MENU ITEM & CURRENT THEME
// --------------------------------------------------------------
// This solution is temporal

document.addEventListener("DOMContentLoaded", currentThemeValue);
document.addEventListener("DOMContentLoaded", activeMenuItem);
