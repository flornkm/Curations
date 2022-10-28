import * as React from 'react';
import { ExtendedRecordMap } from 'notion-types';
import { MapImageUrlFn, MapPageUrlFn, NotionComponents, SearchNotionFn } from './types';
export interface NotionContext {
    recordMap: ExtendedRecordMap;
    components: NotionComponents;
    mapPageUrl: MapPageUrlFn;
    mapImageUrl: MapImageUrlFn;
    searchNotion?: SearchNotionFn;
    isShowingSearch?: boolean;
    onHideSearch?: () => void;
    rootPageId?: string;
    rootDomain?: string;
    fullPage: boolean;
    darkMode: boolean;
    previewImages: boolean;
    forceCustomImages: boolean;
    showCollectionViewDropdown: boolean;
    showTableOfContents: boolean;
    minTableOfContentsItems: number;
    linkTableTitleProperties: boolean;
    isLinkCollectionToUrlProperty: boolean;
    defaultPageIcon?: string;
    defaultPageCover?: string;
    defaultPageCoverPosition?: number;
    zoom: any;
}
export interface PartialNotionContext {
    recordMap?: ExtendedRecordMap;
    components?: Partial<NotionComponents>;
    mapPageUrl?: MapPageUrlFn;
    mapImageUrl?: MapImageUrlFn;
    searchNotion?: SearchNotionFn;
    isShowingSearch?: boolean;
    onHideSearch?: () => void;
    rootPageId?: string;
    rootDomain?: string;
    fullPage?: boolean;
    darkMode?: boolean;
    previewImages?: boolean;
    forceCustomImages?: boolean;
    showCollectionViewDropdown?: boolean;
    linkTableTitleProperties?: boolean;
    isLinkCollectionToUrlProperty?: boolean;
    showTableOfContents?: boolean;
    minTableOfContentsItems?: number;
    defaultPageIcon?: string;
    defaultPageCover?: string;
    defaultPageCoverPosition?: number;
    zoom?: any;
}
export declare const dummyLink: ({ href, rel, target, title, ...rest }: {
    [x: string]: any;
    href: any;
    rel: any;
    target: any;
    title: any;
}) => JSX.Element;
export declare const NotionContextProvider: React.FC<PartialNotionContext>;
export declare const NotionContextConsumer: React.Consumer<NotionContext>;
export declare const useNotionContext: () => NotionContext;
//# sourceMappingURL=context.d.ts.map