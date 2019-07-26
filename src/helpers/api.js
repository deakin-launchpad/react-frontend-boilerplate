import { AccessToken } from 'contexts/helpers'

class API {
  displayAccessToken = () => {
    console.log(AccessToken)
  }

  login = (data, callback) => {
    console.log(data)
    if (data)
      return callback(true)
  }
}
const instance = new API();
export default instance;
