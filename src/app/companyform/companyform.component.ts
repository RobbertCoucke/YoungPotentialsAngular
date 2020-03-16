import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { SectorService } from '../_services/Sector/sector.service';
import { MustMatch } from '../_helpers/mustMatch';
import { Register } from '../_models/register';

@Component({
  selector: 'app-companyform',
  templateUrl: './companyform.component.html',
  styleUrls: ['./companyform.component.scss']
})
export class CompanyformComponent implements OnInit {

  submitted = false;
  @Output() register : EventEmitter<Register> = new EventEmitter<Register>();
  companyForm: FormGroup;
  error: string;
  //storen alle sectoren in sectors array
  sectors: any[];

  private emailValidators = [
    Validators.maxLength(250),
    Validators.required,
    Validators.pattern(/.+@.+\..+/)
];

  private passwordValidators = [
    Validators.minLength(6),
    Validators.required
  ];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sectorService: SectorService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }

    this.sectorService.GetAll().subscribe(sectoren => {
      console.log(sectoren);
      this.sectors = sectoren; });
  }

  ngOnInit(): void {
    //de companyform maken met alle inputs
    this.companyForm = this.formBuilder.group({
      companyName : [''],
      website: [''],
      city: [''],
      sector: [''],
      address: [''],
      email: ['', this.emailValidators],
      password: ['', this.passwordValidators],
      confirmPassword: ['', this.passwordValidators]
      
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }
    )
      
  }
  //get alle controls form van de companyForm
  get companyFormControls() { return this.companyForm.controls; }

  //wanneer de gebruiker op submit geklikt, dan maken wij een company model en geven wij het door naar 
  //register component, daar wordt de register model naar de beckend server gestuurd
  onSubmit()
  {
    this.submitted = true;

    if (this.companyForm.invalid) {
      this.error = "invalid form";
      return;
    } 

    //get de company model
    var model = this.getCompany();
    //storen wij de model in register variable en geven wij het door naar register component
    this.register.emit(model);
  }

  //wanneer de gebruiker een sector geselecteerd heeft dan wordt de geselecteerde sector getoond
  changSector(s) {
    this.companyForm.controls.sector.patchValue(s.target.value, {
      onlySelf: true
    })
  }


  //get de company informatie aan de hand van het ingevulde gegevens
  getCompany()
  {
      var controls = this.companyFormControls;
    //elke gebruiker moet zin email, password invullen
      var model = new Register(controls.email.value, controls.password.value, false);
      model.city = controls.city.value;

      model.address = controls.address.value;
      model.url = controls.website.value;
      model.companyName = controls.companyName.value;
      //geselecteerd sector naar number converteren
      model.sectorId = Number(controls.sector.value);

      return model;
  }
}
