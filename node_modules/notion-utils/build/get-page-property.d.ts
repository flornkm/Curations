import { Block, ExtendedRecordMap } from 'notion-types';
/**
 * Gets the value of a collection property for a given page (collection item).
 *
 * @param propertyName property name
 * @param block Page block, often be first block in blockMap
 * @param recordMap
 * @returns - The return value types will follow the following principles:
 *  1. if property is date type, it will return `number` or `number[]`(depends on `End Date` switch)
 *  2. property is text-like will return `string`
 *  3. multi select property will return `string[]`
 *  4. checkbox property return `boolean`
 * @todo complete all no-text property type
 */
export declare function getPageProperty<T = string | number | boolean | string[] | number[]>(propertyName: string, block: Block, recordMap: ExtendedRecordMap): T;
//# sourceMappingURL=get-page-property.d.ts.map