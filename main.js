const PicPayNodeJS = require("./index");

const picpayConfig = {
  "x_seller_token": "123",
  "picpay_token": "456",
  "callback_url": "/",
  "return_url": "/"
}

const picpay = new PicPayNodeJS(picpayConfig);
