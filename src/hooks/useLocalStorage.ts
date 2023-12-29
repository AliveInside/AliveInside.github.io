export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.log("error in useLocalStorage setItem");
    }
  };

  const getItem = (value: unknown) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch {
      console.log("error in useLocalStorage getItem");
    }
  };
  return { setItem, getItem };
};
