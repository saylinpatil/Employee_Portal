import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { EmputilsService } from 'src/app/service/emputils.service';
import { AddempdetailsComponent } from '../addempdetails/addempdetails.component';
import { empDetail } from '../emp.module';
import { employeedata } from 'src/app/employeedata'

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.css']
})
export class EmployeelistComponent implements OnInit {

  bsModalRef!: BsModalRef; // Initialize with '!' to assert it will be defined

 serchBy:any  =  '';
 displayAllEmployees:empDetail[] = []

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void { 
  }

  getAllemployeesDetail() {
  this.displayAllEmployees = employeedata;
  let serchKey = this.serchBy.toLowerCase()
  
  if(serchKey == "") {
    return this.displayAllEmployees;
   } else {
     let filteredEmployees =  employeedata.filter((element) => {
        let firstLastName = element.firstName.toLowerCase() + element.lastName.toLowerCase();
        let employeeID = ('' + element.employeeUniqueID).toLowerCase();
        let checkInclueds = firstLastName.includes(serchKey) || employeeID.includes(serchKey)
        return checkInclueds;
      });
     this.displayAllEmployees = filteredEmployees;
     return this.displayAllEmployees;
   }   
  }

  addNewEmp() {
    this.bsModalRef = this.modalService.show(AddempdetailsComponent);
  }
  
  updateEmployeeDetail(emp: empDetail, updateFlag: boolean) {
    this.modalService.show(AddempdetailsComponent, {
      initialState: {
        empId: emp.employeeUniqueID,
        updateEmp: updateFlag || true
      },
      class: 'lg'
    });
  }

  deleteEmployeeDetail(emp: empDetail) {
    let existingEmployeeIndex = employeedata.findIndex((element) => 
    element.employeeUniqueID == emp.employeeUniqueID);
     employeedata.splice(existingEmployeeIndex, 1);
  }
}
