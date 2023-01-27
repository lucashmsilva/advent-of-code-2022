// problem https://adventofcode.com/2022/day/5

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');

  const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  let stacks = [];
  for await (const line of lines) {
    if (line.match(/([A-Z]| {4})/g)) {
      stacks = handleStack(line, stacks);
    }

    else if (line.match(/move.*/g)) {
      stacks = handleMoves(line, stacks);
    }

    else if (line.match(/ [1-9] /g)) {
      continue;
    }

    else if (line === '') {
      stacks = stacks.map(stack => stack.reverse());
      continue;
    }
  }

  console.log(stacks.map(stack => stack.pop()).join(''));
}

const handleStack = (line, stacks) => {
  const stackLine = line.match(/([A-Z]| {4})/g);

  for (let i = 0; i < stackLine.length; i++) {
    const crate = stackLine[i];

    if (!stacks[i]) {
      stacks[i] = [];
    }
    
    if (crate !== '    ') {
      stacks[i].push(crate);
    }
  }

  return stacks;
};

const handleMoves = (line, stacks) => {
  let [ammountToMove, origin, destination] = line.match(/ *\d+ */g).map(a => Number(a.trim()).valueOf());
  origin--;
  destination--;

  stacks[destination] = [...stacks[destination], ...stacks[origin].splice(-ammountToMove).reverse()]

  return stacks;
};

main();
