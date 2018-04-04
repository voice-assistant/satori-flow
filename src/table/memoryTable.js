import UserTable from "./userTable";

export default class MemoryTable extends UserTable {
    /**
     * Constructor.
     *
     * @param config
     * @note: config contains the urls of the cloud dbs, but memory table does not need.
     */
    constructor(config) { // eslint-disable-line no-unused-vars
        super();
        this.table = {};
    }

    /**
     * Get User profile information (age, male/female, current-recipe etc).
     * @param userId
     * @returns {*}
     */
    get(userId) {
        if (userId in this.table) {
            return this.table[userId];
        }
        return {}
    }

    /**
     * Set user profile.
     * @param userId
     * @param state
     */
    set(userId, state) {
        this.table[userId] = state;
    }
}
