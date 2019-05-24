import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { EmployeeDataService } from '../DataService/EmployeeDataService'
import { Employee } from 'src/Models/Employee'
import { Router } from '@angular/router';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';

@Component({
  selector: 'app-angular-crud',
  templateUrl: './angular-crud.component.html',
  styleUrls: ['./angular-crud.component.css']
})
export class AngularCRUDComponent implements OnInit {
  // Field Properties
  emplist: Employee[];
  dataavailbale: Boolean = false;
  tempemp: Employee

  @ViewChild('empadd') addcomponent: EmployeeAddComponent
  @ViewChild('regForm') editcomponent: EmployeeUpdateComponent

  // Constructor
  constructor(private dataservice: EmployeeDataService, private route: Router) {
  }

  // Initialize
  ngOnInit() {
    this.LoadData();
  }

  // LoadData method function
  LoadData() {
    this.dataservice.getEmployee().subscribe((tempdata) => {
      this.emplist = tempdata;
      console.log(this.emplist);
      if (this.emplist.length > 0) {
        this.dataavailbale = true;
      }
      else {
        this.dataavailbale = false;
      }
    }
    ),
    err => {
      console.log(err);
    }
  }

  // deleteconfirmation method function
  deleteconfirmation(id: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.tempemp = new Employee();
      this.tempemp.id = id;
      this.dataservice.DeleteEmployee(this.tempemp).subscribe(res => {
        alert("Deleted successfully !!!");
        this.LoadData();
      })
    }
  }

  // loadAddnew method function
  loadAddnew() {
    this.addcomponent.objemp.id = ""
    this.addcomponent.objemp.firstname = ""
    this.addcomponent.objemp.lastname = ""
    this.addcomponent.objemp.email = ""
    this.addcomponent.objemp.gender = 0
  }

  // loadnewForm method function
  loadnewForm(id: string, firstname: string, lastname: string, email: string, gender: number) {
    console.log(gender);
    this.editcomponent.objemp.id = id
    this.editcomponent.objemp.firstname = firstname
    this.editcomponent.objemp.lastname = lastname
    this.editcomponent.objemp.email = email
    this.editcomponent.objemp.gender = gender
  }

  // RefreshData method function
  RefreshData() {
    this.LoadData();
  }
}
