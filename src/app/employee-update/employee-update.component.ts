import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { EmployeeDataService } from '../DataService/EmployeeDataService';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/Models/Employee';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  // Field Properties
  @Output() nameEvent = new EventEmitter<string>();
  @ViewChild('closeBtn') cb: ElementRef;
  @Input() reset: boolean = false;
  @ViewChild('regForm') myForm: NgForm;
  @Input() isReset: boolean = false;
  objtempemp: Employee;
  @Input() objemp: Employee = new Employee();

  // Constructor
  constructor(private dataservice: EmployeeDataService, private route: Router) { }

  // Initialize
  ngOnInit() {
  }

  // EditEmployee method function
  EditEmployee(regForm: NgForm) {
    this.dataservice.EditEmployee(this.objemp).subscribe(res => {
      alert("Employee updated successfully");
      this.nameEvent.emit("ccc");
      this.cb.nativeElement.click();
    })
  }
}
