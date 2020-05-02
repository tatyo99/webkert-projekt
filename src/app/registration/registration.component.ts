import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) { 
      if (this.authService.isLoggedIn) { 
          this.router.navigate(['/search']);
      }
    }

  get form() { return this.registForm.controls; }

  checkPasswords(group: FormGroup) { 
    let pass = group.get('password').value;
    let confirmPass = group.get('password_again').value;
  
    return pass === confirmPass ? null : group.controls['password_again'].setErrors({ notMatch: true });
  }

  ngOnInit(): void {
    this.registForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password_again: ['', Validators.required]
    }, {
      validator: this.checkPasswords
    });
  }

  onSubmit() {
    if (this.registForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.regist(this.registForm.get('username').value, this.registForm.get('email').value, this.registForm.get('password').value);
    this.router.navigate(['/search']);
    this.loading = false;
        
  }

}
