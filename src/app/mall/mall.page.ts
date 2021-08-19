import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mall',
  templateUrl: './mall.page.html',
  styleUrls: ['./mall.page.scss'],
})
export class MallPage implements OnInit {


  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }
  goToCosmetic(){
    this.navCtrl.navigateForward('/cosmetic-contents');
  }
}
