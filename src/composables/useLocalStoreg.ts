export function useLocalStoreg(key: Required<string>) {
  const setDataToLocalStoreg = (data: object) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const getDataFromLocalStoreg = () => {
    const data = localStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }
  };

  return { setDataToLocalStoreg, getDataFromLocalStoreg };
}
