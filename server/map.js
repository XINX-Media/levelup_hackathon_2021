const { DatabaseTable } = require('./database');

class MapTable extends DatabaseTable {
    static getTable() {
        return 'user_map_unlocks';
    }

    static process(item) {
        return item;
    }

    static async getForId(id) {
        const items = await this.select({
            id,
        });

        if (items.length === 0) {
            return null;
        }

        const item = items[0];

        return this.process(item);
    }

    static async getForUser(id) {
        const result = await this.select({
            user_id: id,
        });

        return result.map((card) => {
            return this.process(card);
        });
    }

    static async addCard(userId, x, y) {
        const cardId = await this.insert({
            user_id: userId,
            x,
            y,
        });

        return this.getForId(cardId);
    }
}

module.exports = MapTable;