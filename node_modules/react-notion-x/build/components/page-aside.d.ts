import * as React from 'react';
import { TableOfContentsEntry } from 'notion-utils';
export declare const PageAside: React.FC<{
    toc: Array<TableOfContentsEntry>;
    activeSection: string | null;
    setActiveSection: (activeSection: string | null) => unknown;
    hasToc: boolean;
    hasAside: boolean;
    pageAside?: React.ReactNode;
    className?: string;
}>;
//# sourceMappingURL=page-aside.d.ts.map