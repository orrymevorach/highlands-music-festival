import {
  mapDayToSuffix,
  mapIndexToMonth,
} from 'components/CheckoutPage/checkout-utils';

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const amountToDollar = price => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(price);
};

export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export const formatFestivalDate = ({ startDate, endDate }) => {
  const year = new Date(startDate).getFullYear();

  const startDay = new Date(startDate).getDate();
  const startDaySuffix = mapDayToSuffix[startDay];
  const formattedStartDay = `${startDay}${startDaySuffix}`;

  const endDay = new Date(endDate).getDate();
  const endDaySuffix = mapDayToSuffix[endDay];
  const formattedEndDay = `${endDay}${endDaySuffix}`;

  const startMonthIndex = new Date(startDate).getMonth() + 1;
  const startMonth = mapIndexToMonth[startMonthIndex];
  const endMonthIndex = new Date(endDate).getMonth() + 1;
  const endMonth = mapIndexToMonth[endMonthIndex];

  const fullDate = `${startMonth} ${formattedStartDay} - ${
    endMonth === startMonth ? '' : `${endMonth} `
  }${formattedEndDay}, ${year}`;

  return fullDate;
};

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getInstagramHandle = link => {
  return link.replace('https://www.instagram.com/', '@').replace('/', '');
};

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getActiveYears() {
  const startYear = 2022; // The year the event started (this is the 4th year)
  const currentYear = new Date().getFullYear(); // Get the current year

  const yearsActive = currentYear - startYear + 1; // Adding 1 because the start year counts as the first year
  return yearsActive;
}
