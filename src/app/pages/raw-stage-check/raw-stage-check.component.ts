import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
selector:'app-raw-stage-check',
standalone:false,
templateUrl:'./raw-stage-check.component.html',
styleUrls:['./raw-stage-check.component.css']
})
export class RawStageCheckComponent implements OnInit{

constructor(
private location:Location,
private router:Router
){}

projectDetails={
projectCode:'PRJ1001',
projectName:'Machine Assembly',
workOrder:'WO2458',
projectOwner:'Suman Reddy',
empId:'EMP1045',
projectStatus:'Active'
};

statusOptions = [
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


goBack(){
this.location.back();
}


/* redirect to Paint Check */
moveToBilling(){

if(this.checkStatus!=='Completed'){
alert('Complete Raw Stage Check first');
return;
}

console.log({
status:this.checkStatus,
remarks:this.remarks
});

this.router.navigate(['/main-layout/billing-readiness']);

}
}