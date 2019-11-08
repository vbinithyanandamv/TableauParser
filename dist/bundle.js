(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/dataParser.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dataParser.ts":
/*!***************************!*\
  !*** ./src/dataParser.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataParser = undefined;

var _periodParser = __webpack_require__(/*! ./periodParser */ "./src/periodParser.ts");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataParser = exports.DataParser = function DataParser() {
  _classCallCheck(this, DataParser);

  _defineProperty(this, "convertData", function (options, data) {
    var TableauData = data; //series should be based on number of measures

    if (options.dataType === "with_actual_data" || options.dataType === "single_measure") {
      return DataParser.transformPeriodData(options, TableauData);
    } else if (options.dataType === "no_periods") {
      return DataParser.transformnoPeriodData(TableauData);
    }
  });
};

_defineProperty(DataParser, "transformPeriodData", function (options, tableauData) {
  var categoryData = new Map();
  var periods = [];
  var periodsObj = [];
  var periodDetector = new _periodParser.PeriodParser(); //create data map here

  var dataMapConfig = {
    'hierMap': {},
    'timePeriod': 0,
    'series': {}
  }; //periods

  var findColumnIndex = function findColumnIndex(field, index, columnMap) {
    for (var _i = 0; _i < tableauData._columns.length; _i++) {
      if (tableauData._columns[_i]._fieldName === field) {
        if (index !== undefined && index !== null) {
          dataMapConfig[columnMap][index] = _i;
        } else {
          dataMapConfig[columnMap] = _i;
        }
      }
    }
  };

  options.category.map(function (field, index) {
    findColumnIndex(field, index, 'hierMap');
  });
  options.values.map(function (field, index) {
    findColumnIndex(field, index, 'series');
  });
  findColumnIndex(options.timePeriod, null, 'timePeriod');
  console.log(dataMapConfig); //can be limited based on number of periods

  var _loop = function _loop() {
    var data = tableauData._data[i];
    var periodValue = typeof data[dataMapConfig.timePeriod]._value === 'string' ? data[dataMapConfig.timePeriod]._value.toLowerCase() : data[dataMapConfig.timePeriod]._value;

    if (!periods.some(function (period) {
      return period === periodValue.toLowerCase();
    })) {
      periods.push(periodValue);
    }
  };

  for (var i = 0; i < tableauData._data.length; i++) {
    _loop();
  }

  var periodOrder = periodDetector.getSortedOrder(periods);
  var numberOfPeriods = periods.length; //can be get from editor also

  var categoryIndex = dataMapConfig.hierMap;
  var seriesIndex = dataMapConfig.series;
  var timePeriodIndex = dataMapConfig.timePeriod;

  tableauData._data.map(function (data) {
    /**
     based on number of category
     for example 
     Country,Region level should start with 0 (root already handled and we add children based on level 
     which will be 0 hence add one level and decrement level will be -1 no more child)
     Country,Region,Rep level should start with 1 (root already handled and level will be 1 add region decrement
     level will be 0, add rep and decrement level will be -1 no more child)
    **/
    var level = options.category.length - 2;

    if (!categoryData.has(data[categoryIndex[0]]._value)) {
      //First add root
      categoryData.set(data[categoryIndex[0]]._value, {
        id: data[categoryIndex[0]]._value,
        label: data[categoryIndex[0]]._formattedValue,
        children: new Map(),
        series: [[], []],
        parent: null
      });
    }

    var addChildren = function addChildren(parent, children) {
      //then add children recursively and form the structure
      if (level < 0) {
        return parent;
      }

      if (!parent.children.has(children._value)) {
        parent.children.set(children._value, {
          id: children._value,
          label: children._formattedValue,
          children: new Map(),
          series: [],
          parent: parent
        });
      }

      level--;
      parent = parent.children.get(children._value);
      return addChildren(parent, data[dataMapConfig.hierMap[level]]);
    };

    var leafChildren = addChildren(categoryData.get(data[categoryIndex[0]]._value), data[categoryIndex[1]]); //update data from children to parent

    var updateData = function updateData(node) {
      node.series[0] = !node.series[0] ? [] : node.series[0];
      var periodValue = typeof data[timePeriodIndex]._value === 'string' ? data[timePeriodIndex]._value.toLowerCase() : data[timePeriodIndex]._value;
      var periodValueIndex = periodOrder.indexOf(periodValue);

      if (!node.series[0][periodValueIndex]) {
        node.series[0][periodValueIndex] = data[seriesIndex[0]]._value;

        if (options.dataType !== "single_measure") {
          node.series[1] = !node.series[1] ? [] : node.series[1];
          node.series[1][periodValueIndex] = data[seriesIndex[1]]._value;
        }
      } else {
        node.series[0][periodValueIndex] = node.series[0][periodValueIndex] + data[seriesIndex[0]]._value;

        if (options.dataType !== "single_measure") {
          node.series[1][periodValueIndex] = node.series[1][periodValueIndex] + data[seriesIndex[1]]._value;
        }
      }

      if (node.parent) {
        updateData(node.parent);
      }
    };

    updateData(leafChildren);
  }); //convert to VDT DATA Format


  categoryData = Array.from(categoryData.values());
  categoryData.map(function (node) {
    var maptoArray = function maptoArray(node) {
      node.children = Array.from(node.children.values());

      if (!node.children) {
        return;
      }

      delete node.parent;
      node.children.map(function (node) {
        maptoArray(node);
      });
    };

    maptoArray(node);
  });
  var seriesNames = [];

  var _loop2 = function _loop2() {
    var data = tableauData._data[i];
    var periodData = {
      id: data[timePeriodIndex]._value,
      label: data[timePeriodIndex]._formattedValue
    };

    if (!periodsObj.some(function (period) {
      return period.id === data[timePeriodIndex]._value;
    })) {
      var periodValue = typeof data[timePeriodIndex]._value === 'string' ? data[timePeriodIndex]._value.toLowerCase() : data[timePeriodIndex]._value;
      periodsObj[periodOrder.indexOf(periodValue)] = periodData;
    }
  };

  for (var i = 0; i < tableauData._data.length; i++) {
    _loop2();
  }

  if (options.dataType == "single_measure") {
    seriesNames = [tableauData._columns[seriesIndex[0]]._fieldName];
  } else {
    seriesNames = [tableauData._columns[seriesIndex[0]]._fieldName, tableauData._columns[seriesIndex[1]]._fieldName];
  }

  var props = {
    periods: periodsObj,
    rows: categoryData,
    metadata: {
      periods: periodsObj,
      series: seriesNames
    }
  };
  return props;
});

_defineProperty(DataParser, "transformnoPeriodData", function (tableauData) {
  var period_length = tableauData._columns.length - 1; //dimension length

  var number_of_periods = 12; //should be coming from editor

  var number_of_series = period_length / number_of_periods;
  var rows = new Map();
  var periods = [];
  var i; //get periods

  for (i = 1; i <= period_length; i++) {
    //i == count should be number of dimension
    periods.push(tableauData._columns[i]._fieldName);
  }

  tableauData._data.map(function (row_data) {
    if (!rows.has(row_data[0]._value)) {
      //First add root
      rows.set(row_data[0]._value, {
        id: row_data[0]._value,
        label: row_data[0]._formattedValue,
        series: []
      });
    } //update data based on periods


    var i;

    for (i = 1; i <= period_length; i++) {
      //i == count should be number of dimension
      var seriesIndex = Math.ceil(i / 12) - 1;
      var currentRow = rows.get(row_data[0]._value);
      currentRow.series[seriesIndex] = currentRow.series[seriesIndex] ? currentRow.series[seriesIndex] : [];
      currentRow.series[seriesIndex].push(row_data[i]._value);
    }
  });

  var props = {
    periods: [{
      id: "1",
      label: "1"
    }],
    rows: Array.from(rows.values()),
    metadata: {
      periods: periods,
      series: []
    }
  };
  return props;
});

/***/ }),

/***/ "./src/periodParser.ts":
/*!*****************************!*\
  !*** ./src/periodParser.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PeriodTypes;

(function (PeriodTypes) {
  PeriodTypes[PeriodTypes["NUMBER"] = 1] = "NUMBER";
  PeriodTypes[PeriodTypes["COLON_SEPARATED_INDEX"] = 2] = "COLON_SEPARATED_INDEX";
  PeriodTypes[PeriodTypes["INDEX_AT_END"] = 3] = "INDEX_AT_END";
  PeriodTypes[PeriodTypes["MONTH_STRING_SH"] = 4] = "MONTH_STRING_SH";
  PeriodTypes[PeriodTypes["MONTH_STRING_LG"] = 5] = "MONTH_STRING_LG";
  PeriodTypes[PeriodTypes["WEEK_STRING_SH"] = 6] = "WEEK_STRING_SH";
  PeriodTypes[PeriodTypes["WEEK_STRING_LG"] = 7] = "WEEK_STRING_LG";
  PeriodTypes[PeriodTypes["ISO_8601_DATE"] = 8] = "ISO_8601_DATE";
  PeriodTypes[PeriodTypes["TEXT"] = 9] = "TEXT";
})(PeriodTypes || (PeriodTypes = {}));

var PeriodParser =
/*#__PURE__*/
exports.PeriodParser = function () {
  function PeriodParser() {
    _classCallCheck(this, PeriodParser);
  }

  _createClass(PeriodParser, [{
    key: "getSortedOrder",
    value: function getSortedOrder(periods) {
      var period = periods[0];
      var periodType = PeriodParser.getPeriodType(period);
      return PeriodParser.getSortedIndexes(periods, periodType);
    }
  }], [{
    key: "checkMonthWeekFormat",
    value: function checkMonthWeekFormat(str) {
      if (typeof str !== "string") return;
      var mwFormats = PeriodParser.monthWeekFormats;
      var formatTypes = Object.keys(mwFormats);
      var periodFormat;
      var matchFound = false;
      str = str.toLowerCase();

      for (var i = 0; i < formatTypes.length; i++) {
        matchFound = mwFormats[formatTypes[i]].some(function (item) {
          return item === str;
        });

        if (matchFound) {
          periodFormat = formatTypes[i];
          break;
        }
      }

      return periodFormat;
    }
  }, {
    key: "getPeriodType",
    value: function getPeriodType(period) {
      if (typeof period === "number") {
        return PeriodTypes.NUMBER;
      }

      var periodType = PeriodParser.checkMonthWeekFormat(period);

      if (periodType) {
        return PeriodTypes[periodType];
      }

      return PeriodTypes.TEXT;
    }
  }, {
    key: "processNumber",
    value: function processNumber(periods) {
      var sortedPeriod = periods.slice().sort(function (a, b) {
        return a - b;
      });
      return sortedPeriod;
    }
  }, {
    key: "processMonthWeek",
    value: function processMonthWeek(periods, periodType) {
      return PeriodParser.monthWeekFormats[PeriodTypes[periodType]];
    }
  }, {
    key: "processTextPeriod",
    value: function processTextPeriod(periods) {
      var src = periods.slice().sort();
      return src;
    }
  }, {
    key: "getSortedIndexes",
    value: function getSortedIndexes(periods, periodType) {
      switch (periodType) {
        case PeriodTypes.NUMBER:
          return PeriodParser.processNumber(periods);

        case PeriodTypes.MONTH_STRING_LG:
        case PeriodTypes.MONTH_STRING_SH:
        case PeriodTypes.WEEK_STRING_LG:
        case PeriodTypes.WEEK_STRING_SH:
          return PeriodParser.processMonthWeek(periods, periodType);

        case PeriodTypes.TEXT:
          return PeriodParser.processTextPeriod(periods);
      }
    }
  }]);

  return PeriodParser;
}();

_defineProperty(PeriodParser, "monthWeekFormats", {
  "MONTH_STRING_SH": ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
  "MONTH_STRING_LG": ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
  "WEEK_STRING_SH": ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
  "WEEK_STRING_LG": ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
});

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVyaW9kUGFyc2VyLnRzIl0sIm5hbWVzIjpbIkRhdGFQYXJzZXIiLCJvcHRpb25zIiwiZGF0YSIsIlRhYmxlYXVEYXRhIiwiZGF0YVR5cGUiLCJ0cmFuc2Zvcm1QZXJpb2REYXRhIiwidHJhbnNmb3Jtbm9QZXJpb2REYXRhIiwidGFibGVhdURhdGEiLCJjYXRlZ29yeURhdGEiLCJNYXAiLCJwZXJpb2RzIiwicGVyaW9kc09iaiIsInBlcmlvZERldGVjdG9yIiwiUGVyaW9kUGFyc2VyIiwiZGF0YU1hcENvbmZpZyIsImZpbmRDb2x1bW5JbmRleCIsImZpZWxkIiwiaW5kZXgiLCJjb2x1bW5NYXAiLCJpIiwiX2NvbHVtbnMiLCJsZW5ndGgiLCJfZmllbGROYW1lIiwidW5kZWZpbmVkIiwiY2F0ZWdvcnkiLCJtYXAiLCJ2YWx1ZXMiLCJ0aW1lUGVyaW9kIiwiY29uc29sZSIsImxvZyIsIl9kYXRhIiwicGVyaW9kVmFsdWUiLCJfdmFsdWUiLCJ0b0xvd2VyQ2FzZSIsInNvbWUiLCJwZXJpb2QiLCJwdXNoIiwicGVyaW9kT3JkZXIiLCJnZXRTb3J0ZWRPcmRlciIsIm51bWJlck9mUGVyaW9kcyIsImNhdGVnb3J5SW5kZXgiLCJoaWVyTWFwIiwic2VyaWVzSW5kZXgiLCJzZXJpZXMiLCJ0aW1lUGVyaW9kSW5kZXgiLCJsZXZlbCIsImhhcyIsInNldCIsImlkIiwibGFiZWwiLCJfZm9ybWF0dGVkVmFsdWUiLCJjaGlsZHJlbiIsInBhcmVudCIsImFkZENoaWxkcmVuIiwiZ2V0IiwibGVhZkNoaWxkcmVuIiwidXBkYXRlRGF0YSIsIm5vZGUiLCJwZXJpb2RWYWx1ZUluZGV4IiwiaW5kZXhPZiIsIkFycmF5IiwiZnJvbSIsIm1hcHRvQXJyYXkiLCJzZXJpZXNOYW1lcyIsInBlcmlvZERhdGEiLCJwcm9wcyIsInJvd3MiLCJtZXRhZGF0YSIsInBlcmlvZF9sZW5ndGgiLCJudW1iZXJfb2ZfcGVyaW9kcyIsIm51bWJlcl9vZl9zZXJpZXMiLCJyb3dfZGF0YSIsIk1hdGgiLCJjZWlsIiwiY3VycmVudFJvdyIsIlBlcmlvZFR5cGVzIiwicGVyaW9kVHlwZSIsImdldFBlcmlvZFR5cGUiLCJnZXRTb3J0ZWRJbmRleGVzIiwic3RyIiwibXdGb3JtYXRzIiwibW9udGhXZWVrRm9ybWF0cyIsImZvcm1hdFR5cGVzIiwiT2JqZWN0Iiwia2V5cyIsInBlcmlvZEZvcm1hdCIsIm1hdGNoRm91bmQiLCJpdGVtIiwiTlVNQkVSIiwiY2hlY2tNb250aFdlZWtGb3JtYXQiLCJURVhUIiwic29ydGVkUGVyaW9kIiwic2xpY2UiLCJzb3J0IiwiYSIsImIiLCJzcmMiLCJwcm9jZXNzTnVtYmVyIiwiTU9OVEhfU1RSSU5HX0xHIiwiTU9OVEhfU1RSSU5HX1NIIiwiV0VFS19TVFJJTkdfTEciLCJXRUVLX1NUUklOR19TSCIsInByb2Nlc3NNb250aFdlZWsiLCJwcm9jZXNzVGV4dFBlcmlvZCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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ZSxFQUtmLEtBTGUsRUFNZixNQU5lLEVBT2YsTUFQZSxFQVFmLFFBUmUsRUFTZixXQVRlLEVBVWYsU0FWZSxFQVdmLFVBWGUsRUFZZixVQVplLENBZlc7QUE2QjlCLG9CQUFrQixDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixFQUFzQixLQUF0QixFQUE2QixLQUE3QixFQUFvQyxLQUFwQyxFQUEyQyxLQUEzQyxDQTdCWTtBQThCOUIsb0JBQWtCLENBQ2QsUUFEYyxFQUVkLFFBRmMsRUFHZCxTQUhjLEVBSWQsV0FKYyxFQUtkLFVBTGMsRUFNZCxRQU5jLEVBT2QsVUFQYztBQTlCWSxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2RhdGFQYXJzZXIudHNcIik7XG4iLCJpbXBvcnQgeyBQZXJpb2RQYXJzZXIgfSBmcm9tIFwiLi9wZXJpb2RQYXJzZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhUGFyc2VyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0cmFuc2Zvcm1QZXJpb2REYXRhID0gKG9wdGlvbnMsdGFibGVhdURhdGEpID0+IHtcclxuICAgICAgICBsZXQgY2F0ZWdvcnlEYXRhIDphbnkgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgbGV0IHBlcmlvZHMgPSBbXTtcclxuICAgICAgICBsZXQgcGVyaW9kc09iaiA9IFtdO1xyXG4gICAgICAgIGxldCBwZXJpb2REZXRlY3RvciA9IG5ldyBQZXJpb2RQYXJzZXIoKTtcclxuXHJcbiAgICAgICAgLy9jcmVhdGUgZGF0YSBtYXAgaGVyZVxyXG4gICAgICAgIGxldCBkYXRhTWFwQ29uZmlnID0ge1xyXG4gICAgICAgICAgICAnaGllck1hcCc6e30sXHJcbiAgICAgICAgICAgICd0aW1lUGVyaW9kJzowLFxyXG4gICAgICAgICAgICAnc2VyaWVzJzp7fVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vcGVyaW9kc1xyXG4gICAgICAgIGxldCBmaW5kQ29sdW1uSW5kZXggPSAoZmllbGQsaW5kZXgsY29sdW1uTWFwKSA9PiB7XHJcbiAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRhYmxlYXVEYXRhLl9jb2x1bW5zLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGFibGVhdURhdGEuX2NvbHVtbnNbaV0uX2ZpZWxkTmFtZSA9PT0gZmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggIT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTWFwQ29uZmlnW2NvbHVtbk1hcF1baW5kZXhdID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU1hcENvbmZpZ1tjb2x1bW5NYXBdID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMuY2F0ZWdvcnkubWFwKChmaWVsZCxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBmaW5kQ29sdW1uSW5kZXgoZmllbGQsaW5kZXgsJ2hpZXJNYXAnKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBvcHRpb25zLnZhbHVlcy5tYXAoKGZpZWxkLGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGZpbmRDb2x1bW5JbmRleChmaWVsZCxpbmRleCwnc2VyaWVzJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZmluZENvbHVtbkluZGV4KG9wdGlvbnMudGltZVBlcmlvZCxudWxsLCd0aW1lUGVyaW9kJylcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YU1hcENvbmZpZyk7XHJcbiAgICAgICBcclxuICAgICAgICAvL2NhbiBiZSBsaW1pdGVkIGJhc2VkIG9uIG51bWJlciBvZiBwZXJpb2RzXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZWF1RGF0YS5fZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID10YWJsZWF1RGF0YS5fZGF0YVtpXTtcclxuICAgICAgICAgICAgbGV0IHBlcmlvZFZhbHVlID0gdHlwZW9mIGRhdGFbZGF0YU1hcENvbmZpZy50aW1lUGVyaW9kXS5fdmFsdWUgPT09ICdzdHJpbmcnID8gZGF0YVtkYXRhTWFwQ29uZmlnLnRpbWVQZXJpb2RdLl92YWx1ZS50b0xvd2VyQ2FzZSgpIDogZGF0YVtkYXRhTWFwQ29uZmlnLnRpbWVQZXJpb2RdLl92YWx1ZTsgXHJcbiAgICAgICAgICAgIGlmICghcGVyaW9kcy5zb21lKHBlcmlvZCA9PiBwZXJpb2QgPT09IHBlcmlvZFZhbHVlLnRvTG93ZXJDYXNlKCkpKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RzLnB1c2gocGVyaW9kVmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwZXJpb2RPcmRlciA6IGFueSA9IHBlcmlvZERldGVjdG9yLmdldFNvcnRlZE9yZGVyKHBlcmlvZHMpO1xyXG4gICAgICAgIGxldCBudW1iZXJPZlBlcmlvZHMgPSBwZXJpb2RzLmxlbmd0aDsgLy9jYW4gYmUgZ2V0IGZyb20gZWRpdG9yIGFsc29cclxuICAgICAgICBsZXQgY2F0ZWdvcnlJbmRleCA9IGRhdGFNYXBDb25maWcuaGllck1hcDtcclxuICAgICAgICBsZXQgc2VyaWVzSW5kZXggPSBkYXRhTWFwQ29uZmlnLnNlcmllcztcclxuICAgICAgICBsZXQgdGltZVBlcmlvZEluZGV4ID0gZGF0YU1hcENvbmZpZy50aW1lUGVyaW9kO1xyXG5cclxuICAgICAgICB0YWJsZWF1RGF0YS5fZGF0YS5tYXAoZGF0YSA9PiB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgIGJhc2VkIG9uIG51bWJlciBvZiBjYXRlZ29yeVxyXG4gICAgICAgICAgICAgZm9yIGV4YW1wbGUgXHJcbiAgICAgICAgICAgICBDb3VudHJ5LFJlZ2lvbiBsZXZlbCBzaG91bGQgc3RhcnQgd2l0aCAwIChyb290IGFscmVhZHkgaGFuZGxlZCBhbmQgd2UgYWRkIGNoaWxkcmVuIGJhc2VkIG9uIGxldmVsIFxyXG4gICAgICAgICAgICAgd2hpY2ggd2lsbCBiZSAwIGhlbmNlIGFkZCBvbmUgbGV2ZWwgYW5kIGRlY3JlbWVudCBsZXZlbCB3aWxsIGJlIC0xIG5vIG1vcmUgY2hpbGQpXHJcbiAgICAgICAgICAgICBDb3VudHJ5LFJlZ2lvbixSZXAgbGV2ZWwgc2hvdWxkIHN0YXJ0IHdpdGggMSAocm9vdCBhbHJlYWR5IGhhbmRsZWQgYW5kIGxldmVsIHdpbGwgYmUgMSBhZGQgcmVnaW9uIGRlY3JlbWVudFxyXG4gICAgICAgICAgICAgbGV2ZWwgd2lsbCBiZSAwLCBhZGQgcmVwIGFuZCBkZWNyZW1lbnQgbGV2ZWwgd2lsbCBiZSAtMSBubyBtb3JlIGNoaWxkKVxyXG4gICAgICAgICAgICAqKi8gXHJcbiAgICAgICAgICAgIGxldCBsZXZlbCA9IG9wdGlvbnMuY2F0ZWdvcnkubGVuZ3RoIC0gMjsgXHJcblxyXG4gICAgICAgICAgICBpZiAoIWNhdGVnb3J5RGF0YS5oYXMoZGF0YVtjYXRlZ29yeUluZGV4WzBdXS5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAvL0ZpcnN0IGFkZCByb290XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeURhdGEuc2V0KGRhdGFbY2F0ZWdvcnlJbmRleFswXV0uX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGRhdGFbY2F0ZWdvcnlJbmRleFswXV0uX3ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkYXRhW2NhdGVnb3J5SW5kZXhbMF1dLl9mb3JtYXR0ZWRWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllczogW1tdLCBbXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFkZENoaWxkcmVuID0gKHBhcmVudCwgY2hpbGRyZW4pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhlbiBhZGQgY2hpbGRyZW4gcmVjdXJzaXZlbHkgYW5kIGZvcm0gdGhlIHN0cnVjdHVyZVxyXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBhcmVudC5jaGlsZHJlbi5oYXMoY2hpbGRyZW4uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5zZXQoY2hpbGRyZW4uX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjaGlsZHJlbi5fdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBjaGlsZHJlbi5fZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXZlbC0tO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmNoaWxkcmVuLmdldChjaGlsZHJlbi5fdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZENoaWxkcmVuKHBhcmVudCwgZGF0YVtkYXRhTWFwQ29uZmlnLmhpZXJNYXBbbGV2ZWxdXSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVhZkNoaWxkcmVuID0gYWRkQ2hpbGRyZW4oY2F0ZWdvcnlEYXRhLmdldChkYXRhW2NhdGVnb3J5SW5kZXhbMF1dLl92YWx1ZSksIGRhdGFbY2F0ZWdvcnlJbmRleFsxXV0pO1xyXG5cclxuICAgICAgICAgICAgLy91cGRhdGUgZGF0YSBmcm9tIGNoaWxkcmVuIHRvIHBhcmVudFxyXG4gICAgICAgICAgICBsZXQgdXBkYXRlRGF0YSA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNlcmllc1swXSA9ICFub2RlLnNlcmllc1swXSA/IFtdIDogbm9kZS5zZXJpZXNbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgcGVyaW9kVmFsdWUgPSB0eXBlb2YgZGF0YVt0aW1lUGVyaW9kSW5kZXhdLl92YWx1ZSA9PT0gJ3N0cmluZycgPyBkYXRhW3RpbWVQZXJpb2RJbmRleF0uX3ZhbHVlLnRvTG93ZXJDYXNlKCkgOiBkYXRhW3RpbWVQZXJpb2RJbmRleF0uX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBlcmlvZFZhbHVlSW5kZXggPSBwZXJpb2RPcmRlci5pbmRleE9mKHBlcmlvZFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmICghbm9kZS5zZXJpZXNbMF1bcGVyaW9kVmFsdWVJbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNlcmllc1swXVtwZXJpb2RWYWx1ZUluZGV4XSA9IGRhdGFbc2VyaWVzSW5kZXhbMF1dLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5kYXRhVHlwZSAhPT0gXCJzaW5nbGVfbWVhc3VyZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2VyaWVzWzFdID0gIW5vZGUuc2VyaWVzWzFdID8gW10gOiBub2RlLnNlcmllc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbMV1bcGVyaW9kVmFsdWVJbmRleF0gPSBkYXRhW3Nlcmllc0luZGV4WzFdXS5fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNlcmllc1swXVtwZXJpb2RWYWx1ZUluZGV4XSA9IG5vZGUuc2VyaWVzWzBdW3BlcmlvZFZhbHVlSW5kZXhdICsgZGF0YVtzZXJpZXNJbmRleFswXV0uX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmRhdGFUeXBlICE9PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbMV1bcGVyaW9kVmFsdWVJbmRleF0gPSBub2RlLnNlcmllc1sxXVtwZXJpb2RWYWx1ZUluZGV4XSArIGRhdGFbc2VyaWVzSW5kZXhbMV1dLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhKG5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZURhdGEobGVhZkNoaWxkcmVuKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9jb252ZXJ0IHRvIFZEVCBEQVRBIEZvcm1hdFxyXG4gICAgICAgIGNhdGVnb3J5RGF0YSA9IEFycmF5LmZyb20oY2F0ZWdvcnlEYXRhLnZhbHVlcygpKTtcclxuXHJcbiAgICAgICAgY2F0ZWdvcnlEYXRhLm1hcChub2RlID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hcHRvQXJyYXkgPSBub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4gPSBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4udmFsdWVzKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5tYXAobm9kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwdG9BcnJheShub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBtYXB0b0FycmF5KG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzTmFtZXMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZWF1RGF0YS5fZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgY29uc3QgZGF0YSA9dGFibGVhdURhdGEuX2RhdGFbaV07XHJcbiAgICAgICAgICAgICBsZXQgcGVyaW9kRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBkYXRhW3RpbWVQZXJpb2RJbmRleF0uX3ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGRhdGFbdGltZVBlcmlvZEluZGV4XS5fZm9ybWF0dGVkVmFsdWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKCFwZXJpb2RzT2JqLnNvbWUocGVyaW9kID0+IHBlcmlvZC5pZCA9PT0gZGF0YVt0aW1lUGVyaW9kSW5kZXhdLl92YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwZXJpb2RWYWx1ZSA9IHR5cGVvZiBkYXRhW3RpbWVQZXJpb2RJbmRleF0uX3ZhbHVlID09PSAnc3RyaW5nJyA/IGRhdGFbdGltZVBlcmlvZEluZGV4XS5fdmFsdWUudG9Mb3dlckNhc2UoKSA6IGRhdGFbdGltZVBlcmlvZEluZGV4XS5fdmFsdWU7IFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kc09ialtwZXJpb2RPcmRlci5pbmRleE9mKHBlcmlvZFZhbHVlKV0gPSBwZXJpb2REYXRhXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5kYXRhVHlwZSA9PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgc2VyaWVzTmFtZXMgPSBbdGFibGVhdURhdGEuX2NvbHVtbnNbc2VyaWVzSW5kZXhbMF1dLl9maWVsZE5hbWVdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcmllc05hbWVzID0gW1xyXG4gICAgICAgICAgICAgICAgdGFibGVhdURhdGEuX2NvbHVtbnNbc2VyaWVzSW5kZXhbMF1dLl9maWVsZE5hbWUsXHJcbiAgICAgICAgICAgICAgICB0YWJsZWF1RGF0YS5fY29sdW1uc1tzZXJpZXNJbmRleFsxXV0uX2ZpZWxkTmFtZVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHByb3BzID0ge1xyXG4gICAgICAgICAgICBwZXJpb2RzOiBwZXJpb2RzT2JqLFxyXG4gICAgICAgICAgICByb3dzOiBjYXRlZ29yeURhdGEsXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RzOiBwZXJpb2RzT2JqLFxyXG4gICAgICAgICAgICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0cmFuc2Zvcm1ub1BlcmlvZERhdGEgPSAodGFibGVhdURhdGEpID0+IHtcclxuICAgICAgICBsZXQgcGVyaW9kX2xlbmd0aCA9IHRhYmxlYXVEYXRhLl9jb2x1bW5zLmxlbmd0aCAtIDE7IC8vZGltZW5zaW9uIGxlbmd0aFxyXG4gICAgICAgIGxldCBudW1iZXJfb2ZfcGVyaW9kcyA9IDEyOyAvL3Nob3VsZCBiZSBjb21pbmcgZnJvbSBlZGl0b3JcclxuICAgICAgICBsZXQgbnVtYmVyX29mX3NlcmllcyA9IHBlcmlvZF9sZW5ndGggLyBudW1iZXJfb2ZfcGVyaW9kcztcclxuICAgICAgICBsZXQgcm93cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICBsZXQgcGVyaW9kcyA9IFtdO1xyXG4gICAgICAgIGxldCBpO1xyXG5cclxuICAgICAgICAvL2dldCBwZXJpb2RzXHJcbiAgICAgICAgZm9yIChpID0gMTsgaSA8PSBwZXJpb2RfbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy9pID09IGNvdW50IHNob3VsZCBiZSBudW1iZXIgb2YgZGltZW5zaW9uXHJcbiAgICAgICAgICAgIHBlcmlvZHMucHVzaCh0YWJsZWF1RGF0YS5fY29sdW1uc1tpXS5fZmllbGROYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhYmxlYXVEYXRhLl9kYXRhLm1hcChyb3dfZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcm93cy5oYXMocm93X2RhdGFbMF0uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgLy9GaXJzdCBhZGQgcm9vdFxyXG4gICAgICAgICAgICAgICAgcm93cy5zZXQocm93X2RhdGFbMF0uX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJvd19kYXRhWzBdLl92YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogcm93X2RhdGFbMF0uX2Zvcm1hdHRlZFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllczogW11cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdXBkYXRlIGRhdGEgYmFzZWQgb24gcGVyaW9kc1xyXG4gICAgICAgICAgICBsZXQgaTtcclxuICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8PSBwZXJpb2RfbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vaSA9PSBjb3VudCBzaG91bGQgYmUgbnVtYmVyIG9mIGRpbWVuc2lvblxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllc0luZGV4ID0gTWF0aC5jZWlsKGkgLyAxMikgLSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRSb3cgPSByb3dzLmdldChyb3dfZGF0YVswXS5fdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFJvdy5zZXJpZXNbc2VyaWVzSW5kZXhdID0gY3VycmVudFJvdy5zZXJpZXNbc2VyaWVzSW5kZXhdID9cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Um93LnNlcmllc1tzZXJpZXNJbmRleF0gOlxyXG4gICAgICAgICAgICAgICAgICAgIFtdO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFJvdy5zZXJpZXNbc2VyaWVzSW5kZXhdLnB1c2gocm93X2RhdGFbaV0uX3ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHBlcmlvZHM6IFt7XHJcbiAgICAgICAgICAgICAgICBpZDogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCIxXCJcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIHJvd3M6IEFycmF5LmZyb20ocm93cy52YWx1ZXMoKSksXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RzOiBwZXJpb2RzLFxyXG4gICAgICAgICAgICAgICAgc2VyaWVzOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcHJvcHM7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIGNvbnZlcnREYXRhID0gKG9wdGlvbnMsZGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBUYWJsZWF1RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgLy9zZXJpZXMgc2hvdWxkIGJlIGJhc2VkIG9uIG51bWJlciBvZiBtZWFzdXJlc1xyXG4gICAgICAgIGlmIChvcHRpb25zLmRhdGFUeXBlID09PSBcIndpdGhfYWN0dWFsX2RhdGFcIiB8fCBvcHRpb25zLmRhdGFUeXBlID09PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGFQYXJzZXIudHJhbnNmb3JtUGVyaW9kRGF0YShvcHRpb25zLFRhYmxlYXVEYXRhKVxyXG4gICAgICAgIH1lbHNlIGlmIChvcHRpb25zLmRhdGFUeXBlID09PSBcIm5vX3BlcmlvZHNcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0YVBhcnNlci50cmFuc2Zvcm1ub1BlcmlvZERhdGEoVGFibGVhdURhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSIsImVudW0gUGVyaW9kVHlwZXMge1xyXG4gICAgTlVNQkVSID0gMSxcclxuICAgIENPTE9OX1NFUEFSQVRFRF9JTkRFWCA9IDIsXHJcbiAgICBJTkRFWF9BVF9FTkQgPSAzLFxyXG4gICAgTU9OVEhfU1RSSU5HX1NIID0gNCxcclxuICAgIE1PTlRIX1NUUklOR19MRyA9IDUsXHJcbiAgICBXRUVLX1NUUklOR19TSCAgPSA2LFxyXG4gICAgV0VFS19TVFJJTkdfTEcgID0gNyxcclxuICAgIElTT184NjAxX0RBVEUgICA9IDgsXHJcbiAgICBURVhUID0gOVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyaW9kUGFyc2VyIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbW9udGhXZWVrRm9ybWF0cyA9IHtcclxuICAgICAgICBcIk1PTlRIX1NUUklOR19TSFwiOiBbXHJcbiAgICAgICAgICAgIFwiamFuXCIsXHJcbiAgICAgICAgICAgIFwiZmViXCIsXHJcbiAgICAgICAgICAgIFwibWFyXCIsXHJcbiAgICAgICAgICAgIFwiYXByXCIsXHJcbiAgICAgICAgICAgIFwibWF5XCIsXHJcbiAgICAgICAgICAgIFwianVuXCIsXHJcbiAgICAgICAgICAgIFwianVsXCIsXHJcbiAgICAgICAgICAgIFwiYXVnXCIsXHJcbiAgICAgICAgICAgIFwic2VwXCIsXHJcbiAgICAgICAgICAgIFwib2N0XCIsXHJcbiAgICAgICAgICAgIFwibm92XCIsXHJcbiAgICAgICAgICAgIFwiZGVjXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiTU9OVEhfU1RSSU5HX0xHXCI6IFtcclxuICAgICAgICAgICAgXCJqYW51YXJ5XCIsXHJcbiAgICAgICAgICAgIFwiZmVicnVhcnlcIixcclxuICAgICAgICAgICAgXCJtYXJjaFwiLFxyXG4gICAgICAgICAgICBcImFwcmlsXCIsXHJcbiAgICAgICAgICAgIFwibWF5XCIsXHJcbiAgICAgICAgICAgIFwianVuZVwiLFxyXG4gICAgICAgICAgICBcImp1bHlcIixcclxuICAgICAgICAgICAgXCJhdWd1c3RcIixcclxuICAgICAgICAgICAgXCJzZXB0ZW1iZXJcIixcclxuICAgICAgICAgICAgXCJvY3RvYmVyXCIsXHJcbiAgICAgICAgICAgIFwibm92ZW1iZXJcIixcclxuICAgICAgICAgICAgXCJkZWNlbWJlclwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIldFRUtfU1RSSU5HX1NIXCI6IFtcInN1blwiLCBcIm1vblwiLCBcInR1ZVwiLCBcIndlZFwiLCBcInRodVwiLCBcImZyaVwiLCBcInNhdFwiXSxcclxuICAgICAgICBcIldFRUtfU1RSSU5HX0xHXCI6IFtcclxuICAgICAgICAgICAgXCJzdW5kYXlcIixcclxuICAgICAgICAgICAgXCJtb25kYXlcIixcclxuICAgICAgICAgICAgXCJ0dWVzZGF5XCIsXHJcbiAgICAgICAgICAgIFwid2VkbmVzZGF5XCIsXHJcbiAgICAgICAgICAgIFwidGh1cnNkYXlcIixcclxuICAgICAgICAgICAgXCJmcmlkYXlcIixcclxuICAgICAgICAgICAgXCJzYXR1cmRheVwiXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBjaGVja01vbnRoV2Vla0Zvcm1hdChzdHI6IHN0cmluZykge1xyXG4gICAgICAgIGlmKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgbXdGb3JtYXRzID0gUGVyaW9kUGFyc2VyLm1vbnRoV2Vla0Zvcm1hdHM7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0VHlwZXMgPSBPYmplY3Qua2V5cyhtd0Zvcm1hdHMpO1xyXG4gICAgICAgIGxldCBwZXJpb2RGb3JtYXQ6IHN0cmluZztcclxuICAgICAgICBsZXQgbWF0Y2hGb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIHN0ciA9IHN0ci50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZvcm1hdFR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hdGNoRm91bmQgPSBtd0Zvcm1hdHNbZm9ybWF0VHlwZXNbaV1dLnNvbWUoKGl0ZW06IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0gPT09IHN0cjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hGb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgcGVyaW9kRm9ybWF0ID0gZm9ybWF0VHlwZXNbaV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGVyaW9kRm9ybWF0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldFBlcmlvZFR5cGUocGVyaW9kOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHBlcmlvZCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gUGVyaW9kVHlwZXMuTlVNQkVSO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBlcmlvZFR5cGUgPSBQZXJpb2RQYXJzZXIuY2hlY2tNb250aFdlZWtGb3JtYXQocGVyaW9kKTtcclxuICAgICAgICBpZiAocGVyaW9kVHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUGVyaW9kVHlwZXNbcGVyaW9kVHlwZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gUGVyaW9kVHlwZXMuVEVYVDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcm9jZXNzTnVtYmVyKHBlcmlvZHM6IG51bWJlcltdKTogbnVtYmVyW10ge1xyXG4gICAgICAgIGNvbnN0IHNvcnRlZFBlcmlvZCA9IHBlcmlvZHMuc2xpY2UoKS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICAgICAgcmV0dXJuIHNvcnRlZFBlcmlvZDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcm9jZXNzTW9udGhXZWVrKFxyXG4gICAgICAgIHBlcmlvZHM6IHN0cmluZ1tdLFxyXG4gICAgICAgIHBlcmlvZFR5cGUgOiBudW1iZXJcclxuICAgICk6IGFueVtdIHtcclxuICAgICAgICByZXR1cm4gUGVyaW9kUGFyc2VyLm1vbnRoV2Vla0Zvcm1hdHNbUGVyaW9kVHlwZXNbcGVyaW9kVHlwZV1dO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHByb2Nlc3NUZXh0UGVyaW9kKHBlcmlvZHM6IHN0cmluZ1tdKSA6IGFueVtdIHtcclxuICAgICAgICBjb25zdCBzcmMgPSBwZXJpb2RzLnNsaWNlKCkuc29ydCgpO1xyXG4gICAgICAgIHJldHVybiBzcmM7XHJcbiAgICB9XHJcblxyXG4gICAgIHByaXZhdGUgc3RhdGljIGdldFNvcnRlZEluZGV4ZXMoXHJcbiAgICAgICAgcGVyaW9kczogc3RyaW5nW10gfCBudW1iZXJbXSxcclxuICAgICAgICBwZXJpb2RUeXBlOiBudW1iZXJcclxuICAgICk6IG51bWJlcltdIHtcclxuICAgICAgICBzd2l0Y2ggKHBlcmlvZFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBQZXJpb2RUeXBlcy5OVU1CRVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUGVyaW9kUGFyc2VyLnByb2Nlc3NOdW1iZXIocGVyaW9kcyBhcyBudW1iZXJbXSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFBlcmlvZFR5cGVzLk1PTlRIX1NUUklOR19MRzpcclxuICAgICAgICAgICAgY2FzZSBQZXJpb2RUeXBlcy5NT05USF9TVFJJTkdfU0g6XHJcbiAgICAgICAgICAgIGNhc2UgUGVyaW9kVHlwZXMuV0VFS19TVFJJTkdfTEc6XHJcbiAgICAgICAgICAgIGNhc2UgUGVyaW9kVHlwZXMuV0VFS19TVFJJTkdfU0g6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUGVyaW9kUGFyc2VyLnByb2Nlc3NNb250aFdlZWsocGVyaW9kcyBhcyBzdHJpbmdbXSAsIHBlcmlvZFR5cGUpO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBQZXJpb2RUeXBlcy5URVhUOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBlcmlvZFBhcnNlci5wcm9jZXNzVGV4dFBlcmlvZChwZXJpb2RzIGFzIHN0cmluZ1tdKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTb3J0ZWRPcmRlcihwZXJpb2RzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIGNvbnN0IHBlcmlvZCA9IHBlcmlvZHNbMF07XHJcbiAgICAgICAgbGV0IHBlcmlvZFR5cGUgPSBQZXJpb2RQYXJzZXIuZ2V0UGVyaW9kVHlwZShwZXJpb2QpOyAgXHJcbiAgICAgICAgcmV0dXJuIFBlcmlvZFBhcnNlci5nZXRTb3J0ZWRJbmRleGVzKHBlcmlvZHMscGVyaW9kVHlwZSlcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=