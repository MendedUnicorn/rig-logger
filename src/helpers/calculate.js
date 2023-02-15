// 1. iterate over array
// 2. if not exist create new key with val 1
// 3. if excist add 1 to the value
// 4. return obj

const testData = [
  'd',
  'd',
  'a',
  'b',
  'a',
  'b',
  'a',
  'a',
  'b',
  'b',
  'c',
  'a',
  'b',
  'b',
  'b',

  'b',
  'b',
  'b',

  'b',
  'b',
  'b',
  'd',
  'e',
  'f',
  'd',
  'e',
  'f',
  'g',
  'e',
  'f',
  'd',
  'e',
  'f',
  'e',
  'f',
  'd',
  'e',
  'e',
  'd',
  'e',
  'e',
  'f',
  'd',
  'e',
  'f',
  'd',
  'e',
  'f',
  'g',
  'e',
  'f',
  'e',
  'f',
  'd',
  'e',
  'e',
  'd',
  'e',
  'e',
  'f',
  'd',
  'e',
  'f',
  'd',
  'e',
  'f',
  'g',
  'e',
  'f',
  'e',
  'f',
  'd',
  'e',
  'e',
  'd',
  'e',
  'e',
  'f',
  'd',
  'e',
  'f',
  'd',
  'e',
  'f',
  'g',
];
// returns object with occurences counted
export const countEachOccurence = (arr) => {
  const obj = {};
  arr.forEach((el) => {
    if (obj[el]) {
      obj[el]++;
    } else {
      obj[el] = 1;
    }
  });
  return obj;
};

//if x is positive return top x (in terms of count), if negative x return bottom x
export const findTopBottomX = (obj, x) => {
  let res;
  if (x > 0) {
    const sortable = Object.entries(obj).sort(([, a], [, b]) => b - a);
    return sortable.slice(0, x);
  } else {
    const sortable = Object.entries(obj).sort(([, a], [, b]) => a - b);
    return sortable.slice(0, -x);
  }
};

const findMax = (obj) => {
  let biggest = { '': null };
  for (let a in obj) {
    if (obj[a] > Object.values(biggest)[0]) {
      biggest = { [a]: obj[a] };
    }
  }
  return biggest;
};

// console.log(countEachOccurence(testData));
// console.log(findMax(countEachOccurence(testData)));
//console.log(Object.values(countEachOccurence(testData))[0]);
console.log(findTopBottomX(countEachOccurence(testData), 4));
