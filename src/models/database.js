let database;

class Database {

    collectionName;
    collection;

    static setDatabase(db) {
        database = db;
    }

    constructor(collectionName) {
        this.collectionName = collectionName;
        this.collection = database.colelction(collectionName);
    }

    findOne(filters) {
        return this.collection(findOne(filters));
    }

    find() {
        return this.collection(find());
    }

}

module.exports = Database;