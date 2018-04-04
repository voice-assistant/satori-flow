import TemplateIntentMatcher from "./templateIntentMatcher"

export default class VerbatimTemplateIntentMatcher extends TemplateIntentMatcher {
  _generateTemplate(pattern) {
      const results = this._extractElements(pattern);
      const elements = ['^\\s*']
      results.elements.forEach((e) => elements.push(e))
      elements.push('\\s*$')
      return this._newTemplate(elements, results.slotNames);
  }
}
