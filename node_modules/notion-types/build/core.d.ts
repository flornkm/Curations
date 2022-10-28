/** UUID */
export declare type ID = string;
/**
 * Unique identifier for collection properties representing the columns in a
 * traditional relational database.
 *
 * Either a 4-character hash like `o;Os` or `title` as a special, reserved
 * property ID for collection title properties.
 *
 * You can think of `title` properties as primary indexes that are guaranteed
 * to exist as in a traditional database.
 */
export declare type PropertyID = string;
/** Block colors supported by Notion */
export declare type Color = 'gray' | 'brown' | 'orange' | 'yellow' | 'teal' | 'blue' | 'purple' | 'pink' | 'red' | 'gray_background' | 'brown_background' | 'orange_background' | 'yellow_background' | 'teal_background' | 'blue_background' | 'purple_background' | 'pink_background' | 'red_background';
/** Types of structured data supported by Notion collections */
export declare type PropertyType = 'title' | 'text' | 'number' | 'select' | 'multi_select' | 'date' | 'person' | 'file' | 'checkbox' | 'url' | 'email' | 'phone_number' | 'formula' | 'relation' | 'created_time' | 'created_by' | 'last_edited_time' | 'last_edited_by';
/** Types of number formatting supported by Notion */
export declare type NumberFormat = 'number_with_commas' | 'percent' | 'dollar' | 'euro' | 'pound' | 'yen' | 'rupee' | 'won' | 'yuan';
export declare type Role = 'editor' | 'reader' | 'none' | 'read_and_write';
export declare type BoldFormat = ['b'];
export declare type ItalicFormat = ['i'];
export declare type StrikeFormat = ['s'];
export declare type CodeFormat = ['c'];
export declare type UnderlineFormat = ['_'];
export declare type LinkFormat = ['a', string];
export declare type ExternalObjectInstanceFormat = ['eoi', string];
export declare type ColorFormat = ['h', Color];
export declare type UserFormat = ['u', string];
export declare type PageFormat = ['p', string];
export declare type InlineEquationFormat = ['e', string];
export declare type DiscussionFormat = ['m', string];
export declare type ExternalLinkFormat = ['‣', [string, string]];
export declare type DateFormat = ['d', FormattedDate];
export interface FormattedDate {
    type: 'date' | 'daterange' | 'datetime' | 'datetimerange';
    start_date: string;
    start_time?: string;
    end_date?: string;
    end_time?: string;
    date_format?: string;
    time_zone?: string;
}
export declare type SubDecoration = BoldFormat | ItalicFormat | StrikeFormat | CodeFormat | UnderlineFormat | LinkFormat | ColorFormat | DateFormat | UserFormat | InlineEquationFormat | PageFormat | ExternalLinkFormat | DiscussionFormat | ExternalObjectInstanceFormat;
export declare type BaseDecoration = [string];
export declare type AdditionalDecoration = [string, SubDecoration[]];
export declare type Decoration = BaseDecoration | AdditionalDecoration;
//# sourceMappingURL=core.d.ts.map