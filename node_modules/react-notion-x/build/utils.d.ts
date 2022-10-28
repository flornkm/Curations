import { BlockMap } from 'notion-types';
export { isUrl, formatDate, formatNotionDateTime } from 'notion-utils';
export * from './map-image-url';
export * from './map-page-url';
export declare const cs: (...classes: Array<string | undefined | false>) => string;
export declare const getListNumber: (blockId: string, blockMap: BlockMap) => number;
export declare const getHashFragmentValue: (url: string) => string;
export declare const isBrowser: boolean;
export declare const getYoutubeId: (url: string) => string | null;
//# sourceMappingURL=utils.d.ts.map