// -----------------------------------------------------------
// SWAN CORE  by Sebastian Serna - 2016
// -----------------------------------------------------------
// Provisional vanilla code // This solution is temporal
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// PREVENT DEFAULT for href="#" links
// -----------------------------------------------------------

var nullAnchors = document.querySelectorAll("a[href='#']");

for (var i = 0; i < nullAnchors.length; i++) {
    nullAnchors[i].addEventListener("click", preventDefaultEvent);
}

function preventDefaultEvent(event) {
    event.preventDefault();
}
