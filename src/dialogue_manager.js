import IntentDetector from "./intent_detector";
import RandomRunner from "./runner/random_runner";

/**
 * Sample dialog manager.
 */
export default class DialogueManager {
    constructor(config) {
        this.detector = new IntentDetector(config);
        this.runners = this._generateRunners(config);
    }

    _generateRunners(config) {
        const runners = {}
        for(const name in config.runners()) {
            runners[name] = new RandomRunner(config.runner(name));
        }
        return runners;
    }

    /**
     * Generate reply sentence for input (JSON).
     * @param input
     * @returns sentence
     */
    reply(input) {
        const output = this.detector.match(input);
        if (output["match"] in this.runners) {
            return this.runners[output["match"]].reply(output);
        } else {
            return this.runners["default"].reply(output);
        }
    }
}
