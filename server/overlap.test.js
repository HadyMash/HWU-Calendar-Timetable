import { overlappingWeeks } from './overlap.js';

test('should return overlapping weeks for given two lists', () => {
  expect(overlappingWeeks(['1-2', '4-6', '8'], ['1-5', '7-12'])).toEqual([
    '1-2',
    '4-5',
    '8',
  ]);
  expect(overlappingWeeks(['1-3', '5-7'], ['2-4', '6-8'])).toEqual([
    '2-3',
    '6-7',
  ]);
  expect(
    overlappingWeeks(['1-2', '3-4', '5-6'], ['2-3', '4-5', '6-7']),
  ).toEqual(['2', '3', '4', '5', '6']);
  expect(overlappingWeeks(['1-3', '5-7', '9-10'], ['1-12'])).toEqual([
    '1-3',
    '5-7',
    '9-10',
  ]);
  expect(overlappingWeeks(['1-3', '5-7', '9-10'], ['1-5', '7-12'])).toEqual([
    '1-3',
    '5',
    '7',
    '9-10',
  ]);
  expect(overlappingWeeks(['1-3', '5-7', '9-10'], ['1-6', '8-12'])).toEqual([
    '1-3',
    '5-6',
    '9-10',
  ]);
  expect(overlappingWeeks(['1-3', '5-7', '9-10'], ['1-6'])).toEqual([
    '1-3',
    '5-6',
  ]);
  expect(overlappingWeeks(['1-3', '5-7', '9-10'], ['7-12'])).toEqual([
    '7',
    '9-10',
  ]);
});

test('should handle single week intervals', () => {
  expect(overlappingWeeks(['1', '3', '5'], ['2', '4', '6'])).toEqual([]);
  expect(overlappingWeeks(['1', '2', '3'], ['1', '2', '3'])).toEqual([
    '1',
    '2',
    '3',
  ]);
});

test('should handle single week intervals with multiple weeks', () => {
  expect(overlappingWeeks(['1', '3', '5'], ['1-2', '4-6'])).toEqual(['1', '5']);
  expect(overlappingWeeks(['1', '2', '3'], ['1-3'])).toEqual(['1', '2', '3']);
  expect(overlappingWeeks(['1-3', '5', '7'], ['1-3', '5-7'])).toEqual([
    '1-3',
    '5',
    '7',
  ]);
});

test('should handle empty lists', () => {
  expect(overlappingWeeks([], ['1-2', '3-4', '5-6'])).toEqual([]);
  expect(overlappingWeeks(['1-2', '3-4', '5-6'], [])).toEqual([]);
  expect(overlappingWeeks([], [])).toEqual([]);
});

test('should handle no overlapping weeks', () => {
  expect(
    overlappingWeeks(['1-2', '3-4', '5-6'], ['7-8', '9-10', '11-12']),
  ).toEqual([]);
  expect(overlappingWeeks(['1', '5-8', '10'], ['2-4', '9', '11-12'])).toEqual(
    [],
  );
});
