import React from "react";
import { UnionOf } from "unionize";
/**
 * Valid props for LazyImage components
 */
export declare type CommonLazyImageProps = ImageProps & {
    /** Whether to skip checking for viewport and always show the 'actual' component
     * @see https://github.com/fpapado/react-lazy-images/#eager-loading--server-side-rendering-ssr
     */
    loadEagerly?: boolean;
    /** Subset of props for the IntersectionObserver
     * @see https://github.com/thebuilder/react-intersection-observer#props
     */
    observerProps?: ObserverProps;
    /** Use the Image Decode API;
     * The call to a new HTML <img> element’s decode() function returns a promise, which,
     * when fulfilled, ensures that the image can be appended to the DOM without causing
     * a decoding delay on the next frame.
     *  @see: https://www.chromestatus.com/feature/5637156160667648
     */
    experimentalDecode?: boolean;
    /** Whether to log out internal state transitions for the component */
    debugActions?: boolean;
    /** Delay a certain duration before starting to load, in ms.
     * This can help avoid loading images while the user scrolls quickly past them.
     * TODO: naming things.
     */
    debounceDurationMs?: number;
};
/** Valid props for LazyImageFull */
export interface LazyImageFullProps extends CommonLazyImageProps {
    /** Children should be either a function or a node */
    children: (args: RenderCallbackArgs) => React.ReactNode;
}
/** Values that the render props take */
export interface RenderCallbackArgs {
    imageState: ImageState;
    imageProps: ImageProps;
    /** When not loading eagerly, a ref to bind to the DOM element. This is needed for the intersection calculation to work. */
    ref?: React.RefObject<any>;
}
export interface ImageProps {
    /** The source of the image to load */
    src: string;
    /** The source set of the image to load */
    srcSet?: string;
    /** The alt text description of the image you are loading */
    alt?: string;
    /** Sizes descriptor */
    sizes?: string;
}
/** Subset of react-intersection-observer's props */
export interface ObserverProps {
    /**
     * Margin around the root that expands the area for intersection.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
     * @default "50px 0px"
     * @example Declaration same as CSS margin:
     *  `"10px 20px 30px 40px"` (top, right, bottom, left).
     */
    rootMargin?: string;
    /** Number between 0 and 1 indicating the the percentage that should be
     * visible before triggering.
     * @default `0.01`
     */
    threshold?: number;
}
/** States that the image loading can be in.
 * Used together with LazyImageFull render props.
 * External representation of the internal state.
 * */
export declare enum ImageState {
    NotAsked = "NotAsked",
    Buffering = "Buffering",
    Loading = "Loading",
    LoadSuccess = "LoadSuccess",
    LoadError = "LoadError"
}
/** The component's state */
declare const LazyImageFullState: import("unionize").Unionized<{
    NotAsked: {};
    Buffering: {};
    Loading: {};
    LoadSuccess: {};
    LoadError: {
        msg: string;
    };
}, import("unionize").MultiValueVariants<{
    NotAsked: {};
    Buffering: {};
    Loading: {};
    LoadSuccess: {};
    LoadError: {
        msg: string;
    };
}, "tag">, "tag">;
declare type LazyImageFullState = UnionOf<typeof LazyImageFullState>;
/** Actions that change the component's state.
 * These are not unlike Actions in Redux or, the ones I'm inspired by,
 * Msg in Elm.
 */
declare const Action: import("unionize").Unionized<{
    ViewChanged: {
        inView: boolean;
    };
    BufferingEnded: {};
    LoadSuccess: {};
    LoadError: {
        msg: string;
    };
}, import("unionize").MultiValueVariants<{
    ViewChanged: {
        inView: boolean;
    };
    BufferingEnded: {};
    LoadSuccess: {};
    LoadError: {
        msg: string;
    };
}, "tag">, "tag">;
declare type Action = UnionOf<typeof Action>;
/** Commands (Cmd) describe side-effects as functions that take the instance */
declare type Cmd = (instance: LazyImageFull) => void;
/** The output from a reducer is the next state and maybe a command */
declare type ReducerResult = {
    nextState: LazyImageFullState;
    cmd?: Cmd;
};
/**
 * Component that preloads the image once it is in the viewport,
 * and then swaps it in. Takes a render prop that allows to specify
 * what is rendered based on the loading state.
 */
export declare class LazyImageFull extends React.Component<LazyImageFullProps, LazyImageFullState> {
    static displayName: string;
    /** A central place to store promises.
     * A bit silly, but passing promsises directly in the state
     * was giving me weird timing issues. This way we can keep
     * the promises in check, and pick them up from the respective methods.
     * FUTURE: Could pass the relevant key in Buffering and Loading, so
     * that at least we know where they are from a single source.
     */
    promiseCache: {
        [key: string]: CancelablePromise | Promise<void>;
    };
    initialState: {
        tag: "NotAsked";
    } | {
        tag: "Buffering";
    } | {
        tag: "Loading";
    } | {
        tag: "LoadSuccess";
    } | ({
        tag: "LoadError";
    } & {
        msg: string;
    });
    /** Emit the next state based on actions.
     *  This is the core of the component!
     */
    static reducer(action: Action, prevState: LazyImageFullState, props: LazyImageFullProps): ReducerResult;
    constructor(props: LazyImageFullProps);
    update(action: Action): void;
    render(): {} | null | undefined;
}
interface CancelablePromise {
    promise: Promise<{}>;
    cancel: () => void;
}
export {};
