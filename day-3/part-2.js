// problem https://adventofcode.com/2022/day/4

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');

  const runsacks = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  let priorities = {};
  let priorityValue = 1;
  for (let i = 97; i < 123; i++) {
    let letter = String.fromCharCode(i);
    priorities[letter] = priorityValue++;
  }
  for (let i = 65; i < 91; i++) {
    let letter = String.fromCharCode(i);
    priorities[letter] = priorityValue++;
  }
  
  let prioritySum = 0;
  let sharedType = '';
  let groupCount = 0;
  let groupRunsacks = [];
  for await (const runsack of runsacks) {
    let items = runsack.split('');

    if (groupCount < 3) {
      groupRunsacks.push(new Set(items));
      groupCount++;

      continue;
    }
    
    let intersection = intersectGroupRunsacks(groupRunsacks);
    sharedType = [...intersection].pop();
    prioritySum += priorities[sharedType];

    sharedType = '';
    groupCount = 1;
    groupRunsacks = [];
    groupRunsacks.push(new Set(items));
  }

  let intersection = intersectGroupRunsacks(groupRunsacks);
  sharedType = [...intersection].pop();
  prioritySum += priorities[sharedType];

  console.log(prioritySum);
}

const intersectGroupRunsacks = (groupRunsacks) => {
  let [elf1Runsack, elf2Runsack, elf3Runsack] = groupRunsacks;
  let intersect = new Set([...elf1Runsack].filter(i => elf2Runsack.has(i)));

  return new Set([...intersect].filter(i => elf3Runsack.has(i)));
};

main();