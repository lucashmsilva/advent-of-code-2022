// problem https://adventofcode.com/2022/day/7

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');

  const commandList = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

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

  let savedSpace = 0;
  for (let [dir, size] of Object.entries(sizes)) {
    if (dir === '/') {
      continue;
    }

    if (size <= 100000) {
      savedSpace += size;
    }
  }

  console.log(savedSpace);
}

main();