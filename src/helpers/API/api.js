import { AccessToken, logout } from 'contexts/helpers';
import { axiosInstance, errorHelper, generateSuccess } from './axiosInstance';

class API {
  displayAccessToken() {
    console.log(AccessToken);
  }

  /**
   * @author Sanchit Dang
   * @description Login API endpoint
   * @param {Object} loginDetails Login details for the user
   * @returns {Object} responseObject
   */
  login(loginDetails) {
    return axiosInstance.post('admin/login', loginDetails).then(response => {
      return generateSuccess(response.data.data.accessToken);
    }).catch(error => errorHelper(error, "login"));
  }

  getUserRole() {
    return axiosInstance.post('accessTokenLogin', {}, {
      headers: {
        authorization: "Bearer " + AccessToken
      }
    }).then((response) => generateSuccess(response.data.data)).catch(error => errorHelper(error));
  }

  /**
  * @author Sanchit Dang
  * @description AccessToken Login API endpoint
  * @returns {Object} responseObject
  */
  accessTokenLogin() {
    return axiosInstance.post('accessTokenLogin', {}, {
      headers: {
        authorization: "Bearer " + AccessToken
      }
    }).then(() => generateSuccess(AccessToken)).catch(error => errorHelper(error));
  }


  /**
  * @author Sanchit Dang
  * @description logoutUser Login API endpoint
  * @returns {Promise<Object>} responseObject
  */
  async logoutUser() {
    return axiosInstance.put('logout', {}, {
      headers: {
        authorization: "Bearer " + AccessToken
      }
    }).then(() => {
      logout();
      return generateSuccess(true);
    }).catch(error => errorHelper(error));
  }

  /**
   * @author Sanchit Dang
   * @param {Object} data 
   * @param {String} data.ssoToken 
   * @param {Object} data.deviceData 
   * @param {String} data.deviceData.deviceName
   * @param {String} data.deviceData.deviceType
   * @param {String} data.deviceData.deviceUUID
   * @returns {Promise<Object>}
   */
  async authenticateSSO(data) {
    return axiosInstance.post(`sso/auth/validate`, data)
      .then((response) => generateSuccess(response.data.data))
      .catch(error => errorHelper(error));
  }

  /**
   * 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  async register(data) {
    return axiosInstance.post(`register`, data)
      .then((response) => generateSuccess(response.data.data))
      .catch(error => errorHelper(error));
  }

  getUsers() {
    return axiosInstance
      .get("admin/getUser", {
        headers: {
          authorization: "Bearer " + AccessToken,
        },
      })
      .then((response) => {
        return generateSuccess(response.data.data);
      })
      .catch((error) => errorHelper(error));
  }
}
const instance = new API();
export default instance;
