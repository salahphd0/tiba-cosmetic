import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {
    this.createForm();
  }

  ngOnInit() {
  }


  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });  }


  onSubmit() {
    console.log(this.form.value);
    this.navCtrl.navigateForward('/mall');
  }

}
