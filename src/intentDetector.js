import IntentHandler from "./intentHandler";
import MemoryTable from "./table/memoryTable";

/**
 * Select a Handler which match input sentence and meets the condition.
 */
export default class IntentDetector {
    constructor(config) {
        this.slots = config.slots();
        this.table = new MemoryTable(config); // TODO: applicable to other data storage such as mongo
        this.handlers = [];
        for(const intent of config.intents()) {
            this.handlers.push(new IntentHandler(intent, this.slots));
        }
    }

    /**
     * Select registered handler which matches input. If there is no matched handler, set "default" to the "match" slot
     * @param input
     */
    match(input) {
        const output = JSON.parse(JSON.stringify(input)); //create deep copy
        if (this.table) {
            output['state'] = this._getUserState(input['userId']); // add user profile and status
        }
        for (const handler of this.handlers) {
            if (handler.match(output)) {
                output["match"] = handler.name;
                return output;
            }
        }
        output["match"] = "nothing";
        return output;
    }

    _getUserState(userId) {
        return this.table.get(userId);
    }
}
