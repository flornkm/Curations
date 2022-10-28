/**
 * Robustly extracts the notion page ID from a notion URL or pathname suffix.
 *
 * Defaults to returning a UUID (with dashes).
 */
export declare const parsePageId: (id?: string | null, { uuid }?: {
    uuid?: boolean;
}) => string;
//# sourceMappingURL=parse-page-id.d.ts.map