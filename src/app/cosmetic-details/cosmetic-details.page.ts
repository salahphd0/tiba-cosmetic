import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { Todo } from 'src/app/shared/todo';

@Component({
  selector: 'app-cosmetic-details',
  templateUrl: './cosmetic-details.page.html',
  styleUrls: ['./cosmetic-details.page.scss'],
})
export class CosmeticDetailsPage implements OnInit , OnDestroy{
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  todo: Todo;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.todo = this.dataService.getParams().todo;
  }

  ngOnDestroy() {
    this.dataService.setParams({});
  }

}
