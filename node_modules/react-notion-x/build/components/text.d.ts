import * as React from 'react';
import { Block, Decoration } from 'notion-types';
/**
 * Renders a single piece of Notion text, including basic rich text formatting.
 *
 * These represent the innermost leaf nodes of a Notion subtree.
 *
 * TODO: I think this implementation would be more correct if the reduce just added
 * attributes to the final element's style.
 */
export declare const Text: React.FC<{
    value: Decoration[];
    block: Block;
    linkProps?: any;
    linkProtocol?: string;
    inline?: boolean;
}>;
//# sourceMappingURL=text.d.ts.map