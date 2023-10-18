export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const amountToDollar = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
