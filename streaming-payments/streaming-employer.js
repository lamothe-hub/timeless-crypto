const IlpPacket = require('ilp-packet')
const uuid = require('uuid/v4')
const fetch = require('node-fetch')
const crypto = require('crypto')

var loop;
var plugin;

function base64url (buf) {
  return buf.toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function sha256 (preimage) {
  return crypto.createHash('sha256').update(preimage).digest()
}

function hmac (secret, input){
  return crypto.createHmac('sha256', secret).update(input).digest()
}

const connect = (xrp) => {
	plugin = xrp;

  plugin
	.connect()
	.then( () => { return fetch('http://localhost:3000/api/' + xrp.id) })	
	.then( (res) => {

		const parts = res.headers.get('Pay').split(' ');
		
		if (parts[0] === 'interledger-psk') {

			let paymentId = 0

			loop = setInterval(function () {

				const destinationAmount = parts[1]
				const destinationAddress = parts[2] + '.' + paymentId
				const sharedSecret = Buffer.from(parts[3], 'base64')
				const ilpPacket = IlpPacket.serializeIlpPayment({
					account: destinationAddress,
					amount: destinationAmount,
					data: ''
				});

				process.stdout.write('.')
				
				const fulfillmentGenerator = hmac(sharedSecret, 'ilp_psk_condition')
				const fulfillment =  hmac(fulfillmentGenerator, ilpPacket)
				const condition = sha256(fulfillment)
				
				plugin.sendTransfer({
					id: uuid(),
					from: plugin.getAccount(),
					to: destinationAddress,
					ledger: plugin.getInfo().prefix,
					expiresAt: new Date(new Date().getTime() + 1000000).toISOString(),
					amount: destinationAmount,
					executionCondition: base64url(condition),
					ilp: base64url(ilpPacket)
				})
			
				paymentId++

			}, 1000)
		}
		
		res.body.pipe(process.stdout)
	
	});
}

const stop = (xrp) => {
	clearInterval(loop);
};

const getBalance = async () => {
  return plugin.getBalance().then((balance) => {
    return balance;
  });
}

exports.connect = connect;
exports.stop = stop;
exports.getBalance = getBalance;