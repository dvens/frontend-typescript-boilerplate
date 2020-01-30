// const Terser = require('terser');

// /*
//     Loader string thats being used to load script dynamically.
// **/
// const loadScriptFunction = `
//   function loadScript(src, module) {
//     return new Promise(function (resolve, reject) {
//       document.head.appendChild(Object.assign(
//         document.createElement('script'),
//         { src: src, onload: resolve, onerror: reject },
//         module ? { type: 'module' } : undefined
//       ));
//     });
//   }\n\n`;

// <script src="polyfills/core-js.577a5602a7262d6256830802d4aaab43.js" nomodule=""></script>
//   <script src="polyfills/regenerator-runtime.92d44da139046113cb3739b173605787.js" nomodule=""></script>
//   <script>
//     ! function () {
//       function e(e, o) {
//         return new Promise((function (t, n) {
//           document.head.appendChild(Object.assign(document.createElement("script"), {
//             src: e,
//             onload: t,
//             onerror: n
//           }, o ? {
//             type: "module"
//           } : void 0))
//         }))
//       }
//       var o = [];

//       function t() {
//         "noModule" in HTMLScriptElement.prototype ? e("./d42f7829ce2a036a178d.js") : e(
//           "./legacy/1f03ac28f0e54fbace33.js")
//       }

//       "fetch" in window || o.push(e("polyfills/fetch.191258a74d74243758f52065f3d0962a.js", !1)), "attachShadow" in
//         Element.prototype && "getRootNode" in Element.prototype && (!window.ShadyDOM || !window.ShadyDOM.force) || o
//         .push(e("polyfills/webcomponents.d406f4685fdfb412c61f23b3ae18f2dc.js", !1)), !("noModule" in HTMLScriptElement
//           .prototype) && "getRootNode" in Element.prototype && o.push(e(
//           "polyfills/custom-elements-es5-adapter.84b300ee818dce8b351c7cc7c100bcf7.js", !1)), o.length ? Promise.all(o)
//         .then(t) : t()
//     }();

//   </script>
