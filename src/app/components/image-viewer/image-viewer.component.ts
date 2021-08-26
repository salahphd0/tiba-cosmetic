import { trigger, transition, style, animate } from "@angular/animations";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "image-viewer",
  templateUrl: "./image-viewer.component.html",
  styleUrls: ["./image-viewer.component.scss"],
  animations: [
    trigger('inOutAnimation2', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('0.2s', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('0.2s', style({ opacity: 0, transform: 'scale(0)' })),
      ]),
    ]),
  ]
})
export class ImageViewerComponent {
  @Input() image: string;
  @Input() images: string[];
  @Output() onClose = new EventEmitter();
  sliderConfig = {
    zoom: {
      maxRatio: 3,
    },
    maxRatio: 3,
  };
  constructor() {}
  dismissModal() {
    this.onClose.emit();
  }
}
