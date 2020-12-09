export const getFormattedDate = date => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return "" + month + "/" + day + "/" + year + " " + hour + ":" + minute;
};

export const getFormattedDateString = date => {
  const event = new Date(date);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return "" + month + "/" + day + "/" + year;
};

export const createRandomString = () => {
  return Math.random()
    .toString(36)
    .substr(2, 9);
};

export const upperCaseFirstLetter = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
