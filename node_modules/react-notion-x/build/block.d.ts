import * as React from 'react';
import * as types from 'notion-types';
interface BlockProps {
    block: types.Block;
    level: number;
    className?: string;
    bodyClassName?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    pageHeader?: React.ReactNode;
    pageFooter?: React.ReactNode;
    pageTitle?: React.ReactNode;
    pageAside?: React.ReactNode;
    pageCover?: React.ReactNode;
    hideBlockId?: boolean;
    disableHeader?: boolean;
    children?: React.ReactNode;
}
export declare const Block: React.FC<BlockProps>;
export {};
//# sourceMappingURL=block.d.ts.map