import * as types from 'notion-types';
export interface EvalFormulaContext {
    properties: types.PropertyMap;
    schema: types.CollectionPropertySchemaMap;
    endDate?: boolean;
}
/**
 * Evaluates a Notion formula expression to a result value.
 *
 * All built-in functions and operators are supported.
 *
 * NOTE: this needs a lot more testing, especially around covering all the different
 * function types and coercing different property values correctly.
 *
 * It does work for many of our test cases, however.
 *
 * @param formula - Formula to evaluate.
 * @param context - Collection context containing property schema and values.
 */
export declare function evalFormula(formula: types.Formula, context: EvalFormulaContext): types.FormulaResult;
//# sourceMappingURL=eval-formula.d.ts.map