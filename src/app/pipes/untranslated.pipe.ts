import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'untranslate'
})
export class UntranslatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
