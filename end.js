const username=document.getElementById("username");
const savescorebtn=document.getElementById("savescorebtn");
const mostrecentscore=localStorage.getItem('mostrecentscore');
const finalscore=document.getElementById("finalscore");
finalscore.innerText =mostrecentscore;
const highscores=JSON.parse(localStorage.getItem("highscores"))||[];
console.log(highscores);
username.addEventListener("keyup",()=>{
	savescorebtn.disabled=!username.value;
	// console.log(username.value);
});

savehighscore=e=>{
	e.preventDefault();
	const score={
		score:mostrecentscore,
		name:username.value
	};
	highscores.push(score);
	highscores.sort((a,b)=>b.score-a.score);
	highscores.splice(5);
	localStorage.setItem("highscores",JSON.stringify(highscores));
	window.location.assign("index.html");
	console.log(highscores);
};