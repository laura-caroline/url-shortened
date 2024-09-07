export const generateRandomLetters = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result += letters[randomIndex];
  }

  return result;
};
