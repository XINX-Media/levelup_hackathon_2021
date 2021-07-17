const { DatabaseTable } = require('./database');

class UserTable extends DatabaseTable {
    static getTable() {
        return 'user';
    }

    static async getForId(identifier) {
        const users = await UserTable.select({
            identifier,
        });

        if (users.length === 0) {
            return null;
        }

        const user = users[0];
        user.hasOnboarded = Boolean(user.hasOnboarded);
        
        return user;
    }

    static async createUser(identifier) {
        const userId = await UserTable.insert({
            identifier,
        });

        return this.getForId(identifier);
    }

    static async updateUser(identifier, changes) {
        const user = this.getForId(identifier);
        if (!user) {
            return null;
        }

        await UserTable.update({
            identifier,
        }, changes);

        return this.getForId(identifier);
    }
}

module.exports = UserTable;