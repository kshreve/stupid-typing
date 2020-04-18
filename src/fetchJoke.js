import randomWord from './randomWord'

export const getJoke = () => {
  const query = randomWord();
  return fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
    .then((response) => {
      return response.json();
    })
    .then(({ result }) => {
      return result[0].value;
    });
}
