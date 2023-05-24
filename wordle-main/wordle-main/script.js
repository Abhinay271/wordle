// declearations
let todaysWord = "";
let wordSet = document.getElementById("word");
let grid = new Array(6).fill("").map(() => new Array(5).fill(""));
let gridContainer = document.getElementById("gameContainer");
let totalClicks = 0;
let colClicks = 0;
let rowNum = 0;
let colNum = 0;

let keys = document.getElementsByClassName('keys');
// functions
window.addEventListener("load", (event) => {
  // fetchWord().then(drawMainGrid());
  fetchWord()
  // console.log(grid);
  setTimeout(()=>{
    drawMainGrid();
  }, 1500);
});


for(let i = 0;i<keys.length;i++){
  let currKey = keys[i];
  currKey.addEventListener('click',()=>{
    console.log(`${currKey.innerText} is pressed`);
    // console.log(currKey);
    let key = currKey.innerText;
    if (key == "Enter") {
      if (colNum === 5) {
        const word = grid[rowNum].reduce((p, c) => p + c);
        // console.log(word);
          revealWord(word.toUpperCase());
          rowNum++;
          colNum = 0;
        }
        
    }
    if (key === "") {
      // this is for backspace
      // console.log('came here');
      // removeLetter();
      if(colNum > 0){
        grid[rowNum][colNum-1] = '';
        colNum--;
      }
    }
  
    if (key.length ===1 && key.match(/[a-z]/i)) {
      // addLetter();
      if(colNum < 5){
        grid[rowNum][colNum]=key;
        colNum++;
      }
    }
  
    for(let i = 0;i<grid.length;i++){
      for(let j = 0;j<grid[i].length;j++){
        let = box = document.getElementById(`${i}${j}`);
        box.textContent = grid[i][j].toUpperCase();
      }
    }
  })
}
async function fetchWord() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "61a801c3a8msh96832009ba028b0p1ef14cjsn79ce037cf509",
      "X-RapidAPI-Host": "wordle-answers-solutions.p.rapidapi.com",
    },
  };
  let prom = await fetch(
    "https://wordle-answers-solutions.p.rapidapi.com/answers",
    options
  );
  let data = await prom.json();
  let selectRandom = Math.floor(Math.random() * 600);
  // console.log(data.data[selectRandom].answer);
  todaysWord = data.data[selectRandom].answer;
  // wordSet.innerText = todaysWord;
}

// console.log(todaysWord);

function drawMainGrid() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      let div = document.createElement("div");
      div.id = `${i}${j}`;
      div.classList.add("gridItem");
      gridContainer.append(div);
    }
  }
}

document.addEventListener("keydown", (event) => {
  let key = event.key;
//  console.log(key);
  if (key == "Enter") {
    if (colNum === 5) {
      const word = grid[rowNum].reduce((p, c) => p + c);
      // console.log(word);
        revealWord(word.toUpperCase());
        rowNum++;
        colNum = 0;
      }
      
  }
  if (key === "Backspace") {
    // console.log('came here');
    // removeLetter();
    if(colNum > 0){
      grid[rowNum][colNum-1] = '';
      colNum--;
    }
  }

  if (key.length ===1 && key.match(/[a-z]/i)) {
    // addLetter();
    if(colNum < 5){
      grid[rowNum][colNum]=key;
      colNum++;
    }
  }

  for(let i = 0;i<grid.length;i++){
    for(let j = 0;j<grid[i].length;j++){
      let = box = document.getElementById(`${i}${j}`);
      box.textContent = grid[i][j].toUpperCase();
    }
  }
});


function revealWord(guess){
  const row = rowNum;
  // console.log(todaysWord);
  // console.log(guess);
  for(let i=0;i<5;i++){
    const box = document.getElementById(`${row}${i}`);
    const letter = box.textContent;
    if(letter === todaysWord[i] ){
      box.classList.add('right')
    }else if(todaysWord.includes(letter)){
      box.classList.add('wrong');
    }else{
      box.classList.add('empty');
    }
  }

  setTimeout(()=>{
    const isWinner = todaysWord === guess;
    const isGameOver = rowNum > 5;

  if(isWinner){
    alert('Congratulations');
    window.location.reload(true);
  }else if(isGameOver){
    // console.log(rowNum);
    alert(`better luck next time. the word was ${todaysWord}`);
    window.location.reload(true);
  }
  
  },200)
  
}

