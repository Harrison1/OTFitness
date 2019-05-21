import capitizeFirstLetter from "../src/components/utils/capfl"

test('capitilze first letter', () => {
  expect(capitizeFirstLetter('harrison')).toBe('Harrison');
});

test('capitilze first letter', () => {
  expect(capitizeFirstLetter(undefined)).toBe('');
});

test('capitilze first letter', () => {
  expect(capitizeFirstLetter(null)).toBe('');
});
