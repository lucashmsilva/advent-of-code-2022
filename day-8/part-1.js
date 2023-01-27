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
  let visibleCount = 0;
  for await (const line of grid) {
    treeMap.push(line.split(''));
  }

  visibleCount = ((treeMap.length * 2) + (treeMap[0].length * 2)) - 4;
  for (let i = 1; i < treeMap.length - 1; i++) {
    const line = treeMap[i];
    for (let j = 1; j < line.length - 1; j++) {
      if (checkUp(i, j, treeMap)) {
        visibleCount++;
        continue;
      }

      if (checkDown(i, j, treeMap)) {
        visibleCount++;
        continue;
      }

      if (checkLeft(i, j, treeMap)) {
        visibleCount++;
        continue;
      }

      if (checkRight(i, j, treeMap)) {
        visibleCount++;
        continue;
      }
    }
  }

  console.log(visibleCount);
}

const checkUp = (treeX, treeY, treeMap) => {
  const treeHeight = treeMap[treeX][treeY];
  for (let i = treeX - 1; i >= 0; i--) {
    const neighborHeight = treeMap[i][treeY];
    if (neighborHeight >= treeHeight) {
      return false;
    }
  }

  return true;
};

const checkDown = (treeX, treeY, treeMap) => {
  const treeHeight = treeMap[treeX][treeY];
  for (let i = treeX + 1; i < treeMap.length; i++) {
    const neighborHeight = treeMap[i][treeY];
    if (neighborHeight >= treeHeight) {
      return false;
    }
  }

  return true;
};

const checkLeft = (treeX, treeY, treeMap) => {
  const treeHeight = treeMap[treeX][treeY];
  for (let i = treeY - 1; i >= 0; i--) {
    const neighborHeight = treeMap[treeX][i];
    if (neighborHeight >= treeHeight) {
      return false;
    }
  }

  return true;
};

const checkRight = (treeX, treeY, treeMap) => {
  const treeHeight = treeMap[treeX][treeY];
  for (let i = treeY + 1; i < treeMap[0].length; i++) {
    const neighborHeight = treeMap[treeX][i];
    if (neighborHeight >= treeHeight) {
      return false;
    }
  }

  return true;
};

main();