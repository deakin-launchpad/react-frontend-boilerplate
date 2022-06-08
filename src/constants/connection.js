class Connection {
  constructor() {
    this.useAccessTokenVerificationAPI = true;
    this.socket = {
      "initSocket": false,
      "socketDefaultOptions": {},
      "accessTokenVerification": true
    };
    this.bypassBackend = false;
    this.useDeakinSSO = true;
    this.useACL = false;
  }
}

const instance = new Connection();
export default instance;