const question =document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const progresstext=document.getElementById("progresstext");
const scoretext=document.getElementById("score");
const progressbarfull=document.getElementById("progress-bar-full");
const loader=document.getElementById("loader");
const game=document.getElementById("game");

let currentquestion={};
let acceptinganswers=false;
let score=0;
let questioncounter=0;
let availablequestions=[];
let questions=[];
fetch("https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple").then(res=>{
	console.log(res);
	return res.json();
}).then(loadedquestions=>{
	console.log(loadedquestions.results);
	questions=loadedquestions.results.map(loadedquestion=>{
		const formattedquestion={
			question:loadedquestion.question
		};
		const answerchoices=[...loadedquestion.incorrect_answers];
		formattedquestion.answer=Math.floor(Math.random()*3)+1;
		answerchoices.splice(formattedquestion.answer-1,0,loadedquestion.correct_answer);
		answerchoices.forEach((choice,index)=>{
			formattedquestion["choice"+(index+1)]=choice;
		});
		return formattedquestion;
	});
	//questions=loadedquestions;
	startgame();
})
.catch(err=>{
	console.error(err);
});
//CONSTANTS

const CORRECT_BONUS=10;
const MAX_QUESTIONS=10;
startgame=()=>{
	questioncounter=0;
	score=0;
	availablequestions=[...questions];
	console.log(availablequestions);
	getnewquestion();
	game.classList.remove("hidden");
	loader.classList.add("hidden");
};
getnewquestion=()=>{
	if(availablequestions.length==0||questioncounter>=MAX_QUESTIONS){
		localStorage.setItem("mostrecentscore",score);
		return window.location.assign("end.html");
	}

	questioncounter++;
	progresstext.innerText=`QUESTION ${questioncounter}/${MAX_QUESTIONS}`;
	progressbarfull.style.width=`${(questioncounter/MAX_QUESTIONS)*100}%`;


	const questionindex=Math.floor(Math.random()*availablequestions.length);
	currentquestion=availablequestions[questionindex];
	question.innerText=currentquestion.question;
	//console.log(questionindex);
	choices.forEach(choice=>{
		const number=choice.dataset["number"];
		choice.innerText=currentquestion["choice"+number];
	});

	availablequestions.splice(questionindex,1);
	acceptinganswers=true;
};
choices.forEach(choice=>{
	choice.addEventListener("click",e=>{
		if(!acceptinganswers)return;
		acceptingansers=false;
		const selectedchoice=e.target;
		console.log(e.target);
		const selectedanswer=selectedchoice.dataset["number"];
		console.log(selectedanswer,currentquestion.answer);
		const classtoapply= 
			selectedanswer==currentquestion.answer ? "correct" : "incorrect";
		selectedchoice.parentElement.classList.add(classtoapply);
		if(classtoapply==="correct")
		{
			incrementscore(CORRECT_BONUS);
		}
		setTimeout(()=>{
			selectedchoice.parentElement.classList.remove(classtoapply);
			getnewquestion();
		},1000);
	});
});

incrementscore=num=>{
	score+=num;
	scoretext.innerText=score;
};
