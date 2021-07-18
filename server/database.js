const mysql = require('mysql');
const config = require('./db.json');

// config must have:
// host, user, password, database
const conn = mysql.createConnection(config);
conn.connect();

class DatabaseTable {
    static getFields() {
        throw new Error('Class must implement getFields');
    }

    static getTable() {
        throw new Error('Class must implement getTable');
    }

    static async select(search) {
        let query = "SELECT * FROM " + this.getTable();
        const params = [];
        const paramStrings = Object.keys(search).map((key) => {
            const value = search[key];
            params.push(value);
            if (value === null) {
                return `${key} is ?`;
            }
            return `${key} = ?`;
        });
        if (paramStrings.length > 0) {
            const paramString = paramStrings.join(" AND ");
            query += " WHERE " + paramString;
        }
        query = mysql.format(query, params);
        const promise = new Promise((resolve, reject) => {
            conn.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        const results = await promise;
        return results;
    }

    static async insert(data) {
        let query = "INSERT INTO " + this.getTable() + " ";
        const params = [];
        const fieldList = Object.keys(data);
        const valueList = fieldList.map((field) => {
            const value = data[field];
            params.push(value);
            return '?';
        });
        query += `(${fieldList.join(',  ')}) VALUES(${valueList.join(', ')})`;
        query = mysql.format(query, params);
        const promise = new Promise((resolve, reject) => {
            conn.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        const result = await promise;
        return result.insertId;
    }

    static async update(where, changes) {
        let query = "UPDATE " + this.getTable() + " SET ";
        const params = [];
        const updateList = Object.keys(changes).map((key) => {
            const value = changes[key];
            params.push(value);
            return `${key} = ?`;
        });
        query += `${updateList.join(', ')} WHERE `;
        const searchList = Object.keys(where).map((key) => {
            const value = where[key];
            params.push(value);
            return `${key} = ?`;
        });
        query += searchList.join(' AND ');

        query = mysql.format(query, params);
        const promise = new Promise((resolve, reject) => {
            conn.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        await promise;
    }

    static async delete(where) {
        let query = "DELETE FROM " + this.getTable() + " WHERE ";
        const params = [];
        const searchList = Object.keys(where).map((key) => {
            const value = where[key];
            params.push(value);
            return `${key} = ?`;
        });
        query += searchList.join(' AND ');

        query = mysql.format(query, params);
        const promise = new Promise((resolve, reject) => {
            conn.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        await promise;
    }
}

module.exports = {
    conn,
    DatabaseTable,
};