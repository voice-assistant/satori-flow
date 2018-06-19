import assert  from 'power-assert';
import Configuration from "../src/configuration";
import ConfigurationBuilder from "../src/configuration_builder";

describe( 'Configuration', () => {
    describe( '#constructor', () => {
        it( 'loads configuration string', () => {
            const config = new Configuration(
                `{ 
                  "intents": [ 
                    {
                      "name": "Repeat",
                      "match" : {
                        "type" : "verbatim",
                        "patterns" : [ "もう一度", "もう一度教えて" ]
                      }
                    }
                  ],
                  "table": {"type": "redis"}
                }`);
            assert(config.intent(0).name === "Repeat");
            assert(config.intent(0).match["type"] === "verbatim");
            assert(config.intent(0).match["patterns"].length === 2);
            assert(config.table().type === "redis");
        });
    });

    describe( '#build', () => {
        it( 'can generate Configuration instance containing a intent', () => {
            const config = new ConfigurationBuilder().addIntent("Repeat" , { "type" : "verbatim", "patterns" : [ "もう一度", "もう一度教えて" ]}).build();
            assert(config.intent(0).name === "Repeat");
            assert(config.intent(0).match["type"] === "verbatim");
            assert(config.intent(0).match["patterns"].length === 2);
        });

        it( 'can generate Configuration instance containing multiple intents', () => {
            const config = new ConfigurationBuilder()
                .addIntent("Repeat" , { "type" : "verbatim", "patterns" : [ "もう一度", "もう一度教えて" ]})
                .addIntent("Search" , { "type" : "verbatim", "patterns" : [ "検索して"]})
                .build();

            assert(config.intents().length === 2);
            assert(config.intent(0).name === "Repeat");
            assert(config.intent(0).match["type"] === "verbatim");
            assert(config.intent(0).match["patterns"].length === 2);
            assert(config.intent(1).name === "Search");
            assert(config.intent(1).match["type"] === "verbatim");
            assert(config.intent(1).match["patterns"].length === 1);
        });

        it( 'can generate Configuration instance containing a intent with slot', () => {
            const config = new ConfigurationBuilder().addIntent("Search with ingredient" ,
                {
                    "type" : "template",
                    "patterns" : [ "please give me recipes on #{ingredients}"]
                }).build();

            assert(config.intent(0).name === "Search with ingredient");
            assert(config.intent(0).match["type"] === "template");
            assert(config.intent(0).match["patterns"].length === 1);
        });

        it( 'can generate Configuration instance containing a runner', () => {
            const config = new ConfigurationBuilder().addRunner("nice", {
                "type" : "random",
                "patterns" : ["Nice!", "Congraduration!"]
            }).build();

            assert(config.runner("nice").type === "random");
            assert(config.runner("nice").patterns.length === 2);
        });

    });
} );
