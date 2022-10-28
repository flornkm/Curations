import * as types from 'notion-types';
/**
 * Gets URLs of all images contained on the given page.
 */
export declare const getPageImageUrls: (recordMap: types.ExtendedRecordMap, { mapImageUrl }: {
    mapImageUrl: (url: string, block: types.Block) => string | null;
}) => string[];
//# sourceMappingURL=get-page-image-urls.d.ts.map