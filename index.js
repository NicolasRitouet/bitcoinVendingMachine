// process.env.DEBUG = '.*';
/**
* Module dependencies.
*/
var _ = require('lodash-node'),
    views = require('co-views'),
    serve = require('koa-static'),
    route = require('koa-route'),
    koa = require('koa'),
    app = koa(),
    request = require('request'),
    WebSocket = require('ws'),
    debug = require('debug')('bitcoinVendingMachine'),
    config = require('./config');

var render = views(__dirname + '/views', { ext: 'ejs' });


/**
* Routing.
*/
app.use(serve('public'));
app.use(route.get('/', main));
app.use(route.get('/api', api));
// app.use(route.get('/balance', balance));
// app.use(route.get('/exchangeRate', exchangeRate));


function *main() {

    this.body = yield render('main', {
        exchangeRate: yield getExchangeRate(),
        balance: yield getBalance(),
        timestamp: new Date,
        btcAddress: config.blockchain.address
    });
}

function *api() {

    this.body = {
        timestamp: Date.now(),
        balance: yield getBalance(),
        exchangeRate: yield getExchangeRate(),
        btcAddress: config.blockchain.address
    };
}

function *getBalance() {
    // Could also use this api:
    // 'https://blockchain.info/q/addressbalance/' + config.blockchain.address + '?confirmations=6'
    var response = yield doRequest(config.blockchain.restApiUrl + config.blockchain.guid + '/balance?password=' + config.blockchain.password);
    return JSON.parse(response[0].body).balance;
}

function *getExchangeRate() {
    var responseExchangeRate = yield doRequest('http://blockchain.info/tobtc?currency=EUR&value=1');
    return responseExchangeRate[0].body;
}

function doRequest(url) {
    return function(callback) {
        request(url, callback);
    }
}

var ws = new WebSocket(config.blockchain.wsUrl);
ws.on('open', function () {
    debug('connected to:', config.blockchain.wsUrl);
    debug("Subscribed to transaction event for address " + config.blockchain.address);
    ws.send(JSON.stringify({"op": "addr_sub", "addr": config.blockchain.address}));
});

ws.on('message', function (data) {
    var transaction = JSON.parse(data);
    var transactionValueReceived = getTransValueForAddress(transaction, config.blockchain.address);
    debug(new Date() + " - I received " + transactionValueReceived + " Satoshis.");
});

ws.on('error', function (err) {
    debug(err);
});

var getTransValueForAddress = function(transaction, btcAddress) {
    var outArray = transaction.x.out;
    var outTx = (_.find(outArray, function(outTx) {
        return outTx.addr === btcAddress;
    }));
    return outTx.value;

}


app.listen(3001);
