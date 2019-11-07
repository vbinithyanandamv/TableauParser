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

var dataFormatMap = {
  /* tslint:disable */
  "with_actual_data": with_actual_data,
  "no_periods": no_periods,
  "measure_as_category": measure_as_category,
  "no_category": no_category,
  "single_measure": single_measure
};

var DataParser = exports.DataParser = function DataParser() {
  _classCallCheck(this, DataParser);

  _defineProperty(this, "convertData", function (dataType) {
    var TableauData = dataFormatMap[dataType]; //series should be based on number of measures

    if (dataType === "with_actual_data" || dataType === "single_measure") {
      return DataParser.transformPeriodData(dataType, TableauData);
    } else if (dataType === "no_periods") {
      return DataParser.transformnoPeriodData(TableauData);
    }
  });
};

_defineProperty(DataParser, "transformPeriodData", function (dataType, tableauData) {
  var categoryData = new Map();
  var periods = [];
  var periodsObj = [];
  var periodDetector = new _periodParser.PeriodParser(); //can be limited based on number of periods

  var _loop = function _loop() {
    var data = tableauData[0]._data[i];

    if (!periods.some(function (period) {
      return period === data[3]._value;
    })) {
      periods.push(data[3]._value);
    }
  };

  for (var i = 0; i < tableauData[0]._data.length; i++) {
    _loop();
  }

  var periodOrder = periodDetector.getSortedOrder(periods);
  var numberOfPeriods = periods.length; //can be get from editor also

  var level;
  var levelValue = {
    0: 2,
    1: 0
  }; // data map need to be done based on data utility

  tableauData[0]._data.map(function (data) {
    level = 1; //based on number of category

    if (!categoryData.has(data[1]._value)) {
      //First add root
      categoryData.set(data[1]._value, {
        id: data[1]._value,
        label: data[1]._formattedValue,
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
      return addChildren(parent, data[levelValue[level]]);
    };

    var leafChildren = addChildren(categoryData.get(data[1]._value), data[0]); //update data from children to parent

    var updateData = function updateData(node) {
      node.series[0] = !node.series[0] ? [] : node.series[0];
      var periodValueIndex = periodOrder.indexOf(data[3]._value.toLowerCase());

      if (!node.series[0][periodValueIndex]) {
        node.series[0][periodValueIndex] = data[4]._value;

        if (dataType !== "single_measure") {
          node.series[1] = !node.series[1] ? [] : node.series[1];
          node.series[1][periodValueIndex] = data[5]._value;
        }
      } else {
        node.series[0][periodValueIndex] = node.series[0][periodValueIndex] + data[4]._value; //    node.series[0].set(data[3]._value, budget);

        if (dataType !== "single_measure") {
          node.series[1][periodValueIndex] = node.series[1][periodValueIndex] + data[5]._value; // node.series[1].set(data[3]._value, forecast);
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
    var data = tableauData[0]._data[i];
    var periodData = {
      id: data[3]._value,
      label: data[3]._formattedValue
    };

    if (!periodsObj.some(function (period) {
      return period.id === data[3]._value;
    })) {
      periodsObj[periodOrder.indexOf(data[3]._value.toLowerCase())] = periodData;
    }
  };

  for (var i = 0; i < tableauData[0]._data.length; i++) {
    _loop2();
  }

  if (dataType == "single_measure") {
    seriesNames = [tableauData[0]._columns[4]._fieldName];
  } else {
    seriesNames = [tableauData[0]._columns[4]._fieldName, tableauData[0]._columns[5]._fieldName];
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
  var period_length = tableauData[0]._columns.length - 1; //dimension length

  var number_of_periods = 12; //should be coming from editor

  var number_of_series = period_length / number_of_periods;
  var rows = new Map();
  var periods = [];
  var i; //get periods

  for (i = 1; i <= period_length; i++) {
    //i == count should be number of dimension
    periods.push(tableauData[0]._columns[i]._fieldName);
  }

  tableauData[0]._data.map(function (row_data) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVyaW9kUGFyc2VyLnRzIl0sIm5hbWVzIjpbImRhdGFGb3JtYXRNYXAiLCJ3aXRoX2FjdHVhbF9kYXRhIiwibm9fcGVyaW9kcyIsIm1lYXN1cmVfYXNfY2F0ZWdvcnkiLCJub19jYXRlZ29yeSIsInNpbmdsZV9tZWFzdXJlIiwiRGF0YVBhcnNlciIsImRhdGFUeXBlIiwiVGFibGVhdURhdGEiLCJ0cmFuc2Zvcm1QZXJpb2REYXRhIiwidHJhbnNmb3Jtbm9QZXJpb2REYXRhIiwidGFibGVhdURhdGEiLCJjYXRlZ29yeURhdGEiLCJNYXAiLCJwZXJpb2RzIiwicGVyaW9kc09iaiIsInBlcmlvZERldGVjdG9yIiwiUGVyaW9kUGFyc2VyIiwiZGF0YSIsIl9kYXRhIiwiaSIsInNvbWUiLCJwZXJpb2QiLCJfdmFsdWUiLCJwdXNoIiwibGVuZ3RoIiwicGVyaW9kT3JkZXIiLCJnZXRTb3J0ZWRPcmRlciIsIm51bWJlck9mUGVyaW9kcyIsImxldmVsIiwibGV2ZWxWYWx1ZSIsIm1hcCIsImhhcyIsInNldCIsImlkIiwibGFiZWwiLCJfZm9ybWF0dGVkVmFsdWUiLCJjaGlsZHJlbiIsInNlcmllcyIsInBhcmVudCIsImFkZENoaWxkcmVuIiwiZ2V0IiwibGVhZkNoaWxkcmVuIiwidXBkYXRlRGF0YSIsIm5vZGUiLCJwZXJpb2RWYWx1ZUluZGV4IiwiaW5kZXhPZiIsInRvTG93ZXJDYXNlIiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwibWFwdG9BcnJheSIsInNlcmllc05hbWVzIiwicGVyaW9kRGF0YSIsIl9jb2x1bW5zIiwiX2ZpZWxkTmFtZSIsInByb3BzIiwicm93cyIsIm1ldGFkYXRhIiwicGVyaW9kX2xlbmd0aCIsIm51bWJlcl9vZl9wZXJpb2RzIiwibnVtYmVyX29mX3NlcmllcyIsInJvd19kYXRhIiwic2VyaWVzSW5kZXgiLCJNYXRoIiwiY2VpbCIsImN1cnJlbnRSb3ciLCJQZXJpb2RUeXBlcyIsInBlcmlvZFR5cGUiLCJnZXRQZXJpb2RUeXBlIiwiZ2V0U29ydGVkSW5kZXhlcyIsInN0ciIsIm13Rm9ybWF0cyIsIm1vbnRoV2Vla0Zvcm1hdHMiLCJmb3JtYXRUeXBlcyIsIk9iamVjdCIsImtleXMiLCJwZXJpb2RGb3JtYXQiLCJtYXRjaEZvdW5kIiwiaXRlbSIsIk5VTUJFUiIsImNoZWNrTW9udGhXZWVrRm9ybWF0IiwiVEVYVCIsInNvcnRlZFBlcmlvZCIsInNsaWNlIiwic29ydCIsImEiLCJiIiwic3JjIiwicHJvY2Vzc051bWJlciIsIk1PTlRIX1NUUklOR19MRyIsIk1PTlRIX1NUUklOR19TSCIsIldFRUtfU1RSSU5HX0xHIiwiV0VFS19TVFJJTkdfU0giLCJwcm9jZXNzTW9udGhXZWVrIiwicHJvY2Vzc1RleHRQZXJpb2QiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtR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QkFBYixDQUErQmpGLE9BQS9CLENBQVA7QUFYUjtBQWNIOzs7Ozs7Z0JBckhRRyxZLHNCQU15QjtBQUM5QixxQkFBbUIsQ0FDZixLQURlLEVBRWYsS0FGZSxFQUdmLEtBSGUsRUFJZixLQUplLEVBS2YsS0FMZSxFQU1mLEtBTmUsRUFPZixLQVBlLEVBUWYsS0FSZSxFQVNmLEtBVGUsRUFVZixLQVZlLEVBV2YsS0FYZSxFQVlmLEtBWmUsQ0FEVztBQWU5QixxQkFBbUIsQ0FDZixTQURlLEVBRWYsVUFGZSxFQUdmLE9BSGUsRUFJZixPQUplLEVBS2YsS0FMZSxFQU1mLE1BTmUsRUFPZixNQVBlLEVBUWYsUUFSZSxFQVNmLFdBVGUsRUFVZixTQVZlLEVBV2YsVUFYZSxFQVlmLFVBWmUsQ0FmVztBQTZCOUIsb0JBQWtCLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLEtBQXBDLEVBQTJDLEtBQTNDLENBN0JZO0FBOEI5QixvQkFBa0IsQ0FDZCxRQURjLEVBRWQsUUFGYyxFQUdkLFNBSGMsRUFJZCxXQUpjLEVBS2QsVUFMYyxFQU1kLFFBTmMsRUFPZCxVQVBjO0FBOUJZLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IGZhY3RvcnkoKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvZGF0YVBhcnNlci50c1wiKTtcbiIsImltcG9ydCB7IFBlcmlvZFBhcnNlciB9IGZyb20gXCIuL3BlcmlvZFBhcnNlclwiO1xyXG5cclxubGV0IGRhdGFGb3JtYXRNYXAgPSB7ICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gICAgICAgICAgICBcIndpdGhfYWN0dWFsX2RhdGFcIjogd2l0aF9hY3R1YWxfZGF0YSxcclxuICAgICAgICAgICAgXCJub19wZXJpb2RzXCI6IG5vX3BlcmlvZHMsXHJcbiAgICAgICAgICAgIFwibWVhc3VyZV9hc19jYXRlZ29yeVwiOiBtZWFzdXJlX2FzX2NhdGVnb3J5LFxyXG4gICAgICAgICAgICBcIm5vX2NhdGVnb3J5XCI6IG5vX2NhdGVnb3J5LFxyXG4gICAgICAgICAgICBcInNpbmdsZV9tZWFzdXJlXCI6IHNpbmdsZV9tZWFzdXJlXHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhUGFyc2VyIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHJhbnNmb3JtUGVyaW9kRGF0YSA9IChkYXRhVHlwZSx0YWJsZWF1RGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBjYXRlZ29yeURhdGEgOmFueSA9IG5ldyBNYXAoKTtcclxuICAgICAgICBsZXQgcGVyaW9kcyA9IFtdO1xyXG4gICAgICAgIGxldCBwZXJpb2RzT2JqID0gW107XHJcbiAgICAgICAgbGV0IHBlcmlvZERldGVjdG9yID0gbmV3IFBlcmlvZFBhcnNlcigpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9jYW4gYmUgbGltaXRlZCBiYXNlZCBvbiBudW1iZXIgb2YgcGVyaW9kc1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGVhdURhdGFbMF0uX2RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgIGNvbnN0IGRhdGEgPXRhYmxlYXVEYXRhWzBdLl9kYXRhW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXBlcmlvZHMuc29tZShwZXJpb2QgPT4gcGVyaW9kID09PSBkYXRhWzNdLl92YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHBlcmlvZHMucHVzaChkYXRhWzNdLl92YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBlcmlvZE9yZGVyIDogYW55ID0gcGVyaW9kRGV0ZWN0b3IuZ2V0U29ydGVkT3JkZXIocGVyaW9kcyk7XHJcblxyXG4gICAgICAgIGxldCBudW1iZXJPZlBlcmlvZHMgPSBwZXJpb2RzLmxlbmd0aDsgLy9jYW4gYmUgZ2V0IGZyb20gZWRpdG9yIGFsc29cclxuICAgICAgICBsZXQgbGV2ZWw7XHJcbiAgICAgICAgbGV0IGxldmVsVmFsdWUgPSB7XHJcbiAgICAgICAgICAgIDA6IDIsXHJcbiAgICAgICAgICAgIDE6IDBcclxuICAgICAgICB9OyAvLyBkYXRhIG1hcCBuZWVkIHRvIGJlIGRvbmUgYmFzZWQgb24gZGF0YSB1dGlsaXR5XHJcblxyXG4gICAgICAgIHRhYmxlYXVEYXRhWzBdLl9kYXRhLm1hcChkYXRhID0+IHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldmVsID0gMTsgLy9iYXNlZCBvbiBudW1iZXIgb2YgY2F0ZWdvcnlcclxuXHJcbiAgICAgICAgICAgIGlmICghY2F0ZWdvcnlEYXRhLmhhcyhkYXRhWzFdLl92YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vRmlyc3QgYWRkIHJvb3RcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5RGF0YS5zZXQoZGF0YVsxXS5fdmFsdWUsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogZGF0YVsxXS5fdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGRhdGFbMV0uX2Zvcm1hdHRlZFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzOiBbW10sIFtdXSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG51bGxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYWRkQ2hpbGRyZW4gPSAocGFyZW50LCBjaGlsZHJlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy90aGVuIGFkZCBjaGlsZHJlbiByZWN1cnNpdmVseSBhbmQgZm9ybSB0aGUgc3RydWN0dXJlXHJcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghcGFyZW50LmNoaWxkcmVuLmhhcyhjaGlsZHJlbi5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuLnNldChjaGlsZHJlbi5fdmFsdWUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGNoaWxkcmVuLl92YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGNoaWxkcmVuLl9mb3JtYXR0ZWRWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VyaWVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBwYXJlbnRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldmVsLS07XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQuY2hpbGRyZW4uZ2V0KGNoaWxkcmVuLl92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRkQ2hpbGRyZW4ocGFyZW50LCBkYXRhW2xldmVsVmFsdWVbbGV2ZWxdXSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgbGVhZkNoaWxkcmVuID0gYWRkQ2hpbGRyZW4oY2F0ZWdvcnlEYXRhLmdldChkYXRhWzFdLl92YWx1ZSksIGRhdGFbMF0pO1xyXG5cclxuICAgICAgICAgICAgLy91cGRhdGUgZGF0YSBmcm9tIGNoaWxkcmVuIHRvIHBhcmVudFxyXG4gICAgICAgICAgICBsZXQgdXBkYXRlRGF0YSA9IChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnNlcmllc1swXSA9ICFub2RlLnNlcmllc1swXSA/IFtdIDogbm9kZS5zZXJpZXNbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgcGVyaW9kVmFsdWVJbmRleCA9IHBlcmlvZE9yZGVyLmluZGV4T2YoZGF0YVszXS5fdmFsdWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuc2VyaWVzWzBdW3BlcmlvZFZhbHVlSW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbMF1bcGVyaW9kVmFsdWVJbmRleF0gPSBkYXRhWzRdLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVR5cGUgIT09IFwic2luZ2xlX21lYXN1cmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNlcmllc1sxXSA9ICFub2RlLnNlcmllc1sxXSA/IFtdIDogbm9kZS5zZXJpZXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2VyaWVzWzFdW3BlcmlvZFZhbHVlSW5kZXhdID0gZGF0YVs1XS5fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNlcmllc1swXVtwZXJpb2RWYWx1ZUluZGV4XSA9IG5vZGUuc2VyaWVzWzBdW3BlcmlvZFZhbHVlSW5kZXhdICsgZGF0YVs0XS5fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBub2RlLnNlcmllc1swXS5zZXQoZGF0YVszXS5fdmFsdWUsIGJ1ZGdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFUeXBlICE9PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbMV1bcGVyaW9kVmFsdWVJbmRleF0gPSBub2RlLnNlcmllc1sxXVtwZXJpb2RWYWx1ZUluZGV4XSArIGRhdGFbNV0uX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIG5vZGUuc2VyaWVzWzFdLnNldChkYXRhWzNdLl92YWx1ZSwgZm9yZWNhc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGEobm9kZS5wYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlRGF0YShsZWFmQ2hpbGRyZW4pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2NvbnZlcnQgdG8gVkRUIERBVEEgRm9ybWF0XHJcbiAgICAgICAgY2F0ZWdvcnlEYXRhID0gQXJyYXkuZnJvbShjYXRlZ29yeURhdGEudmFsdWVzKCkpO1xyXG5cclxuICAgICAgICBjYXRlZ29yeURhdGEubWFwKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWFwdG9BcnJheSA9IG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IEFycmF5LmZyb20obm9kZS5jaGlsZHJlbi52YWx1ZXMoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLm1hcChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXB0b0FycmF5KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1hcHRvQXJyYXkobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzZXJpZXNOYW1lcyA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlYXVEYXRhWzBdLl9kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICBjb25zdCBkYXRhID10YWJsZWF1RGF0YVswXS5fZGF0YVtpXTtcclxuICAgICAgICAgICAgIGxldCBwZXJpb2REYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGRhdGFbM10uX3ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IGRhdGFbM10uX2Zvcm1hdHRlZFZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICghcGVyaW9kc09iai5zb21lKHBlcmlvZCA9PiBwZXJpb2QuaWQgPT09IGRhdGFbM10uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcGVyaW9kc09ialtwZXJpb2RPcmRlci5pbmRleE9mKGRhdGFbM10uX3ZhbHVlLnRvTG93ZXJDYXNlKCkpXSA9IHBlcmlvZERhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChkYXRhVHlwZSA9PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgc2VyaWVzTmFtZXMgPSBbdGFibGVhdURhdGFbMF0uX2NvbHVtbnNbNF0uX2ZpZWxkTmFtZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VyaWVzTmFtZXMgPSBbXHJcbiAgICAgICAgICAgICAgICB0YWJsZWF1RGF0YVswXS5fY29sdW1uc1s0XS5fZmllbGROYW1lLFxyXG4gICAgICAgICAgICAgICAgdGFibGVhdURhdGFbMF0uX2NvbHVtbnNbNV0uX2ZpZWxkTmFtZVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHByb3BzID0ge1xyXG4gICAgICAgICAgICBwZXJpb2RzOiBwZXJpb2RzT2JqLFxyXG4gICAgICAgICAgICByb3dzOiBjYXRlZ29yeURhdGEsXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RzOiBwZXJpb2RzT2JqLFxyXG4gICAgICAgICAgICAgICAgc2VyaWVzOiBzZXJpZXNOYW1lc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB0cmFuc2Zvcm1ub1BlcmlvZERhdGEgPSAodGFibGVhdURhdGEpID0+IHtcclxuICAgICAgICBsZXQgcGVyaW9kX2xlbmd0aCA9IHRhYmxlYXVEYXRhWzBdLl9jb2x1bW5zLmxlbmd0aCAtIDE7IC8vZGltZW5zaW9uIGxlbmd0aFxyXG4gICAgICAgIGxldCBudW1iZXJfb2ZfcGVyaW9kcyA9IDEyOyAvL3Nob3VsZCBiZSBjb21pbmcgZnJvbSBlZGl0b3JcclxuICAgICAgICBsZXQgbnVtYmVyX29mX3NlcmllcyA9IHBlcmlvZF9sZW5ndGggLyBudW1iZXJfb2ZfcGVyaW9kcztcclxuICAgICAgICBsZXQgcm93cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICBsZXQgcGVyaW9kcyA9IFtdO1xyXG4gICAgICAgIGxldCBpO1xyXG5cclxuICAgICAgICAvL2dldCBwZXJpb2RzXHJcbiAgICAgICAgZm9yIChpID0gMTsgaSA8PSBwZXJpb2RfbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy9pID09IGNvdW50IHNob3VsZCBiZSBudW1iZXIgb2YgZGltZW5zaW9uXHJcbiAgICAgICAgICAgIHBlcmlvZHMucHVzaCh0YWJsZWF1RGF0YVswXS5fY29sdW1uc1tpXS5fZmllbGROYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRhYmxlYXVEYXRhWzBdLl9kYXRhLm1hcChyb3dfZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghcm93cy5oYXMocm93X2RhdGFbMF0uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgLy9GaXJzdCBhZGQgcm9vdFxyXG4gICAgICAgICAgICAgICAgcm93cy5zZXQocm93X2RhdGFbMF0uX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHJvd19kYXRhWzBdLl92YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogcm93X2RhdGFbMF0uX2Zvcm1hdHRlZFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllczogW11cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdXBkYXRlIGRhdGEgYmFzZWQgb24gcGVyaW9kc1xyXG4gICAgICAgICAgICBsZXQgaTtcclxuICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8PSBwZXJpb2RfbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIC8vaSA9PSBjb3VudCBzaG91bGQgYmUgbnVtYmVyIG9mIGRpbWVuc2lvblxyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllc0luZGV4ID0gTWF0aC5jZWlsKGkgLyAxMikgLSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRSb3cgPSByb3dzLmdldChyb3dfZGF0YVswXS5fdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFJvdy5zZXJpZXNbc2VyaWVzSW5kZXhdID0gY3VycmVudFJvdy5zZXJpZXNbc2VyaWVzSW5kZXhdID9cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Um93LnNlcmllc1tzZXJpZXNJbmRleF0gOlxyXG4gICAgICAgICAgICAgICAgICAgIFtdO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFJvdy5zZXJpZXNbc2VyaWVzSW5kZXhdLnB1c2gocm93X2RhdGFbaV0uX3ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHBlcmlvZHM6IFt7XHJcbiAgICAgICAgICAgICAgICBpZDogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCIxXCJcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIHJvd3M6IEFycmF5LmZyb20ocm93cy52YWx1ZXMoKSksXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RzOiBwZXJpb2RzLFxyXG4gICAgICAgICAgICAgICAgc2VyaWVzOiBbXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gcHJvcHM7XHJcbiAgICB9O1xyXG4gICAgY29udmVydERhdGEgPSAoZGF0YVR5cGUpID0+IHtcclxuICAgICAgICBsZXQgVGFibGVhdURhdGEgPSBkYXRhRm9ybWF0TWFwW2RhdGFUeXBlXTtcclxuICAgICAgICAvL3NlcmllcyBzaG91bGQgYmUgYmFzZWQgb24gbnVtYmVyIG9mIG1lYXN1cmVzXHJcbiAgICAgICAgaWYgKGRhdGFUeXBlID09PSBcIndpdGhfYWN0dWFsX2RhdGFcIiB8fCBkYXRhVHlwZSA9PT0gXCJzaW5nbGVfbWVhc3VyZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhUGFyc2VyLnRyYW5zZm9ybVBlcmlvZERhdGEoZGF0YVR5cGUsVGFibGVhdURhdGEpXHJcbiAgICAgICAgfWVsc2UgaWYgKGRhdGFUeXBlID09PSBcIm5vX3BlcmlvZHNcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0YVBhcnNlci50cmFuc2Zvcm1ub1BlcmlvZERhdGEoVGFibGVhdURhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSIsImltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XHJcblxyXG5lbnVtIFBlcmlvZFR5cGVzIHtcclxuICAgIE5VTUJFUiA9IDEsXHJcbiAgICBDT0xPTl9TRVBBUkFURURfSU5ERVggPSAyLFxyXG4gICAgSU5ERVhfQVRfRU5EID0gMyxcclxuICAgIE1PTlRIX1NUUklOR19TSCA9IDQsXHJcbiAgICBNT05USF9TVFJJTkdfTEcgPSA1LFxyXG4gICAgV0VFS19TVFJJTkdfU0ggID0gNixcclxuICAgIFdFRUtfU1RSSU5HX0xHICA9IDcsXHJcbiAgICBJU09fODYwMV9EQVRFICAgPSA4LFxyXG4gICAgVEVYVCA9IDlcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBlcmlvZFBhcnNlciB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIG1vbnRoV2Vla0Zvcm1hdHMgPSB7XHJcbiAgICAgICAgXCJNT05USF9TVFJJTkdfU0hcIjogW1xyXG4gICAgICAgICAgICBcImphblwiLFxyXG4gICAgICAgICAgICBcImZlYlwiLFxyXG4gICAgICAgICAgICBcIm1hclwiLFxyXG4gICAgICAgICAgICBcImFwclwiLFxyXG4gICAgICAgICAgICBcIm1heVwiLFxyXG4gICAgICAgICAgICBcImp1blwiLFxyXG4gICAgICAgICAgICBcImp1bFwiLFxyXG4gICAgICAgICAgICBcImF1Z1wiLFxyXG4gICAgICAgICAgICBcInNlcFwiLFxyXG4gICAgICAgICAgICBcIm9jdFwiLFxyXG4gICAgICAgICAgICBcIm5vdlwiLFxyXG4gICAgICAgICAgICBcImRlY1wiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIk1PTlRIX1NUUklOR19MR1wiOiBbXHJcbiAgICAgICAgICAgIFwiamFudWFyeVwiLFxyXG4gICAgICAgICAgICBcImZlYnJ1YXJ5XCIsXHJcbiAgICAgICAgICAgIFwibWFyY2hcIixcclxuICAgICAgICAgICAgXCJhcHJpbFwiLFxyXG4gICAgICAgICAgICBcIm1heVwiLFxyXG4gICAgICAgICAgICBcImp1bmVcIixcclxuICAgICAgICAgICAgXCJqdWx5XCIsXHJcbiAgICAgICAgICAgIFwiYXVndXN0XCIsXHJcbiAgICAgICAgICAgIFwic2VwdGVtYmVyXCIsXHJcbiAgICAgICAgICAgIFwib2N0b2JlclwiLFxyXG4gICAgICAgICAgICBcIm5vdmVtYmVyXCIsXHJcbiAgICAgICAgICAgIFwiZGVjZW1iZXJcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJXRUVLX1NUUklOR19TSFwiOiBbXCJzdW5cIiwgXCJtb25cIiwgXCJ0dWVcIiwgXCJ3ZWRcIiwgXCJ0aHVcIiwgXCJmcmlcIiwgXCJzYXRcIl0sXHJcbiAgICAgICAgXCJXRUVLX1NUUklOR19MR1wiOiBbXHJcbiAgICAgICAgICAgIFwic3VuZGF5XCIsXHJcbiAgICAgICAgICAgIFwibW9uZGF5XCIsXHJcbiAgICAgICAgICAgIFwidHVlc2RheVwiLFxyXG4gICAgICAgICAgICBcIndlZG5lc2RheVwiLFxyXG4gICAgICAgICAgICBcInRodXJzZGF5XCIsXHJcbiAgICAgICAgICAgIFwiZnJpZGF5XCIsXHJcbiAgICAgICAgICAgIFwic2F0dXJkYXlcIlxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tNb250aFdlZWtGb3JtYXQoc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICBpZih0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IG13Rm9ybWF0cyA9IFBlcmlvZFBhcnNlci5tb250aFdlZWtGb3JtYXRzO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdFR5cGVzID0gT2JqZWN0LmtleXMobXdGb3JtYXRzKTtcclxuICAgICAgICBsZXQgcGVyaW9kRm9ybWF0OiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IG1hdGNoRm91bmQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBzdHIgPSBzdHIudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb3JtYXRUeXBlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBtYXRjaEZvdW5kID0gbXdGb3JtYXRzW2Zvcm1hdFR5cGVzW2ldXS5zb21lKChpdGVtOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtID09PSBzdHI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoRm91bmQpIHtcclxuICAgICAgICAgICAgICAgIHBlcmlvZEZvcm1hdCA9IGZvcm1hdFR5cGVzW2ldO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBlcmlvZEZvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRQZXJpb2RUeXBlKHBlcmlvZDogc3RyaW5nIHwgbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwZXJpb2QgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBlcmlvZFR5cGVzLk5VTUJFUjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwZXJpb2RUeXBlID0gUGVyaW9kUGFyc2VyLmNoZWNrTW9udGhXZWVrRm9ybWF0KHBlcmlvZCk7XHJcbiAgICAgICAgaWYgKHBlcmlvZFR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBlcmlvZFR5cGVzW3BlcmlvZFR5cGVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFBlcmlvZFR5cGVzLlRFWFQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJvY2Vzc051bWJlcihwZXJpb2RzOiBudW1iZXJbXSk6IG51bWJlcltdIHtcclxuICAgICAgICBjb25zdCBzb3J0ZWRQZXJpb2QgPSBwZXJpb2RzLnNsaWNlKCkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgICAgIHJldHVybiBzb3J0ZWRQZXJpb2Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJvY2Vzc01vbnRoV2VlayhcclxuICAgICAgICBwZXJpb2RzOiBzdHJpbmdbXSxcclxuICAgICAgICBwZXJpb2RUeXBlIDogbnVtYmVyXHJcbiAgICApOiBhbnlbXSB7XHJcbiAgICAgICAgcmV0dXJuIFBlcmlvZFBhcnNlci5tb250aFdlZWtGb3JtYXRzW1BlcmlvZFR5cGVzW3BlcmlvZFR5cGVdXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBwcm9jZXNzVGV4dFBlcmlvZChwZXJpb2RzOiBzdHJpbmdbXSkgOiBhbnlbXSB7XHJcbiAgICAgICAgY29uc3Qgc3JjID0gcGVyaW9kcy5zbGljZSgpLnNvcnQoKTtcclxuICAgICAgICByZXR1cm4gc3JjO1xyXG4gICAgfVxyXG5cclxuICAgICBwcml2YXRlIHN0YXRpYyBnZXRTb3J0ZWRJbmRleGVzKFxyXG4gICAgICAgIHBlcmlvZHM6IHN0cmluZ1tdIHwgbnVtYmVyW10sXHJcbiAgICAgICAgcGVyaW9kVHlwZTogbnVtYmVyXHJcbiAgICApOiBudW1iZXJbXSB7XHJcbiAgICAgICAgc3dpdGNoIChwZXJpb2RUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUGVyaW9kVHlwZXMuTlVNQkVSOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBlcmlvZFBhcnNlci5wcm9jZXNzTnVtYmVyKHBlcmlvZHMgYXMgbnVtYmVyW10pO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBQZXJpb2RUeXBlcy5NT05USF9TVFJJTkdfTEc6XHJcbiAgICAgICAgICAgIGNhc2UgUGVyaW9kVHlwZXMuTU9OVEhfU1RSSU5HX1NIOlxyXG4gICAgICAgICAgICBjYXNlIFBlcmlvZFR5cGVzLldFRUtfU1RSSU5HX0xHOlxyXG4gICAgICAgICAgICBjYXNlIFBlcmlvZFR5cGVzLldFRUtfU1RSSU5HX1NIOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBlcmlvZFBhcnNlci5wcm9jZXNzTW9udGhXZWVrKHBlcmlvZHMgYXMgc3RyaW5nW10gLCBwZXJpb2RUeXBlKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgUGVyaW9kVHlwZXMuVEVYVDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBQZXJpb2RQYXJzZXIucHJvY2Vzc1RleHRQZXJpb2QocGVyaW9kcyBhcyBzdHJpbmdbXSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U29ydGVkT3JkZXIocGVyaW9kczogc3RyaW5nW10pIHtcclxuICAgICAgICBjb25zdCBwZXJpb2QgPSBwZXJpb2RzWzBdO1xyXG4gICAgICAgIGxldCBwZXJpb2RUeXBlID0gUGVyaW9kUGFyc2VyLmdldFBlcmlvZFR5cGUocGVyaW9kKTsgIFxyXG4gICAgICAgIHJldHVybiBQZXJpb2RQYXJzZXIuZ2V0U29ydGVkSW5kZXhlcyhwZXJpb2RzLHBlcmlvZFR5cGUpXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9