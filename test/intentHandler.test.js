import assert  from 'power-assert';
import ConfigurationBuilder from "../src/configurationBuilder";
import IntensionHandler from "../src/intentHandler";

describe( 'IntentHandler', () => {
    describe( '#match', () => {
        it( 'returns true when input match the registered patterns', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
                .build();
            const handler = new IntensionHandler(config.intent(0));
            const result = handler.match({"text" : "I would like to repeat again."});
            assert( result === true );
        });

        it( 'returns false even when input match patterns, but condition does not meet', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat", {
                    "type" : "verbatim",
                    "patterns" : ["repeat", "please repeat"],
                    "condition" : {"current-recipe" : "not null"}})
                .build();
            const handler = new IntensionHandler(config.intent(0));
            const result = handler.match({"text" : "I would like to repeat again."});
            assert( result === false );
        });

        it( 'returns true when input match patterns and condition is also meet', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat", {
                    "type" : "verbatim",
                    "patterns" : ["repeat", "please repeat"],
                    "condition" : {"current-recipe" : "not null"}})
                .build();
            const handler = new IntensionHandler(config.intent(0));
            const result = handler.match({"text" : "I would like to repeat again.", "state" : { "current-recipe" : 10133434 } });
            assert( result === true );
        });

        it( 'returns false when input does not match patterns but condition is meet', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat", {
                    "type" : "verbatim",
                    "patterns" : ["repeat", "please repeat"],
                    "condition" : {"current-recipe" : "not null"}})
                .build();
            const handler = new IntensionHandler(config.intent(0));
            const result = handler.match({"text" : "I would like to speak more", "state" : { "current-recipe" : 10133434 } });
            assert( result === false );
        });
    });
});
