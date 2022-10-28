import { Block } from './block';
import { Collection } from './collection';
import { CollectionView, CollectionViewType } from './collection-view';
import { Decoration, ID, PropertyType, Role } from './core';
import { User } from './user';
export interface NotionMap<T> {
    [key: string]: {
        role: Role;
        value: T;
    };
}
export declare type BlockMap = NotionMap<Block>;
export declare type UserMap = NotionMap<User>;
export declare type CollectionMap = NotionMap<Collection>;
export declare type CollectionViewMap = NotionMap<CollectionView>;
export interface PropertyMap {
    [key: string]: Decoration[];
}
export interface RecordMap {
    block: BlockMap;
    collection?: CollectionMap;
    collection_view?: CollectionViewMap;
    notion_user?: UserMap;
}
export interface ExtendedRecordMap extends RecordMap {
    collection: CollectionMap;
    collection_view: CollectionViewMap;
    notion_user: UserMap;
    collection_query: {
        [collectionId: string]: {
            [collectionViewId: string]: CollectionQueryResult;
        };
    };
    signed_urls: {
        [blockId: string]: string;
    };
    preview_images?: PreviewImageMap;
}
export interface PageChunk {
    recordMap: RecordMap;
    cursor: {
        stack: any[];
    };
}
export interface CollectionInstance {
    recordMap: RecordMap;
    result: CollectionQueryResult;
}
export interface CollectionQueryResult {
    type: CollectionViewType;
    total: number;
    blockIds: ID[];
    aggregationResults: Array<AggregationResult>;
    groupResults?: Array<{
        value: AggregationResult;
        blockIds: ID[];
        total: number;
        aggregationResult: AggregationResult;
    }>;
    collection_group_results?: {
        type: string;
        blockIds: ID[];
        hasMore: boolean;
    };
}
export interface AggregationResult {
    type: PropertyType;
    value: any;
}
export interface PageMap {
    [pageId: string]: ExtendedRecordMap | null;
}
export interface PreviewImage {
    originalWidth: number;
    originalHeight: number;
    dataURIBase64: string;
}
export interface PreviewImageMap {
    [url: string]: PreviewImage | null;
}
//# sourceMappingURL=maps.d.ts.map