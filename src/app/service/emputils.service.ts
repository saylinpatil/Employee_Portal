import { Injectable } from '@angular/core';

import { employeedata } from '../employeedata'

@Injectable({
  providedIn: 'root',
})
export class EmputilsService {
  constructor() {}

  isAleadyExistsEmployeeId(empId: string | number) {
    if (employeedata.find((element) => element.employeeUniqueID == empId)) {
        return true;
    } else {
        return false;
    }
  }

  getEmployeeDetailsOfThisID(empId: string | number) {
   return employeedata.find((element) => element.employeeUniqueID == empId)
  }

}
