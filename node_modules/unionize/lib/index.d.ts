export declare type Unionized<Record, TaggedRecord, TagProp extends string> = UnionTypes<Record, TaggedRecord> & Creators<Record, TaggedRecord, TagProp> & UnionExtensions<Record, TaggedRecord>;
export interface UnionTypes<Record, TaggedRecord> {
    _Tags: keyof TaggedRecord;
    _Record: Record;
    _Union: TaggedRecord[keyof TaggedRecord];
}
export interface UnionExtensions<Record, TaggedRecord> {
    is: Predicates<TaggedRecord>;
    as: Casts<Record, TaggedRecord[keyof TaggedRecord]>;
    match: Match<Record, TaggedRecord[keyof TaggedRecord]>;
    transform: Transform<Record, TaggedRecord[keyof TaggedRecord]>;
}
export declare type TagsOf<U extends UnionTypes<any, any>> = U['_Tags'];
export declare type RecordOf<U extends UnionTypes<any, any>> = U['_Record'];
export declare type UnionOf<U extends UnionTypes<any, any>> = U['_Union'];
export declare type Creators<Record, TaggedRecord, TagProp extends string> = {
    [T in keyof Record]: {} extends UnTagged<Record[T], TagProp> ? ((value?: {}) => TaggedRecord[keyof TaggedRecord]) : ((value: UnTagged<Record[T], TagProp>) => TaggedRecord[keyof TaggedRecord]);
};
export declare type Predicates<TaggedRecord> = {
    [T in keyof TaggedRecord]: (variant: TaggedRecord[keyof TaggedRecord]) => variant is TaggedRecord[T];
};
export declare type Casts<Record, Union> = {
    [T in keyof Record]: (variant: Union) => Record[T];
};
export declare type Cases<Record, A> = {
    [T in keyof Record]: (value: Record[T]) => A;
};
export declare type MatchCases<Record, Union, A> = (Cases<Record, A> & NoDefaultProp) | (Partial<Cases<Record, A>> & {
    default: (variant: Union) => A;
});
export interface Match<Record, Union> {
    <A>(cases: MatchCases<Record, Union, A>): (variant: Union) => A;
    <A>(variant: Union, cases: MatchCases<Record, Union, A>): A;
}
export declare type TransformCases<Record, Union> = Partial<{
    [T in keyof Record]: (value: Record[T]) => Union;
}>;
export interface Transform<Record, Union> {
    (cases: TransformCases<Record, Union>): (variant: Union) => Union;
    (variant: Union, cases: TransformCases<Record, Union>): Union;
}
export declare type MultiValueVariants<Record extends MultiValueRec, TagProp extends string> = {
    [T in keyof Record]: Record[T] extends {
        [_ in TagProp]: T;
    } ? Record[T] : {
        [_ in TagProp]: T;
    } & Record[T];
};
export declare type UnTagged<Record, TagProp extends string = 'tag'> = Record extends any ? Pick<Record, Exclude<keyof Record, TagProp>> : never;
export declare type SingleValueVariants<Record extends SingleValueRec, TagProp extends string, ValProp extends string> = {
    [T in keyof Record]: {
        [_ in TagProp]: T;
    } & {
        [_ in ValProp]: Record[T];
    };
};
export interface NoDefaultProp {
    default?: never;
}
export declare type SingleValueRec = NoDefaultRec<{} | null>;
export declare type MultiValueRec = NoDefaultRec<{
    [tag: string]: any;
}>;
export declare type NoDefaultRec<Val> = {
    [k: string]: Val;
} & NoDefaultProp;
/**
 * Create a tagged union from a record mapping tags to value types, along with associated
 * variant constructors, type predicates and `match` function.
 *
 * @param record A record mapping tags to value types. The actual values of the record don't
 * matter; they're just used in the types of the resulting tagged union. See `ofType`.
 * @param config An optional config object. By default tag='tag' and value is merged into object itself
 * @param config.tag An optional custom name for the tag property of the union.
 * @param config.value An optional custom name for the value property of the union. If not specified,
 * the value must be a dictionary type.
 */
export declare function unionize<Record extends SingleValueRec, ValProp extends string, TagProp extends string = 'tag'>(record: Record, config: {
    value: ValProp;
    tag?: TagProp;
}): Unionized<Record, SingleValueVariants<Record, TagProp, ValProp>, TagProp>;
export declare function unionize<Record extends MultiValueRec, TagProp extends string = 'tag'>(record: Record, config?: {
    tag: TagProp;
}): Unionized<Record, MultiValueVariants<Record, TagProp>, TagProp>;
/**
 * Creates a pseudo-witness of a given type. That is, it pretends to return a value of
 * type `T` for any `T`, but it's really just returning `undefined`. This white lie
 * allows convenient expression of the value types in the record you pass to `unionize`.
 */
export declare const ofType: <T>() => T;
export default unionize;
