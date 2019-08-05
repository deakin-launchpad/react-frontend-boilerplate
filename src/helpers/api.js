import { AccessToken } from 'contexts/helpers'
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
}
const instance = new API();
export default instance;
