var clearHighscores = document.querySelector("#clearhighscores"),
olEL = document.createElement("ol"),
scoresArray = [],
scoresArrayDesc = [],
scoresArrayLi = [];

clearHighscores.addEventListener("click",function(event){
    event.preventDefault();
    localStorage.clear();
    document.querySelectorAll("#liScoreEl").forEach(e => e.parentNode.removeChild(e));
})

olEL.setAttribute("id","olScoresEl");
document.body.querySelector(".main-content").insertBefore(olEL, document.querySelector(".main-content").children[1]);

for(var i = 0 ; i < localStorage.length ; i++ ){
    var score = localStorage.key(i) + " - " + localStorage.getItem(localStorage.key(i));
    var scoreDesc = localStorage.getItem(localStorage.key(i));
    scoresArray.push(score);
    scoresArrayDesc.push(scoreDesc);
  }

  console.log(scoresArray);

  scoresArrayDesc.sort(function(a, b){return b-a});

  console.log(scoresArrayDesc);

  for(var i=0 ;  i < scoresArray.length ; i++ ){
    for(var j = 0 ;  j < scoresArrayDesc.length ; j++){
    if(scoresArray[i].slice(5).includes(scoresArrayDesc[j])){
      scoresArrayLi[j] = scoresArray[i];
    };
    }
  }
  
  for(var i = 0 ; i < scoresArrayLi.length ; i++ ){
    var tagLi = document.createElement("li");
    tagLi.setAttribute("id", "liScoreEl");
    tagLi.textContent = scoresArrayLi[i];
    document.querySelector("#olScoresEl").appendChild(tagLi);
  }
 