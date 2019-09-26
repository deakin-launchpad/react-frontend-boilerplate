class TextHelper {
  sentenceCase = str => {
    str = String(str)
    str = str.toLowerCase()
    return str.replace(/[a-z]/i, function (letter) {

      return letter.toUpperCase();

    }).trim();
  }

  titleCase = (str) => {
    str = String(str)
    str = str.toLowerCase().split(' ');
    let final = [];
    for (let word of str) {
      final.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    return final.join(' ')
  }
}

const instance = new TextHelper();
export default instance;
