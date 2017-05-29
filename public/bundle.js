/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js??ref--1-2!./app.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/postcss-loader/lib/index.js??ref--1-2!./app.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _app = __webpack_require__(0);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (global) {
  global.datePicker = function (options) {
    var deepExtend = function deepExtend(out) {
      out = out || {};
      for (var i = 1; i < arguments.length; i++) {
        var obj = arguments[i];
        if (!obj) continue;
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (_typeof(obj[key]) === 'object') {
              out[key] = deepExtend(out[key], obj[key]);
            } else {
              out[key] = obj[key];
            }
          }
        }
      }
      return out;
    };

    /*
     * Default settings
     */
    var settings = deepExtend({
      week: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      close: 'close',
      format: 'yy-mm-dd',
      idPrefix: 'datePicker-',
      mouseover: false,
      numberOfMonths: 2,
      DayText: false
    }, options);

    /*
     * For mm/dd
     */
    var zeroPadding = function zeroPadding(num) {
      return ('0' + num).slice(-2);
    };

    function fillDates(flag, i, w, daySearch, flagHoliday, currentYMD) {
      // 指定日を非活性にする 未実装
      if (settings.holidayweek) {
        var week = settings.holidayweek.split(',');
        for (var n = 0; n < week.length; n++) {
          if (week[n] === w) {
            // 曜日指定
            flag = false;
          }
        }
      }

      // 非活性日 flag
      if (daySearch) {
        flag = false;
      }

      // 土日 class
      var holidayClass = '';
      if (w === 0) {
        holidayClass = ' is-national-holiday';
      } else if (w === 6) {
        holidayClass = ' is-saturday';
      }

      // 祭日 class 未実装
      if (flagHoliday) {
        holidayClass = ' national-holiday';
      }

      // 祝日名表示 未実装
      var dayStr = '';
      if (settings.DayText) {
        var dayStr = '<span class="set-text">' + flagHoliday + '</span>';
      }

      if (flag) {
        // 有効日
        // dayStr、あってもいいけど描画の仕方を考える
        return '<td title="' + flagHoliday + '" class="datePickerUI__date datePickerUI__date--state_enabled' + holidayClass + '" data-ymd="' + currentYMD + '">' + i + '' + dayStr + '</td>';
      } else {
        // 無効日
        return '<td class="datePickerUI__date' + holidayClass + '">' + i + '' + dayStr + '</td>';
      }
    }

    /*
     * Calendar elements
     */
    function generateCalendar(yy, mm, top, left, id) {
      var week = settings.week;
      var close = settings.close;
      var calendarEl = '<div class="datePickerUI">';

      var minDate = null;
      var maxDate = null;

      if (settings.minDate) {
        if (settings.minDate === 'today') {
          var now = new Date();
          var year = now.getFullYear();
          var month = now.getMonth() + 1;
          var date = now.getDate();

          minDate = new Date(year, month - 1, date);
        } else {
          var minDateArr = settings.minDate.split('-');
          minDate = new Date(minDateArr[0], minDateArr[1] - 1, minDateArr[2]);
        }
      }

      if (settings.maxDate) {
        var maxDateArr = settings.maxDate.split('-');
        maxDate = new Date(maxDateArr[0], maxDateArr[1] - 1, maxDateArr[2]);
      }

      for (var n = 0; n < settings.numberOfMonths; n++) {
        var currentDate = new Date(yy, mm - 1 + n, 1);
        var currentYear = currentDate.getFullYear();
        var currentMonth = currentDate.getMonth() + 1;

        var numBlankDays = currentDate.getDay() | 0;
        // var lastDayOfCurrentMonth = new Date(yy, mm, 0).getDate()|0
        var lastDayOfCurrentMonth = new Date(yy, currentMonth, 0).getDate() | 0;

        var numWeeks = 1;
        var firstDay = numBlankDays;

        var UIID = settings.idPrefix + '' + currentYear + '' + currentMonth;

        calendarEl += '<div class="datePickerUI__wrap" id="' + UIID + '" data-year="' + currentYear + '" data-month="' + currentMonth + '">';
        calendarEl += '  <div class="datePickerUI__head">';
        calendarEl += '    <div class="datePickerUI__this-month">' + currentYear + ' - ' + currentMonth + '</div>';
        calendarEl += '  </div>'; // [/.datePickerUI__head]

        calendarEl += '  <div class="datePickerUI__days">';

        for (var i = 0; i < week.length; i++) {
          // Days a week
          calendarEl += '  <div class="datePickerUI__day">' + week[i] + '</div>';
        }

        calendarEl += '  </div>'; // [/.datePickerUI__days]

        calendarEl += '  <table class="datePickerUI__dates">';
        calendarEl += '    <tr class="week1">';

        for (var i = 0; i < numBlankDays; i++) {
          // Dates of last month
          calendarEl += '    <td class="datePickerUI__date"></td>';
        }

        for (var i = 1; i <= lastDayOfCurrentMonth; i++) {
          // Current month's dates
          if (firstDay !== 0 && (numBlankDays + i) % 7 === 1) {
            // Set weeks
            numWeeks++;
            firstDay = 0;
            calendarEl += '</tr>';
            calendarEl += '<tr class="week' + numWeeks + '">';
          }
          firstDay++;
          // calendarEl += '    <td class="datePickerUI__date datePickerUI__date--state_enabled">' + i + '</td>'

          var currentDateAll = new Date(yy, currentMonth - 1, i);
          var numToWeeks = currentDateAll.getDay();
          var daySearch = false;
          var flagHoliday = '';
          var currentDates = currentDateAll.getDate();
          var currentYMD = '' + currentYear + ('' + zeroPadding(currentMonth)) + ('' + zeroPadding(currentDates));

          // 選択不可日
          if (settings.disabledDays) {
            var disabledDays = settings.disabledDays;
            Object.keys(disabledDays).map(function (key) {
              return disabledDays[key];
            });
            disabledDays = Object.values(disabledDays);
            var search = disabledDays.indexOf(currentYMD);
            if (search !== -1) {
              daySearch = true;
            }
          }

          // 開始日と終了日がどちらも有効
          if (minDate !== null && maxDate !== null) {
            if (currentDateAll.getTime() >= minDate.getTime() && currentDateAll.getTime() <= maxDate.getTime()) {
              calendarEl += fillDates(true, i, numToWeeks, daySearch, flagHoliday, currentYMD);
            } else {
              calendarEl += fillDates(false, i, numToWeeks, daySearch, flagHoliday, currentYMD);
            }
          } else if (minDate !== null && maxDate === null) {
            // 開始日だけ有効
            if (currentDateAll.getTime() >= minDate.getTime()) {
              calendarEl += fillDates(true, i, numToWeeks, daySearch, flagHoliday, currentYMD);
            } else {
              calendarEl += fillDates(false, i, numToWeeks, daySearch, flagHoliday, currentYMD);
            }
          } else if (minDate === null && maxDate !== null) {
            // 終了日だけ有効
            if (currentDateAll.getTime() <= maxDate.getTime()) {
              calendarEl += fillDates(true, i, numToWeeks, daySearch, flagHoliday, currentYMD);
            } else {
              calendarEl += fillDates(false, i, numToWeeks, daySearch, flagHoliday, currentYMD);
            }
          } else {
            // 無指定
            calendarEl += fillDates(true, i, numToWeeks, daySearch, flagHoliday, currentYMD);
          }
        }

        calendarEl += '    </tr>';
        calendarEl += '  </table>';

        calendarEl += '</div>';
      }
      calendarEl += '  <div class="datePickerUI__control">';
      calendarEl += '    <div class="datePickerUI__prev">&lt;</div>';
      calendarEl += '    <div class="datePickerUI__next">&gt;</div>';
      calendarEl += '  </div>'; // [/.datePickerUI__control]
      calendarEl += '  <div class="datePickerUI__close">' + close + '</div>';
      calendarEl += '</div>';

      document.body.insertAdjacentHTML('beforeend', calendarEl);

      Array.prototype.forEach.call(document.getElementsByClassName('datePickerUI'), function (node, i) {
        node.style.top = top + 'px';
        node.style.left = left + node.offsetWidth * i + 'px';
        node.dataset.top = top;
        node.dataset.left = left;
        node.dataset.col = settings.numberOfMonths;
        if (id) node.dataset.fid = id;
      });
    }

    function removeCalendar() {
      Array.prototype.forEach.call(document.getElementsByClassName('datePickerUI'), function (node) {
        node.parentNode.removeChild(node);
      });
    }

    /*
     * Open calendar
     */
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('datePicker')) {
        removeCalendar();
        var date = new Date();
        var yy = date.getFullYear();
        var mm = date.getMonth() + 1;

        var top = Math.ceil(event.target.offsetTop) + 20;
        var left = Math.ceil(event.target.offsetLeft);
        var id = event.target.id;

        generateCalendar(yy, mm, top, left, id);
      }
    }, false);

    /*
     * If the mouseover option is true, mouseover a date and set to <input>
     */
    document.addEventListener('mouseover', function (event) {
      if (event.target.classList.contains('datePickerUI__date--state_enabled')) {
        if (settings.mouseover) {
          var datePicker = event.target.parentNode.parentNode.parentNode.parentNode;

          var year = datePicker.dataset.year | 0;
          var month = datePicker.dataset.month | 0;
          var day = event.target.innerHTML | 0;
          var format = settings.format;

          day = zeroPadding(day);
          month = zeroPadding(month);

          format = format.replace('yy', year);
          format = format.replace('mm', month);
          format = format.replace('dd', day);

          var fid = datePicker.parentNode.dataset.fid;
          document.getElementById(fid).value = format;
        }
      }
    }, false);

    /*
     * On click the date to set to <input> and close the calendar
     */
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('datePickerUI__date--state_enabled')) {
        var datePicker = event.target.parentNode.parentNode.parentNode.parentNode;

        var year = datePicker.dataset.year | 0;
        var month = datePicker.dataset.month | 0;
        var day = event.target.innerHTML | 0;
        var format = settings.format;

        day = zeroPadding(day);
        month = zeroPadding(month);

        format = format.replace('yy', year);
        format = format.replace('mm', month);
        format = format.replace('dd', day);

        var fid = datePicker.parentNode.dataset.fid;
        document.getElementById(fid).value = format;
        removeCalendar();
      }
    }, false);

    /*
     * To the next month
     */
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('datePickerUI__next')) {
        var datePickerUI = document.querySelector('.datePickerUI');
        var datePickerUIWrap = document.querySelector('.datePickerUI__wrap');

        var year = datePickerUIWrap.dataset.year | 0;
        var month = datePickerUIWrap.dataset.month | 0;
        var top = datePickerUI.dataset.top | 0;
        var left = datePickerUI.dataset.left | 0;
        var id = datePickerUI.dataset.fid;

        if (month === 12) {
          year = year + 1;
          month = 1;
        } else {
          month = month + 1;
        }
        removeCalendar();
        generateCalendar(year, month, top, left, id);
      }
    });

    /*
     * To the previous month
     */
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('datePickerUI__prev')) {
        var datePickerUI = document.querySelector('.datePickerUI');
        var datePickerUIWrap = document.querySelector('.datePickerUI__wrap');

        var year = datePickerUIWrap.dataset.year | 0;
        var month = datePickerUIWrap.dataset.month | 0;
        var top = datePickerUI.dataset.top | 0;
        var left = datePickerUI.dataset.left | 0;
        var id = datePickerUI.dataset.fid;

        if (month === 1) {
          year = year - 1;
          month = 12;
        } else {
          month = month - 1;
        }
        removeCalendar();
        generateCalendar(year, month, top, left, id);
      }
    });

    /*
     * Close the calendar
     */
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('datePickerUI__close')) {
        removeCalendar();
      }
    }, false);
  };
})(typeof global !== 'undefined' ? global : window);

/*
 * Set options and run
 */
var datePicker = window.datePicker({
  week: ['日', '月', '火', '水', '木', '金', '土'],
  format: 'yy/mm/dd',
  close: '閉じる',
  mouseover: true,
  minDate: 'today' });
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".datePickerUI {\n  position: absolute;\n  z-index: 100000;\n  border: 1px solid #b4b4b4;\n  font-size: 12px;\n  line-height: 1em;\n  &__wrap {\n    display: inline-block;\n    vertical-align: top;\n  }\n  &__control {\n    overflow: hidden;\n    background-color: #fff;\n  }\n  &__this-month {\n    text-align: center;\n  }\n  &__prev,\n  &__next {\n    display: inline-block;\n    vertical-align: middle;\n    text-align: center;\n    width: 20px;\n    background-color: #fff;\n    cursor: pointer\n  }\n  &__prev:hover, &__next:hover {\n    background-color: #eee;\n  }\n  &__days,\n  &__dates {\n    overflow: hidden;\n  }\n  &__days {\n    display: table;\n    width: 100%;\n    padding-top: 3px;\n    padding-bottom: 3px;\n    background-color: #fff;\n    color: #aaa;\n  }\n  &__day,\n  &__date {\n    display: table-cell;\n    vertical-align: middle;\n    width: 20px;\n    padding: 8px 4px;\n    text-align: center;\n  }\n  &__date {\n    color: #aaa;\n    &\\--state_enabled {\n      color: #000;\n      cursor: pointer\n    }\n    &\\--state_enabled:hover {\n      background-color: #eee;\n    }\n  }\n  &__close {\n    background-color: #fff;\n    text-align: center;\n    cursor: pointer\n  }\n  &__close:hover {\n    background-color: #eee;\n  }\n}\n\n.datePicker[type=\"text\"] {\n  width: 200px;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);

	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map