// problem https://adventofcode.com/2022/day/9

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');

  const motions = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  let uniqueTPositions = new Set();
  let [ tX, tY ] = [ 0, 0 ];
  let [ hX, hY ] = [ 0, 0 ];
  for await (const command of motions) {
    let [direction, steps] = command.split(' ');
    let visedPostionsByT = [];

    switch (direction) {
      case 'U':
        [tX, tY, hX, hY, visedPostionsByT] = moveUp(tX, tY, hX, hY, steps);
        break;
      
      case 'D':
        [tX, tY, hX, hY, visedPostionsByT] = moveDown(tX, tY, hX, hY, steps);
        break;
      
      case 'L':
        [tX, tY, hX, hY, visedPostionsByT] = moveLeft(tX, tY, hX, hY, steps);
        break;
      
        case 'R':
        [tX, tY, hX, hY, visedPostionsByT] = moveRight(tX, tY, hX, hY, steps);
        break;

      default:
        break;
    }

    uniqueTPositions.add(visedPostionsByT.map(p => p.join('-')));
  }

  console.log(uniqueTPositions.size);
}

const moveUp = (tX, tY, hX, hY, stepsToMove) => {
  let visedPostionsByT = [];
  for (let i = 0; i < stepsToMove; i++) {
    const element = array[i];
    
  }
  return [tX, tY, hX, hY, visedPostionsByT];
};

const moveDown = (tX, tY, hX, hY, stepsToMove) => {
  return [tX, tY, hX, hY];
};

const moveLeft = (tX, tY, hX, hY, stepsToMove) => {
  return [tX, tY, hX, hY];
};

const moveRight = (tX, tY, hX, hY, stepsToMove) => {
  return [tX, tY, hX, hY];
};

main();