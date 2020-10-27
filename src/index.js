const axios = require("axios");

module.exports = class PicPay {
  constructor(_config) {
    this.x_seller_token = _config.x_seller_token;
    this.picpay_token = _config.picpay_token;
    this.callback_url = _config.callback_url;
    this.return_url = _config.return_url;
    this.base_url = "https://appws.picpay.com/ecommerce/public";
    this.instance = this.configure();
  };

  configure(){
    return axios.create({
      baseURL: this.base_url,
      headers: {
        'accept-encoding': 'gzip,deflate',
        'Content-Type': 'application/json',
        'x-picpay-token': this.picpay_token,
        'x-seller-token': this.x_seller_token,
      }
    });
  }

  getConfig(){
    return {
      "x_seller_token": this.x_seller_token,
      "picpay_token": this.picpay_token,
      "callback_url": this.callback_url,
      "return_url": this.return_url,
      "base_url": this.base_url
    }
  }

  getOrderSample(){
    return {
      "referenceId": "100",
      "callbackUrl": "callbackUrl",
      "returnUrl": "returnUrl",
      "value": 19.90,
      "expiresAt": "2022-08-02T16:00:00-03:00",
      "buyer": {
        "firstName": "Hello",
        "lastName": "World Da Silva",
        "document": "123.456.789-10",
        "email": "test@picpay.com",
        "phone": "+55 11 12345-6789"
      }
    }
  }

  async createPayment(_picPayOrder){
    if (this.instance){
      const request = this.instance;
      try {
        const { status, data } = await request.post("/payments", _picPayOrder);
        return { status, data };
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          return { status, data };
        }
        return err;
      }
    }
  }

  async getPaymentStatus(_referenceId){
    if (this.instance){
      const request = this.instance;
      const url = "/payments/" + _referenceId + "/status";
      try {
        const { status, data } = await request.get(url);
        return { status, data };
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          return { status, data };
        }
        return err;
      }
    }
  }

  async cancelPayment(_referenceId, _authorizationId){
    if (this.instance){
      const request = this.instance;
      const url = "/payments/" + _referenceId + "/cancellations";
      try {
        if (_authorizationId) {
          const body = { "authorizationId": _authorizationId };
          const { status, data } = await request.post(url, body);
          return { status, data };
        } else {
          const { status, data } = await request.post(url);
          return { status, data };
        }
      } catch (err) {
        if (err.response) {
          const { status, data } = err.response;
          return { status, data };
        }
        return err;
      }
    }
  }

}
