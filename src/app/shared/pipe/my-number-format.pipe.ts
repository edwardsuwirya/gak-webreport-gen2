import { Pipe, PipeTransform } from '@angular/core';

declare var accounting: any;

@Pipe({
  name: 'myNumberFormat'
})
export class MyNumberFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return accounting.formatNumber(value);
  }

}
