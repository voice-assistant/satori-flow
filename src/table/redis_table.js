import UserTable from "./user_table";
const redis = require("redis");

export default class RedisTable extends UserTable {
    /**
    nn * Constructor.
     *
     * @param config
     * @note: config contains the urls of the cloud dbs, but memory table does not need.
     */
    constructor(config) { // eslint-disable-line no-unused-vars
        super();
        this.client = redis.createClient();
    }

    /**
     * Get User profile information (age, male/female, current-recipe etc).
     * @param userId
     * @returns {*}
     */
    get(userId) {
        if (userId in this.table) {
            return this.client.get(userId);
        }
        return {}
    }

    /**
     * Set user profile.
     * @param userId
     * @param state
     */
    set(userId, state) {
        this.client.set(userId, state);
    }
}
