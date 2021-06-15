const X_CLASS= 'x'
const CIRCLE_CLASS = 'circle'
const boxes=document.querySelectorAll('[data-box]')

const turnmessage=document.querySelector('[data-turn]') 

const resultwindow=document.getElementById('result')
const resultmessage=document.querySelector('[data-result]') 
const restartb= document.getElementById('restartb')

const main=document.getElementById('main')
const choose=document.getElementById('choose')
const double=document.getElementById('double')
const single=document.getElementById('single')

const back=document.getElementById('back')
const back2=document.getElementById('back2')

const huPlayer = 'x';
const aiPlayer = 'circle';

const XorYesButton=document.getElementById('XorYes')
const OorNoButton=document.getElementById('OorNo')
const shape=document.getElementById('shape')
const shapechoose=document.querySelector('[data-shapechoose]') 
const xoryes=document.querySelector('[data-xoryes]') 
const oorno=document.querySelector('[data-oorno]') 

const scorewin=document.querySelector('[data-win]')
const scoredraw=document.querySelector('[data-draw]')
const scoreloose=document.querySelector('[data-loose]')

let clicksound = document.getElementById("clicksound"); 
let winsound = document.getElementById("winsound"); 
let playsound = document.getElementById("playsound"); 
let backgroundsound = document.getElementById("backgroundsound"); 

const wincomb=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

let cturn, doublegame=false, singlegame=false, scorew=0, scored=0, scorel=0


shape.classList.add('hide')
main.classList.add('hide')

double.addEventListener('click',switchwindowd)
function switchwindowd(){
    backgroundsound.play(); 
    clicksound.play(); 
    shape.classList.remove('hide')
    xoryes.innerText=`X`
    oorno.innerText=`O`
    shapechoose.innerText=`PLAYER 1: Choose X or O`
    choose.classList.add('hide')
    doublegame=true
}

single.addEventListener('click',switchwindows)
function switchwindows(){
    backgroundsound.play();
    clicksound.play(); 
    shape.classList.remove('hide')
    xoryes.innerText=`Y`
    oorno.innerText=`N`
    shapechoose.innerText=`Do you want to start first? Y or N`
    choose.classList.add('hide')
    singlegame=true
}

XorYesButton.addEventListener('click',switchwindowdX)
function switchwindowdX(){
    clicksound.play(); 
    main.classList.remove('hide')
    shape.classList.add('hide')
    cturn=false
    resetScore()
    startGame()
}
OorNoButton.addEventListener('click',switchwindowdO)
function switchwindowdO(){
    clicksound.play(); 
    main.classList.remove('hide')
    shape.classList.add('hide')
    cturn=true
    resetScore()
    startGame()
}

function resetScore(){
    if(doublegame){
        scored=0
        scoredraw.innerText='Draw\n'+scored
        scorel=0
        scoreloose.innerText='O\n'+scorel
        scorew=0
        scorewin.innerText='X\n'+scorew
    }
    if(singlegame){
        scored=0
        scoredraw.innerText='Draw\n'+scored
        scorel=0
        scoreloose.innerText='Bot\n'+scorel
        scorew=0
        scorewin.innerText='You\n'+scorew
    }
}

back.addEventListener('click',returntofront)
function returntofront(){
    clicksound.play(); 
    doublegame=false
    singlegame=false
    turnmessage.innerText=``
    main.classList.add('hide')
    choose.classList.remove('hide')
}
back2.addEventListener('click',returntofront2)
function returntofront2(){
    clicksound.play(); 
    doublegame=false
    singlegame=false
    shape.classList.add('hide')
    choose.classList.remove('hide')
}

restartb.addEventListener('click',startGame)

function startGame(){
    clicksound.play(); 
    boxes.forEach(box =>{
        box.classList.remove(X_CLASS)
        box.classList.remove(CIRCLE_CLASS)
        box.removeEventListener('click',clicking)
        box.addEventListener('click',clicking,{once: true})
    })
    resultwindow.classList.remove('show')
    if(doublegame){
        turnmessage.innerText = `${cturn ? "O's": "X's"}Turn`
    }
    if(singlegame){
        turnmessage.innerText = `${cturn ? "Bot's": "Your"} Turn`
        if(cturn===true){
            placebotshape(4,CIRCLE_CLASS)
            turnmessage.innerText = `Your Turn`
        }
    }
}

function clicking(e){ 
    const box = e.target
    if(!box.classList.contains(X_CLASS)&&!box.classList.contains(CIRCLE_CLASS)){
        playsound.play();
        if(doublegame){
            const currentClass= cturn?CIRCLE_CLASS:X_CLASS
            placeshape(box,currentClass)
            if(checkWin(currentClass)){
                endgame(false)
            }else if (checkDraw()){
                endgame(true) 
            }
            else{
                swapturn()
                turnmessage.innerText = `${cturn ? "O's": "X's"}Turn`
            }
        }
        else if(singlegame){
            cturn=false
            placeshape(box,X_CLASS)
            if(checkWin(X_CLASS)){
                endgame(false)
            }else if (checkDraw()){
                endgame(true) 
            }
            else{
                cturn=true
                turnmessage.innerText = `Bot's Turn`
                placebotshape(perfectspot(),CIRCLE_CLASS)
                if(checkWin(CIRCLE_CLASS)){
                    endgame(false)
                }else if (checkDraw()){
                    endgame(true) 
                }
                turnmessage.innerText = `Your Turn`
            }
        }
    }
}

function placeshape(box, currentClass){
    box.classList.add(currentClass)
}

function placebotshape(index,currentClass){
    boxes[index].classList.add(currentClass)
}

function swapturn(){
    cturn= !cturn
}

function checkWin(currentClass){
    return wincomb.some(combination => {
        return combination.every(index => {
            return boxes[index].classList.contains(currentClass)
        })
    })
}

function endgame(draw){
    if(draw){
        resultmessage.innerText = 'DRAW!'
        scored=scored+1
        scoredraw.innerText='Draw\n'+scored
    }
    else{
        resultmessage.innerText = `${cturn ? "O's": "X's"}Wins!`
        if(cturn){
            scorel=scorel+1
            if(doublegame){
            scoreloose.innerText='O\n'+scorel
            }
            else{
                scoreloose.innerText='Bot\n'+scorel    
            }
        }
        else{
            scorew=scorew+1
            if(doublegame){
            scorewin.innerText='X\n'+scorew
            }
            else{
            scorewin.innerText=nameSingle+'\n'+scorew  
            }
        }
    }
    winsound.play()
    resultwindow.classList.add('show')
}

function checkDraw(){
    return[...boxes].every(box =>{
        return box.classList.contains(X_CLASS)||
        box.classList.contains(CIRCLE_CLASS)
        }) 
}



function emptyboxes() {
	let avail=[];
    for(let i=0;i<9;i++){
      if(!boxes[i].classList.contains(X_CLASS)&&!boxes[i].classList.contains(CIRCLE_CLASS)){
        avail.push(i);
      };
    }
    return avail;
}

function perfectspot() {
	return minimaxalgo(boxes, aiPlayer).index;
}

function minimaxalgo(newBoard, player) {
	let availSpots = emptyboxes();

	if (checkWinhidden(newBoard, huPlayer)) {
		return {score: -10};
	} 
    else if (checkWinhidden(newBoard, aiPlayer)) {
		return {score: 10};
	} 
    else if (availSpots.length === 0) {
		return {score: 0};
    }

	let move_array = [];
	for (let i = 0; i < availSpots.length; i++) {

		let move = {};
		move.index = newBoard[availSpots[i]].id;
        newBoard[availSpots[i]].classList.add(player)

		if (player === aiPlayer) {
			move.score = minimaxalgo(newBoard, huPlayer).score;
		} else {
			move.score = minimaxalgo(newBoard, aiPlayer).score;
		}
        newBoard[availSpots[i]].classList.remove(player)

        if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
           return move;
        else 
           move_array.push(move);
	}

	let bestMove;
	if(player === aiPlayer) {
		let bestScore = -10000;
		for(let i = 0; i < move_array.length; i++) {
			if (move_array[i].score > bestScore) {
				bestScore = move_array[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for(let i = 0; i < move_array.length; i++) {
			if (move_array[i].score < bestScore) {
				bestScore = move_array[i].score;
				bestMove = i;
			}
		}
	}
	return move_array[bestMove];
}

function checkWinhidden(board, player) {
	return wincomb.some(combination => {
        return combination.every(index => {
            return board[index].classList.contains(player)
        })
    })
}