import assert  from 'power-assert';
import DialogueManager from "../src/dialogueManager";
import ConfigurationBuilder from "../src/configuration_builder";

describe( 'DialogueManager', () => {
    describe ('#reply', () => {
        it( 'returns result containing matched handler name when input match an intent', () => {
            const config = new ConfigurationBuilder()
                .addIntent("repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
                .addRunner("repeat", {"type" : "random", "list" : ["sure"]} )
                .build();

            const manager = new DialogueManager(config);
            const result = manager.reply({"text" : "please repeat again"});
            assert(result === "sure");
        });

        it( 'returns default result when input does not match any intent', () => {
            const config = new ConfigurationBuilder()
                .addIntent("repeat", { "type" : "verbatim", "patterns" : [ "repeat", "please repeat" ]})
                .addRunner("repeat", {"type" : "random", "list" : ["sure"]} )
                .addRunner("default", {"type" : "random", "list" : ["Sorry I do not understand what you say"]} )
                .build();

            const manager = new DialogueManager(config);
            const result = manager.reply({"text" : "please speak more"});
            assert(result === "Sorry I do not understand what you say");
        });
    });
});
