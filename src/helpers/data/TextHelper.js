import moment from "moment-timezone";

class TextHelper {
  /**
   * @author Sanchit Dang
   * @param {String} str String to Translate 
   * @returns {String} Sentencecased String
   */
  sentenceCase(str) {
    str = String(str);
    str = str.toLowerCase();
    return str.replace(/[a-z]/i, (letter) => letter.toUpperCase()).trim();
  }

  /**
   * @author Sanchit Dang
   * @param {String} time 
   * @returns {String} Titlecased String
   */
  titleCase(str) {
    str = String(str);
    str = str.toLowerCase().split(" ");
    let final = [];
    for (let word of str) {
      final.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    return final.join(" ");
  }

  /**
   * @author Sanchit Dang
   * @param {String} time 
   * @returns {Date} Formatted Date
   */
  formatTime(time) {
    let newTime = new Date(time);
    return typeof newTime === "object" ? newTime.toLocaleDateString("en-US") : newTime;
  }

  /**
  * @author Sanchit Dang
  * @param {String} email Email Id
  * @returns {Boolean} isEmailValid
  */
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * 
   * @param {Date} date Date to be formatted
   * @returns {String} Formatted date
   */
  formatToD_MMMM_YYYY(date) {
    return moment(date).format("D MMMM YYYY");
  }
}

const instance = new TextHelper();
export default instance;
