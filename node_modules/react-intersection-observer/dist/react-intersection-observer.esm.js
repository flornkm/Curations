import _extends from '@babel/runtime/helpers/esm/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose';
import _inheritsLoose from '@babel/runtime/helpers/esm/inheritsLoose';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import { useState, useEffect, createElement, Component } from 'react';
import invariant from 'invariant';

var INSTANCE_MAP = new Map();
var OBSERVER_MAP = new Map();
/**
 * Monitor element, and trigger callback when element becomes visible
 * @param element {HTMLElement}
 * @param callback {Function} Called with inView
 * @param options {Object} InterSection observer options
 * @param options.threshold {Number} Number between 0 and 1, indicating how much of the element should be visible before triggering
 * @param options.root {HTMLElement} It should have a unique id or data-intersection-id in order for the Observer to reused.
 * @param options.rootMargin {String} The CSS margin to apply to the root element.
 * @param rootId {String} Unique identifier for the root element, to enable reusing the IntersectionObserver
 */

function observe(element, callback, options, rootId) {
  if (options === void 0) {
    options = {};
  }

  // Validate that the element is not being used in another <Observer />
  invariant(!INSTANCE_MAP.has(element), "react-intersection-observer: Trying to observe %s, but it's already being observed by another instance.\nMake sure the `ref` is only used by a single <Observer /> instance.\n\n%s", element); // IntersectionObserver needs a threshold to trigger, so set it to 0 if it's not defined.
  // Modify the options object, since it's used in the onChange handler.

  if (!options.threshold) options.threshold = 0;
  var _options = options,
      root = _options.root,
      rootMargin = _options.rootMargin,
      threshold = _options.threshold;
  if (!element || !callback) return;
  var observerId = rootMargin ? threshold.toString() + "_" + rootMargin : threshold.toString();

  if (root) {
    observerId = rootId ? rootId + "_" + observerId : null;
  }

  var observerInstance = observerId ? OBSERVER_MAP.get(observerId) : null;

  if (!observerInstance) {
    observerInstance = new IntersectionObserver(onChange, options);
    if (observerId) OBSERVER_MAP.set(observerId, observerInstance);
  }

  var instance = {
    callback: callback,
    visible: false,
    options: options,
    observerId: observerId,
    observer: !observerId ? observerInstance : undefined
  };
  INSTANCE_MAP.set(element, instance);
  observerInstance.observe(element);
  return instance;
}
/**
 * Stop observing an element. If an element is removed from the DOM or otherwise destroyed,
 * make sure to call this method.
 * @param element {HTMLElement}
 */

function unobserve(element) {
  if (!element) return;
  var instance = INSTANCE_MAP.get(element);

  if (instance) {
    var observerId = instance.observerId,
        observer = instance.observer;
    var observerInstance = observerId ? OBSERVER_MAP.get(observerId) : observer;

    if (observerInstance) {
      observerInstance.unobserve(element);
    } // Check if we are still observing any elements with the same threshold.


    var itemsLeft = false;

    if (observerId) {
      INSTANCE_MAP.forEach(function (item, key) {
        if (item && item.observerId === observerId && key !== element) {
          itemsLeft = true;
        }
      });
    }

    if (observerInstance && !itemsLeft) {
      // No more elements to observe for threshold, disconnect observer
      observerInstance.disconnect();
      OBSERVER_MAP.delete(observerId);
    } // Remove reference to element


    INSTANCE_MAP.delete(element);
  }
}

function onChange(changes) {
  changes.forEach(function (intersection) {
    var isIntersecting = intersection.isIntersecting,
        intersectionRatio = intersection.intersectionRatio,
        target = intersection.target;
    var instance = INSTANCE_MAP.get(target); // Firefox can report a negative intersectionRatio when scrolling.

    if (instance && intersectionRatio >= 0) {
      var options = instance.options;
      var _inView = false;

      if (Array.isArray(options.threshold)) {
        // If threshold is an array, check if any of them intersects. This just triggers the onChange event multiple times.
        _inView = options.threshold.some(function (threshold) {
          return instance.visible ? intersectionRatio > threshold : intersectionRatio >= threshold;
        });
      } else if (options.threshold !== undefined) {
        // Trigger on 0 ratio only when not visible. This is fallback for browsers without isIntersecting support
        _inView = instance.visible ? intersectionRatio > options.threshold : intersectionRatio >= options.threshold;
      }

      if (isIntersecting !== undefined) {
        // If isIntersecting is defined, ensure that the element is actually intersecting.
        // Otherwise it reports a threshold of 0
        _inView = _inView && isIntersecting;
      }

      instance.visible = _inView;
      instance.callback(_inView, intersectionRatio);
    }
  });
}

function useInView(ref, options) {
  if (options === void 0) {
    options = {};
  }

  // $FlowFixMe - useState is not exposed in React Flow lib yet
  var _React$useState = useState(false),
      isInView = _React$useState[0],
      setInView = _React$useState[1]; // $FlowFixMe - useEffect is not exposed in React Flow lib yet


  useEffect(function () {
    if (ref.current) {
      observe(ref.current, function (inView) {
        setInView(inView);

        if (inView && options.triggerOnce) {
          // If it should only trigger once, unobserve the element after it's inView
          unobserve(ref.current);
        }
      }, {
        threshold: options.threshold,
        root: options.root,
        rootMargin: options.rootMargin
      }, options.rootId);
    }

    return function () {
      unobserve(ref.current);
    };
  }, [options.threshold, options.root, options.rootMargin, options.rootId]);
  return isInView;
}

/**
 * Monitors scroll, and triggers the children function with updated props
 *
 <InView>
 {({inView, ref}) => (
   <h1 ref={ref}>{`${inView}`}</h1>
 )}
 </InView>
 */
var InView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(InView, _React$Component);

  function InView() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      inView: false,
      intersectionRatio: 0
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "node", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleNode", function (node) {
      if (_this.node) unobserve(_this.node);
      _this.node = node;

      _this.observeNode();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (inView, intersectionRatio) {
      _this.setState({
        inView: inView,
        intersectionRatio: intersectionRatio
      });

      if (_this.props.onChange) {
        _this.props.onChange(inView, intersectionRatio);
      }
    });

    return _this;
  }

  var _proto = InView.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.hasOwnProperty('render')) {
        console.warn("react-intersection-observer: \"render\" is deprecated, and should be replaced with \"children\"", this.node);
      }

      invariant(this.node, "react-intersection-observer: No DOM node found. Make sure you forward \"ref\" to the root DOM element you want to observe.");
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // If a IntersectionObserver option changed, reinit the observer
    if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold) {
      unobserve(this.node);
      this.observeNode();
    }

    if (prevState.inView !== this.state.inView) {
      if (this.state.inView && this.props.triggerOnce) {
        unobserve(this.node);
        this.node = null;
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.node) {
      unobserve(this.node);
      this.node = null;
    }
  };

  _proto.observeNode = function observeNode() {
    if (!this.node) return;
    var _this$props = this.props,
        threshold = _this$props.threshold,
        root = _this$props.root,
        rootMargin = _this$props.rootMargin,
        rootId = _this$props.rootId;
    observe(this.node, this.handleChange, {
      threshold: threshold,
      root: root,
      rootMargin: rootMargin
    }, rootId);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        children = _this$props2.children,
        render = _this$props2.render,
        tag = _this$props2.tag,
        triggerOnce = _this$props2.triggerOnce,
        threshold = _this$props2.threshold,
        root = _this$props2.root,
        rootId = _this$props2.rootId,
        rootMargin = _this$props2.rootMargin,
        props = _objectWithoutPropertiesLoose(_this$props2, ["children", "render", "tag", "triggerOnce", "threshold", "root", "rootId", "rootMargin"]);

    var _this$state = this.state,
        inView = _this$state.inView,
        intersectionRatio = _this$state.intersectionRatio;
    var renderMethod = children || render;

    if (typeof renderMethod === 'function') {
      return renderMethod({
        inView: inView,
        intersectionRatio: intersectionRatio,
        ref: this.handleNode
      });
    }

    return createElement(tag || 'div', _extends({
      ref: this.handleNode
    }, props), children);
  };

  return InView;
}(Component);

_defineProperty(InView, "defaultProps", {
  threshold: 0,
  triggerOnce: false
});

export default InView;
export { InView, useInView };
