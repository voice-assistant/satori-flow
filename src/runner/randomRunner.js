import ActionRunner from "./actionRunner";

/**
 * Returns one of predefined reply sentences.
 */
export default class RandomRunner extends ActionRunner {
    constructor(config) { // eslint-disable-line no-unused-vars
        super(config);
        this.table = config["list"];
    }

    reply(input) { // eslint-disable-line no-unused-vars
        return this.table[Math.floor(Math.random() * this.table.length)];
    }
}
