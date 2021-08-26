import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { COLLECTIONS } from 'src/app/models/app.model';
import { Category } from 'src/app/models/category.model';
import { Unit } from 'src/app/models/constants';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  activeItem: Item = {};
  items: Observable<Item[]>;
  categories: Observable<Category[]>;
  readonly UNITS = Object.keys(Unit);
  private readonly itemsRef = this.afStore.collection(COLLECTIONS.ITEMS);
  private readonly categoriesRef = this.afStore.collection(
    COLLECTIONS.CATEGORIES
  );
  constructor(private afStore: AngularFirestore) {}
  ngOnInit() {
    this.items = this.itemsRef.valueChanges({ idField: 'uid' });
    this.categories = this.categoriesRef.valueChanges({ idField: 'uid' });
  }
  async add() {
    try {
      if (this.activeItem.uid) {
        await this.itemsRef.doc(this.activeItem.uid).update(this.activeItem);
      } else {
        await this.itemsRef.add(this.activeItem);
      }
      this.activeItem = {};
    } catch (e) {
      console.log(e);
    }
  }
  edit(item: Item) {
    this.activeItem = item;
  }
  async delete(uid: string) {
    if (!confirm('Are you sure?')) return;
    try {
      await this.itemsRef.doc(uid).delete();
    } catch (e) {
      console.log(e);
    }
  }
}
