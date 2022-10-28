import * as notion from 'notion-types';
import { OptionsOfJSONResponseBody } from 'got';
import * as types from './types';
/**
 * Main Notion API client.
 */
export declare class NotionAPI {
    private readonly _apiBaseUrl;
    private readonly _authToken?;
    private readonly _activeUser?;
    private readonly _userTimeZone;
    constructor({ apiBaseUrl, authToken, activeUser, userTimeZone }?: {
        apiBaseUrl?: string;
        authToken?: string;
        userLocale?: string;
        userTimeZone?: string;
        activeUser?: string;
    });
    getPage(pageId: string, { concurrency, fetchMissingBlocks, fetchCollections, signFileUrls, chunkLimit, chunkNumber, gotOptions }?: {
        concurrency?: number;
        fetchMissingBlocks?: boolean;
        fetchCollections?: boolean;
        signFileUrls?: boolean;
        chunkLimit?: number;
        chunkNumber?: number;
        gotOptions?: OptionsOfJSONResponseBody;
    }): Promise<notion.ExtendedRecordMap>;
    addSignedUrls({ recordMap, contentBlockIds, gotOptions }: {
        recordMap: notion.ExtendedRecordMap;
        contentBlockIds?: string[];
        gotOptions?: OptionsOfJSONResponseBody;
    }): Promise<void>;
    getPageRaw(pageId: string, { gotOptions, chunkLimit, chunkNumber }?: {
        chunkLimit?: number;
        chunkNumber?: number;
        gotOptions?: OptionsOfJSONResponseBody;
    }): Promise<notion.PageChunk>;
    getCollectionData(collectionId: string, collectionViewId: string, collectionView: any, { limit, searchQuery, userTimeZone, loadContentCover, gotOptions }?: {
        type?: notion.CollectionViewType;
        limit?: number;
        searchQuery?: string;
        userTimeZone?: string;
        userLocale?: string;
        loadContentCover?: boolean;
        gotOptions?: OptionsOfJSONResponseBody;
    }): Promise<notion.CollectionInstance>;
    getUsers(userIds: string[], gotOptions?: OptionsOfJSONResponseBody): Promise<notion.RecordValues<notion.User>>;
    getBlocks(blockIds: string[], gotOptions?: OptionsOfJSONResponseBody): Promise<notion.PageChunk>;
    getSignedFileUrls(urls: types.SignedUrlRequest[], gotOptions?: OptionsOfJSONResponseBody): Promise<types.SignedUrlResponse>;
    search(params: notion.SearchParams, gotOptions?: OptionsOfJSONResponseBody): Promise<notion.SearchResults>;
    fetch<T>({ endpoint, body, gotOptions, headers: clientHeaders }: {
        endpoint: string;
        body: object;
        gotOptions?: OptionsOfJSONResponseBody;
        headers?: any;
    }): Promise<T>;
}
//# sourceMappingURL=notion-api.d.ts.map