const assignPortions = (ratios, total) => {
  console.log("=============================================");
  let finalRatios = {};
  if (ratios && total > -1) {
    console.log("total", total, "ratios", ratios);
    finalRatios = { wow: "wow" };
  }
  return finalRatios;
};

const runTests = (func, equals, inputs, outputs) =>
  inputs.some((x, i) => equals(func(...x), outputs[i]));

const objectEquals = (x, y) =>
  !(x instanceof Object) || !(y instanceof Object)
    ? x === y
    : Object.keys(y).every(i => Object.keys(x).indexOf(i) !== -1) &&
      Object.keys(x).every(i => objectEquals(x[i], y[i]));

console.log(
  "All tests passed:",
  runTests(
    assignPortions,
    (a, b) => {
      let equal = objectEquals(a, b);
      console.log(a, b, equal);
      return equal;
    },
    [
      [{ 1: 1, 2: 1, 3: 1 }, 120],
      [{ 1: 1, 2: 2 }, 120],
      [{ 1: 1, 2: 2 }, 0],
      [{ 1: 1, 2: 1, 3: 1 }, 12],
      [{ 1: 2, 2: 3 }, 3],
      [{ 1: 1, 2: 1, 3: 1 }, 11],
      [{}, 1],
      [{ 1: 1 }, 2],
      [{ 1: 1 }, 0],
      [{ 1: 1, 2: 1, 3: 1 }, 11],
      [{ 1: 10, 2: 0 }, 2],
      [{ 1: 2, 2: 4, 3: 4, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2 }, 12],
      [{ 1: 1, 2: 2, 3: 2, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 }, 12]
    ],
    [
      { 1: 40, 2: 40, 3: 40 },
      { 1: 40, 2: 80 },
      { 1: 0, 2: 0 },
      { 1: 4, 2: 4, 3: 4 },
      { 1: 1, 2: 2 },
      { 1: 4, 2: 4, 3: 3 },
      {},
      { 1: 2 },
      { 1: 0 },
      { 1: 4, 2: 4, 3: 3 },
      { 1: 2, 2: 0 },
      { 1: 1, 2: 3, 3: 3, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 },
      { 1: 1, 2: 3, 3: 3, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 }
    ]
  )
);
