import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
selector:'app-qc-decision',
standalone:false,
templateUrl:'./qc-decision.component.html',
styleUrls:['./qc-decision.component.css']
})
export class QcDecisionComponent {

constructor(
private location:Location,
private router:Router
){}


/* Project Header */
projectDetails={
projectCode:'PRJ1001',
projectName:'Machine Assembly',
workOrder:'WO2458',
projectOwner:'Suman Reddy',
empId:'EMP1045',
projectStatus:'Active'
};


/* QC Part Details */
partDetails={
partNo:'K8064738',
partName:'CABLE BRACKET TL/2',
requiredFinish:'Passivation',
material:'Stainless Steel 304'
};


/* Paint Check Section */
statusOptions=[
{
label:'In Progress',
value:'In Progress'
},
{
label:'Completed',
value:'Completed'
}
];

checkStatus='';
remarks='';


/* Progress */
totalParts=100;
completedParts=95;
completionPercent=0;


ngOnInit(){
this.calculateProgress();
}


calculateProgress(){
this.completionPercent=
Math.round(
(this.completedParts/this.totalParts)*100
);
}


/* Back */
goBack(){
this.location.back();
}


/* QC Accept */
acceptPart(){

alert('Part Accepted and Cleared For Next Process');

console.log({
decision:'Accepted',
part:this.partDetails,
statusUpdate:'Complete-Green'
});

/* Optional route */
this.router.navigate([
'/main-layout/paint-check'
]);

}


/* QC Reject */
rejectPart(){

alert('Part Rejected - Opening NCR Process');

console.log({
decision:'Rejected',
part:this.partDetails,
action:'Open NCR'
});

this.router.navigate([
'/main-layout/non-conformance-report'
]);

}


/* Move to Billing */
submitPaintCheck(){

if(this.checkStatus!=='Completed'){
return;
}

console.log({
status:this.checkStatus,
remarks:this.remarks,
mapping:{
status:'paint_check.status',
remarks:'paint_check.remarks'
}
});

alert('Moved To Billing Readiness');

this.router.navigate([
'/main-layout/billing-readiness'
]);

}

}