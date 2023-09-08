let t = [[],[],[],[]];
for(let i=0;i<4;i++){
    t[i] = document.getElementsByClassName("row")[i].getElementsByClassName("box");
}
for(let i=0;i<4;i++){
    for(let j =0;j<4;j++){
        t[i][j].innerHTML = "";
    }
}

let p1 = Math.floor(Math.random()*3),p2 = Math.floor(Math.random()*3);
t[p1][p2].innerHTML = 2;
console.log(t[p1][p2]);
t[p1][p2].style.backgroundColor = '#f0e4dc';
let score = 0;
let score_temp = 0;
let best  =0;

document.addEventListener('keydown',keypress);
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;   

function checkDirection() {
    let difX = touchstartX - touchendX;
    let difY = touchstartY - touchendY;
if (Math.abs(difX) > Math.abs(difY)) {
    if (touchendX < touchstartX) {changeGame('left')}
    if (touchendX > touchstartX) {changeGame('right')}
} else {
    if (touchendY < touchstartY) {changeGame('up')}
    if (touchendY > touchstartY) {changeGame('down')}
}
};
let toucharea  = document.getElementsByClassName('Table');
toucharea[0].addEventListener('touchstart', e => {
    e.preventDefault();
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
});

toucharea[0].addEventListener('touchend', e => {
    e.preventDefault();
    touchendX = e.changedTouches[0].screenX;
    touchendY = e.changedTouches[0].screenY;
    checkDirection();
});


let help = [["","","",""],["","","",""],["","","",""],["","","",""]];


function getAnsList(prevList){
    let newList = [];
    let prevLength = prevList.length;
    for(let i=0;i<prevLength;i++){

        if(i != prevLength-1 && (prevList[i] == prevList[i+1])){
            newList.push(2*parseInt(prevList[i]));
            score_temp = score_temp + 2*parseInt(prevList[i]);
            i++;
        }
        else if(prevList[i] != ""){
            newList.push(prevList[i]);
        }
    } 

    return newList;
}

function isequal(help,temp){
    for(let i =0;i<4;i++){
        for(let j=0;j<4;j++){
            if(temp[i][j] != help[i][j]){
                return false;
            }
        }
    }
    return true;
}
function reloadGame(){
    for(let i=0;i<4;i++){
        for(let j =0;j<4;j++){
            t[i][j].innerHTML = "";
            t[i][j].style.backgroundColor = "rgb(161, 161, 161)";
            t[i][j].style.color = "rgb(99, 99, 99)";
        }
    }
    p1 = Math.floor(Math.random()*3),p2 = Math.floor(Math.random()*3);
    t[p1][p2].innerHTML = 2;
    console.log(t[p1][p2]);
    t[p1][p2].style.backgroundColor = '#f0e4dc';
    score = 0;
}
function isgameover(temp){
    helpGame = [["","","",""],["","","",""],["","","",""],["","","",""]];
    
        for(let j=0;j<4;j++){
            let prevList = [];
            for(let i=0;i<4;i++){
               if(temp[i][j] != ''){
                prevList.push(temp[i][j]);
               }
            }
            newList  = getAnsList(prevList);
            let newLength = newList.length;
            let it = 0;
            for(let k=0;k<4;k++){
                if(it >= newLength){
                    helpGame[k][j] = ""; 
                }
                else{
                    helpGame[k][j]= newList[it];
                    it++;
                }
            }
        }
        if(!isequal(helpGame,temp)){
            return;
        }
        
        for(let j=0;j<4;j++){
            let prevList = [];
            for(let i=3;i>=0;i--){
                if(temp[i][j] != ''){
                    prevList.push(temp[i][j]);
                }
            }
            newList  = getAnsList(prevList);
            let newLength = newList.length;
            let it = 0;
            for(let k=3;k>=0;k--){
                if(it >= newLength){
                    helpGame[k][j] = ""; 
                }
                else{
                    helpGame[k][j] = newList[it];
                    it++;
                }
            }
        }
        if(!isequal(helpGame,temp)){
            return;
        }
        for(let i=0;i<4;i++){
            let prevList = [];
            for(let j=0;j<4;j++){
                if(temp[i][j] != ''){
                    prevList.push(temp[i][j]);
                }
            }
            newList  = getAnsList(prevList);
            let newLength = newList.length;
            let it = 0;
            for(let k=0;k<4;k++){
                if(it >= newLength){
                    helpGame[i][k] = "";
                }
                else{
                    helpGame[i][k] = newList[it];
                    it++;
                }
            }
        }
        if(!isequal(helpGame,temp)){
            return;
        }
        for(let i=0;i<4;i++){
            let prevList = [];
            for(let j=3;j>=0;j--){
                if(temp[i][j] != ''){
                    prevList.push(temp[i][j]);
                }
            }
            newList  = getAnsList(prevList);
            let newLength = newList.length;
            let it = 0;
            for(let k=3;k>=0;k--){
                if(it >= newLength){
                   helpGame[i][k] = ""; 
                }
                else{
                    helpGame[i][k] = newList[it];
                    it++;
                }
            }
        }
        
        if(isequal(helpGame,temp)){
            alert("Game Over");
            reloadGame();
            return;
        }
}

function changeTable(temp){
    let row_list = [];
    let helpRandom = 0;
    for(let i=0;i<4;i++){
        for(let j =0;j<4;j++){
            if(temp[i][j] == ''){
                row_list.push([i,j]);
                helpRandom++;
            }
            t[i][j].innerHTML = temp[i][j];
            if(temp[i][j] == ''){t[i][j].style.backgroundColor = 'rgb(161, 161, 161)';}
            if(temp[i][j] == '2'){t[i][j].style.backgroundColor = '#f0e4dc';t[i][j].style.color = 'rgb(99, 99, 99)';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '4'){t[i][j].style.backgroundColor = '#f0e4cc';t[i][j].style.color = 'rgb(99, 99, 99)';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '8'){t[i][j].style.backgroundColor = '#f8b47c' ;t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '16'){t[i][j].style.backgroundColor = '#f89464';t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '32'){t[i][j].style.backgroundColor = '#f87c5c';t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '64'){t[i][j].style.backgroundColor = '#f85c3c';t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '128'){t[i][j].style.backgroundColor = '#f0d474';t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '256'){t[i][j].style.backgroundColor = '#edcc61';t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '512'){t[i][j].style.backgroundColor = '#edc850';t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '70px'}
            if(temp[i][j] == '1024'){t[i][j].style.backgroundColor = '#edc53f';t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '50px'}
            if(temp[i][j] == '2048'){
                t[i][j].style.backgroundColor = '#edc22e';t[i][j].style.color = '#f9f6f2';t[i][j].style.fontSize = '50px';
                alert('Congrats you won the game!!');
                reloadGame();
            }
        }
    }
        let unfillLength = row_list.length;
        if(isequal(temp,help)){
            console.log("yes");
            if(unfillLength == 0){
                if(isgameover(temp)){

                }
            }
        }
        else{
            let r1 = Math.floor(Math.random()*unfillLength);
            console.log(r1);
            let r = row_list[r1][0];
            let c = row_list[r1][1];
            t[r][c].innerHTML = 2;
            t[r][c].style.backgroundColor = '#f0e4dc';
            t[r][c].style.color = 'rgb(99, 99, 99)';
            temp[r][c] = 2;
            score = score + score_temp;
        }
    
    document.getElementById("Score_display").innerHTML = score;
    if(best < score){
        document.getElementById("HS_display").innerHTML = score;
    }
    for(let i=0;i<4;i++){
        for(let j =0;j<4;j++){
            help[i][j] = temp[i][j];
        }
    }
    console.log(help);
}



function changeGame(eKey){
    score_temp = 0;
    temp = [["","","",""],["","","",""],["","","",""],["","","",""]];
    if(eKey == 'up'){
        for(let j=0;j<4;j++){
            let prevList = [];
            for(let i=0;i<4;i++){
               if(t[i][j].innerHTML != ''){
                prevList.push(t[i][j].innerHTML);
               }
            }
            console.log(prevList);
            newList  = getAnsList(prevList);
            let newLength = newList.length;
            let it = 0;
            for(let k=0;k<4;k++){
                if(it >= newLength){
                    temp[k][j] = ""; 
                }
                else{
                    temp[k][j]= newList[it];
                    it++;
                }
            }
        }
    }
    if(eKey == 'down'){
        for(let j=0;j<4;j++){
            let prevList = [];
            for(let i=3;i>=0;i--){
                if(t[i][j].innerHTML != ''){
                    prevList.push(t[i][j].innerHTML);
                }
            }
            newList  = getAnsList(prevList);
            let newLength = newList.length;
            let it = 0;
            for(let k=3;k>=0;k--){
                if(it >= newLength){
                    temp[k][j] = ""; 
                }
                else{
                    temp[k][j] = newList[it];
                    it++;
                }
            }
        }
    }
    if(eKey == 'left'){
        for(let i=0;i<4;i++){
            let prevList = [];
            for(let j=0;j<4;j++){
                if(t[i][j].innerHTML != ''){
                    prevList.push(t[i][j].innerHTML);
                }
            }
            newList  = getAnsList(prevList);
            let newLength = newList.length;
            let it = 0;
            for(let k=0;k<4;k++){
                if(it >= newLength){
                    temp[i][k] = "";
                }
                else{
                    temp[i][k] = newList[it];
                    it++;
                }
            }
        }
    }
    if(eKey == 'right'){
        for(let i=0;i<4;i++){
            let prevList = [];
            for(let j=3;j>=0;j--){
                if(t[i][j].innerHTML != ''){
                    prevList.push(t[i][j].innerHTML);
                }
            }
            newList  = getAnsList(prevList);
            let newLength = newList.length;
            let it = 0;
            for(let k=3;k>=0;k--){
                if(it >= newLength){
                    temp[i][k] = ""; 
                }
                else{
                    temp[i][k] = newList[it];
                    it++;
                }
            }
        }
    }
    changeTable(temp);
}




function keypress(event){
    
    switch(event.key){
        case 'ArrowUp':
            changeGame('up');
            break;
        case 'ArrowDown':
            changeGame('down');
            break;
        case 'ArrowRight':
            changeGame('right');
            break;
        case 'ArrowLeft':
            changeGame('left');
            break;
    }

    return false;
}
