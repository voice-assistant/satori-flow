export default class UserTable {
    constructor(config) { // eslint-disable-line no-unused-vars
        if (new.target === UserTable) {
            throw new TypeError("Cannot construct IntentMatcher instances directly");
        }
    }

    /**
     * Get user information from table
     *
     * @param userId
     * @returns Object
     */
    get(userId) {  // eslint-disable-line no-unused-vars
        throw new TypeError("Do not call abstract method, get directory");
    }

    /**
     * Set user information to table
     * @param userId
     * @param state
     */
    set(userId, state) {  // eslint-disable-line no-unused-vars
        throw new TypeError("Do not call abstract method, set directory");
    }
}
