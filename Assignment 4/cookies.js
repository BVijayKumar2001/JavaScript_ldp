/*const Cookies = require("cookies")

localStorage.setItem("name","vijay")
document.write(localStorage.getItem('name'))
localStorage.removeItem('name')

sessionStorage.setItem('name','vij')
document.write(sessionStorage.getItem('name'))
sessionStorage.removeItem('name')

document.cookie ='name=kyle; expires=' + new Date(2020,0,9).toUTCString()
document.cookie="name=vij;"
*/
var local_score=0;
function localScore(){
  local_score++;
  localStorage.setItem('Local Score',local_score);
  //const totalClick=document.getElementById("local_score");
  //const ls=parseInt(totalClick.innerText)+click;
  //totalClick.innerText=ls;
}


var session_score=0;
function sessionScore(){
  session_score++;
  sessionStorage.setItem('Session Score',session_score);
  //const stotalClick=document.getElementById("session_score");
  //const ss=parseInt(stotalClick.innerText)+click;
  //stotalClick.innerText=ss;
}