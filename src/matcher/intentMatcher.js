import StateConditions from "./stateConditions";

/**
 * This class match intents with registered conditions and input match.
 */
export default class IntentMatcher {
    constructor(config) {
        if (new.target === IntentMatcher) {
            throw new TypeError("Cannot construct IntentMatcher instances directly");
        }
        if ('condition' in config) {
            this.conditions = new StateConditions(config["condition"]);
        } else {
            this.conditions = new StateConditions({});
        }
    }

    /**
     * Check if input and conditions are meet.
     * @param input
     * @returns true if check succeeded, otherwise false.
     */
    match(input) {
        let state = {};
        if ('state' in input) {
            state = input['state'];
        }
        return this.textMatch(input) && this.conditions.isMeet(state);
    }

    /**
     * Check input sentence match or not.
     * @param input
     */
    textMatch(input) { // eslint-disable-line no-unused-vars
        throw new TypeError("Do not call abstract method match directory");
    }
}
