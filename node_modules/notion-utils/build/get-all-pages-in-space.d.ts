import { ExtendedRecordMap, PageMap } from 'notion-types';
/**
 * Performs a traversal over a given Notion workspace starting from a seed page.
 *
 * Returns a map containing all of the pages that are reachable from the seed
 * page in the space.
 *
 * If `rootSpaceId` is not defined, the space ID of the root page will be used
 * to scope traversal.
 *
 *
 * @param rootPageId - Page ID to start from.
 * @param rootSpaceId - Space ID to scope traversal.
 * @param getPage - Function used to fetch a single page.
 * @param opts - Optional config
 */
export declare function getAllPagesInSpace(rootPageId: string, rootSpaceId: string | undefined, getPage: (pageId: string) => Promise<ExtendedRecordMap>, { concurrency, traverseCollections, targetPageId }?: {
    concurrency?: number;
    traverseCollections?: boolean;
    targetPageId?: string;
}): Promise<PageMap>;
//# sourceMappingURL=get-all-pages-in-space.d.ts.map