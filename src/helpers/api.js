import { AccessToken } from 'contexts/helpers'

export default class API {
  displayAccessToken = () => {
    console.log(AccessToken)
  }

  login = (data, callback) => {
    if (data)
      callback(true)
  }
}
