// problem https://adventofcode.com/2022/day/8

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');

  const grid = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  let treeMap = [];
  let senicScores = [];
  for await (const line of grid) {
    treeMap.push(line.split(''));
  }

  visibleCount = ((treeMap.length * 2) + (treeMap[0].length * 2)) - 4;
  for (let i = 1; i < treeMap.length - 1; i++) {
    const line = treeMap[i];
    for (let j = 1; j < line.length - 1; j++) {
      const [
        viewDistanceFromUp,
        viewDistanceFromDown,
        viewDistanceFromLeft,
        viewDistanceFromRight
      ] = [
        checkUp(i, j, treeMap),
        checkDown(i, j, treeMap),
        checkLeft(i, j, treeMap),
        checkRight(i, j, treeMap)
      ];

      let currentTreeScore = viewDistanceFromUp * viewDistanceFromDown * viewDistanceFromLeft * viewDistanceFromRight;
      if (currentTreeScore > 0) {
        senicScores.push(currentTreeScore);
      }
    }
  }

  console.log(senicScores.sort((a, b) => a - b).pop());
}

const checkUp = (treeX, treeY, treeMap) => {
  let senicScore = 0;
  const treeHeight = treeMap[treeX][treeY];
  for (let i = treeX - 1; i >= 0; i--) {
    const neighborHeight = treeMap[i][treeY];
    if (neighborHeight >= treeHeight) {
      senicScore++
      break;
    }
    senicScore++
  }

  return senicScore;
};

const checkDown = (treeX, treeY, treeMap) => {
  let senicScore = 0;
  const treeHeight = treeMap[treeX][treeY];
  for (let i = treeX + 1; i < treeMap.length; i++) {
    const neighborHeight = treeMap[i][treeY];
    if (neighborHeight >= treeHeight) {
      senicScore++
      break;
    }
    senicScore++
  }

  return senicScore;
};

const checkLeft = (treeX, treeY, treeMap) => {
  let senicScore = 0;
  const treeHeight = treeMap[treeX][treeY];
  for (let i = treeY - 1; i >= 0; i--) {
    const neighborHeight = treeMap[treeX][i];
    if (neighborHeight >= treeHeight) {
      senicScore++
      break;
    }
    senicScore++
  }

  return senicScore;
};

const checkRight = (treeX, treeY, treeMap) => {
  let senicScore = 0;
  const treeHeight = treeMap[treeX][treeY];
  for (let i = treeY + 1; i < treeMap[0].length; i++) {
    const neighborHeight = treeMap[treeX][i];
    if (neighborHeight >= treeHeight) {
      senicScore++
      break;
    }
    senicScore++
  }

  return senicScore;
};

main();