const express = require('express');
const router = express.Router();
const Account = require('../../models/account/Account');

router.post('/', async (req, res, send) => {

    const { email, name, age } = req.body;

    // Checks if email already exists
    await Account.countDocuments({ email }, async (err, count) => {
        if (err)
            return res.status(500).send({ error: 'database error' });
        if (count > 0)
            return res.status(422).send({ error: 'email already exists' });

        const account = new Account({ email, name, age });
        await account.save();
        return res.status(201).send({ message: 'success' });
    });
});

module.exports = router;