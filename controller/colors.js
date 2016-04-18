var colors=['#1f77b4',
 '#ff7f0e',
'#2ca02c',
 '#d62728',
 '#9467bd',
 '#8c564b',
 '#e377c2',
 '#7f7f7f',
 '#bcbd22',
'#17becf',
 '#e7ba52',
'#e7cb94',
 '#843c39',
 '#ad494a',
'#d6616b',
 '#e7969c',
'#7b4173',
'#a55194',
'#ce6dbd',
 '#de9ed6'];
 
 var processMap={},
     process_id=0,
     counting=0;

function initialColors(){
    processMap={};
    process_id=0;
    counting=0;
    
}     
     
function colorValue(process){
    if(processMap.hasOwnProperty(process)){
        return [processMap[process][0],colors[processMap[process][1]]];
    }else{
        process_id=(process_id+1)%colors.length;
        counting++;
        processMap[process]=[counting,process_id];       
        return [counting,colors[process_id]];
    }
    
}