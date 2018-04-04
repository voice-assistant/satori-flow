/**
 * Interface of Runner.
 */
export default class ActionRunner {
    constructor(config) { // eslint-disable-line no-unused-vars
        if (new.target === ActionRunner) {
            throw new TypeError("Cannot construct ActionRunner instances directly");
        }
        this.name = config["name"];
    }

    reply(input) {  // eslint-disable-line no-unused-vars
        throw new TypeError("Do not call abstract method, get directory");
    }
}
