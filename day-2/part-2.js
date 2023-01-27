// problem https://adventofcode.com/2022/day/2

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');
  const playScore = {
    rock: 1,
    paper: 2,
    scissors: 3
  };
  const outcomes = {
    Arock: 3,
    Apaper: 6,
    Ascissors: 0,
    Brock: 0,
    Bpaper: 3,
    Bscissors: 6,
    Crock: 6,
    Cpaper: 0,
    Cscissors: 3
  };
  const strategy = {
    X: { // losing plays
      A: 'scissors',
      B: 'rock',
      C: 'paper',
    },
    Y: { // draw plays
      A: 'rock',
      B: 'paper',
      C: 'scissors'
    },
    Z: { // winning plays
      A: 'paper',
      B: 'scissors',
      C: 'rock'
    }
  }
  let score = 0;

  const matches = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  for await (const match of matches) {
    let [oponnentPlay, result] = match.split(' ');
    let myPlay = strategy[result][oponnentPlay];
    let combinnedPlays = `${oponnentPlay}${myPlay}`;
    
    score += playScore[myPlay] + outcomes[combinnedPlays];
  }

  console.log(score);
}

main();