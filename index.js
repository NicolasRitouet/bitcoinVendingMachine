var koa = require('koa'),
    app = koa(),
    request = require('request'),
    config = require('./config');

    var baseBlockchainUrl = 'https://blockchain.info/merchant/';


app.use(function *() {
    var response = yield doHttpRequest(baseBlockchainUrl + config.blockchain.guid + '/balance?password=' + config.blockchain.password);
    var balance = JSON.parse(response.body).balance;
    this.body = "Current balance of address 1CK5cgFeJCoHyjvxUjRTfqWBL74fUqdb9G: " + balance + " Satoshi";
});

function *doHttpRequest(url) {
    var resultParams = yield doRequest(url);
    return resultParams[0];
}

function doRequest(url) {
    return function(callback) {
        request(url, callback);
    }
}

app.listen(3000);
