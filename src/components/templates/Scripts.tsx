import { Fragment, h } from "@atomify/jsx";

export const renderScripts = () => {
  return (
    <Fragment>
      <script
        src="/assets/js/polyfills/core-js.a4892af14b6bfea5814d439ff983e62b.js"
        nomodule
      ></script>
      <script
        src="/assets/js/polyfills/regenerator-runtime.d8604ce973e218ebbf42bdb6c3adb564.js"
        nomodule
      ></script>
      <script dangerouslySetInnerHTML='!function(){function e(e,t){return new Promise((function(n,o){document.head.appendChild(Object.assign(document.createElement("script"),{src:e,onload:n,onerror:o},t?{type:"module"}:void 0))}))}var t=[];function n(){"noModule"in HTMLScriptElement.prototype?e("/assets/js/main.js",!1):e("/assets/js/legacy-main.js",!1)}"fetch"in window||t.push(e("/assets/js/polyfills/fetch.a1ad5fb96dc0cb61b9454244c9bd7fe6.js",!1)),"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype||t.push(e("/assets/js/polyfills/intersection-observer.e74248e871a636a1e4053930daa62784.js",!1)),(!("attachShadow"in Element.prototype)||!("getRootNode"in Element.prototype)||window.ShadyDOM&&window.ShadyDOM.force)&&t.push(e("/assets/js/polyfills/webcomponents.e027915fbc3ca21625cde251ba95624d.js",!1)),!("noModule"in HTMLScriptElement.prototype)&&"getRootNode"in Element.prototype&&t.push(e("/assets/js/polyfills/custom-elements-es5-adapter.84b300ee818dce8b351c7cc7c100bcf7.js",!1)),t.length?Promise.all(t).then(n):n()}();' />
    </Fragment>
  );
};
