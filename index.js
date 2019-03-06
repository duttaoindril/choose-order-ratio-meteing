// Core method that assigns portions based on availability and order
const assignPortions = (ratios, total) => {
  let finalRatios = {};
  let assignedRemainders = {};
  let totalLeft = total;
  const ratioTotal = Object.values(ratios).reduce((a, b) => a + b, 0);
  if (ratioTotal !== 0 || total > 0) {
    finalRatios = Object.entries(ratios).reduce((acc, [label, ratio]) => {
      let [assignable, remainder] = getQuotientRemainder(
        ratio,
        ratioTotal,
        total
      );
      if (totalLeft - assignable < 0) assignable--;
      totalLeft -= assignable;
      acc[label] = assignable;
      assignedRemainders[label] = remainder;
      return acc;
    }, finalRatios);
    if (totalLeft > 0)
      finalRatios = orderEntries(assignedRemainders).reduce((acc, [label]) => {
        if (totalLeft === 0) return acc;
        totalLeft -= 1;
        acc[label] += 1;
        return acc;
      }, finalRatios);
  }
  return finalRatios;
};

// Method that returns a floored quotient, and it's remainder
const getQuotientRemainder = (ratio, ratioTotal, total) => [
  Math.floor((ratio * total) / ratioTotal),
  (ratio * total) / ratioTotal - Math.floor((ratio * total) / ratioTotal)
];

// Method that orders a list of id and ratio entries by ratio desc and then label asc
const orderEntries = ratios =>
  Object.entries(ratios).sort(([label1, ratio1], [label2, ratio2]) =>
    ratio2 - ratio1 !== 0
      ? ratio2 - ratio1
      : parseInt(label1) - parseInt(label2)
  );

// Method that can run tests based on ordered inputs and outputs, and checks for equality
const runTests = (func, equals, inputs, outputs) =>
  inputs.every((x, i) => equals(func(...x), outputs[i]));

// Method that recursively checks if an object of primiives is equal to another; I know some cases aren't accounted for, such as arrays and more, but for this usecase in testing it's fine.
const objectEquals = (x, y) =>
  !(x instanceof Object) || !(y instanceof Object)
    ? x === y
    : Object.keys(y).every(i => Object.keys(x).indexOf(i) !== -1) &&
      Object.keys(x).every(i => objectEquals(x[i], y[i]));

// Runs tests on assignPortions, with ordered inputs and their corresponding outputs
console.log(
  "All tests passed:",
  runTests(
    assignPortions,
    objectEquals,
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
      [{ 1: 1, 2: 2, 3: 2, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 }, 12],
      [{ 1: 5, 2: 7, 3: 11 }, 22],
      [{ 1: 0, 2: 1, 3: 7 }, 5],
      [{ 1: 11, 2: 13, 3: 17 }, 39]
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
      { 1: 1, 2: 3, 3: 3, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1 },
      { 1: 5, 2: 7, 3: 10 },
      { 1: 0, 2: 1, 3: 4 },
      { 1: 11, 2: 12, 3: 16 }
    ]
  )
);
