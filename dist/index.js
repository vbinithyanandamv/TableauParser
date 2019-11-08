var dataParser = new DataParser();
 let options = {
                     'dataType':'with_actual_data',
                     'category':["Category","Region"],
                     'timePeriod':"Time Period - Quarter",
                     'values':["SUM(Sum of Sales Forecast)","SUM(Sum of Sales Budget)"]
                 }

let mockData = {"_data":[[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":16819030.224930644,"_formattedValue":"16,819,030.22"},{"_value":11380267.210963638,"_formattedValue":"11,380,267.21"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":9759145.693358243,"_formattedValue":"9,759,145.69"},{"_value":15564890.875026517,"_formattedValue":"15,564,890.88"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":9771098.213723263,"_formattedValue":"9,771,098.21"},{"_value":14298275.82072375,"_formattedValue":"14,298,275.82"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":17302002.74385352,"_formattedValue":"17,302,002.74"},{"_value":13628175.61376725,"_formattedValue":"13,628,175.61"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":10036595.715733148,"_formattedValue":"10,036,595.72"},{"_value":17137418.885900036,"_formattedValue":"17,137,418.89"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":14854154.676106345,"_formattedValue":"14,854,154.68"},{"_value":16596535.895950291,"_formattedValue":"16,596,535.90"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":11353502.493649336,"_formattedValue":"11,353,502.49"},{"_value":13293439.417558497,"_formattedValue":"13,293,439.42"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":10867230.978455061,"_formattedValue":"10,867,230.98"},{"_value":12794773.100787053,"_formattedValue":"12,794,773.10"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":13316496.498783194,"_formattedValue":"13,316,496.50"},{"_value":16530867.745266208,"_formattedValue":"16,530,867.75"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":17515738.873997796,"_formattedValue":"17,515,738.87"},{"_value":15824652.528848467,"_formattedValue":"15,824,652.53"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":13909219.41881783,"_formattedValue":"13,909,219.42"},{"_value":17041175.1168073,"_formattedValue":"17,041,175.12"}],[{"_value":"Consumer","_formattedValue":"Consumer"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":15928666.629379358,"_formattedValue":"15,928,666.63"},{"_value":19214095.01444832,"_formattedValue":"19,214,095.01"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":13271241.243387086,"_formattedValue":"13,271,241.24"},{"_value":14906718.312593615,"_formattedValue":"14,906,718.31"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":16864174.47377177,"_formattedValue":"16,864,174.47"},{"_value":17932313.26667972,"_formattedValue":"17,932,313.27"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":13235308.454160962,"_formattedValue":"13,235,308.45"},{"_value":11930071.570333475,"_formattedValue":"11,930,071.57"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":14254131.923658915,"_formattedValue":"14,254,131.92"},{"_value":19761792.92904529,"_formattedValue":"19,761,792.93"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":16475488.463332621,"_formattedValue":"16,475,488.46"},{"_value":8868548.16988578,"_formattedValue":"8,868,548.17"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":16688384.776390234,"_formattedValue":"16,688,384.78"},{"_value":14348212.327398572,"_formattedValue":"14,348,212.33"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":16554789.053719644,"_formattedValue":"16,554,789.05"},{"_value":14082725.853584895,"_formattedValue":"14,082,725.85"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":16910161.530910727,"_formattedValue":"16,910,161.53"},{"_value":15239208.71351066,"_formattedValue":"15,239,208.71"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":11292746.654909508,"_formattedValue":"11,292,746.65"},{"_value":14205196.466512127,"_formattedValue":"14,205,196.47"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":16566774.831265919,"_formattedValue":"16,566,774.83"},{"_value":12350230.044137754,"_formattedValue":"12,350,230.04"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":17561876.083301604,"_formattedValue":"17,561,876.08"},{"_value":16256175.221448665,"_formattedValue":"16,256,175.22"}],[{"_value":"Industrials","_formattedValue":"Industrials"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":10895603.395801144,"_formattedValue":"10,895,603.40"},{"_value":15390167.283031588,"_formattedValue":"15,390,167.28"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":12200049.783296648,"_formattedValue":"12,200,049.78"},{"_value":13899812.450889248,"_formattedValue":"13,899,812.45"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":14355464.288059803,"_formattedValue":"14,355,464.29"},{"_value":18540198.703023322,"_formattedValue":"18,540,198.70"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":14629981.64077087,"_formattedValue":"14,629,981.64"},{"_value":17209179.73413245,"_formattedValue":"17,209,179.73"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"East","_formattedValue":"East"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":9473786.007470863,"_formattedValue":"9,473,786.01"},{"_value":18995338.59287952,"_formattedValue":"18,995,338.59"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":13224077.6782133,"_formattedValue":"13,224,077.68"},{"_value":17100206.02168666,"_formattedValue":"17,100,206.02"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":14786406.132119924,"_formattedValue":"14,786,406.13"},{"_value":20716042.907468926,"_formattedValue":"20,716,042.91"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":13540014.923316406,"_formattedValue":"13,540,014.92"},{"_value":14261946.341513928,"_formattedValue":"14,261,946.34"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"Midwest","_formattedValue":"Midwest"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":10617847.468178071,"_formattedValue":"10,617,847.47"},{"_value":18698449.11797823,"_formattedValue":"18,698,449.12"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 4","_formattedValue":"Qtr 4"},{"_value":16934728.220912162,"_formattedValue":"16,934,728.22"},{"_value":13565934.461321209,"_formattedValue":"13,565,934.46"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 3","_formattedValue":"Qtr 3"},{"_value":14672583.962800544,"_formattedValue":"14,672,583.96"},{"_value":16659916.350413484,"_formattedValue":"16,659,916.35"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 2","_formattedValue":"Qtr 2"},{"_value":14855279.625834385,"_formattedValue":"14,855,279.63"},{"_value":10538399.027947206,"_formattedValue":"10,538,399.03"}],[{"_value":"Others","_formattedValue":"Others"},{"_value":"West","_formattedValue":"West"},{"_value":"Qtr 1","_formattedValue":"Qtr 1"},{"_value":12778235.22362915,"_formattedValue":"12,778,235.22"},{"_value":12278848.906536393,"_formattedValue":"12,278,848.91"}]],"_columns":[{"_fieldName":"Category","_dataType":"string","_isReferenced":true,"_index":0},{"_fieldName":"Region","_dataType":"string","_isReferenced":true,"_index":1},{"_fieldName":"Time Period - Quarter","_dataType":"string","_isReferenced":true,"_index":2},{"_fieldName":"SUM(Sum of Sales Budget)","_dataType":"float","_isReferenced":true,"_index":3},{"_fieldName":"SUM(Sum of Sales Forecast)","_dataType":"float","_isReferenced":true,"_index":4}],"_totalRowCount":36,"_isTotalRowCountLimited":false,"_isSummaryData":true,"_name":"Summary Data Table"};
let parsedData = self.dataParser.convertData(options,mockData);