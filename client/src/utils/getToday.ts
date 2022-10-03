const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const date = new Date().getDate();

export const getToday = () => {
  return `${year}-${month >= 10 ? month : '0' + month}-${
    date >= 10 ? date : '0' + date
  }`;
};
