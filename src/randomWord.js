const randomWords = ["plates", "snake", "quiet", "caught", "battle", "fly",
  "dog", "tales", "toy", "when", "key", "necessary",
  "bite", "danger", "dull", "lonely", "whole", "build",
  "wolf", "note", "return", "example", "year", "base",
  "well", "tiny", "company", "point", "result", "thee",
  "himself", "entire", "chosen", "wife", "white", "pan",
  "outline", "least", "first", "apple", "bag", "wool"];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default () => {
  return randomWords[getRandomInt(randomWords.length)];
}
