let openBtn1 = document.getElementById("openBtn1");
let openBtn2 = document.getElementById("openBtn2");
let openBtn3 = document.getElementById("openBtn3");
let openBtn4 = document.getElementById("openBtn4");

let modal1= document.getElementById("modal1");
let modal2= document.getElementById("modal2");
let modal3= document.getElementById("modal3");
let modal4= document.getElementById("modal4");



openBtn1.addEventListener("click", function() {
    modal1.classList.add('show')
});
openBtn2.addEventListener("click", function() {
    modal2.classList.add('show')
});
openBtn3.addEventListener("click", function() {
    modal3.classList.add('show')
});
openBtn4.addEventListener("click", function() {
    modal4.classList.add('show')
});

// close
let closeBtn1 = document.getElementById("closeBtn1");
let closeBtn2 = document.getElementById("closeBtn2");
let closeBtn3 = document.getElementById("closeBtn3");
let closeBtn4 = document.getElementById("closeBtn4");

closeBtn1.addEventListener('click', function () {
    modal1.classList.remove("show")
});
closeBtn2.addEventListener('click', function () {
    modal2.classList.remove("show")
});
closeBtn3.addEventListener('click', function () {
    modal3.classList.remove("show")
});
closeBtn4.addEventListener('click', function () {
    modal4.classList.remove("show")
});