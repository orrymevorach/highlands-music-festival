export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const amountToDollar = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});
