import moment from "moment";

export const setDays = (period) => {
  const daysOfPeriod = [];
  const x = period === "week" ? 7 : 30;
  for (let i = 0; i < x; i++) {
    daysOfPeriod.push(moment().subtract(i, "days").format("DD.MM.YYYY"));
  }
  return daysOfPeriod.reverse();
};

export const startDateOfPeriod = (period) => {
  const x = period === "week" ? 7 : 30;
  return Date.parse(moment().subtract(x, "days")._d);
};

export const getColors = (idx, colors) => {
  const arr = [];
  for (let i = 0; i < idx / 3; i++) {
    arr.push(colors[0]);
    arr.push(colors[1]);
    arr.push(colors[2]);
  }
  return arr;
};

export const getKeys = (obj) => {
  return Object.keys(obj);
};

export const getValues = (obj) => {
  return Object.values(obj);
};

export const byField = (field, up) => {
  return up
    ? (a, b) => (a[field] < b[field] ? 1 : -1)
    : (a, b) => (a[field] > b[field] ? 1 : -1);
};
