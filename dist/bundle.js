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
  var _this = this;

  _classCallCheck(this, DataParser);

  _defineProperty(this, "periodParser", void 0);

  _defineProperty(this, "convertData", function (options, data) {
    var TableauData = data; //series should be based on number of measures

    if (options.dataType === "with_actual_data" || options.dataType === "single_measure") {
      return DataParser.transformPeriodData(options, TableauData, _this.periodParser);
    } else if (options.dataType === "no_category") {
      return DataParser.transformNoCategoryData(options, TableauData, _this.periodParser);
    } else if (options.dataType === "no_periods") {
      return DataParser.transformNoPeriodData(TableauData);
    }
  });

  this.periodParser = new _periodParser.PeriodParser();
};

_defineProperty(DataParser, "DataUtilityTransform", function (options, tableauData) {
  var mapConfig = {
    'hierMap': {},
    'timePeriod': 0,
    'series': {}
  }; //periods

  var findColumnIndex = function findColumnIndex(field, index, columnMap) {
    for (var i = 0; i < tableauData._columns.length; i++) {
      if (tableauData._columns[i]._fieldName === field) {
        if (index !== undefined && index !== null) {
          mapConfig[columnMap][index] = i;
        } else {
          mapConfig[columnMap] = i;
        }
      }
    }
  };

  if (options.dataType === 'no_category') {
    options.category = options.values;
    options.series = options.values;
  }

  options.category.map(function (field, index) {
    findColumnIndex(field, index, 'hierMap');
  });
  options.values.map(function (field, index) {
    findColumnIndex(field, index, 'series');
  });
  findColumnIndex(options.timePeriod, null, 'timePeriod');
  return mapConfig;
});

_defineProperty(DataParser, "transformPeriodData", function (options, tableauData, periodParser) {
  var categoryData = new Map();
  var periods = [];
  var periodsObj = []; //period with key and value

  var seriesNames = []; //create data map here

  var dataMapConfig = DataParser.DataUtilityTransform(options, tableauData);
  /* can not be limited based on number of periods since data source might change the order
     so must have to loop over all elements
  */

  var _loop = function _loop() {
    var data = tableauData._data[i];
    var periodValue = typeof data[dataMapConfig.timePeriod]._value === 'string' ? data[dataMapConfig.timePeriod]._value.toLowerCase() : data[dataMapConfig.timePeriod]._value;

    if (!periods.some(function (period) {
      return period === periodValue;
    })) {
      periods.push(periodValue);
    }
  };

  for (var i = 0; i < tableauData._data.length; i++) {
    _loop();
  }

  var periodOrder = periodParser.getSortedOrder(periods);
  var categoryIndex = dataMapConfig.hierMap;
  var seriesIndex = dataMapConfig.series;
  var timePeriodIndex = dataMapConfig.timePeriod;
  var numberOfSeries = Object.keys(dataMapConfig.series).length;

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
        id: data[categoryIndex[0]]._value.replace(/[^a-zA-Z0-9_]/g, "__"),
        label: data[categoryIndex[0]]._formattedValue,
        children: new Map(),
        series: [],
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
          id: children._value.replace(/[^a-zA-Z0-9_]/g, "__"),
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
      for (var _i = 0; _i < numberOfSeries; _i++) {
        seriesNames.push(tableauData._columns[seriesIndex[_i]]._fieldName);
        node.series[_i] = !node.series[_i] ? [] : node.series[_i];
        var periodValue = typeof data[timePeriodIndex]._value === 'string' ? data[timePeriodIndex]._value.toLowerCase() : data[timePeriodIndex]._value;
        var periodValueIndex = periodOrder.indexOf(periodValue);

        if (!node.series[_i][periodValueIndex]) {
          node.series[_i][periodValueIndex] = typeof data[seriesIndex[_i]]._value === 'number' ? data[seriesIndex[_i]]._value : 0;
        } else {
          node.series[_i][periodValueIndex] = node.series[_i][periodValueIndex] + (typeof data[seriesIndex[_i]]._value === 'number' ? data[seriesIndex[_i]]._value : 0);
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

  var props = {
    periods: periodsObj,
    rows: categoryData,
    metadata: {
      periods: periodsObj,
      series: [seriesNames]
    }
  };
  return props;
});

_defineProperty(DataParser, "transformNoCategoryData", function (options, tableauData, periodParser) {
  var categoryData = new Map();
  var periods = [];
  var periodsObj = []; //period with key and value

  var seriesNames = []; //create data map here

  var dataMapConfig = DataParser.DataUtilityTransform(options, tableauData);
  console.log(dataMapConfig);
});

_defineProperty(DataParser, "transformNoPeriodData", function (tableauData) {
  var period_length = tableauData._columns.length - 1; //dimension length

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
        id: row_data[0]._value.replace(/[^a-zA-Z0-9_]/g, "__"),
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
      series: [[]]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvZGF0YVBhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGVyaW9kUGFyc2VyLnRzIl0sIm5hbWVzIjpbIkRhdGFQYXJzZXIiLCJvcHRpb25zIiwiZGF0YSIsIlRhYmxlYXVEYXRhIiwiZGF0YVR5cGUiLCJ0cmFuc2Zvcm1QZXJpb2REYXRhIiwicGVyaW9kUGFyc2VyIiwidHJhbnNmb3JtTm9DYXRlZ29yeURhdGEiLCJ0cmFuc2Zvcm1Ob1BlcmlvZERhdGEiLCJQZXJpb2RQYXJzZXIiLCJ0YWJsZWF1RGF0YSIsIm1hcENvbmZpZyIsImZpbmRDb2x1bW5JbmRleCIsImZpZWxkIiwiaW5kZXgiLCJjb2x1bW5NYXAiLCJpIiwiX2NvbHVtbnMiLCJsZW5ndGgiLCJfZmllbGROYW1lIiwidW5kZWZpbmVkIiwiY2F0ZWdvcnkiLCJ2YWx1ZXMiLCJzZXJpZXMiLCJtYXAiLCJ0aW1lUGVyaW9kIiwiY2F0ZWdvcnlEYXRhIiwiTWFwIiwicGVyaW9kcyIsInBlcmlvZHNPYmoiLCJzZXJpZXNOYW1lcyIsImRhdGFNYXBDb25maWciLCJEYXRhVXRpbGl0eVRyYW5zZm9ybSIsIl9kYXRhIiwicGVyaW9kVmFsdWUiLCJfdmFsdWUiLCJ0b0xvd2VyQ2FzZSIsInNvbWUiLCJwZXJpb2QiLCJwdXNoIiwicGVyaW9kT3JkZXIiLCJnZXRTb3J0ZWRPcmRlciIsImNhdGVnb3J5SW5kZXgiLCJoaWVyTWFwIiwic2VyaWVzSW5kZXgiLCJ0aW1lUGVyaW9kSW5kZXgiLCJudW1iZXJPZlNlcmllcyIsIk9iamVjdCIsImtleXMiLCJsZXZlbCIsImhhcyIsInNldCIsImlkIiwicmVwbGFjZSIsImxhYmVsIiwiX2Zvcm1hdHRlZFZhbHVlIiwiY2hpbGRyZW4iLCJwYXJlbnQiLCJhZGRDaGlsZHJlbiIsImdldCIsImxlYWZDaGlsZHJlbiIsInVwZGF0ZURhdGEiLCJub2RlIiwicGVyaW9kVmFsdWVJbmRleCIsImluZGV4T2YiLCJBcnJheSIsImZyb20iLCJtYXB0b0FycmF5IiwicGVyaW9kRGF0YSIsInByb3BzIiwicm93cyIsIm1ldGFkYXRhIiwiY29uc29sZSIsImxvZyIsInBlcmlvZF9sZW5ndGgiLCJyb3dfZGF0YSIsIk1hdGgiLCJjZWlsIiwiY3VycmVudFJvdyIsIlBlcmlvZFR5cGVzIiwicGVyaW9kVHlwZSIsImdldFBlcmlvZFR5cGUiLCJnZXRTb3J0ZWRJbmRleGVzIiwic3RyIiwibXdGb3JtYXRzIiwibW9udGhXZWVrRm9ybWF0cyIsImZvcm1hdFR5cGVzIiwicGVyaW9kRm9ybWF0IiwibWF0Y2hGb3VuZCIsIml0ZW0iLCJOVU1CRVIiLCJjaGVja01vbnRoV2Vla0Zvcm1hdCIsIlRFWFQiLCJzb3J0ZWRQZXJpb2QiLCJzbGljZSIsInNvcnQiLCJhIiwiYiIsInNyYyIsInByb2Nlc3NOdW1iZXIiLCJNT05USF9TVFJJTkdfTEciLCJNT05USF9TVFJJTkdfU0giLCJXRUVLX1NUUklOR19MRyIsIldFRUtfU1RSSU5HX1NIIiwicHJvY2Vzc01vbnRoV2VlayIsInByb2Nlc3NUZXh0UGVyaW9kIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7Ozs7OztJQUVhQSxVLFdBQUFBLFUsR0FHVCxzQkFBYztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQWlQTyxVQUFDQyxPQUFELEVBQVNDLElBQVQsRUFBa0I7QUFDbkMsUUFBSUMsV0FBVyxHQUFHRCxJQUFsQixDQURtQyxDQUVuQzs7QUFDQSxRQUFJRCxPQUFPLENBQUNHLFFBQVIsS0FBcUIsa0JBQXJCLElBQTJDSCxPQUFPLENBQUNHLFFBQVIsS0FBcUIsZ0JBQXBFLEVBQXNGO0FBQ2xGLGFBQU9KLFVBQVUsQ0FBQ0ssbUJBQVgsQ0FBK0JKLE9BQS9CLEVBQXVDRSxXQUF2QyxFQUFtRCxLQUFJLENBQUNHLFlBQXhELENBQVA7QUFDSCxLQUZELE1BRU0sSUFBR0wsT0FBTyxDQUFDRyxRQUFSLEtBQXFCLGFBQXhCLEVBQXNDO0FBQ3hDLGFBQU9KLFVBQVUsQ0FBQ08sdUJBQVgsQ0FBbUNOLE9BQW5DLEVBQTJDRSxXQUEzQyxFQUF1RCxLQUFJLENBQUNHLFlBQTVELENBQVA7QUFDSCxLQUZLLE1BRUEsSUFBSUwsT0FBTyxDQUFDRyxRQUFSLEtBQXFCLFlBQXpCLEVBQXVDO0FBQ3pDLGFBQU9KLFVBQVUsQ0FBQ1EscUJBQVgsQ0FBaUNMLFdBQWpDLENBQVA7QUFDSDtBQUNKLEdBM1BhOztBQUNWLE9BQUtHLFlBQUwsR0FBb0IsSUFBSUcsMEJBQUosRUFBcEI7QUFDSCxDOztnQkFMUVQsVSwwQkFPNkIsVUFBQ0MsT0FBRCxFQUFTUyxXQUFULEVBQXlCO0FBRTNELE1BQUlDLFNBQVMsR0FBRztBQUNaLGVBQVUsRUFERTtBQUVaLGtCQUFhLENBRkQ7QUFHWixjQUFTO0FBSEcsR0FBaEIsQ0FGMkQsQ0FRM0Q7O0FBQ0EsTUFBSUMsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQU9DLEtBQVAsRUFBYUMsU0FBYixFQUEyQjtBQUM1QyxTQUFJLElBQUlDLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ04sV0FBVyxDQUFDTyxRQUFaLENBQXFCQyxNQUFuQyxFQUEwQ0YsQ0FBQyxFQUEzQyxFQUE4QztBQUMzQyxVQUFHTixXQUFXLENBQUNPLFFBQVosQ0FBcUJELENBQXJCLEVBQXdCRyxVQUF4QixLQUF1Q04sS0FBMUMsRUFBZ0Q7QUFDNUMsWUFBR0MsS0FBSyxLQUFLTSxTQUFWLElBQXVCTixLQUFLLEtBQUssSUFBcEMsRUFBeUM7QUFDckNILG1CQUFTLENBQUNJLFNBQUQsQ0FBVCxDQUFxQkQsS0FBckIsSUFBOEJFLENBQTlCO0FBQ0gsU0FGRCxNQUVLO0FBQ0RMLG1CQUFTLENBQUNJLFNBQUQsQ0FBVCxHQUF1QkMsQ0FBdkI7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQVZEOztBQVlBLE1BQUdmLE9BQU8sQ0FBQ0csUUFBUixLQUFxQixhQUF4QixFQUFzQztBQUNsQ0gsV0FBTyxDQUFDb0IsUUFBUixHQUFtQnBCLE9BQU8sQ0FBQ3FCLE1BQTNCO0FBQ0FyQixXQUFPLENBQUNzQixNQUFSLEdBQWlCdEIsT0FBTyxDQUFDcUIsTUFBekI7QUFDSDs7QUFFRHJCLFNBQU8sQ0FBQ29CLFFBQVIsQ0FBaUJHLEdBQWpCLENBQXFCLFVBQUNYLEtBQUQsRUFBT0MsS0FBUCxFQUFpQjtBQUNsQ0YsbUJBQWUsQ0FBQ0MsS0FBRCxFQUFPQyxLQUFQLEVBQWEsU0FBYixDQUFmO0FBQ0gsR0FGRDtBQUlBYixTQUFPLENBQUNxQixNQUFSLENBQWVFLEdBQWYsQ0FBbUIsVUFBQ1gsS0FBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQ2hDRixtQkFBZSxDQUFDQyxLQUFELEVBQU9DLEtBQVAsRUFBYSxRQUFiLENBQWY7QUFDSCxHQUZEO0FBSUFGLGlCQUFlLENBQUNYLE9BQU8sQ0FBQ3dCLFVBQVQsRUFBb0IsSUFBcEIsRUFBeUIsWUFBekIsQ0FBZjtBQUVBLFNBQU9kLFNBQVA7QUFDSCxDOztnQkE1Q1FYLFUseUJBOEM0QixVQUFDQyxPQUFELEVBQVNTLFdBQVQsRUFBcUJKLFlBQXJCLEVBQXNDO0FBQ3ZFLE1BQUlvQixZQUFpQixHQUFHLElBQUlDLEdBQUosRUFBeEI7QUFDQSxNQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBLE1BQUlDLFVBQVUsR0FBRyxFQUFqQixDQUh1RSxDQUdsRDs7QUFDckIsTUFBSUMsV0FBVyxHQUFHLEVBQWxCLENBSnVFLENBTXZFOztBQUNBLE1BQUlDLGFBQWEsR0FBRy9CLFVBQVUsQ0FBQ2dDLG9CQUFYLENBQWdDL0IsT0FBaEMsRUFBd0NTLFdBQXhDLENBQXBCO0FBRUE7Ozs7QUFUdUU7QUFhbkUsUUFBTVIsSUFBSSxHQUFHUSxXQUFXLENBQUN1QixLQUFaLENBQWtCakIsQ0FBbEIsQ0FBYjtBQUNBLFFBQUlrQixXQUFXLEdBQUcsT0FBT2hDLElBQUksQ0FBQzZCLGFBQWEsQ0FBQ04sVUFBZixDQUFKLENBQStCVSxNQUF0QyxLQUFpRCxRQUFqRCxHQUE0RGpDLElBQUksQ0FBQzZCLGFBQWEsQ0FBQ04sVUFBZixDQUFKLENBQStCVSxNQUEvQixDQUFzQ0MsV0FBdEMsRUFBNUQsR0FBa0hsQyxJQUFJLENBQUM2QixhQUFhLENBQUNOLFVBQWYsQ0FBSixDQUErQlUsTUFBbks7O0FBQ0EsUUFBSSxDQUFDUCxPQUFPLENBQUNTLElBQVIsQ0FBYSxVQUFBQyxNQUFNO0FBQUEsYUFBSUEsTUFBTSxLQUFLSixXQUFmO0FBQUEsS0FBbkIsQ0FBTCxFQUFxRDtBQUNqRE4sYUFBTyxDQUFDVyxJQUFSLENBQWFMLFdBQWI7QUFDSDtBQWpCa0U7O0FBWXZFLE9BQUssSUFBSWxCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdOLFdBQVcsQ0FBQ3VCLEtBQVosQ0FBa0JmLE1BQXRDLEVBQThDRixDQUFDLEVBQS9DLEVBQW1EO0FBQUE7QUFNbEQ7O0FBRUQsTUFBSXdCLFdBQWlCLEdBQUdsQyxZQUFZLENBQUNtQyxjQUFiLENBQTRCYixPQUE1QixDQUF4QjtBQUNBLE1BQUljLGFBQWEsR0FBR1gsYUFBYSxDQUFDWSxPQUFsQztBQUNBLE1BQUlDLFdBQVcsR0FBR2IsYUFBYSxDQUFDUixNQUFoQztBQUNBLE1BQUlzQixlQUFlLEdBQUdkLGFBQWEsQ0FBQ04sVUFBcEM7QUFDQSxNQUFJcUIsY0FBYyxHQUFHQyxNQUFNLENBQUNDLElBQVAsQ0FBWWpCLGFBQWEsQ0FBQ1IsTUFBMUIsRUFBa0NMLE1BQXZEOztBQUVBUixhQUFXLENBQUN1QixLQUFaLENBQWtCVCxHQUFsQixDQUFzQixVQUFBdEIsSUFBSSxFQUFJO0FBRTFCOzs7Ozs7OztBQVFBLFFBQUkrQyxLQUFLLEdBQUdoRCxPQUFPLENBQUNvQixRQUFSLENBQWlCSCxNQUFqQixHQUEwQixDQUF0Qzs7QUFFQSxRQUFJLENBQUNRLFlBQVksQ0FBQ3dCLEdBQWIsQ0FBaUJoRCxJQUFJLENBQUN3QyxhQUFhLENBQUMsQ0FBRCxDQUFkLENBQUosQ0FBdUJQLE1BQXhDLENBQUwsRUFBc0Q7QUFDbEQ7QUFDQVQsa0JBQVksQ0FBQ3lCLEdBQWIsQ0FBaUJqRCxJQUFJLENBQUN3QyxhQUFhLENBQUMsQ0FBRCxDQUFkLENBQUosQ0FBdUJQLE1BQXhDLEVBQWdEO0FBQzVDaUIsVUFBRSxFQUFFbEQsSUFBSSxDQUFDd0MsYUFBYSxDQUFDLENBQUQsQ0FBZCxDQUFKLENBQXVCUCxNQUF2QixDQUE4QmtCLE9BQTlCLENBQXNDLGdCQUF0QyxFQUF3RCxJQUF4RCxDQUR3QztBQUU1Q0MsYUFBSyxFQUFFcEQsSUFBSSxDQUFDd0MsYUFBYSxDQUFDLENBQUQsQ0FBZCxDQUFKLENBQXVCYSxlQUZjO0FBRzVDQyxnQkFBUSxFQUFFLElBQUk3QixHQUFKLEVBSGtDO0FBSTVDSixjQUFNLEVBQUUsRUFKb0M7QUFLNUNrQyxjQUFNLEVBQUU7QUFMb0MsT0FBaEQ7QUFRSDs7QUFFRCxRQUFJQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDRCxNQUFELEVBQVNELFFBQVQsRUFBc0I7QUFDcEM7QUFDQSxVQUFJUCxLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ1gsZUFBT1EsTUFBUDtBQUNIOztBQUNELFVBQUksQ0FBQ0EsTUFBTSxDQUFDRCxRQUFQLENBQWdCTixHQUFoQixDQUFvQk0sUUFBUSxDQUFDckIsTUFBN0IsQ0FBTCxFQUEyQztBQUN2Q3NCLGNBQU0sQ0FBQ0QsUUFBUCxDQUFnQkwsR0FBaEIsQ0FBb0JLLFFBQVEsQ0FBQ3JCLE1BQTdCLEVBQXFDO0FBQ2pDaUIsWUFBRSxFQUFFSSxRQUFRLENBQUNyQixNQUFULENBQWdCa0IsT0FBaEIsQ0FBd0IsZ0JBQXhCLEVBQTBDLElBQTFDLENBRDZCO0FBRWpDQyxlQUFLLEVBQUVFLFFBQVEsQ0FBQ0QsZUFGaUI7QUFHakNDLGtCQUFRLEVBQUUsSUFBSTdCLEdBQUosRUFIdUI7QUFJakNKLGdCQUFNLEVBQUUsRUFKeUI7QUFLakNrQyxnQkFBTSxFQUFFQTtBQUx5QixTQUFyQztBQU9IOztBQUNEUixXQUFLO0FBQ0xRLFlBQU0sR0FBR0EsTUFBTSxDQUFDRCxRQUFQLENBQWdCRyxHQUFoQixDQUFvQkgsUUFBUSxDQUFDckIsTUFBN0IsQ0FBVDtBQUNBLGFBQU91QixXQUFXLENBQUNELE1BQUQsRUFBU3ZELElBQUksQ0FBQzZCLGFBQWEsQ0FBQ1ksT0FBZCxDQUFzQk0sS0FBdEIsQ0FBRCxDQUFiLENBQWxCO0FBQ0gsS0FqQkQ7O0FBb0JBLFFBQUlXLFlBQVksR0FBR0YsV0FBVyxDQUFDaEMsWUFBWSxDQUFDaUMsR0FBYixDQUFpQnpELElBQUksQ0FBQ3dDLGFBQWEsQ0FBQyxDQUFELENBQWQsQ0FBSixDQUF1QlAsTUFBeEMsQ0FBRCxFQUFrRGpDLElBQUksQ0FBQ3dDLGFBQWEsQ0FBQyxDQUFELENBQWQsQ0FBdEQsQ0FBOUIsQ0E1QzBCLENBK0MxQjs7QUFDQSxRQUFJbUIsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsSUFBRCxFQUFVO0FBQ3ZCLFdBQUksSUFBSTlDLEVBQUMsR0FBQyxDQUFWLEVBQWFBLEVBQUMsR0FBQzhCLGNBQWYsRUFBK0I5QixFQUFDLEVBQWhDLEVBQW1DO0FBQy9CYyxtQkFBVyxDQUFDUyxJQUFaLENBQWlCN0IsV0FBVyxDQUFDTyxRQUFaLENBQXFCMkIsV0FBVyxDQUFDNUIsRUFBRCxDQUFoQyxFQUFxQ0csVUFBdEQ7QUFDQTJDLFlBQUksQ0FBQ3ZDLE1BQUwsQ0FBWVAsRUFBWixJQUFpQixDQUFDOEMsSUFBSSxDQUFDdkMsTUFBTCxDQUFZUCxFQUFaLENBQUQsR0FBa0IsRUFBbEIsR0FBdUI4QyxJQUFJLENBQUN2QyxNQUFMLENBQVlQLEVBQVosQ0FBeEM7QUFDQSxZQUFJa0IsV0FBVyxHQUFHLE9BQU9oQyxJQUFJLENBQUMyQyxlQUFELENBQUosQ0FBc0JWLE1BQTdCLEtBQXdDLFFBQXhDLEdBQW1EakMsSUFBSSxDQUFDMkMsZUFBRCxDQUFKLENBQXNCVixNQUF0QixDQUE2QkMsV0FBN0IsRUFBbkQsR0FBZ0dsQyxJQUFJLENBQUMyQyxlQUFELENBQUosQ0FBc0JWLE1BQXhJO0FBQ0EsWUFBSTRCLGdCQUFnQixHQUFHdkIsV0FBVyxDQUFDd0IsT0FBWixDQUFvQjlCLFdBQXBCLENBQXZCOztBQUNBLFlBQUksQ0FBQzRCLElBQUksQ0FBQ3ZDLE1BQUwsQ0FBWVAsRUFBWixFQUFlK0MsZ0JBQWYsQ0FBTCxFQUF1QztBQUNuQ0QsY0FBSSxDQUFDdkMsTUFBTCxDQUFZUCxFQUFaLEVBQWUrQyxnQkFBZixJQUFtQyxPQUFPN0QsSUFBSSxDQUFDMEMsV0FBVyxDQUFDNUIsRUFBRCxDQUFaLENBQUosQ0FBcUJtQixNQUE1QixLQUF1QyxRQUF2QyxHQUFrRGpDLElBQUksQ0FBQzBDLFdBQVcsQ0FBQzVCLEVBQUQsQ0FBWixDQUFKLENBQXFCbUIsTUFBdkUsR0FBZ0YsQ0FBbkg7QUFDSCxTQUZELE1BRU87QUFDSDJCLGNBQUksQ0FBQ3ZDLE1BQUwsQ0FBWVAsRUFBWixFQUFlK0MsZ0JBQWYsSUFBbUNELElBQUksQ0FBQ3ZDLE1BQUwsQ0FBWVAsRUFBWixFQUFlK0MsZ0JBQWYsS0FBb0MsT0FBTzdELElBQUksQ0FBQzBDLFdBQVcsQ0FBQzVCLEVBQUQsQ0FBWixDQUFKLENBQXFCbUIsTUFBNUIsS0FBdUMsUUFBdkMsR0FBa0RqQyxJQUFJLENBQUMwQyxXQUFXLENBQUM1QixFQUFELENBQVosQ0FBSixDQUFxQm1CLE1BQXZFLEdBQWdGLENBQXBILENBQW5DO0FBQ0g7QUFDSjs7QUFDRCxVQUFJMkIsSUFBSSxDQUFDTCxNQUFULEVBQWlCO0FBQ2JJLGtCQUFVLENBQUNDLElBQUksQ0FBQ0wsTUFBTixDQUFWO0FBQ0g7QUFDSixLQWZEOztBQWlCQUksY0FBVSxDQUFDRCxZQUFELENBQVY7QUFDSCxHQWxFRCxFQTFCdUUsQ0E4RnZFOzs7QUFDQWxDLGNBQVksR0FBR3VDLEtBQUssQ0FBQ0MsSUFBTixDQUFXeEMsWUFBWSxDQUFDSixNQUFiLEVBQVgsQ0FBZjtBQUVBSSxjQUFZLENBQUNGLEdBQWIsQ0FBaUIsVUFBQXNDLElBQUksRUFBSTtBQUNyQixRQUFJSyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFBTCxJQUFJLEVBQUk7QUFDckJBLFVBQUksQ0FBQ04sUUFBTCxHQUFnQlMsS0FBSyxDQUFDQyxJQUFOLENBQVdKLElBQUksQ0FBQ04sUUFBTCxDQUFjbEMsTUFBZCxFQUFYLENBQWhCOztBQUNBLFVBQUksQ0FBQ3dDLElBQUksQ0FBQ04sUUFBVixFQUFvQjtBQUNoQjtBQUNIOztBQUNELGFBQU9NLElBQUksQ0FBQ0wsTUFBWjtBQUNBSyxVQUFJLENBQUNOLFFBQUwsQ0FBY2hDLEdBQWQsQ0FBa0IsVUFBQXNDLElBQUksRUFBSTtBQUN0Qkssa0JBQVUsQ0FBQ0wsSUFBRCxDQUFWO0FBQ0gsT0FGRDtBQUdILEtBVEQ7O0FBVUFLLGNBQVUsQ0FBQ0wsSUFBRCxDQUFWO0FBQ0gsR0FaRDs7QUFqR3VFO0FBZ0hsRSxRQUFNNUQsSUFBSSxHQUFFUSxXQUFXLENBQUN1QixLQUFaLENBQWtCakIsQ0FBbEIsQ0FBWjtBQUNBLFFBQUlvRCxVQUFVLEdBQUc7QUFDZGhCLFFBQUUsRUFBRWxELElBQUksQ0FBQzJDLGVBQUQsQ0FBSixDQUFzQlYsTUFEWjtBQUVkbUIsV0FBSyxFQUFFcEQsSUFBSSxDQUFDMkMsZUFBRCxDQUFKLENBQXNCVTtBQUZmLEtBQWpCOztBQUlELFFBQUksQ0FBQzFCLFVBQVUsQ0FBQ1EsSUFBWCxDQUFnQixVQUFBQyxNQUFNO0FBQUEsYUFBSUEsTUFBTSxDQUFDYyxFQUFQLEtBQWNsRCxJQUFJLENBQUMyQyxlQUFELENBQUosQ0FBc0JWLE1BQXhDO0FBQUEsS0FBdEIsQ0FBTCxFQUE0RTtBQUN4RSxVQUFJRCxXQUFXLEdBQUcsT0FBT2hDLElBQUksQ0FBQzJDLGVBQUQsQ0FBSixDQUFzQlYsTUFBN0IsS0FBd0MsUUFBeEMsR0FBbURqQyxJQUFJLENBQUMyQyxlQUFELENBQUosQ0FBc0JWLE1BQXRCLENBQTZCQyxXQUE3QixFQUFuRCxHQUFnR2xDLElBQUksQ0FBQzJDLGVBQUQsQ0FBSixDQUFzQlYsTUFBeEk7QUFDQU4sZ0JBQVUsQ0FBQ1csV0FBVyxDQUFDd0IsT0FBWixDQUFvQjlCLFdBQXBCLENBQUQsQ0FBVixHQUErQ2tDLFVBQS9DO0FBQ0g7QUF4SGtFOztBQStHdkUsT0FBSyxJQUFJcEQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR04sV0FBVyxDQUFDdUIsS0FBWixDQUFrQmYsTUFBdEMsRUFBOENGLENBQUMsRUFBL0MsRUFBbUQ7QUFBQTtBQVVsRDs7QUFLRCxNQUFJcUQsS0FBSyxHQUFHO0FBQ1J6QyxXQUFPLEVBQUVDLFVBREQ7QUFFUnlDLFFBQUksRUFBRTVDLFlBRkU7QUFHUjZDLFlBQVEsRUFBRTtBQUNOM0MsYUFBTyxFQUFFQyxVQURIO0FBRU5OLFlBQU0sRUFBRSxDQUFDTyxXQUFEO0FBRkY7QUFIRixHQUFaO0FBU0EsU0FBT3VDLEtBQVA7QUFDSCxDOztnQkF0TFFyRSxVLDZCQXdMZ0MsVUFBQ0MsT0FBRCxFQUFTUyxXQUFULEVBQXFCSixZQUFyQixFQUFzQztBQUMzRSxNQUFJb0IsWUFBaUIsR0FBRyxJQUFJQyxHQUFKLEVBQXhCO0FBQ0EsTUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxNQUFJQyxVQUFVLEdBQUcsRUFBakIsQ0FIMkUsQ0FHdEQ7O0FBQ3JCLE1BQUlDLFdBQVcsR0FBRyxFQUFsQixDQUoyRSxDQU0zRTs7QUFDQSxNQUFJQyxhQUFhLEdBQUcvQixVQUFVLENBQUNnQyxvQkFBWCxDQUFnQy9CLE9BQWhDLEVBQXdDUyxXQUF4QyxDQUFwQjtBQUVBOEQsU0FBTyxDQUFDQyxHQUFSLENBQVkxQyxhQUFaO0FBQ0gsQzs7Z0JBbE1RL0IsVSwyQkFvTThCLFVBQUNVLFdBQUQsRUFBaUI7QUFDcEQsTUFBSWdFLGFBQWEsR0FBR2hFLFdBQVcsQ0FBQ08sUUFBWixDQUFxQkMsTUFBckIsR0FBOEIsQ0FBbEQsQ0FEb0QsQ0FDQzs7QUFDckQsTUFBSW9ELElBQUksR0FBRyxJQUFJM0MsR0FBSixFQUFYO0FBQ0EsTUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxNQUFJWixDQUFKLENBSm9ELENBTXBEOztBQUNBLE9BQUtBLENBQUMsR0FBRyxDQUFULEVBQVlBLENBQUMsSUFBSTBELGFBQWpCLEVBQWdDMUQsQ0FBQyxFQUFqQyxFQUFxQztBQUNqQztBQUNBWSxXQUFPLENBQUNXLElBQVIsQ0FBYTdCLFdBQVcsQ0FBQ08sUUFBWixDQUFxQkQsQ0FBckIsRUFBd0JHLFVBQXJDO0FBQ0g7O0FBRURULGFBQVcsQ0FBQ3VCLEtBQVosQ0FBa0JULEdBQWxCLENBQXNCLFVBQUFtRCxRQUFRLEVBQUk7QUFDOUIsUUFBSSxDQUFDTCxJQUFJLENBQUNwQixHQUFMLENBQVN5QixRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVl4QyxNQUFyQixDQUFMLEVBQW1DO0FBQy9CO0FBQ0FtQyxVQUFJLENBQUNuQixHQUFMLENBQVN3QixRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVl4QyxNQUFyQixFQUE2QjtBQUN6QmlCLFVBQUUsRUFBRXVCLFFBQVEsQ0FBQyxDQUFELENBQVIsQ0FBWXhDLE1BQVosQ0FBbUJrQixPQUFuQixDQUEyQixnQkFBM0IsRUFBNkMsSUFBN0MsQ0FEcUI7QUFFekJDLGFBQUssRUFBRXFCLFFBQVEsQ0FBQyxDQUFELENBQVIsQ0FBWXBCLGVBRk07QUFHekJoQyxjQUFNLEVBQUU7QUFIaUIsT0FBN0I7QUFLSCxLQVI2QixDQVM5Qjs7O0FBQ0EsUUFBSVAsQ0FBSjs7QUFDQSxTQUFLQSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLElBQUkwRCxhQUFqQixFQUFnQzFELENBQUMsRUFBakMsRUFBcUM7QUFDakM7QUFDQSxVQUFJNEIsV0FBVyxHQUFHZ0MsSUFBSSxDQUFDQyxJQUFMLENBQVU3RCxDQUFDLEdBQUcsRUFBZCxJQUFvQixDQUF0QztBQUNBLFVBQUk4RCxVQUFVLEdBQUdSLElBQUksQ0FBQ1gsR0FBTCxDQUFTZ0IsUUFBUSxDQUFDLENBQUQsQ0FBUixDQUFZeEMsTUFBckIsQ0FBakI7QUFDQTJDLGdCQUFVLENBQUN2RCxNQUFYLENBQWtCcUIsV0FBbEIsSUFBaUNrQyxVQUFVLENBQUN2RCxNQUFYLENBQWtCcUIsV0FBbEIsSUFDN0JrQyxVQUFVLENBQUN2RCxNQUFYLENBQWtCcUIsV0FBbEIsQ0FENkIsR0FDSSxFQURyQztBQUVBa0MsZ0JBQVUsQ0FBQ3ZELE1BQVgsQ0FBa0JxQixXQUFsQixFQUErQkwsSUFBL0IsQ0FBb0NvQyxRQUFRLENBQUMzRCxDQUFELENBQVIsQ0FBWW1CLE1BQWhEO0FBQ0g7QUFDSixHQW5CRDs7QUFxQkEsTUFBSWtDLEtBQUssR0FBRztBQUNSekMsV0FBTyxFQUFFLENBQUM7QUFDTndCLFFBQUUsRUFBRSxHQURFO0FBRU5FLFdBQUssRUFBRTtBQUZELEtBQUQsQ0FERDtBQUtSZ0IsUUFBSSxFQUFFTCxLQUFLLENBQUNDLElBQU4sQ0FBV0ksSUFBSSxDQUFDaEQsTUFBTCxFQUFYLENBTEU7QUFNUmlELFlBQVEsRUFBRTtBQUNOM0MsYUFBTyxFQUFFQSxPQURIO0FBRU5MLFlBQU0sRUFBRSxDQUFDLEVBQUQ7QUFGRjtBQU5GLEdBQVo7QUFZQSxTQUFPOEMsS0FBUDtBQUNILEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDcFBBVSxXOztXQUFBQSxXO0FBQUFBLGEsQ0FBQUEsVztBQUFBQSxhLENBQUFBLFc7QUFBQUEsYSxDQUFBQSxXO0FBQUFBLGEsQ0FBQUEsVztBQUFBQSxhLENBQUFBLFc7QUFBQUEsYSxDQUFBQSxXO0FBQUFBLGEsQ0FBQUEsVztBQUFBQSxhLENBQUFBLFc7QUFBQUEsYSxDQUFBQSxXO0dBQUFBLFcsS0FBQUEsVzs7SUFZUXRFLFk7O1FBQUFBLFk7QUFFVCwwQkFBYTtBQUFBO0FBRVo7Ozs7bUNBbUhxQm1CLE8sRUFBbUI7QUFDckMsVUFBTVUsTUFBTSxHQUFHVixPQUFPLENBQUMsQ0FBRCxDQUF0QjtBQUNBLFVBQUlvRCxVQUFVLEdBQUd2RSxZQUFZLENBQUN3RSxhQUFiLENBQTJCM0MsTUFBM0IsQ0FBakI7QUFDQSxhQUFPN0IsWUFBWSxDQUFDeUUsZ0JBQWIsQ0FBOEJ0RCxPQUE5QixFQUFzQ29ELFVBQXRDLENBQVA7QUFDSDs7O3lDQTVFbUNHLEcsRUFBYTtBQUM3QyxVQUFHLE9BQU9BLEdBQVAsS0FBZSxRQUFsQixFQUE0QjtBQUU1QixVQUFNQyxTQUFTLEdBQUczRSxZQUFZLENBQUM0RSxnQkFBL0I7QUFDQSxVQUFNQyxXQUFXLEdBQUd2QyxNQUFNLENBQUNDLElBQVAsQ0FBWW9DLFNBQVosQ0FBcEI7QUFDQSxVQUFJRyxZQUFKO0FBQ0EsVUFBSUMsVUFBbUIsR0FBRyxLQUExQjtBQUNBTCxTQUFHLEdBQUdBLEdBQUcsQ0FBQy9DLFdBQUosRUFBTjs7QUFFQSxXQUFLLElBQUlwQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHc0UsV0FBVyxDQUFDcEUsTUFBaEMsRUFBd0NGLENBQUMsRUFBekMsRUFBNkM7QUFDekN3RSxrQkFBVSxHQUFHSixTQUFTLENBQUNFLFdBQVcsQ0FBQ3RFLENBQUQsQ0FBWixDQUFULENBQTBCcUIsSUFBMUIsQ0FBK0IsVUFBQ29ELElBQUQsRUFBa0I7QUFDMUQsaUJBQU9BLElBQUksS0FBS04sR0FBaEI7QUFDSCxTQUZZLENBQWI7O0FBSUEsWUFBSUssVUFBSixFQUFnQjtBQUNaRCxzQkFBWSxHQUFHRCxXQUFXLENBQUN0RSxDQUFELENBQTFCO0FBQ0E7QUFDSDtBQUNKOztBQUNELGFBQU91RSxZQUFQO0FBQ0g7OztrQ0FFNEJqRCxNLEVBQXlCO0FBQ2xELFVBQUksT0FBT0EsTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUM1QixlQUFPeUMsV0FBVyxDQUFDVyxNQUFuQjtBQUNIOztBQUVELFVBQUlWLFVBQVUsR0FBR3ZFLFlBQVksQ0FBQ2tGLG9CQUFiLENBQWtDckQsTUFBbEMsQ0FBakI7O0FBQ0EsVUFBSTBDLFVBQUosRUFBZ0I7QUFDWixlQUFPRCxXQUFXLENBQUNDLFVBQUQsQ0FBbEI7QUFDSDs7QUFFRCxhQUFPRCxXQUFXLENBQUNhLElBQW5CO0FBQ0g7OztrQ0FFNEJoRSxPLEVBQTZCO0FBQ3RELFVBQU1pRSxZQUFZLEdBQUdqRSxPQUFPLENBQUNrRSxLQUFSLEdBQWdCQyxJQUFoQixDQUFxQixVQUFDQyxDQUFELEVBQUlDLENBQUo7QUFBQSxlQUFVRCxDQUFDLEdBQUdDLENBQWQ7QUFBQSxPQUFyQixDQUFyQjtBQUNBLGFBQU9KLFlBQVA7QUFDSDs7O3FDQUdHakUsTyxFQUNBb0QsVSxFQUNLO0FBQ0wsYUFBT3ZFLFlBQVksQ0FBQzRFLGdCQUFiLENBQThCTixXQUFXLENBQUNDLFVBQUQsQ0FBekMsQ0FBUDtBQUNIOzs7c0NBRWdDcEQsTyxFQUEyQjtBQUN4RCxVQUFNc0UsR0FBRyxHQUFHdEUsT0FBTyxDQUFDa0UsS0FBUixHQUFnQkMsSUFBaEIsRUFBWjtBQUNBLGFBQU9HLEdBQVA7QUFDSDs7O3FDQUdHdEUsTyxFQUNBb0QsVSxFQUNRO0FBQ1IsY0FBUUEsVUFBUjtBQUNJLGFBQUtELFdBQVcsQ0FBQ1csTUFBakI7QUFDSSxpQkFBT2pGLFlBQVksQ0FBQzBGLGFBQWIsQ0FBMkJ2RSxPQUEzQixDQUFQOztBQUVKLGFBQUttRCxXQUFXLENBQUNxQixlQUFqQjtBQUNBLGFBQUtyQixXQUFXLENBQUNzQixlQUFqQjtBQUNBLGFBQUt0QixXQUFXLENBQUN1QixjQUFqQjtBQUNBLGFBQUt2QixXQUFXLENBQUN3QixjQUFqQjtBQUNJLGlCQUFPOUYsWUFBWSxDQUFDK0YsZ0JBQWIsQ0FBOEI1RSxPQUE5QixFQUFvRG9ELFVBQXBELENBQVA7O0FBRUosYUFBS0QsV0FBVyxDQUFDYSxJQUFqQjtBQUNJLGlCQUFPbkYsWUFBWSxDQUFDZ0csaUJBQWIsQ0FBK0I3RSxPQUEvQixDQUFQO0FBWFI7QUFjSDs7Ozs7O2dCQXJIUW5CLFksc0JBTXlCO0FBQzlCLHFCQUFtQixDQUNmLEtBRGUsRUFFZixLQUZlLEVBR2YsS0FIZSxFQUlmLEtBSmUsRUFLZixLQUxlLEVBTWYsS0FOZSxFQU9mLEtBUGUsRUFRZixLQVJlLEVBU2YsS0FUZSxFQVVmLEtBVmUsRUFXZixLQVhlLEVBWWYsS0FaZSxDQURXO0FBZTlCLHFCQUFtQixDQUNmLFNBRGUsRUFFZixVQUZlLEVBR2YsT0FIZSxFQUlmLE9BSmUsRUFLZixLQUxlLEVBTWYsTUFOZSxFQU9mLE1BUGUsRUFRZixRQVJlLEVBU2YsV0FUZSxFQVVmLFNBVmUsRUFXZixVQVhlLEVBWWYsVUFaZSxDQWZXO0FBNkI5QixvQkFBa0IsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0MsQ0E3Qlk7QUE4QjlCLG9CQUFrQixDQUNkLFFBRGMsRUFFZCxRQUZjLEVBR2QsU0FIYyxFQUlkLFdBSmMsRUFLZCxVQUxjLEVBTWQsUUFOYyxFQU9kLFVBUGM7QUE5QlksQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9kYXRhUGFyc2VyLnRzXCIpO1xuIiwiaW1wb3J0IHsgUGVyaW9kUGFyc2VyIH0gZnJvbSBcIi4vcGVyaW9kUGFyc2VyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YVBhcnNlciB7XHJcbiAgICBwcml2YXRlIHBlcmlvZFBhcnNlcjphbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5wZXJpb2RQYXJzZXIgPSBuZXcgUGVyaW9kUGFyc2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgRGF0YVV0aWxpdHlUcmFuc2Zvcm0gPSAob3B0aW9ucyx0YWJsZWF1RGF0YSkgPT4ge1xyXG5cclxuICAgICAgICBsZXQgbWFwQ29uZmlnID0ge1xyXG4gICAgICAgICAgICAnaGllck1hcCc6e30sXHJcbiAgICAgICAgICAgICd0aW1lUGVyaW9kJzowLFxyXG4gICAgICAgICAgICAnc2VyaWVzJzp7fVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vcGVyaW9kc1xyXG4gICAgICAgIGxldCBmaW5kQ29sdW1uSW5kZXggPSAoZmllbGQsaW5kZXgsY29sdW1uTWFwKSA9PiB7XHJcbiAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRhYmxlYXVEYXRhLl9jb2x1bW5zLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGFibGVhdURhdGEuX2NvbHVtbnNbaV0uX2ZpZWxkTmFtZSA9PT0gZmllbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggIT09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBDb25maWdbY29sdW1uTWFwXVtpbmRleF0gPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXBDb25maWdbY29sdW1uTWFwXSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihvcHRpb25zLmRhdGFUeXBlID09PSAnbm9fY2F0ZWdvcnknKXtcclxuICAgICAgICAgICAgb3B0aW9ucy5jYXRlZ29yeSA9IG9wdGlvbnMudmFsdWVzO1xyXG4gICAgICAgICAgICBvcHRpb25zLnNlcmllcyA9IG9wdGlvbnMudmFsdWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBvcHRpb25zLmNhdGVnb3J5Lm1hcCgoZmllbGQsaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgZmluZENvbHVtbkluZGV4KGZpZWxkLGluZGV4LCdoaWVyTWFwJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgb3B0aW9ucy52YWx1ZXMubWFwKChmaWVsZCxpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBmaW5kQ29sdW1uSW5kZXgoZmllbGQsaW5kZXgsJ3NlcmllcycpXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZpbmRDb2x1bW5JbmRleChvcHRpb25zLnRpbWVQZXJpb2QsbnVsbCwndGltZVBlcmlvZCcpXHJcblxyXG4gICAgICAgIHJldHVybiBtYXBDb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHJhbnNmb3JtUGVyaW9kRGF0YSA9IChvcHRpb25zLHRhYmxlYXVEYXRhLHBlcmlvZFBhcnNlcikgPT4ge1xyXG4gICAgICAgIGxldCBjYXRlZ29yeURhdGEgOmFueSA9IG5ldyBNYXAoKTtcclxuICAgICAgICBsZXQgcGVyaW9kcyA9IFtdO1xyXG4gICAgICAgIGxldCBwZXJpb2RzT2JqID0gW107IC8vcGVyaW9kIHdpdGgga2V5IGFuZCB2YWx1ZVxyXG4gICAgICAgIGxldCBzZXJpZXNOYW1lcyA9IFtdO1xyXG5cclxuICAgICAgICAvL2NyZWF0ZSBkYXRhIG1hcCBoZXJlXHJcbiAgICAgICAgbGV0IGRhdGFNYXBDb25maWcgPSBEYXRhUGFyc2VyLkRhdGFVdGlsaXR5VHJhbnNmb3JtKG9wdGlvbnMsdGFibGVhdURhdGEpO1xyXG4gICAgICAgXHJcbiAgICAgICAgLyogY2FuIG5vdCBiZSBsaW1pdGVkIGJhc2VkIG9uIG51bWJlciBvZiBwZXJpb2RzIHNpbmNlIGRhdGEgc291cmNlIG1pZ2h0IGNoYW5nZSB0aGUgb3JkZXJcclxuICAgICAgICAgICBzbyBtdXN0IGhhdmUgdG8gbG9vcCBvdmVyIGFsbCBlbGVtZW50c1xyXG4gICAgICAgICovXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJsZWF1RGF0YS5fZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGFibGVhdURhdGEuX2RhdGFbaV07XHJcbiAgICAgICAgICAgIGxldCBwZXJpb2RWYWx1ZSA9IHR5cGVvZiBkYXRhW2RhdGFNYXBDb25maWcudGltZVBlcmlvZF0uX3ZhbHVlID09PSAnc3RyaW5nJyA/IGRhdGFbZGF0YU1hcENvbmZpZy50aW1lUGVyaW9kXS5fdmFsdWUudG9Mb3dlckNhc2UoKSA6IGRhdGFbZGF0YU1hcENvbmZpZy50aW1lUGVyaW9kXS5fdmFsdWU7IFxyXG4gICAgICAgICAgICBpZiAoIXBlcmlvZHMuc29tZShwZXJpb2QgPT4gcGVyaW9kID09PSBwZXJpb2RWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHBlcmlvZHMucHVzaChwZXJpb2RWYWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBlcmlvZE9yZGVyIDogYW55ID0gcGVyaW9kUGFyc2VyLmdldFNvcnRlZE9yZGVyKHBlcmlvZHMpO1xyXG4gICAgICAgIGxldCBjYXRlZ29yeUluZGV4ID0gZGF0YU1hcENvbmZpZy5oaWVyTWFwO1xyXG4gICAgICAgIGxldCBzZXJpZXNJbmRleCA9IGRhdGFNYXBDb25maWcuc2VyaWVzO1xyXG4gICAgICAgIGxldCB0aW1lUGVyaW9kSW5kZXggPSBkYXRhTWFwQ29uZmlnLnRpbWVQZXJpb2Q7XHJcbiAgICAgICAgbGV0IG51bWJlck9mU2VyaWVzID0gT2JqZWN0LmtleXMoZGF0YU1hcENvbmZpZy5zZXJpZXMpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgdGFibGVhdURhdGEuX2RhdGEubWFwKGRhdGEgPT4geyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICBiYXNlZCBvbiBudW1iZXIgb2YgY2F0ZWdvcnlcclxuICAgICAgICAgICAgIGZvciBleGFtcGxlIFxyXG4gICAgICAgICAgICAgQ291bnRyeSxSZWdpb24gbGV2ZWwgc2hvdWxkIHN0YXJ0IHdpdGggMCAocm9vdCBhbHJlYWR5IGhhbmRsZWQgYW5kIHdlIGFkZCBjaGlsZHJlbiBiYXNlZCBvbiBsZXZlbCBcclxuICAgICAgICAgICAgIHdoaWNoIHdpbGwgYmUgMCBoZW5jZSBhZGQgb25lIGxldmVsIGFuZCBkZWNyZW1lbnQgbGV2ZWwgd2lsbCBiZSAtMSBubyBtb3JlIGNoaWxkKVxyXG4gICAgICAgICAgICAgQ291bnRyeSxSZWdpb24sUmVwIGxldmVsIHNob3VsZCBzdGFydCB3aXRoIDEgKHJvb3QgYWxyZWFkeSBoYW5kbGVkIGFuZCBsZXZlbCB3aWxsIGJlIDEgYWRkIHJlZ2lvbiBkZWNyZW1lbnRcclxuICAgICAgICAgICAgIGxldmVsIHdpbGwgYmUgMCwgYWRkIHJlcCBhbmQgZGVjcmVtZW50IGxldmVsIHdpbGwgYmUgLTEgbm8gbW9yZSBjaGlsZClcclxuICAgICAgICAgICAgKiovIFxyXG4gICAgICAgICAgICBsZXQgbGV2ZWwgPSBvcHRpb25zLmNhdGVnb3J5Lmxlbmd0aCAtIDI7IFxyXG5cclxuICAgICAgICAgICAgaWYgKCFjYXRlZ29yeURhdGEuaGFzKGRhdGFbY2F0ZWdvcnlJbmRleFswXV0uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgLy9GaXJzdCBhZGQgcm9vdFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlEYXRhLnNldChkYXRhW2NhdGVnb3J5SW5kZXhbMF1dLl92YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBkYXRhW2NhdGVnb3J5SW5kZXhbMF1dLl92YWx1ZS5yZXBsYWNlKC9bXmEtekEtWjAtOV9dL2csIFwiX19cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGRhdGFbY2F0ZWdvcnlJbmRleFswXV0uX2Zvcm1hdHRlZFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG51bGxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFkZENoaWxkcmVuID0gKHBhcmVudCwgY2hpbGRyZW4pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhlbiBhZGQgY2hpbGRyZW4gcmVjdXJzaXZlbHkgYW5kIGZvcm0gdGhlIHN0cnVjdHVyZVxyXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBhcmVudC5jaGlsZHJlbi5oYXMoY2hpbGRyZW4uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5zZXQoY2hpbGRyZW4uX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjaGlsZHJlbi5fdmFsdWUucmVwbGFjZSgvW15hLXpBLVowLTlfXS9nLCBcIl9fXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogY2hpbGRyZW4uX2Zvcm1hdHRlZFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHBhcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV2ZWwtLTtcclxuICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5jaGlsZHJlbi5nZXQoY2hpbGRyZW4uX3ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRDaGlsZHJlbihwYXJlbnQsIGRhdGFbZGF0YU1hcENvbmZpZy5oaWVyTWFwW2xldmVsXV0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBsZWFmQ2hpbGRyZW4gPSBhZGRDaGlsZHJlbihjYXRlZ29yeURhdGEuZ2V0KGRhdGFbY2F0ZWdvcnlJbmRleFswXV0uX3ZhbHVlKSwgZGF0YVtjYXRlZ29yeUluZGV4WzFdXSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy91cGRhdGUgZGF0YSBmcm9tIGNoaWxkcmVuIHRvIHBhcmVudFxyXG4gICAgICAgICAgICBsZXQgdXBkYXRlRGF0YSA9IChub2RlKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7IGk8bnVtYmVyT2ZTZXJpZXM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzTmFtZXMucHVzaCh0YWJsZWF1RGF0YS5fY29sdW1uc1tzZXJpZXNJbmRleFtpXV0uX2ZpZWxkTmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNlcmllc1tpXSA9ICFub2RlLnNlcmllc1tpXSA/IFtdIDogbm9kZS5zZXJpZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcmlvZFZhbHVlID0gdHlwZW9mIGRhdGFbdGltZVBlcmlvZEluZGV4XS5fdmFsdWUgPT09ICdzdHJpbmcnID8gZGF0YVt0aW1lUGVyaW9kSW5kZXhdLl92YWx1ZS50b0xvd2VyQ2FzZSgpIDogZGF0YVt0aW1lUGVyaW9kSW5kZXhdLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVyaW9kVmFsdWVJbmRleCA9IHBlcmlvZE9yZGVyLmluZGV4T2YocGVyaW9kVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbm9kZS5zZXJpZXNbaV1bcGVyaW9kVmFsdWVJbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbaV1bcGVyaW9kVmFsdWVJbmRleF0gPSB0eXBlb2YgZGF0YVtzZXJpZXNJbmRleFtpXV0uX3ZhbHVlID09PSAnbnVtYmVyJyA/IGRhdGFbc2VyaWVzSW5kZXhbaV1dLl92YWx1ZSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbaV1bcGVyaW9kVmFsdWVJbmRleF0gPSBub2RlLnNlcmllc1tpXVtwZXJpb2RWYWx1ZUluZGV4XSArICh0eXBlb2YgZGF0YVtzZXJpZXNJbmRleFtpXV0uX3ZhbHVlID09PSAnbnVtYmVyJyA/IGRhdGFbc2VyaWVzSW5kZXhbaV1dLl92YWx1ZSA6IDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZURhdGEobm9kZS5wYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlRGF0YShsZWFmQ2hpbGRyZW4pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2NvbnZlcnQgdG8gVkRUIERBVEEgRm9ybWF0XHJcbiAgICAgICAgY2F0ZWdvcnlEYXRhID0gQXJyYXkuZnJvbShjYXRlZ29yeURhdGEudmFsdWVzKCkpO1xyXG5cclxuICAgICAgICBjYXRlZ29yeURhdGEubWFwKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWFwdG9BcnJheSA9IG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IEFycmF5LmZyb20obm9kZS5jaGlsZHJlbi52YWx1ZXMoKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLm1hcChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXB0b0FycmF5KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1hcHRvQXJyYXkobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGVhdURhdGEuX2RhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgIGNvbnN0IGRhdGEgPXRhYmxlYXVEYXRhLl9kYXRhW2ldO1xyXG4gICAgICAgICAgICAgbGV0IHBlcmlvZERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogZGF0YVt0aW1lUGVyaW9kSW5kZXhdLl92YWx1ZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBkYXRhW3RpbWVQZXJpb2RJbmRleF0uX2Zvcm1hdHRlZFZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICghcGVyaW9kc09iai5zb21lKHBlcmlvZCA9PiBwZXJpb2QuaWQgPT09IGRhdGFbdGltZVBlcmlvZEluZGV4XS5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGVyaW9kVmFsdWUgPSB0eXBlb2YgZGF0YVt0aW1lUGVyaW9kSW5kZXhdLl92YWx1ZSA9PT0gJ3N0cmluZycgPyBkYXRhW3RpbWVQZXJpb2RJbmRleF0uX3ZhbHVlLnRvTG93ZXJDYXNlKCkgOiBkYXRhW3RpbWVQZXJpb2RJbmRleF0uX3ZhbHVlOyBcclxuICAgICAgICAgICAgICAgIHBlcmlvZHNPYmpbcGVyaW9kT3JkZXIuaW5kZXhPZihwZXJpb2RWYWx1ZSldID0gcGVyaW9kRGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICBsZXQgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHBlcmlvZHM6IHBlcmlvZHNPYmosXHJcbiAgICAgICAgICAgIHJvd3M6IGNhdGVnb3J5RGF0YSxcclxuICAgICAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHBlcmlvZHM6IHBlcmlvZHNPYmosXHJcbiAgICAgICAgICAgICAgICBzZXJpZXM6IFtzZXJpZXNOYW1lc11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9wcztcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHJhbnNmb3JtTm9DYXRlZ29yeURhdGEgPSAob3B0aW9ucyx0YWJsZWF1RGF0YSxwZXJpb2RQYXJzZXIpID0+IHtcclxuICAgICAgICBsZXQgY2F0ZWdvcnlEYXRhIDphbnkgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgbGV0IHBlcmlvZHMgPSBbXTtcclxuICAgICAgICBsZXQgcGVyaW9kc09iaiA9IFtdOyAvL3BlcmlvZCB3aXRoIGtleSBhbmQgdmFsdWVcclxuICAgICAgICBsZXQgc2VyaWVzTmFtZXMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9jcmVhdGUgZGF0YSBtYXAgaGVyZVxyXG4gICAgICAgIGxldCBkYXRhTWFwQ29uZmlnID0gRGF0YVBhcnNlci5EYXRhVXRpbGl0eVRyYW5zZm9ybShvcHRpb25zLHRhYmxlYXVEYXRhKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YU1hcENvbmZpZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHRyYW5zZm9ybU5vUGVyaW9kRGF0YSA9ICh0YWJsZWF1RGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBwZXJpb2RfbGVuZ3RoID0gdGFibGVhdURhdGEuX2NvbHVtbnMubGVuZ3RoIC0gMTsgLy9kaW1lbnNpb24gbGVuZ3RoXHJcbiAgICAgICAgbGV0IHJvd3MgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgbGV0IHBlcmlvZHMgPSBbXTtcclxuICAgICAgICBsZXQgaTtcclxuXHJcbiAgICAgICAgLy9nZXQgcGVyaW9kc1xyXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPD0gcGVyaW9kX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vaSA9PSBjb3VudCBzaG91bGQgYmUgbnVtYmVyIG9mIGRpbWVuc2lvblxyXG4gICAgICAgICAgICBwZXJpb2RzLnB1c2godGFibGVhdURhdGEuX2NvbHVtbnNbaV0uX2ZpZWxkTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YWJsZWF1RGF0YS5fZGF0YS5tYXAocm93X2RhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJvd3MuaGFzKHJvd19kYXRhWzBdLl92YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vRmlyc3QgYWRkIHJvb3RcclxuICAgICAgICAgICAgICAgIHJvd3Muc2V0KHJvd19kYXRhWzBdLl92YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiByb3dfZGF0YVswXS5fdmFsdWUucmVwbGFjZSgvW15hLXpBLVowLTlfXS9nLCBcIl9fXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiByb3dfZGF0YVswXS5fZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzOiBbXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy91cGRhdGUgZGF0YSBiYXNlZCBvbiBwZXJpb2RzXHJcbiAgICAgICAgICAgIGxldCBpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IHBlcmlvZF9sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy9pID09IGNvdW50IHNob3VsZCBiZSBudW1iZXIgb2YgZGltZW5zaW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzSW5kZXggPSBNYXRoLmNlaWwoaSAvIDEyKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFJvdyA9IHJvd3MuZ2V0KHJvd19kYXRhWzBdLl92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Um93LnNlcmllc1tzZXJpZXNJbmRleF0gPSBjdXJyZW50Um93LnNlcmllc1tzZXJpZXNJbmRleF0gP1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3cuc2VyaWVzW3Nlcmllc0luZGV4XSA6IFtdO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFJvdy5zZXJpZXNbc2VyaWVzSW5kZXhdLnB1c2gocm93X2RhdGFbaV0uX3ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHBlcmlvZHM6IFt7XHJcbiAgICAgICAgICAgICAgICBpZDogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogXCIxXCJcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIHJvd3M6IEFycmF5LmZyb20ocm93cy52YWx1ZXMoKSksXHJcbiAgICAgICAgICAgIG1ldGFkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RzOiBwZXJpb2RzLFxyXG4gICAgICAgICAgICAgICAgc2VyaWVzOiBbW11dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBwcm9wcztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNvbnZlcnREYXRhID0gKG9wdGlvbnMsZGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBUYWJsZWF1RGF0YSA9IGRhdGE7XHJcbiAgICAgICAgLy9zZXJpZXMgc2hvdWxkIGJlIGJhc2VkIG9uIG51bWJlciBvZiBtZWFzdXJlc1xyXG4gICAgICAgIGlmIChvcHRpb25zLmRhdGFUeXBlID09PSBcIndpdGhfYWN0dWFsX2RhdGFcIiB8fCBvcHRpb25zLmRhdGFUeXBlID09PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGFQYXJzZXIudHJhbnNmb3JtUGVyaW9kRGF0YShvcHRpb25zLFRhYmxlYXVEYXRhLHRoaXMucGVyaW9kUGFyc2VyKVxyXG4gICAgICAgIH1lbHNlIGlmKG9wdGlvbnMuZGF0YVR5cGUgPT09IFwibm9fY2F0ZWdvcnlcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhUGFyc2VyLnRyYW5zZm9ybU5vQ2F0ZWdvcnlEYXRhKG9wdGlvbnMsVGFibGVhdURhdGEsdGhpcy5wZXJpb2RQYXJzZXIpXHJcbiAgICAgICAgfWVsc2UgaWYgKG9wdGlvbnMuZGF0YVR5cGUgPT09IFwibm9fcGVyaW9kc1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhUGFyc2VyLnRyYW5zZm9ybU5vUGVyaW9kRGF0YShUYWJsZWF1RGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59IiwiZW51bSBQZXJpb2RUeXBlcyB7XHJcbiAgICBOVU1CRVIgPSAxLFxyXG4gICAgQ09MT05fU0VQQVJBVEVEX0lOREVYID0gMixcclxuICAgIElOREVYX0FUX0VORCA9IDMsXHJcbiAgICBNT05USF9TVFJJTkdfU0ggPSA0LFxyXG4gICAgTU9OVEhfU1RSSU5HX0xHID0gNSxcclxuICAgIFdFRUtfU1RSSU5HX1NIICA9IDYsXHJcbiAgICBXRUVLX1NUUklOR19MRyAgPSA3LFxyXG4gICAgSVNPXzg2MDFfREFURSAgID0gOCxcclxuICAgIFRFWFQgPSA5XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJpb2RQYXJzZXIge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBtb250aFdlZWtGb3JtYXRzID0ge1xyXG4gICAgICAgIFwiTU9OVEhfU1RSSU5HX1NIXCI6IFtcclxuICAgICAgICAgICAgXCJqYW5cIixcclxuICAgICAgICAgICAgXCJmZWJcIixcclxuICAgICAgICAgICAgXCJtYXJcIixcclxuICAgICAgICAgICAgXCJhcHJcIixcclxuICAgICAgICAgICAgXCJtYXlcIixcclxuICAgICAgICAgICAgXCJqdW5cIixcclxuICAgICAgICAgICAgXCJqdWxcIixcclxuICAgICAgICAgICAgXCJhdWdcIixcclxuICAgICAgICAgICAgXCJzZXBcIixcclxuICAgICAgICAgICAgXCJvY3RcIixcclxuICAgICAgICAgICAgXCJub3ZcIixcclxuICAgICAgICAgICAgXCJkZWNcIlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJNT05USF9TVFJJTkdfTEdcIjogW1xyXG4gICAgICAgICAgICBcImphbnVhcnlcIixcclxuICAgICAgICAgICAgXCJmZWJydWFyeVwiLFxyXG4gICAgICAgICAgICBcIm1hcmNoXCIsXHJcbiAgICAgICAgICAgIFwiYXByaWxcIixcclxuICAgICAgICAgICAgXCJtYXlcIixcclxuICAgICAgICAgICAgXCJqdW5lXCIsXHJcbiAgICAgICAgICAgIFwianVseVwiLFxyXG4gICAgICAgICAgICBcImF1Z3VzdFwiLFxyXG4gICAgICAgICAgICBcInNlcHRlbWJlclwiLFxyXG4gICAgICAgICAgICBcIm9jdG9iZXJcIixcclxuICAgICAgICAgICAgXCJub3ZlbWJlclwiLFxyXG4gICAgICAgICAgICBcImRlY2VtYmVyXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiV0VFS19TVFJJTkdfU0hcIjogW1wic3VuXCIsIFwibW9uXCIsIFwidHVlXCIsIFwid2VkXCIsIFwidGh1XCIsIFwiZnJpXCIsIFwic2F0XCJdLFxyXG4gICAgICAgIFwiV0VFS19TVFJJTkdfTEdcIjogW1xyXG4gICAgICAgICAgICBcInN1bmRheVwiLFxyXG4gICAgICAgICAgICBcIm1vbmRheVwiLFxyXG4gICAgICAgICAgICBcInR1ZXNkYXlcIixcclxuICAgICAgICAgICAgXCJ3ZWRuZXNkYXlcIixcclxuICAgICAgICAgICAgXCJ0aHVyc2RheVwiLFxyXG4gICAgICAgICAgICBcImZyaWRheVwiLFxyXG4gICAgICAgICAgICBcInNhdHVyZGF5XCJcclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNoZWNrTW9udGhXZWVrRm9ybWF0KHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBtd0Zvcm1hdHMgPSBQZXJpb2RQYXJzZXIubW9udGhXZWVrRm9ybWF0cztcclxuICAgICAgICBjb25zdCBmb3JtYXRUeXBlcyA9IE9iamVjdC5rZXlzKG13Rm9ybWF0cyk7XHJcbiAgICAgICAgbGV0IHBlcmlvZEZvcm1hdDogc3RyaW5nO1xyXG4gICAgICAgIGxldCBtYXRjaEZvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybWF0VHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWF0Y2hGb3VuZCA9IG13Rm9ybWF0c1tmb3JtYXRUeXBlc1tpXV0uc29tZSgoaXRlbTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gc3RyO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaEZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RGb3JtYXQgPSBmb3JtYXRUeXBlc1tpXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwZXJpb2RGb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UGVyaW9kVHlwZShwZXJpb2Q6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGVyaW9kID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQZXJpb2RUeXBlcy5OVU1CRVI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGVyaW9kVHlwZSA9IFBlcmlvZFBhcnNlci5jaGVja01vbnRoV2Vla0Zvcm1hdChwZXJpb2QpO1xyXG4gICAgICAgIGlmIChwZXJpb2RUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQZXJpb2RUeXBlc1twZXJpb2RUeXBlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQZXJpb2RUeXBlcy5URVhUO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHByb2Nlc3NOdW1iZXIocGVyaW9kczogbnVtYmVyW10pOiBudW1iZXJbXSB7XHJcbiAgICAgICAgY29uc3Qgc29ydGVkUGVyaW9kID0gcGVyaW9kcy5zbGljZSgpLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuICAgICAgICByZXR1cm4gc29ydGVkUGVyaW9kO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHByb2Nlc3NNb250aFdlZWsoXHJcbiAgICAgICAgcGVyaW9kczogc3RyaW5nW10sXHJcbiAgICAgICAgcGVyaW9kVHlwZSA6IG51bWJlclxyXG4gICAgKTogYW55W10ge1xyXG4gICAgICAgIHJldHVybiBQZXJpb2RQYXJzZXIubW9udGhXZWVrRm9ybWF0c1tQZXJpb2RUeXBlc1twZXJpb2RUeXBlXV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcHJvY2Vzc1RleHRQZXJpb2QocGVyaW9kczogc3RyaW5nW10pIDogYW55W10ge1xyXG4gICAgICAgIGNvbnN0IHNyYyA9IHBlcmlvZHMuc2xpY2UoKS5zb3J0KCk7XHJcbiAgICAgICAgcmV0dXJuIHNyYztcclxuICAgIH1cclxuXHJcbiAgICAgcHJpdmF0ZSBzdGF0aWMgZ2V0U29ydGVkSW5kZXhlcyhcclxuICAgICAgICBwZXJpb2RzOiBzdHJpbmdbXSB8IG51bWJlcltdLFxyXG4gICAgICAgIHBlcmlvZFR5cGU6IG51bWJlclxyXG4gICAgKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHN3aXRjaCAocGVyaW9kVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFBlcmlvZFR5cGVzLk5VTUJFUjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBQZXJpb2RQYXJzZXIucHJvY2Vzc051bWJlcihwZXJpb2RzIGFzIG51bWJlcltdKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgUGVyaW9kVHlwZXMuTU9OVEhfU1RSSU5HX0xHOlxyXG4gICAgICAgICAgICBjYXNlIFBlcmlvZFR5cGVzLk1PTlRIX1NUUklOR19TSDpcclxuICAgICAgICAgICAgY2FzZSBQZXJpb2RUeXBlcy5XRUVLX1NUUklOR19MRzpcclxuICAgICAgICAgICAgY2FzZSBQZXJpb2RUeXBlcy5XRUVLX1NUUklOR19TSDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBQZXJpb2RQYXJzZXIucHJvY2Vzc01vbnRoV2VlayhwZXJpb2RzIGFzIHN0cmluZ1tdICwgcGVyaW9kVHlwZSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFBlcmlvZFR5cGVzLlRFWFQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUGVyaW9kUGFyc2VyLnByb2Nlc3NUZXh0UGVyaW9kKHBlcmlvZHMgYXMgc3RyaW5nW10pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNvcnRlZE9yZGVyKHBlcmlvZHM6IHN0cmluZ1tdKSB7XHJcbiAgICAgICAgY29uc3QgcGVyaW9kID0gcGVyaW9kc1swXTtcclxuICAgICAgICBsZXQgcGVyaW9kVHlwZSA9IFBlcmlvZFBhcnNlci5nZXRQZXJpb2RUeXBlKHBlcmlvZCk7ICBcclxuICAgICAgICByZXR1cm4gUGVyaW9kUGFyc2VyLmdldFNvcnRlZEluZGV4ZXMocGVyaW9kcyxwZXJpb2RUeXBlKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==