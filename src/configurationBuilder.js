import Configuration from "./configuration";

export default class ConfigurationBuilder {
    constructor() {
        this.config = { "intents" : [], "slots" : {}, "runners" : {} };
    }

    build() {
        return new Configuration(this.config);
    }

    addIntent(name, match) {
        this.config["intents"].push({name, match});
        return this;
    }

    addSlot(name, list) {
        this.config.slots[name] = list;
        return this;
    }

    addRunner(name, runner) {
        this.config.runners[name] = runner;
        return this;
    }
}
