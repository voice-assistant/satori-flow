export default class Configuration {
    constructor(config) {
        if (typeof config === 'string') {
            this.config = JSON.parse(config);
        } else {
            this.config = config;
        }
    }

    /**
     * Get specified intent block.
     * @param id
     * @returns {*}
     */
    intent(id) {
        return this.config["intents"][id];
    }

    /**
     * Get all intent blocks.
     * @returns {*}
     */
    intents() {
        return this.config["intents"];
    }

    /**
     * Get specified slot.
     * @param name
     * @returns {*}
     */
    slot(name) {
        return this.config["slots"][name];
    }

    /**
     * Get all slots (list of ingredients, etc).
     * @returns {*}
     */
    slots() {
        return this.config["slots"];
    }

    /**
     * Get specified runner block.
     * @param name Runner name
     * @returns {*}
     */
    runner(name) {
        return this.config["runners"][name];
    }

    /**
     * Get all runner blocks.
     * @returns {*}
     */
    runners() {
        return this.config["runners"];
    }

    /**
     * Get table setting.
     * @returns {*}
     */
    table() {
        if ('table' in this.config) {
            return this.config["table"];
        } else {
            return {'type': "memory"}
        }
    }
}
