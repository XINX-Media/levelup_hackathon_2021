const express = require("express");
const User = require('./user');
const Card = require('./card');
const StandardCard = require('./standardCard');
const Map = require("./map");

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

    const standardCards = await StandardCard.getCardsForUser(id);
    for (const card of standardCards) {
        count += card.swipes;
    }

    const user = await User.getForId(id);

    count += user.extra_hearts;

    res.json({
        success:true,
        hearts: count,
    });
});

router.post("/user/connect", async (req, res) => {
    const { id } = req.body;

    const user = await User.getForId(id);
    if (user.paired_user_id) {
        // if we already have a paired user, then just return the user
        res.json({
            success:true,
            user,
        });
    } else {
        // let's try to find a valid user
        const users = await User.getPairableUsers();
        const pairableUsers = users.filter(({ id: otherId }) => {
            return id != otherId;
        });

        let pairableUser = null;
        if (pairableUsers.length > 0) {
            pairableUser = pairableUsers[0].id;

            // update the paired user
            const newUser = await User.updateUser(pairableUsers[0].identifier, {
                paired_user_id: user.id,
            });
        }

        const changes = {
            ok_to_pair: true,
            paired_user_id: pairableUser,
        };

        const newUser = await User.updateUser(user.identifier, changes);

        res.json({
            success:true,
            user: newUser,
        });
    }
});

router.get("/user/connect", async (req, res) => {
    const { id } = req.query;

    const user = await User.getForId(id);

    if (!user) {
        res.json({
            success: false,
            message: 'No such user',
        });
        return;
    }

    if (!user.paired_user_id) {
        res.json({
            success: false,
            message: 'No paired user id',
        });
        return;
    }

    const pairedUser = await User.getForId(user.paired_user_id);

    if (!pairedUser) {
        res.json({
            success: false,
            message: 'Paired user does not exist',
        });
        return;
    }

    res.json({
        success: true,
        user: pairedUser,
    });
});

router.put("/user/connect/give_heart", async (req, res) => {
    const { id } = req.body;

    const user = await User.getForId(id);

    if (!user) {
        res.json({
            success: false,
            message: 'No such user',
        });
        return;
    }

    if (!user.paired_user_id) {
        res.json({
            success: false,
            message: 'No paired user id',
        });
        return;
    }

    const pairedUser = await User.getForId(user.paired_user_id);

    if (!pairedUser) {
        res.json({
            success: false,
            message: 'Paired user does not exist',
        });
        return;
    }

    await User.updateUser(pairedUser.identifier, {
        extra_hearts: pairedUser.extra_hearts + 1,
    });

    res.json({
        success: true,
    });
});

router.post("/user/standard_card", async (req, res) => {
    const { user_id, card_index, easy, deleted } = req.body;

    try {
        const card = await StandardCard.getCardForUser(user_id, card_index);

        if (card) {
            const newCard = await StandardCard.updateCard(user_id, card_index, {
                easy, deleted
            });
            res.json({
                success: true,
                card: newCard,
            });
            return;
        }

        const newCard = await StandardCard.addCard(user_id, card_index, easy, deleted);

        res.json({
            success: true,
            card: newCard,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    } 
});

router.get("/user/standard_card", async (req, res) => {
    const { id } = req.query;

    try {
        const cards = await StandardCard.getCardsForUser(id);

        res.json({
            success: true,
            cards,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
});

router.patch("/user/standard_card", async (req, res) => {
    const { user_id, card_index, changes } = req.body;

    try {
        const card = await StandardCard.getCardForUser(user_id, card_index);

        if (!card) {
            res.json({
                success: false,
                message: `No card found for ${user_id}/${card_index}`,
            });
            return;
        }
        const newCard = await StandardCard.updateCard(user_id, card_index, changes);

        res.json({
            success: true,
            card: newCard,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
});

router.get("/user/map", async (req, res) => {
    const { user_id } = req.query;
    try {
        const items = await Map.getForUser(user_id);
        res.json({
            success: true,
            items,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
});

router.post("/user/map", async (req, res) => {
    const { user_id, x, y } = req.body;
    try {
        const item = await Map.addCard(user_id, x, y);
        res.json({
            success: true,
            item,
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: error.message,
        });
    }
});


module.exports = router;