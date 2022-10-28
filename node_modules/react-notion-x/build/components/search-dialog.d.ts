import * as React from 'react';
import * as types from 'notion-types';
export declare class SearchDialog extends React.Component<{
    isOpen: boolean;
    rootBlockId: string;
    onClose: () => void;
    searchNotion: (params: types.SearchParams) => Promise<types.SearchResults>;
}> {
    constructor(props: any);
    state: {
        isLoading: boolean;
        query: string;
        searchResult: any;
        searchError: any;
    };
    _inputRef: any;
    _search: any;
    componentDidMount(): void;
    render(): JSX.Element;
    _onAfterOpen: () => void;
    _onChangeQuery: (e: any) => void;
    _onClearQuery: () => void;
    _warmupSearch: () => Promise<void>;
    _searchImpl: () => Promise<void>;
}
//# sourceMappingURL=search-dialog.d.ts.map