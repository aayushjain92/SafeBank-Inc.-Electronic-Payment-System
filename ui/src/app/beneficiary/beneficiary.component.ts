import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Beneficiary } from '../model/beneficiary'
import { ActivatedRoute, Router } from '@angular/router';
import { BeneficiaryService } from '../services/beneficiary.service';
@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss']
})
export class BeneficiaryComponent implements OnInit {
  firstName: string;
  lastName: string;
  accountNumber: number;
  nickName: string;

  beneficiaries: any;
  panelOpenState = false;
  title = 'My Beneficiaries';
  modalValue: string = undefined;
  benefeciary: Beneficiary;
  routingNumber: number;
  constructor(public rest: BeneficiaryService, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
    this.getbeneficiary();
  }

  // get beneficiaries
  getbeneficiary() {
    this.rest.getbeneficiary()
      .subscribe(data => {
        this.beneficiaries = data;

      });


  }


  // function to delete beneficiaries
  deleteBeneficiary(benefeciary: Beneficiary) {
    // let benefeciary = new Beneficiary(this.firstName, this.lastName, this.accountNumber, this.nickName, this.routingNumber);

    console.log(benefeciary);
    this.rest.deleteBeneficiary(benefeciary.accountNumber).subscribe((data) => {

      this.modalValue = benefeciary.firstName + " has been deleted successfully";
      console.log(benefeciary.accountNumber);
      this.getbeneficiary();
      // document.getElementById("myModal").style.display = "block";
    }, (err) => {
      console.log(err);
    });
  }

  // the confirmation modal
  toggleModal() {

    document.getElementById("myModal").style.display = "none";
    this.modalValue = undefined;
    return false;
  }

}
