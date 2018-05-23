import assert  from 'power-assert';

import ConfigurationBuilder from "../src/configuration_builder";
import IntentDetector from "../src/intent_detector";

class IntentDetectorForTest extends IntentDetector {
   setUserState(userId, state) {
       this.table.set(userId, state);
    }
}

describe( 'IntentDetector.match(input)', () => {
    describe ('#match', () => {
        it( 'returns result containing matched handler name when input match a intents', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
                .build();
            const detector = new IntentDetector(config);
            const result = detector.match({"text" : "I would like to repeat again.", "userId" : 985499 });
            assert( result["match"] === "Repeat" );
        });

        it( 'returns result containing default when input match any intent', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
                .build();
            const detector = new IntentDetector(config);
            const result = detector.match({"text" : "I would like to speak more", "userId" : 985499});
            assert( result["match"] === "nothing" );
        });

        it( 'returns result containing a matched handler name when input matches one of intents', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
                .addIntent("More", { "type" : "verbatim", "patterns" : [ "speak more", "please tell me more"]})
                .build();
            const detector = new IntentDetector(config);
            const result = detector.match({"text" : "I would like to speak more", "userId" : 985499});
            assert( result["match"] === "More");
        });

        it( 'returns result containing matched handler name when input and user state match', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat", {
                    "type" : "verbatim",
                    "patterns" : ["repeat", "please repeat"],
                    "condition" : {"current-recipe" : "not null"}})
                .build();
            const detector = new IntentDetectorForTest(config);

            const userId = "89448";
            detector.setUserState(userId, {"current-recipe" : 18493}); // FIXME: need more simple testing...
            const result = detector.match({userId, "text" : "I would like you to repeat again"});
            assert(result["match"] === "Repeat");
        });
    });
});
