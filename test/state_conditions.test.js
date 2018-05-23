import assert  from 'power-assert';
import StateConditions from "../src/matcher/state_conditions";

describe( 'StateConditions', () => {
    describe( '#isMeet', () => {
        it( 'returns true when state meets the registered condition (not null)', () => {
            const config = JSON.parse(`{ "current-recipe" : "not null" }`);
            const state = JSON.parse(`{ "current-recipe" : 1133434 }`);
            const condition = new StateConditions(config);
            assert(condition.isMeet(state) === true);
        });

        it( 'returns true when state meets the registered condition (null)', () => {
            const config = JSON.parse(`{ "sex" : "null" }`);
            const state = JSON.parse(`{ "current-recipe" : 1133434 }`);
            const condition = new StateConditions(config);
            assert(condition.isMeet(state) === true);
        });

        it( 'returns true when state meets the registered condition (verbatim)', () => {
            const config = JSON.parse(`{ "sex" : "male" }`);
            const state = JSON.parse(`{"sex" : "male" }`);
            const condition = new StateConditions(config);
            assert(condition.isMeet(state) === true);
        });

        it( 'returns true when state meets the all the registered condition', () => {
            const config = JSON.parse(`{ "sex" : "male", "current-recipe" : "not null" }`);
            const state = JSON.parse(`{"sex" : "male", "current-recipe" : 1133434  }`);
            const condition = new StateConditions(config);
            assert(condition.isMeet(state) === true);
        });

        it( 'returns false when state does not meet the one condition in multiple conditions', () => {
            const config = JSON.parse(`{ "sex" : "male", "current-recipe" : "not null" }`);
            const state = JSON.parse(`{"sex" : "female", "current-recipe" : 1133434  }`);
            const condition = new StateConditions(config);
            assert(condition.isMeet(state) === false);
        });
    });
});
