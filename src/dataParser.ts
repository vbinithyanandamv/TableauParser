import { PeriodParser } from "./periodParser";

export class DataParser {
    private periodParser:any;

    constructor() {
        this.periodParser = new PeriodParser();
    }

    private static DataUtilityTransform = (options,tableauData) => {

        let mapConfig = {
            'hierMap':{},
            'timePeriod':0,
            'series':{}
        };

        //periods
        let findColumnIndex = (field,index,columnMap) => {
             for(let i=0;i<tableauData._columns.length;i++){
                if(tableauData._columns[i]._fieldName === field){
                    if(index !== undefined && index !== null){
                        mapConfig[columnMap][index] = i;
                    }else{
                        mapConfig[columnMap] = i;
                    }
                }
            }
        }

        if(options.dataType === 'no_category'){
            options.category = options.values;
            options.series = options.values;
        }
        
        options.category.map((field,index) => {
            findColumnIndex(field,index,'hierMap')
        });

        options.values.map((field,index) => {
            findColumnIndex(field,index,'series')
        });

        findColumnIndex(options.timePeriod,null,'timePeriod')

        return mapConfig;
    }

    private static transformPeriodData = (options,tableauData,periodParser) => {
        let categoryData :any = new Map();
        let periods = [];
        let periodsObj = []; //period with key and value
        let seriesNames = [];

        //create data map here
        let dataMapConfig = DataParser.DataUtilityTransform(options,tableauData);
       
        /* can not be limited based on number of periods since data source might change the order
           so must have to loop over all elements
        */
        for (var i = 0; i < tableauData._data.length; i++) {
            const data = tableauData._data[i];
            let periodValue = typeof data[dataMapConfig.timePeriod]._value === 'string' ? data[dataMapConfig.timePeriod]._value.toLowerCase() : data[dataMapConfig.timePeriod]._value; 
            if (!periods.some(period => period === periodValue)) {
                periods.push(periodValue)
            }
        }

        let periodOrder : any = periodParser.getSortedOrder(periods);
        let categoryIndex = dataMapConfig.hierMap;
        let seriesIndex = dataMapConfig.series;
        let timePeriodIndex = dataMapConfig.timePeriod;
        let numberOfSeries = Object.keys(dataMapConfig.series).length;

        tableauData._data.map(data => {            
            
            /**
             based on number of category
             for example 
             Country,Region level should start with 0 (root already handled and we add children based on level 
             which will be 0 hence add one level and decrement level will be -1 no more child)
             Country,Region,Rep level should start with 1 (root already handled and level will be 1 add region decrement
             level will be 0, add rep and decrement level will be -1 no more child)
            **/ 
            let level = options.category.length - 2; 

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

            let addChildren = (parent, children) => {
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


            let leafChildren = addChildren(categoryData.get(data[categoryIndex[0]]._value), data[categoryIndex[1]]);
            

            //update data from children to parent
            let updateData = (node) => { 
                for(let i=0; i<numberOfSeries; i++){
                    seriesNames.push(tableauData._columns[seriesIndex[i]]._fieldName)
                    node.series[i] = !node.series[i] ? [] : node.series[i];
                    let periodValue = typeof data[timePeriodIndex]._value === 'string' ? data[timePeriodIndex]._value.toLowerCase() : data[timePeriodIndex]._value;
                    let periodValueIndex = periodOrder.indexOf(periodValue);
                    if (!node.series[i][periodValueIndex]) {
                        node.series[i][periodValueIndex] = typeof data[seriesIndex[i]]._value === 'number' ? data[seriesIndex[i]]._value : 0;
                    } else {
                        node.series[i][periodValueIndex] = node.series[i][periodValueIndex] + (typeof data[seriesIndex[i]]._value === 'number' ? data[seriesIndex[i]]._value : 0);
                    }
                }               
                if (node.parent) {
                    updateData(node.parent);
                }
            };

            updateData(leafChildren);
        });

        //convert to VDT DATA Format
        categoryData = Array.from(categoryData.values());

        categoryData.map(node => {
            let maptoArray = node => {
                node.children = Array.from(node.children.values());
                if (!node.children) {
                    return;
                }
                delete node.parent;
                node.children.map(node => {
                    maptoArray(node);
                });
            };
            maptoArray(node);
        });

        for (var i = 0; i < tableauData._data.length; i++) {
             const data =tableauData._data[i];
             let periodData = {
                id: data[timePeriodIndex]._value,
                label: data[timePeriodIndex]._formattedValue
            };
            if (!periodsObj.some(period => period.id === data[timePeriodIndex]._value)) {
                let periodValue = typeof data[timePeriodIndex]._value === 'string' ? data[timePeriodIndex]._value.toLowerCase() : data[timePeriodIndex]._value; 
                periodsObj[periodOrder.indexOf(periodValue)] = periodData
            }
        }

        let props = {
            periods: periodsObj,
            rows: categoryData,
            metadata: {
                periods: periodsObj,
                series: [seriesNames]
            }
        };

        return props;
    };

    private static transformNoCategoryData = (options,tableauData,periodParser) => {
        let categoryData = [];
        let periods = [];
        let periodsObj = []; //period with key and value

        //create data map here
        let dataMapConfig = DataParser.DataUtilityTransform(options,tableauData);
       
        /* can not be limited based on number of periods since data source might change the order
           so must have to loop over all elements
        */
        for (var i = 0; i < tableauData._data.length; i++) {
            const data = tableauData._data[i];
            let periodValue = typeof data[dataMapConfig.timePeriod]._value === 'string' ? data[dataMapConfig.timePeriod]._value.toLowerCase() : data[dataMapConfig.timePeriod]._value; 
            if (!periods.some(period => period === periodValue)) {
                periods.push(periodValue)
            }
        }

        let periodOrder : any = periodParser.getSortedOrder(periods);
        let categoryIndex = dataMapConfig.hierMap;
        let timePeriodIndex = dataMapConfig.timePeriod;
        let numberofCategory =  Object.keys(dataMapConfig.hierMap).length; //should consider measuer as category if no category


        let measureAsCategory = tableauData._columns;
     
        for(let i=0; i < numberofCategory; i++){
            if (!categoryData.some(category => category.id === measureAsCategory[categoryIndex[i]]._fieldName)) {
                //First add root
                categoryData.push({
                    id: measureAsCategory[categoryIndex[i]]._fieldName.replace(/[^a-zA-Z0-9_]/g, "__"),
                    label: measureAsCategory[categoryIndex[i]]._fieldName,
                    series: []
                });

            }
        } 

        tableauData._data.map(data => {  
            for(let i=0; i < numberofCategory; i++){
                let node = categoryData[i];
                node.series[0] = !node.series[0] ? [] : node.series[0];
                let periodValue = typeof data[timePeriodIndex]._value === 'string' ? data[timePeriodIndex]._value.toLowerCase() : data[timePeriodIndex]._value;
                let periodValueIndex = periodOrder.indexOf(periodValue);
                if (!node.series[0][periodValueIndex]) {
                    node.series[0][periodValueIndex] = typeof data[categoryIndex[i]]._value === 'number' ? data[categoryIndex[i]]._value : 0;
                } else {
                    node.series[0][periodValueIndex] = node.series[0][periodValueIndex] + (typeof data[categoryIndex[i]]._value === 'number' ? data[categoryIndex[i]]._value : 0);
                }
            }
        });
        
        for (var i = 0; i < tableauData._data.length; i++) {
             const data =tableauData._data[i];
             let periodData = {
                id: data[timePeriodIndex]._value,
                label: data[timePeriodIndex]._formattedValue
            };
            if (!periodsObj.some(period => period.id === data[timePeriodIndex]._value)) {
                let periodValue = typeof data[timePeriodIndex]._value === 'string' ? data[timePeriodIndex]._value.toLowerCase() : data[timePeriodIndex]._value; 
                periodsObj[periodOrder.indexOf(periodValue)] = periodData
            }
        }

        let props = {
            periods: periodsObj,
            rows: categoryData,
            metadata: {
                periods: periodsObj,
                series: ['series 1']
            }
        };
        
        return props;
    };

    private static transformNoPeriodData = (tableauData) => {
        let period_length = tableauData._columns.length - 1; //dimension length
        let rows = new Map();
        let periods = [];
        let i;

        //get periods
        for (i = 1; i <= period_length; i++) {
            //i == count should be number of dimension
            periods.push(tableauData._columns[i]._fieldName);
        }

        tableauData._data.map(row_data => {
            if (!rows.has(row_data[0]._value)) {
                //First add root
                rows.set(row_data[0]._value, {
                    id: row_data[0]._value.replace(/[^a-zA-Z0-9_]/g, "__"),
                    label: row_data[0]._formattedValue,
                    series: []
                });
            }
            //update data based on periods
            let i;
            for (i = 1; i <= period_length; i++) {
                //i == count should be number of dimension
                let seriesIndex = Math.ceil(i / 12) - 1;
                let currentRow = rows.get(row_data[0]._value);
                currentRow.series[seriesIndex] = currentRow.series[seriesIndex] ?
                    currentRow.series[seriesIndex] : [];
                currentRow.series[seriesIndex].push(row_data[i]._value);
            }
        });

        let props = {
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
    };

    public convertData = (options,data) => {
        let TableauData = data;
        //series should be based on number of measures
        if (options.dataType === "with_actual_data" || options.dataType === "single_measure") {
            return DataParser.transformPeriodData(options,TableauData,this.periodParser)
        }else if(options.dataType === "no_category"){
            return DataParser.transformNoCategoryData(options,TableauData,this.periodParser)
        }else if (options.dataType === "no_periods") {
            return DataParser.transformNoPeriodData(TableauData)
        }
    };
}