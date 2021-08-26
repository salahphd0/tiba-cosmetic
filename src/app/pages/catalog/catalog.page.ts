import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { COLLECTIONS } from 'src/app/models/app.model';
import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit, OnDestroy {
  debug: string = '';
  public items: Item[];
  private itemsSub: Subscription;
  private categoryUid: string | undefined = undefined;
  private readonly categoryRef = this.afStore.collection(
    COLLECTIONS.CATEGORIES
  );
  private readonly itemsRef = this.afStore.collection<Item>(COLLECTIONS.ITEMS);
  constructor(
    private activatedRoute: ActivatedRoute,
    private afStore: AngularFirestore,
    public cartService: CartService
  ) {
    this.categoryUid = this.activatedRoute.snapshot.queryParams.category;
    this.itemsSub = this.itemsRef
      .valueChanges({ idField: 'uid' })
      .subscribe((items) => {
        // const itemss = items.filter((its) =>
        //   its.categories.some((i) => i.uid === this.categoryUid)
        // );
        this.items = [...[...items], ...[...items],...[...items], ...[...items], ...[...items], ...[...items],];
      });
  }
  ngOnInit() {}
  ngOnDestroy() {
    this.itemsSub?.unsubscribe();
  }
}
