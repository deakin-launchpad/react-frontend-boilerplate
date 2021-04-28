class Connection {
  constructor() {
    this.useAccessTokenVerificationAPI = false;
    this.socket = {
      "initSocket": false,
      "socketDefaultOptions": {},
      "accessTokenVerification": false
    };
    this.bypassBackend = false;
    this.useDeakinSSO = true;
    this.useACL = true;
  }
}

const instance = new Connection();
export default instance;