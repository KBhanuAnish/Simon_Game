let count=0;  
let started=false;
let input=[];
let output=[];
let scoreSaved=false;
let col=['red','yellow','blue','orange'];
let body=document.querySelector('body');
let mainLine=document.querySelector('#mianline')
    body.addEventListener('keydown',function(){
            if(started==false){
            started=true;
            scoreSaved=false;
            levelUp();
            }
        }
    );
 let btn=document.querySelectorAll('.btn');
 for(bt of btn){
     bt.addEventListener('click',btnPress);
 }

function btnPress(){
    
    Flash(this);
    colour=this.getAttribute('id');
    output.push(colour)
    checkAns(output.length-1);
}

function checkAns(ind){
    if(input[ind]==output[ind]){

        if(input.length==output.length){
       
            output=[];
            setTimeout(levelUp,1200);
        }
    }
    else{
        const finalScore = Math.max(0, count - 1);
        mainLine.innerText=`Danegey Tapu othav ra puka ! 
            Ne score ${finalScore}`;
        saveScore(finalScore);
        resetL();
    }
}


function Flash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash')
    },300);
}

function levelUp(){
    count++;
    mainLine.innerText=`Level ${count}`;
       let  btn_num=Math.floor(Math.random()*4);
        let btn=document.querySelector(`.${col[btn_num]}`);
        input.push(col[btn_num]);
        console.log(input);
        Flash(btn);
               
}

function resetL(){
    started=false;
    count=0;
    input=[];
    output=[];
}

async function saveScore(score){
    if (scoreSaved) return;
    scoreSaved = true;
    try {
        const response = await fetch(`/api/players/${encodeURIComponent(playerId)}/score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ score })
        });
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        console.log('Score saved:', (await response.json()).score);
    } catch (error) {
        scoreSaved = false;
        console.error('Could not save score:', error);
    }
}
