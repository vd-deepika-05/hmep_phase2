import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
selector:'app-paint-check',
standalone:false,
templateUrl:'./paint-check.component.html',
styleUrls:['./paint-check.component.css']
})
export class PaintCheckComponent implements OnInit{

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


/* redirect billing readiness */
submitPaintCheck(){

if(this.checkStatus!=='Completed'){
alert('Complete Paint Check first');
return;
}

const payload={
status:this.checkStatus,
remarks:this.remarks,
mapping:{
status:'paint_check.status',
remarks:'paint_check.remarks'
}
};

console.log(payload);

/* redirect next page */
this.router.navigate(
['/main-layout/billing-readiness']
);

}

}