/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/auth.js":
/*!*********************!*\
  !*** ./src/auth.js ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var https_www_gstatic_com_firebasejs_9_0_0_firebase_auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js */ \"https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js\");\n/* harmony import */ var _firebase_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firebase-config */ \"./src/firebase-config.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_www_gstatic_com_firebasejs_9_0_0_firebase_auth_js__WEBPACK_IMPORTED_MODULE_0__, _firebase_config__WEBPACK_IMPORTED_MODULE_1__]);\n([https_www_gstatic_com_firebasejs_9_0_0_firebase_auth_js__WEBPACK_IMPORTED_MODULE_0__, _firebase_config__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nconst backdrop = document.getElementById(\"backdrop\");\nconst modal = document.getElementById(\"modal\");\nconst emailInput = document.getElementById(\"email-input\");\nconst passwordInput = document.getElementById(\"password-input\");\nconst modalButton = document.getElementById(\"modal-button\");\n\nconst handleModalClick = () => {\n  const email = emailInput.value;\n  const password = passwordInput.value;\n  console.log(email, password);\n  if (true) {\n    // createUserWithEmailAndPassword(auth, email, password)\n  }\n};\n\nmodalButton.addEventListener(\"click\", handleModalClick);\n\nconst toggleModal = () => {\n  backdrop.classList.toggle(\"visible\");\n  modal.classList.toggle(\"visible\");\n};\nif (true) toggleModal();\n\nconst loginUser = () => {};\n\nconst getChats = () => {};\n\nconst openChat = () => {};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXV0aC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFJbUU7QUFDMUI7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQVE7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUk7O0FBRVI7O0FBRUE7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9icmFpbnN0b3JtLy4vc3JjL2F1dGguanM/MWFiNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBvbkF1dGhTdGF0ZUNoYW5nZWQsXG4gIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCxcbiAgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQsXG59IGZyb20gXCJodHRwczovL3d3dy5nc3RhdGljLmNvbS9maXJlYmFzZWpzLzkuMC4wL2ZpcmViYXNlLWF1dGguanNcIjtcbmltcG9ydCB7IGF1dGggfSBmcm9tIFwiLi9maXJlYmFzZS1jb25maWdcIjtcblxuY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tkcm9wXCIpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsXCIpO1xuY29uc3QgZW1haWxJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWwtaW5wdXRcIik7XG5jb25zdCBwYXNzd29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZC1pbnB1dFwiKTtcbmNvbnN0IG1vZGFsQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC1idXR0b25cIik7XG5cbmNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoKSA9PiB7XG4gIGNvbnN0IGVtYWlsID0gZW1haWxJbnB1dC52YWx1ZTtcbiAgY29uc3QgcGFzc3dvcmQgPSBwYXNzd29yZElucHV0LnZhbHVlO1xuICBjb25zb2xlLmxvZyhlbWFpbCwgcGFzc3dvcmQpO1xuICBpZiAoXCJzaWdudXBcIikge1xuICAgIC8vIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpXG4gIH1cbn07XG5cbm1vZGFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVNb2RhbENsaWNrKTtcblxuY29uc3QgdG9nZ2xlTW9kYWwgPSAoKSA9PiB7XG4gIGJhY2tkcm9wLmNsYXNzTGlzdC50b2dnbGUoXCJ2aXNpYmxlXCIpO1xuICBtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKFwidmlzaWJsZVwiKTtcbn07XG5pZiAodHJ1ZSkgdG9nZ2xlTW9kYWwoKTtcblxuY29uc3QgbG9naW5Vc2VyID0gKCkgPT4ge307XG5cbmNvbnN0IGdldENoYXRzID0gKCkgPT4ge307XG5cbmNvbnN0IG9wZW5DaGF0ID0gKCkgPT4ge307XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/auth.js\n");

/***/ }),

/***/ "./src/firebase-config.js":
/*!********************************!*\
  !*** ./src/firebase-config.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   app: () => (/* binding */ app),\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   firebaseConfig: () => (/* binding */ firebaseConfig)\n/* harmony export */ });\n/* harmony import */ var https_www_gstatic_com_firebasejs_9_0_0_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js */ \"https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js\");\n/* harmony import */ var https_www_gstatic_com_firebasejs_9_0_0_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js */ \"https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([https_www_gstatic_com_firebasejs_9_0_0_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__, https_www_gstatic_com_firebasejs_9_0_0_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__]);\n([https_www_gstatic_com_firebasejs_9_0_0_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__, https_www_gstatic_com_firebasejs_9_0_0_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// import {initializeApp} from 'firebase/app';\n\n// import {getAuth} from 'firebase/auth';\n\n\n\nconst firebaseConfig = {\n  apiKey: \"AIzaSyAOEDYCdCqcDzKIUKLm-RBmCNBqULNvPsY\",\n  authDomain: \"chat-app-bk.firebaseapp.com\",\n  projectId: \"chat-app-bk\",\n  storageBucket: \"chat-app-bk.appspot.com\",\n  messagingSenderId: \"758604823746\",\n  appId: \"1:758604823746:web:c68ea6ad3e3b4804428f5b\"\n};\n\nconst app = (0,https_www_gstatic_com_firebasejs_9_0_0_firebase_app_js__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\nconst auth = (0,https_www_gstatic_com_firebasejs_9_0_0_firebase_auth_js__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZmlyZWJhc2UtY29uZmlnLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsV0FBVyxlQUFlO0FBQytEO0FBQ3pGLFdBQVcsU0FBUztBQUNvSDs7O0FBR2pJO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU8sWUFBWSxxR0FBYTtBQUN6QixhQUFhLGdHQUFPLE0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9icmFpbnN0b3JtLy4vc3JjL2ZpcmViYXNlLWNvbmZpZy5qcz9kZmRkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7aW5pdGlhbGl6ZUFwcH0gZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7IGluaXRpYWxpemVBcHAgfSBmcm9tICdodHRwczovL3d3dy5nc3RhdGljLmNvbS9maXJlYmFzZWpzLzkuMC4wL2ZpcmViYXNlLWFwcC5qcyc7XG4vLyBpbXBvcnQge2dldEF1dGh9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuaW1wb3J0IHsgZ2V0QXV0aCwgb25BdXRoU3RhdGVDaGFuZ2VkLCBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQgfSBmcm9tICdodHRwczovL3d3dy5nc3RhdGljLmNvbS9maXJlYmFzZWpzLzkuMC4wL2ZpcmViYXNlLWF1dGguanMnO1xuXG5cbmV4cG9ydCBjb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUFPRURZQ2RDcWNEektJVUtMbS1SQm1DTkJxVUxOdlBzWVwiLFxuICBhdXRoRG9tYWluOiBcImNoYXQtYXBwLWJrLmZpcmViYXNlYXBwLmNvbVwiLFxuICBwcm9qZWN0SWQ6IFwiY2hhdC1hcHAtYmtcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJjaGF0LWFwcC1iay5hcHBzcG90LmNvbVwiLFxuICBtZXNzYWdpbmdTZW5kZXJJZDogXCI3NTg2MDQ4MjM3NDZcIixcbiAgYXBwSWQ6IFwiMTo3NTg2MDQ4MjM3NDY6d2ViOmM2OGVhNmFkM2UzYjQ4MDQ0MjhmNWJcIlxufTtcblxuZXhwb3J0IGNvbnN0IGFwcCA9IGluaXRpYWxpemVBcHAoZmlyZWJhc2VDb25maWcpO1xuZXhwb3J0IGNvbnN0IGF1dGggPSBnZXRBdXRoKGFwcCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/firebase-config.js\n");

/***/ }),

/***/ "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js":
false,

/***/ "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js":
false

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/auth.js");
/******/ 	
/******/ })()
;