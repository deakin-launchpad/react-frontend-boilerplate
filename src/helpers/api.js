import { AccessToken, logout } from 'contexts/helpers'
import { notify } from 'components'
import { axiosInstance } from './index';
/**
 *  @errorHelper :  Function to return error StatusText.
 */
const errorHelper = (error) => {
  if (error.response === undefined) {
    notify("Network Error");
    return false;
  }
  if (error.response.data.message !== "") {
    notify(error.response.data.message);
    return false;
  }
  if (error.response.statusCode === 401) {
    notify("You may have been logged out");
    logout();
    return false;
  }
  if (error.response.statusText !== "") {
    notify(error.response.statusText);
    return false;
  }
}
class API {
  displayAccessToken = () => {
    console.log(AccessToken)
  }

  login = (data, callback) => {
    axiosInstance.post('login', data).then(response => {
      return callback(true)
    }).catch(error => {
      errorHelper(error)
    })
  }

  logoutUser = (callback) => {
    logout()
    if (typeof callback === "function") {
      callback()
    }
  }
}
const instance = new API();
export default instance;
