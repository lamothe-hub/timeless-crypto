const IlpPacket = require('ilp-packet')
const plugin = require('./plugins.js').xrp.Employer()
const uuid = require('uuid/v4')
const fetch = require('node-fetch')
const crypto = require('crypto')

function base64url (buf) {
  return buf.toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function sha256 (preimage) {
  return crypto.createHash('sha256').update(preimage).digest()
}

function hmac (secret, input) {
  return crypto.createHmac('sha256', secret).update(input).digest()
}

var loop;
//var balance;

const connect = (userId) => {

  plugin
	.connect()
	.then( () => { return fetch('http://localhost:8000/' + userId) })	
	.then( (res) => {

		const parts = res.headers.get('Pay').split(' ');
		const incomingId = res.headers.get('UserId');
		
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

				//this.balance = res.headers.get('Balance');

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

const stop = () => {
	clearInterval(loop);
};

exports.connect = connect;
exports.stop = stop;