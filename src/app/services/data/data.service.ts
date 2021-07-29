import { Injectable } from '@angular/core';
import { Todo } from 'src/app/shared/todo';

const Todos: Todo[] = [
  {
    title : 'شامبو ايبك',
    desc:  'مستورد',
    date : new Date()
  },


  {
    title : 'شامبو الامل',
    desc:  'محلي الصنع',
    date : new Date()
  },


  {
    title : 'شامبو للشعر الدهني',
    desc:  'مع لمعان ',
    date : new Date()
  },

  {
    title : 'abq7',
    desc:  'description',
    date : new Date()
  },

  {
    title : 'title',
    desc:  'description',
    date : new Date()
  },

  {
    title : 'title',
    desc:  'description',
    date : new Date()
  },

  {
    title : 'title',
    desc:  'description',
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
