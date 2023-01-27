// problem https://adventofcode.com/2022/day/4

const fs = require('fs');
const readline = require('readline');

const main = async () => {
  const inputStream = fs.createReadStream('./input.txt');

  const pairs = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  let overlappingRangesCount = 0;
  for await (const pair of pairs) {
    let [elf1Range, elf2Range] = pair.split(',');
    let [elf1RangeStart, elf1RangeEnd] = elf1Range.split('-').map(e => Number(e).valueOf());
    let [elf2RangeStart, elf2RangeEnd] = elf2Range.split('-').map(e => Number(e).valueOf());

    if (elf1RangeStart <= elf2RangeStart && elf1RangeEnd >= elf2RangeEnd) {
      overlappingRangesCount++;
      continue;
    } 

    if (elf1RangeStart >= elf2RangeStart && elf1RangeEnd <= elf2RangeEnd) {
      overlappingRangesCount++;
      continue;
    }

    if (elf1RangeStart <= elf2RangeEnd && elf2RangeEnd <= elf1RangeEnd) {
      overlappingRangesCount++;
      continue;
    }

    if (elf1RangeStart <= elf2RangeStart && elf2RangeStart <= elf1RangeEnd) {
      overlappingRangesCount++;
      continue;
    }
  }

  console.log(overlappingRangesCount);
}

main();