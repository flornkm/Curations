import React from "react";
import { CommonLazyImageProps, ImageProps } from "./LazyImageFull";
/**
 * Valid props for LazyImage
 */
export interface LazyImageRenderPropArgs {
    imageProps: ImageProps;
}
export interface RefArg {
    /** When not loading eagerly, a ref to bind to the DOM element. This is needed for the intersection calculation to work. */
    ref?: React.RefObject<any>;
}
export interface LazyImageProps extends CommonLazyImageProps {
    /** Component to display once image has loaded */
    actual: (args: LazyImageRenderPropArgs) => React.ReactElement<{}>;
    /** Component to display while image has not been requested
     * @default: undefined
     */
    placeholder: (args: LazyImageRenderPropArgs & RefArg) => React.ReactElement<{}>;
    /** Component to display while the image is loading
     * @default placeholder, if defined
     */
    loading?: () => React.ReactElement<{}>;
    /** Component to display if the image fails to load
     * @default actual (broken image)
     */
    error?: () => React.ReactElement<{}>;
}
/**
 * Component that preloads the image once it is in the viewport,
 * and then swaps it in. Has predefined rendering logic, but the
 * specifics are up to the caller.
 */
export declare const LazyImage: React.StatelessComponent<LazyImageProps>;
