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
});

test('should handle single week intervals', () => {
  expect(overlappingWeeks(['1', '3', '5'], ['2', '4', '6'])).toEqual([]);
  expect(overlappingWeeks(['1', '2', '3'], ['1', '2', '3'])).toEqual([
    '1',
    '2',
    '3',
  ]);
});

test('should handle empty lists', () => {
  expect(overlappingWeeks([], ['1-2', '3-4', '5-6'])).toEqual([]);
  expect(overlappingWeeks(['1-2', '3-4', '5-6'], [])).toEqual([]);
  expect(overlappingWeeks([], [])).toEqual([]);
});

//   it('should handle empty lists', () => {
//     expect(overlappingWeeks([], ['1-2', '3-4', '5-6'])).toEqual([]);
//     expect(overlappingWeeks(['1-2', '3-4', '5-6'], [])).toEqual([]);
//     expect(overlappingWeeks([], [])).toEqual([]);
//   });
// });
