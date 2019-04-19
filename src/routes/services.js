const express = require('express'),
    {accounts, writeJSON} = require('../data');

const router = express.Router();

    router.get('/transfer', (req, res) => {
        res.render('transfer');
    });
    
    router.post('/transfer', (req, res) => {
        const from = req.body.from;
        const to = req.body.to;
        const transfer = parseInt(req.body.amount);
        accounts[from].balance -= transfer;
        accounts[to].balance += transfer;
    
        writeJSON();
    
        res.render('transfer', {message: 'Transfer Completed'});
    });
    
    router.get('/payment', (req, res) => {
        res.render('payment', {account: accounts.credit});
    })
    
    router.post('/payment', (req, res) => {
        accounts.credit.balance -= parseInt(req.body.amount);
        accounts.credit.available += parseInt(req.body.amount);
    
        writeJSON();
    
        res.render('payment', {message: 'Payment Successful', account: accounts.credit});
    });

module.exports = router;