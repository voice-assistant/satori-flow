import VerbatimIntentMatcher from "./matcher/verbatimIntenstionMatcher";
import TemplateIntentMatcher from "./matcher/templateIntentMatcher";
import VerbatimTemplateIntentMatcher from "./matcher/verbatimTemplateIntentMatcher";

/**
 * Check if a input matches and extract features needed to generate reply.
 */
export default class IntentHandler {
    constructor(config, slots) {
        this.name = config.name;
        this.slots = slots;
        this.matcher = IntentHandler._generateMatcher(config.match, this.slots);
    }

    match(input) {
        return this.matcher.match(input);
    }

    static _generateMatcher(matchConfig, slots) {
        switch (matchConfig['type']){
            case 'verbatim':
                return new VerbatimIntentMatcher(matchConfig);
            case 'template':
                return new TemplateIntentMatcher(matchConfig, slots);
            case 'verbatimTemplate':
                return new VerbatimTemplateIntentMatcher(matchConfig, slots);
            default:
                throw new Error(`Nothing matcher type such as ${matchConfig["type"]}`);
        }
    }
}
