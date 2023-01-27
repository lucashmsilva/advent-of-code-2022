// problem https://adventofcode.com/2022/day/2

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');
  const playScore = {
    X: 1, // rock
    Y: 2, // paper
    Z: 3  // scissors
  };
  const outcomes = {
    AX: 3,
    AY: 6,
    AZ: 0,
    BX: 0,
    BY: 3,
    BZ: 6,
    CX: 6,
    CY: 0,
    CZ: 3
  };
  
  let score = 0;

  const matches = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  for await (const match of matches) {
    let [oponnentPlay, myPlay] = match.split(' ');
    let combinnedPlays = `${oponnentPlay}${myPlay}`;
    
    score += playScore[myPlay] + outcomes[combinnedPlays];
  }

  console.log(score);
}

main();