import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { Todo } from 'src/app/shared/todo';

@Component({
  selector: 'app-cosmetic-contents',
  templateUrl: './cosmetic-contents.page.html',
  styleUrls: ['./cosmetic-contents.page.scss'],
})
export class CosmeticContentsPage implements OnInit {
  todos: Todo[];
  loading: boolean;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private dataService: DataService
  ) { }
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.loading = true;
     setTimeout(() => {
      this.loading = false;
      this.todos = this.dataService.getData();
    },3000);
  }
  detail(todo: Todo) {
    this.dataService.setParams({
      todo
    });
    this.navCtrl.navigateForward('/cosmetic-details');
  }
  async delete(index: number) {
    const alert = await this.alertCtrl.create({
      header : 'Confirm Deleting',

              message : 'Are you sure for deleting ?',
      mode : 'ios',
      buttons : [
        {
          text : 'No',
          role : 'cancel'
        },
        {
          text : 'yes',
          handler : () => {
            console.log('delete todo');
            this.todos.splice(index , 1);
          }
        }
      ]
    });
    await alert.present();
  }
  edit(todo: Todo) {
    this.dataService.setParams({
      todo
    });
    this.navCtrl.navigateForward('/order-config');
  }
  refreshPage(ev) {
    setTimeout(() => {
      this.todos = this.dataService.getData();
      ev.target.complete();
    },3000);
  }
  loadData(ev) {
    setTimeout(() => {
      this.todos = this.todos.concat(this.dataService.getData());
      ev.target.complete();
    }, 3000);
  }

}


