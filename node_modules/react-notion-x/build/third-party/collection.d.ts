import * as React from 'react';
import * as types from 'notion-types';
import { NotionContext } from '../context';
import { PropertyImplMemo } from './property';
export declare const Collection: React.FC<{
    block: types.CollectionViewBlock | types.CollectionViewPageBlock | types.PageBlock;
    className?: string;
    ctx: NotionContext;
}>;
export { PropertyImplMemo as Property };
//# sourceMappingURL=collection.d.ts.map