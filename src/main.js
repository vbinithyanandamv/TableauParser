export class DataParser {
    
    constructor() {
        this.dataFormatMap = {
            "with_actual_data": with_actual_data,
            "no_periods": no_periods,
            "measure_as_category": measure_as_category,
            "no_category": no_category,
            "single_measure": single_measure
        };
    }

    transformPeriodData = (dataType,tableauData) => {
        let categoryData = new Map();
        let periods = [];

        //get all periods sepeartely
        tableauData[0]._data.map(data => {
            let periodData = {
                id: data[3]._value,
                label: data[3]._formattedValue
            };
            if (!periods.some(period => period.id === data[3]._value)) {
                periods.push(periodData);
            }
        });

        let numberOfPeriods = periods.length; //can be get from editor also
        let level;
        let levelValue = {
            0: 2,
            1: 0
        }; // data map need to be done based on data utility

        tableauData[0]._data.map(data => {            
            
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

            let addChildren = (parent, children) => {
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

            let leafChildren = addChildren(categoryData.get(data[1]._value), data[0]);

            //update data from children to parent
            let updateData = (node) => {
                node.series[0] = !node.series[0] ? new Map() : node.series[0];
                if (!node.series[0].get(data[3]._value)) {
                    node.series[0].set(data[3]._value, data[4]._value);
                    if (dataType !== "single_measure") {
                        node.series[1] = !node.series[1] ? new Map() : node.series[1];
                        node.series[1].set(data[3]._value, data[5]._value);
                    }
                } else {
                    let budget = node.series[0].get(data[3]._value) + data[4]._value;
                    node.series[0].set(data[3]._value, budget);
                    if (dataType !== "single_measure") {
                        let forecast = node.series[0].get(data[3]._value) + data[5]._value;
                        node.series[1].set(data[3]._value, forecast);
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
                if (dataType == "single_measure") {
                    node.series = [Array.from(node.series[0].values())];
                } else {
                    node.series = [
                        Array.from(node.series[0].values()),
                        Array.from(node.series[1].values())
                    ];
                }
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

        let seriesNames = [];

        if (dataType == "single_measure") {
            seriesNames = [tableauData[0]._columns[4]._fieldName];
        } else {
            seriesNames = [
                tableauData[0]._columns[4]._fieldName,
                tableauData[0]._columns[5]._fieldName
            ];
        }

        let props = {
            periods: periods,
            rows: categoryData,
            metadata: {
                periods: periods,
                series: seriesNames
            }
        };

        return props;
    };

    transformnoPeriodData = (tableauData) => {
        let period_length = tableauData[0]._columns.length - 1; //dimension length
        let number_of_periods = 12; //should be coming from editor
        let number_of_series = period_length / number_of_periods;
        let rows = new Map();
        let periods = [];

        //get periods
        for (i = 1; i <= period_length; i++) {
            //i == count should be number of dimension
            periods.push(tableauData[0]._columns[i]._fieldName);
        }

        tableauData[0]._data.map(row_data => {
            if (!rows.has(row_data[0]._value)) {
                //First add root
                rows.set(row_data[0]._value, {
                    id: row_data[0]._value,
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
                    currentRow.series[seriesIndex] :
                    [];
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
                series: []
            }
        };
        
        return props;
    };
    convertData = (dataType) => {
        let TableauData = this.dataFormatMap[dataType];
        //series should be based on number of measures
        if (dataType === "with_actual_data" || dataType === "single_measure") {
            return this.transformPeriodData(dataType,TableauData)
        }else if (dataType === "no_periods") {
            return this.transformnoPeriodData(TableauData)
        }
    };
}