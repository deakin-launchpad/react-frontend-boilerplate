class API {
  constructor() {
    this.tinyMCE = {
      key: "esf4wixekrxxlq0658t3wbxu2jocwtm2p8pykr8oqh2kkuol"
    };
    this.twilio = {
      "twilioAccountSID": "",
      "twilioAPIkey": "",
      "twilioAPIsecret": ""
    };
    this.jwt = {
      url: 'https://rapid.test.aaf.edu.au/jwt/authnrequest/research/HuP9vbv2Sv3RivbqPCIzFg?entityID=https://signon-dev.deakin.edu.au/idp/shibboleth'
    };
  }
}

const instance = new API();
export default instance;