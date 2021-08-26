import { EventEmitter, Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WindowService {
  didEnter = new EventEmitter();
  subsVar: Subscription;
  get windowRef() {
    return window;
  }
  constructor() {}
  emitDidEnter() {
    this.didEnter.emit();
  }
}
@Injectable({
  providedIn: "root",
})
export class WindowService2 {
  didEnter = new EventEmitter();
  subsVar: Subscription;
  get windowRef() {
    return window;
  }
  constructor() {}
  emitDidEnter() {
    this.didEnter.emit();
  }
}
