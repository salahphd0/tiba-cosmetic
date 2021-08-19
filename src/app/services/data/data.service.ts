import { Injectable } from '@angular/core';
import { Todo } from 'src/app/shared/todo';

const Todos: Todo[] = [
  {
    title : 'شامبوات ',
    desc1:  'مجموعة من الشامبوات المستوردة والمحلية ',
    desc2:  'اسحب الى اليمين واليسار للمزيد',
    date : new Date()
  },


  {
    title : 'صابون ',
    desc1:  '  مجموعة من الصابون المستورد والمحلي',
    desc2:  'description',

    date : new Date()
  },

  {
    title : 'title',
    desc1:  'description',
    desc2:  'description',
    date : new Date()
  },

];

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private  navParams: any = {};

  constructor() { }


  getParams() {
    return this.navParams;
  }


  setParams(body) {
    this.navParams = body;
  }

  getData() {
    return Todos;
  }

  postData() {
    throw new Error('method not implemented');
  }

  updateData() {
    throw new Error('method not implemented)');
  }

  deleteData() {
    throw new Error('method not implemented');
  }
}
