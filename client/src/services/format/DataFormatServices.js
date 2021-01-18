//Capitalize each word for display purpose
function capitalizeWords(words) {
  if(words) {
    const wordsArray = words.split(" ");
    const formattedWordsArray = wordsArray.map((word) => {
      if(word !== "and" && word !== "or" && word !== "for" && word !== "of" && word !== "at") {
        return word[0].toUpperCase() + word.substring(1);
      } else {
        return word;
      }
    }).join(" ");
    return formattedWordsArray;
  }
};

const DataFormatServices = {
  capitalizeWords
};

export default DataFormatServices;