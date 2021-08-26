import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { PAGES } from './models/app.model';
import { AccountRole, UserModel } from './models/auth.model';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy, AfterViewInit {
  @ViewChild('cart', { read: ViewContainerRef }) private readonly cart;

  user: UserModel;
  isLoggedInSub: Subscription;
  loaded = true;
  readonly Role = AccountRole;
  constructor(public auth: AuthService, private router: Router) {}
  ngAfterViewInit() {
    this.initApp();
  }
  private initApp() {
    this.isLoggedInSub = this.auth.user
      .pipe(debounce(() => interval(500)))
      .subscribe(async (user) => {
        this.user = user;
        if (!user && this.router.url !== PAGES.LOGIN)
          this.router.navigate([PAGES.LOGIN]);
        if (user && this.router.url === PAGES.LOGIN)
          this.router.navigate([PAGES.HOME]);
        if (!this.loaded) this.loaded = true;
      });
  }
  ngOnDestroy() {
    this.isLoggedInSub?.unsubscribe();
  }
  doLogout() {
    this.auth.logout();
  }
}
