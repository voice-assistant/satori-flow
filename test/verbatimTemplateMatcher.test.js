import assert  from 'power-assert';
import ConfigurationBuilder from "../src/configuration_builder";
import IntentDetector from "../src/intentDetector";

describe( 'VerbatimTemplateMatcher.match', () => {
    describe( '#match', () => {
        it( 'when registered two patterns, match exact pattern', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "verbatimTemplate",
                    "patterns" : [ "#{ingredients}" ]})
                .addIntent("Search with !", {
                    "type" : "verbatimTemplate",
                    "patterns" : [ "#{ingredients}!" ]})
                .addSlot("ingredients", ["potato", "eggplant"])
                .build();
            const detector = new IntentDetector(config);
            let result = detector.match({"text" : " potato! "});
            assert( result["match"] === "Search with !" );

            result = detector.match({"text" : "potato"});
            assert( result["match"] === "Search with ingredients" );
        });
    });
});
