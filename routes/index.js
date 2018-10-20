var express = require('express');
var employer = require('../streaming-payments/streaming-employer');
var employee = require('../streaming-payments/streaming-employee');
var router = express.Router();

router.get('/start', async function(req, res, next) {
  await employee.connect();
  await employer.connect('');

  
	let msg = "STARTED RESPONDING TO PAYMENT REQUESTS";
	console.log(msg);
	res.send(msg);
});

router.get('/stop', async function(req, res, next) {
  await employer.stop();
  
	let msg = "STOPPED RESPONDING TO PAYMENT REQUESTS";
	console.log(msg);
	res.send(msg);
});

router.get('/userbalance', async function(res, res, next) {
  let balance = await employee.getBalance();
  console.log("BALANCE IS " + balance);
  res.send(balance);
});

router.get('/employerbalance', async function(res, res, next) {
  let balance = await employer.getBalance();
  console.log("BALANCE IS " + balance);
  res.send(balance);
});

module.exports = router;
