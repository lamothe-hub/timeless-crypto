var express = require('express');
var parser = require('cookie-parser');
const XrpEscrowPlugin = require('ilp-plugin-xrp-escrow')
var employer = require('../streaming-payments/streaming-employer');
var employee = require('../streaming-payments/streaming-employee');
//var plugin = require('../streaming-payments/plugin');
var router = express.Router();

// keeps track of how many users are running at the same time
var users = {};

function XrpObj(account, secret) {
  let obj = new XrpEscrowPlugin({
    secret: secret,
    account: account,
    server: 'wss://s.altnet.rippletest.net:51233',
    prefix: 'test.crypto.xrp.'
  });

  obj.id = account;
  return obj;
}

function employerXrpObj(req) {
  return XrpObj(
    req.body.employerAddress,
    req.body.employerSecret
  ); 
}

function employeeXrpObj(req) {
  return XrpObj(
    req.body.employeeAddress,
    req.body.employeeSecret
  );
}


router.post('/start', async function(req, res, next) {
  console.log(req);
  // create employer object and employee object
  let employeeXrp = employeeXrpObj(req);
  let employerXrp = employerXrpObj(req);

  employeeXrp.opposite = employerXrp.id;
  employerXrp.opposite = employeeXrp.id;

  await employee.connect(employeeXrp);
  await employer.connect(employerXrp);

  users[employee.id] = employeeXrp;
  users[employer.id] = employerXrp;

	let msg = "STARTED RESPONDING TO PAYMENT REQUESTS";
	console.log(msg);
	res.send(msg);
});

router.post('/stop', async function(req, res, next) {

  // create employer object and employee object
  let employeeXrp = employeeXrpObj(req);
  let employerXrp = employerXrpObj(req);
  
  // stop only the user that's running
  await employer.stop(employerXrp.id);
  //await employee.close(employeeXrp.id);
  
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
