import capitizeFirstLetter from "../src/components/utils/capfl"

test('capitilze first letter', () => {
  expect(capitizeFirstLetter('harrison')).toBe('Harrison');
});

test('should return an empty string', () => {
  expect(capitizeFirstLetter(undefined)).toBe('');
});

test('should return an empty string', () => {
  expect(capitizeFirstLetter(null)).toBe('');
});
