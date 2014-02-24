Bitcoin Candy Vending Machine
--
![Bitcoin accepted](https://raw2.github.com/NicolasRitouet/nicolasritouet.github.io/master/images/Bitcoin_accepted_here-small.png)

What is it about?
==
A candy vending machine that takes bitcoins instead of euro or dollar coins.

Technical details
==
I used [KoaJS](http://koajs.com/) to deal with the software part.  
On the hardware side, I plan to use a raspberry pi with some servomotor to give the candy away once the payment has been approved.
I currently use the [blockchain.info API](https://blockchain.info/api). The long term plan is to use directly [the bitcoin protocol](http://www.righto.com/2014/02/bitcoins-hard-way-using-raw-bitcoin.html).

How to use
==
### Requirements
- NodeJS > v0.11.10
````bash
$ node -v
// if < v0.11.10
$ curl https://raw.github.com/creationix/nvm/master/install.sh | sh
$ nvm install 0.11
$ nvm use 0.11
````

### Install
````bash
$ git clone git@github.com:NicolasRitouet/bitcoinVendingMachine.git
$ cd bitcoinVendingMachine
$ npm install
$ npm install -g nodemon
$ nodemon --harmony index.js
````

Why KoaJS?
==
Because I also need to evaluate the coming features of ECMASCRIPT 6.

Various info
==
[Trello Board "bitcoinVendingMachine"](https://trello.com/b/b3LjOld8/bitcoinvendingmachine)