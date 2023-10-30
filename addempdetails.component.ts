import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { EmputilsService } from 'src/app/service/emputils.service';
import { empDetail } from '../emp.module';
import { employeedata } from 'src/app/employeedata'

@Component({
  selector: 'app-addempdetails',
  templateUrl: './addempdetails.component.html',
  styleUrls: ['./addempdetails.component.css']
})
export class AddempdetailsComponent implements OnInit {
  @Input() empId!: number | string;
  @Input() updateEmp!: boolean;

  branchOptions: string[] = ['Pune', 'Mumbai', 'Bangalore'];
  jobTypeOptions: string[] = ['Full-Time', 'Part-Time', 'Internship'];
  workTypeOptions: string[] = ['On-site', 'Hybrid', 'Remote'];
  
  pageInput: empDetail  = {
    firstName: "",
    lastName: "",
    employeeUniqueID: 0 || '',
    contactNumber: 0,
    department: "",
    jobRole: "" || '',
    branch: null,
    jobType: null,
    workType: null,
    joiningDate: new Date(),
    emailId: ''
  };

  showError: boolean = false;
  errorMsg: string = '';

  constructor(
    public bsModalRef: BsModalRef,
    private emputilsService: EmputilsService
  ) { }

  ngOnInit(): void {
    if(!!this.updateEmp) {
       this.getEmployeeToUpdate(this.empId) 
    }
  }

  onAddEmployeeDetails() {
    if (!!this.updateEmp) {
      let existingEmployeeIndex = employeedata.findIndex((element) =>
        element.employeeUniqueID == this.empId);
      if (existingEmployeeIndex !== -1) {
        employeedata[existingEmployeeIndex] = { ...this.pageInput };
        this.close();
      }
    } else {
      if (this.emputilsService.isAleadyExistsEmployeeId(this.pageInput.employeeUniqueID)) {
        this.showErrorMsg('This Employee ID is already exist')
      } else {
        employeedata.push(this.pageInput)
        this.close();
      }
    }
  }

  getEmployeeToUpdate(empId: number | string){
    const employee = this.emputilsService.getEmployeeDetailsOfThisID(empId) 
    if (employee) {
      this.pageInput.firstName = employee.firstName;
      this.pageInput.lastName = employee.lastName;
      this.pageInput.employeeUniqueID = employee.employeeUniqueID;
      this.pageInput.contactNumber = employee.contactNumber;
      this.pageInput.department = employee.department;
      this.pageInput.jobRole = employee.jobRole;
      this.pageInput.branch = employee.branch;
      this.pageInput.jobType = employee.jobType;
      this.pageInput.workType = employee.workType;
      this.pageInput.joiningDate = employee.joiningDate;
      this.pageInput.emailId = employee.emailId;
    }
  }

  showErrorMsg(msg: string) {
    this.showError = true;
    this.errorMsg = msg;
    
    setTimeout( () => {
      this.showError = false;
    }, 2000);
    return msg;
  }

 disabledAddButton() {
  if((!this.pageInput.firstName) || (!this.pageInput.lastName) || (!this.pageInput.employeeUniqueID) || (!this.pageInput.jobRole) || (!this.pageInput.joiningDate)) {
    return true;
  } else {
    return false;
  }
 }

  close() {
    this.bsModalRef.hide();
  }
}
