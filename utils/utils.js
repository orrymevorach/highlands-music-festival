import {
  mapDayToSuffix,
  mapIndexToMonth,
} from 'components/checkout/checkout-utils';

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
