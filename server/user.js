const { DatabaseTable } = require('./database');

class UserTable extends DatabaseTable {
    static getTable() {
        return 'user';
    }

    static processUser(rawUser) {
        const user = {
            ...rawUser,
        };

        user.hasOnboarded = Boolean(user.hasOnboarded);
        user.extra_hearts = parseInt(user.extra_hearts, 10);
        user.ok_to_pair = Boolean(user.ok_to_pair);

        return user;
    }

    static async getForIdentifier(identifier) {
        const users = await UserTable.select({
            identifier,
        });

        if (users.length === 0) {
            return null;
        }

        const user = this.processUser(users[0]);
        
        return user;
    }

    static async getForId(id) {
        const users = await UserTable.select({
            id,
        });

        if (users.length === 0) {
            return null;
        }

        const user = this.processUser(users[0]);
        
        return user;
    }

    static async createUser(identifier) {
        const userId = await UserTable.insert({
            identifier,
        });

        return this.getForIdentifier(identifier);
    }

    static async updateUser(identifier, changes) {
        const user = await this.getForIdentifier(identifier);
        if (!user) {
            return null;
        }

        await UserTable.update({
            identifier,
        }, changes);

        return this.getForIdentifier(identifier);
    }

    static async getPairableUsers() {
        const users = await this.select({
            ok_to_pair: true,
            paired_user_id: null,
        });

        return users.map((user) => {
            return this.processUser(user);
        });
    }
}

module.exports = UserTable;