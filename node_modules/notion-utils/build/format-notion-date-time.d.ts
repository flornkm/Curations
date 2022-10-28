export interface NotionDateTime {
    type: 'datetime';
    start_date: string;
    start_time?: string;
    time_zone?: string;
}
export declare const formatNotionDateTime: (datetime: NotionDateTime) => string;
//# sourceMappingURL=format-notion-date-time.d.ts.map