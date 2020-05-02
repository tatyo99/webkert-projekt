import { JSONService } from '../_services/json.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loadedJSON: boolean = false;
  users: User[] = null;

  loginForm: FormGroup;
  loading = false;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private JSONService: JSONService,
        private authService: AuthService
  ) { 
    if (this.authService.isLoggedIn) { 
      this.router.navigate(['/search']);
    }
  }

  get form() { return this.loginForm.controls; }

  ngOnInit(): void {
    if(!this.loadedJSON){
      this.JSONService.loadUsers().subscribe((users) => this.users = users);
      this.loadedJSON = true;
      console.log('Loaded JSON file');
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    if(this.authService.login(this.form.email.value, this.form.password.value, this.users)){
      console.log(this.authService.isLoggedIn);
      this.router.navigate(['/search']);
      this.loading = false;
    } else {
      alert("Hibás email vagy jelszó!");
      this.loading = false;
    }
        
  }

}
