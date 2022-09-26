export const getLocalStorage = (key: string) => {
  try {
    const jwtToken = JSON.parse(localStorage.getItem(key) as string);
    return jwtToken;
  } catch (error) {
    return '';
  }
};

export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
