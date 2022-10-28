import * as React from 'react';
import * as types from 'notion-types';
import { SearchNotionFn } from '../types';
export declare const Header: React.FC<{
    block: types.CollectionViewPageBlock | types.PageBlock;
}>;
export declare const Breadcrumbs: React.FC<{
    block: types.Block;
    rootOnly?: boolean;
}>;
export declare const Search: React.FC<{
    block: types.Block;
    search?: SearchNotionFn;
    title?: React.ReactNode;
}>;
//# sourceMappingURL=header.d.ts.map