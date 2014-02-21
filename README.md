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
````bash
$ git clone git@github.com:NicolasRitouet/bitcoinVendingMachine.git
$ cd bitcoinVendingMachine
// check that node is at least version 0.11.10
// if not, I recommend using nvm to install the needed version
$ node -v
// v0.11.10
$ npm install
$ node index.js --harmony
`````
### Vagrant variant (unstable !)
If you don't want to install nodeJS on your machine, you can also use vagrant to run the app.
You need to install VirtualBox and Vagrant first.
Then, run this:
````bash
$ git clone git@github.com:NicolasRitouet/bitcoinVendingMachine.git
$ cd bitcoinVendingMachine
$ vagrant up
$ vagrant ssh
// in vagrant:
$ nodemon -L --harmony index.js
`````
You can now open the application in your host at :
`````
http://192.168.33.10:3000
```
Any change made in the code will be automatically reflected on the server. (theoretically!)

Why KoaJS?
==
Because I also need to evaluate the coming features of ECMASCRIPT 6.

Various info
==
[Trello Board "bitcoinVendingMachine"](https://trello.com/b/b3LjOld8/bitcoinvendingmachine)