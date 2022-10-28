import { PropertyID } from './core';
export declare type FormulaType = 'constant' | 'property' | 'operator' | 'function' | 'symbol';
export declare type FormulaConstantType = 'e' | 'false' | 'true' | 'pi';
export declare type FormulaValueType = 'string' | 'number' | 'boolean' | 'date' | FormulaConstantType;
export declare type FormulaResult = string | number | boolean | Date;
export declare type FormulaResultType = 'text' | 'number' | 'boolean' | 'date' | 'checkbox';
export declare type FormulaOperatorType = '-' | '*' | '%' | '/' | '+' | '!=' | '<=' | '==' | '>' | '<' | '>=';
export declare type FormulaFunctionType = 'and' | 'empty' | 'equal' | 'if' | 'larger' | 'largerEq' | 'not' | 'or' | 'smaller' | 'smallerEq' | 'unequal' | 'abs' | 'add' | 'cbrt' | 'ceil' | 'divide' | 'exp' | 'floor' | 'ln' | 'log10' | 'log2' | 'max' | 'min' | 'mod' | 'multiply' | 'pow' | 'round' | 'sign' | 'sqrt' | 'subtract' | 'toNumber' | 'unaryMinus' | 'unaryPlus' | 'concat' | 'contains' | 'format' | 'join' | 'length' | 'replace' | 'replaceAll' | 'slice' | 'test' | 'date' | 'dateAdd' | 'dateBetween' | 'dateSubtract' | 'day' | 'end' | 'formatDate' | 'fromTimestamp' | 'hour' | 'minute' | 'month' | 'now' | 'start' | 'timestamp' | 'year';
export interface BaseFormula {
    type: FormulaType;
    result_type: FormulaResultType;
}
export interface ConstantFormula extends BaseFormula {
    type: 'constant';
    value: any;
    value_type: FormulaValueType;
}
export interface PropertyFormula extends BaseFormula {
    type: 'property';
    id: PropertyID;
    name: string;
}
export interface SymbolFormula extends BaseFormula {
    type: 'symbol';
    name: string;
}
export interface FunctionFormula extends BaseFormula {
    type: 'function';
    name: FormulaFunctionType;
    args: Array<Formula>;
}
export interface OperatorFormula extends BaseFormula {
    type: 'operator';
    operator: FormulaOperatorType;
    name: FormulaFunctionType;
    args: Array<Formula>;
}
export declare type Formula = FunctionFormula | OperatorFormula | ConstantFormula | PropertyFormula | SymbolFormula;
//# sourceMappingURL=formula.d.ts.map