import IntentHandler from "./intent_handler";
import MemoryTable from "./table/memory_table";
import RedisTable from "./table/redis_table";

/**
 * Select a Handler which match input sentence and meets the condition.
 */
export default class IntentDetector {
    constructor(config) {
        this.slots = config.slots();
        this.table = this.createTable(config);
        this.handlers = [];
        for(const intent of config.intents()) {
            this.handlers.push(new IntentHandler(intent, this.slots));
        }
    }

    createTable(config) {
        const table = config.table();
        if (table["type"] === "memory") {
            console.log("Memory table is selected...");
            return new MemoryTable(config);
        } else if (table["type"] === "redis") {
            console.log("Redis table is selected...");
            return new RedisTable(config);
        } else {
            console.wan("No table is selected...");
            throw new Error('No table type as ' + table["type"]);
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
