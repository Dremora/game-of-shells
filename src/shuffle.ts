/*
Based on https://github.com/Daplie/knuth-shuffle/blob/master/index.js
License: https://github.com/Daplie/knuth-shuffle/blob/master/LICENSE
*/

const shuffle = <T>(existingArray: T[]) => {
  const array = existingArray.slice();
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  let shuffled = false;
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    if (randomIndex !== currentIndex) {
      shuffled = true;
    }

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

    if (currentIndex === 0 && !shuffled) {
      currentIndex = array.length;
    }
  }

  return array;
};

export default shuffle;
