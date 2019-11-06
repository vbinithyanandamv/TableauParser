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

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():undefined}(this,function(){"use strict";var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",a="year",o=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,h=/\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},c={padStart:f,padZoneStr:function(t){var n=Math.abs(t),e=Math.floor(n/60),r=n%60;return(t<=0?"+":"-")+f(e,2,"0")+":"+f(r,2,"0")},monthDiff:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,"months"),i=n-r<0,s=t.clone().add(e+(i?-1:1),"months");return Number(-(e+(n-r)/(i?r-s:s-r))||0)},absFloor:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},prettyUnit:function(o){return{M:u,y:a,w:s,d:i,h:r,m:e,s:n,ms:t}[o]||String(o||"").toLowerCase().replace(/s$/,"")},isUndefined:function(t){return void 0===t}},d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$="en",l={};l[$]=d;var m=function(t){return t instanceof D},y=function(t,n,e){var r;if(!t)return null;if("string"==typeof t)l[t]&&(r=t),n&&(l[t]=n,r=t);else{var i=t.name;l[i]=t,r=i}return e||($=r),r},M=function(t,n){if(m(t))return t.clone();var e=n?"string"==typeof n?{format:n}:n:{};return e.date=t,new D(e)},S=function(t,n){return M(t,{locale:n.$L})},p=c;p.parseLocale=y,p.isDayjs=m,p.wrapper=S;var D=function(){function f(t){this.parse(t)}var c=f.prototype;return c.parse=function(t){var n,e;this.$d=null===(n=t.date)?new Date(NaN):p.isUndefined(n)?new Date:n instanceof Date?n:"string"==typeof n&&/.*[^Z]$/i.test(n)&&(e=n.match(o))?new Date(e[1],e[2]-1,e[3]||1,e[4]||0,e[5]||0,e[6]||0,e[7]||0):new Date(n),this.init(t)},c.init=function(t){var n=this.$d;this.$y=n.getFullYear(),this.$M=n.getMonth(),this.$D=n.getDate(),this.$W=n.getDay(),this.$H=n.getHours(),this.$m=n.getMinutes(),this.$s=n.getSeconds(),this.$ms=n.getMilliseconds(),this.$L=this.$L||y(t.locale,null,!0)||$},c.$utils=function(){return p},c.isValid=function(){return!("Invalid Date"===this.$d.toString())},c.isSame=function(t,n){var e=M(t);return this.startOf(n)<=e&&e<=this.endOf(n)},c.isAfter=function(t,n){return M(t)<this.startOf(n)},c.isBefore=function(t,n){return this.endOf(n)<M(t)},c.year=function(){return this.$y},c.month=function(){return this.$M},c.day=function(){return this.$W},c.date=function(){return this.$D},c.hour=function(){return this.$H},c.minute=function(){return this.$m},c.second=function(){return this.$s},c.millisecond=function(){return this.$ms},c.unix=function(){return Math.floor(this.valueOf()/1e3)},c.valueOf=function(){return this.$d.getTime()},c.startOf=function(t,o){var h=this,f=!!p.isUndefined(o)||o,c=p.prettyUnit(t),d=function(t,n){var e=S(new Date(h.$y,n,t),h);return f?e:e.endOf(i)},$=function(t,n){return S(h.toDate()[t].apply(h.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(n)),h)},l=this.$W,m=this.$M,y=this.$D;switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var M=this.$locale().weekStart||0,D=(l<M?l+7:l)-M;return d(f?y-D:y+(6-D),m);case i:case"date":return $("setHours",0);case r:return $("setMinutes",1);case e:return $("setSeconds",2);case n:return $("setMilliseconds",3);default:return this.clone()}},c.endOf=function(t){return this.startOf(t,!1)},c.$set=function(s,o){var h,f=p.prettyUnit(s),c=(h={},h[i]="setDate",h.date="setDate",h[u]="setMonth",h[a]="setFullYear",h[r]="setHours",h[e]="setMinutes",h[n]="setSeconds",h[t]="setMilliseconds",h)[f],d=f===i?this.$D+(o-this.$W):o;return this.$d[c]&&this.$d[c](d),this.init(),this},c.set=function(t,n){return this.clone().$set(t,n)},c.add=function(t,o){var h,f=this;t=Number(t);var c=p.prettyUnit(o),d=function(n,e){var r=f.set("date",1).set(n,e+t);return r.set("date",Math.min(f.$D,r.daysInMonth()))},$=function(n){var e=new Date(f.$d);return e.setDate(e.getDate()+n*t),S(e,f)};if(c===u)return d(u,this.$M);if(c===a)return d(a,this.$y);if(c===i)return $(1);if(c===s)return $(7);var l=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,m=this.valueOf()+t*l;return S(m,this)},c.subtract=function(t,n){return this.add(-1*t,n)},c.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=p.padZoneStr(this.$d.getTimezoneOffset()),i=this.$locale(),s=i.weekdays,u=i.months,a=function(t,n,e,r){return t&&t[n]||e[n].substr(0,r)},o=function(t){return 0===n.$H?12:p.padStart(n.$H<13?n.$H:n.$H-12,"hh"===t?2:1,"0")},f={YY:String(this.$y).slice(-2),YYYY:String(this.$y),M:String(this.$M+1),MM:p.padStart(this.$M+1,2,"0"),MMM:a(i.monthsShort,this.$M,u,3),MMMM:u[this.$M],D:String(this.$D),DD:p.padStart(this.$D,2,"0"),d:String(this.$W),dd:a(i.weekdaysMin,this.$W,s,2),ddd:a(i.weekdaysShort,this.$W,s,3),dddd:s[this.$W],H:String(this.$H),HH:p.padStart(this.$H,2,"0"),h:o("h"),hh:o("hh"),a:this.$H<12?"am":"pm",A:this.$H<12?"AM":"PM",m:String(this.$m),mm:p.padStart(this.$m,2,"0"),s:String(this.$s),ss:p.padStart(this.$s,2,"0"),SSS:p.padStart(this.$ms,3,"0"),Z:r};return e.replace(h,function(t){return t.indexOf("[")>-1?t.replace(/\[|\]/g,""):f[t]||r.replace(":","")})},c.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},c.diff=function(t,o,h){var f,c=p.prettyUnit(o),d=M(t),$=6e4*(d.utcOffset()-this.utcOffset()),l=this-d,m=p.monthDiff(this,d);return m=(f={},f[a]=m/12,f[u]=m,f.quarter=m/3,f[s]=(l-$)/6048e5,f[i]=(l-$)/864e5,f[r]=l/36e5,f[e]=l/6e4,f[n]=l/1e3,f)[c]||l,h?m:p.absFloor(m)},c.daysInMonth=function(){return this.endOf(u).$D},c.$locale=function(){return l[this.$L]},c.locale=function(t,n){var e=this.clone();return e.$L=y(t,n,!0),e},c.clone=function(){return S(this.toDate(),this)},c.toDate=function(){return new Date(this.$d)},c.toArray=function(){return[this.$y,this.$M,this.$D,this.$H,this.$m,this.$s,this.$ms]},c.toJSON=function(){return this.toISOString()},c.toISOString=function(){return this.$d.toISOString()},c.toObject=function(){return{years:this.$y,months:this.$M,date:this.$D,hours:this.$H,minutes:this.$m,seconds:this.$s,milliseconds:this.$ms}},c.toString=function(){return this.$d.toUTCString()},f}();return M.prototype=D.prototype,M.extend=function(t,n){return t(n,D,M),M},M.locale=y,M.isDayjs=m,M.unix=function(t){return M(1e3*t)},M.en=l[$],M});


/***/ }),

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
  var periodDetector = new _periodParser.PeriodParser();
  var periodOrder = periodDetector.getSortedOrder(tableauData[0]._data); //get all periods sepeartely

  tableauData[0]._data.map(function (data) {
    var periodData = {
      id: data[3]._value,
      label: data[3]._formattedValue
    };

    if (!periods.some(function (period) {
      return period.id === data[3]._value;
    })) {
      var periodValueIndex = periodOrder.indexOf(data[3]._value.toLowerCase());
      periods[periodValueIndex] = periodData;
    }
  });

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

  if (dataType == "single_measure") {
    seriesNames = [tableauData[0]._columns[4]._fieldName];
  } else {
    seriesNames = [tableauData[0]._columns[4]._fieldName, tableauData[0]._columns[5]._fieldName];
  }

  var props = {
    periods: periods,
    rows: categoryData,
    metadata: {
      periods: periods,
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
exports.PeriodParser = undefined;

var _dayjs = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");

var _dayjs2 = _interopRequireDefault(_dayjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      var period = periods[0][3]._value;
      var periodType = PeriodParser.getPeriodType(period);
      return PeriodParser.monthWeekFormats[PeriodTypes[periodType]];
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

      if ((0, _dayjs2["default"])(period).isValid()) {
        return PeriodTypes.ISO_8601_DATE;
      }

      if (!isNaN(parseInt(period))) {
        return PeriodTypes.COLON_SEPARATED_INDEX;
      }

      if (period.match(PeriodParser.indexAtEndRegex)) {
        return PeriodTypes.INDEX_AT_END;
      }

      return PeriodTypes.TEXT;
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

_defineProperty(PeriodParser, "indexAtEndRegex", /\d+$/);

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGF5anMvZGF5anMubWluLmpzIiwid2VicGFjazovLy8uL3NyYy9kYXRhUGFyc2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9wZXJpb2RQYXJzZXIudHMiXSwibmFtZXMiOlsiZGF0YUZvcm1hdE1hcCIsIndpdGhfYWN0dWFsX2RhdGEiLCJub19wZXJpb2RzIiwibWVhc3VyZV9hc19jYXRlZ29yeSIsIm5vX2NhdGVnb3J5Iiwic2luZ2xlX21lYXN1cmUiLCJEYXRhUGFyc2VyIiwiZGF0YVR5cGUiLCJUYWJsZWF1RGF0YSIsInRyYW5zZm9ybVBlcmlvZERhdGEiLCJ0cmFuc2Zvcm1ub1BlcmlvZERhdGEiLCJ0YWJsZWF1RGF0YSIsImNhdGVnb3J5RGF0YSIsIk1hcCIsInBlcmlvZHMiLCJwZXJpb2REZXRlY3RvciIsIlBlcmlvZFBhcnNlciIsInBlcmlvZE9yZGVyIiwiZ2V0U29ydGVkT3JkZXIiLCJfZGF0YSIsIm1hcCIsImRhdGEiLCJwZXJpb2REYXRhIiwiaWQiLCJfdmFsdWUiLCJsYWJlbCIsIl9mb3JtYXR0ZWRWYWx1ZSIsInNvbWUiLCJwZXJpb2QiLCJwZXJpb2RWYWx1ZUluZGV4IiwiaW5kZXhPZiIsInRvTG93ZXJDYXNlIiwibnVtYmVyT2ZQZXJpb2RzIiwibGVuZ3RoIiwibGV2ZWwiLCJsZXZlbFZhbHVlIiwiaGFzIiwic2V0IiwiY2hpbGRyZW4iLCJzZXJpZXMiLCJwYXJlbnQiLCJhZGRDaGlsZHJlbiIsImdldCIsImxlYWZDaGlsZHJlbiIsInVwZGF0ZURhdGEiLCJub2RlIiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwibWFwdG9BcnJheSIsInNlcmllc05hbWVzIiwiX2NvbHVtbnMiLCJfZmllbGROYW1lIiwicHJvcHMiLCJyb3dzIiwibWV0YWRhdGEiLCJwZXJpb2RfbGVuZ3RoIiwibnVtYmVyX29mX3BlcmlvZHMiLCJudW1iZXJfb2Zfc2VyaWVzIiwiaSIsInB1c2giLCJyb3dfZGF0YSIsInNlcmllc0luZGV4IiwiTWF0aCIsImNlaWwiLCJjdXJyZW50Um93IiwiUGVyaW9kVHlwZXMiLCJwZXJpb2RUeXBlIiwiZ2V0UGVyaW9kVHlwZSIsIm1vbnRoV2Vla0Zvcm1hdHMiLCJzdHIiLCJtd0Zvcm1hdHMiLCJmb3JtYXRUeXBlcyIsIk9iamVjdCIsImtleXMiLCJwZXJpb2RGb3JtYXQiLCJtYXRjaEZvdW5kIiwiaXRlbSIsIk5VTUJFUiIsImNoZWNrTW9udGhXZWVrRm9ybWF0IiwiaXNWYWxpZCIsIklTT184NjAxX0RBVEUiLCJpc05hTiIsInBhcnNlSW50IiwiQ09MT05fU0VQQVJBVEVEX0lOREVYIiwibWF0Y2giLCJpbmRleEF0RW5kUmVnZXgiLCJJTkRFWF9BVF9FTkQiLCJURVhUIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFD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dW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9kYXRhUGFyc2VyLnRzXCIpO1xuIiwiIWZ1bmN0aW9uKHQsbil7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9bigpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUobik6dC5kYXlqcz1uKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD1cIm1pbGxpc2Vjb25kXCIsbj1cInNlY29uZFwiLGU9XCJtaW51dGVcIixyPVwiaG91clwiLGk9XCJkYXlcIixzPVwid2Vla1wiLHU9XCJtb250aFwiLGE9XCJ5ZWFyXCIsbz0vXihcXGR7NH0pLT8oXFxkezEsMn0pLT8oXFxkezAsMn0pW14wLTldKihcXGR7MSwyfSk/Oj8oXFxkezEsMn0pPzo/KFxcZHsxLDJ9KT8uPyhcXGR7MSwzfSk/JC8saD0vXFxbLio/XFxdfFl7Miw0fXxNezEsNH18RHsxLDJ9fGR7MSw0fXxIezEsMn18aHsxLDJ9fGF8QXxtezEsMn18c3sxLDJ9fFp7MSwyfXxTU1MvZyxmPWZ1bmN0aW9uKHQsbixlKXt2YXIgcj1TdHJpbmcodCk7cmV0dXJuIXJ8fHIubGVuZ3RoPj1uP3Q6XCJcIitBcnJheShuKzEtci5sZW5ndGgpLmpvaW4oZSkrdH0sYz17cGFkU3RhcnQ6ZixwYWRab25lU3RyOmZ1bmN0aW9uKHQpe3ZhciBuPU1hdGguYWJzKHQpLGU9TWF0aC5mbG9vcihuLzYwKSxyPW4lNjA7cmV0dXJuKHQ8PTA/XCIrXCI6XCItXCIpK2YoZSwyLFwiMFwiKStcIjpcIitmKHIsMixcIjBcIil9LG1vbnRoRGlmZjpmdW5jdGlvbih0LG4pe3ZhciBlPTEyKihuLnllYXIoKS10LnllYXIoKSkrKG4ubW9udGgoKS10Lm1vbnRoKCkpLHI9dC5jbG9uZSgpLmFkZChlLFwibW9udGhzXCIpLGk9bi1yPDAscz10LmNsb25lKCkuYWRkKGUrKGk/LTE6MSksXCJtb250aHNcIik7cmV0dXJuIE51bWJlcigtKGUrKG4tcikvKGk/ci1zOnMtcikpfHwwKX0sYWJzRmxvb3I6ZnVuY3Rpb24odCl7cmV0dXJuIHQ8MD9NYXRoLmNlaWwodCl8fDA6TWF0aC5mbG9vcih0KX0scHJldHR5VW5pdDpmdW5jdGlvbihvKXtyZXR1cm57TTp1LHk6YSx3OnMsZDppLGg6cixtOmUsczpuLG1zOnR9W29dfHxTdHJpbmcob3x8XCJcIikudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9zJC8sXCJcIil9LGlzVW5kZWZpbmVkOmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10fX0sZD17bmFtZTpcImVuXCIsd2Vla2RheXM6XCJTdW5kYXlfTW9uZGF5X1R1ZXNkYXlfV2VkbmVzZGF5X1RodXJzZGF5X0ZyaWRheV9TYXR1cmRheVwiLnNwbGl0KFwiX1wiKSxtb250aHM6XCJKYW51YXJ5X0ZlYnJ1YXJ5X01hcmNoX0FwcmlsX01heV9KdW5lX0p1bHlfQXVndXN0X1NlcHRlbWJlcl9PY3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyXCIuc3BsaXQoXCJfXCIpfSwkPVwiZW5cIixsPXt9O2xbJF09ZDt2YXIgbT1mdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIER9LHk9ZnVuY3Rpb24odCxuLGUpe3ZhciByO2lmKCF0KXJldHVybiBudWxsO2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KWxbdF0mJihyPXQpLG4mJihsW3RdPW4scj10KTtlbHNle3ZhciBpPXQubmFtZTtsW2ldPXQscj1pfXJldHVybiBlfHwoJD1yKSxyfSxNPWZ1bmN0aW9uKHQsbil7aWYobSh0KSlyZXR1cm4gdC5jbG9uZSgpO3ZhciBlPW4/XCJzdHJpbmdcIj09dHlwZW9mIG4/e2Zvcm1hdDpufTpuOnt9O3JldHVybiBlLmRhdGU9dCxuZXcgRChlKX0sUz1mdW5jdGlvbih0LG4pe3JldHVybiBNKHQse2xvY2FsZTpuLiRMfSl9LHA9YztwLnBhcnNlTG9jYWxlPXkscC5pc0RheWpzPW0scC53cmFwcGVyPVM7dmFyIEQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBmKHQpe3RoaXMucGFyc2UodCl9dmFyIGM9Zi5wcm90b3R5cGU7cmV0dXJuIGMucGFyc2U9ZnVuY3Rpb24odCl7dmFyIG4sZTt0aGlzLiRkPW51bGw9PT0obj10LmRhdGUpP25ldyBEYXRlKE5hTik6cC5pc1VuZGVmaW5lZChuKT9uZXcgRGF0ZTpuIGluc3RhbmNlb2YgRGF0ZT9uOlwic3RyaW5nXCI9PXR5cGVvZiBuJiYvLipbXlpdJC9pLnRlc3QobikmJihlPW4ubWF0Y2gobykpP25ldyBEYXRlKGVbMV0sZVsyXS0xLGVbM118fDEsZVs0XXx8MCxlWzVdfHwwLGVbNl18fDAsZVs3XXx8MCk6bmV3IERhdGUobiksdGhpcy5pbml0KHQpfSxjLmluaXQ9ZnVuY3Rpb24odCl7dmFyIG49dGhpcy4kZDt0aGlzLiR5PW4uZ2V0RnVsbFllYXIoKSx0aGlzLiRNPW4uZ2V0TW9udGgoKSx0aGlzLiREPW4uZ2V0RGF0ZSgpLHRoaXMuJFc9bi5nZXREYXkoKSx0aGlzLiRIPW4uZ2V0SG91cnMoKSx0aGlzLiRtPW4uZ2V0TWludXRlcygpLHRoaXMuJHM9bi5nZXRTZWNvbmRzKCksdGhpcy4kbXM9bi5nZXRNaWxsaXNlY29uZHMoKSx0aGlzLiRMPXRoaXMuJEx8fHkodC5sb2NhbGUsbnVsbCwhMCl8fCR9LGMuJHV0aWxzPWZ1bmN0aW9uKCl7cmV0dXJuIHB9LGMuaXNWYWxpZD1mdW5jdGlvbigpe3JldHVybiEoXCJJbnZhbGlkIERhdGVcIj09PXRoaXMuJGQudG9TdHJpbmcoKSl9LGMuaXNTYW1lPWZ1bmN0aW9uKHQsbil7dmFyIGU9TSh0KTtyZXR1cm4gdGhpcy5zdGFydE9mKG4pPD1lJiZlPD10aGlzLmVuZE9mKG4pfSxjLmlzQWZ0ZXI9ZnVuY3Rpb24odCxuKXtyZXR1cm4gTSh0KTx0aGlzLnN0YXJ0T2Yobil9LGMuaXNCZWZvcmU9ZnVuY3Rpb24odCxuKXtyZXR1cm4gdGhpcy5lbmRPZihuKTxNKHQpfSxjLnllYXI9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4keX0sYy5tb250aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRNfSxjLmRheT1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRXfSxjLmRhdGU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kRH0sYy5ob3VyPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJEh9LGMubWludXRlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJG19LGMuc2Vjb25kPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJHN9LGMubWlsbGlzZWNvbmQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kbXN9LGMudW5peD1mdW5jdGlvbigpe3JldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpLzFlMyl9LGMudmFsdWVPZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLmdldFRpbWUoKX0sYy5zdGFydE9mPWZ1bmN0aW9uKHQsbyl7dmFyIGg9dGhpcyxmPSEhcC5pc1VuZGVmaW5lZChvKXx8byxjPXAucHJldHR5VW5pdCh0KSxkPWZ1bmN0aW9uKHQsbil7dmFyIGU9UyhuZXcgRGF0ZShoLiR5LG4sdCksaCk7cmV0dXJuIGY/ZTplLmVuZE9mKGkpfSwkPWZ1bmN0aW9uKHQsbil7cmV0dXJuIFMoaC50b0RhdGUoKVt0XS5hcHBseShoLnRvRGF0ZSgpLChmP1swLDAsMCwwXTpbMjMsNTksNTksOTk5XSkuc2xpY2UobikpLGgpfSxsPXRoaXMuJFcsbT10aGlzLiRNLHk9dGhpcy4kRDtzd2l0Y2goYyl7Y2FzZSBhOnJldHVybiBmP2QoMSwwKTpkKDMxLDExKTtjYXNlIHU6cmV0dXJuIGY/ZCgxLG0pOmQoMCxtKzEpO2Nhc2Ugczp2YXIgTT10aGlzLiRsb2NhbGUoKS53ZWVrU3RhcnR8fDAsRD0obDxNP2wrNzpsKS1NO3JldHVybiBkKGY/eS1EOnkrKDYtRCksbSk7Y2FzZSBpOmNhc2VcImRhdGVcIjpyZXR1cm4gJChcInNldEhvdXJzXCIsMCk7Y2FzZSByOnJldHVybiAkKFwic2V0TWludXRlc1wiLDEpO2Nhc2UgZTpyZXR1cm4gJChcInNldFNlY29uZHNcIiwyKTtjYXNlIG46cmV0dXJuICQoXCJzZXRNaWxsaXNlY29uZHNcIiwzKTtkZWZhdWx0OnJldHVybiB0aGlzLmNsb25lKCl9fSxjLmVuZE9mPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnN0YXJ0T2YodCwhMSl9LGMuJHNldD1mdW5jdGlvbihzLG8pe3ZhciBoLGY9cC5wcmV0dHlVbml0KHMpLGM9KGg9e30saFtpXT1cInNldERhdGVcIixoLmRhdGU9XCJzZXREYXRlXCIsaFt1XT1cInNldE1vbnRoXCIsaFthXT1cInNldEZ1bGxZZWFyXCIsaFtyXT1cInNldEhvdXJzXCIsaFtlXT1cInNldE1pbnV0ZXNcIixoW25dPVwic2V0U2Vjb25kc1wiLGhbdF09XCJzZXRNaWxsaXNlY29uZHNcIixoKVtmXSxkPWY9PT1pP3RoaXMuJEQrKG8tdGhpcy4kVyk6bztyZXR1cm4gdGhpcy4kZFtjXSYmdGhpcy4kZFtjXShkKSx0aGlzLmluaXQoKSx0aGlzfSxjLnNldD1mdW5jdGlvbih0LG4pe3JldHVybiB0aGlzLmNsb25lKCkuJHNldCh0LG4pfSxjLmFkZD1mdW5jdGlvbih0LG8pe3ZhciBoLGY9dGhpczt0PU51bWJlcih0KTt2YXIgYz1wLnByZXR0eVVuaXQobyksZD1mdW5jdGlvbihuLGUpe3ZhciByPWYuc2V0KFwiZGF0ZVwiLDEpLnNldChuLGUrdCk7cmV0dXJuIHIuc2V0KFwiZGF0ZVwiLE1hdGgubWluKGYuJEQsci5kYXlzSW5Nb250aCgpKSl9LCQ9ZnVuY3Rpb24obil7dmFyIGU9bmV3IERhdGUoZi4kZCk7cmV0dXJuIGUuc2V0RGF0ZShlLmdldERhdGUoKStuKnQpLFMoZSxmKX07aWYoYz09PXUpcmV0dXJuIGQodSx0aGlzLiRNKTtpZihjPT09YSlyZXR1cm4gZChhLHRoaXMuJHkpO2lmKGM9PT1pKXJldHVybiAkKDEpO2lmKGM9PT1zKXJldHVybiAkKDcpO3ZhciBsPShoPXt9LGhbZV09NmU0LGhbcl09MzZlNSxoW25dPTFlMyxoKVtjXXx8MSxtPXRoaXMudmFsdWVPZigpK3QqbDtyZXR1cm4gUyhtLHRoaXMpfSxjLnN1YnRyYWN0PWZ1bmN0aW9uKHQsbil7cmV0dXJuIHRoaXMuYWRkKC0xKnQsbil9LGMuZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBuPXRoaXM7aWYoIXRoaXMuaXNWYWxpZCgpKXJldHVyblwiSW52YWxpZCBEYXRlXCI7dmFyIGU9dHx8XCJZWVlZLU1NLUREVEhIOm1tOnNzWlwiLHI9cC5wYWRab25lU3RyKHRoaXMuJGQuZ2V0VGltZXpvbmVPZmZzZXQoKSksaT10aGlzLiRsb2NhbGUoKSxzPWkud2Vla2RheXMsdT1pLm1vbnRocyxhPWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiB0JiZ0W25dfHxlW25dLnN1YnN0cigwLHIpfSxvPWZ1bmN0aW9uKHQpe3JldHVybiAwPT09bi4kSD8xMjpwLnBhZFN0YXJ0KG4uJEg8MTM/bi4kSDpuLiRILTEyLFwiaGhcIj09PXQ/MjoxLFwiMFwiKX0sZj17WVk6U3RyaW5nKHRoaXMuJHkpLnNsaWNlKC0yKSxZWVlZOlN0cmluZyh0aGlzLiR5KSxNOlN0cmluZyh0aGlzLiRNKzEpLE1NOnAucGFkU3RhcnQodGhpcy4kTSsxLDIsXCIwXCIpLE1NTTphKGkubW9udGhzU2hvcnQsdGhpcy4kTSx1LDMpLE1NTU06dVt0aGlzLiRNXSxEOlN0cmluZyh0aGlzLiREKSxERDpwLnBhZFN0YXJ0KHRoaXMuJEQsMixcIjBcIiksZDpTdHJpbmcodGhpcy4kVyksZGQ6YShpLndlZWtkYXlzTWluLHRoaXMuJFcscywyKSxkZGQ6YShpLndlZWtkYXlzU2hvcnQsdGhpcy4kVyxzLDMpLGRkZGQ6c1t0aGlzLiRXXSxIOlN0cmluZyh0aGlzLiRIKSxISDpwLnBhZFN0YXJ0KHRoaXMuJEgsMixcIjBcIiksaDpvKFwiaFwiKSxoaDpvKFwiaGhcIiksYTp0aGlzLiRIPDEyP1wiYW1cIjpcInBtXCIsQTp0aGlzLiRIPDEyP1wiQU1cIjpcIlBNXCIsbTpTdHJpbmcodGhpcy4kbSksbW06cC5wYWRTdGFydCh0aGlzLiRtLDIsXCIwXCIpLHM6U3RyaW5nKHRoaXMuJHMpLHNzOnAucGFkU3RhcnQodGhpcy4kcywyLFwiMFwiKSxTU1M6cC5wYWRTdGFydCh0aGlzLiRtcywzLFwiMFwiKSxaOnJ9O3JldHVybiBlLnJlcGxhY2UoaCxmdW5jdGlvbih0KXtyZXR1cm4gdC5pbmRleE9mKFwiW1wiKT4tMT90LnJlcGxhY2UoL1xcW3xcXF0vZyxcIlwiKTpmW3RdfHxyLnJlcGxhY2UoXCI6XCIsXCJcIil9KX0sYy51dGNPZmZzZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gMTUqLU1hdGgucm91bmQodGhpcy4kZC5nZXRUaW1lem9uZU9mZnNldCgpLzE1KX0sYy5kaWZmPWZ1bmN0aW9uKHQsbyxoKXt2YXIgZixjPXAucHJldHR5VW5pdChvKSxkPU0odCksJD02ZTQqKGQudXRjT2Zmc2V0KCktdGhpcy51dGNPZmZzZXQoKSksbD10aGlzLWQsbT1wLm1vbnRoRGlmZih0aGlzLGQpO3JldHVybiBtPShmPXt9LGZbYV09bS8xMixmW3VdPW0sZi5xdWFydGVyPW0vMyxmW3NdPShsLSQpLzYwNDhlNSxmW2ldPShsLSQpLzg2NGU1LGZbcl09bC8zNmU1LGZbZV09bC82ZTQsZltuXT1sLzFlMyxmKVtjXXx8bCxoP206cC5hYnNGbG9vcihtKX0sYy5kYXlzSW5Nb250aD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuZE9mKHUpLiREfSxjLiRsb2NhbGU9ZnVuY3Rpb24oKXtyZXR1cm4gbFt0aGlzLiRMXX0sYy5sb2NhbGU9ZnVuY3Rpb24odCxuKXt2YXIgZT10aGlzLmNsb25lKCk7cmV0dXJuIGUuJEw9eSh0LG4sITApLGV9LGMuY2xvbmU9ZnVuY3Rpb24oKXtyZXR1cm4gUyh0aGlzLnRvRGF0ZSgpLHRoaXMpfSxjLnRvRGF0ZT1mdW5jdGlvbigpe3JldHVybiBuZXcgRGF0ZSh0aGlzLiRkKX0sYy50b0FycmF5PWZ1bmN0aW9uKCl7cmV0dXJuW3RoaXMuJHksdGhpcy4kTSx0aGlzLiRELHRoaXMuJEgsdGhpcy4kbSx0aGlzLiRzLHRoaXMuJG1zXX0sYy50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy50b0lTT1N0cmluZygpfSxjLnRvSVNPU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJGQudG9JU09TdHJpbmcoKX0sYy50b09iamVjdD1mdW5jdGlvbigpe3JldHVybnt5ZWFyczp0aGlzLiR5LG1vbnRoczp0aGlzLiRNLGRhdGU6dGhpcy4kRCxob3Vyczp0aGlzLiRILG1pbnV0ZXM6dGhpcy4kbSxzZWNvbmRzOnRoaXMuJHMsbWlsbGlzZWNvbmRzOnRoaXMuJG1zfX0sYy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLnRvVVRDU3RyaW5nKCl9LGZ9KCk7cmV0dXJuIE0ucHJvdG90eXBlPUQucHJvdG90eXBlLE0uZXh0ZW5kPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHQobixELE0pLE19LE0ubG9jYWxlPXksTS5pc0RheWpzPW0sTS51bml4PWZ1bmN0aW9uKHQpe3JldHVybiBNKDFlMyp0KX0sTS5lbj1sWyRdLE19KTtcbiIsImltcG9ydCB7IFBlcmlvZFBhcnNlciB9IGZyb20gXCIuL3BlcmlvZFBhcnNlclwiO1xyXG5cclxubGV0IGRhdGFGb3JtYXRNYXAgPSB7ICAvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4gICAgICAgICAgICBcIndpdGhfYWN0dWFsX2RhdGFcIjogd2l0aF9hY3R1YWxfZGF0YSxcclxuICAgICAgICAgICAgXCJub19wZXJpb2RzXCI6IG5vX3BlcmlvZHMsXHJcbiAgICAgICAgICAgIFwibWVhc3VyZV9hc19jYXRlZ29yeVwiOiBtZWFzdXJlX2FzX2NhdGVnb3J5LFxyXG4gICAgICAgICAgICBcIm5vX2NhdGVnb3J5XCI6IG5vX2NhdGVnb3J5LFxyXG4gICAgICAgICAgICBcInNpbmdsZV9tZWFzdXJlXCI6IHNpbmdsZV9tZWFzdXJlXHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YVBhcnNlciB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHRyYW5zZm9ybVBlcmlvZERhdGEgPSAoZGF0YVR5cGUsdGFibGVhdURhdGEpID0+IHtcclxuICAgICAgICBsZXQgY2F0ZWdvcnlEYXRhIDphbnkgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgbGV0IHBlcmlvZHMgPSBbXTtcclxuXHJcblxyXG5cclxuICAgICAgICBsZXQgcGVyaW9kRGV0ZWN0b3IgPSBuZXcgUGVyaW9kUGFyc2VyKCk7XHJcbiAgICAgICAgbGV0IHBlcmlvZE9yZGVyIDogYW55ID0gcGVyaW9kRGV0ZWN0b3IuZ2V0U29ydGVkT3JkZXIodGFibGVhdURhdGFbMF0uX2RhdGEpO1xyXG5cclxuICAgICAgICAvL2dldCBhbGwgcGVyaW9kcyBzZXBlYXJ0ZWx5XHJcbiAgICAgICAgdGFibGVhdURhdGFbMF0uX2RhdGEubWFwKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGVyaW9kRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGlkOiBkYXRhWzNdLl92YWx1ZSxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBkYXRhWzNdLl9mb3JtYXR0ZWRWYWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoIXBlcmlvZHMuc29tZShwZXJpb2QgPT4gcGVyaW9kLmlkID09PSBkYXRhWzNdLl92YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwZXJpb2RWYWx1ZUluZGV4ID0gcGVyaW9kT3JkZXIuaW5kZXhPZihkYXRhWzNdLl92YWx1ZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICAgICAgICAgIHBlcmlvZHNbcGVyaW9kVmFsdWVJbmRleF0gPSBwZXJpb2REYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBsZXQgbnVtYmVyT2ZQZXJpb2RzID0gcGVyaW9kcy5sZW5ndGg7IC8vY2FuIGJlIGdldCBmcm9tIGVkaXRvciBhbHNvXHJcbiAgICAgICAgbGV0IGxldmVsO1xyXG4gICAgICAgIGxldCBsZXZlbFZhbHVlID0ge1xyXG4gICAgICAgICAgICAwOiAyLFxyXG4gICAgICAgICAgICAxOiAwXHJcbiAgICAgICAgfTsgLy8gZGF0YSBtYXAgbmVlZCB0byBiZSBkb25lIGJhc2VkIG9uIGRhdGEgdXRpbGl0eVxyXG5cclxuICAgICAgICB0YWJsZWF1RGF0YVswXS5fZGF0YS5tYXAoZGF0YSA9PiB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXZlbCA9IDE7IC8vYmFzZWQgb24gbnVtYmVyIG9mIGNhdGVnb3J5XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNhdGVnb3J5RGF0YS5oYXMoZGF0YVsxXS5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAvL0ZpcnN0IGFkZCByb290XHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeURhdGEuc2V0KGRhdGFbMV0uX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGRhdGFbMV0uX3ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBkYXRhWzFdLl9mb3JtYXR0ZWRWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogbmV3IE1hcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcmllczogW1tdLCBbXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFkZENoaWxkcmVuID0gKHBhcmVudCwgY2hpbGRyZW4pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhlbiBhZGQgY2hpbGRyZW4gcmVjdXJzaXZlbHkgYW5kIGZvcm0gdGhlIHN0cnVjdHVyZVxyXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBhcmVudC5jaGlsZHJlbi5oYXMoY2hpbGRyZW4uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5zZXQoY2hpbGRyZW4uX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjaGlsZHJlbi5fdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBjaGlsZHJlbi5fZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXZlbC0tO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmNoaWxkcmVuLmdldChjaGlsZHJlbi5fdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZENoaWxkcmVuKHBhcmVudCwgZGF0YVtsZXZlbFZhbHVlW2xldmVsXV0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGxlYWZDaGlsZHJlbiA9IGFkZENoaWxkcmVuKGNhdGVnb3J5RGF0YS5nZXQoZGF0YVsxXS5fdmFsdWUpLCBkYXRhWzBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vdXBkYXRlIGRhdGEgZnJvbSBjaGlsZHJlbiB0byBwYXJlbnRcclxuICAgICAgICAgICAgbGV0IHVwZGF0ZURhdGEgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbMF0gPSAhbm9kZS5zZXJpZXNbMF0gPyBbXSA6IG5vZGUuc2VyaWVzWzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBlcmlvZFZhbHVlSW5kZXggPSBwZXJpb2RPcmRlci5pbmRleE9mKGRhdGFbM10uX3ZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLnNlcmllc1swXVtwZXJpb2RWYWx1ZUluZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2VyaWVzWzBdW3BlcmlvZFZhbHVlSW5kZXhdID0gZGF0YVs0XS5fdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFUeXBlICE9PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbMV0gPSAhbm9kZS5zZXJpZXNbMV0gPyBbXSA6IG5vZGUuc2VyaWVzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNlcmllc1sxXVtwZXJpb2RWYWx1ZUluZGV4XSA9IGRhdGFbNV0uX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbMF1bcGVyaW9kVmFsdWVJbmRleF0gPSBub2RlLnNlcmllc1swXVtwZXJpb2RWYWx1ZUluZGV4XSArIGRhdGFbNF0uX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbm9kZS5zZXJpZXNbMF0uc2V0KGRhdGFbM10uX3ZhbHVlLCBidWRnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhVHlwZSAhPT0gXCJzaW5nbGVfbWVhc3VyZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2VyaWVzWzFdW3BlcmlvZFZhbHVlSW5kZXhdID0gbm9kZS5zZXJpZXNbMV1bcGVyaW9kVmFsdWVJbmRleF0gKyBkYXRhWzVdLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBub2RlLnNlcmllc1sxXS5zZXQoZGF0YVszXS5fdmFsdWUsIGZvcmVjYXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhKG5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZURhdGEobGVhZkNoaWxkcmVuKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9jb252ZXJ0IHRvIFZEVCBEQVRBIEZvcm1hdFxyXG4gICAgICAgIGNhdGVnb3J5RGF0YSA9IEFycmF5LmZyb20oY2F0ZWdvcnlEYXRhLnZhbHVlcygpKTtcclxuXHJcbiAgICAgICAgY2F0ZWdvcnlEYXRhLm1hcChub2RlID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hcHRvQXJyYXkgPSBub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4gPSBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4udmFsdWVzKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG5vZGUucGFyZW50O1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5tYXAobm9kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFwdG9BcnJheShub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBtYXB0b0FycmF5KG5vZGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzTmFtZXMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGFUeXBlID09IFwic2luZ2xlX21lYXN1cmVcIikge1xyXG4gICAgICAgICAgICBzZXJpZXNOYW1lcyA9IFt0YWJsZWF1RGF0YVswXS5fY29sdW1uc1s0XS5fZmllbGROYW1lXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXJpZXNOYW1lcyA9IFtcclxuICAgICAgICAgICAgICAgIHRhYmxlYXVEYXRhWzBdLl9jb2x1bW5zWzRdLl9maWVsZE5hbWUsXHJcbiAgICAgICAgICAgICAgICB0YWJsZWF1RGF0YVswXS5fY29sdW1uc1s1XS5fZmllbGROYW1lXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHBlcmlvZHM6IHBlcmlvZHMsXHJcbiAgICAgICAgICAgIHJvd3M6IGNhdGVnb3J5RGF0YSxcclxuICAgICAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHBlcmlvZHM6IHBlcmlvZHMsXHJcbiAgICAgICAgICAgICAgICBzZXJpZXM6IHNlcmllc05hbWVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvcHM7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHRyYW5zZm9ybW5vUGVyaW9kRGF0YSA9ICh0YWJsZWF1RGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBwZXJpb2RfbGVuZ3RoID0gdGFibGVhdURhdGFbMF0uX2NvbHVtbnMubGVuZ3RoIC0gMTsgLy9kaW1lbnNpb24gbGVuZ3RoXHJcbiAgICAgICAgbGV0IG51bWJlcl9vZl9wZXJpb2RzID0gMTI7IC8vc2hvdWxkIGJlIGNvbWluZyBmcm9tIGVkaXRvclxyXG4gICAgICAgIGxldCBudW1iZXJfb2Zfc2VyaWVzID0gcGVyaW9kX2xlbmd0aCAvIG51bWJlcl9vZl9wZXJpb2RzO1xyXG4gICAgICAgIGxldCByb3dzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIGxldCBwZXJpb2RzID0gW107XHJcbiAgICAgICAgbGV0IGk7XHJcblxyXG4gICAgICAgIC8vZ2V0IHBlcmlvZHNcclxuICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IHBlcmlvZF9sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvL2kgPT0gY291bnQgc2hvdWxkIGJlIG51bWJlciBvZiBkaW1lbnNpb25cclxuICAgICAgICAgICAgcGVyaW9kcy5wdXNoKHRhYmxlYXVEYXRhWzBdLl9jb2x1bW5zW2ldLl9maWVsZE5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFibGVhdURhdGFbMF0uX2RhdGEubWFwKHJvd19kYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKCFyb3dzLmhhcyhyb3dfZGF0YVswXS5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAvL0ZpcnN0IGFkZCByb290XHJcbiAgICAgICAgICAgICAgICByb3dzLnNldChyb3dfZGF0YVswXS5fdmFsdWUsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogcm93X2RhdGFbMF0uX3ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiByb3dfZGF0YVswXS5fZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VyaWVzOiBbXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy91cGRhdGUgZGF0YSBiYXNlZCBvbiBwZXJpb2RzXHJcbiAgICAgICAgICAgIGxldCBpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IHBlcmlvZF9sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy9pID09IGNvdW50IHNob3VsZCBiZSBudW1iZXIgb2YgZGltZW5zaW9uXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWVzSW5kZXggPSBNYXRoLmNlaWwoaSAvIDEyKSAtIDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFJvdyA9IHJvd3MuZ2V0KHJvd19kYXRhWzBdLl92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Um93LnNlcmllc1tzZXJpZXNJbmRleF0gPSBjdXJyZW50Um93LnNlcmllc1tzZXJpZXNJbmRleF0gP1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3cuc2VyaWVzW3Nlcmllc0luZGV4XSA6XHJcbiAgICAgICAgICAgICAgICAgICAgW107XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Um93LnNlcmllc1tzZXJpZXNJbmRleF0ucHVzaChyb3dfZGF0YVtpXS5fdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBwcm9wcyA9IHtcclxuICAgICAgICAgICAgcGVyaW9kczogW3tcclxuICAgICAgICAgICAgICAgIGlkOiBcIjFcIixcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBcIjFcIlxyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgcm93czogQXJyYXkuZnJvbShyb3dzLnZhbHVlcygpKSxcclxuICAgICAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHBlcmlvZHM6IHBlcmlvZHMsXHJcbiAgICAgICAgICAgICAgICBzZXJpZXM6IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiBwcm9wcztcclxuICAgIH07XHJcbiAgICBjb252ZXJ0RGF0YSA9IChkYXRhVHlwZSkgPT4ge1xyXG4gICAgICAgIGxldCBUYWJsZWF1RGF0YSA9IGRhdGFGb3JtYXRNYXBbZGF0YVR5cGVdO1xyXG4gICAgICAgIC8vc2VyaWVzIHNob3VsZCBiZSBiYXNlZCBvbiBudW1iZXIgb2YgbWVhc3VyZXNcclxuICAgICAgICBpZiAoZGF0YVR5cGUgPT09IFwid2l0aF9hY3R1YWxfZGF0YVwiIHx8IGRhdGFUeXBlID09PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGFQYXJzZXIudHJhbnNmb3JtUGVyaW9kRGF0YShkYXRhVHlwZSxUYWJsZWF1RGF0YSlcclxuICAgICAgICB9ZWxzZSBpZiAoZGF0YVR5cGUgPT09IFwibm9fcGVyaW9kc1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhUGFyc2VyLnRyYW5zZm9ybW5vUGVyaW9kRGF0YShUYWJsZWF1RGF0YSlcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59IiwiaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcclxuXHJcbmVudW0gUGVyaW9kVHlwZXMge1xyXG4gICAgTlVNQkVSID0gMSxcclxuICAgIENPTE9OX1NFUEFSQVRFRF9JTkRFWCA9IDIsXHJcbiAgICBJTkRFWF9BVF9FTkQgPSAzLFxyXG4gICAgTU9OVEhfU1RSSU5HX1NIID0gNCxcclxuICAgIE1PTlRIX1NUUklOR19MRyA9IDUsXHJcbiAgICBXRUVLX1NUUklOR19TSCAgPSA2LFxyXG4gICAgV0VFS19TVFJJTkdfTEcgID0gNyxcclxuICAgIElTT184NjAxX0RBVEUgICA9IDgsXHJcbiAgICBURVhUID0gOVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyaW9kUGFyc2VyIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbW9udGhXZWVrRm9ybWF0cyA9IHtcclxuICAgICAgICBcIk1PTlRIX1NUUklOR19TSFwiOiBbXHJcbiAgICAgICAgICAgIFwiamFuXCIsXHJcbiAgICAgICAgICAgIFwiZmViXCIsXHJcbiAgICAgICAgICAgIFwibWFyXCIsXHJcbiAgICAgICAgICAgIFwiYXByXCIsXHJcbiAgICAgICAgICAgIFwibWF5XCIsXHJcbiAgICAgICAgICAgIFwianVuXCIsXHJcbiAgICAgICAgICAgIFwianVsXCIsXHJcbiAgICAgICAgICAgIFwiYXVnXCIsXHJcbiAgICAgICAgICAgIFwic2VwXCIsXHJcbiAgICAgICAgICAgIFwib2N0XCIsXHJcbiAgICAgICAgICAgIFwibm92XCIsXHJcbiAgICAgICAgICAgIFwiZGVjXCJcclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiTU9OVEhfU1RSSU5HX0xHXCI6IFtcclxuICAgICAgICAgICAgXCJqYW51YXJ5XCIsXHJcbiAgICAgICAgICAgIFwiZmVicnVhcnlcIixcclxuICAgICAgICAgICAgXCJtYXJjaFwiLFxyXG4gICAgICAgICAgICBcImFwcmlsXCIsXHJcbiAgICAgICAgICAgIFwibWF5XCIsXHJcbiAgICAgICAgICAgIFwianVuZVwiLFxyXG4gICAgICAgICAgICBcImp1bHlcIixcclxuICAgICAgICAgICAgXCJhdWd1c3RcIixcclxuICAgICAgICAgICAgXCJzZXB0ZW1iZXJcIixcclxuICAgICAgICAgICAgXCJvY3RvYmVyXCIsXHJcbiAgICAgICAgICAgIFwibm92ZW1iZXJcIixcclxuICAgICAgICAgICAgXCJkZWNlbWJlclwiXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcIldFRUtfU1RSSU5HX1NIXCI6IFtcInN1blwiLCBcIm1vblwiLCBcInR1ZVwiLCBcIndlZFwiLCBcInRodVwiLCBcImZyaVwiLCBcInNhdFwiXSxcclxuICAgICAgICBcIldFRUtfU1RSSU5HX0xHXCI6IFtcclxuICAgICAgICAgICAgXCJzdW5kYXlcIixcclxuICAgICAgICAgICAgXCJtb25kYXlcIixcclxuICAgICAgICAgICAgXCJ0dWVzZGF5XCIsXHJcbiAgICAgICAgICAgIFwid2VkbmVzZGF5XCIsXHJcbiAgICAgICAgICAgIFwidGh1cnNkYXlcIixcclxuICAgICAgICAgICAgXCJmcmlkYXlcIixcclxuICAgICAgICAgICAgXCJzYXR1cmRheVwiXHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpbmRleEF0RW5kUmVnZXggPSAvXFxkKyQvO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGNoZWNrTW9udGhXZWVrRm9ybWF0KHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBtd0Zvcm1hdHMgPSBQZXJpb2RQYXJzZXIubW9udGhXZWVrRm9ybWF0cztcclxuICAgICAgICBjb25zdCBmb3JtYXRUeXBlcyA9IE9iamVjdC5rZXlzKG13Rm9ybWF0cyk7XHJcbiAgICAgICAgbGV0IHBlcmlvZEZvcm1hdDogc3RyaW5nO1xyXG4gICAgICAgIGxldCBtYXRjaEZvdW5kOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgc3RyID0gc3RyLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybWF0VHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWF0Y2hGb3VuZCA9IG13Rm9ybWF0c1tmb3JtYXRUeXBlc1tpXV0uc29tZSgoaXRlbTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbSA9PT0gc3RyO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaEZvdW5kKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RGb3JtYXQgPSBmb3JtYXRUeXBlc1tpXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwZXJpb2RGb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UGVyaW9kVHlwZShwZXJpb2Q6IHN0cmluZyB8IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgcGVyaW9kID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQZXJpb2RUeXBlcy5OVU1CRVI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGVyaW9kVHlwZSA9IFBlcmlvZFBhcnNlci5jaGVja01vbnRoV2Vla0Zvcm1hdChwZXJpb2QpO1xyXG4gICAgICAgIGlmIChwZXJpb2RUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQZXJpb2RUeXBlc1twZXJpb2RUeXBlXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXlqcyhwZXJpb2QpLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUGVyaW9kVHlwZXMuSVNPXzg2MDFfREFURTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQocGVyaW9kKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBlcmlvZFR5cGVzLkNPTE9OX1NFUEFSQVRFRF9JTkRFWDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwZXJpb2QubWF0Y2goUGVyaW9kUGFyc2VyLmluZGV4QXRFbmRSZWdleCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBlcmlvZFR5cGVzLklOREVYX0FUX0VORDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQZXJpb2RUeXBlcy5URVhUO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTb3J0ZWRPcmRlcihwZXJpb2RzOiBzdHJpbmdbXSB8IG51bWJlcltdKSB7XHJcbiAgICAgICAgY29uc3QgcGVyaW9kID0gcGVyaW9kc1swXVszXS5fdmFsdWU7XHJcbiAgICAgICAgbGV0IHBlcmlvZFR5cGUgPSBQZXJpb2RQYXJzZXIuZ2V0UGVyaW9kVHlwZShwZXJpb2QpOyAgXHJcbiAgICAgICAgcmV0dXJuIFBlcmlvZFBhcnNlci5tb250aFdlZWtGb3JtYXRzW1BlcmlvZFR5cGVzW3BlcmlvZFR5cGVdXTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=