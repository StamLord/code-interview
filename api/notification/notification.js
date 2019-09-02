const express = require('express');
const router = express.Router();
const Notification = require('../../models/notification/Notification');

// Post
router.post('/', async (req, res, next) => {
    const { accountId, name, color } = req.body;

    const notification = new Notification({ accountId, name, color });
    await notification.save();
    return res.send({ message: 'success' });
})

// Get
router.get('/', (req, res, next) => {

    Notification.find({ accountId: req.query.accountId })
        .exec()
        .then(notifications => res.send(notifications))
        .catch(err => res.status(500).send({ msg: 'database error' }));

});

// Delete
router.delete('/', (req, res, next) => {
    Notification.deleteMany({
        accountId: req.query.accountId,
        color: req.query.color
    })
        .exec()
        .then(res.send({ msg: 'success' }))
        .catch(err => res.status(500).send({ msg: 'database error' }));
});

module.exports = router;