import { Fragment, h } from "@atomify/jsx";

export const renderScripts = () => {
  return (
    <Fragment>
      <script src="/assets/js/polyfills/core-js.js" nomodule></script>
      <script
        src="/assets/js/polyfills/regenerator-runtime.js"
        nomodule
      ></script>
      <script dangerouslySetInnerHTML='!function(){function e(e,t){return new Promise((function(n,o){document.head.appendChild(Object.assign(document.createElement("script"),{src:e,onload:n,onerror:o},t?{type:"module"}:void 0))}))}var t=[];function n(){"noModule"in HTMLScriptElement.prototype?e("/assets/js/main.js"):e("/assets/js/legacy-main.js")}"fetch"in window||t.push(e("/assets/js/polyfills/fetch.js",!1)),"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype||t.push(e("/assets/js/polyfills/intersection-observer.js",!1)),(!("attachShadow"in Element.prototype)||!("getRootNode"in Element.prototype)||window.ShadyDOM&&window.ShadyDOM.force)&&t.push(e("/assets/js/polyfills/webcomponents.js",!1)),!("noModule"in HTMLScriptElement.prototype)&&"getRootNode"in Element.prototype&&t.push(e("/assets/js/polyfills/custom-elements-es5-adapter.js",!1)),t.length?Promise.all(t).then(n):n()}();' />
    </Fragment>
  );
};
