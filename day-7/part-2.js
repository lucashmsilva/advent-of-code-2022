// problem https://adventofcode.com/2022/day/7

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');

  const commandList = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  const AVAILABLE_SPACE = 70000000;
  const UPDATE_SIZE = 30000000;

  let sizes = { '/': 0 };
  let pwd = [];
  for await (const command of commandList) {
    if (command === '$ ls' || command.startsWith('dir')) {
      continue;
    }

    if (command === '$ cd ..') {
      let currDirPath = pwd.join('/');
      pwd.pop();
      let prevDirPath = pwd.join('/');

      if (!sizes[prevDirPath]) {
        sizes[prevDirPath] = 0;
      }

      sizes[prevDirPath] += sizes[currDirPath];

      continue;
    }

    if (command.startsWith('$ cd')) {
      let [, , currDirName] = command.split(' ');
      pwd.push(currDirName);

      continue;
    }

    if (command.match(/[0-9]+ .+/g)) {
      let [size,] = command.split(' ');
      let currDirPath = pwd.join('/');

      let sizeAsNumber = Number(size).valueOf();

      if (!sizes[currDirPath]) {
        sizes[currDirPath] = 0;
      }

      sizes[currDirPath] += sizeAsNumber;

      continue;
    }
  }

  // walks back to /
  while (pwd.length > 1) {
    let leftOverDir = pwd.join('/');

    if (sizes[leftOverDir]) { // avoids the edge case where a dir only has a single subdir and does't have a a precalculated size
      sizes['/'] += sizes[leftOverDir];
    }

    pwd.pop();
  }

  const freeSpace = AVAILABLE_SPACE - sizes['/'];
  const neededSpace = UPDATE_SIZE - freeSpace;

  let sizeOfDirToDelete = Object.entries(sizes)
    .map(([, size]) => size)
    .sort((a, b) => a - b)
    .find(a => a >= neededSpace);

  console.log(sizeOfDirToDelete);
}

main();


