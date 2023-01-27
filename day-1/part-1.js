// problem https://adventofcode.com/2022/day/1

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');
  let currStashSum = 0;
  let stashesSums = [];

  const inventories = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  for await (const calorie of inventories) {
    if (calorie === '') {
      stashesSums.push(currStashSum);
      currStashSum = 0;
    }

    currStashSum += Number(calorie).valueOf();
  }

  stashesSums.sort((stashA, stashB) => {
    if (stashA > stashB) {
      return 1;
    }

    if (stashA < stashB) {
      return -1;
    }

    return 0;
  });

  console.log(stashesSums);
}

main();