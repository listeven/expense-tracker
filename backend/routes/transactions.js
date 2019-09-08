const router = require('express').Router();
let Transaction = require('../models/transaction.model');

router.route('/').get((req,res) => {
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const id = Number(req.body.id);
    const description = req.body.description;
    const amount = Number(req.body.amount);
    const date = req.body.date;

    const newTransaction = new Transaction({
        id,
        description,
        amount,
        date,
    });

    newTransaction.save()
        .then(() => res.json('Transaction added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Transaction.find({ id: req.params.id })
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Transaction.findOneAndDelete({ id: req.params.id })
        .then(() => res.json('Transaction deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
    Transaction.findOneAndUpdate({ id: req.params.id }, {
        id: Number(req.body.id),
        description: req.body.description,
        amount: Number(req.body.amount),
        date: req.body.date,
    })
        .then(() => res.json('Transaction updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;