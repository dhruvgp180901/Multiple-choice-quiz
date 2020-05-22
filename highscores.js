const highscoreslist=document.getElementById("highscoreslist");
const highscores=JSON.parse(localStorage.getItem("highscores"))||[];
console.log(highscores);
highscoreslist.innerHTML=highscores.map(score=>{
	return `<li class="high-scores">${score.name} - ${score.score}</li>`;
}).join("");