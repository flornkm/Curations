import * as React from 'react';
import * as types from 'notion-types';
export interface IPropertyProps {
    propertyId?: string;
    schema?: types.CollectionPropertySchema;
    data?: types.Decoration[];
    block?: types.Block;
    collection?: types.Collection;
    inline?: boolean;
    linkToTitlePage?: boolean;
    pageHeader?: boolean;
}
/**
 * Renders a single value of structured Notion data according to its schema.
 *
 * This corresponds to rendering the content of a single cell in a table.
 * Property rendering is re-used across all the different types of collection views.
 */
export declare const Property: React.FC<IPropertyProps>;
export declare const PropertyImpl: React.FC<IPropertyProps>;
export declare const PropertyImplMemo: React.NamedExoticComponent<IPropertyProps>;
//# sourceMappingURL=property.d.ts.map