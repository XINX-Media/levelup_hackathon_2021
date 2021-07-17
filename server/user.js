const { DatabaseTable } = require('./database');

class UserTable extends DatabaseTable {
    static getTable() {
        return 'user';
    }

    static async getForIdentifier(identifier) {
        const users = await UserTable.select({
            identifier,
        });

        if (users.length === 0) {
            return null;
        }

        const user = users[0];
        user.hasOnboarded = Boolean(user.hasOnboarded);
        user.extra_hearts = parseInt(user.extra_hearts, 10);
        
        return user;
    }

    static async getForId(id) {
        const users = await UserTable.select({
            id,
        });

        if (users.length === 0) {
            return null;
        }

        const user = users[0];
        user.hasOnboarded = Boolean(user.hasOnboarded);
        user.extra_hearts = parseInt(user.extra_hearts, 10);
        
        return user;
    }

    static async createUser(identifier) {
        const userId = await UserTable.insert({
            identifier,
        });

        return this.getForIdentifier(identifier);
    }

    static async updateUser(identifier, changes) {
        const user = this.getForId(identifier);
        if (!user) {
            return null;
        }

        await UserTable.update({
            identifier,
        }, changes);

        return this.getForIdentifier(identifier);
    }
}

module.exports = UserTable;