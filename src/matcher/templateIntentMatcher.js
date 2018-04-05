import IntentMatcher from "./intentMatcher"

export class Template {
    constructor(elements, slotNames) {
        this.slotNames = slotNames;
        this.regexp = new RegExp(elements.join(""));
    }
}

const defaultOptions = {
  exact_match: false,
  ignore_space: false
};

/**
 * A template based matcher. This object is used as if Alexa style input matching.
 */
export default class TemplateIntentMatcher extends IntentMatcher {
    constructor(config, slot) {
        super(config);
        this.slot = slot;
        this.options = Object.assign({}, defaultOptions);
        if (config.options) {
          const userOptions = config.options.split(' ');
          Object.keys(this.options).forEach((k) => {
            if(userOptions.includes(k)) { this.options[k] = true }
          })
        }
        this.templates = this._generateTemplates(config["patterns"]);
    }

    _generateTemplates(patterns) {
        const templates = [];
        for (const pattern of patterns) {
            templates.push(this._generateTemplate(pattern));
        }
        return templates;
    }

    _generateTemplate(pattern) {
        const results = this._extractElements(pattern);
        let elements = results.elements;
        if (this.options.exact_match) {
          elements = ['^']
          results.elements.forEach((e) => elements.push(e))
          elements.push('$')
        }
        if (this.options.ignore_space) {
          elements.forEach((e, i) => elements[i] = e.replace(/\s/g, ''))
        }
        return this._newTemplate(elements, results.slotNames);
    }

    _newTemplate(elements, slotNames) {
      return new Template(elements, slotNames);
    }

    _extractElements(pattern) {
        let startPosition = 0;
        let endPosition = 0;
        const elements = [];
        const slotNames = [];
        let inBrace = false;
        while (endPosition < pattern.length) {
            if (!inBrace) {
                endPosition = pattern.indexOf("#{", startPosition);
                if (endPosition === -1) { // no brace
                    elements.push(pattern.substring(startPosition, pattern.length));
                    break;
                }
                elements.push(pattern.substring(startPosition, endPosition));
                inBrace = true;
            } else { // found slot
                endPosition = pattern.indexOf("}", startPosition);
                const slotName = pattern.substring(startPosition + 1, endPosition);
                elements.push(`(${this.slot[slotName].join("|")})`);
                slotNames.push(slotName);
                inBrace = false;
            }

            if (endPosition < 0) {
                break;
            }
            startPosition = endPosition + 1;
        }
        return { elements, slotNames} ;
    }

    textMatch(input) {
        input["feature"] = {};
        for (const template of this.templates) {
            let text = input["text"];
            if (this.options.ignore_space) {
              text = text.replace(/\s/g, '')
            }
            const results = text.match(template.regexp);
            if (results === null) {
                continue;
            }
            for (let i = 1 ; i < results.length ; i++){ //skip first element since match results contain whole input sentence
                const slotName = template.slotNames[i-1];
                if(input["feature"][slotName]) {
                    let data = input["feature"][slotName];
                    if(!Array.isArray(data)) { data = [data] }
                    data.push(results[i]);
                    input["feature"][slotName] = data;
                } else {
                    input["feature"][slotName] = results[i];
                }
            }
            return true;
        }
        return false;
    }
}
