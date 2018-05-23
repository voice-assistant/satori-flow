import assert  from 'power-assert';
import ConfigurationBuilder from "../src/configuration_builder";
import IntentHandler from "../src/intent_handler"
import IntentDetector from "../src/intent_detector";

describe( 'TemplateMatcher.match', () => {
    describe( '#match', () => {
        it( 'returns true when input match the registered patterns', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "template",
                    "patterns" : [ "search recipes #{ingredients} stuff" ]})
                .addSlot("ingredients", ["potato", "eggplant"])
                .build();
            const handler = new IntentHandler(config.intent(0), config.slots());
            const input = {"text" : "search recipes potato stuff"};
            const result = handler.match(input);
            assert( result === true );
            assert( input['feature']['ingredients'] === 'potato' );
        });

        it( 'returns false when input does not match the registered patterns', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "template",
                    "patterns" : [ "please give me recipes on #{ingredients}" ]})
                .addSlot("ingredients", ["potato", "eggplant"])
                .build();
            const handler = new IntentHandler(config.intent(0), config.slots());
            const result = handler.match({"text" : "search recipes potato stuff"});
            assert( result === false );
        });

        it( 'returns true when input match the pattern with multiple slots', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "template",
                    "patterns" : [ "please give me recipes on #{ingredients} with #{style}" ]})
                .addSlot("ingredients", ["potato", "eggplant"])
                .addSlot("style", ["japanese", "french"])
                .build();
            const input = {"text" : "please give me recipes on potato with french"};
            const handler = new IntentHandler(config.intent(0), config.slots());
            const result = handler.match(input);
            assert( input['feature']['ingredients'] === 'potato' );
            assert( input['feature']['style'] === 'french' );
            assert( result === true );
        });

        it( 'returns true when Japanese input match the registered patterns', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "template",
                    "patterns" : [ "#{ingredients}でできるレシピおしえて" ]})
                .addSlot("ingredients", ["じゃがいも", "ナス"])
                .build();
            const input = {"text" : "ナスでできるレシピおしえて"};
            const handler = new IntentHandler(config.intent(0), config.slots());
            const result = handler.match(input);
            assert( input['feature']['ingredients'] === 'ナス' );
            assert( result === true );
        });

        it( 'when registered two patterns, match meta pattern', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "template",
                    "patterns" : [ "#{ingredients}" ]})
                .addIntent("Search with !", {
                    "type" : "template",
                    "patterns" : [ "#{ingredients}!" ]})
                .addSlot("ingredients", ["potato", "eggplant"])
                .build();
            const detector = new IntentDetector(config);
            let result = detector.match({"text" : "potato!"});
            assert( result["match"] === "Search with ingredients" );

            result = detector.match({"text" : "potato"});
            assert( result["match"] === "Search with ingredients" );
        });
    });

    describe( '#match with ignoreSpace option', () => {
        it( 'returns true when Japanese input includes spaces match the registered patterns', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "template",
                    "options": "ignoreSpace",
                    "patterns" : [ "#{ingredients} で できるレシピおしえて" ]})
                .addSlot("ingredients", ["じゃがいも", "ナス"])
                .build();
            const input = {"text" : "ナスでできる レシピ おしえて"};
            const handler = new IntentHandler(config.intent(0), config.slots());
            const result = handler.match(input);
            assert( input['feature']['ingredients'] === 'ナス' );
            assert( result === true );
        });
    });

    describe( '#match with exactMatch option', () => {
        it( 'when registered two patterns, match exact pattern', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "template",
                    "options": ["ignoreSpace", "exactMatch"],
                    "patterns" : [ "#{ingredients}" ]})
                .addIntent("Search with !", {
                    "type" : "template",
                    "options": "exactMatch",
                    "patterns" : [ "#{ingredients}!" ]})
                .addSlot("ingredients", ["potato", "eggplant"])
                .build();
            const detector = new IntentDetector(config);
            let result = detector.match({"text" : "potato!"});
            assert( result["match"] === "Search with !" );

            result = detector.match({"text" : "potato"});
            assert( result["match"] === "Search with ingredients" );
        });
    });

    describe( '#match with SlotAlias', () => {
        it( 'returns true when input includes slot alias match the registered patterns', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Search with ingredients", {
                    "type" : "template",
                    "patterns" : [ "#{shokuzai}でできるレシピおしえて" ],
                    "slotAlias": { shokuzai: 'ingredients' },
                })
                .addSlot("ingredients", ["じゃがいも", "ナス"])
                .build();
            const input = {"text" : "ナスでできるレシピおしえて"};
            const handler = new IntentHandler(config.intent(0), config.slots());
            const result = handler.match(input);
            assert( input['feature']['shokuzai'] === 'ナス' );
            assert( result === true );
        });
    });
});
