import { ConfigurationBuilder } from 'satori-flow'
import { IntentDetector } from 'satori-flow'

const config = new ConfigurationBuilder()
    .addIntent("repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
    .addRunner("repeat", {"type" : "random", "list" : ["sure"]} )
    .build();

const detector = new IntentDetector(config);
const result = detector.match({"text" : "I would like to repeat again.", "userId" : 985499 });
console.log(result)
