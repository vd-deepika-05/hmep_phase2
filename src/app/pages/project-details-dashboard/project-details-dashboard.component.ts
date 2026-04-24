import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PartCategory{
name:string;
total:number;
completed:number;
inProcess:number;
surfaceFinish:number;
hold:number;
}

interface ProjectDetails{
projectCode:string;
projectName:string;
workOrder:string;
projectOwner:string;
employeeId:string;
empId:string;
projectStatus:string;
date:string;
partsData:{
machiningParts:PartCategory;
sheetmetalParts:PartCategory;
castingParts:PartCategory;
otherParts:PartCategory;
};
}

interface ActionButton{
label:string;
action:string;
}

@Component({
selector:'app-project-details-dashboard',
standalone:false,
templateUrl:'./project-details-dashboard.component.html',
styleUrls:['./project-details-dashboard.component.css']
})
export class ProjectDetailsDashboardComponent implements OnInit{

constructor(
private router:Router
){}


projectDetails:ProjectDetails={
projectCode:'PRJ-25041',
projectName:'Cable Bracket Assembly',
workOrder:'41',
projectOwner:'Suman Reddy',
employeeId:'EMP104',
empId:'EMP104',
projectStatus:'In Process',
date:'31-Jul-2025',

partsData:{

machiningParts:{
name:'Machining Parts',
total:24,
completed:6,
inProcess:4,
surfaceFinish:12,
hold:2
},

sheetmetalParts:{
name:'Sheetmetal Parts',
total:42,
completed:10,
inProcess:8,
surfaceFinish:4,
hold:2
},

castingParts:{
name:'Casting Parts',
total:3,
completed:0,
inProcess:0,
surfaceFinish:3,
hold:0
},

otherParts:{
name:'Other Parts',
total:0,
completed:0,
inProcess:0,
surfaceFinish:0,
hold:0
}

}
};



isDelivered=false;


/* PROJECT ACTIONS */
actionButtons:ActionButton[]=[

{
label:'DETAIL BOM',
action:'detailBom'
},

{
label:'REPORTS UPLOAD / LINKING',
action:'reportsUpload'
},

{
label:'STAGE-WISE PRODUCTION TRACKING',
action:'stageTracking'
},

{
label:'RAW STAGE ASSEMBLY CHECK',
action:'rawStageCheck'
},

{
label:'PAINT / ENGRAVING CHECK',
action:'paintCheck'
},

{
label:'CLEARED FOR BILLING',
action:'billingCheck'
}

];


ngOnInit():void{
this.checkProjectStatus();
this.loadProjectData();
}


checkProjectStatus():void{
this.isDelivered=
this.projectDetails.projectStatus
.toLowerCase()==='delivered';
}


loadProjectData():void{
console.log(
'Project loaded',
this.projectDetails
);
}



/* ROUTED PROJECT ACTIONS */
handleAction(action:string):void{

switch(action){

case 'detailBom':
this.router.navigate([
'/main-layout/detail-bom'
]);
break;


case 'reportsUpload':
this.router.navigate([
'/main-layout/reports-upload'
]);
break;


case 'stageTracking':
this.router.navigate([
'/main-layout/stagewise-production'
]);
break;


case 'rawStageCheck':
this.router.navigate([
'/main-layout/raw-stage-check'
]);
break;


case 'paintCheck':
this.router.navigate([
'/main-layout/paint-check'
]);
break;


case 'billingCheck':

if(!this.canProceedToBilling()){

const details=
this.getIncompletePartDetails();

alert(
`Project execution not complete.

${details}

Complete all checks before billing.`
);

return;
}

this.router.navigate([
'/main-layout/billing-readiness'
]);

break;


default:
console.warn(
'Unknown action:',
action
);

}

}



/* Billing Validation */
canProceedToBilling():boolean{

const allPartsData=
Object.values(
this.projectDetails.partsData
);

return allPartsData.every(
category=>{

return(
category.hold===0 &&
(
category.completed +
category.inProcess +
category.surfaceFinish
===category.total
)

);

});

}



/* incomplete details */
getIncompletePartDetails():string{

const allPartsData=
Object.values(
this.projectDetails.partsData
);

const incomplete:string[]=[];


allPartsData.forEach(
(category:PartCategory)=>{

if(category.total===0){
return;
}

const hasHold=
category.hold>0;

const processed=
(
category.completed+
category.inProcess+
category.surfaceFinish
===category.total
);


if(hasHold || !processed){

if(hasHold){

incomplete.push(
`${category.name}:
${category.hold} parts on hold`
);

}

if(!processed){

const unprocessed=
category.total-
(
category.completed+
category.inProcess+
category.surfaceFinish
);

incomplete.push(
`${category.name}:
${unprocessed} parts not processed`
);

}

}

});

return incomplete.length
? incomplete.join('\n')
: 'All parts ready';

}



/* helper statuses */
getExecutionStatus():string{

const allParts=
Object.values(
this.projectDetails.partsData
);

const total=
allParts.reduce(
(sum,item)=>sum+item.total,
0
);

const completed=
allParts.reduce(
(sum,item)=>sum+item.completed,
0
);


if(total===0){
return 'No Parts';
}

if(completed===total){
return 'Completed';
}

if(completed===0){
return 'Not Started';
}

return 'In Progress';

}


isBillingReady():boolean{
return this.canProceedToBilling();
}


getBillingStatusText():string{

if(this.isDelivered){
return 'Project Delivered';
}

if(this.canProceedToBilling()){
return 'Ready for Billing';
}

return 'Execution Incomplete';

}

}