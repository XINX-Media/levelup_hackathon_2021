const express = require("express");
const User = require('./user');
const Card = require('./card');

const router = express.Router();

router.get('/user', async (req, res) => {
    const { identifier } = req.query;

    const user = await User.getForIdentifier(identifier);

    res.json({
        success: true,
        user,
    });
});

router.post('/user', async (req, res) => {
    const { identifier } = req.body;

    const user = await User.createUser(identifier);

    res.json({
        success: true,
        user,
    });
});

router.patch('/user', async (req, res) => {
    const { identifier, changes } = req.body;
    try {
        const user = await User.updateUser(identifier, changes);
        
        res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    } 
});

router.post('/card', async (req, res) => {
    const { user_id, card_text } = req.body;

    const card = await Card.createCard(user_id, card_text);

    res.json({
        success: true,
        card,
    });
});

router.patch('/card', async (req, res) => {
    const { id, changes } = req.body;
    try {
        const card = await Card.updateCard(id, changes);

        res.json({
            success: true,
            card,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    } 
});

router.get('/user/cards', async (req, res) => {
    const { user_id } = req.query;

    const cards = await Card.getCardsForUser(user_id);

    res.json({
        success:true,
        cards,
    });
});

router.delete('/user/cards', async (req, res) => {
    const { user_id, card_id } = req.query;

    await Card.deleteCard(user_id, card_id);

    res.json({
        success:true,
    });
});

router.get('/user/hearts', async (req, res) => {
    const { id } = req.query;

    // we will want to do something more efficient later on
    const cards = await Card.getCardsForUser(id);

    let count = 0;
    for (const card of cards) {
        count += card.swipes;
    }

    const user = await User.getForId(id);

    count += user.extra_hearts;

    res.json({
        success:true,
        hearts: count,
    });
});

module.exports = router;