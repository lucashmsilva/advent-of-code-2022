// problem https://adventofcode.com/2022/day/4

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');

  const runcksacks = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  let priorities = {};
  let priorityValue = 1;
  let prioritySum = 0;
  for (let i = 97; i < 123; i++) {
    let letter = String.fromCharCode(i);
    priorities[letter] = priorityValue++;
  }
  for (let i = 65; i < 91; i++) {
    let letter = String.fromCharCode(i);
    priorities[letter] = priorityValue++;
  }

  for await (const rucksack of runcksacks) {
    let sharedType = '';
    let items = rucksack.split('');

    const halfwayThrough = Math.floor(items.length / 2)
    const compartment1Items = items.slice(0, halfwayThrough);
    const compartment2Items = items.slice(halfwayThrough, items.length);

    const compartment1Set = new Set(compartment1Items);

    compartment2Items.forEach(item => {
      if (compartment1Set.has(item)) {
        sharedType = item;
        return;
      }
    });

    prioritySum += priorities[sharedType];
  }

  console.log(prioritySum);
}

main();