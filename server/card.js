const { DatabaseTable } = require('./database');

class CardTable extends DatabaseTable {
    static getTable() {
        return 'user_card';
    }

    static async getForId(id) {
        const cards = await this.select({
            id,
        });

        if (cards.length === 0) {
            return null;
        }

        const card = cards[0];

        return card;
    }

    static async createCard(userId, cardText) {
        const cardId = await this.insert({
            user_id: userId,
            card_text: cardText,
        });

        return this.getForId(cardId);
    }

    static async getCardsForUser(userId) {
        const cards = await this.select({
            user_id: userId,
        });
        
        return cards;
    }

    static async updateCard(id, changes) {
        const card = await this.getForId(id);
        if (!card) {
            return null;
        }

        await CardTable.update({
            id,
        }, changes);

        return this.getForId(id);
    }

    static async deleteCard(user_id, card_id) {
        const card = await this.getForId(card_id);
        if (!card) {
            return null;
        }

        await CardTable.delete({
            user_id,
            id: card_id,
        });
    }
}

module.exports = CardTable;