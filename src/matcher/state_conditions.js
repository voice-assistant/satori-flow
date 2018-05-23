import StateCondition from "./state_condition";

/**
 * Set of StateCondition.
 */
export default class StateConditions {
    constructor(config) {
        this.conditions = StateConditions.parseConditions({conditionArray: config});
    }

    /**
     * Check if sentence meets all the conditions.
     * @param state
     * @returns {boolean}
     */
    isMeet(state) {
        for (const cond of this.conditions) {
            if (! cond.meet(state)) {
                return false;
            }
        }
        return true;
    }

    static parseConditions(parameters) {
        const conditionArray = parameters.conditionArray;
        const conditions = [];
        for (const [field, condition] of Object.entries(conditionArray)) {
            conditions.push(new StateCondition(field, condition));
        }
        return conditions;
    }
}
