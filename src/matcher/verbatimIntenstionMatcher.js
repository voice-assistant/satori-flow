import IntentMatcher from "./intentMatcher"

/**
 * This matcher check if input sentence contains predefined patterns.
 */
export default class VerbatimIntentMatcher extends IntentMatcher {
    constructor(config, slot) {
        super(config);
        this.slot = slot;
        this.patterns= config["patterns"];
    }

    textMatch(input) {
        const matches = this.patterns.filter((element) => (
            input["text"].includes(element) === true));
        return matches.length > 0;
    }
}
