const { DatabaseTable } = require('./database');

class StandardCardTable extends DatabaseTable {
    static getTable() {
        return 'user_standard_card';
    }

    static process(raw) {
        const final = {
            ...raw,
        };

        final.deleted = Boolean(final.deleted);
        final.easy = Boolean(final.easy);

        return final;
    }

    static async getForId(id) {
        const cards = await this.select({
            id,
        });

        if (cards.length === 0) {
            return null;
        }

        const card = cards[0];

        return this.process(card);
    }
 
    static async getCardsForUser(id) {
        const result = await this.select({
            user_id: id,
        });

        return result.map((card) => {
            return this.process(card);
        });
    }

    static async getCardForUser(id, cardIndex) {
        const result = await this.select({
            user_id: id,
            card_index: cardIndex,
        });

        if (result.length === 0) {
            return null;
        }

        return this.process(result[0]);
    }

    static async addCard(userId, cardIndex, easy, deleted) {
        const cardId = await this.insert({
            user_id: userId,
            card_index: cardIndex,
            easy,
            deleted,
        });

        return this.getForId(cardId);
    }

    static async updateCard(userId, cardIndex, changes) {
        const card = await this.getCardForUser(userId, cardIndex);
        if (!card) {
            return null;
        }

        await this.update({
            user_id: userId,
            card_index: cardIndex,
        }, changes);

        
        return this.getCardForUser(userId, cardIndex);
    }
}

module.exports = StandardCardTable;