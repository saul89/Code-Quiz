var clearHighscores = document.querySelector("#clearhighscores"),
olEL = document.createElement("ol");

clearHighscores.addEventListener("click",function(event){
    event.preventDefault();
    localStorage.clear();
    document.querySelectorAll("#liScoreEl").forEach(e => e.parentNode.removeChild(e));
})

olEL.setAttribute("id","olScoresEl");
document.body.querySelector(".main-content").insertBefore(olEL, document.querySelector(".main-content").children[1]);

for(var i = 0 ; i < localStorage.length ; i++ ){
    var tagLi = document.createElement("li");
    tagLi.setAttribute("id", "liScoreEl");
    tagLi.textContent = localStorage.key(i)+ " - " +localStorage.getItem(localStorage.key(i));
    document.querySelector("#olScoresEl").appendChild(tagLi);
  }
