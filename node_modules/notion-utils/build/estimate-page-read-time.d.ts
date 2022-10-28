import { Block, ExtendedRecordMap } from 'notion-types';
declare type EstimatePageReadTimeOptions = {
    wordsPerMinute?: number;
    imageReadTimeInSeconds?: number;
};
declare type ContentStats = {
    numWords: number;
    numImages: number;
};
declare type PageReadTimeEstimate = ContentStats & {
    totalWordsReadTimeInMinutes: number;
    totalImageReadTimeInMinutes: number;
    totalReadTimeInMinutes: number;
};
/**
 * Returns an estimate for the time it would take for a person to read the content
 * in the given Notion page.
 *
 * Uses Medium for inspiration.
 *
 * @see https://blog.medium.com/read-time-and-you-bc2048ab620c
 * @see https://github.com/ngryman/reading-time
 *
 * TODO: handle non-english content.
 */
export declare function estimatePageReadTime(block: Block, recordMap: ExtendedRecordMap, { wordsPerMinute, imageReadTimeInSeconds }?: EstimatePageReadTimeOptions): PageReadTimeEstimate;
/**
 * Same as `estimatePageReadTime`, except it returns the total time estimate as
 * a human-readable string.
 *
 * For example, "9 minutes" or "less than a minute".
 */
export declare function estimatePageReadTimeAsHumanizedString(block: Block, recordMap: ExtendedRecordMap, opts: EstimatePageReadTimeOptions): string;
export {};
//# sourceMappingURL=estimate-page-read-time.d.ts.map