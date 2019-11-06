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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DataParser = exports.DataParser = function DataParser() {
  var _this = this;

  _classCallCheck(this, DataParser);

  _defineProperty(this, "transformPeriodData", function (dataType, tableauData) {
    var categoryData = new Map();
    var periods = []; //get all periods sepeartely

    tableauData[0]._data.map(function (data) {
      var periodData = {
        id: data[3]._value,
        label: data[3]._formattedValue
      };

      if (!periods.some(function (period) {
        return period.id === data[3]._value;
      })) {
        periods.push(periodData);
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
          series: [new Map(), new Map()],
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
        node.series[0] = !node.series[0] ? new Map() : node.series[0];

        if (!node.series[0].get(data[3]._value)) {
          node.series[0].set(data[3]._value, data[4]._value);

          if (dataType !== "single_measure") {
            node.series[1] = !node.series[1] ? new Map() : node.series[1];
            node.series[1].set(data[3]._value, data[5]._value);
          }
        } else {
          var budget = node.series[0].get(data[3]._value) + data[4]._value;

          node.series[0].set(data[3]._value, budget);

          if (dataType !== "single_measure") {
            var forecast = node.series[0].get(data[3]._value) + data[5]._value;

            node.series[1].set(data[3]._value, forecast);
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

        if (dataType == "single_measure") {
          node.series = [Array.from(node.series[0].values())];
        } else {
          node.series = [Array.from(node.series[0].values()), Array.from(node.series[1].values())];
        }

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

  _defineProperty(this, "transformnoPeriodData", function (tableauData) {
    var period_length = tableauData[0]._columns.length - 1; //dimension length

    var number_of_periods = 12; //should be coming from editor

    var number_of_series = period_length / number_of_periods;
    var rows = new Map();
    var periods = []; //get periods

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

  _defineProperty(this, "convertData", function (dataType) {
    var TableauData = _this.dataFormatMap[dataType]; //series should be based on number of measures

    if (dataType === "with_actual_data" || dataType === "single_measure") {
      return _this.transformPeriodData(dataType, TableauData);
    } else if (dataType === "no_periods") {
      return _this.transformnoPeriodData(TableauData);
    }
  });

  this.dataFormatMap = {
    "with_actual_data": with_actual_data,
    "no_periods": no_periods,
    "measure_as_category": measure_as_category,
    "no_category": no_category,
    "single_measure": single_measure
  };
};

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6WyJEYXRhUGFyc2VyIiwiZGF0YVR5cGUiLCJ0YWJsZWF1RGF0YSIsImNhdGVnb3J5RGF0YSIsIk1hcCIsInBlcmlvZHMiLCJfZGF0YSIsIm1hcCIsImRhdGEiLCJwZXJpb2REYXRhIiwiaWQiLCJfdmFsdWUiLCJsYWJlbCIsIl9mb3JtYXR0ZWRWYWx1ZSIsInNvbWUiLCJwZXJpb2QiLCJwdXNoIiwibnVtYmVyT2ZQZXJpb2RzIiwibGVuZ3RoIiwibGV2ZWwiLCJsZXZlbFZhbHVlIiwiaGFzIiwic2V0IiwiY2hpbGRyZW4iLCJzZXJpZXMiLCJwYXJlbnQiLCJhZGRDaGlsZHJlbiIsImdldCIsImxlYWZDaGlsZHJlbiIsInVwZGF0ZURhdGEiLCJub2RlIiwiYnVkZ2V0IiwiZm9yZWNhc3QiLCJBcnJheSIsImZyb20iLCJ2YWx1ZXMiLCJtYXB0b0FycmF5Iiwic2VyaWVzTmFtZXMiLCJfY29sdW1ucyIsIl9maWVsZE5hbWUiLCJwcm9wcyIsInJvd3MiLCJtZXRhZGF0YSIsInBlcmlvZF9sZW5ndGgiLCJudW1iZXJfb2ZfcGVyaW9kcyIsIm51bWJlcl9vZl9zZXJpZXMiLCJpIiwicm93X2RhdGEiLCJzZXJpZXNJbmRleCIsIk1hdGgiLCJjZWlsIiwiY3VycmVudFJvdyIsIlRhYmxlYXVEYXRhIiwiZGF0YUZvcm1hdE1hcCIsInRyYW5zZm9ybVBlcmlvZERhdGEiLCJ0cmFuc2Zvcm1ub1BlcmlvZERhdGEiLCJ3aXRoX2FjdHVhbF9kYXRhIiwibm9fcGVyaW9kcyIsIm1lYXN1cmVfYXNfY2F0ZWdvcnkiLCJub19jYXRlZ29yeSIsInNpbmdsZV9tZWFzdXJlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNsRmFBLFUsV0FBQUEsVSxHQUVULHNCQUFjO0FBQUE7O0FBQUE7O0FBQUEsK0NBVVEsVUFBQ0MsUUFBRCxFQUFVQyxXQUFWLEVBQTBCO0FBQzVDLFFBQUlDLFlBQVksR0FBRyxJQUFJQyxHQUFKLEVBQW5CO0FBQ0EsUUFBSUMsT0FBTyxHQUFHLEVBQWQsQ0FGNEMsQ0FJNUM7O0FBQ0FILGVBQVcsQ0FBQyxDQUFELENBQVgsQ0FBZUksS0FBZixDQUFxQkMsR0FBckIsQ0FBeUIsVUFBQUMsSUFBSSxFQUFJO0FBQzdCLFVBQUlDLFVBQVUsR0FBRztBQUNiQyxVQUFFLEVBQUVGLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUcsTUFEQztBQUViQyxhQUFLLEVBQUVKLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUs7QUFGRixPQUFqQjs7QUFJQSxVQUFJLENBQUNSLE9BQU8sQ0FBQ1MsSUFBUixDQUFhLFVBQUFDLE1BQU07QUFBQSxlQUFJQSxNQUFNLENBQUNMLEVBQVAsS0FBY0YsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRRyxNQUExQjtBQUFBLE9BQW5CLENBQUwsRUFBMkQ7QUFDdkROLGVBQU8sQ0FBQ1csSUFBUixDQUFhUCxVQUFiO0FBQ0g7QUFDSixLQVJEOztBQVVBLFFBQUlRLGVBQWUsR0FBR1osT0FBTyxDQUFDYSxNQUE5QixDQWY0QyxDQWVOOztBQUN0QyxRQUFJQyxLQUFKO0FBQ0EsUUFBSUMsVUFBVSxHQUFHO0FBQ2IsU0FBRyxDQURVO0FBRWIsU0FBRztBQUZVLEtBQWpCLENBakI0QyxDQW9CekM7O0FBRUhsQixlQUFXLENBQUMsQ0FBRCxDQUFYLENBQWVJLEtBQWYsQ0FBcUJDLEdBQXJCLENBQXlCLFVBQUFDLElBQUksRUFBSTtBQUU3QlcsV0FBSyxHQUFHLENBQVIsQ0FGNkIsQ0FFbEI7O0FBRVgsVUFBSSxDQUFDaEIsWUFBWSxDQUFDa0IsR0FBYixDQUFpQmIsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRRyxNQUF6QixDQUFMLEVBQXVDO0FBQ25DO0FBQ0FSLG9CQUFZLENBQUNtQixHQUFiLENBQWlCZCxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFHLE1BQXpCLEVBQWlDO0FBQzdCRCxZQUFFLEVBQUVGLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUcsTUFEaUI7QUFFN0JDLGVBQUssRUFBRUosSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRSyxlQUZjO0FBRzdCVSxrQkFBUSxFQUFFLElBQUluQixHQUFKLEVBSG1CO0FBSTdCb0IsZ0JBQU0sRUFBRSxDQUFDLElBQUlwQixHQUFKLEVBQUQsRUFBWSxJQUFJQSxHQUFKLEVBQVosQ0FKcUI7QUFLN0JxQixnQkFBTSxFQUFFO0FBTHFCLFNBQWpDO0FBT0g7O0FBRUQsVUFBSUMsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ0QsTUFBRCxFQUFTRixRQUFULEVBQXNCO0FBQ3BDO0FBQ0EsWUFBSUosS0FBSyxHQUFHLENBQVosRUFBZTtBQUNYLGlCQUFPTSxNQUFQO0FBQ0g7O0FBQ0QsWUFBSSxDQUFDQSxNQUFNLENBQUNGLFFBQVAsQ0FBZ0JGLEdBQWhCLENBQW9CRSxRQUFRLENBQUNaLE1BQTdCLENBQUwsRUFBMkM7QUFDdkNjLGdCQUFNLENBQUNGLFFBQVAsQ0FBZ0JELEdBQWhCLENBQW9CQyxRQUFRLENBQUNaLE1BQTdCLEVBQXFDO0FBQ2pDRCxjQUFFLEVBQUVhLFFBQVEsQ0FBQ1osTUFEb0I7QUFFakNDLGlCQUFLLEVBQUVXLFFBQVEsQ0FBQ1YsZUFGaUI7QUFHakNVLG9CQUFRLEVBQUUsSUFBSW5CLEdBQUosRUFIdUI7QUFJakNvQixrQkFBTSxFQUFFLEVBSnlCO0FBS2pDQyxrQkFBTSxFQUFFQTtBQUx5QixXQUFyQztBQU9IOztBQUNETixhQUFLO0FBQ0xNLGNBQU0sR0FBR0EsTUFBTSxDQUFDRixRQUFQLENBQWdCSSxHQUFoQixDQUFvQkosUUFBUSxDQUFDWixNQUE3QixDQUFUO0FBQ0EsZUFBT2UsV0FBVyxDQUFDRCxNQUFELEVBQVNqQixJQUFJLENBQUNZLFVBQVUsQ0FBQ0QsS0FBRCxDQUFYLENBQWIsQ0FBbEI7QUFDSCxPQWpCRDs7QUFtQkEsVUFBSVMsWUFBWSxHQUFHRixXQUFXLENBQUN2QixZQUFZLENBQUN3QixHQUFiLENBQWlCbkIsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRRyxNQUF6QixDQUFELEVBQW1DSCxJQUFJLENBQUMsQ0FBRCxDQUF2QyxDQUE5QixDQWxDNkIsQ0FvQzdCOztBQUNBLFVBQUlxQixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxJQUFELEVBQVU7QUFDdkJBLFlBQUksQ0FBQ04sTUFBTCxDQUFZLENBQVosSUFBaUIsQ0FBQ00sSUFBSSxDQUFDTixNQUFMLENBQVksQ0FBWixDQUFELEdBQWtCLElBQUlwQixHQUFKLEVBQWxCLEdBQThCMEIsSUFBSSxDQUFDTixNQUFMLENBQVksQ0FBWixDQUEvQzs7QUFDQSxZQUFJLENBQUNNLElBQUksQ0FBQ04sTUFBTCxDQUFZLENBQVosRUFBZUcsR0FBZixDQUFtQm5CLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUcsTUFBM0IsQ0FBTCxFQUF5QztBQUNyQ21CLGNBQUksQ0FBQ04sTUFBTCxDQUFZLENBQVosRUFBZUYsR0FBZixDQUFtQmQsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRRyxNQUEzQixFQUFtQ0gsSUFBSSxDQUFDLENBQUQsQ0FBSixDQUFRRyxNQUEzQzs7QUFDQSxjQUFJVixRQUFRLEtBQUssZ0JBQWpCLEVBQW1DO0FBQy9CNkIsZ0JBQUksQ0FBQ04sTUFBTCxDQUFZLENBQVosSUFBaUIsQ0FBQ00sSUFBSSxDQUFDTixNQUFMLENBQVksQ0FBWixDQUFELEdBQWtCLElBQUlwQixHQUFKLEVBQWxCLEdBQThCMEIsSUFBSSxDQUFDTixNQUFMLENBQVksQ0FBWixDQUEvQztBQUNBTSxnQkFBSSxDQUFDTixNQUFMLENBQVksQ0FBWixFQUFlRixHQUFmLENBQW1CZCxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFHLE1BQTNCLEVBQW1DSCxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFHLE1BQTNDO0FBQ0g7QUFDSixTQU5ELE1BTU87QUFDSCxjQUFJb0IsTUFBTSxHQUFHRCxJQUFJLENBQUNOLE1BQUwsQ0FBWSxDQUFaLEVBQWVHLEdBQWYsQ0FBbUJuQixJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFHLE1BQTNCLElBQXFDSCxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFHLE1BQTFEOztBQUNBbUIsY0FBSSxDQUFDTixNQUFMLENBQVksQ0FBWixFQUFlRixHQUFmLENBQW1CZCxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFHLE1BQTNCLEVBQW1Db0IsTUFBbkM7O0FBQ0EsY0FBSTlCLFFBQVEsS0FBSyxnQkFBakIsRUFBbUM7QUFDL0IsZ0JBQUkrQixRQUFRLEdBQUdGLElBQUksQ0FBQ04sTUFBTCxDQUFZLENBQVosRUFBZUcsR0FBZixDQUFtQm5CLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUcsTUFBM0IsSUFBcUNILElBQUksQ0FBQyxDQUFELENBQUosQ0FBUUcsTUFBNUQ7O0FBQ0FtQixnQkFBSSxDQUFDTixNQUFMLENBQVksQ0FBWixFQUFlRixHQUFmLENBQW1CZCxJQUFJLENBQUMsQ0FBRCxDQUFKLENBQVFHLE1BQTNCLEVBQW1DcUIsUUFBbkM7QUFDSDtBQUNKOztBQUNELFlBQUlGLElBQUksQ0FBQ0wsTUFBVCxFQUFpQjtBQUNiSSxvQkFBVSxDQUFDQyxJQUFJLENBQUNMLE1BQU4sQ0FBVjtBQUNIO0FBQ0osT0FuQkQ7O0FBcUJBSSxnQkFBVSxDQUFDRCxZQUFELENBQVY7QUFDSCxLQTNERCxFQXRCNEMsQ0FtRjVDOzs7QUFDQXpCLGdCQUFZLEdBQUc4QixLQUFLLENBQUNDLElBQU4sQ0FBVy9CLFlBQVksQ0FBQ2dDLE1BQWIsRUFBWCxDQUFmO0FBRUFoQyxnQkFBWSxDQUFDSSxHQUFiLENBQWlCLFVBQUF1QixJQUFJLEVBQUk7QUFDckIsVUFBSU0sVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQU4sSUFBSSxFQUFJO0FBQ3JCQSxZQUFJLENBQUNQLFFBQUwsR0FBZ0JVLEtBQUssQ0FBQ0MsSUFBTixDQUFXSixJQUFJLENBQUNQLFFBQUwsQ0FBY1ksTUFBZCxFQUFYLENBQWhCOztBQUNBLFlBQUlsQyxRQUFRLElBQUksZ0JBQWhCLEVBQWtDO0FBQzlCNkIsY0FBSSxDQUFDTixNQUFMLEdBQWMsQ0FBQ1MsS0FBSyxDQUFDQyxJQUFOLENBQVdKLElBQUksQ0FBQ04sTUFBTCxDQUFZLENBQVosRUFBZVcsTUFBZixFQUFYLENBQUQsQ0FBZDtBQUNILFNBRkQsTUFFTztBQUNITCxjQUFJLENBQUNOLE1BQUwsR0FBYyxDQUNWUyxLQUFLLENBQUNDLElBQU4sQ0FBV0osSUFBSSxDQUFDTixNQUFMLENBQVksQ0FBWixFQUFlVyxNQUFmLEVBQVgsQ0FEVSxFQUVWRixLQUFLLENBQUNDLElBQU4sQ0FBV0osSUFBSSxDQUFDTixNQUFMLENBQVksQ0FBWixFQUFlVyxNQUFmLEVBQVgsQ0FGVSxDQUFkO0FBSUg7O0FBQ0QsWUFBSSxDQUFDTCxJQUFJLENBQUNQLFFBQVYsRUFBb0I7QUFDaEI7QUFDSDs7QUFDRCxlQUFPTyxJQUFJLENBQUNMLE1BQVo7QUFDQUssWUFBSSxDQUFDUCxRQUFMLENBQWNoQixHQUFkLENBQWtCLFVBQUF1QixJQUFJLEVBQUk7QUFDdEJNLG9CQUFVLENBQUNOLElBQUQsQ0FBVjtBQUNILFNBRkQ7QUFHSCxPQWpCRDs7QUFrQkFNLGdCQUFVLENBQUNOLElBQUQsQ0FBVjtBQUNILEtBcEJEO0FBc0JBLFFBQUlPLFdBQVcsR0FBRyxFQUFsQjs7QUFFQSxRQUFJcEMsUUFBUSxJQUFJLGdCQUFoQixFQUFrQztBQUM5Qm9DLGlCQUFXLEdBQUcsQ0FBQ25DLFdBQVcsQ0FBQyxDQUFELENBQVgsQ0FBZW9DLFFBQWYsQ0FBd0IsQ0FBeEIsRUFBMkJDLFVBQTVCLENBQWQ7QUFDSCxLQUZELE1BRU87QUFDSEYsaUJBQVcsR0FBRyxDQUNWbkMsV0FBVyxDQUFDLENBQUQsQ0FBWCxDQUFlb0MsUUFBZixDQUF3QixDQUF4QixFQUEyQkMsVUFEakIsRUFFVnJDLFdBQVcsQ0FBQyxDQUFELENBQVgsQ0FBZW9DLFFBQWYsQ0FBd0IsQ0FBeEIsRUFBMkJDLFVBRmpCLENBQWQ7QUFJSDs7QUFFRCxRQUFJQyxLQUFLLEdBQUc7QUFDUm5DLGFBQU8sRUFBRUEsT0FERDtBQUVSb0MsVUFBSSxFQUFFdEMsWUFGRTtBQUdSdUMsY0FBUSxFQUFFO0FBQ05yQyxlQUFPLEVBQUVBLE9BREg7QUFFTm1CLGNBQU0sRUFBRWE7QUFGRjtBQUhGLEtBQVo7QUFTQSxXQUFPRyxLQUFQO0FBQ0gsR0EzSWE7O0FBQUEsaURBNklVLFVBQUN0QyxXQUFELEVBQWlCO0FBQ3JDLFFBQUl5QyxhQUFhLEdBQUd6QyxXQUFXLENBQUMsQ0FBRCxDQUFYLENBQWVvQyxRQUFmLENBQXdCcEIsTUFBeEIsR0FBaUMsQ0FBckQsQ0FEcUMsQ0FDbUI7O0FBQ3hELFFBQUkwQixpQkFBaUIsR0FBRyxFQUF4QixDQUZxQyxDQUVUOztBQUM1QixRQUFJQyxnQkFBZ0IsR0FBR0YsYUFBYSxHQUFHQyxpQkFBdkM7QUFDQSxRQUFJSCxJQUFJLEdBQUcsSUFBSXJDLEdBQUosRUFBWDtBQUNBLFFBQUlDLE9BQU8sR0FBRyxFQUFkLENBTHFDLENBT3JDOztBQUNBLFNBQUt5QyxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLElBQUlILGFBQWpCLEVBQWdDRyxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDO0FBQ0F6QyxhQUFPLENBQUNXLElBQVIsQ0FBYWQsV0FBVyxDQUFDLENBQUQsQ0FBWCxDQUFlb0MsUUFBZixDQUF3QlEsQ0FBeEIsRUFBMkJQLFVBQXhDO0FBQ0g7O0FBRURyQyxlQUFXLENBQUMsQ0FBRCxDQUFYLENBQWVJLEtBQWYsQ0FBcUJDLEdBQXJCLENBQXlCLFVBQUF3QyxRQUFRLEVBQUk7QUFDakMsVUFBSSxDQUFDTixJQUFJLENBQUNwQixHQUFMLENBQVMwQixRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVlwQyxNQUFyQixDQUFMLEVBQW1DO0FBQy9CO0FBQ0E4QixZQUFJLENBQUNuQixHQUFMLENBQVN5QixRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVlwQyxNQUFyQixFQUE2QjtBQUN6QkQsWUFBRSxFQUFFcUMsUUFBUSxDQUFDLENBQUQsQ0FBUixDQUFZcEMsTUFEUztBQUV6QkMsZUFBSyxFQUFFbUMsUUFBUSxDQUFDLENBQUQsQ0FBUixDQUFZbEMsZUFGTTtBQUd6QlcsZ0JBQU0sRUFBRTtBQUhpQixTQUE3QjtBQUtILE9BUmdDLENBU2pDOzs7QUFDQSxVQUFJc0IsQ0FBSjs7QUFDQSxXQUFLQSxDQUFDLEdBQUcsQ0FBVCxFQUFZQSxDQUFDLElBQUlILGFBQWpCLEVBQWdDRyxDQUFDLEVBQWpDLEVBQXFDO0FBQ2pDO0FBQ0EsWUFBSUUsV0FBVyxHQUFHQyxJQUFJLENBQUNDLElBQUwsQ0FBVUosQ0FBQyxHQUFHLEVBQWQsSUFBb0IsQ0FBdEM7QUFDQSxZQUFJSyxVQUFVLEdBQUdWLElBQUksQ0FBQ2QsR0FBTCxDQUFTb0IsUUFBUSxDQUFDLENBQUQsQ0FBUixDQUFZcEMsTUFBckIsQ0FBakI7QUFDQXdDLGtCQUFVLENBQUMzQixNQUFYLENBQWtCd0IsV0FBbEIsSUFBaUNHLFVBQVUsQ0FBQzNCLE1BQVgsQ0FBa0J3QixXQUFsQixJQUM3QkcsVUFBVSxDQUFDM0IsTUFBWCxDQUFrQndCLFdBQWxCLENBRDZCLEdBRTdCLEVBRko7QUFHQUcsa0JBQVUsQ0FBQzNCLE1BQVgsQ0FBa0J3QixXQUFsQixFQUErQmhDLElBQS9CLENBQW9DK0IsUUFBUSxDQUFDRCxDQUFELENBQVIsQ0FBWW5DLE1BQWhEO0FBQ0g7QUFDSixLQXBCRDs7QUFzQkEsUUFBSTZCLEtBQUssR0FBRztBQUNSbkMsYUFBTyxFQUFFLENBQUM7QUFDTkssVUFBRSxFQUFFLEdBREU7QUFFTkUsYUFBSyxFQUFFO0FBRkQsT0FBRCxDQUREO0FBS1I2QixVQUFJLEVBQUVSLEtBQUssQ0FBQ0MsSUFBTixDQUFXTyxJQUFJLENBQUNOLE1BQUwsRUFBWCxDQUxFO0FBTVJPLGNBQVEsRUFBRTtBQUNOckMsZUFBTyxFQUFFQSxPQURIO0FBRU5tQixjQUFNLEVBQUU7QUFGRjtBQU5GLEtBQVo7QUFZQSxXQUFPZ0IsS0FBUDtBQUNILEdBN0xhOztBQUFBLHVDQThMQSxVQUFDdkMsUUFBRCxFQUFjO0FBQ3hCLFFBQUltRCxXQUFXLEdBQUcsS0FBSSxDQUFDQyxhQUFMLENBQW1CcEQsUUFBbkIsQ0FBbEIsQ0FEd0IsQ0FFeEI7O0FBQ0EsUUFBSUEsUUFBUSxLQUFLLGtCQUFiLElBQW1DQSxRQUFRLEtBQUssZ0JBQXBELEVBQXNFO0FBQ2xFLGFBQU8sS0FBSSxDQUFDcUQsbUJBQUwsQ0FBeUJyRCxRQUF6QixFQUFrQ21ELFdBQWxDLENBQVA7QUFDSCxLQUZELE1BRU0sSUFBSW5ELFFBQVEsS0FBSyxZQUFqQixFQUErQjtBQUNqQyxhQUFPLEtBQUksQ0FBQ3NELHFCQUFMLENBQTJCSCxXQUEzQixDQUFQO0FBQ0g7QUFDSixHQXRNYTs7QUFDVixPQUFLQyxhQUFMLEdBQXFCO0FBQ2pCLHdCQUFvQkcsZ0JBREg7QUFFakIsa0JBQWNDLFVBRkc7QUFHakIsMkJBQXVCQyxtQkFITjtBQUlqQixtQkFBZUMsV0FKRTtBQUtqQixzQkFBa0JDO0FBTEQsR0FBckI7QUFPSCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21haW4uanNcIik7XG4iLCJleHBvcnQgY2xhc3MgRGF0YVBhcnNlciB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YUZvcm1hdE1hcCA9IHtcclxuICAgICAgICAgICAgXCJ3aXRoX2FjdHVhbF9kYXRhXCI6IHdpdGhfYWN0dWFsX2RhdGEsXHJcbiAgICAgICAgICAgIFwibm9fcGVyaW9kc1wiOiBub19wZXJpb2RzLFxyXG4gICAgICAgICAgICBcIm1lYXN1cmVfYXNfY2F0ZWdvcnlcIjogbWVhc3VyZV9hc19jYXRlZ29yeSxcclxuICAgICAgICAgICAgXCJub19jYXRlZ29yeVwiOiBub19jYXRlZ29yeSxcclxuICAgICAgICAgICAgXCJzaW5nbGVfbWVhc3VyZVwiOiBzaW5nbGVfbWVhc3VyZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNmb3JtUGVyaW9kRGF0YSA9IChkYXRhVHlwZSx0YWJsZWF1RGF0YSkgPT4ge1xyXG4gICAgICAgIGxldCBjYXRlZ29yeURhdGEgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgbGV0IHBlcmlvZHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9nZXQgYWxsIHBlcmlvZHMgc2VwZWFydGVseVxyXG4gICAgICAgIHRhYmxlYXVEYXRhWzBdLl9kYXRhLm1hcChkYXRhID0+IHtcclxuICAgICAgICAgICAgbGV0IHBlcmlvZERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpZDogZGF0YVszXS5fdmFsdWUsXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogZGF0YVszXS5fZm9ybWF0dGVkVmFsdWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKCFwZXJpb2RzLnNvbWUocGVyaW9kID0+IHBlcmlvZC5pZCA9PT0gZGF0YVszXS5fdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICBwZXJpb2RzLnB1c2gocGVyaW9kRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG51bWJlck9mUGVyaW9kcyA9IHBlcmlvZHMubGVuZ3RoOyAvL2NhbiBiZSBnZXQgZnJvbSBlZGl0b3IgYWxzb1xyXG4gICAgICAgIGxldCBsZXZlbDtcclxuICAgICAgICBsZXQgbGV2ZWxWYWx1ZSA9IHtcclxuICAgICAgICAgICAgMDogMixcclxuICAgICAgICAgICAgMTogMFxyXG4gICAgICAgIH07IC8vIGRhdGEgbWFwIG5lZWQgdG8gYmUgZG9uZSBiYXNlZCBvbiBkYXRhIHV0aWxpdHlcclxuXHJcbiAgICAgICAgdGFibGVhdURhdGFbMF0uX2RhdGEubWFwKGRhdGEgPT4geyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV2ZWwgPSAxOyAvL2Jhc2VkIG9uIG51bWJlciBvZiBjYXRlZ29yeVxyXG5cclxuICAgICAgICAgICAgaWYgKCFjYXRlZ29yeURhdGEuaGFzKGRhdGFbMV0uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgLy9GaXJzdCBhZGQgcm9vdFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnlEYXRhLnNldChkYXRhWzFdLl92YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBkYXRhWzFdLl92YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogZGF0YVsxXS5fZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IG5ldyBNYXAoKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZXM6IFtuZXcgTWFwKCksIG5ldyBNYXAoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50OiBudWxsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGFkZENoaWxkcmVuID0gKHBhcmVudCwgY2hpbGRyZW4pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vdGhlbiBhZGQgY2hpbGRyZW4gcmVjdXJzaXZlbHkgYW5kIGZvcm0gdGhlIHN0cnVjdHVyZVxyXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBhcmVudC5jaGlsZHJlbi5oYXMoY2hpbGRyZW4uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbi5zZXQoY2hpbGRyZW4uX3ZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBjaGlsZHJlbi5fdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBjaGlsZHJlbi5fZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBuZXcgTWFwKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllczogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXZlbC0tO1xyXG4gICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LmNoaWxkcmVuLmdldChjaGlsZHJlbi5fdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkZENoaWxkcmVuKHBhcmVudCwgZGF0YVtsZXZlbFZhbHVlW2xldmVsXV0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGxlYWZDaGlsZHJlbiA9IGFkZENoaWxkcmVuKGNhdGVnb3J5RGF0YS5nZXQoZGF0YVsxXS5fdmFsdWUpLCBkYXRhWzBdKTtcclxuXHJcbiAgICAgICAgICAgIC8vdXBkYXRlIGRhdGEgZnJvbSBjaGlsZHJlbiB0byBwYXJlbnRcclxuICAgICAgICAgICAgbGV0IHVwZGF0ZURhdGEgPSAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXJpZXNbMF0gPSAhbm9kZS5zZXJpZXNbMF0gPyBuZXcgTWFwKCkgOiBub2RlLnNlcmllc1swXTtcclxuICAgICAgICAgICAgICAgIGlmICghbm9kZS5zZXJpZXNbMF0uZ2V0KGRhdGFbM10uX3ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2VyaWVzWzBdLnNldChkYXRhWzNdLl92YWx1ZSwgZGF0YVs0XS5fdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhVHlwZSAhPT0gXCJzaW5nbGVfbWVhc3VyZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2VyaWVzWzFdID0gIW5vZGUuc2VyaWVzWzFdID8gbmV3IE1hcCgpIDogbm9kZS5zZXJpZXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2VyaWVzWzFdLnNldChkYXRhWzNdLl92YWx1ZSwgZGF0YVs1XS5fdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1ZGdldCA9IG5vZGUuc2VyaWVzWzBdLmdldChkYXRhWzNdLl92YWx1ZSkgKyBkYXRhWzRdLl92YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnNlcmllc1swXS5zZXQoZGF0YVszXS5fdmFsdWUsIGJ1ZGdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFUeXBlICE9PSBcInNpbmdsZV9tZWFzdXJlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcmVjYXN0ID0gbm9kZS5zZXJpZXNbMF0uZ2V0KGRhdGFbM10uX3ZhbHVlKSArIGRhdGFbNV0uX3ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNlcmllc1sxXS5zZXQoZGF0YVszXS5fdmFsdWUsIGZvcmVjYXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVEYXRhKG5vZGUucGFyZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZURhdGEobGVhZkNoaWxkcmVuKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9jb252ZXJ0IHRvIFZEVCBEQVRBIEZvcm1hdFxyXG4gICAgICAgIGNhdGVnb3J5RGF0YSA9IEFycmF5LmZyb20oY2F0ZWdvcnlEYXRhLnZhbHVlcygpKTtcclxuXHJcbiAgICAgICAgY2F0ZWdvcnlEYXRhLm1hcChub2RlID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hcHRvQXJyYXkgPSBub2RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4gPSBBcnJheS5mcm9tKG5vZGUuY2hpbGRyZW4udmFsdWVzKCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFUeXBlID09IFwic2luZ2xlX21lYXN1cmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2VyaWVzID0gW0FycmF5LmZyb20obm9kZS5zZXJpZXNbMF0udmFsdWVzKCkpXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXJpZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFycmF5LmZyb20obm9kZS5zZXJpZXNbMF0udmFsdWVzKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBcnJheS5mcm9tKG5vZGUuc2VyaWVzWzFdLnZhbHVlcygpKVxyXG4gICAgICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLm1hcChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBtYXB0b0FycmF5KG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIG1hcHRvQXJyYXkobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBzZXJpZXNOYW1lcyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoZGF0YVR5cGUgPT0gXCJzaW5nbGVfbWVhc3VyZVwiKSB7XHJcbiAgICAgICAgICAgIHNlcmllc05hbWVzID0gW3RhYmxlYXVEYXRhWzBdLl9jb2x1bW5zWzRdLl9maWVsZE5hbWVdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcmllc05hbWVzID0gW1xyXG4gICAgICAgICAgICAgICAgdGFibGVhdURhdGFbMF0uX2NvbHVtbnNbNF0uX2ZpZWxkTmFtZSxcclxuICAgICAgICAgICAgICAgIHRhYmxlYXVEYXRhWzBdLl9jb2x1bW5zWzVdLl9maWVsZE5hbWVcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcm9wcyA9IHtcclxuICAgICAgICAgICAgcGVyaW9kczogcGVyaW9kcyxcclxuICAgICAgICAgICAgcm93czogY2F0ZWdvcnlEYXRhLFxyXG4gICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgcGVyaW9kczogcGVyaW9kcyxcclxuICAgICAgICAgICAgICAgIHNlcmllczogc2VyaWVzTmFtZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9wcztcclxuICAgIH07XHJcblxyXG4gICAgdHJhbnNmb3Jtbm9QZXJpb2REYXRhID0gKHRhYmxlYXVEYXRhKSA9PiB7XHJcbiAgICAgICAgbGV0IHBlcmlvZF9sZW5ndGggPSB0YWJsZWF1RGF0YVswXS5fY29sdW1ucy5sZW5ndGggLSAxOyAvL2RpbWVuc2lvbiBsZW5ndGhcclxuICAgICAgICBsZXQgbnVtYmVyX29mX3BlcmlvZHMgPSAxMjsgLy9zaG91bGQgYmUgY29taW5nIGZyb20gZWRpdG9yXHJcbiAgICAgICAgbGV0IG51bWJlcl9vZl9zZXJpZXMgPSBwZXJpb2RfbGVuZ3RoIC8gbnVtYmVyX29mX3BlcmlvZHM7XHJcbiAgICAgICAgbGV0IHJvd3MgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgbGV0IHBlcmlvZHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9nZXQgcGVyaW9kc1xyXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPD0gcGVyaW9kX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vaSA9PSBjb3VudCBzaG91bGQgYmUgbnVtYmVyIG9mIGRpbWVuc2lvblxyXG4gICAgICAgICAgICBwZXJpb2RzLnB1c2godGFibGVhdURhdGFbMF0uX2NvbHVtbnNbaV0uX2ZpZWxkTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YWJsZWF1RGF0YVswXS5fZGF0YS5tYXAocm93X2RhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJvd3MuaGFzKHJvd19kYXRhWzBdLl92YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vRmlyc3QgYWRkIHJvb3RcclxuICAgICAgICAgICAgICAgIHJvd3Muc2V0KHJvd19kYXRhWzBdLl92YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiByb3dfZGF0YVswXS5fdmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHJvd19kYXRhWzBdLl9mb3JtYXR0ZWRWYWx1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJpZXM6IFtdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3VwZGF0ZSBkYXRhIGJhc2VkIG9uIHBlcmlvZHNcclxuICAgICAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDE7IGkgPD0gcGVyaW9kX2xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvL2kgPT0gY291bnQgc2hvdWxkIGJlIG51bWJlciBvZiBkaW1lbnNpb25cclxuICAgICAgICAgICAgICAgIGxldCBzZXJpZXNJbmRleCA9IE1hdGguY2VpbChpIC8gMTIpIC0gMTtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Um93ID0gcm93cy5nZXQocm93X2RhdGFbMF0uX3ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3cuc2VyaWVzW3Nlcmllc0luZGV4XSA9IGN1cnJlbnRSb3cuc2VyaWVzW3Nlcmllc0luZGV4XSA/XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFJvdy5zZXJpZXNbc2VyaWVzSW5kZXhdIDpcclxuICAgICAgICAgICAgICAgICAgICBbXTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRSb3cuc2VyaWVzW3Nlcmllc0luZGV4XS5wdXNoKHJvd19kYXRhW2ldLl92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHByb3BzID0ge1xyXG4gICAgICAgICAgICBwZXJpb2RzOiBbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgbGFiZWw6IFwiMVwiXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICByb3dzOiBBcnJheS5mcm9tKHJvd3MudmFsdWVzKCkpLFxyXG4gICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgcGVyaW9kczogcGVyaW9kcyxcclxuICAgICAgICAgICAgICAgIHNlcmllczogW11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgfTtcclxuICAgIGNvbnZlcnREYXRhID0gKGRhdGFUeXBlKSA9PiB7XHJcbiAgICAgICAgbGV0IFRhYmxlYXVEYXRhID0gdGhpcy5kYXRhRm9ybWF0TWFwW2RhdGFUeXBlXTtcclxuICAgICAgICAvL3NlcmllcyBzaG91bGQgYmUgYmFzZWQgb24gbnVtYmVyIG9mIG1lYXN1cmVzXHJcbiAgICAgICAgaWYgKGRhdGFUeXBlID09PSBcIndpdGhfYWN0dWFsX2RhdGFcIiB8fCBkYXRhVHlwZSA9PT0gXCJzaW5nbGVfbWVhc3VyZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybVBlcmlvZERhdGEoZGF0YVR5cGUsVGFibGVhdURhdGEpXHJcbiAgICAgICAgfWVsc2UgaWYgKGRhdGFUeXBlID09PSBcIm5vX3BlcmlvZHNcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1ub1BlcmlvZERhdGEoVGFibGVhdURhdGEpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSJdLCJzb3VyY2VSb290IjoiIn0=