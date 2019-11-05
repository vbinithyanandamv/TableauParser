
let dataFormatMap = {
  'with_actual_data' : with_actual_data,
  'no_period' : no_period
}

let dataType = 'with_actual_data';
let tableauJson = dataFormatMap.dataType;
let categoryData = new Map();

let periodIndex = 0;
let periods =[];

if(dataType === 'with_actual_data'){
    //get all periods sepeartely
    tableauJson[0]._data.map((data) =>{
        let periodData = {
            'id':data[3]._value,
            'label':data[3]._formattedValue
        }   
        if(!periods.some(period => period.id === data[3]._value)){
        periods.push(periodData)
        }
    });

    let numberOfPeriods = periods.length;
    let level;

    let levelValue = { 0 : 2 , 1 : 0}; // data map

    tableauJson[0]._data.map((data) =>{
        
        level = 1; //based on number of category

        if(!categoryData.has(data[1]._value)){ //First add root
            categoryData.set(data[1]._value,{ 
                'id':data[1]._value,
                'label':data[1]._formattedValue,
                'children':new Map(),
                'series':[new Map(),new Map()],
                'parent': null,
            })
        }
        
        let addChildren = (parent,children) =>{ //then add children recursively and form the structure
            if(level < 0){
                return parent;
            }
            if(!parent.children.has(children._value)){
                parent.children.set(children._value,               
                            {
                                'id':children._value,
                                'label':children._formattedValue,
                                'children':new Map(),
                                'series':[new Map(),new Map()],
                                'parent': parent,
                            }
                    )   
            }        
            level--;
            parent = parent.children.get(children._value);
            return addChildren(parent,data[levelValue[level]]);   
        }

        let leafChildren = addChildren(categoryData.get(data[1]._value),data[0])       

        //update data from children to parent
        let updateData = (node) =>{
            if(!node.series[0].get(data[3]._value)){
                node.series[0].set(data[3]._value,data[4]._value);  100
                node.series[1].set(data[3]._value,data[5]._value);  14
            }else{
                let budget = node.series[0].get(data[3]._value) + data[4]._value;
                let forecast = node.series[0].get(data[3]._value) + data[5]._value;
                node.series[0].set(data[3]._value,budget);
                node.series[1].set(data[3]._value,forecast);               
            }
            if(node.parent){
                updateData(node.parent);
            }
        }

        updateData(leafChildren);
    });


    //convert to VDT DATA Format 

    categoryData = Array.from(categoryData.values());

    categoryData.map((node) =>{
        let maptoArray = (node) => {
        node.children = Array.from(node.children.values());
        node.series = [Array.from(node.series[0].values()) , Array.from(node.series[0].values())]
        if(!node.children){
            return;
        }
        delete node.parent;
        node.children.map((node) =>{
            maptoArray(node)
        })      
        }
        maptoArray(node);
    })

    let props = {
        'periods':periods,
        'rows':categoryData,
        'metadata':{
            'periods':periods,
            'series':[tableauJson[0]._columns[4]._fieldName , tableauJson[0]._columns[5]._fieldName],
        }
    }

    console.log(props);

}
