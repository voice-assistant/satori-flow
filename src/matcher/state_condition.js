/**
 * StateCondition check if the input status meet the condition.
 */
export default class StateCondition {
    constructor(field, conditionString) {
        this.targetField = field;
        this.conditionString = conditionString;
        this.condition = StateCondition.generateCondition(conditionString);
    }

    /**
     * Check if the input state meet or not.
     * @param state
     * @returns true if state meets predefined condition, otherwise false
     */
    meet(state) {
        let fieldValue = null;
        if (this.targetField in state) {
            fieldValue = state[this.targetField];
        }
        return this.condition(fieldValue);
    }

    // TODO: support more rich conditions such as less than or greater than etc...
    static generateCondition(conditionString) {
        if (conditionString === "null") {
            return function(fieldValue) { return fieldValue === null };
        } else if (conditionString === "not null") {
            return function (fieldValue) { return fieldValue !== null };
        } else {
            return function (fieldValue) { return this.conditionString.includes(fieldValue) };
        }
    }
}
