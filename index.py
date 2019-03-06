# Core method that assigns portions based on availability and order
def assignPortions(ratios, total):
  finalRatios = {}
  assignedRemainders = {}
  totalLeft = total
  ratioTotal = sum(ratios.values()) # Get ratio total (sum of all ratios) to divide by later
  if ratioTotal != 0 or total > 0: # Valid ratio or total object to iterate over
    for label, ratio in ratios.items():
      assignable, remainder = getQuotientReminder(ratio, ratioTotal, total) # Get alloted assignable food with no remainder
      if totalLeft - assignable < 0: # If there's not enough food, accomodate
        assignable -= 1;
      totalLeft -= assignable # Update total food left
      finalRatios[label] = assignable # Save assigned count
      assignedRemainders[label] = remainder  # Save assigned remainder
    if totalLeft > 0: # If food is still left over...
      for label, ratio in orderEntries(assignedRemainders): # Prioritize by highest ratio and then lowest id
        if totalLeft == 0:
          break;
        totalLeft -= 1 # Use one food for 
        finalRatios[label] += 1
  return finalRatios;

# Method that returns a floored quotient, and it's remainder
def getQuotientReminder(ratio, ratioTotal, total):
  dividend = float(ratio * total);
  divisor = float(ratioTotal);
  quotient = dividend//divisor;
  return [int(quotient), dividend/divisor - quotient];

# Method that orders a list of id and ratio entries by ratio desc and then label asc
def orderEntries(ratios):
  return sorted(ratios.items(), key = lambda x:(-x[1], int(x[0])));

# Method that can run tests based on ordered inputs and outputs using a passed in function and equality checker
def runTests(func, equals, inputs, outputs):
  for i, input in enumerate(inputs):
    if not equals(func(*input), outputs[i]):
      return False;
  return True;

# Method that checks if dicts are equal or not by creating a diff of the differences
def objectEquals(a, b):
  return len([(k, a[k], b[k]) for k in a if k in b and a[k] != b[k]]) == 0;

# Runs tests on assignPortions, with ordered inputs and their corresponding outputs
print(
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