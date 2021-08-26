import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  BarController,
  CategoryScale,
  Chart,
  LinearScale,
  BarElement,
  LineElement,
  LineController,
  PointElement,
} from 'chart.js';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';
import { COLLECTIONS } from 'src/app/models/app.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
Chart.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  LineController,
  PointElement
);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  items = [
    {
      title: 'Apple pack 1 Box',
      image: './assets/item/13.png',
    },
    {
      title: 'Pinapple pack 1 Box',
      image: './assets/item/17.png',
    },
  ];
  @ViewChild('barCanvas1') barCanvas1: ElementRef;
  @ViewChild('barCanvas2') barCanvas2: ElementRef;

  categories: Observable<Category[]>;

  private barChart1: Chart;
  private barChart2: Chart;

  private readonly categoriesRef = this.afStore.collection<Category>(
    COLLECTIONS.CATEGORIES
  );

  constructor(
    private auth: AuthService,
    private afStore: AngularFirestore,
    private router: Router
  ) {}

  ionViewDidEnter() {
    this.barChart1 = new Chart(this.barCanvas1.nativeElement, {
      type: 'bar',
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Chart with Tick Configuration',
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
          y: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      },
      data: {
        labels: ['January', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Monthly statisics',
            data: [29, 63, 42, 55, 0],
            backgroundColor: [
              'rgba(255, 255, 255, 0.5)',
              'rgba(255, 255, 255, 0.5)',
              'rgba(255, 255, 255, 0.5)',
              'rgba(255, 255, 255, 0.5)',
            ],
            borderColor: [
              'rgba(255, 255, 255, 1.0)',
              'rgba(255, 255, 255, 1.0)',
              'rgba(255, 255, 255, 1.0)',
              'rgba(255, 255, 255, 1.0)',
            ],
            borderWidth: 3,
            borderRadius: 10,
          },
        ],
      },
    });
    this.barChart2 = new Chart(this.barCanvas2.nativeElement, {
      type: 'line',
      options: {
        scales: {
          x: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
          y: {
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)',
            },
          },
        },
      },
      data: {
        labels: ['Vegtables', 'Meats', 'Cleaning', 'Tools', 'Packaging'],
        datasets: [
          {
            label: 'Monthly statisics',
            data: [442, 0, 132, 62, 10],
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            pointBorderColor: '#fff',
            borderWidth: 3,
          },
        ],
      },
    });
  }
  ngOnInit() {
    this.categories = this.categoriesRef.valueChanges({ idField: 'uid' });
  }
  logout() {
    this.auth.logout();
  }
}
